import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "../../../config/site";
import AboutPageClient from "./AboutPageClient";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Learn how ActARion combines action and augmented reality to modernize SOP execution and support frontline teams across Europe.";

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
  const headerSubtitle = aboutCopy?.subtitle || description;

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
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
      <PageHeader
        title={pageTitle}
        subtitle={headerSubtitle}
        backgroundImage="/headers/header-2.jpg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AboutPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}