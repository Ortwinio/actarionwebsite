import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getDictionary } from "../../../lib/getDictionary";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "../../../config/site";
import AboutPageClient from "./AboutPageClient";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Smarter, safer and faster work with AI and Augmented Reality.";

const fallbackSubtitle =
  "Smarter, safer and faster work with AI and Augmented Reality.";

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const aboutCopy = dictionary.pages?.about;
  const description =
    aboutCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale,
    title: aboutCopy?.title || "About ActARion",
    description,
    segment: "about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const aboutCopy = dictionary.pages?.about;
  const description =
    aboutCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const pageTitle = aboutCopy?.title || "About ActARion";
  const headerSubtitle = aboutCopy?.subtitle || fallbackSubtitle;

  // Localized breadcrumb labels
  const breadcrumbLabels = {
    home: dictionary?.navigation?.home || 'Home',
  };

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: breadcrumbLabels.home, url: buildLocalizedPath(typedLocale) },
    { name: pageTitle, url: buildLocalizedPath(typedLocale, 'about') },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: pageTitle,
      description,
      segment: "about",
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          <PageHeader
            title={pageTitle}
            subtitle={headerSubtitle}
          />
          <AboutPageClient locale={locale} dictionary={dictionary} />
        </div>
      </main>
    </>
  );
}