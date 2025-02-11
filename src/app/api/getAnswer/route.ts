import { normalizeData } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();
  console.log("Received query:", query);

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `Self research and make me a document related to ${query}`,
          },
        ],
        temperature: 0.7,
      }),
    }
  );

  const data = await response.json();
  console.log("Groq API Response:", data);

  if (!data.choices || data.choices.length === 0) {
    return NextResponse.json(
      { answer: "No valid answer found" },
      { status: 400 }
    );
  }

  const answer = normalizeData(data.choices[0].message.content);

  return NextResponse.json({ answer });
}
