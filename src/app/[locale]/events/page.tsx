import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import EventsPageClient from "./EventsPageClient";
import { buildPageMetadata, buildWebPageSchema, siteUrl } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, locales } from "../../../config/site";

interface EventsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Join ActARion at upcoming events, webinars and workshops to learn how AI and AR–guided work instructions help you capture corporate knowledge and shape the future of work.";

// Short SEO description (max 155 chars)
const seoDescription =
  "Join ActARion at events, webinars and workshops on AR and AI work instructions. Learn how to transform industrial operations.";

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const eventsCopy = dictionary.pages?.events;
  const description =
    eventsCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  // Use descriptive, keyword-rich title for SEO
  const metaTitle = eventsCopy?.title 
    // Don't add "| ActARion" - the root layout template will add it
    ? `${eventsCopy.title} – AR & AI Work Instructions Events`
    : "Events – AR & AI Work Instructions Webinars & Workshops";

  return buildPageMetadata({
    locale,
    title: metaTitle,
    description: seoDescription,
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

  const schemaTitle = eventsCopy?.title 
    // Don't add "| ActARion" - the root layout template will add it
    ? `${eventsCopy.title} – AR & AI Work Instructions Events`
    : "Events – AR & AI Work Instructions Webinars & Workshops";

  const webPageSchema = buildWebPageSchema({
    locale,
    title: schemaTitle,
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
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EventsPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}



