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

      // ========================================
      // BLOG REDIRECTS
      // ========================================
      // /en/blogs (plural) → /en/blog (singular)
      {
        source: '/:locale/blogs',
        destination: '/:locale/blog',
        permanent: true,
      },
      // Legacy blog posts - redirect to related content
      {
        source: '/:locale/blogs/overcoming-ar-resistance',
        destination: '/:locale/blog/change-management-ar-projects',
        permanent: true,
      },
      // Blog posts with old slug patterns
      {
        source: '/:locale/blogs/:slug',
        destination: '/:locale/blog/:slug',
        permanent: true,
      },

      // ========================================
      // USE CASE REDIRECTS
      // ========================================
      // Legacy long slugs → current short slugs (from /use-cases/ prefix)
      {
        source: '/:locale/use-cases/ar-preventive-maintenance-with-data-driven-insights',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-training-and-onboarding-for-industrial-teams',
        destination: '/:locale/ar-training-and-onboarding',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-guided-assembly-for-error-free-production',
        destination: '/:locale/ar-guided-assembly-production',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-remote-expert-support-for-corrective-maintenance',
        destination: '/:locale/ar-remote-expert-support-corrective-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-guided-changeover-batch-preparation',
        destination: '/:locale/ar-guided-changeover-batch-preparation',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-work-instructions-corporate-memory',
        destination: '/:locale/ar-work-instructions-corporate-memory',
        permanent: true,
      },
      
      // Generic use case slugs → appropriate destinations
      {
        source: '/:locale/use-cases/ar-onboarding',
        destination: '/:locale/ar-training-and-onboarding',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-sops-maintenance',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-inspections',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-sops-manufacturing',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-compliance',
        destination: '/:locale/ar-work-instructions-corporate-memory',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-work-instructions',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-work-instructions-regulated',
        destination: '/:locale/ar-work-instructions-corporate-memory',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ai-ar-guided-work-instructions',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-maintenance-instructions',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-work-instructions-industrial-maintenance',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/digital-work-instructions-maintenance',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/maintenance-ar-sops',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-safety-compliance',
        destination: '/:locale/ar-work-instructions-corporate-memory',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-maintenance',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-sops',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-assembly',
        destination: '/:locale/ar-guided-assembly-production',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/ar-changeover',
        destination: '/:locale/ar-guided-changeover-batch-preparation',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/remote-support',
        destination: '/:locale/ar-remote-expert-support-corrective-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/training',
        destination: '/:locale/ar-training-and-onboarding',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/onboarding',
        destination: '/:locale/ar-training-and-onboarding',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/maintenance',
        destination: '/:locale/ar-preventive-maintenance',
        permanent: true,
      },
      {
        source: '/:locale/use-cases/corporate-memory',
        destination: '/:locale/ar-work-instructions-corporate-memory',
        permanent: true,
      },

      // ========================================
      // EXPLAINER REDIRECTS
      // ========================================
      // No dedicated explainer pages exist - redirect to related content
      {
        source: '/:locale/explainer/ai-ar-guided-instructions',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ar-hardware-checklist',
        destination: '/:locale/blog/ar-hardware-smart-glasses-tablets-smartphones',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ar-guided-work-instructions',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ar-ai-governance',
        destination: '/:locale/blog/cybersecurity-data-privacy-ar-ai-operations',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ai-ar-sops',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ar-pilot-checklist',
        destination: '/:locale/blog/ar-pilot-success-scaling',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ar-sop-management',
        destination: '/:locale/ar-work-instructions-corporate-memory',
        permanent: true,
      },
      {
        source: '/:locale/explainer/ar-instructions-explained',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/explainer/digital-work-instructions',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      // Catch-all for any other explainer pages
      {
        source: '/:locale/explainer/:slug',
        destination: '/:locale/use-cases',
        permanent: true,
      },

      // ========================================
      // RESOURCES REDIRECTS
      // ========================================
      // No dedicated resources pages exist - redirect to related blog posts
      {
        source: '/:locale/resources/ar-training-checklist',
        destination: '/:locale/ar-training-and-onboarding',
        permanent: true,
      },
      {
        source: '/:locale/resources/digital-sop-implementation',
        destination: '/:locale/blog/from-paper-sop-to-ar-workflow',
        permanent: true,
      },
      {
        source: '/:locale/resources/ar-pilot-checklist',
        destination: '/:locale/blog/ar-pilot-success-scaling',
        permanent: true,
      },
      {
        source: '/:locale/resources/ar-implementation-checklist',
        destination: '/:locale/blog/ar-ai-rollout-roadmap',
        permanent: true,
      },
      {
        source: '/:locale/resources/digital-work-instruction-best-practices',
        destination: '/:locale/blog/from-paper-sop-to-ar-workflow',
        permanent: true,
      },
      {
        source: '/:locale/resources/ar-roi-calculator',
        destination: '/:locale/contact',
        permanent: true,
      },
      {
        source: '/:locale/resources/hardware-guide',
        destination: '/:locale/blog/ar-hardware-smart-glasses-tablets-smartphones',
        permanent: true,
      },
      // Catch-all for any other resources pages
      {
        source: '/:locale/resources/:slug',
        destination: '/:locale/blog',
        permanent: true,
      },

      // ========================================
      // FAQ REDIRECTS
      // ========================================
      // No sub-routes in FAQ - all redirect to main FAQ page
      {
        source: '/:locale/faq/ar-work-instructions',
        destination: '/:locale/faq',
        permanent: true,
      },
      {
        source: '/:locale/faq/ar-knowledge-platforms',
        destination: '/:locale/faq',
        permanent: true,
      },
      {
        source: '/:locale/faq/digital-work-instructions',
        destination: '/:locale/faq',
        permanent: true,
      },
      {
        source: '/:locale/faq/ar-data-security',
        destination: '/:locale/faq',
        permanent: true,
      },
      {
        source: '/:locale/faq/implementation',
        destination: '/:locale/faq',
        permanent: true,
      },
      {
        source: '/:locale/faq/pricing',
        destination: '/:locale/faq',
        permanent: true,
      },
      {
        source: '/:locale/faq/hardware',
        destination: '/:locale/faq',
        permanent: true,
      },
      // Catch-all for any FAQ sub-routes
      {
        source: '/:locale/faq/:slug',
        destination: '/:locale/faq',
        permanent: true,
      },

      // ========================================
      // LEGACY PAGE REDIRECTS
      // ========================================
      // Old page names that may have been used
      {
        source: '/:locale/solutions',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/products',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      // Services page is now live - redirect removed
      {
        source: '/:locale/industries',
        destination: '/:locale/use-cases',
        permanent: true,
      },
      {
        source: '/:locale/partners',
        destination: '/:locale/partner-contact',
        permanent: true,
      },
      {
        source: '/:locale/team',
        destination: '/:locale/about',
        permanent: true,
      },
      {
        source: '/:locale/company',
        destination: '/:locale/about',
        permanent: true,
      },
      {
        source: '/:locale/jobs',
        destination: '/:locale/career',
        permanent: true,
      },
      {
        source: '/:locale/careers',
        destination: '/:locale/career',
        permanent: true,
      },
      {
        source: '/:locale/demo',
        destination: '/:locale/contact',
        permanent: false,
      },
      {
        source: '/:locale/request-demo',
        destination: '/:locale/contact',
        permanent: true,
      },
      {
        source: '/:locale/book-demo',
        destination: '/:locale/contact',
        permanent: true,
      },
      {
        source: '/:locale/get-started',
        destination: '/:locale/contact',
        permanent: true,
      },

      // ========================================
      // STATIC ASSET REDIRECTS
      // ========================================
      // Legacy URLs with spaces or different naming patterns
      {
        source: '/actarion%20header%203.png',
        destination: '/actarion-header-3.png',
        permanent: true,
      },
      {
        source: '/actarion%20header2.png',
        destination: '/actarion-header-2.png',
        permanent: true,
      },
      {
        source: '/actarion%20header1.png',
        destination: '/actarion-header-1.png',
        permanent: true,
      },
      {
        source: '/O_ActARion%20header%203.png',
        destination: '/actarion-header-3.png',
        permanent: true,
      },
      {
        source: '/O_ActARion%20header1.png',
        destination: '/actarion-header-1.png',
        permanent: true,
      },
      {
        source: '/O_ActARion%20header2.png',
        destination: '/actarion-header-2.png',
        permanent: true,
      },
      // Favicon variations
      {
        source: '/favicon.png',
        destination: '/favicon.ico',
        permanent: true,
      },
      // Logo variations
      {
        source: '/logo.png',
        destination: '/logo-actarion.png',
        permanent: true,
      },
      {
        source: '/ActARion-logo.png',
        destination: '/logo-actarion.png',
        permanent: true,
      },
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
