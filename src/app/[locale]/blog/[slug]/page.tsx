import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import BlogPostClient from "./BlogPostClient";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { buildPageMetadata, buildWebPageSchema, getAbsoluteUrl, siteUrl } from "@/config/seo";
import { getAllPublishedSlugs, getBlogBySlug } from "@/lib/blogs";

/**
 * Force static rendering to ensure metadata is included in initial HTML shell.
 * This prevents title/canonical/robots from being streamed outside <head>.
 */
export const dynamic = 'force-static';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const resolved = getBlogBySlug(typedLocale, slug)
  if (!resolved) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const { blog } = resolved

  const imageMeta = blog.image
    ? {
        url: blog.image.src,
        alt: blog.image.alt || blog.title,
      }
    : undefined

  // Use seoTitle if available (shorter for search results), otherwise fall back to full title
  const pageTitle = blog.seoTitle || blog.title;
  // Use seoDescription if available (max 155 chars), otherwise fall back to full description
  const pageDescription = blog.seoDescription || blog.description;
  
  const metadata = buildPageMetadata({
    locale: typedLocale,
    title: pageTitle,
    description: pageDescription,
    segment: `blog/${blog.slug}`,
    image: imageMeta,
    type: 'article',
  })

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      tags: blog.tags,
    },
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  const uniqueSlugs = getAllPublishedSlugs()
  return uniqueSlugs.flatMap(slug => locales.map(locale => ({ locale, slug })))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const resolved = getBlogBySlug(typedLocale, slug)
  if (!resolved) {
    notFound()
  }

  const { blog, isFallback } = resolved
  const canonicalPath = buildLocalizedPath(typedLocale, `blog/${blog.slug}`)
  const absoluteUrl = `${siteUrl}${canonicalPath}`
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: blog.title,
      description: blog.description,
      segment: `blog/${blog.slug}`,
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blog.title,
      description: blog.description,
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt,
      inLanguage: typedLocale,
      author: {
        '@type': 'Person',
        name: blog.author,
      },
      mainEntityOfPage: absoluteUrl,
      image: blog.image ? getAbsoluteUrl(blog.image.src) : `${siteUrl}/ActARionlogo.png`,
    },
  ]

  const imageOverride = blog.image?.src?.startsWith("/")
    ? blog.image.src
    : undefined;

  return (
    <>
      <PageHeader
        title={blog.title}
        subtitle={blog.description}
        imageOverride={imageOverride}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner max-w-4xl">
          <BlogPostClient blog={blog as any} locale={typedLocale} isFallback={isFallback} />
        </div>
      </main>
    </>
  );
}
