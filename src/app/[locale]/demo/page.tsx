import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import DemoPageClient from "./DemoPageClient";
import { buildPageMetadata, buildWebPageSchema } from "../../../config/seo";
import { isSupportedLocale } from "../../../config/site";

interface DemoPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Schedule a personalized ActARion demo to see how AR-powered SOPs improve safety, quality, and training in your operations.";

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const heroCopy = dictionary.sections?.contact;
  const description =
    heroCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  // noindex: demo page redirects to contact, avoid duplicate content
  return buildPageMetadata({
    locale,
    title: "Schedule an ActARion Demo",
    description,
    segment: "demo",
    noindex: true,
  });
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const heroCopy = dictionary.sections?.contact;
  const description =
    heroCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const structuredData = buildWebPageSchema({
    locale,
    title: "Schedule an ActARion Demo",
    description,
    segment: "demo",
  });
  const subtitle =
    dictionary.pages?.demo?.subtitle || description;

  return (
    <>
      <PageHeader
        title="Schedule an ActARion Demo"
        subtitle={subtitle}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DemoPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}

