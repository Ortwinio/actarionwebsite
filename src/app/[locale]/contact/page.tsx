import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import ContactPageClient from "./ContactPageClient";
import { buildPageMetadata, buildWebPageSchema, siteUrl } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, locales } from "../../../config/site";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Contact ActARion to schedule a demo, explore AR SOP pilots, or get support for your rollout. We respond within two business days.";

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const contactCopy = dictionary.pages?.contact;
  const description =
    contactCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  // Use descriptive, keyword-rich title for SEO
  const metaTitle = contactCopy?.title 
    // Don't add "| ActARion" - the root layout template will add it
    ? `${contactCopy.title} – Schedule an AR Demo`
    : "Contact – Schedule a Demo for AR Work Instructions";

  return buildPageMetadata({
    locale,
    title: metaTitle,
    description,
    segment: "contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const contactCopy = dictionary.pages?.contact;
  const description =
    contactCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const canonicalPath = buildLocalizedPath(locale, "contact");
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  const webPageSchema = buildWebPageSchema({
    locale,
    title: contactCopy?.title || "Contact ActARion",
    description,
    segment: "contact",
  });

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: contactCopy?.title || "Contact ActARion",
    description,
    url: absoluteUrl,
    mainEntity: {
      "@type": "Organization",
      name: "ActARion",
      url: siteUrl,
      description:
        "AR platform and implementation partner for industrial frontline operations.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@actarion.com",
        availableLanguage: ["English", "German", "Dutch"],
        areaServed: ["Benelux", "DACH", "Nordics"],
      },
    },
  };

  const structuredData = [webPageSchema, contactSchema];
  const title = contactCopy?.title || "Contact ActARion";
  const subtitle = contactCopy?.subtitle || description;

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
      <ContactPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
