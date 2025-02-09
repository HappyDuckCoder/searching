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

    router.replace(`/search/${search}`);
  };
  return (
    <form className="flex flex-row space-x-2" onSubmit={handleSubmit}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <Button type="submit" variant="outline" size="icon">
        <ChevronRight />
      </Button>
    </form>
  );
};

export default FormInput;
