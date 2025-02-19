"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SimilarQuestion = ({ query }: { query: string }) => {
  const router = useRouter();
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);

  const generateSimilarQuestions = useCallback(async () => {
    if (!query) return; // ✅ Tránh fetch khi `query` trống

    try {
      const response = await fetch("/api/getSimilarQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) return;

      const data = await response.json();
      setSimilarQuestions((data.similarTopics as string[]) || []);
    } catch (error) {
      console.error("Error fetching similar questions:", error);
    }
  }, [query]);

  useEffect(() => {
    generateSimilarQuestions();
  }, [generateSimilarQuestions]); // ✅ Không còn lỗi ESLint

  return (
    <div className="flex flex-col items-center w-full mx-auto p-4">
      {similarQuestions.length > 0 ? (
        <ul className="w-full space-y-3">
          {similarQuestions.map((question, index) => (
            <li key={index} className="w-full">
              <Button
                variant="outline"
                className="w-full flex items-center text-white justify-between p-3 border rounded-lg transition-all duration-200 bg-inherit border-none hover:bg-gray-100 hover:translate-x-2"
                onClick={() => router.push(`/search/${question}`)}
              >
                <span className="text-left  text-sm font-medium break-words whitespace-normal overflow-hidden truncate">
                  {question}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">
          No similar questions found.
        </p>
      )}
    </div>
  );
};

export default SimilarQuestion;
