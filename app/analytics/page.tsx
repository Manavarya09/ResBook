import type { Metadata } from "next";
import Link from "next/link";
import { getDotfiles, getTools, getWorkflows } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Analytics | ResBook",
  description: "Content analytics and insights for ResBook.",
};

function countByCategory<T extends { category?: string; kind?: string }>(items: T[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const key = (item.category || item.kind || "Unknown") as string;
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function getComplexityCounts(workflows: { complexity: string }[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const w of workflows) {
    counts[w.complexity] = (counts[w.complexity] || 0) + 1;
  }
  return counts;
}

function getPricingCounts(tools: { pricing: string }[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const t of tools) {
    counts[t.pricing] = (counts[t.pricing] || 0) + 1;
  }
  return counts;
}

export default async function AnalyticsPage() {
  const [toolsData, workflowsData, dotfilesData] = await Promise.all([
    getTools(),
    getWorkflows(),
    getDotfiles(),
  ]);

  const tools = toolsData.map((t) => t.frontmatter);
  const workflows = workflowsData.map((w) => w.frontmatter);
  const dotfiles = dotfilesData.map((d) => d.frontmatter);

  const totalTools = tools.length;
  const totalWorkflows = workflows.length;
  const totalDotfiles = dotfiles.length;
  const totalContent = totalTools + totalWorkflows + totalDotfiles;

  const toolCategories = countByCategory(tools);
  const workflowComplexities = getComplexityCounts(workflows);
  const toolPricings = getPricingCounts(tools);
  const dotfileKinds = countByCategory(dotfiles);

  const freeTools = tools.filter((t) => t.pricing === "Free").length;
  const worthItTools = tools.filter((t) => t.worthIt).length;

  const beginnerWorkflows = workflows.filter((w) => w.complexity === "Beginner").length;
  const intermediateWorkflows = workflows.filter((w) => w.complexity === "Intermediate").length;
  const advancedWorkflows = workflows.filter((w) => w.complexity === "Advanced").length;

  const totalEndorsements = tools.reduce((sum, t) => sum + (t.endorsements || 0), 0);

  return (
    <div className="min-h-screen border-l border-gray-300 dark:border-gray-700">
      <div className="max-w-5xl px-8 py-12">
        <div className="mb-8 text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white">
            home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">analytics</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Content insights and statistics for ResBook.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-gray-300 p-4 dark:border-gray-700">
            <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Total Content</p>
            <p className="mt-2 text-3xl font-bold">{totalContent}</p>
          </div>
          <div className="border border-gray-300 p-4 dark:border-gray-700">
            <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Tools</p>
            <p className="mt-2 text-3xl font-bold">{totalTools}</p>
          </div>
          <div className="border border-gray-300 p-4 dark:border-gray-700">
            <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Workflows</p>
            <p className="mt-2 text-3xl font-bold">{totalWorkflows}</p>
          </div>
          <div className="border border-gray-300 p-4 dark:border-gray-700">
            <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Dotfiles</p>
            <p className="mt-2 text-3xl font-bold">{totalDotfiles}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tools Breakdown */}
          <div className="border border-gray-300 p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Tools</h2>
            
            <div className="mb-4">
              <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">By Category</p>
              <div className="space-y-2">
                {Object.entries(toolCategories).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm">{category}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">By Pricing</p>
              <div className="space-y-2">
                {Object.entries(toolPricings).map(([pricing, count]) => (
                  <div key={pricing} className="flex items-center justify-between">
                    <span className="text-sm">{pricing}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recommended</p>
                  <p className="text-2xl font-bold text-green-600">{worthItTools}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Free Options</p>
                  <p className="text-2xl font-bold">{freeTools}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflows Breakdown */}
          <div className="border border-gray-300 p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Workflows</h2>
            
            <div className="mb-4">
              <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">By Complexity</p>
              <div className="space-y-2">
                {Object.entries(workflowComplexities).map(([complexity, count]) => (
                  <div key={complexity} className="flex items-center justify-between">
                    <span className="text-sm">{complexity}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Beginner</p>
                  <p className="text-2xl font-bold text-green-600">{beginnerWorkflows}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Intermediate</p>
                  <p className="text-2xl font-bold text-yellow-600">{intermediateWorkflows}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Advanced</p>
                  <p className="text-2xl font-bold text-red-500">{advancedWorkflows}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dotfiles Breakdown */}
          <div className="border border-gray-300 p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Dotfiles</h2>
            
            <div>
              <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">By Kind</p>
              <div className="space-y-2">
                {Object.entries(dotfileKinds).map(([kind, count]) => (
                  <div key={kind} className="flex items-center justify-between">
                    <span className="text-sm">{kind}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="border border-gray-300 p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Community</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Endorsements</p>
                <p className="text-2xl font-bold">{totalEndorsements}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Average per Tool</p>
                <p className="text-2xl font-bold">
                  {totalTools > 0 ? (totalEndorsements / totalTools).toFixed(1) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools" className="border border-gray-300 px-3 py-2 no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-950">
            Browse tools
          </Link>
          <Link href="/workflows" className="border border-gray-300 px-3 py-2 no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-950">
            Browse workflows
          </Link>
          <Link href="/dotfiles" className="border border-gray-300 px-3 py-2 no-underline hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-950">
            Browse dotfiles
          </Link>
        </div>
      </div>
    </div>
  );
}
