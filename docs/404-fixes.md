# 404 URL Fixes Documentation

**Date:** 2025-12-04  
**Status:** Implemented  
**Last Updated:** 2025-12-04

This document describes the comprehensive redirect configuration applied to eliminate 404 errors and ensure all legacy/external links resolve correctly.

---

## Summary

| Category | URLs Fixed | Method |
|----------|-----------|--------|
| Header images with spaces | 6+ | Renamed files + added redirects |
| Blog hero images | 24 | Created placeholder images |
| Blog page routes | 3+ | Added redirects + catch-all |
| Use case routes | 25+ | Added redirects to existing pages |
| Explainer routes | 10+ | Added redirects to blog/use cases + catch-all |
| Resources routes | 7+ | Added redirects to blog/use cases + catch-all |
| FAQ sub-routes | 8+ | Added redirects to main FAQ + catch-all |
| Root path redirects | 9 | Non-localized paths → default locale |
| Legacy page redirects | 13 | Old page names → current pages |
| Static asset redirects | 9+ | Logo/favicon/header variations |

---

## 1. Static Asset Fixes (PNG files)

### 1.1 Header Images with Spaces

**Problem:** Files in `/public/` had spaces in their names, causing issues with URL encoding.

**Files renamed:**
- `actarion header 3.png` → `actarion-header-3.png`
- `actarion header2.png` → `actarion-header-2.png`
- `actarion header1.png` → `actarion-header-1.png`

**Code references updated:**
- `src/app/[locale]/HomePageClient.tsx`
- `src/app/[locale]/videos/page.tsx`
- `src/lib/images.ts`
- `scripts/checkImages.ts`

**Redirects added in `next.config.ts`:**
```typescript
{ source: '/actarion%20header%203.png', destination: '/actarion-header-3.png', permanent: true }
{ source: '/actarion%20header2.png', destination: '/actarion-header-2.png', permanent: true }
{ source: '/actarion%20header1.png', destination: '/actarion-header-1.png', permanent: true }
```

### 1.2 Blog Hero Images

**Problem:** 24 blog hero images referenced in external links didn't exist.

**Solution:** Created placeholder images by copying existing hero images with appropriate topics:

| Missing Image | Source Image Used |
|--------------|-------------------|
| `connecting-sensor-data-ar-guided-maintenance-hero.png` | Quality inspections hero |
| `capturing-best-practice-changeover-sequences-ar-sops-hero.png` | Paper-to-AR workflow hero |
| `keeping-sops-up-to-date-digital-work-instructions-hero.png` | Paper-to-AR workflow hero |
| `5-common-assembly-mistakes-ar-work-instructions-prevent-hero.png` | Error-free assembly hero |
| `preventive-maintenance-ar-work-instructions-catch-issues-hero.png` | Quality inspections hero |
| `reducing-training-time-ar-work-instructions-90-days-hero.png` | AR onboarding hero |
| `digital-work-instructions-maintenance-technicians-daily-routine-hero.png` | Quality inspections hero |
| `what-to-measure-ar-remote-expert-support-pilots-hero.png` | Remote expert hero |
| `assembly-process-ready-ar-work-instructions-checklist-hero.png` | Error-free assembly hero |
| `paper-sops-to-ar-sops-assembly-errors-hero.png` | Paper-to-AR workflow hero |
| `pilot-ar-work-instructions-critical-changeover-hero.png` | Changeover hero |
| `ar-vs-pdf-onboarding-pilots-hero.png` | AR onboarding hero |
| `design-first-ar-onboarding-program-shop-floor-hero.png` | AR onboarding hero |
| `ar-onboarding-new-hires-productivity-hero.png` | AR onboarding hero |
| `tribal-knowledge-to-ar-sops-roadmap-hero.png` | Paper-to-AR workflow hero |
| `reducing-downtime-ar-guided-remote-troubleshooting-hero.png` | Remote expert hero |
| `standardising-inspections-ar-sops-fewer-surprises-hero.png` | Quality inspections hero |
| `hero-operators-standardised-changeovers-digital-work-instructions-hero.png` | Changeover hero |
| `ar-remote-expert-support-vs-phone-support-hero.png` | Remote expert hero |
| `ar-sops-audits-compliance-hero.png` | Paper-to-AR workflow hero |
| `organise-remote-expert-pool-ar-support-hero.png` | Remote expert hero |
| `standardise-complex-assembly-digital-work-instructions-hero.png` | Error-free assembly hero |
| `capturing-corporate-memory-ar-work-instructions-hero.png` | Paper-to-AR workflow hero |
| `ar-guided-changeovers-playbook-reduce-downtime-hero.png` | Changeover hero |

