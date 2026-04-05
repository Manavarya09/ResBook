import type { MetadataRoute } from "next";
import { getAllToolSlugs, getAllWorkflowSlugs } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://resbook.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [toolSlugs, workflowSlugs] = await Promise.all([
    getAllToolSlugs(),
    getAllWorkflowSlugs(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tools",
    "/workflows",
    "/search",
    "/resources",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));

  const toolRoutes: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
  }));

  const workflowRoutes: MetadataRoute.Sitemap = workflowSlugs.map((slug) => ({
    url: `${BASE_URL}/workflows/${slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...toolRoutes, ...workflowRoutes];
}
