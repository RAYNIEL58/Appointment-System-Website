import { NextResponse } from "next/server"

const services = ["ECG", "ULTRASOUND", "EYE CHECK UP", "2D ECHO"] as const
type Service = (typeof services)[number]

function buildSystemPrompt() {
  return `
You are an AI assistant helping patients book appointments at a small clinic.

The clinic has ONLY these services:
- ULTRASOUND
- EYE CHECK UP
- 2D ECHO
- ECG

Rules:
- Recommend ONLY one of these services based on the patient's concern.
- If you are not sure which service is appropriate, pick the closest reasonable one and explain briefly in simple language.

Output format (IMPORTANT):
Always respond with a SINGLE JSON object and nothing else, in this exact shape:
{
  "reply": "natural language explanation for the patient",
  "service": "ECG" | "ULTRASOUND" | "EYE CHECK UP" | "2D ECHO" | null
}

Do NOT include backticks or any text before or after the JSON.
`.trim()
}

export async function POST(req: Request) {
  let body: { message?: string; formData?: any } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const message = (body.message ?? "").toString().trim()
  if (!message) {
    return NextResponse.json(
      { error: "Missing message", reply: "Please type your question or concern." },
      { status: 400 }
    )
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "The AI assistant is not configured yet. Please fill out the form manually or contact the clinic.",
        service: null,
        date: null,
        time: null,
        error: "OPENAI_API_KEY is not set on the server.",
      },
      { status: 200 }
    )
  }

  try {
    const systemPrompt = buildSystemPrompt()

    const payload = {
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.2,
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error("OpenAI API error:", response.status, text)
      return NextResponse.json(
        {
          reply:
            "Sorry, the AI assistant is temporarily unavailable. Please try again or fill out the form manually.",
          service: null,
          date: null,
          time: null,
          error: "OpenAI API error",
        },
        { status: 200 }
      )
    }

    const data = await response.json()
    const raw = (data.choices?.[0]?.message?.content ?? "").toString().trim()

    let parsed: { reply?: string; service?: Service | null }
    try {
      parsed = JSON.parse(raw)
    } catch {
      // Fallback: treat whole content as reply
      return NextResponse.json(
        {
          reply: raw || "Sorry, I couldn't understand the response.",
          service: null,
          date: null,
          time: null,
        },
        { status: 200 }
      )
    }

    let service: Service | null =
      parsed.service && services.includes(parsed.service) ? parsed.service : null

    return NextResponse.json(
      {
        reply: parsed.reply ?? raw,
        service,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("POST /api/ai-assist:", error)
    return NextResponse.json(
      {
        reply:
          "Sorry, something went wrong talking to the AI assistant. Please try again or fill out the form manually.",
        service: null,
        date: null,
        time: null,
        error: "Unexpected error",
      },
      { status: 200 }
    )
  }
}

