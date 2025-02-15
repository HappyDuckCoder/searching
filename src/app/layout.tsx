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
        <body className="bg-slate-900 text-gray-200 font-sans">
          <div className="flex flex-col items-center justify-center">
            <main className="w-full h-full overflow-hidden break-words whitespace-normal text-ellipsis">
              {children}
            </main>
          </div>
        </body>
      </Theme>
    </html>
  );
}
