import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResBook | AI Tools & Workflows Directory",
  description: "A markdown-driven directory for AI tools, agentic workflows, and developer tips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrainsMono.variable} h-full`}>
      <body className="min-h-full flex bg-white text-black font-mono antialiased dark:bg-black dark:text-white">
        <Sidebar />
        <main className="ml-64 flex-1">{children}</main>
      </body>
    </html>
  );
}
