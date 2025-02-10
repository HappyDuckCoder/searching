"use client";

import React, { useState, useEffect } from "react";
import MyVideoCard from "./radix/Card";
import { FinalResultResponse } from "@/lib/youtube";

const Videos = ({ query }: { query: string }) => {
  const [videos, setVideos] = useState<FinalResultResponse[]>([]);

  const fetchVideos = async () => {
    if (!query) return;

    try {
      const response = await fetch("/api/getYoutubeVideos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) {
        console.error("Failed to fetch videos");
        return;
      }

      const data = await response.json();

      console.log(data);

      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [query]);

  return (
    <div>
      <ul className="flex flex-row flex-wrap justify-center gap-2">
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video.url}>
              <MyVideoCard video={video} />
            </li>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </ul>
    </div>
  );
};

export default Videos;
