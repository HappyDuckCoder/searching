import { normalizeData } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();
  if (!query || query.trim() === "") {
    return NextResponse.json({ answer: "Invalid query." }, { status: 400 });
  }

  // Tạo nội dung prompt với query thực tế
  const content = `
You are an expert in ${query}, capable of explaining it in a clear, detailed, and structured manner. Generate a high-quality, in-depth document on **"${query}"** with the following sections:

1️⃣ **Introduction**  
   - Briefly explain what ${query} is and why it is important.  
   - Provide real-world applications of ${query}.  

2️⃣ **Core Concepts**  
   - Define and explain the key concepts related to ${query}.  
   - Include practical examples to enhance understanding.  

3️⃣ **Step-by-Step Guide**  
   - Provide a structured approach or methodology for working with ${query}.  
   - If applicable, describe relevant algorithms, formulas, or workflows.  

4️⃣ **Tips and Best Practices**  
   - Common mistakes to avoid when dealing with ${query}.  
   - Useful tools, resources, or techniques to improve efficiency.  

5️⃣ **Conclusion**  
   - Summarize the key takeaways from the document.  
   - Suggest next steps for further learning.  

📌 **Special Requirements:**  
- Maintain a professional yet accessible writing style.  
- Use bullet points, tables, or diagrams when necessary for clarity.  
- If relevant, provide sample code snippets or case studies.  
- Ensure factual accuracy and reliability.  

💡 This document should be educational, applicable, and valuable for readers looking to understand ${query} deeply.
`;

  try {
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
          messages: [{ role: "system", content }],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { answer: "No valid answer found." },
        { status: 400 }
      );
    }

    const answer = normalizeData(data.choices[0].message.content);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error fetching from Groq API:", error);
    return NextResponse.json(
      { answer: "Error fetching answer from AI service." },
      { status: 500 }
    );
  }
}
