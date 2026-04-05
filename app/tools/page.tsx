import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tools | ResBook",
  description: "Browse all reviewed AI tools in ResBook.",
};

const categoryOrder = ["LLM", "Agent", "IDE", "CLI"] as const;

export default async function ToolsPage() {
  const toolsData = await getTools();
  const tools = toolsData.map((tool) => tool.frontmatter);

  const categories = categoryOrder
    .map((category) => ({
      category,
      items: tools.filter((tool) => tool.category === category),
    }))
    .filter((entry) => entry.items.length > 0);

  return (
    <div className="min-h-screen border-l border-gray-300 dark:border-gray-700">
      <div className="max-w-3xl px-8 py-12">
        <div className="mb-8 text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white">
            home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">tools</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Tools</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Curated AI tools with practical reviews and quick verdicts.
          </p>
        </div>

        {tools.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No tools published yet.</p>
        ) : (
          <div className="space-y-12">
            {categories.map(({ category, items }) => (
              <section key={category}>
                <h2 className="mb-4 text-lg font-bold border-b border-gray-300 pb-2 dark:border-gray-700">
                  {category}
                </h2>
                <div className="space-y-4">
                  {items.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block border border-gray-300 p-4 hover:bg-gray-50 transition-colors no-underline dark:border-gray-700 dark:hover:bg-gray-950"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold mb-1 text-black dark:text-white">{tool.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                        </div>
                        <div className="flex gap-2 whitespace-nowrap">
                          <span className="text-xs border border-gray-300 px-2 py-1 dark:border-gray-700">
                            {tool.pricing}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 font-bold ${
                              tool.worthIt
                                ? "border border-black bg-white dark:border-white dark:bg-black"
                                : "border border-gray-400 text-gray-600 dark:border-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {tool.worthIt ? "✓" : "−"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
