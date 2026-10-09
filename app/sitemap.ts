import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/work";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${siteConfig.url}/work/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteConfig.url}${siteConfig.resume}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
