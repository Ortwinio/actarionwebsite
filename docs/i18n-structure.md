# ActARion i18n Implementation Structure

> **Last Updated:** December 2024  
> **Status:** ✅ Active

## Overview

The ActARion website uses Next.js App Router with segment-based internationalization. This approach provides clean, locale-prefixed URLs for all supported languages.

## Supported Locales

| Locale | Language   | URL Prefix | Status  |
|--------|------------|------------|---------|
| `en`   | English    | `/en/`     | Default |
| `nl`   | Nederlands | `/nl/`     | Active  |
| `de`   | Deutsch    | `/de/`     | Active  |

**Configuration:** `src/config/site.ts`

```typescript
export const locales = ['en', 'de', 'nl'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';
```

## Routing Architecture

### App Router Structure

The site uses a `[locale]` dynamic segment at the root of the app directory:

```
src/app/
├── layout.tsx                    # Root layout (sets html lang)
├── page.tsx                      # Redirects to /[locale]
├── [locale]/
│   ├── layout.tsx               # Locale-specific layout (nav, footer)
│   ├── page.tsx                 # Homepage
│   ├── about/page.tsx           # Static pages
│   ├── contact/page.tsx
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Individual blog posts
│   ├── use-cases/page.tsx
│   ├── ar-training-and-onboarding/page.tsx
│   └── ...other pages
```

### URL Examples

| Page         | English            | Nederlands         | Deutsch            |
|--------------|--------------------|--------------------|---------------------|
| Home         | `/en`              | `/nl`              | `/de`               |
| About        | `/en/about`        | `/nl/about`        | `/de/about`         |
| Contact      | `/en/contact`      | `/nl/contact`      | `/de/contact`       |
| Blog listing | `/en/blog`         | `/nl/blog`         | `/de/blog`          |
| Blog post    | `/en/blog/[slug]`  | `/nl/blog/[slug]`  | `/de/blog/[slug]`   |

## Middleware Behavior

**File:** `middleware.ts`

The middleware handles:

1. **Locale Detection:** Detects preferred locale from `Accept-Language` header
2. **Path Normalization:** Redirects non-localized paths (`/blog`) to localized versions (`/en/blog`)
3. **Header Injection:** Sets `x-actarion-locale` header for server components

```typescript
// Example flow:
// User visits /about → Middleware redirects to /en/about (or /nl/about based on browser language)
// User visits /en/about → Middleware passes through with x-actarion-locale: en header
```

## Translation System

### Dictionary Structure

**Location:** `src/lib/dictionaries/`

```
dictionaries/
├── en.json    # English translations
├── de.json    # German translations
└── nl.json    # Dutch translations
```

### Usage

```typescript
import { getDictionary } from '@/lib/getDictionary';

// In server components:
const dictionary = await getDictionary(locale);
const pageTitle = dictionary.pages?.about?.title;
```

### Translation Coverage

- **Navigation:** Fully localized (nav items, footer links)
- **Static pages:** Partially localized (some page content still in English)
- **Blog posts:** Content-based (each post can have EN/NL/DE versions via separate .mdx files)

## SEO Implementation

### HTML Lang Attribute

**File:** `src/app/layout.tsx`

```tsx
<html lang={resolvedLocale} className="scroll-smooth">
```

The `lang` attribute is set dynamically based on the current locale.

### Canonical URLs

**File:** `src/config/seo.ts`

Each page generates a self-referencing canonical URL:

```typescript
// For /nl/about:
<link rel="canonical" href="https://www.actarion.com/nl/about" />
```

### Hreflang Tags

Next.js metadata alternates are configured to generate hreflang tags:

```typescript
alternates: {
  canonical: canonicalPath,
  languages: {
    en: '/en/about',
    nl: '/nl/about', 
    de: '/de/about',
    'x-default': '/en/about',  // Fallback for unmatched languages
  },
}
```

**Output in HTML:**
```html
<link rel="alternate" hreflang="en" href="https://www.actarion.com/en/about" />
<link rel="alternate" hreflang="nl" href="https://www.actarion.com/nl/about" />
<link rel="alternate" hreflang="de" href="https://www.actarion.com/de/about" />
<link rel="alternate" hreflang="x-default" href="https://www.actarion.com/en/about" />
```

### Sitemap

**File:** `src/app/sitemap.ts`

The sitemap includes all localized URLs:

- All static pages for each locale
- All blog posts for each locale
- Use case pages for each locale
- Partner pages for each locale

**Access:** `https://www.actarion.com/sitemap.xml`

## Language Switcher

**Component:** `src/components/LanguageSelector.tsx`

The language switcher:
1. Displays current locale with flag emoji
2. On click, shows dropdown with all available locales
3. Uses `replaceLocaleInPathname()` to switch locale while preserving the current path

**Helper:** `src/lib/localePaths.ts`

```typescript
// Converts /en/about → /nl/about
replaceLocaleInPathname('/en/about', 'nl') // Returns: '/nl/about'
```

## Blog Localization

### Content Structure

Blog posts are stored as MDX files with locale suffix:

```
content/blogs/
├── 2025-11-26-ar-in-logistics.mdx          # English (default)
├── 2025-11-26-ar-in-logistics-nl.mdx       # Dutch
├── 2025-11-26-ar-in-logistics-de.mdx       # German
```

### Frontmatter

Each blog specifies its locale:

```yaml
---
title: "AR in Logistics"
locale: en  # or 'nl', 'de'
slug: "ar-in-logistics-guided-picking"
---
```

### Fallback Behavior

**File:** `src/lib/blogs.ts`

If a localized blog post doesn't exist, the system falls back to the English version:

```typescript
// If user visits /nl/blog/some-post but only EN version exists:
// → Shows EN version with isFallback: true flag
```

## Key Files Reference

| Purpose              | File                                    |
|----------------------|-----------------------------------------|
| Locale config        | `src/config/site.ts`                   |
| Middleware           | `middleware.ts`                         |
| Root layout          | `src/app/layout.tsx`                   |
| Locale layout        | `src/app/[locale]/layout.tsx`          |
| SEO helpers          | `src/config/seo.ts`                    |
| Dictionaries         | `src/lib/dictionaries/*.json`          |
| Language switcher    | `src/components/LanguageSelector.tsx`  |
| Locale path helpers  | `src/lib/localePaths.ts`               |
| Sitemap              | `src/app/sitemap.ts`                   |
| Blog post handling   | `src/lib/blogs.ts`                     |

## Best Practices

1. **Always use localized paths:** Use `buildLocalizedPath(locale, segment)` for internal links
2. **Update all dictionaries:** When adding new UI text, add translations to all JSON files
3. **Blog translations:** Create separate MDX files with locale suffix for translated posts
4. **SEO consistency:** Use `buildPageMetadata()` for all pages to ensure proper canonical/hreflang
5. **Testing:** Test language switching on all page types before deployment













