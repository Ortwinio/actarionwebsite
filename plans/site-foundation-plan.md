# Site Foundation Plan

**Status:** 🟡 In Progress  
**Scope:** Modernize marketing site architecture, performance, and SEO for localized growth.  
**Owner:** GPT-5.1 Codex + Ortwin Verreck  
**Next Review:** 2025-11-25

## Objectives
1. Consolidate routing + shared layouts to simplify maintenance.  
2. Improve Core Web Vitals via better rendering strategies and asset hygiene.  
3. Ship technical SEO + GEO signals (metadata, structured data, hreflang) and LLM-friendly content structures.

## Workstreams & Tasks

### Maintainability
- [x] M1. Collapse duplicate non-locale routes into `/[locale]` tree with shared layout slots.
- [x] M2. Introduce `src/config` for navigation, locales, CTAs, and metadata tokens; remove inline strings.
- [ ] M3. Extract shared sections (hero, FAQ, CTA) into `src/modules` for reuse.
- [ ] M4. Archive/remove experimental routes (`test-video`, `video-test`) once replacements exist.

### Performance
- [ ] P1. Audit each page's rendering mode; default to static generation with sensible `revalidate`.
- [ ] P2. Optimize hero media via `next/image`, proper `priority`, and explicit dimensions to prevent CLS.
- [ ] P3. Defer heavy JS (Framer components, analytics) with selective client components and lazy imports.

### SEO / GEO / LLM
- [x] S1. Build locale-aware metadata factory (title, description, canonical, hreflang, OG/Twitter).
- [x] S2. Add Organization, Website, WebPage, and FAQ JSON-LD; document data gaps with TODOs.
- [x] S3. Publish sitemap + robots handlers aligned with middleware redirects.
- [x] S4. Structure content data (industries, benefits, FAQ) in typed configs for consistent rendering + ingestion.

## Status Log
- **2025-11-18:** Initialized `plans/` directory, migrated legacy docs, and documented agent workflow.
- **2025-11-18:** Added `src/config/site.ts`, refactored navigation + middleware to consume it, and fixed blog image delivery by consolidating assets under `public/blogs`.
- **2025-11-18:** Replaced legacy non-locale routes with lightweight redirects to `/[locale]/*`, so all content now flows through the localized layout stack.
- **2025-11-19:** Introduced `src/config/seo.ts` and wired `[locale]/layout` + `/[locale]/blog` metadata to it for consistent canonical URLs, hreflang, and social cards.
- **2025-11-19:** Added Organization/ProfessionalService/Website JSON-LD globally and WebPage/FAQ/Contact-specific schemas for localized routes; metadata helper now drives about/contact/career/demo/partner/privacy/terms/blog pages.
- **2025-11-20:** Replaced static `public/robots.txt` + `sitemap.xml` with dynamic routes that enumerate every locale, use case, and blog article so search engines stay in sync with middleware-enforced paths.
- **2025-11-20:** Centralized homepage benefits, industries, and “How it works” steps in `src/config/homeContent.ts` and moved the FAQ narrative into `src/config/faqContent.ts`, giving us typed data sources that can back both rendering and structured outputs.
- **2025-11-19:** Rebuilt the localized Career page with dedicated hero, "Why" story, responsive job cards, and inline apply forms that post to `/api/apply` (email delivery placeholder logging to `ortwin@actarion.com` for now).
- **2025-11-19:** Built the reusable `useCases` config plus localized `/[locale]/use-cases` overview, six detailed AR use case pages, homepage card grid, CTA module, and footer link so GTM teams can surface scenarios and push visitors to contact.
- **2025-11-19:** Hooked `/api/apply` to Resend for live email delivery (documented `RESEND_API_KEY/RESEND_FROM_EMAIL`) and upgraded the shared ESLint flat config to use `typescript-eslint` + Next.js rules so `next lint` works across the localized app router.
- **2025-11-19:** Extracted the homepage-only footer into `src/components/Footer` and mounted it from `[locale]/layout` so every localized route exposes the sitemap, legal links, LinkedIn CTA, and the new use-case navigation consistently.
- **2025-11-19:** Rebuilt the localized homepage hero to surface the ActARion intro MP4 beside the “Work Smarter, Safer and Faster with AI and Augmented reality.” tagline, embedded the YouTube overview beneath it, and updated the shared Navigation/Footer logo slots to use the canonical horizontal asset (documented exception: the homepage now skips `PageHeader` so the media block can sit directly under navigation).
- **2025-11-23:** Updated the homepage hero so the MP4 background autoplays/loops on load with the primary H1 overlayed, restoring the immersive feel request while keeping the CTA buttons accessible on top of the video wash.
- **2025-11-20:** Centralized all six use case narratives inside `src/config/useCaseContent.ts` and added a `createUseCasePage` factory so detail routes render from typed content blocks—unlocking future translations and new scenarios without duplicating layout logic.
- **2025-11-20:** Added vollständige Deutsch/Nederlands vertalingen to `src/config/useCaseContent.ts`, so every `/[locale]/use-cases/*` route now renders localized hero copy, sections, and KPIs directly from config.
- **2025-11-20:** Rebuilt the localized FAQ content around AR/AI-guided work (new narrative, use cases, CTA, schema + metadata updates) and normalized the Next.js flat ESLint config so plugin arrays resolve correctly and `npm run lint` passes cleanly.
- **2025-11-21:** Introduced a design-system layer (tokens, section/summary/button utilities) in `globals.css`, refreshed the header/footer, and refit home/about/contact/FAQ/use-case/blog/career pages to the new section, summary, and CTA patterns for a consistent ActARion blue-first look.
- **2025-11-22:** Added a reusable `PageHeader` with deterministic fallback imagery (`/public/headers`) and wired every localized marketing route (home, about, use cases, blog, career, contact, demo, partner, and legal) to render it as the single H1 so pages now open with a consistent hero experience.
- **2025-11-18:** Added the compact `HomeVideoCta` card beneath the homepage “What we do” section so visitors can launch the 30-second ActARion YouTube overview inline without leaving the page.
- **2025-11-23:** Fixed the nav/header overlap by moving the top offset into `[locale]/layout`, documented the single-H1 policy inside `PageHeader`, suppressed MDX-rendered `h1`s, refreshed brand casing, and pulled the HomeVideoCta into its own hero-adjacent section so blog copy and the video CTA are visibly accessible again.
- **2025-11-19:** Added a Loops-powered `NewsletterForm` client component and mounted it from the shared footer so every localized page surfaces the subscribe CTA with consistent styling, messaging, and rate limiting.
