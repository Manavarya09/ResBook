import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bookmarks | ResBook",
  description: "Your bookmarked tools, workflows, and dotfiles.",
};

interface Bookmark {
  slug: string;
  type: string;
  title: string;
  savedAt: string;
}

function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("resbook-bookmarks");
  return stored ? JSON.parse(stored) : [];
}

export default function BookmarksPage() {
  const bookmarks = getBookmarks();

  const toolBookmarks = bookmarks.filter((b) => b.type === "tool");
  const workflowBookmarks = bookmarks.filter((b) => b.type === "workflow");
  const dotfileBookmarks = bookmarks.filter((b) => b.type === "dotfile");

  return (
    <div className="min-h-screen border-l border-gray-300 dark:border-gray-700">
      <div className="max-w-4xl px-8 py-12">
        <div className="mb-8 text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white">home</Link>
          <span>/</span>
          <span className="text-black dark:text-white">bookmarks</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Bookmarks</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your saved tools, workflows, and dotfiles for quick access.
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No bookmarks yet.</p>
            <Link href="/tools" className="text-blue-600 hover:underline">
              Browse tools to get started
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {toolBookmarks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Tools ({toolBookmarks.length})</h2>
                <div className="space-y-2">
                  {toolBookmarks.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/tools/${item.slug}`}
                      className="block p-4 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {workflowBookmarks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Workflows ({workflowBookmarks.length})</h2>
                <div className="space-y-2">
                  {workflowBookmarks.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/workflows/${item.slug}`}
                      className="block p-4 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {dotfileBookmarks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Dotfiles ({dotfileBookmarks.length})</h2>
                <div className="space-y-2">
                  {dotfileBookmarks.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/dotfiles/${item.slug}`}
                      className="block p-4 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
