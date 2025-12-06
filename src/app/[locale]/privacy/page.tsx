import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import PrivacyPageClient from "./PrivacyPageClient";
import { buildPageMetadata, buildWebPageSchema } from "../../../config/seo";
import { isSupportedLocale, locales, Locale } from "../../../config/site";

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Read ActARion's privacy policy to understand how we collect, process, and protect personal data across our AR SOP platform.";

/**
 * Force static generation for all locales.
 * This ensures the page is pre-rendered at build time.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Force static rendering - do not use dynamic features.
 * This helps ensure metadata is included in the initial HTML shell.
 */
export const dynamic = 'force-static';

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const privacyCopy = dictionary.pages?.privacy;
  const description =
    privacyCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale: typedLocale,
    // Use short title - the root layout template will append " | ActARion"
    title: privacyCopy?.title || "Privacy Policy",
    description,
    segment: "privacy",
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const privacyCopy = dictionary.pages?.privacy;
  const description =
    privacyCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const structuredData = buildWebPageSchema({
    locale,
    title: privacyCopy?.title || "ActARion Privacy Policy",
    description,
    segment: "privacy",
  });
  const title = privacyCopy?.title || "ActARion Privacy Policy";
  const subtitle = privacyCopy?.subtitle || description;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PrivacyPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
