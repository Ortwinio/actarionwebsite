import { whitepapers as generatedWhitepapers } from '@/./.velite/generated'
import { defaultLocale, Locale } from '@/config/site'

export type WhitepaperEntry = (typeof generatedWhitepapers)[number]

const sortByPublishedDate = (entries: WhitepaperEntry[]) =>
  [...entries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

export function getWhitepapersForLocale(locale: Locale) {
  const whitepaperEntries = generatedWhitepapers as WhitepaperEntry[]
  
  // Filter whitepapers by locale (case-insensitive comparison)
  const normalizedLocale = String(locale).toLowerCase().trim()
  const localized = sortByPublishedDate(
    whitepaperEntries.filter((wp) => {
      const wpLocale = String(wp.locale).toLowerCase().trim()
      return wpLocale === normalizedLocale && wp.isPublished
    })
  )

  if (localized.length > 0) {
    return { whitepapers: localized, usedFallback: false }
  }

  // Fallback to default locale (English) if no localized whitepapers found
  const normalizedDefault = String(defaultLocale).toLowerCase().trim()
  const fallback = sortByPublishedDate(
    whitepaperEntries.filter((wp) => {
      const wpLocale = String(wp.locale).toLowerCase().trim()
      return wpLocale === normalizedDefault && wp.isPublished
    })
  )

  return {
    whitepapers: fallback,
    usedFallback: fallback.length > 0 && locale !== defaultLocale,
  }
}

export function getWhitepaperBySlug(locale: Locale, slug: string) {
  const whitepaperEntries = generatedWhitepapers as WhitepaperEntry[]
  const normalizedLocale = String(locale).toLowerCase().trim()
  const localized = whitepaperEntries.find(
    (wp) => wp.slug === slug && String(wp.locale).toLowerCase().trim() === normalizedLocale && wp.isPublished
  )

  if (localized) {
    return { whitepaper: localized, isFallback: false }
  }

  const normalizedDefault = String(defaultLocale).toLowerCase().trim()
  const fallback = whitepaperEntries.find(
    (wp) => wp.slug === slug && String(wp.locale).toLowerCase().trim() === normalizedDefault && wp.isPublished
  )

  if (!fallback) {
    return null
  }

  if (locale !== defaultLocale) {
    console.warn(
      `[i18n] Missing ${locale} translation for whitepaper slug "${slug}", falling back to ${defaultLocale}.`
    )
  }

  return { whitepaper: fallback, isFallback: true }
}

export function getAllPublishedWhitepaperSlugs() {
  const whitepaperEntries = generatedWhitepapers as WhitepaperEntry[]
  return Array.from(new Set(whitepaperEntries.filter((wp) => wp.isPublished).map((wp) => wp.slug)))
}
