"use client";

import Answer from "@/components/Answer";
import FormInput from "@/components/FormInput";
import Images from "@/components/Images";
import Question from "@/components/Question";
import Sources from "@/components/Sources";
import Videos from "@/components/Videos";
import { useParams } from "next/navigation"; // ✅ Support for Next.js App Router
import React from "react";

const SearchPage = ({ params }: { params: { slug: string } }) => {
  // ✅ Get params from Next.js router if not passed as a prop
  const routerParams = useParams();
  let slug = params?.slug || routerParams?.slug;

  // ✅ Ensure slug is a string (handle array case)
  if (Array.isArray(slug)) {
    slug = slug.join("/"); // Convert ["search", "example"] to "search/example"
  }

  // ✅ Prevent decodeURIComponent error if slug is undefined
  const query = slug ? decodeURIComponent(slug) : "Unknown Query";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <section className="flex items-center justify-center flex-col w-full max-w-7xl overflow-hidden break-words whitespace-normal text-ellipsis p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Search Results for: <span className="text-blue-600">{query}</span>
        </h1>

        {/* ✅ Render components only if a valid query exists */}
        {query !== "Unknown Query" ? (
          <div className="space-y-4 flex items-center justify-center flex-col w-full max-w-7xl overflow-hidden break-words whitespace-normal text-ellipsis p-6">
            <Question query={query} />
            <Videos query={query} />
            <Images query={query} />
            <Sources query={query} />
            <Answer query={query} />
          </div>
        ) : (
          <p className="text-red-500 text-center">Invalid search query.</p>
        )}

        <div className="border-t pt-4">
          <FormInput />
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
