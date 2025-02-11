import { DuckDuckGoResult, getResultFromDDG } from "@/lib/duckduckgo";

export const POST = async (request: Request) => {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Query is required and must be a string." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const res: DuckDuckGoResult | null = await getResultFromDDG({ query });

    if (!res) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from DuckDuckGo." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
