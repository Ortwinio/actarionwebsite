import type { MetadataRoute } from "next";
import { blogs as allBlogs } from "@/./.velite/generated";
import { buildLocalizedPath, locales, Locale } from "@/config/site";
import { siteUrl } from "@/config/seo";
import { useCases } from "@/config/useCases";
import { partners } from "@/config/partners";

const staticSegments = [
  undefined, // locale root
  "about",
  "vision",
  "management",
  "contact",
  "partners",  // Partners overview (renamed from partner-contact)
  "career",
  "faq",
  "privacy",
  "terms",
  "services",
  "use-cases",
  "events",
  "whitepapers",
  "videos",
  "news",
];

/**
 * Build alternates object for sitemap entries.
 * This adds hreflang attributes directly to the sitemap for better SEO.
 */
function buildSitemapAlternates(segment?: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  locales.forEach((locale) => {
    alternates[locale] = `${siteUrl}${buildLocalizedPath(locale, segment)}`;
  });
  return alternates;
}

/**
 * Build alternates for blog posts based on available translations.
 * Only includes locales where the blog post actually exists.
 */
function buildBlogAlternates(slug: string, availableLocales: Locale[]): Record<string, string> {
  const alternates: Record<string, string> = {};
  availableLocales.forEach((locale) => {
    alternates[locale] = `${siteUrl}${buildLocalizedPath(locale, `blog/${slug}`)}`;
  });
  return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages - all locales exist for each segment
  locales.forEach((locale) => {
    staticSegments.forEach((segment) => {
      entries.push({
        url: `${siteUrl}${buildLocalizedPath(locale, segment)}`,
        lastModified: now,
        changeFrequency: segment ? "monthly" : "weekly",
        priority: segment ? 0.7 : 1.0,
        alternates: {
          languages: buildSitemapAlternates(segment),
        },
      });
    });

    // Use case pages - now under /use-cases/[slug] for better SEO structure
    useCases.forEach((useCase) => {
      const useCaseSegment = `use-cases/${useCase.slug}`;
      entries.push({
        url: `${siteUrl}${buildLocalizedPath(locale, useCaseSegment)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: buildSitemapAlternates(useCaseSegment),
        },
      });
    });

    // Partner pages - all locales exist
    partners.forEach((partner) => {
      const segment = `partners/${partner.slug}`;
      entries.push({
        url: `${siteUrl}${buildLocalizedPath(locale, segment)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: buildSitemapAlternates(segment),
        },
      });
    });

    // Blog listing page - all locales exist
    entries.push({
      url: `${siteUrl}${buildLocalizedPath(locale, "blog")}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: buildSitemapAlternates("blog"),
      },
    });
  });

  // Blog posts - group by slug to find available translations
  const blogsBySlug = new Map<string, { locale: Locale; publishedAt: string; updatedAt?: string }[]>();
  
  (allBlogs as Array<{
    slug: string;
    locale: string;
    publishedAt: string;
    updatedAt?: string;
  }>).forEach((post) => {
    if (!locales.includes(post.locale as Locale)) {
      return;
    }
    
    const existing = blogsBySlug.get(post.slug) || [];
    existing.push({
      locale: post.locale as Locale,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    });
    blogsBySlug.set(post.slug, existing);
  });

  // Add sitemap entries for each blog post with its available translations
  blogsBySlug.forEach((translations, slug) => {
    const availableLocales = translations.map(t => t.locale);
    const alternates = buildBlogAlternates(slug, availableLocales);
    
    translations.forEach((post) => {
      entries.push({
        url: `${siteUrl}${buildLocalizedPath(post.locale, `blog/${slug}`)}`,
        lastModified: post.updatedAt || post.publishedAt,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return entries;
}
