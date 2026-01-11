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

const whitepaper = s.object({
  title: s.string(),
  seoTitle: s.string().optional(),
  description: s.string(),
  seoDescription: s.string().optional(),
  image: s.string().optional(),
  publishedAt: s.isodate(),
  updatedAt: s.isodate().optional(),
  author: s.string().default('ActARion'),
  slug: s.string(),
  locale: s.enum(['en', 'de', 'nl']).default('en'),
  isPublished: s.boolean().default(true),
  body: s.mdx(),
  toc: s.toc(),
}).transform((data) => {
  return {
    ...data,
    url: `/whitepapers/${data.slug}`,
    readingTime: readingTime(data.body),
    updatedAt: data.updatedAt || data.publishedAt,
  }
})

const blog = s.object({
  title: s.string(),
  // Optional shorter title for SEO (max 60 chars). Falls back to title if not provided.
  seoTitle: s.string().optional(),
  description: s.string(),
  // Optional shorter description for SEO (max 155 chars). Falls back to description if not provided.
  seoDescription: s.string().optional(),
  // Accept strings so images can live in /public/blogs or nested folders
  image: s.string().optional(),
  publishedAt: s.isodate(),
  updatedAt: s.isodate(),
  author: s.string(),
  tags: s.array(s.string()).default([]),
  isPublished: s.boolean().default(true),
  slug: s.string(),
  locale: s.enum(['en','de','nl']).default('en'),
  // Content pillar for filtering (use-cases, roles, industries, technology-and-architecture, change-and-implementation)
  pillar: s.enum(['use-cases', 'roles', 'industries', 'technology-and-architecture', 'change-and-implementation']).optional(),
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
    whitepapers: { name: 'Whitepaper', pattern: 'whitepapers/**/*.mdx', schema: whitepaper },
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



