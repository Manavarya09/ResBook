import { cn } from "@/lib/utils";
import type { ContentStatus } from "@/lib/types";

interface StatusBadgeProps {
  status?: ContentStatus;
  className?: string;
}

const statusConfig: Record<ContentStatus, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  "in-review": {
    label: "In Review",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  published: {
    label: "Published",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  deprecated: {
    label: "Deprecated",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status || status === "published") {
    return null;
  }

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium rounded",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

export function EndorsementBadge({ count }: { count?: number }) {
  if (!count || count === 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
      <span className="text-green-600">♥</span>
      {count}
    </span>
  );
}
