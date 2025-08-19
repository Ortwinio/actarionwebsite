import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/getDictionary'
import BlogPostClient from './BlogPostClient'

interface BlogPostPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl'; slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)

  // In a real implementation, this would fetch the blog post data
  // For now, we'll use mock data
  const mockBlogs = [
    {
      slug: 'ar-sops-next-frontier',
      title: 'AR SOPs: The Next Frontier in Manufacturing Excellence',
      description: 'Discover how Augmented Reality is revolutionizing Standard Operating Procedures, making them more accessible, safer, and more efficient than ever before.',
      publishedAt: '2025-01-15T09:00:00Z',
      author: 'ActARion Team',
      tags: ['ar', 'sop', 'manufacturing', 'innovation', 'safety']
    },
    {
      slug: 'ar-training-revolution',
      title: 'The AR Training Revolution: Transforming Workforce Development',
      description: 'Explore how Augmented Reality is revolutionizing employee training, reducing costs, improving retention, and creating more engaging learning experiences.',
      publishedAt: '2025-01-20T10:00:00Z',
      author: 'ActARion Team',
      tags: ['ar', 'training', 'workforce', 'learning', 'efficiency']
    },
    {
      slug: 'safety-compliance-ar',
      title: 'Safety and Compliance in the Age of AR: A New Paradigm',
      description: 'Discover how Augmented Reality is enhancing workplace safety, ensuring regulatory compliance, and creating a culture of safety excellence in manufacturing.',
      publishedAt: '2025-01-25T11:00:00Z',
      author: 'ActARion Team',
      tags: ['ar', 'safety', 'compliance', 'manufacturing', 'regulations']
    }
  ]

  const blog = mockBlogs.find(b => b.slug === slug)

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

  // In a real implementation, this would fetch the blog post data
  // For now, we'll use mock data
  const mockBlogs = [
    {
      slug: 'ar-sops-next-frontier',
      title: 'AR SOPs: The Next Frontier in Manufacturing Excellence',
      description: 'Discover how Augmented Reality is revolutionizing Standard Operating Procedures, making them more accessible, safer, and more efficient than ever before.',
      publishedAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-01-15T09:00:00Z',
      author: 'ActARion Team',
      tags: ['ar', 'sop', 'manufacturing', 'innovation', 'safety'],
      readingTime: { text: '8 min read' },
      content: '# AR SOPs: The Next Frontier in Manufacturing Excellence\n\nIn today\'s rapidly evolving manufacturing landscape...'
    },
    {
      slug: 'ar-training-revolution',
      title: 'The AR Training Revolution: Transforming Workforce Development',
      description: 'Explore how Augmented Reality is revolutionizing employee training, reducing costs, improving retention, and creating more engaging learning experiences.',
      publishedAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
      author: 'ActARion Team',
      tags: ['ar', 'training', 'workforce', 'learning', 'efficiency'],
      readingTime: { text: '10 min read' },
      content: '# The AR Training Revolution: Transforming Workforce Development\n\nThe manufacturing industry faces unprecedented challenges...'
    },
    {
      slug: 'safety-compliance-ar',
      title: 'Safety and Compliance in the Age of AR: A New Paradigm',
      description: 'Discover how Augmented Reality is enhancing workplace safety, ensuring regulatory compliance, and creating a culture of safety excellence in manufacturing.',
      publishedAt: '2025-01-25T11:00:00Z',
      updatedAt: '2025-01-25T11:00:00Z',
      author: 'ActARion Team',
      tags: ['ar', 'safety', 'compliance', 'manufacturing', 'regulations'],
      readingTime: { text: '12 min read' },
      content: '# Safety and Compliance in the Age of AR: A New Paradigm\n\nWorkplace safety and regulatory compliance are among the most critical challenges...'
    }
  ]

  const blog = mockBlogs.find(b => b.slug === slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <BlogPostClient blog={blog} locale={locale} />
        </div>
      </div>
    </div>
  )
}



