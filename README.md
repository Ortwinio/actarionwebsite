# ActARion website v2

Rebuild of actarion.com on the existing platform (Next.js on Vercel), based on the new
design and the new content strategy. No code from the previous site is reused.

## Architecture

| Path | Purpose |
|---|---|
| `src/content/catalog.ts` | **The complete URL structure**: every page (~127) with type, parent, phase, slug and title in EN/NL/DE. |
| `src/lib/routes.ts` | Route registry built from the catalogue, with build-time checks (unknown parent, duplicate or invalid slug → build fails). |
| `src/content/defaults.ts` | Default content per page type (T1–T11 blocks, FAQ, image placeholders) so every page is complete from day one. Draft text is in [brackets] and the page shows a draft banner. |
| `src/content/{en,nl,de}.ts` | Hand-written content and UI strings per language; overrides the defaults field by field. |
| `src/content/legacy-redirects.ts` | 301 map from old URLs to new pages. |
| `src/templates/index.tsx` | One template per page type: home, pillar, hub, use case, industry, template download, guide, glossary term, comparison, case study, ROI calculator, pilot request. |
| `src/components/` | Header (language switcher to translated page), footer, breadcrumbs, answer box (GEO), FAQ, ROI quick calculator, lead form, consent banner, GTM. |
| `src/lib/seo.ts` | Metadata (canonical, hreflang + x-default, OG) and JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, FAQPage, Article, HowTo, DefinedTerm, SoftwareApplication). |
| `src/middleware.ts` | No language auto-redirect; paths without locale → `/en` (301); `X-Robots-Tag: noindex` on previews. |
| `src/app/sitemap.ts`, `robots.ts`, `llms.txt` | Generated from the route registry. AI crawlers allowed; previews disallow all. |

## Adding or filling in a page

1. New page: add a row to `src/content/catalog.ts` (key, type, parent, slugs and titles in EN/NL/DE).
2. Content: add an entry for that key in `src/content/en.ts`, `nl.ts` and `de.ts`. Any field you set replaces the placeholder; set `placeholder: false` once the page is final (removes the draft banner).
3. Images: put a WebP (max 1200 px) in `public/img/` and replace the image placeholder. The build enforces the size budget.
4. Done: the page is built statically and added to the menu (if applicable), sitemap.xml, HTML sitemap, llms.txt and hreflang automatically.

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
