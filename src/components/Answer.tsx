"use client";

import React, { useEffect, useState } from "react";

const Answer = ({ query }: { query: string }) => {
  const [answer, setAnswer] = useState<string | null>(null);

  const fetchAnswer = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch("/api/getAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch answer: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched answer:", data); // Kiểm tra dữ liệu trả về
      setAnswer(data.answer || "No valid answer found.");
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Error fetching answer.");
    }
  };

  useEffect(() => {
    fetchAnswer();
  }, [query]);

  return (
    <div className="flex flex-col space-y-2">
      <h2>Answer:</h2>
      <div>{answer ? <div>{answer}</div> : <div>No answer found</div>}</div>
    </div>
  );
};

export default Answer;
