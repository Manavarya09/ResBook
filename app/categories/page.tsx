import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/mdx";
import { MessageSquare, Bot, Code, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories | ResBook",
  description: "Browse AI tools by category.",
};

const categories = [
  {
    id: "LLM",
    name: "LLM",
    description: "Large Language Models and AI chat interfaces for general-purpose tasks.",
    icon: MessageSquare,
  },
  {
    id: "Agent",
    name: "Agent",
    description: "AI agents that can autonomously plan and execute multi-step tasks.",
    icon: Bot,
  },
  {
    id: "IDE",
    name: "IDE",
    description: "AI-powered code editors and development environments.",
    icon: Code,
  },
  {
    id: "CLI",
    name: "CLI",
    description: "Command-line tools and terminal applications with AI capabilities.",
    icon: Terminal,
  },
];

export default async function CategoriesPage() {
  const toolsData = await getTools();
  const tools = toolsData.map((t) => t.frontmatter);

  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count: tools.filter((t) => t.category === cat.id).length,
  }));

  return (
    <div className="min-h-screen border-l border-gray-300 dark:border-gray-700">
      <div className="max-w-4xl px-8 py-12">
        <div className="mb-8 text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white">home</Link>
          <span>/</span>
          <span className="text-black dark:text-white">categories</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse AI tools by category to find what fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryCounts.map((category) => (
            <Link
              key={category.id}
              href={`/tools?category=${category.id}`}
              className="border border-gray-300 dark:border-gray-700 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <category.icon className="w-6 h-6" />
                <h2 className="text-xl font-bold">{category.name}</h2>
                <span className="ml-auto text-sm text-gray-500">
                  {category.count} tools
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
