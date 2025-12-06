import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import { getDictionary } from "../../lib/getDictionary";
import { isSupportedLocale, locales, Locale } from "../../config/site";
import { buildWebSiteWithSearchActionSchema, localBusinessSchema, getOrganizationSchema } from "../../config/seo";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Locale layout - NO metadata export here.
 * 
 * IMPORTANT: Metadata (title, canonical, hreflang) is handled by:
 * 1. Root layout (src/app/layout.tsx) - provides title.template and defaults
 * 2. Individual page components - each page uses generateMetadata with buildPageMetadata()
 * 
 * This approach ensures:
 * - No async metadata resolution at the layout level that could cause streaming issues
 * - Each page has complete control over its own SEO metadata
 * - No conflicting/duplicate metadata from nested layouts
 * 
 * @see docs/seo-issues-overview.md for documentation
 */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const siteSchemas = JSON.stringify([
    getOrganizationSchema(),
    localBusinessSchema,
    buildWebSiteWithSearchActionSchema({
      locale: typedLocale,
      // Add search URL if site search is implemented
      // searchActionUrl: `${siteUrl}/${typedLocale}/search?q={search_term_string}`,
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteSchemas }}
      />
      <div className="relative flex min-h-screen flex-col bg-[var(--color-page-bg)] text-[var(--color-text)] pt-[var(--header-height)]">
        <Navigation locale={typedLocale} dictionary={dictionary} />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer locale={typedLocale} dictionary={dictionary} />
      </div>
    </>
  );
} 