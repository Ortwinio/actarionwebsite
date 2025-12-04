# ActARion Website QA Checklist

> Final technical QA before going live. Last updated: 2025-12-04

## Summary Status

| Check | Status | Notes |
|-------|--------|-------|
| EN/NL/DE Coverage | ✅ Pass | All 72 routes return 200 OK |
| Sitemap Updated | ✅ Pass | Includes all pages with hreflang |
| Internal Links OK | ✅ Pass | All navigation links work |
| Robots/SEO OK | ✅ Pass | robots.txt & hreflang configured |
| HTML Lang Attribute | ⚠️ Note | Fixed client-side (see notes) |

---

## 1. Locale Coverage (EN → NL/DE)

### 1.1 i18n Configuration
- [x] Locales defined: `en`, `nl`, `de` in `src/config/site.ts`
- [x] Default locale: `en`
- [x] App Router with `[locale]` dynamic segment
- [x] Middleware handles locale detection & redirects
- [x] `<html lang>` attribute corrected client-side via `HtmlLangSetter` component

### 1.2 Routes Verified
All routes accessible in EN, NL, and DE (72 total routes tested):

**Static Pages:** ✅
- [x] `/[locale]` (home)
- [x] `/[locale]/about`
- [x] `/[locale]/contact`
- [x] `/[locale]/demo`
- [x] `/[locale]/partner-contact`
- [x] `/[locale]/career`
- [x] `/[locale]/faq`
- [x] `/[locale]/privacy`
- [x] `/[locale]/terms`
- [x] `/[locale]/use-cases`
- [x] `/[locale]/events`
- [x] `/[locale]/whitepapers`
- [x] `/[locale]/videos`
- [x] `/[locale]/news`
- [x] `/[locale]/blog`
- [x] `/[locale]/vision`
- [x] `/[locale]/management`
- [x] `/[locale]/services`

**Use Case Pages:** ✅
- [x] `/[locale]/ar-preventive-maintenance`
- [x] `/[locale]/ar-training-and-onboarding`
- [x] `/[locale]/ar-guided-assembly-production`
- [x] `/[locale]/ar-remote-expert-support-corrective-maintenance`
- [x] `/[locale]/ar-guided-changeover-batch-preparation`
- [x] `/[locale]/ar-work-instructions-corporate-memory`

### 1.3 Locale Verification Script
Run: `npm run check:locales`

**Last run results:**
- Total routes checked: 72
- Success (200): 72
- Failed: 0

---

## 2. Sitemap Verification

### 2.1 Configuration
- [x] Using Next.js App Router `sitemap.ts`
- [x] Site URL: `https://www.actarion.com`
- [x] Static segments included
- [x] Use case pages included
- [x] Partner pages included
- [x] Blog listing and posts included

### 2.2 Sitemap Features
- [x] All locales (en, nl, de) for each static page
- [x] `xhtml:link` hreflang alternates in sitemap entries
- [x] Change frequency and priority configured
- [x] Blog posts grouped by slug with available translations

### 2.3 Sample Sitemap Entry
```xml
<url>
  <loc>https://www.actarion.com/en/about</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.actarion.com/en/about"/>
  <xhtml:link rel="alternate" hreflang="de" href="https://www.actarion.com/de/about"/>
  <xhtml:link rel="alternate" hreflang="nl" href="https://www.actarion.com/nl/about"/>
  <lastmod>2025-12-04</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## 3. Internal Link Check

### 3.1 Tools Available
- `npm run check:locales` - Verify all locale routes
- `npm run check:links` - Run linkinator for broken links

### 3.2 Areas Verified
- [x] Navigation links (header/footer)
- [x] Use case page links
- [x] Blog listing accessible
- [x] CTA buttons functional

---

## 4. Crawlability & SEO

### 4.1 robots.txt ✅
Generated via `src/app/robots.ts`:
```
User-Agent: *
Allow: /

Sitemap: https://www.actarion.com/sitemap.xml
```

### 4.2 Canonical Tags ✅
- [x] Canonical URLs set via `buildPageMetadata()` 
- [x] Path normalization (trailing slashes, query strings)
- [x] Example: `<link rel="canonical" href="https://www.actarion.com/nl/about"/>`

### 4.3 Hreflang Tags ✅
- [x] All locales included (en, de, nl)
- [x] `x-default` points to English version
- [x] Implemented via Next.js Metadata API

**Example from /nl/about:**
```html
<link rel="alternate" hrefLang="en" href="https://www.actarion.com/en/about"/>
<link rel="alternate" hrefLang="de" href="https://www.actarion.com/de/about"/>
<link rel="alternate" hrefLang="nl" href="https://www.actarion.com/nl/about"/>
<link rel="alternate" hrefLang="x-default" href="https://www.actarion.com/en/about"/>
```

---

## 5. On-Page SEO

### 5.1 Titles & Descriptions
- [x] Page-level metadata via `buildPageMetadata()`
- [x] Locale-specific OpenGraph locale (`en_US`, `de_DE`, `nl_NL`)
- [x] Unique titles per page
- [x] Unique descriptions per page

### 5.2 Structured Data
- [x] Organization schema
- [x] LocalBusiness/ProfessionalService schema
- [x] WebSite schema with search action support
- [x] Article/BlogPosting schema for blog posts
- [x] BreadcrumbList schema helper
- [x] HowTo schema helper

### 5.3 Headings
- [x] Single `<h1>` per page (via PageHeader component)
- [x] Logical heading hierarchy

---

## 6. Known Issues & Notes

### 6.1 HTML Lang Attribute (Server-Side)
**Issue:** In development mode with Turbopack, the `<html lang>` attribute shows `"en"` for NL/DE pages in server-rendered HTML.

**Root Cause:** Next.js middleware headers are not reliably propagated to the root layout in development mode.

**Mitigation:** 
- Client-side `HtmlLangSetter` component corrects the lang attribute after hydration
- All other SEO signals (canonical, hreflang, og:locale) are correctly set server-side
- This is primarily a development mode issue; production static generation may handle this better

**Files involved:**
- `src/app/layout.tsx` - Root layout with locale detection
- `src/components/HtmlLangSetter.tsx` - Client-side correction
- `middleware.ts` - Sets locale headers/cookies

### 6.2 LanguageSelector Suspense
**Fixed:** Wrapped `LanguageSelector` component in Suspense boundary to resolve `useSearchParams` build error.

---

## 7. Scripts Reference

```bash
# Check locale coverage (all routes return 200)
npm run check:locales

# Check internal links (requires dev server running)
npm run check:links

# Check links on production
npm run check:links:prod

# Build the site
npm run build

# Run development server
npm run dev
```

---

## 8. Post-Deploy Verification Checklist

- [ ] https://www.actarion.com/en loads correctly
- [ ] https://www.actarion.com/nl loads correctly
- [ ] https://www.actarion.com/de loads correctly
- [ ] /sitemap.xml accessible and valid
- [ ] /robots.txt accessible and correct
- [ ] Navigation links work in all locales
- [ ] Footer links work in all locales
- [ ] Contact form submits successfully
- [ ] Language switcher works correctly

---

## Sign-off

- [x] QA Completed: 2025-12-04
- [x] All critical routes accessible
- [ ] Production deployment verified
