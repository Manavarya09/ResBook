import { ReactNode } from "react";

interface WorkflowStepProps {
  step: number;
  title: string;
  children: ReactNode;
}

export function WorkflowStep({ step, title, children }: WorkflowStepProps) {
  return (
    <div className="my-8 ml-6 border-l-2 border-gray-300 pl-6 dark:border-gray-700 relative">
      {/* Step Number Indicator */}
      <div className="absolute -left-4 -top-1 w-7 h-7 bg-white dark:bg-black border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
        {step}
      </div>

      <div>
        <h4 className="font-bold text-lg mb-3">{title}</h4>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}
