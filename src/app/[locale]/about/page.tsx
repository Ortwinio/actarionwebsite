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

const seoTitles = {
  en: "About ActARion – AR Work Instruction Experts",
  de: "Über ActARion – Experten für AR-Arbeitsanweisungen",
  nl: "Over ActARion – Experts in AR-werkinstructies",
};

// Short SEO descriptions (max 155 chars) - page content uses longer dictionary descriptions
const seoDescriptions = {
  en: "ActARion helps industrial teams work smarter with AR and AI. We turn expert knowledge into visual work instructions for safer, faster operations.",
  de: "ActARion hilft Industrieteams mit AR und KI smarter zu arbeiten. Wir verwandeln Expertenwissen in visuelle Arbeitsanweisungen.",
  nl: "ActARion helpt industriële teams slimmer werken met AR en AI. Wij zetten expertkennis om in visuele werkinstructies.",
};

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

  const seoTitle = seoTitles[locale as keyof typeof seoTitles] || seoTitles.en;
  const seoDescription = seoDescriptions[locale as keyof typeof seoDescriptions] || seoDescriptions.en;
  
  return buildPageMetadata({
    locale,
    title: seoTitle,
    description: seoDescription,
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