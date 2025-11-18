'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import { buildLocalizedPath, Locale } from '@/config/site'

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
  locale: Locale
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
    <article className="card overflow-hidden bg-white hover:shadow-soft transition-shadow duration-300">
      {blog.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image.src}
            alt={blog.image.alt || blog.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-actarion-blue/10 text-actarion-blue rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-900 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-slate-600 line-clamp-3">
          {blog.description}
        </p>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{blog.author}</span>
          <span>{formatDate(blog.publishedAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{blog.readingTime.text}</span>
          <Link
            href={buildLocalizedPath(locale, `blog/${blog.slug}`)}
            className="btn btn-link text-actarion-blue hover:opacity-80 px-0"
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
