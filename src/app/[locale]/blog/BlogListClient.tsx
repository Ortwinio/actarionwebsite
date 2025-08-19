'use client'

import { useEffect, useState } from 'react'
import BlogList from '@/components/blog/BlogList'

interface BlogListClientProps {
  locale: string
}

interface Blog {
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
  locale: string
  isPublished: boolean
}

const BlogListClient = ({ locale }: BlogListClientProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // In a real implementation, this would fetch from the Velite-generated data
        // For now, we'll use a mock implementation
        const mockBlogs: Blog[] = [
          {
            title: "AR SOPs: The Next Frontier in Manufacturing Excellence",
            description: "Discover how Augmented Reality is revolutionizing Standard Operating Procedures, making them more accessible, safer, and more efficient than ever before.",
            publishedAt: "2025-01-15T09:00:00Z",
            author: "ActARion Team",
            tags: ["ar", "sop", "manufacturing", "innovation", "safety"],
            slug: "ar-sops-next-frontier",
            readingTime: { text: "8 min read" },
            locale: "en",
            isPublished: true
          },
          {
            title: "The AR Training Revolution: Transforming Workforce Development",
            description: "Explore how Augmented Reality is revolutionizing employee training, reducing costs, improving retention, and creating more engaging learning experiences.",
            publishedAt: "2025-01-20T10:00:00Z",
            author: "ActARion Team",
            tags: ["ar", "training", "workforce", "learning", "efficiency"],
            slug: "ar-training-revolution",
            readingTime: { text: "10 min read" },
            locale: "en",
            isPublished: true
          },
          {
            title: "Safety and Compliance in the Age of AR: A New Paradigm",
            description: "Discover how Augmented Reality is enhancing workplace safety, ensuring regulatory compliance, and creating a culture of safety excellence in manufacturing.",
            publishedAt: "2025-01-25T11:00:00Z",
            author: "ActARion Team",
            tags: ["ar", "safety", "compliance", "manufacturing", "regulations"],
            slug: "safety-compliance-ar",
            readingTime: { text: "12 min read" },
            locale: "en",
            isPublished: true
          }
        ]

        // Filter by locale and published status
        const filteredBlogs = mockBlogs.filter(blog => 
          blog.locale === locale && blog.isPublished
        )

        setBlogs(filteredBlogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
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
