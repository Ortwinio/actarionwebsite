import BlogCard from './BlogCard'
import { Locale } from '@/config/site'
import type { BlogEntry } from '@/lib/blogs'

interface BlogListProps {
  blogs: BlogEntry[]
  locale: Locale
}

const BlogList = ({ blogs, locale }: BlogListProps) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No blog posts found</h3>
        <p className="text-slate-500">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:gap-10">
      {blogs.map((blog) => {
        // Create a unique key using slug, locale, and publishedAt to ensure uniqueness
        const uniqueKey = `${blog.slug}-${blog.locale}-${blog.publishedAt}`
        return <BlogCard key={uniqueKey} blog={blog} locale={locale} />
      })}
    </div>
  )
}

export default BlogList
