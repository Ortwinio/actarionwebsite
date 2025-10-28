import { defineConfig, s } from 'velite'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const blog = s.object({
  title: s.string(),
  description: s.string(),
  // Accept strings so images can live in /public/blogs instead of content folder
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
        // Map filename or path to public URL under /blogs
        src: `/blogs/${(data.image as string).split('/').pop()}`,
        alt: (data as any).title,
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



