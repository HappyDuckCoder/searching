import { getSearchResults } from "@/lib/tavily";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    console.log("Received request with query:", question);

    if (!question) {
      return new Response(JSON.stringify({ error: "Missing query" }), {
        status: 400,
      });
    }

    const searchResults = await getSearchResults(question);
    console.log("API response:", searchResults);

    return new Response(JSON.stringify({ images: searchResults.images }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
    });
  }
}
