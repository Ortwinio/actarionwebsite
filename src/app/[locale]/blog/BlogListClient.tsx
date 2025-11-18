'use client'

import { useEffect, useState } from 'react'
import BlogList from '@/components/blog/BlogList'
import { blogs as allBlogs } from '@/./.velite/generated'
import { defaultLocale, Locale } from '@/config/site'

interface BlogListClientProps {
  locale: Locale
}

interface Blog {
  title: string
  description: string
  image?: {
    src: string
    alt?: string
  }
  publishedAt: string
  author: string
  tags: string[]
  slug: string
  readingTime: {
    text: string
  }
  locale: string
  isPublished: boolean
}

const sortByPublishedDate = (items: Blog[]) =>
  [...items].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

const BlogListClient = ({ locale }: BlogListClientProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    try {
      const blogEntries = allBlogs as unknown as Blog[]
      const localizedBlogs = sortByPublishedDate(
        blogEntries.filter(blog => blog.locale === locale && blog.isPublished)
      )

      if (localizedBlogs.length > 0) {
        setBlogs(localizedBlogs)
        setUsedFallback(false)
      } else {
        const fallbackBlogs = sortByPublishedDate(
          blogEntries.filter(blog => blog.locale === defaultLocale && blog.isPublished)
        )

        if (fallbackBlogs.length > 0) {
          console.warn(
            `[i18n] No ${locale} blog posts found; falling back to ${defaultLocale.toUpperCase()} content.`
          )
          setBlogs(fallbackBlogs)
          setUsedFallback(true)
        } else {
          setBlogs([])
          setUsedFallback(false)
        }
      }
    } catch (error) {
      console.error('Error loading blogs:', error)
    } finally {
      setLoading(false)
    }
  }, [locale])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {usedFallback && (
        <div className="summary summary--floating text-sm">
          {"We're still translating this blog section. Showing English articles for now."}
        </div>
      )}
      <BlogList blogs={blogs} locale={locale} />
    </div>
  )
}

export default BlogListClient
