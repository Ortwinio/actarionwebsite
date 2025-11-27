import { defineConfig, s } from 'velite'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const normalizeImagePath = (imagePath?: string) => {
  if (!imagePath) {
    return undefined
  }

  return imagePath.startsWith('/')
    ? imagePath
    : `/blogs/${imagePath.split('/').pop()}`
}

const blog = s.object({
  title: s.string(),
  description: s.string(),
  // Accept strings so images can live in /public/blogs or nested folders
  image: s.string().optional(),
  publishedAt: s.isodate(),
  updatedAt: s.isodate(),
  author: s.string(),
  tags: s.array(s.string()).default([]),
  isPublished: s.boolean().default(true),
  slug: s.string(),
  locale: s.enum(['en','nl','de']).default('en'),
  body: s.mdx(),
  toc: s.toc(),
}).transform((data) => {
  const normalizedImageSrc = normalizeImagePath(data.image)

  return {
    ...data,
    url: `/blog/${data.slug}`,
    readingTime: readingTime(data.body),
    image: normalizedImageSrc
      ? {
          src: normalizedImageSrc,
          alt: data.title,
        }
      : undefined,
  }
})

export default defineConfig({
  root: 'content',
  collections: {
    blogs: { name: 'Blog', pattern: 'blogs/**/*.mdx', schema: blog },
  },
  // Emit generated data inside src so Next bundles it reliably in prod
  output: { data: 'src/.velite/generated', clean: true },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, { theme: 'github-dark', grid: false }],
    ],
  },
})