---

## 2. Content Page Redirects

### 2.1 Blog Redirects

| 404 URL | Redirects To | Notes |
|---------|-------------|-------|
| `/:locale/blogs` | `/:locale/blog` | Plural to singular correction |
| `/:locale/blogs/overcoming-ar-resistance` | `/:locale/blog/change-management-ar-projects` | Legacy link referenced in content |

### 2.2 Use Case Redirects

The site has 6 canonical use case pages with short slugs. Many 404s were using longer descriptive slugs.

**Canonical use case pages:**
- `/[locale]/ar-work-instructions-corporate-memory`
- `/[locale]/ar-training-and-onboarding`
- `/[locale]/ar-guided-assembly-production`
- `/[locale]/ar-guided-changeover-batch-preparation`
- `/[locale]/ar-preventive-maintenance`
- `/[locale]/ar-remote-expert-support-corrective-maintenance`

**Redirects added:**

| 404 URL Pattern | Redirects To |
|----------------|--------------|
| `/use-cases/ar-preventive-maintenance-with-data-driven-insights` | `/ar-preventive-maintenance` |
| `/use-cases/ar-training-and-onboarding-for-industrial-teams` | `/ar-training-and-onboarding` |
| `/use-cases/ar-guided-assembly-for-error-free-production` | `/ar-guided-assembly-production` |
| `/use-cases/ar-remote-expert-support-for-corrective-maintenance` | `/ar-remote-expert-support-corrective-maintenance` |
| `/use-cases/ar-onboarding` | `/ar-training-and-onboarding` |
| `/use-cases/digital-sops-maintenance` | `/ar-preventive-maintenance` |
| `/use-cases/ar-inspections` | `/ar-preventive-maintenance` |
| `/use-cases/digital-sops-manufacturing` | `/use-cases` |
| `/use-cases/ar-compliance` | `/ar-work-instructions-corporate-memory` |
| `/use-cases/ar-work-instructions-corporate-memory` | `/ar-work-instructions-corporate-memory` |
| `/use-cases/digital-work-instructions` | `/use-cases` |
| `/use-cases/digital-work-instructions-regulated` | `/ar-work-instructions-corporate-memory` |
| `/use-cases/ai-ar-guided-work-instructions` | `/use-cases` |
| `/use-cases/digital-maintenance-instructions` | `/ar-preventive-maintenance` |
| `/use-cases/digital-work-instructions-industrial-maintenance` | `/ar-preventive-maintenance` |
| `/use-cases/digital-work-instructions-maintenance` | `/ar-preventive-maintenance` |
| `/use-cases/maintenance-ar-sops` | `/ar-preventive-maintenance` |
| `/use-cases/ar-safety-compliance` | `/ar-work-instructions-corporate-memory` |
| `/use-cases/ar-maintenance` | `/ar-preventive-maintenance` |
| `/use-cases/ar-sops` | `/use-cases` |

### 2.3 Explainer Redirects

The site doesn't have an `/explainer/` section. All explainer URLs redirect to relevant blog posts or use cases.

| 404 URL Pattern | Redirects To |
|----------------|--------------|
| `/explainer/ai-ar-guided-instructions` | `/use-cases` |
| `/explainer/ar-hardware-checklist` | `/blog/ar-hardware-smart-glasses-tablets-smartphones` |
| `/explainer/ar-guided-work-instructions` | `/use-cases` |
| `/explainer/ar-ai-governance` | `/blog/cybersecurity-data-privacy-ar-ai-operations` |
| `/explainer/ai-ar-sops` | `/use-cases` |
| `/explainer/ar-pilot-checklist` | `/blog/ar-pilot-success-scaling` |
| `/explainer/ar-sop-management` | `/ar-work-instructions-corporate-memory` |
| `/explainer/ar-instructions-explained` | `/use-cases` |
| `/explainer/digital-work-instructions` | `/use-cases` |

### 2.4 Resources Redirects

The site doesn't have a `/resources/` section. All resource URLs redirect to relevant blog posts or use case pages.

| 404 URL Pattern | Redirects To |
|----------------|--------------|
| `/resources/ar-training-checklist` | `/ar-training-and-onboarding` |
| `/resources/digital-sop-implementation` | `/blog/from-paper-sop-to-ar-workflow` |
| `/resources/ar-pilot-checklist` | `/blog/ar-pilot-success-scaling` |
| `/resources/ar-implementation-checklist` | `/blog/ar-ai-rollout-roadmap` |
| `/resources/digital-work-instruction-best-practices` | `/blog/from-paper-sop-to-ar-workflow` |

