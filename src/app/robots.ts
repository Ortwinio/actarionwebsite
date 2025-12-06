import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/seo";

/**
 * Robots.txt configuration for ActARion website
 * 
 * SEO best practices:
 * - Allows all crawlers to index the site
 * - Disallows API routes and internal paths
 * - Points to the XML sitemap for discovery
 * 
 * For staging/preview environments, consider setting NEXT_PUBLIC_NOINDEX=true
 * in environment variables to prevent indexing.
 */
export default function robots(): MetadataRoute.Robots {
  // Prevent indexing on staging/preview environments
  const isNoIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true';

  if (isNoIndex) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        // Explicitly allow all public content and static assets
        // This ensures crawlers like Screaming Frog don't flag /_next/ as blocked
        allow: [
          '/',
          '/_next/',
          '/_next/static/',
          '/_next/image/',
        ],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}


