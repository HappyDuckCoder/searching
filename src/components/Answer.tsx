"use client";

import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // Fix lỗi xuống dòng Markdown
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // Giao diện code dark mode
import fileDownload from "js-file-download"; // Thư viện tải file
import { saveAs } from "file-saver"; // Hỗ trợ lưu file
import { Button } from "@/components/ui/button"; // Nút tải file

const Answer = ({ query }: { query: string }) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Dùng useCallback để tối ưu hiệu suất
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
  }, [query]);

  useEffect(() => {
    fetchAnswer();
  }, [fetchAnswer]);

  // 📌 Hàm tải xuống file dưới dạng DOCX
  const handleDownloadDoc = () => {
    if (!answer) return;

    const docContent = `
      ${query ? `## Question:\n${query}\n\n` : ""}
      ## Answer:\n${answer.replace(/\n/g, "\n\n")}
    `;

    const blob = new Blob([docContent], { type: "application/msword" });

    // ✅ Dùng `fileDownload` và `saveAs` để tải file
    fileDownload(blob, "Answer.docx");
    saveAs(blob, "Answer.docx");
  };

  return (
    <div className="relative w-full p-4 mb-6 bg-slate-800 border border-gray-700 rounded-lg shadow-lg">
      {/* 📌 Nút tải DOC ở góc trên bên phải */}
      <Button
        onClick={handleDownloadDoc}
        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
      >
        Download as DOC
      </Button>

      <h2 className="text-2xl font-bold mb-4">Answer:</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : answer ? (
        <ReactMarkdown
          className="prose prose-lg max-w-none text-gray-300"
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="text-3xl font-bold text-blue-300 mt-6"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="text-2xl font-semibold text-blue-400 mt-5"
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
              <p className="text-gray-300 leading-7 mt-2" {...props} />
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
                className="bg-gray-800 p-4 rounded-md overflow-x-auto border border-gray-600"
                {...props}
              />
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-blue-500 pl-4 italic text-gray-400 mt-3"
                {...props}
              />
            ),
          }}
        >
          {answer}
        </ReactMarkdown>
      ) : (
        <p className="text-gray-400">No answer found</p>
      )}
    </div>
  );
};

export default Answer;
