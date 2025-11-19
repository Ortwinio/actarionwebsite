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
  isFallback?: boolean
}

const BlogPostClient = ({ blog, locale, isFallback }: BlogPostClientProps) => {
  const blogListHref = buildLocalizedPath(locale, 'blog')
  const contactHref = buildLocalizedPath(locale, 'contact')

  return (
    <article className="card space-y-8 bg-white p-8 text-slate-900">
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

        {isFallback && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            We're showing the English version of this article while we finish translating this
            locale.
          </div>
        )}

        <BlogMeta
          author={blog.author}
          publishedAt={blog.publishedAt}
          updatedAt={blog.updatedAt}
          readingTime={blog.readingTime}
          tags={blog.tags}
          locale={locale}
        />
      </div>

      <div className="space-y-6 text-slate-700">
        {blog.image && (
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <Image
              src={blog.image.src}
              alt={blog.image.alt || blog.title}
              width={1400}
              height={788}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            {blog.image.alt && (
              <figcaption className="px-6 py-4 text-center text-sm text-slate-500">
                {blog.image.alt}
              </figcaption>
            )}
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
