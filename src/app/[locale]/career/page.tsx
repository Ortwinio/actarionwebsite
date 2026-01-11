import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import CareerPageClient from "./CareerPageClient";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "../../../config/site";

interface CareerPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Join ActARion and help build augmented reality solutions that transform frontline operations across Europe.";

// Short SEO description (max 155 chars)
const seoDescription =
  "Join ActARion and help build AR and AI solutions that transform industrial work. Explore career opportunities in the future of frontline operations.";

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const careerCopy = dictionary.pages?.career;
  const description =
    careerCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  // Use descriptive, keyword-rich title for SEO
  const metaTitle = careerCopy?.title 
    // Don't add "| ActARion" - the root layout template will add it
    ? `${careerCopy.title} – Join Our AR & AI Team`
    : "Careers – Join Our AR & AI Work Instructions Team";

  return buildPageMetadata({
    locale,
    title: metaTitle,
    description: seoDescription,
    segment: "career",
  });
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const careerCopy = dictionary.pages?.career;
  const description =
    careerCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const typedLocale = locale as Locale;
  const title = careerCopy?.title || "Careers at ActARion";
  const subtitle =
    careerCopy?.subtitle ||
    "Smarter, safer and faster work with AI and Augmented Reality.";

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: title, url: buildLocalizedPath(typedLocale, 'career') },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title,
      description,
      segment: "career",
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        imageOverride="/images/roles/career-product-manager-hero2.jpg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareerPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}