'use client'

import { Locale } from '@/config/site'

interface BlogMetaProps {
  author: string
  publishedAt: string
  updatedAt: string
  readingTime: {
    text: string
  }
  tags: string[]
  locale: Locale
}

const BlogMeta = ({ author, publishedAt, updatedAt, readingTime, tags, locale }: BlogMetaProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : 'nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isUpdated = new Date(updatedAt) > new Date(publishedAt)

  return (
    <div className="mb-6 border-b border-slate-200 pb-6 text-slate-600">
      <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{readingTime.text}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            Published {formatDate(publishedAt)}
            {isUpdated && ` • Updated ${formatDate(updatedAt)}`}
          </span>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-actarion-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-actarion-blue"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogMeta
