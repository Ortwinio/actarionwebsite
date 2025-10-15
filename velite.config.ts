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
  // Accept a string path (now served from public/blogs)
  image: s.string().optional(),
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
        // If author provided only filename, serve from /blogs/<filename>
        // Otherwise, if they prefixed with /blogs, keep as-is
        src: data.image.startsWith('/blogs/')
          ? data.image
          : `/blogs/${path.basename(data.image)}`,
        alt: (data as any).title,
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



