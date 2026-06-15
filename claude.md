# claude.md

> Context file specifically for Claude (Anthropic) and Claude-based tools

## Project Summary

This is the **ActARion marketing website** - a Next.js 15 application for a B2B company that provides augmented reality solutions for SOP (Standard Operating Procedure) execution in industrial settings.

**Live site**: [actarion.com](https://www.actarion.com)

## Quick Reference

### Tech Stack
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Velite** for MDX blog content management
- **Resend** for transactional emails
- **Vercel** for hosting

### Project Structure

```
src/
├── app/[locale]/     # Internationalized pages (en, de, nl)
├── components/       # React components
├── config/           # i18n and site configuration
├── lib/              # Utilities and helpers
└── hooks/            # Custom React hooks

content/blogs/        # 223 MDX blog posts (multilingual)
plans/                # Project roadmaps and planning docs
docs/                 # Operational documentation
context/              # LLM context files (gitignored, for AI reference)
dev-setup/            # macOS development environment scripts
```

## Important Directories

### `plans/` - Project Planning
Contains structured planning documents for major initiatives:
- Review before starting significant work
- Create new plans for multi-step features
- Keep status updated for async collaboration

### `context/` - AI Context Files
Local-only directory (gitignored) for storing:
- Code examples and patterns
- Screenshots and design references
- Prompt templates
- Reference documentation

Use this to provide me with additional context when needed.

### `docs/` - Internal Documentation
- `docs/content/` - Blog posting and editorial guides
- `docs/operations/` - Deployment and production procedures

### `dev-setup/` - Environment Setup
Contains scripts and configs for setting up a macOS development environment:
- `install-dev-tools.sh` - Homebrew-based tool installation
- `optimized-zshrc.sh` - Shell configuration
- `starship.toml` - Prompt configuration

## Commands I Should Know

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Production build
npm run lint:fix         # Auto-fix linting issues

# Quality Assurance  
npm run qa               # Run all QA checks (type-check + lint)
npm run check:locales    # Verify i18n completeness (requires dev server)

# Utilities
npm run format           # Prettier formatting
npm run type-check       # TypeScript validation
```

## i18n Structure

The site supports 3 locales: `en`, `de`, `nl`

- Routes use `[locale]` dynamic segment
- `middleware.ts` handles locale detection
- Blog posts in `content/blogs/` are organized by locale

## When Helping with This Codebase

1. **Check plans first** - Review `plans/` for active initiatives before suggesting changes
2. **Respect i18n** - All user-facing content needs translations
3. **Use Tailwind** - Follow existing design patterns
4. **Test locally** - Use `npm run dev` and verify changes
5. **Document decisions** - Update relevant plans or docs

## Key Patterns

- **Components** use Framer Motion for scroll animations
- **API routes** are in `src/app/api/`
- **Blog content** is MDX processed by Velite
- **Images** go in `public/` with optimized Next.js Image component
