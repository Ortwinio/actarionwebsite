'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'

interface BlogCardProps {
  blog: {
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
  }
  locale: string
}

const BlogCard: FC<BlogCardProps> = ({ blog, locale }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : 'nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {blog.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image.src}
            alt={blog.image.alt || blog.title}
            fill
            unoptimized
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-3">
          {blog.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>{blog.author}</span>
          <span>{formatDate(blog.publishedAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{blog.readingTime.text}</span>
          <Link
            href={`/${locale}/blog/${blog.slug}`}
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
