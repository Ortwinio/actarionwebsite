'use client'

import Link from 'next/link'
import BlogMeta from '@/components/blog/BlogMeta'
import RenderMdx from '@/components/blog/RenderMdx'
import Image from 'next/image'

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
  locale: string
}

const BlogPostClient = ({ blog, locale }: BlogPostClientProps) => {
  return (
    <article className="bg-gray-800 rounded-lg p-8 shadow-xl">
      <header className="mb-8">
        {blog.image && (
          <div className="relative w-full h-56 md:h-72 lg:h-80 mb-6 overflow-hidden rounded-lg">
            <Image
              src={blog.image.src}
              alt={blog.image.alt || blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
            />
          </div>
        )}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {blog.title}
        </h1>
        
        <p className="text-xl text-gray-300 mb-6">
          {blog.description}
        </p>
        
        <BlogMeta
          author={blog.author}
          publishedAt={blog.publishedAt}
          updatedAt={blog.updatedAt}
          readingTime={blog.readingTime}
          tags={blog.tags}
          locale={locale}
        />
      </header>
      
      <div className="prose prose-invert prose-lg max-w-none">
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
        <RenderMdx code={blog.body} />
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-gray-400">
            <p>Written by {blog.author}</p>
            <p>Published on {new Date(blog.publishedAt).toLocaleDateString()}</p>
          </div>
          
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
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
