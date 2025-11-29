import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import BlogList from "@/components/blog/BlogList";
import { buildPageMetadata, buildWebPageSchema, buildItemListSchema, buildBreadcrumbListSchema, siteUrl } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { getBlogsForLocale } from "@/lib/blogs";

interface BlogListPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl' }>
}

export async function generateMetadata({ params }: BlogListPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }
  const dictionary = await getDictionary(locale)

  const blogDescription = dictionary.pages?.blog?.description || 'Insights and updates from ActARion'
  const siteTitle = dictionary.metadata?.title || 'ActARion'

  return buildPageMetadata({
    locale,
    title: `Blog - ${siteTitle}`,
    description: blogDescription,
    segment: 'blog',
  })
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const { blogs, usedFallback } = getBlogsForLocale(locale);

  const blogTitle = dictionary.pages?.blog?.title || "Blog";
  const blogDescription =
    dictionary.pages?.blog?.description || "Insights and updates from ActARion";
  const typedLocale = locale as Locale;

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: blogTitle, url: buildLocalizedPath(typedLocale, 'blog') },
  ];

  // Build structured data
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: `Blog - ${dictionary.metadata?.title || 'ActARion'}`,
      description: blogDescription,
      segment: 'blog',
    }),
    buildItemListSchema(
      blogs.map((blog) => ({
        name: blog.title,
        description: blog.description,
        url: `${siteUrl}${buildLocalizedPath(typedLocale, `blog/${blog.slug}`)}`,
      }))
    ),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader title={blogTitle} subtitle={blogDescription} />
      <main className="section section-light">
        <div className="section-inner space-y-6">
          {usedFallback && (
            <div className="summary summary--floating text-sm">
              We're still translating this blog section. Showing English articles for now.
            </div>
          )}
          <BlogList blogs={blogs} locale={locale} />
        </div>
      </main>
    </>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Array<"en" | "de" | "nl"> = ["en", "de", "nl"];
  return locales.map((l) => ({ locale: l }));
}



