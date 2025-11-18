import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { blogs as allBlogs } from "@/./.velite/generated";
import { PageHeader } from "@/components/PageHeader";
import { buildLocalizedPath, defaultLocale, isSupportedLocale, Locale, locales } from "@/config/site";
import { buildPageMetadata, buildWebPageSchema, getAbsoluteUrl, siteUrl } from "@/config/seo";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

const posts = allBlogs as any[]

const resolveBlog = (locale: Locale, slug: string) => {
  const localized = posts.find(b => b.slug === slug && b.locale === locale)
  if (localized) {
    return { blog: localized, isFallback: false }
  }

  const fallback = posts.find(b => b.slug === slug && b.locale === defaultLocale)
  if (fallback) {
    console.warn(`[i18n] Missing ${locale} translation for blog slug "${slug}", falling back to ${defaultLocale}.`)
    return { blog: fallback, isFallback: true }
  }

  return null
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const resolved = resolveBlog(typedLocale, slug)
  if (!resolved) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const { blog } = resolved

  const metadata = buildPageMetadata({
    locale: typedLocale,
    title: blog.title,
    description: blog.description,
    segment: `blog/${blog.slug}`,
    image: blog.image
      ? {
          url: blog.image.src,
          width: blog.image.width,
          height: blog.image.height,
          alt: blog.image.alt || blog.title,
        }
      : undefined,
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
  const uniqueSlugs = Array.from(new Set(posts.map(post => post.slug)))
  return uniqueSlugs.flatMap(slug => locales.map(locale => ({ locale, slug })))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const resolved = resolveBlog(typedLocale, slug)
  if (!resolved) {
    notFound()
  }

  const { blog } = resolved
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

  const backgroundImage = blog.image?.src?.startsWith("/")
    ? blog.image.src
    : undefined;

  return (
    <>
      <PageHeader
        title={blog.title}
        subtitle={blog.description}
        backgroundImage={backgroundImage}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner max-w-4xl">
          <BlogPostClient blog={blog as any} locale={typedLocale} />
        </div>
      </main>
    </>
  );
}
