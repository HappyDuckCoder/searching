import { Hero } from "@/components/Hero";
import React from "react";

const Home = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 bg-slate-900">
      <Hero />
    </main>
  );
};

export default Home;
