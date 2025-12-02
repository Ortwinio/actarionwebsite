import { blogs as generatedBlogs } from '@/./.velite/generated'
import { defaultLocale, Locale } from '@/config/site'
import { PillarId } from '@/config/pillars'

export type BlogEntry = (typeof generatedBlogs)[number]

const sortByPublishedDate = (entries: BlogEntry[]) =>
  [...entries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

export function getBlogsForLocale(locale: Locale) {
  const blogEntries = generatedBlogs as BlogEntry[]
  
  // Filter blogs by locale (case-insensitive comparison)
  const normalizedLocale = String(locale).toLowerCase().trim()
  const localized = sortByPublishedDate(
    blogEntries.filter((blog) => {
      const blogLocale = String(blog.locale).toLowerCase().trim()
      return blogLocale === normalizedLocale && blog.isPublished
    })
  )

  if (localized.length > 0) {
    return { blogs: localized, usedFallback: false }
  }

  // Fallback to default locale (English) if no localized posts found
  const normalizedDefault = String(defaultLocale).toLowerCase().trim()
  const fallback = sortByPublishedDate(
    blogEntries.filter((blog) => {
      const blogLocale = String(blog.locale).toLowerCase().trim()
      return blogLocale === normalizedDefault && blog.isPublished
    })
  )

  return {
    blogs: fallback,
    usedFallback: fallback.length > 0 && locale !== defaultLocale,
  }
}

export function getBlogBySlug(locale: Locale, slug: string) {
  const blogEntries = generatedBlogs as BlogEntry[]
  const normalizedLocale = String(locale).toLowerCase().trim()
  const localized = blogEntries.find(
    (blog) => blog.slug === slug && String(blog.locale).toLowerCase().trim() === normalizedLocale && blog.isPublished
  )

  if (localized) {
    return { blog: localized, isFallback: false }
  }

  const normalizedDefault = String(defaultLocale).toLowerCase().trim()
  const fallback = blogEntries.find(
    (blog) => blog.slug === slug && String(blog.locale).toLowerCase().trim() === normalizedDefault && blog.isPublished
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

/**
 * Get blogs filtered by content pillar for a given locale.
 * Falls back to default locale if no localized posts with that pillar are found.
 */
export function getBlogsByPillar(locale: Locale, pillarId: PillarId) {
  const { blogs, usedFallback } = getBlogsForLocale(locale)
  const filtered = blogs.filter((blog) => blog.pillar === pillarId)
  return { blogs: filtered, usedFallback }
}

/**
 * Get all unique pillars that have at least one published blog for a locale.
 */
export function getAvailablePillars(locale: Locale): PillarId[] {
  const { blogs } = getBlogsForLocale(locale)
  const pillars = blogs
    .map((blog) => blog.pillar)
    .filter((pillar): pillar is PillarId => pillar !== undefined)
  return Array.from(new Set(pillars))
}

