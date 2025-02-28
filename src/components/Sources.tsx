"use client";

import { DuckDuckGoRelatedTopic } from "@/lib/duckduckgo";
import React, { useEffect, useState, useCallback } from "react";
import SourceCard from "./radix/SourceCard";

const Sources = ({ query }: { query: string }) => {
  const [sources, setSources] = useState<DuckDuckGoRelatedTopic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSources = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching sources for:", query);

      const response = await fetch("/api/getImagesAndSources2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sources");
      }

      const data = await response.json();
      console.log("Fetched sources:", data.RelatedTopics);

      // Lấy đúng 4 kết quả, nếu ít hơn 4 thì tự thêm card rỗng
      const filledSources = [...data.RelatedTopics.slice(0, 6)];
      while (filledSources.length < 6) {
        filledSources.push({ Text: "", FirstURL: "", Icon: { URL: "" } });
      }

      setSources(filledSources);
    } catch (err) {
      console.error("Error fetching sources:", err);
      setError("Could not load sources. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  return (
    <div className="w-full p-4 mb-6 bg-slate-800 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Sources:</h2>
      {loading && <p className="text-gray-400">Loading...</p>}{" "}
      {/* Màu sắc khi loading */}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {sources.map((source, index) => (
          <SourceCard key={index} source={source} />
        ))}
      </div>
    </div>
  );
};

export default Sources;
