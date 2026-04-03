import Link from "next/link";
import { getToolBySlug } from "@/lib/mdx";

interface ToolLinkProps {
  slug: string;
}

export async function ToolLink({ slug }: ToolLinkProps) {
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return <span className="text-gray-500">Tool not found</span>;
  }

  return (
    <Link
      href={`/tools/${slug}`}
      className="inline-block border border-black px-2 py-1 hover:bg-gray-100 dark:border-white dark:hover:bg-gray-900"
    >
      {tool.frontmatter.title}
    </Link>
  );
}
