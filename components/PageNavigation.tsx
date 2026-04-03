import Link from "next/link";

interface PageNavigationProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
      <div className="grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="block p-4 border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-950 transition-colors no-underline"
          >
            <div className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
              ← Previous
            </div>
            <div className="font-bold text-black dark:text-white hover:opacity-75">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.href}
            className="block p-4 border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-950 transition-colors no-underline text-right"
          >
            <div className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
              Next →
            </div>
            <div className="font-bold text-black dark:text-white hover:opacity-75">
              {next.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
