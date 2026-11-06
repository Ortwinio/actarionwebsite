import type { NextConfig } from 'next';
import { catalog } from './src/content/catalog';
import { legacyRedirects } from './src/content/legacy-redirects';

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com",
  "frame-src https://www.googletagmanager.com https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: csp }] }];
  },
  // Old URL → new URL (301, one hop). Skips paths that are still valid in the new structure.
  async redirects() {
    const locales = ['en', 'nl', 'de'] as const;
    const slug = (key: string, l: (typeof locales)[number]) => {
      const row = catalog.find((r) => r[0] === key)!;
      return row[{ en: 4, nl: 5, de: 6 }[l]] as string;
    };
    return locales.flatMap((l) =>
      Object.entries(legacyRedirects)
        .filter(([from, key]) => from !== slug(key, l))
        .map(([from, key]) => ({ source: `/${l}/${from}`, destination: `/${l}/${slug(key, l)}`, statusCode: 301 as const })),
    );
  },
};

export default nextConfig;
