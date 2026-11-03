import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {
  AI_SYSTEM_PROMPT,
  cleanText,
  parseStructuredResponseSafe,
  derivePlainResponse,
  looksLikeJson,
  type StructuredAIResponse,
} from "@/lib/ai-prompt"

export const runtime = "nodejs"
export const maxDuration = 60

// ─── Simple in-memory rate limiting (per IP) ─────────────────────────────────
// Allows 60 requests per IP per 60-second window. Resets on serverless cold
// start (acceptable for a free public demo; for production-scale abuse control
// use Vercel KV or Upstash Redis).
interface RateBucket {
  count: number
  firstRequestAt: number
}

const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 60 // 60 requests per minute per IP

const rateBuckets = new Map<string, RateBucket>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || now - bucket.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, firstRequestAt: now })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetInMs: RATE_LIMIT_WINDOW_MS }
  }

  bucket.count += 1
  const remaining = Math.max(0, RATE_LIMIT_MAX - bucket.count)
  const resetInMs = RATE_LIMIT_WINDOW_MS - (now - bucket.firstRequestAt)

  return {
    allowed: bucket.count <= RATE_LIMIT_MAX,
    remaining,
    resetInMs: Math.max(0, resetInMs),
  }
}

const systemPrompt = AI_SYSTEM_PROMPT

// Default Gemini model. As of Nov 2025, Google deprecated gemini-2.0-flash
// in favor of gemini-3.8-flash. Override with GEMINI_MODEL env var.
const DEFAULT_MODEL = "gemini-3.8-flash"

const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || DEFAULT_MODEL,
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-2.5-flash",
].filter((v, i, arr) => arr.indexOf(v) === i)

let geminiInstance: GoogleGenerativeAI | null = null

function getGemini(): GoogleGenerativeAI | null {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) return null
  if (!geminiInstance) {
    geminiInstance = new GoogleGenerativeAI(apiKey)
  }
  return geminiInstance
}

function isRateLimitError(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase()
    return (
      msg.includes("429") ||
      msg.includes("quota") ||
      msg.includes("rate limit") ||
      msg.includes("too many requests") ||
      msg.includes("resource exhausted") ||
      msg.includes("is no longer available") ||
      msg.includes("not found")
    )
  }
  return false
}

async function geminiChatWithModel(
  gemini: GoogleGenerativeAI,
  modelName: string,
  messages: Array<{ role: string; content: string }>,
  systemPrompt?: string
): Promise<string> {
  const model = gemini.getGenerativeModel({
    model: modelName,
    systemInstruction: systemPrompt || undefined,
  })

  const history: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = []
  let lastUserMessage = ""

  for (const msg of messages) {
    if (msg.role === "system") continue
    if (msg.role === "user") {
      lastUserMessage = msg.content
      history.push({ role: "user", parts: [{ text: msg.content }] })
    } else if (msg.role === "assistant") {
      history.push({ role: "model", parts: [{ text: msg.content }] })
    }
  }

  if (history.length <= 1) {
    const result = await model.generateContent(lastUserMessage)
    return result.response.text()
  }

  const chat = model.startChat({
    history: history.slice(0, -1),
  })

  const result = await chat.sendMessage(lastUserMessage)
  return result.response.text()
}

async function geminiChat(
  messages: Array<{ role: string; content: string }>,
  systemPrompt?: string
): Promise<string> {
  const gemini = getGemini()
  if (!gemini) {
    throw new Error(
      "GOOGLE_AI_API_KEY is not set. Get a free key at https://aistudio.google.com/apikey and add it to your env vars."
    )
  }

  let lastError: unknown = null

  for (const modelName of GEMINI_MODELS) {
    try {
      const response = await geminiChatWithModel(gemini, modelName, messages, systemPrompt)
      console.log(`Gemini model ${modelName} succeeded`)
      return response
    } catch (error) {
      lastError = error
      if (isRateLimitError(error)) {
        console.warn(`Gemini model ${modelName} hit rate limit, trying next model...`)
        continue
      }
      throw error
    }
  }

  throw lastError
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  )
}

export async function POST(req: NextRequest) {
  try {
    // ─── Rate limit check ───
    const ip = getClientIP(req)
    const rate = checkRateLimit(ip)
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          details: `Too many requests. Try again in ${Math.ceil(rate.resetInMs / 1000)} seconds.`,
          response:
            "You've sent a lot of questions in a short time. Please wait a minute and try again, or sign up for an account for unlimited access.",
          retryAfter: Math.ceil(rate.resetInMs / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rate.resetInMs / 1000)),
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
            "X-RateLimit-Remaining": "0",
          },
        }
      )
    }

    const body = await req.json()
    const { message, history } = body

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI not configured",
          details: "GOOGLE_AI_API_KEY env var is missing.",
          response:
            "The AI assistant isn't configured yet. Add a GOOGLE_AI_API_KEY (free at https://aistudio.google.com/apikey) in your env vars.",
        },
        { status: 503 }
      )
    }

    // Cap history at 4 messages for public demo (to limit token cost)
    const messages: Array<{ role: string; content: string }> = []

    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-4)) {
        messages.push({
          role: msg.role,
          content: msg.content,
        })
      }
    }

    messages.push({ role: "user", content: message })

    const raw = await geminiChat(messages, systemPrompt)

    let structured: StructuredAIResponse = {}
    let plainResponse = raw

    const { structured: parsed } = parseStructuredResponseSafe(raw)
    structured = parsed
    const derived = derivePlainResponse(structured)

    if (derived) {
      plainResponse = derived
    } else if (looksLikeJson(raw)) {
      plainResponse =
        "I had trouble formatting that response. Could you try asking again?"
      structured = {}
    } else {
      plainResponse = cleanText(raw)
      structured = {}
    }

    return NextResponse.json({
      response: plainResponse,
      responseType: structured.responseType,
      heading: structured.heading,
      description: structured.description,
      subheading: structured.subheading,
      steps: structured.steps,
      paragraphs: structured.paragraphs,
      answer: structured.answer,
      optionA: structured.optionA,
      optionB: structured.optionB,
      question: structured.question,
      model: GEMINI_MODELS[0],
      provider: "gemini",
      rateLimit: {
        remaining: rate.remaining,
        limit: RATE_LIMIT_MAX,
        resetInMs: rate.resetInMs,
      },
    })
  } catch (error: unknown) {
    console.error("Public AI Chat error:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: errorMessage,
        response: `I couldn't reach the AI service. Error: ${errorMessage}`,
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint: status + rate limit info for the public endpoint.
 */
export async function GET() {
  const configured = !!process.env.GOOGLE_AI_API_KEY
  const model = GEMINI_MODELS[0]
  const label = model
    .replace(/^gemini/i, "Gemini")
    .replace(/-/g, " ")
    .replace(/\b(flash|pro|lite|mini)\b/gi, (m) => m.charAt(0).toUpperCase() + m.slice(1))
    .replace(/\b(\d+\.\d+)\b/g, "$1")
    .replace(/\s+/g, " ")
    .trim()

  return NextResponse.json({
    online: configured,
    provider: configured ? "gemini" : "none",
    model,
    label,
    public: true,
    rateLimit: {
      max: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
    },
    hint: configured
      ? undefined
      : "Set GOOGLE_AI_API_KEY in Vercel env vars to enable the AI. Get a free key at https://aistudio.google.com/apikey",
  })
}
