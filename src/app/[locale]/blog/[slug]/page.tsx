import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import BlogPostClient from "./BlogPostClient";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { buildPageMetadata, buildWebPageSchema, buildBlogPostingSchema, buildBreadcrumbListSchema, getAbsoluteUrl, siteUrl } from "@/config/seo";
import { getAllPublishedSlugs, getBlogBySlug } from "@/lib/blogs";

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

  const metadata = buildPageMetadata({
    locale: typedLocale,
    title: blog.title,
    description: blog.description,
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
  
  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: 'Blog', url: buildLocalizedPath(typedLocale, 'blog') },
    { name: blog.title, url: canonicalPath },
  ]

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: blog.title,
      description: blog.description,
      segment: `blog/${blog.slug}`,
    }),
    buildBlogPostingSchema({
      locale: typedLocale,
      title: blog.title,
      description: blog.description,
      segment: `blog/${blog.slug}`,
      author: blog.author,
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt,
      image: blog.image?.src,
      tags: blog.tags,
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ].filter((schema): schema is NonNullable<typeof schema> => schema != null && typeof schema === 'object')

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
          <BlogPostClient blog={blog as any} locale={typedLocale} isFallback={isFallback} />
        </div>
      </main>
    </>
  );
}
