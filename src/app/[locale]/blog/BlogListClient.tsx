'use client'

import { useEffect, useState } from 'react'
import BlogList from '@/components/blog/BlogList'
import { blogs as allBlogs } from '@/./.velite/generated'

interface BlogListClientProps {
  locale: string
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

const BlogListClient = ({ locale }: BlogListClientProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const filteredBlogs = (allBlogs as unknown as Blog[])
        .filter(blog => blog.locale === locale && blog.isPublished)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      setBlogs(filteredBlogs)
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

  return <BlogList blogs={blogs} locale={locale} />
}

export default BlogListClient
