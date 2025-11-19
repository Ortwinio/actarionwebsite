import Image from 'next/image'
import Link from 'next/link'
import { buildLocalizedPath, Locale } from '@/config/site'
import type { BlogEntry } from '@/lib/blogs'

interface BlogCardProps {
  blog: BlogEntry
  locale: Locale
}

const formatDate = (dateString: string, locale: Locale) => {
  const intlLocale =
    locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : 'nl-NL'
  return new Date(dateString).toLocaleDateString(intlLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BlogCard = ({ blog, locale }: BlogCardProps) => {
  return (
    <article className="card flex h-full flex-col overflow-hidden border border-slate-100 bg-white shadow-soft transition hover:shadow-card">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {blog.image ? (
          <Image
            src={blog.image.src}
            alt={blog.image.alt || blog.title}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-900 text-white">
            <span className="text-sm uppercase tracking-wide">ActARion Blog</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {formatDate(blog.publishedAt, locale)}
        </time>

        <h3 className="mt-3 text-2xl font-semibold text-slate-900 line-clamp-2">
          {blog.title}
        </h3>

        <p className="mt-3 text-base text-slate-600 line-clamp-3">
          {blog.description}
        </p>

        {blog.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-actarion-blue/10 px-3 py-1 text-xs font-semibold text-actarion-blue"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-6 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <span>{blog.author}</span>
            <span>{blog.readingTime.text}</span>
          </div>

          <Link
            href={buildLocalizedPath(locale, `blog/${blog.slug}`)}
            className="inline-flex items-center text-actarion-blue font-semibold"
            aria-label={`Read more about ${blog.title}`}
          >
            Read more
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
