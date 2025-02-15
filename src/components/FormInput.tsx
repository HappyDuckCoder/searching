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
      className="flex items-center space-x-3 bg-white shadow-md rounded-full p-2 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="flex-1 px-4 py-2 bg-transparent focus:outline-none focus:ring-0"
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
