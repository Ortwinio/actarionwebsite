# ActARion website v2

Rebuild of actarion.com on the existing platform (Next.js on Vercel), based on the new
design and the new content strategy. No code from the previous site is reused.

## Architecture

| Path | Purpose |
|---|---|
| `src/lib/routes.ts` | Route registry: every page, its template type and localized slug (EN/NL/DE). Canonicals, hreflang, breadcrumbs, sitemap and llms.txt are derived from it. |
| `src/content/{en,nl,de}.ts` | Page content and UI strings per language (draft copy). |
| `src/templates/index.tsx` | One template per page type: home, pillar, hub, use case, industry, template download, guide, glossary term, comparison, case study, ROI calculator, pilot request. |
| `src/components/` | Header (language switcher to translated page), footer, breadcrumbs, answer box (GEO), FAQ, ROI quick calculator, lead form, consent banner, GTM. |
| `src/lib/seo.ts` | Metadata (canonical, hreflang + x-default, OG) and JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, FAQPage, Article, HowTo, DefinedTerm, SoftwareApplication). |
| `src/middleware.ts` | No language auto-redirect; paths without locale → `/en` (301); `X-Robots-Tag: noindex` on previews. |
| `src/app/sitemap.ts`, `robots.ts`, `llms.txt` | Generated from the route registry. AI crawlers allowed; previews disallow all. |

## Adding a page

1. Add a route key with slugs per language in `src/lib/routes.ts`.
2. Add content for that key in `src/content/en.ts`, `nl.ts` and `de.ts` (TypeScript enforces all three).
3. Done: it is built statically, added to the sitemap, llms.txt and hreflang automatically.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | `GTM-WFXVKRWM` | Existing GTM container |
| `NEXT_PUBLIC_GTM_ON_PREVIEW` | – | `true` to load GTM on preview deployments (testing) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | – | Search Console verification |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL` | – | Lead notifications |

## Commands

```bash
npm run dev     # localhost:3000
npm run build   # static build (all pages SSG)
npm run qa      # type-check + lint
```
