import type { NextConfig } from "next";
import { defaultLocale } from "./src/config/site";

class VeliteWebpackPlugin {
  private static started = false;
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

const nextConfig: NextConfig = {
  // App Router uses segment-based i18n; do not configure legacy i18n here
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  // Disable ESLint during production builds to avoid blocking deploys
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Bypass Next.js image optimization to serve images directly from /public
    unoptimized: true,
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Bundle analyzer (optional for debugging)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      );
      return config;
    },
  }),
  webpack: (config, { dev }) => {
    // Only use VeliteWebpackPlugin in development
    // In production, run `velite build` separately via prebuild script
    if (dev) {
      config.plugins.push(new VeliteWebpackPlugin());
    }
    return config;
  },
  async redirects() {
    /**
     * SEO Redirects Configuration
     * ===========================
     * This comprehensive redirect setup ensures:
     * 1. No 404s for legacy URLs from marketing materials or external links
     * 2. Proper locale handling for non-localized paths
     * 3. Clean URL structure with canonical patterns
     * 
     * Categories:
     * - Blog redirects: Handle plural/singular and legacy posts
     * - Use case redirects: Legacy long slugs → current short slugs
     * - Explainer redirects: Non-existent pages → related blog posts
     * - Resources redirects: Non-existent pages → related content
     * - FAQ redirects: Sub-route patterns → main FAQ
     * - Static asset redirects: Legacy filenames with spaces
     * - Catch-all patterns: Common legacy URL patterns
     * 
     * @see docs/seo-issues-overview.md for full documentation
     */
    return [
      // ========================================
      // LEGACY ROOT PATH REDIRECTS
      // ========================================
      // Redirect non-localized paths to default locale
      {
        source: '/blog',
        destination: `/${defaultLocale}/blog`,
        permanent: false,
      },
      {
        source: '/faq',
        destination: `/${defaultLocale}/faq`,
        permanent: false,
      },
      {
        source: '/about',
        destination: `/${defaultLocale}/about`,
        permanent: false,
      },
      {
        source: '/contact',
        destination: `/${defaultLocale}/contact`,
        permanent: false,
      },
      {
        source: '/use-cases',
        destination: `/${defaultLocale}/use-cases`,
        permanent: false,
      },
      {
        source: '/career',
        destination: `/${defaultLocale}/career`,
        permanent: false,
      },
      {
        source: '/privacy',
        destination: `/${defaultLocale}/privacy`,
        permanent: false,
      },
      {
        source: '/terms',
        destination: `/${defaultLocale}/terms`,
        permanent: false,
      },
      {
        source: '/:locale/demo',
        destination: '/:locale/contact',
        permanent: false,
      },

      // Redirects for /en/resources/*, /en/blogs/*, /en/use-cases/*, /en/explainer/*, /en/faq/*, and static assets
      // are now handled via vercel.json with explicit 301s to avoid 308 redirects.
      // See vercel.json for the complete list of 301 redirects.
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },

};

export default nextConfig;
