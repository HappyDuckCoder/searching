import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDocument(text: string): string {
  return text
    .replace(/(-{10,})/g, "\n\n") // Chuyển các dòng kẻ dài thành 2 dòng trống
    .replace(
      /(Introduction|Main Content|Origins of "Hey"|Cultural Significance|Linguistic Evolution|Psychological Impact|Conclusion)/g,
      "\n### $1\n"
    ) // Định dạng tiêu đề
    .replace(/(\.\s+)/g, ".\n\n") // Xuống dòng sau dấu chấm câu
    .trim();
}

export function normalizeData(data: any): any {
  if (typeof data === "string") {
    return formatDocument(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => normalizeData(item));
  }

  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, normalizeData(value)])
    );
  }

  return data;
}

export const getValidImageUrl = (url: string | undefined) => {
  if (!url || url.trim() === "") {
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }

  if (!url.startsWith("http")) {
    return `https://duckduckgo.com${url}`;
  }

  return url;
};
