import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/getDictionary'
import BlogPostClient from './BlogPostClient'
import { blogs as allBlogs } from '@/.velite/generated'

interface BlogPostPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl'; slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)
  const blog = (allBlogs as any[]).find(b => b.slug === slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const siteTitle = dictionary.metadata?.title || 'ActARion'

  return {
    title: `${blog.title} - ${siteTitle}`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      tags: blog.tags,
      locale: locale,
      alternateLocale: ['en', 'de', 'nl'].filter(l => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)
  const blog = (allBlogs as any[]).find(b => b.slug === slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <BlogPostClient blog={blog as any} locale={locale} />
        </div>
      </div>
    </div>
  )
}



