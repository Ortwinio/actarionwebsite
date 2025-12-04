# SEO & LLM Optimization Checklist

This document provides a comprehensive guide for maintaining technical SEO and LLM-friendly structure across the ActARion website.

## Table of Contents

1. [Implementation Status](#implementation-status)
2. [Adding Metadata to New Pages](#adding-metadata-to-new-pages)
3. [Adding Structured Data (Schema.org)](#adding-structured-data-schemaorg)
4. [Semantic HTML Guidelines](#semantic-html-guidelines)
5. [Multilingual SEO](#multilingual-seo)
6. [Internal Linking Best Practices](#internal-linking-best-practices)
7. [Image Optimization](#image-optimization)
8. [Content Structure for LLMs](#content-structure-for-llms)
9. [Verification Checklist](#verification-checklist)

---

## Implementation Status

### ✅ Completed

- **Central SEO Configuration** (`src/config/seo.ts`)
  - Comprehensive schema builders (Article, BlogPosting, BreadcrumbList, HowTo, WebSite)
  - Metadata builders with Open Graph and Twitter cards
  - Multilingual support (hreflang, canonical URLs)

- **Structured Data Implementation**
  - Organization schema on all pages (via locale layout)
  - WebSite schema with SearchAction support
  - Article/BlogPosting schema for blog posts
  - BreadcrumbList on blog posts, use cases, and partner pages
  - FAQPage schema on FAQ page
  - ContactPage schema on contact page

- **Sitemap & Robots**
  - Dynamic sitemap including all pages and languages (`src/app/sitemap.ts`)
  - Robots.txt with sitemap reference (`src/app/robots.ts`)

- **Semantic HTML**
  - Proper use of `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<nav>`
  - Single H1 per page (via PageHeader component)
  - Hierarchical heading structure (H1 → H2 → H3)

---

## Adding Metadata to New Pages

### Step 1: Create the Page Component

```typescript
// src/app/[locale]/your-page/page.tsx
import { Metadata } from "next";
import { buildPageMetadata } from "@/config/seo";
import { isSupportedLocale, Locale } from "@/config/site";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return buildPageMetadata({
    locale: locale as Locale,
    title: "Your Page Title | ActARion",
    description: "A clear, descriptive meta description (150-160 characters)",
    segment: "your-page",
    // Optional: custom image
    // image: { url: "/your-image.png", alt: "Description" },
    type: "website", // or "article" for blog-like content
  });
}
```

### Step 2: Add to Sitemap

Update `src/app/sitemap.ts`:

```typescript
const staticSegments = [
  // ... existing segments
  "your-page", // Add your new page here
];
```

---

## Adding Structured Data (Schema.org)

### Blog Post Example

```typescript
import { 
  buildWebPageSchema, 
  buildBlogPostingSchema, 
  buildBreadcrumbListSchema 
} from "@/config/seo";

const structuredData = [
  buildWebPageSchema({
    locale,
    title: blog.title,
    description: blog.description,
    segment: `blog/${blog.slug}`,
  }),
  buildBlogPostingSchema({
    locale,
    title: blog.title,
    description: blog.description,
    segment: `blog/${blog.slug}`,
    author: blog.author,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    image: blog.image?.src,
    tags: blog.tags,
  }),
  buildBreadcrumbListSchema([
    { name: "Home", url: buildLocalizedPath(locale) },
    { name: "Blog", url: buildLocalizedPath(locale, "blog") },
    { name: blog.title, url: buildLocalizedPath(locale, `blog/${blog.slug}`) },
  ]),
];

// Inject into page
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

### Use Case Page Example

```typescript
import { 
  buildWebPageSchema, 
  buildTechArticleSchema, 
  buildBreadcrumbListSchema 
} from "@/config/seo";

const structuredData = [
  buildWebPageSchema({
    locale,
    title: useCase.title,
    description: useCase.metaDescription,
    segment: useCase.slug,
  }),
  buildTechArticleSchema({
    locale,
    title: useCase.title,
    description: useCase.metaDescription,
    segment: useCase.slug,
  }),
  buildBreadcrumbListSchema([
    { name: "Home", url: buildLocalizedPath(locale) },
    { name: "Use Cases", url: buildLocalizedPath(locale, "use-cases") },
    { name: useCase.title, url: buildLocalizedPath(locale, useCase.slug) },
  ]),
];
```

### HowTo Schema (for step-by-step guides)

```typescript
import { buildHowToSchema } from "@/config/seo";

const howToSchema = buildHowToSchema({
  locale,
  name: "How to Implement AR Work Instructions",
  description: "Step-by-step guide to implementing AR work instructions",
  steps: [
    {
      name: "Step 1: Assessment",
      text: "Evaluate your current processes and identify opportunities",
      image: "/images/step1.png",
    },
    {
      name: "Step 2: Pilot",
      text: "Start with a focused pilot on one use case",
      image: "/images/step2.png",
    },
    // ... more steps
  ],
  totalTime: "PT2H", // ISO 8601 duration format
  image: "/images/howto-hero.png",
});
```

---

## Semantic HTML Guidelines

### Required Structure

Every page should follow this structure:

```tsx
<main>
  <header> {/* Optional: if not using PageHeader */}
    <h1>Page Title</h1>
  </header>
  
  <section>
    <h2>Section Title</h2>
    <p>Content...</p>
  </section>
  
  <section>
    <h2>Another Section</h2>
    <article>
      <h3>Article Title</h3>
      <p>Article content...</p>
    </article>
  </section>
</main>
```

### Heading Hierarchy Rules

1. **One H1 per page** - Always use the PageHeader component which includes H1
2. **H2 for major sections** - Problem, Solution, Benefits, Use Cases, FAQs
3. **H3 for subsections** - Within major sections
4. **Never skip levels** - Don't go from H1 to H3

### Semantic Elements

- `<main>` - Wraps the main content (one per page)
- `<header>` - Page header/hero section
- `<footer>` - Page footer (handled by Footer component)
- `<section>` - Logical content sections
- `<article>` - Self-contained content (blog posts, use cases)
- `<nav>` - Navigation menus
- `<aside>` - Sidebar content (if applicable)
- `<ul>` / `<ol>` - Lists (preferred over dense paragraphs for LLMs)

---

## Multilingual SEO

### Adding a New Language

1. **Update `src/config/site.ts`**:
```typescript
export const locales = ['en', 'de', 'nl', 'fr'] as const; // Add 'fr'
```

2. **Add Open Graph locale** in `src/config/seo.ts`:
```typescript
const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  nl: 'nl_NL',
  fr: 'fr_FR', // Add new locale
};
```

3. **Create translation files** in `src/lib/dictionaries/`

4. **Update sitemap** - The sitemap automatically includes all locales

### Hreflang & Canonical

These are automatically handled by `buildPageMetadata()`:
- Canonical URL points to the current language version
- Hreflang tags link to all language versions
- `<html lang="...">` is set correctly per locale

---

## Internal Linking Best Practices

### Contextual Links

Add relevant internal links within content:

```tsx
// In use case pages
<p>
  Learn more about <Link href={buildLocalizedPath(locale, "ar-training-and-onboarding")}>
    AR training and onboarding
  </Link> for industrial teams.
</p>

// In blog posts
<p>
  Explore our <Link href={buildLocalizedPath(locale, "use-cases")}>
    use cases
  </Link> to see how ActARion helps different industries.
</p>
```

### Related Content Sections

Consider adding "Related" sections:
- Blog posts → Related use cases
- Use cases → Related blog posts
- Use cases → Related FAQ items

### Navigation

- All important pages accessible via main navigation or footer
- Footer includes links to legal pages, sitemap, main content hubs

---

## Image Optimization

### Requirements

1. **Descriptive alt text** - Always provide meaningful alt text
2. **Next.js Image component** - Use `next/image` for optimization
3. **Descriptive filenames** - `ar-guided-assembly-production.png` not `image1.png`
4. **Width and height** - Always specify dimensions

### Example

```tsx
import Image from "next/image";

<Image
  src="/images/usecases/ar-guided-assembly-hero.png"
  alt="AR-guided assembly process showing digital work instructions overlaid on physical equipment"
  width={1200}
  height={600}
  className="w-full h-auto object-cover"
  priority // For above-the-fold images
/>
```

### Alt Text Guidelines

- **Descriptive**: "AR work instructions displayed on smart glasses during assembly"
- **Contextual**: Include what the image shows in relation to the content
- **Concise**: 125 characters or less
- **No redundancy**: Don't start with "Image of..." or "Picture of..."

---

## Content Structure for LLMs

### Page Patterns

Each major page type should follow this structure:

1. **Short Summary** (2-4 sentences at the top)
   - Clearly states what the page is about
   - Includes key terminology (AR, SOP, work instructions, etc.)

2. **Structured Sections**
   - Overview
   - Key Challenges
   - How ActARion Helps
   - Benefits
   - Next Steps / Call to Action

3. **LLM-Friendly Formats**
   - **Lists** for benefits, features, steps
   - **Tables** for comparisons (if applicable)
   - **Q&A blocks** for FAQs
   - **Short paragraphs** (3-4 sentences max)

### Terminology Consistency

Use clear, consistent terminology:
- "Augmented Reality work instructions"
- "AI-powered SOPs"
- "Operator guidance"
- "Industrial training"
- "Digital work instructions"

Avoid vague terms like "solutions" or "platform" without context.

### Text Equivalents

- **Never put critical info only in images** - Always provide text equivalent
- **Video transcripts** - Provide text summaries for video content
- **Infographics** - Include text descriptions

---

## Verification Checklist

Before deploying a new page or major update:

### Technical SEO

- [ ] Unique, descriptive `<title>` (50-60 characters)
- [ ] Meta description (150-160 characters, unique)
- [ ] Open Graph tags present (title, description, image, url)
- [ ] Twitter card tags present
- [ ] Canonical URL set correctly
- [ ] Hreflang tags for all language versions
- [ ] `<html lang="...">` attribute correct
- [ ] Structured data (JSON-LD) present and valid
- [ ] Page included in sitemap
- [ ] Robots.txt allows crawling

### Semantic HTML

- [ ] Single H1 per page
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Semantic elements used (`<main>`, `<section>`, `<article>`, etc.)
- [ ] Navigation uses `<nav>` element
- [ ] Footer uses `<footer>` element

### Content Structure

- [ ] Clear intro/summary at top (2-4 sentences)
- [ ] Structured sections with H2 headings
- [ ] Lists used for benefits/features/steps
- [ ] Clear terminology (AR, SOP, work instructions)
- [ ] Text equivalents for all critical information

### Images

- [ ] All images have descriptive alt text
- [ ] Images use Next.js Image component
- [ ] Width and height specified
- [ ] Descriptive filenames
- [ ] Priority flag for above-the-fold images

### Internal Linking

- [ ] Contextual links to related content
- [ ] Navigation links to all important pages
- [ ] Footer includes key links
- [ ] No orphan pages (all pages reachable)

### Performance

- [ ] Images optimized (WebP/AVIF formats)
- [ ] No blocking scripts in `<head>`
- [ ] Code splitting working correctly
- [ ] Build succeeds without errors

### Testing

- [ ] View page source - verify meta tags
- [ ] Check JSON-LD with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate HTML structure
- [ ] Test all language versions
- [ ] Verify canonical and hreflang tags
- [ ] Check mobile responsiveness

---

## Quick Reference

### Common Schema Types

| Schema Type | Use Case | Builder Function |
|------------|----------|------------------|
| WebPage | All pages | `buildWebPageSchema()` |
| Article | Blog posts | `buildArticleSchema()` |
| BlogPosting | Blog posts (enhanced) | `buildBlogPostingSchema()` |
| TechArticle | Technical content | `buildTechArticleSchema()` |
| BreadcrumbList | Navigation path | `buildBreadcrumbListSchema()` |
| FAQPage | FAQ sections | Manual (see FAQ page example) |
| HowTo | Step-by-step guides | `buildHowToSchema()` |
| Organization | Company info | `getOrganizationSchema()` |
| WebSite | Site-wide | `buildWebSiteWithSearchActionSchema()` |

### File Locations

- SEO config: `src/config/seo.ts`
- Site config: `src/config/site.ts`
- Sitemap: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`
- PageHeader component: `src/components/PageHeader.tsx`

---

## Support

For questions or issues:
1. Check this documentation
2. Review existing page implementations
3. Consult the plans in `plans/` directory
4. Update this document if you discover new patterns

---

**Last Updated**: 2024
**Maintained By**: ActARion Development Team




