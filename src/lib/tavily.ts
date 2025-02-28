"use server";

export interface SearchResult {
  url: string;
  title: string;
  content: string;
  score: number;
  raw_content: null;
}

export interface SearchResponse {
  query: string;
  follow_up_questions: string | null;
  answer: string;
  images: {
    url: string;
    description: string;
  }[];
  results: SearchResult[];
}

export async function getSearchResults(
  searchQuery: string
): Promise<SearchResponse> {
  const apiUrl = "https://api.tavily.com/search";

  // *NOTE: DEBUGGING
  // console.log("hahahaa", searchQuery);

  // if (process.env.TAVILY_API_KEY) {
  //   console.log("API Key:", process.env.TAVILY_API_KEY);
  // }

  const requestPayload = {
    api_key: process.env.TAVILY_API_KEY,
    query: searchQuery,
    search_depth: "general",
    include_images: true,
    include_answer: true,
    include_image_descriptions: true,
    include_raw_content: false,
    max_results: 6,
  };

  // *NOTE: DEBUGGING
  console.log("Request Payload:", requestPayload);

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`, // Use Authorization header
      },
      body: JSON.stringify({
        query: searchQuery,
        search_depth: "basic",
        include_images: true,
        include_answer: true,
        include_image_descriptions: true,
        include_raw_content: false,
        max_results: 6,
      }),
    });

    // *NOTE: DEBUGGING
    console.log(apiResponse);

    if (!apiResponse.ok) {
      throw new Error(
        `Failed to fetch search results: ${apiResponse.statusText}`
      );
    }

    const responseJson: SearchResponse = await apiResponse.json();
    return responseJson;
  } catch (error) {
    console.log("Error fetching search results:", error);
    throw new Error(
      "An error occurred while fetching search results. Please try again later."
    );
  }
}
