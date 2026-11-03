import type { MetadataRoute } from 'next';
import { isNonProduction, siteUrl } from '@/lib/seo';

/** AI crawlers are explicitly welcome (GEO). Preview deployments block everything. */
export default function robots(): MetadataRoute.Robots {
  if (isNonProduction) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Bingbot', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
