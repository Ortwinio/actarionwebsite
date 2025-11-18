import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import PrivacyPageClient from "./PrivacyPageClient";
import { buildPageMetadata, buildWebPageSchema } from "../../../config/seo";
import { isSupportedLocale } from "../../../config/site";

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Read ActARion's privacy policy to understand how we collect, process, and protect personal data across our AR SOP platform.";

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const privacyCopy = dictionary.pages?.privacy;
  const description =
    privacyCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale,
    title: privacyCopy?.title || "ActARion Privacy Policy",
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
