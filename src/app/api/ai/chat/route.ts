import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {
  cleanText,
  parseStructuredResponseSafe,
  derivePlainResponse,
  looksLikeJson,
  type StructuredAIResponse,
} from "@/lib/ai-prompt"
import {
  buildAuthedSystemPrompt,
  trimHistoryWithSummary,
} from "@/lib/ai-context"

export const runtime = "nodejs"
export const maxDuration = 60 // Gemini can take 5-15s on cold start

// Default Gemini model. Override with GEMINI_MODEL env var if you want to
// switch to e.g. "gemini-2.5-flash", "gemini-2.0-flash-lite", etc.
const DEFAULT_MODEL = "gemini-2.0-flash"

// Models to try in order, each has separate quota limits.
// If the primary hits a 429 (rate limit / quota), we fall back automatically.
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || DEFAULT_MODEL,
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
].filter((v, i, arr) => arr.indexOf(v) === i) // dedupe

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
      msg.includes("resource exhausted")
    )
  }
  return false
}

/**
 * Convert OpenAI-style messages to Gemini's expected format and call the model.
 * - "system" role -> systemInstruction (separate param)
 * - "assistant" role -> "model" role
 * - "user" role stays "user"
 */
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

  // Convert messages (skip system — it's passed as systemInstruction)
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

  // Single message, use simple generateContent
  if (history.length <= 1) {
    const result = await model.generateContent(lastUserMessage)
    return result.response.text()
  }

  // Multi-turn conversation, use chat
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

export async function POST(req: NextRequest) {
  try {
    // Auth: protect your Gemini quota from anonymous abuse
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { message, history } = body

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Quick config check so we return a helpful message instead of a 500.
    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI not configured",
          details: "GOOGLE_AI_API_KEY env var is missing.",
          response:
            "The AI assistant isn't configured yet. Add a GOOGLE_AI_API_KEY (free at https://aistudio.google.com/apikey) in your .env file or Vercel env vars.",
        },
        { status: 503 }
      )
    }

    // Build a personalized system prompt for the logged-in user.
    // Pulls in their name, startup, industry, stage, plan, recent roadmap
    // items, and last conversation topic. Falls back to the generic
    // prompt if the lookup fails for any reason.
    const systemPrompt = await buildAuthedSystemPrompt(session.user.id)

    // Build conversation: system prompt + trimmed/summarized history + new message.
    // When the chat grows past ~12 messages, older ones get squashed into
    // a single summary system message so we keep context without burning
    // the token budget on full old messages.
    const trimmedHistory = Array.isArray(history)
      ? trimHistoryWithSummary(
          history.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          }))
        )
      : []

    const messages: Array<{ role: string; content: string }> = [
      ...trimmedHistory,
    ]

    messages.push({ role: "user", content: message })

    const raw = await geminiChat(messages, systemPrompt)

    // Parse the structured JSON response with a regex-based fallback so we
    // never dump raw JSON at the user when the model emits slightly
    // malformed JSON (extra quotes, trailing commas, unescaped newlines).
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
    })
  } catch (error: unknown) {
    console.error("AI Chat error:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: errorMessage,
        response:
          "I'm having trouble connecting right now. Please try again in a moment.",
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint: AI service status.
 * Used by the dashboard search bar to display the active model badge.
 */
export async function GET() {
  const configured = !!process.env.GOOGLE_AI_API_KEY
  const model = GEMINI_MODELS[0]

  // Pretty label: gemini-2.0-flash -> Gemini 2.0 Flash
  const label = model
    .replace(/^gemini/i, "Gemini")
    .replace(/-/g, " ")
    .replace(/\b(flash|pro|lite|mini)\b/gi, (m) => m.charAt(0).toUpperCase() + m.slice(1))
    .replace(/\b(\d+\.\d+)\b/g, "$1")

  return NextResponse.json({
    online: configured,
    provider: configured ? "gemini" : "none",
    model,
    label,
    geminiConfigured: configured,
    hint: configured
      ? undefined
      : "Set GOOGLE_AI_API_KEY in Vercel env vars to enable the AI. Get a free key at https://aistudio.google.com/apikey",
  })
}
