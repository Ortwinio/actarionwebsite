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

  // Use descriptive, keyword-rich title for SEO (>200px minimum)
  const metaTitle = `Blog – AR & AI Work Instructions Insights | ${siteTitle}`;
  
  return buildPageMetadata({
    locale,
    title: metaTitle,
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

  // Build structured data with descriptive title
  const schemaTitle = `Blog – AR & AI Work Instructions Insights | ${dictionary.metadata?.title || 'ActARion'}`;
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: schemaTitle,
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
              {dictionary.pages?.blog?.fallbackMessage || "We're still translating this blog section. Showing English articles for now."}
            </div>
          )}
          {/* H2 for proper heading hierarchy (H1 from PageHeader → H2 → H3 in cards) */}
          <h2 className="sr-only">
            {dictionary.pages?.blog?.allArticles || (locale === 'de' ? 'Alle Artikel' : locale === 'nl' ? 'Alle artikelen' : 'All Articles')}
          </h2>
          <BlogList 
            blogs={blogs} 
            locale={locale} 
            dictionary={{
              noPostsTitle: dictionary.pages?.blog?.noPostsTitle,
              noPostsText: dictionary.pages?.blog?.noPostsText,
            }}
          />
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



