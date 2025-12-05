# AGENTS.md

> Context file for AI coding agents (Gemini, Copilot, Cursor, etc.)

## Project Overview

**ActARion Website** - A Next.js 15 marketing website for ActARion, a company revolutionizing SOP execution with Augmented Reality. The site is multilingual (EN, DE, NL, FR) and deployed on Vercel.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Content | Velite (MDX-based blog system) |
| Email | Resend API |
| Deployment | Vercel |
| Testing | Playwright (E2E) |

## Directory Structure

```
actarionwebsite/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── [locale]/     # i18n routes (en, de, nl, fr)
│   │   ├── api/          # API routes (e.g., /api/apply)
│   │   └── *.tsx         # Root layout, not-found, sitemap
│   ├── components/       # Reusable React components
│   ├── config/           # Configuration files (i18n, navigation)
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and helpers
├── content/
│   └── blogs/            # MDX blog posts (223 posts, multilingual)
├── public/               # Static assets (images, videos, fonts)
├── plans/                # Project planning documents
├── docs/                 # Internal documentation and guides
├── context/              # LLM context files (gitignored)
├── dev-setup/            # Development environment scripts
├── scripts/              # Build and maintenance scripts
└── tests/e2e/            # Playwright E2E tests
```

## Key Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration with i18n rewrites |
| `middleware.ts` | Locale detection and routing |
| `velite.config.ts` | Blog content schema and processing |
| `tailwind.config.ts` | Design tokens and theme |

## Working with This Codebase

### Before Starting Work
1. Read `README.md` for setup and environment variables
2. Check `plans/` for active initiatives
3. Review `docs/` for specific operational guides

### Plans Directory
The `plans/` folder contains project roadmaps and initiatives:
- `blog-system-plan.md` - Blog infrastructure
- `site-foundation-plan.md` - Core site architecture
- `_template.md` - Template for new plans

When working on significant features, create or update a plan document.

### Context Directory
The `context/` folder (gitignored) stores LLM context files:
- Code examples and reference implementations
- Screenshots and mockups
- Prompt templates
- Any other AI-relevant context

### Documentation
- `docs/README.md` - Documentation index
- `docs/content/` - Editorial guides
- `docs/operations/` - Deployment and production guides

## Common Tasks

### Development
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint:fix     # Fix linting issues
npm run type-check   # TypeScript validation
```

### Content & QA
```bash
npm run check:locales  # Validate i18n completeness
npm run check:links    # Find broken links (requires dev server)
npm run qa             # Run all QA checks
```

## Collaboration Guidelines

1. **Incremental PRs** - Prefer small, focused changes tied to plan tasks
2. **Document decisions** - Update plans with findings and rationale
3. **Archive obsolete plans** - Move to `plans/archive/` with date and reason
4. **Update docs** - Keep operational guides current

## Contact

For questions about where to document something, default to creating a plan under `plans/` and reference it in your PR.
