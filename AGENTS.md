# AGENTS.md

ActARion website v2 (Next.js 15 App Router, TypeScript, Tailwind, Vercel). See README.md for the architecture.

Rules:
- Every page is defined in `src/lib/routes.ts` and has content in all three languages (EN, NL, DE).
- Never add automatic language redirects; hreflang + x-default handle language targeting.
- Content must be in server-rendered HTML (no client-only text) so search engines and AI crawlers can read it.
- Titles 30–65 chars, meta descriptions 70–160 chars, exactly one H1, no heading level skips.
- Before merging: `npm run build` and a crawl of the preview (Screaming Frog / Semrush Site Audit).
- Images: WebP/AVIF, max 1200px wide, within the budget in `scripts/check-assets.mjs` (enforced on build). Always via `next/image` with width/height and `sizes`. No video files in the repo.
