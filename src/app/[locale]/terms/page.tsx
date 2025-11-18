import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import TermsPageClient from "./TermsPageClient";
import { buildPageMetadata, buildWebPageSchema } from "../../../config/seo";
import { isSupportedLocale } from "../../../config/site";

interface TermsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Review ActARion's general terms and conditions covering licensing, implementation, and support for AR SOP solutions.";

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const termsCopy = dictionary.pages?.terms;
  const description =
    termsCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale,
    title: termsCopy?.title || "ActARion Terms and Conditions",
    description,
    segment: "terms",
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const termsCopy = dictionary.pages?.terms;
  const description =
    termsCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const structuredData = buildWebPageSchema({
    locale,
    title: termsCopy?.title || "ActARion Terms and Conditions",
    description,
    segment: "terms",
  });
  const title = termsCopy?.title || "ActARion Terms and Conditions";
  const subtitle = termsCopy?.subtitle || description;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TermsPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
