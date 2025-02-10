"use client";

import { SearchResult } from "@/lib/tavily";
import React, { useEffect, useState } from "react";
import SourceCard from "./radix/SourceCard";

const Sources = ({ query }: { query: string }) => {
  const [sources, setSources] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      try {
        const response = await fetch("/api/getImagesAndSources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();

        console.log("Fetched sources:", data);

        setSources(data.result || []);
      } catch (err) {
        console.error("Error fetching sources:", err);
        setError("Could not load sources. Please try again.");
      }
    };

    fetchImages();
  }, [query]);
  return (
    <div>
      <ul className="space-x-2 flex flex-row">
        {sources.length > 0 ? (
          sources.map((source) => (
            <li>
              <SourceCard key={source.url} source={source} />
            </li>
          ))
        ) : (
          <div>No sources found.</div>
        )}
      </ul>
    </div>
  );
};

export default Sources;
