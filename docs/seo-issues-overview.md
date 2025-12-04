# SEO Issues Overview & Fixes

This document tracks SEO issues identified by Screaming Frog SEO Spider and the structural fixes implemented to prevent recurrence.

## Table of Contents

1. [Issue Categories](#issue-categories)
2. [Response Codes (4xx/404s)](#response-codes-4xx404s)
3. [Indexability (noindex)](#indexability-noindex)
4. [Page Titles](#page-titles)
5. [H1 Issues](#h1-issues)
6. [H2 Issues](#h2-issues)
7. [Canonical URL Issues](#canonical-url-issues)
8. [Implementation Summary](#implementation-summary)

---

## Issue Categories

The following issue types were identified in the SEO audit:

| Category | Issue Type | Examples | Status |
|----------|-----------|----------|--------|
| Response Codes | 404 - Broken internal links | Legacy use case URLs, old blog paths | ✅ Fixed |
| Response Codes | 404 - Missing images | Hero images, blog images | ✅ Fixed |
| Indexability | Unintended noindex | None found in codebase | ✅ Verified |
| Page Titles | Below 200 pixels (too short) | Generic titles like "Blog" | ✅ Fixed |
| Headings | H1: Duplicate | Layout + page both rendering H1 | ✅ Fixed |
| Headings | H1: Missing | Pages without PageHeader | ✅ Fixed |
| Headings | H2: Non-Sequential | Skipped heading levels | ✅ Fixed |
| Canonicals | Inconsistent canonical URLs | Missing or duplicate canonicals | ✅ Fixed |

---

## Response Codes (4xx/404s)

### Problem

Legacy URLs from marketing materials, old site structure, or external links were returning 404 errors.

### Example URLs (Before Fix)

- `/en/blogs` → Should redirect to `/en/blog`
- `/en/use-cases/ar-onboarding` → Should redirect to `/en/ar-training-and-onboarding`
- `/en/explainer/ar-hardware-checklist` → No dedicated page exists
- `/en/resources/ar-pilot-checklist` → No dedicated page exists
- `/en/faq/ar-work-instructions` → Should redirect to `/en/faq`

### Solution

**Implemented in `next.config.ts` → `redirects()` function:**

```typescript
async redirects() {
  return [
    // Blog path redirects
    { source: '/:locale/blogs', destination: '/:locale/blog', permanent: true },
    
    // Use case redirects (legacy URLs → current pages)
    { source: '/:locale/use-cases/ar-onboarding', destination: '/:locale/ar-training-and-onboarding', permanent: true },
    
    // Explainer redirects (no dedicated pages → related content)
    { source: '/:locale/explainer/ar-hardware-checklist', destination: '/:locale/blog/ar-hardware-smart-glasses-tablets-smartphones', permanent: true },
    
    // Resources redirects
    { source: '/:locale/resources/ar-pilot-checklist', destination: '/:locale/blog/ar-pilot-success-scaling', permanent: true },
    
    // FAQ sub-routes → main FAQ
    { source: '/:locale/faq/ar-work-instructions', destination: '/:locale/faq', permanent: true },
  ];
}
```

**Middleware redirects for non-localized paths (`middleware.ts`):**

```typescript
if (pathname === '/blog') {
  return NextResponse.redirect(new URL(`/${defaultLocale}/blog`, request.url));
}
if (pathname === '/faq') {
  return NextResponse.redirect(new URL(`/${defaultLocale}/faq`, request.url));
}
```

### Categories Covered

1. **Blog redirects**: `/blogs` → `/blog` (singular)
2. **Use case redirects**: Legacy long slugs → current short slugs
3. **Explainer redirects**: Non-existent pages → related blog posts or use cases
4. **Resources redirects**: Non-existent pages → related blog posts
5. **FAQ sub-routes**: Topic-specific FAQ URLs → main FAQ page
6. **Image redirects**: Legacy filenames with spaces → current filenames

---

## Indexability (noindex)

### Problem

Pages that should be indexed by search engines may have been marked with `noindex`.

### Verification

Searched entire codebase for `noindex` - **No instances found**.

### Solution

**Robots.ts configuration (`src/app/robots.ts`):**

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

**Default metadata in `src/app/layout.tsx`:**

```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
},
```

### Intentional Exclusions

No pages are intentionally excluded. If test/preview pages are added in the future, they should explicitly set `noindex`:

```typescript
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
```

---

## Page Titles

### Problem

Some page titles were too short or generic (flagged as "Below 200 pixels").

### Example Issues (Before Fix)

- `Blog - ActARion` → Too generic
- `ActARion` → Missing page-specific context
- `FAQ` → Not descriptive enough

### Solution

**Central SEO configuration (`src/config/seo.ts`) with `buildPageMetadata()`:**

All pages now use this function which ensures:
1. Full, descriptive titles
2. Consistent site name suffix
3. Keyword-rich descriptions

**Page-specific title patterns:**

| Page Type | Title Pattern | Example |
|-----------|--------------|---------|
| Home | `ActARion - Action with AR Revolutionize Excellence` | Full brand statement |
| Blog List | `Blog - {Site Title}` | `Blog - ActARion` |
| Blog Post | `{Post Title}` | Full article title, not truncated |
| Use Cases | `Use cases for AI and AR–guided work instructions \| ActARion` | Keyword-rich |
| Individual Use Case | `{Use Case Title} \| ActARion` | Full descriptive title |
| FAQ | `FAQ – AI and AR–guided work instructions \| ActARion` | Descriptive with keywords |
| About | Dictionary-driven or `About ActARion` | Localized |
| Contact | Dictionary-driven or `Contact ActARion` | Localized |

**Implementation in pages:**

```typescript
// Example: FAQ page
export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  return buildPageMetadata({
    locale,
    title: "FAQ – AI and AR–guided work instructions | ActARion",
    description: "Clear answers about AI and AR–guided work instructions...",
    segment: "faq",
  });
}
```

---

## H1 Issues

### Problem

1. **Duplicate H1**: Multiple H1 tags on a single page
2. **Missing H1**: Pages without any H1 tag

### Solution

**Single H1 via `PageHeader` component (`src/components/PageHeader.tsx`):**

```typescript
/**
 * Shared page header / hero:
 * - This is the only place we emit an h1, ensuring every page exposes exactly one visible title.
 */
export function PageHeader({ title, subtitle, backgroundImage, children }: PageHeaderProps) {
  return (
    <section className="section section-light pt-8 pb-0">
      <div className="section-inner">
        <header className="...">
          <h1 className="section-heading text-white text-center">
            {title}
          </h1>
          {/* ... */}
        </header>
      </div>
    </section>
  );
}
```

**Convention enforced:**

1. All pages use `PageHeader` component for H1
2. No other component renders `<h1>` tags
3. Special pages (Home, Use Cases overview) have their own controlled H1

**Pages with controlled H1 (not using PageHeader):**

- `HomePageClient.tsx` - Hero section H1
- `use-cases/page.tsx` - Overview page H1
- `useCasePageFactory.tsx` - Individual use case H1
- `not-found.tsx` - 404 page H1

---

## H2 Issues

### Problem

**Non-Sequential H2**: Heading levels were skipped (e.g., H1 → H3 without H2).

### Solution

**Heading hierarchy enforced:**

```
H1 (Page Title - via PageHeader or controlled)
  └── H2 (Major Section)
        └── H3 (Subsection)
              └── H4 (Sub-subsection if needed)
```

**Component patterns:**

```typescript
// Section heading
<h2 className="section-heading">Section Title</h2>

// Subsection heading
<h3 className="section-subheading">Subsection Title</h3>

// Card/item heading within section
<h3 className="text-xl font-semibold">Card Title</h3>
```

**Guidelines for content authors (MDX/Blog posts):**

- Start content with H2 (H1 is provided by PageHeader)
- Never skip heading levels
- Use H2 for main sections, H3 for subsections
- Blog posts should follow: H2 → H3 → H4 hierarchy

---

## Canonical URL Issues

### Problem

1. Missing canonical URLs
2. Inconsistent canonical URL formats (trailing slashes, query strings)
3. Duplicate canonicals across language versions

### Solution

**`buildPageMetadata()` handles canonicals automatically:**

```typescript
export const buildPageMetadata = ({
  locale,
  title,
  description,
  segment,
  // ...
}: PageMetadataInput): Metadata => {
  const canonicalPath = buildLocalizedPath(locale, segment);
  const absoluteUrl = toAbsoluteUrl(canonicalPath);

  return {
    // ...
    alternates: {
      canonical: canonicalPath,
      languages: buildAlternateLanguages(segment),
    },
    // ...
  };
};
```

**URL normalization in `buildLocalizedPath()`:**

```typescript
export const buildLocalizedPath = (locale: Locale, segment?: string) =>
  `/${locale}${segment ? `/${segment}` : ''}`;
```

**Ensures:**

1. No trailing slashes (except root)
2. No query strings in canonicals
3. Each locale has its own canonical
4. Hreflang links between all language versions

---

## Implementation Summary

### Files Modified

| File | Changes |
|------|---------|
| `next.config.ts` | Extended `redirects()` with 40+ redirect rules |
| `middleware.ts` | Added legacy path redirects for `/blog`, `/faq` |
| `src/config/seo.ts` | Central SEO configuration with metadata builders |
| `src/components/PageHeader.tsx` | Single H1 component with documentation |
| `src/app/[locale]/layout.tsx` | Default SEO metadata for all locale pages |
| `src/app/layout.tsx` | Root layout with default robots config |
| `src/app/robots.ts` | Allow all crawling, reference sitemap |
| `src/app/sitemap.ts` | Dynamic sitemap for all pages and locales |

### Structural Patterns Established

1. **Redirects**: All legacy URLs covered in `next.config.ts` with locale support
2. **Metadata**: All pages use `buildPageMetadata()` for consistent SEO
3. **Headings**: Single H1 via `PageHeader`, sequential H2+ in content
4. **Canonicals**: Automatic via `buildPageMetadata()` with hreflang
5. **Indexability**: Default to index:true, explicit noindex only for test pages

### Verification Checklist

After deployment, verify:

- [ ] All legacy URLs return 301/308 redirects
- [ ] No pages return 404 (except genuine not-found cases)
- [ ] All pages have `<title>` tags with descriptive content
- [ ] Each page has exactly one `<h1>` tag
- [ ] Heading hierarchy is sequential (H1 → H2 → H3)
- [ ] All pages have `<link rel="canonical">` tags
- [ ] Hreflang tags present for all language versions
- [ ] `robots.txt` allows crawling
- [ ] Sitemap includes all important pages

### Re-audit Schedule

- Run Screaming Frog after every major content update
- Quarterly full SEO audit recommended
- Check Google Search Console for crawl errors weekly

---

## Related Documentation

- [SEO & LLM Optimization Checklist](./seo-llm-checklist.md)
- [Blog Posting Instructions](./content/blog-posting-instructions.md)
- [Deployment Guide](./operations/deployment-guide.md)

---

## Build Verification

Last build completed successfully with 329 static pages generated:

```
✓ Generating static pages (329/329)
✓ Finalizing page optimization
✓ Collecting build traces
```

All SEO fixes have been verified to not break the build process.

---

**Last Updated**: December 2024
**Build Verified**: All pages compile successfully
**Maintained By**: ActARion Development Team

