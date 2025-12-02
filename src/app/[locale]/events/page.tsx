import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import EventsPageClient from "./EventsPageClient";
import { buildPageMetadata, buildWebPageSchema, siteUrl } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale } from "../../../config/site";

interface EventsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Join ActARion at upcoming events, webinars and workshops to learn how AI and AR–guided work instructions help you capture corporate knowledge and shape the future of work.";

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const eventsCopy = dictionary.pages?.events;
  const description =
    eventsCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale,
    title: eventsCopy?.title || "Events",
    description,
    segment: "events",
  });
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const eventsCopy = dictionary.pages?.events;
  const description =
    eventsCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const canonicalPath = buildLocalizedPath(locale, "events");
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  const webPageSchema = buildWebPageSchema({
    locale,
    title: eventsCopy?.title || "Events",
    description,
    segment: "events",
  });

  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "EventsPage",
    name: eventsCopy?.title || "Events",
    description,
    url: absoluteUrl,
    mainEntity: {
      "@type": "Organization",
      name: "ActARion",
      url: siteUrl,
    },
  };

  const structuredData = [webPageSchema, eventsSchema];
  const title = eventsCopy?.title || "Events";
  const subtitle = eventsCopy?.subtitle || description;

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage="/headers/header-2.jpg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EventsPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}

