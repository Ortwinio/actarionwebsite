'use client'

import Link from 'next/link'
import BlogMeta from '@/components/blog/BlogMeta'
import RenderMdx from '@/components/blog/RenderMdx'
import Image from 'next/image'
import { buildLocalizedPath, Locale } from '@/config/site'

interface BlogPostClientProps {
  blog: {
    title: string
    description: string
    publishedAt: string
    updatedAt: string
    author: string
    tags: string[]
    readingTime: {
      text: string
    }
    body: string
    image?: {
      src: string
      alt?: string
    }
  }
  locale: Locale
}

const BlogPostClient = ({ blog, locale }: BlogPostClientProps) => {
  const blogListHref = buildLocalizedPath(locale, 'blog')
  const contactHref = buildLocalizedPath(locale, 'contact')

  return (
    <article className="card space-y-6 bg-white text-slate-900">
      <div className="flex flex-col gap-6">
        <Link
          href={blogListHref}
          className="btn btn-link"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <BlogMeta
          author={blog.author}
          publishedAt={blog.publishedAt}
          updatedAt={blog.updatedAt}
          readingTime={blog.readingTime}
          tags={blog.tags}
          locale={locale}
        />
      </div>

      <div className="prose prose-lg max-w-none text-slate-700">
        {blog.image && (
          <figure className="mb-8">
            <Image
              src={blog.image.src}
              alt={blog.image.alt || blog.title}
              width={1200}
              height={630}
              unoptimized
              className="w-full h-auto rounded-lg shadow"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </figure>
        )}
        <RenderMdx code={blog.body} locale={locale} />
      </div>
      
      <footer className="pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-slate-500">
            <p>Written by {blog.author}</p>
            <p>Published on {new Date(blog.publishedAt).toLocaleDateString()}</p>
          </div>
          
          <Link
            href={contactHref}
            className="btn btn-primary btn-pill"
          >
            Get in Touch
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </footer>
    </article>
  )
}

export default BlogPostClient
