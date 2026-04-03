import { ReactNode } from "react";

interface PromptBlockProps {
  agent: string;
  children: ReactNode;
}

export function PromptBlock({ agent, children }: PromptBlockProps) {
  return (
    <div className="my-6 border border-gray-300 overflow-hidden dark:border-gray-700 rounded">
      <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-xs font-bold uppercase tracking-wide">
        {agent}
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-950 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
