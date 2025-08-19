'use client'

import { FC } from 'react'
import BlogCard from './BlogCard'

interface BlogListProps {
  blogs: Array<{
    title: string
    description: string
    image?: {
      src: string
      alt: string
    }
    publishedAt: string
    author: string
    tags: string[]
    slug: string
    readingTime: {
      text: string
    }
  }>
  locale: string
}

const BlogList: FC<BlogListProps> = ({ blogs, locale }) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No blog posts found</h3>
        <p className="text-gray-400">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} locale={locale} />
      ))}
    </div>
  )
}

export default BlogList
