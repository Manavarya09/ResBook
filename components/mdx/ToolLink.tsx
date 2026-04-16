import Link from "next/link";

interface ToolLinkProps {
  slug: string;
  title?: string;
}

export function ToolLink({ slug, title }: ToolLinkProps) {
  return (
    <Link
      href={`/tools/${slug}`}
      className="inline-block border border-black px-2 py-1 hover:bg-gray-100 dark:border-white dark:hover:bg-gray-900"
    >
      {title || slug}
    </Link>
  );
}
