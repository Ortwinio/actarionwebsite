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
  // Enable Turbopack (default in Next.js 16) - empty config silences webpack migration warning
  turbopack: {},
  // Image optimization - optimized for performance
  images: {
    // Prefer AVIF, then WebP for maximum compression
    formats: ['image/avif', 'image/webp'],
    // Device breakpoints matching common screen sizes
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1920],
    // Icon/thumbnail sizes
    imageSizes: [64, 128, 256, 384, 512],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
    // Allow SVG with security policy
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Remote image patterns (for external images like YouTube thumbnails)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
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
        statusCode: 301,
      },
      {
        source: '/faq',
        destination: `/${defaultLocale}/faq`,
        statusCode: 301,
      },
      {
        source: '/about',
        destination: `/${defaultLocale}/about`,
        statusCode: 301,
      },
      {
        source: '/contact',
        destination: `/${defaultLocale}/contact`,
        statusCode: 301,
      },
      {
        source: '/use-cases',
        destination: `/${defaultLocale}/use-cases`,
        statusCode: 301,
      },
      {
        source: '/career',
        destination: `/${defaultLocale}/career`,
        statusCode: 301,
      },
      {
        source: '/privacy',
        destination: `/${defaultLocale}/privacy`,
        statusCode: 301,
      },
      {
        source: '/terms',
        destination: `/${defaultLocale}/terms`,
        statusCode: 301,
      },
      {
        source: '/:locale/demo',
        destination: '/:locale/contact',
        statusCode: 301,
      },

      // ========================================
      // DUPLICATE CONTENT CONSOLIDATION
      // ========================================
      // Redirect older duplicate blog posts to canonical version
      // Use statusCode: 301 instead of permanent: true to avoid 308 redirects
      {
        source: '/:locale/blog/measure-roi-ar-ai-guided-work-instructions',
        destination: '/:locale/blog/roi-ar-ai-guided-work-instructions',
        statusCode: 301,
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
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://*.vercel.app",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com https://*.vercel.app wss://*.vercel.app",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
              "media-src 'self' https: blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  },
  async rewrites() {
    // ROI Calculator integration
    // In production, Vercel rewrites (vercel.json) handle this
    // In development, proxy to local ROI calculator on port 3001
    const roiCalculatorDestination = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://roicalculator.actarion.com';
    
    return {
      beforeFiles: [
        // Proxy ROI calculator pages and assets
        {
          source: '/roi-calculator',
          destination: roiCalculatorDestination,
        },
        {
          source: '/roi-calculator/:path*',
          destination: `${roiCalculatorDestination}/:path*`,
        },
      ],
    };
  },

};

export default nextConfig;
