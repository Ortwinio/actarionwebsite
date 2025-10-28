import { defineConfig, s } from 'velite'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const blog = s.object({
  title: s.string(),
  description: s.string(),
  image: s.image().optional(),
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
    ? {
        ...data.image,
        // Velite outputs to public/blogs; ensure URL prefix
        src: data.image.src.replace('/static', '/blogs'),
        alt: (data as any).image?.alt ?? (data as any).title,
      }
    : undefined,
}))

export default defineConfig({
  root: 'content',
  collections: {
    blogs: { name: 'Blog', pattern: 'blogs/**/*.mdx', schema: blog },
  },
  // Emit generated data inside src so Next bundles it reliably in prod
  output: { data: 'src/.velite/generated', assets: 'public/blogs', clean: true },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, { theme: 'github-dark', grid: false }],
    ],
  },
})



