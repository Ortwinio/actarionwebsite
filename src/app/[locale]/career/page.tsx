import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import CareerPageClient from "./CareerPageClient";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "../../../config/site";

interface CareerPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Join ActARion and help build augmented reality solutions that transform frontline operations across Europe.";

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
    ? `${careerCopy.title} – Join Our AR & AI Team | ActARion`
    : "Careers at ActARion – Join Our AR & AI Work Instructions Team";

  return buildPageMetadata({
    locale,
    title: metaTitle,
    description,
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
        imageOverride="/images/roles/career-product-manager-hero2.png"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareerPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}