import { blogs as generatedBlogs } from '@/./.velite/generated'
import { defaultLocale, Locale } from '@/config/site'

export type BlogEntry = (typeof generatedBlogs)[number]

const sortByPublishedDate = (entries: BlogEntry[]) =>
  [...entries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

export function getBlogsForLocale(locale: Locale) {
  const blogEntries = generatedBlogs as BlogEntry[]
  const localized = sortByPublishedDate(
    blogEntries.filter((blog) => blog.locale === locale && blog.isPublished)
  )

  if (localized.length > 0) {
    return { blogs: localized, usedFallback: false }
  }

  const fallback = sortByPublishedDate(
    blogEntries.filter((blog) => blog.locale === defaultLocale && blog.isPublished)
  )

  return {
    blogs: fallback,
    usedFallback: fallback.length > 0 && locale !== defaultLocale,
  }
}

export function getBlogBySlug(locale: Locale, slug: string) {
  const blogEntries = generatedBlogs as BlogEntry[]
  const localized = blogEntries.find(
    (blog) => blog.slug === slug && blog.locale === locale && blog.isPublished
  )

  if (localized) {
    return { blog: localized, isFallback: false }
  }

  const fallback = blogEntries.find(
    (blog) => blog.slug === slug && blog.locale === defaultLocale && blog.isPublished
  )

  if (!fallback) {
    return null
  }

  if (locale !== defaultLocale) {
    console.warn(
      `[i18n] Missing ${locale} translation for blog slug "${slug}", falling back to ${defaultLocale}.`
    )
  }

  return { blog: fallback, isFallback: true }
}

export function getAllPublishedSlugs() {
  const blogEntries = generatedBlogs as BlogEntry[]
  return Array.from(new Set(blogEntries.filter((blog) => blog.isPublished).map((blog) => blog.slug)))
}


