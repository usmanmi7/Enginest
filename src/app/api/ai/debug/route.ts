import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * GET /api/ai/debug — diagnostics for the AI Assistant.
 *
 * Surfaces config status and runs a tiny live test against Gemini so we
 * can see exactly what's wrong. Does NOT expose the API key itself.
 *
 * Public on purpose — it returns no secrets, just config status. Safe
 * to share the URL when debugging with the team.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  const configured = !!apiKey
  const keyPreview = apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : "(not set)"
  const keyLength = apiKey ? apiKey.length : 0

  // Heuristic: Google AI Studio keys typically start with "AIza" and are
  // 39 chars. If the user pasted a different format (e.g. OAuth token,
  // Cloud API key, or has a typo), flag it.
  const looksLikeAistudioKey = !!apiKey && apiKey.startsWith("AIza") && apiKey.length === 39

  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash"

  const baseStatus = {
    timestamp: new Date().toISOString(),
    runtime: "vercel-nodejs",
    provider: "gemini",
    model,
    apiKey: {
      configured,
      preview: keyPreview,
      length: keyLength,
      looksLikeAistudioKey,
      // Tip: standard Google AI Studio keys start with "AIza" and are 39 chars
      // Get one at https://aistudio.google.com/apikey
    },
    fallbackChain: [
      model,
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-2.5-flash",
    ],
  }

  if (!configured) {
    return NextResponse.json({
      ...baseStatus,
      liveTest: { ran: false, reason: "No API key configured" },
      hint: "Add GOOGLE_AI_API_KEY to Vercel env vars. Get a free key at https://aistudio.google.com/apikey",
    }, { status: 200 }) // 200 so we can read it in browser
  }

  // Run a tiny live test: send "PONG" prompt and capture the response/error.
  let liveTest: Record<string, unknown>
  try {
    const genAI = new GoogleGenerativeAI(apiKey!)
    const testModel = genAI.getGenerativeModel({ model })
    const result = await testModel.generateContent("Reply with exactly the word PONG")
    const text = result.response.text()

    liveTest = {
      ran: true,
      ok: true,
      responsePreview: text.slice(0, 100),
      modelUsed: model,
    }
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    liveTest = {
      ran: true,
      ok: false,
      errorName: err.name,
      errorMessage: err.message,
      // Hint at common causes
      hint: err.message.includes("API_KEY_INVALID")
        ? "Key is invalid. Generate a new one at https://aistudio.google.com/apikey"
        : err.message.includes("not found") || err.message.includes("no longer available")
        ? `Model '${model}' is unavailable. Try setting GEMINI_MODEL=gemini-2.5-flash in Vercel env vars.`
        : err.message.includes("location is not supported")
        ? "Vercel region may be in an unsupported country. Try redeploying to a US region (default is iad1)."
        : err.message.includes("quota") || err.message.includes("429")
        ? "Quota exceeded. Wait a minute and try again, or use a different Google account."
        : "Unknown error. Check Vercel function logs for the full stack trace.",
    }
  }

  return NextResponse.json({ ...baseStatus, liveTest }, { status: 200 })
}
