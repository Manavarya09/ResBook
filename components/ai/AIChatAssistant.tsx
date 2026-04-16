"use client";

import { useState } from "react";
import { Search, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ToolRecommendation {
  slug: string;
  title: string;
  category: string;
  matchScore: number;
  reason: string;
}

interface WorkflowRecommendation {
  slug: string;
  title: string;
  complexity: string;
  matchScore: number;
  reason: string;
}

const USE_CASE_KEYWORDS: Record<string, { tools: string[]; workflows: string[]; reason: string }> = {
  "code-review": {
    tools: ["github-copilot", "cursor", "cline", "sourcegraph-cody"],
    workflows: ["ship-feature-with-ai-pairing"],
    reason: "AI coding assistants excel at reviewing code and suggesting improvements",
  },
  "web-development": {
    tools: ["v0", "bolt-new", "lovable", "cursor"],
    workflows: ["end-to-end-nextjs", "from-idea-to-shipped-landing-page"],
    reason: "These tools specialize in building web applications from prompts",
  },
  "research": {
    tools: ["perplexity", "notebooklm", "chatgpt", "gemini"],
    workflows: ["weekly-ai-research-digest", "research-brief-to-build-plan"],
    reason: "LLMs with web search and note-taking capabilities for research",
  },
  "automation": {
    tools: ["n8n", "langgraph", "replit-agent"],
    workflows: ["automate-support-triage", "reddit-amplification-loop"],
    reason: "Build autonomous agents and automated workflows",
  },
  "cli-terminal": {
    tools: ["warp", "aider", "github-copilot"],
    workflows: ["open-source-pr-accelerator"],
    reason: "Terminal-based AI tools for command-line workflows",
  },
  "learning": {
    tools: ["notebooklm", "chatgpt", "perplexity"],
    workflows: ["student-learning-sprint-ai"],
    reason: "AI companions for studying and understanding concepts",
  },
  "content-creation": {
    tools: ["chatgpt", "claude-code", "notebooklm"],
    workflows: ["linkedin-weekly-authority-post", "community-launch-playbook"],
    reason: "Generate and refine content with AI assistance",
  },
  "startup-mvp": {
    tools: ["bolt-new", "lovable", "replit-agent", "v0"],
    workflows: ["hackathon-mvp-24h", "from-idea-to-shipped-landing-page"],
    reason: "Rapidly ship MVPs with AI-powered development",
  },
};

export function AIChatAssistant() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{
    tools: ToolRecommendation[];
    workflows: WorkflowRecommendation[];
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const detectUseCase = (input: string): string | null => {
    const normalized = input.toLowerCase();
    for (const [useCase] of Object.entries(USE_CASE_KEYWORDS)) {
      if (normalized.includes(useCase) || normalized.includes(useCase.replace("-", " "))) {
        return useCase;
      }
    }
    return null;
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const useCase = detectUseCase(query);

    const tools: ToolRecommendation[] = [];
    const workflows: WorkflowRecommendation[] = [];

    if (useCase) {
      const data = USE_CASE_KEYWORDS[useCase];
      data.tools.forEach((slug, i) => {
        tools.push({
          slug,
          title: slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          category: "Matched",
          matchScore: 100 - i * 10,
          reason: data.reason,
        });
      });
      data.workflows.forEach((slug, i) => {
        workflows.push({
          slug,
          title: slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          complexity: "Matched",
          matchScore: 100 - i * 10,
          reason: data.reason,
        });
      });
    } else {
      tools.push({
        slug: "chatgpt",
        title: "ChatGPT",
        category: "LLM",
        matchScore: 85,
        reason: "General-purpose AI for various tasks",
      });
      tools.push({
        slug: "cursor",
        title: "Cursor",
        category: "IDE",
        matchScore: 80,
        reason: "AI-powered code editor for development",
      });
    }

    setResults({ tools, workflows });
    setIsSearching(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Ask: &quot;What tool for code review?&quot; or &quot;How to build an MVP?&quot;
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you need help with?"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {isSearching ? "..." : <Search className="w-4 h-4" />}
            </button>
          </div>

          {results && (
            <div className="space-y-4">
              {results.tools.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold mb-2">Recommended Tools</h4>
                  <div className="space-y-2">
                    {results.tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="block p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{tool.title}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{tool.reason}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.workflows.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold mb-2">Relevant Workflows</h4>
                  <div className="space-y-2">
                    {results.workflows.map((workflow) => (
                      <Link
                        key={workflow.slug}
                        href={`/workflows/${workflow.slug}`}
                        className="block p-3 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{workflow.title}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{workflow.reason}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
