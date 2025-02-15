import type { Metadata } from "next";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Duckilot",
  description: "Search smarter with Duckilot",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Theme>
        <body className="bg-gray-100 text-gray-900">
          <div className="flex flex-col items-center justify-center p-4">
            <main className="w-full max-w-7xl overflow-hidden break-words whitespace-normal text-ellipsis">
              {children}
            </main>
          </div>
        </body>
      </Theme>
    </html>
  );
}
