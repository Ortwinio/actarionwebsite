import type { MetadataRoute } from "next";
import { blogs as allBlogs } from "@/./.velite/generated";
import { buildLocalizedPath, locales } from "@/config/site";
import { siteUrl } from "@/config/seo";
import { useCases } from "@/config/useCases";

const staticSegments = [
  undefined, // locale root
  "about",
  "contact",
  "demo",
  "partner-contact",
  "career",
  "faq",
  "privacy",
  "terms",
  "use-cases",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticSegments.forEach((segment, index) => {
      entries.push({
        url: `${siteUrl}${buildLocalizedPath(locale, segment)}`,
        lastModified: now,
        changeFrequency: segment ? "monthly" : "weekly",
        priority: segment ? 0.7 : 1.0,
      });
    });

    useCases.forEach((useCase) => {
      entries.push({
        url: `${siteUrl}${buildLocalizedPath(locale, useCase.slug)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    entries.push({
      url: `${siteUrl}${buildLocalizedPath(locale, "blog")}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  (allBlogs as Array<{
    slug: string;
    locale: string;
    publishedAt: string;
    updatedAt?: string;
  }>).forEach((post) => {
    if (!locales.includes(post.locale as (typeof locales)[number])) {
      return;
    }

    entries.push({
      url: `${siteUrl}${buildLocalizedPath(post.locale as (typeof locales)[number], `blog/${post.slug}`)}`,
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return entries;
}




