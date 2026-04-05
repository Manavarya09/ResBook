import type { Metadata } from "next";
import Link from "next/link";
import { getWorkflows } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Workflows | ResBook",
  description: "Browse practical, agentic workflows from the ResBook community.",
};

export default async function WorkflowsPage() {
  const workflowsData = await getWorkflows();
  const workflows = workflowsData.map((workflow) => workflow.frontmatter);

  return (
    <div className="min-h-screen border-l border-gray-300 dark:border-gray-700">
      <div className="max-w-3xl px-8 py-12">
        <div className="mb-8 text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white">
            home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">workflows</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Workflows</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Reproducible blueprints for shipping faster with AI tools.
          </p>
        </div>

        {workflows.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No workflows published yet.</p>
        ) : (
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <Link
                key={workflow.slug}
                href={`/workflows/${workflow.slug}`}
                className="block border border-gray-300 p-4 hover:bg-gray-50 transition-colors no-underline dark:border-gray-700 dark:hover:bg-gray-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-black dark:text-white mb-1">{workflow.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{workflow.description}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-500">
                      by <span className="font-bold">{workflow.author}</span>
                    </p>
                    {workflow.toolsUsed.length > 0 && (
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-500">
                        tools: {workflow.toolsUsed.join(", ")}
                      </p>
                    )}
                  </div>
                  <span className="text-xs border border-gray-300 px-2 py-1 whitespace-nowrap dark:border-gray-700">
                    {workflow.complexity}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
