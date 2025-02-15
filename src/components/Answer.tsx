"use client";

import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // Fix lỗi xuống dòng Markdown
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const Answer = ({ query }: { query: string }) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Dùng useCallback để tránh render lại không cần thiết
  const fetchAnswer = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);

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
      setAnswer(data.answer || "No valid answer found.");
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Error fetching answer.");
    } finally {
      setLoading(false);
    }
  }, [query]); // ✅ Đảm bảo `fetchAnswer` không bị re-create mỗi lần render

  useEffect(() => {
    fetchAnswer();
  }, [fetchAnswer]); // ✅ Không còn lỗi ESLint

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Answer:</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : answer ? (
        <ReactMarkdown
          className="prose prose-lg max-w-none text-gray-800"
          remarkPlugins={[remarkGfm, remarkBreaks]} // Fix lỗi xuống dòng
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="text-3xl font-bold text-blue-700 mt-6"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="text-2xl font-semibold text-blue-600 mt-5"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="text-xl font-medium text-blue-500 mt-4"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p className="text-gray-700 leading-7 mt-2" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc list-inside space-y-2 mt-2" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol
                className="list-decimal list-inside space-y-2 mt-2"
                {...props}
              />
            ),
            pre: ({ ...props }) => (
              <pre
                className="bg-gray-100 p-4 rounded-md overflow-x-auto border border-gray-300"
                {...props}
              />
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-blue-400 pl-4 italic text-gray-600 mt-3"
                {...props}
              />
            ),
          }}
        >
          {answer}
        </ReactMarkdown>
      ) : (
        <p className="text-gray-500">No answer found</p>
      )}
    </div>
  );
};

export default Answer;
