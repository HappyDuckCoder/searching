"use server";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

// Define the types for the YouTube API response
export interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Record<string, { url: string }>;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YouTubeVideoItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: YouTubeVideoSnippet;
}

export interface FinalResultResponse {
  name: string;
  url: string;
  image: string;
}

export async function getVideos(query: string): Promise<YouTubeVideoItem[]> {
  // ✅ Ensure API Key is defined
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error(
      "🚨 Missing API Key: Set NEXT_PUBLIC_YOUTUBE_API_KEY in .env.local"
    );
    return [];
  }

  const url = `${YOUTUBE_BASE_URL}/search?part=snippet&maxResults=6&key=${apiKey}&q=${encodeURIComponent(
    query
  )}&type=video`;

  try {
    const response = await fetch(url, { method: "GET" });

    // console.log(response);

    if (!response.ok) {
      console.error(
        `❌ YouTube API Error: ${response.statusText} (Status: ${response.status})`
      );
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    return [];
  }
}
