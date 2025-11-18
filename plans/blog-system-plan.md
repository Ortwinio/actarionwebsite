### Blog system (Velite + MDX) — Implementation Plan for ActARion

#### 1) Overview (based on example/)
- **Content source**: MDX files under `content/blogs/<post-slug>/index.mdx` with frontmatter (title, description, dates, tags, author, image, slug, isPublished, locale).
- **Build pipeline**: Velite parses MDX, applies remark/rehype plugins, generates `.velite/generated` JSON and copies images to `public/blogs`.
- **Runtime**: Next.js App Router pages import `blogs` from `@/.velite/generated` to render lists/details. Dynamic route uses `[slug]` with SSG and SEO metadata.
- **Styling**: Tailwind + `@tailwindcss/typography` for rich prose.

#### 2) Dependencies
```bash
npm i velite reading-time github-slugger remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki @tailwindcss/typography
```

#### 3) Content model and folders
- Create folders:
  - `content/blogs/<slug>/index.mdx`
  - Place images next to `index.mdx` (Velite copies to `public/blogs`).
- Frontmatter template (add `locale` for i18n routes):
```md
---
title: "AR SOPs: The Next Frontier"
description: "How AR work instructions improve safety and efficiency."
image: hero.jpg
publishedAt: 2025-01-03 09:00:00
updatedAt: 2025-01-03 09:00:00
author: "ActARion"
tags: [ar, sop, manufacturing]
slug: ar-sops-next-frontier
isPublished: true

locale: en   # one of: en | de | nl
---
```

#### 4) Velite configuration (add `velite.config.ts`)
```ts
import { defineConfig, s } from 'velite'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const blog = s.object({
  title: s.string(),
  description: s.string(),
  image: s.image(),
  publishedAt: s.isodate(),
  updatedAt: s.isodate(),
  author: s.string(),
  tags: s.array(s.string()).default([]),
  isPublished: s.boolean().default(true),
  slug: s.string(),
  locale: s.enum(['en','de','nl']).default('en'),
  body: s.mdx(),
  toc: s.toc(),
}).transform((data) => ({
  ...data,
  url: `/blog/${data.slug}`,
  readingTime: readingTime(data.body),
  image: data.image
    ? { ...data.image, src: data.image.src.replace('/static', '/blogs') }
    : undefined,
}))

export default defineConfig({
  root: 'content',
  collections: {
    blogs: { name: 'Blog', pattern: 'blogs/**/*.mdx', schema: blog },
  },
  output: { data: '.velite/generated', assets: 'public/blogs', clean: true },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, { theme: 'github-dark', grid: false }],
    ],
  },
})
```

#### 5) Build integration
- Recommended (automatic): add a small plugin to `next.config.ts` so Velite runs in dev/prod.
```ts
class VeliteWebpackPlugin {
  private static started = false;
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

// next.config.ts
const nextConfig = {
  // ...existing config
  webpack: (config: any) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};
export default nextConfig;
```
- Alternative scripts:
  - `"content": "velite --clean"`
  - `"postbuild": "npm run content"`
  - Dev: run `velite --watch` alongside `next dev` (e.g., with `concurrently`).

#### 6) Routes and pages (App Router + i18n)
- Create:
  - `src/app/[locale]/blog/page.tsx` (list view)
  - `src/app/[locale]/blog/[slug]/page.tsx` (detail view)
- Data source: import `{ blogs }` from `@/.velite/generated` and filter by `locale` and `isPublished`.
- Implement `generateStaticParams` for slugs per locale and `generateMetadata` for SEO.

#### 7) Rendering MDX
- Create `src/components/blog/RenderMdx.tsx` that renders Velite-compiled MDX.
- Wrap article with `prose prose-invert` (Tailwind typography) for styling.

#### 8) UI components
- `BlogCard` (preview), `BlogList` (grid), `BlogMeta` (author/dates/reading time/tags), `TOC` (optional using `toc`).
- Optional: tags/categories pages later.

#### 9) Tailwind setup
- Install and enable `@tailwindcss/typography` in `tailwind.config.js` plugins.

#### 10) Navigation & i18n
- Add "Blog" to dictionaries (`en.json`, `de.json`, `nl.json`) and to `Navigation`.
- Ensure `LanguageSelector` preserves `/blog` and `[slug]` by swapping the first path segment.

#### 11) SEO & sitemap
- Detail page metadata: use post `title`, `description`, `image`, `publishedAt`, `updatedAt` for OpenGraph/Twitter.
- Add a dynamic `sitemap.ts` that includes blog URLs: `https://www.ActARion.com/<locale>/blog/<slug>`.

#### 12) Content plan
- Start with 3–5 posts per locale: use cases, training impact, safety/compliance, case studies.
- Use `isPublished: false` for drafts.

#### 13) Testing & deployment
- Local: verify `/en/blog`, `/de/blog`, `/nl/blog` list/detail pages; images under `/blogs`; code blocks/anchors work.
- Vercel: no special config beyond plugin; ensure aggressive caching for `/blogs/*` assets in `vercel.json`.

#### 14) Optional enhancements
- Client search (title/tags), related posts by tags, RSS feed route, simple view counter (edge function + KV/DB).



