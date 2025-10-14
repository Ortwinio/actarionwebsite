import { defineConfig, s } from 'velite'
import path from 'path'
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
        // Normalize asset path to /blogs/<filename> served from public/blogs
        src: `/blogs/${path.basename(data.image.src)}`,
        // Preserve custom alt if present; otherwise default to blog title
        alt: (data as any).image?.alt ?? (data as any).title,
      }
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