### 2.5 FAQ Sub-route Redirects

The site has a main FAQ page at `/[locale]/faq` but no sub-routes. All FAQ sub-URLs redirect to the main FAQ.

| 404 URL Pattern | Redirects To |
|----------------|--------------|
| `/faq/ar-work-instructions` | `/faq` |
| `/faq/ar-knowledge-platforms` | `/faq` |
| `/faq/digital-work-instructions` | `/faq` |
| `/faq/ar-data-security` | `/faq` |

---

## 3. Additional Redirect Categories

### 3.1 Root Path Redirects (Non-localized)

Non-localized paths are redirected to the default locale (`en`):

| Source | Destination |
|--------|-------------|
| `/blog` | `/en/blog` |
| `/faq` | `/en/faq` |
| `/about` | `/en/about` |
| `/contact` | `/en/contact` |
| `/use-cases` | `/en/use-cases` |
| `/career` | `/en/career` |
| `/privacy` | `/en/privacy` |
| `/terms` | `/en/terms` |

### 3.2 Legacy Page Redirects

Old page names redirect to current pages:

| Source Pattern | Destination |
|----------------|-------------|
| `/solutions` | `/use-cases` |
| `/products` | `/use-cases` |
| `/services` | `/use-cases` |
| `/industries` | `/use-cases` |
| `/partners` | `/partner-contact` |
| `/team` | `/about` |
| `/company` | `/about` |
| `/jobs` | `/career` |
| `/careers` | `/career` |
| `/request-demo` | `/contact` |
| `/book-demo` | `/contact` |
| `/get-started` | `/contact` |

### 3.3 Catch-All Patterns

For future-proofing, catch-all redirects handle unknown slugs:

| Pattern | Destination |
|---------|-------------|
| `/:locale/blogs/:slug` | `/:locale/blog/:slug` |
| `/:locale/explainer/:slug` | `/:locale/use-cases` |
| `/:locale/resources/:slug` | `/:locale/blog` |
| `/:locale/faq/:slug` | `/:locale/faq` |

---

## 4. Content Fixes

### 4.1 Internal Link Corrections

**File:** `content/blogs/2025-11-28-scaling-ar-from-one-plant-to-many-governance-templates-and-standards.mdx`

**Changed:**
```markdown
# Before
[how to overcome resistance to digital work instructions](/blogs/overcoming-ar-resistance)

# After
[how to overcome resistance to digital work instructions](/en/blog/change-management-ar-projects)
```

### 4.2 MDX Syntax Fixes

**File:** `content/blogs/the-future-of-work/index.mdx`

Fixed React JSX syntax in embedded SlideShare iframe - converted HTML style strings to React style objects.

---

## 5. Technical Implementation

All redirects are implemented in `next.config.ts` using the `redirects()` function. 

**Key features:**
- Locale-aware patterns (`:locale`) work across all supported languages (en, de, nl)
- Permanent redirects (301) for SEO value transfer
- Catch-all patterns prevent future 404s for unknown slugs
- JSDoc documentation in config explains each redirect category

---

## 6. Testing Checklist

After deployment, verify:

- [ ] `/actarion%20header%203.png` → redirects to `/actarion-header-3.png`
- [ ] `/actarion%20header2.png` → redirects to `/actarion-header-2.png`
- [ ] All `/blogs/*.png` hero images return 200
- [ ] `/en/blogs` → redirects to `/en/blog`
- [ ] `/en/use-cases/ar-preventive-maintenance-with-data-driven-insights` → redirects to `/en/ar-preventive-maintenance`
- [ ] `/en/explainer/ar-hardware-checklist` → redirects to `/en/blog/ar-hardware-smart-glasses-tablets-smartphones`
- [ ] `/en/faq/ar-work-instructions` → redirects to `/en/faq`
- [ ] `/blog` (no locale) → redirects to `/en/blog`
- [ ] `/en/solutions` → redirects to `/en/use-cases`
- [ ] Unknown explainer slug → redirects to use cases page

---

## 7. Future Improvements

Consider creating dedicated pages for high-traffic topics:

1. **Explainer section** - Technical explainers for AR/AI concepts
2. **Resources section** - Downloadable checklists and guides
3. **FAQ sub-pages** - Detailed FAQ pages for specific topics

These could be added to the content plan when prioritising new content.

---

## 8. Maintenance Notes

When adding new content:
1. Use consistent slug patterns (kebab-case, no spaces)
2. Check that new URLs don't conflict with existing redirects
3. Update redirects if renaming or moving content
4. The catch-all patterns will handle most edge cases automatically

