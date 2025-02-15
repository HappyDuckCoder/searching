"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const FormInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.replace(`/search/${search}`);
  };

  return (
    <form
      className="flex items-center space-x-3 bg-slate-800 shadow-lg rounded-full p-3 border border-slate-700 w-full h-full"
      onSubmit={handleSubmit}
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="flex-1 px-4 py-2 w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0 border-none"
      />

      <Button
        type="submit"
        variant="default"
        size="icon"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
      >
        <ChevronRight />
      </Button>
    </form>
  );
};

export default FormInput;
