"use client";

import Answer from "@/components/Answer";
import FormInput from "@/components/FormInput";
import Images from "@/components/Images";
import Question from "@/components/Question";
import Sources from "@/components/Sources";
import Videos from "@/components/Videos";
import { useParams } from "next/navigation"; // ✅ App Router hook
import React from "react";

const SearchPage = () => {
  const routerParams = useParams(); // ✅ Always use `useParams()`
  let slug = routerParams?.slug;

  if (Array.isArray(slug)) {
    slug = slug.join("/");
  }

  const query = slug ? decodeURIComponent(slug) : "Unknown Query";

  return (
    <main className="h-full w-full bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <section className="w-full max-w-7xl p-6 space-y-6 border-2 border-gray-700 bg-slate-800 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Search Results for: <span className="text-blue-400">{query}</span>
        </h1>

        {query !== "Unknown Query" ? (
          <div className="space-y-8 flex flex-col items-center justify-center">
            <Question query={query} />
            <Videos query={query} />
            <Images query={query} />
            <Sources query={query} />
            <Answer query={query} />
          </div>
        ) : (
          <p className="text-red-500 text-center text-lg font-semibold">
            Invalid search query.
          </p>
        )}

        <div className="border-t pt-4 w-full h-full">
          <FormInput />
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
