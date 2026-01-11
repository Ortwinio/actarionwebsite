'use client'

import Link from 'next/link'
import RenderMdx from '@/components/blog/RenderMdx'
import { buildLocalizedPath, Locale } from '@/config/site'

interface WhitepaperClientProps {
  whitepaper: {
    title: string
    description: string
    publishedAt: string
    updatedAt: string
    author: string
    readingTime: {
      text: string
    }
    body: string
  }
  locale: Locale
  isFallback?: boolean
}

const WhitepaperClient = ({ whitepaper, locale, isFallback }: WhitepaperClientProps) => {
  const whitepapersListHref = buildLocalizedPath(locale, 'whitepapers')
  const contactHref = buildLocalizedPath(locale, 'contact')

  return (
    <article className="card space-y-8 bg-white p-8 text-slate-900">
      <div className="flex flex-col gap-6">
        <Link
          href={whitepapersListHref}
          className="btn btn-link"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Whitepapers
        </Link>

        {isFallback && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            We're showing the English version of this whitepaper while we finish translating this
            locale.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {whitepaper.readingTime.text}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last updated: {new Date(whitepaper.updatedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            By {whitepaper.author}
          </span>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <RenderMdx code={whitepaper.body} locale={locale} />
      </div>
      
      <footer className="pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-slate-500">
            <p>Published by {whitepaper.author}</p>
            <p>Last updated: {new Date(whitepaper.updatedAt).toLocaleDateString()}</p>
          </div>
          
          <div className="flex gap-3">
            <Link
              href="https://roicalculator.actarion.com/"
              className="btn btn-secondary btn-pill"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try ROI Calculator
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link
              href={contactHref}
              className="btn btn-primary btn-pill"
            >
              Schedule a Call
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </article>
  )
}

export default WhitepaperClient
