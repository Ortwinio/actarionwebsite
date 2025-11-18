import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import CareerPageClient from "./CareerPageClient";
import { buildPageMetadata, buildWebPageSchema } from "../../../config/seo";
import { isSupportedLocale } from "../../../config/site";

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

  return buildPageMetadata({
    locale,
    title: careerCopy?.title || "Careers at ActARion",
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
  const structuredData = buildWebPageSchema({
    locale,
    title: careerCopy?.title || "Careers at ActARion",
    description,
    segment: "career",
  });
  const title = careerCopy?.title || "Careers at ActARion";
  const subtitle =
    careerCopy?.subtitle ||
    "Smarter, safer and faster work with AI and Augmented Reality.";

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage="/headers/header-3.jpg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareerPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}