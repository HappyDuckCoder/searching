"use server";

export interface DuckDuckGoResult {
  Abstract: string;
  AbstractText: string;
  AbstractURL: string;
  Image: string;
  Heading: string;
  RelatedTopics: DuckDuckGoRelatedTopic[];
}

export interface DuckDuckGoRelatedTopic {
  Text: string;
  FirstURL: string;
  Icon: { URL: string };
  Result: string;
}

export async function getResultFromDDG({ query }: { query: string }) {
  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: DuckDuckGoResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from DuckDuckGo:", error);
    return null;
  }
}
