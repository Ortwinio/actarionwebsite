import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import PartnerContactPageClient from "./PartnerContactPageClient";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema, siteUrl } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "../../../config/site";
import { partners } from "../../../config/partners";

interface PartnerContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Discover ActARion's partner ecosystem: technology vendors, implementation partners and education partners who help organisations work smarter, safer and faster with AR and AI.";

export async function generateMetadata({ params }: PartnerContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    title: "Partners | ActARion",
    description: fallbackDescription,
    segment: "partner-contact",
  });
}

export default async function PartnerContactPage({ params }: PartnerContactPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const canonicalPath = buildLocalizedPath(typedLocale, "partner-contact");
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: 'Partners', url: canonicalPath },
  ];

  const webPageSchema = buildWebPageSchema({
    locale: typedLocale,
    title: "Partners | ActARion",
    description: fallbackDescription,
    segment: "partner-contact",
  });

  const partnerSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Partners | ActARion",
    description: fallbackDescription,
    url: absoluteUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: partners.map((partner, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Organization",
          name: partner.name,
          url: partner.website,
          description: partner.tagline,
        },
      })),
    },
  };

  const structuredData = [webPageSchema, partnerSchema, buildBreadcrumbListSchema(breadcrumbs)];

  return (
    <>
      <PageHeader
        title="Partners"
        subtitle="ActARion works with a focused ecosystem of partners to help organisations work smarter, safer and faster with AI and Augmented Reality."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PartnerContactPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
