import FormInput from "@/components/FormInput";
import Images from "@/components/Images";
import Question from "@/components/Question";
import Sources from "@/components/Sources";
import Videos from "@/components/Videos";
import React from "react";

const SearchPage = async ({ params }: { params: { slug: string } }) => {
  const query = await params.slug;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="flex flex-col space-y-2">
        <Question query={query} />
        <Videos query={query} />
        <Images query={query} />
        <Sources query={query} />

        <FormInput />
      </section>
    </main>
  );
};

export default SearchPage;
