import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import PartnerContactPageClient from "./PartnerContactPageClient";
import { buildPageMetadata, buildWebPageSchema, siteUrl } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale } from "../../../config/site";

interface PartnerContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Reach out to ActARion about technology partnerships, implementation collaborations, and European go-to-market programs.";

export async function generateMetadata({ params }: PartnerContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const partnerCopy = dictionary.pages?.partnerContact;
  const description =
    partnerCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale,
    title: partnerCopy?.title || "Partner with ActARion",
    description,
    segment: "partner-contact",
  });
}

export default async function PartnerContactPage({ params }: PartnerContactPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const partnerCopy = dictionary.pages?.partnerContact;
  const description =
    partnerCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const canonicalPath = buildLocalizedPath(locale, "partner-contact");
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  const webPageSchema = buildWebPageSchema({
    locale,
    title: partnerCopy?.title || "Partner with ActARion",
    description,
    segment: "partner-contact",
  });

  const partnerSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: partnerCopy?.title || "Partner with ActARion",
    description,
    url: absoluteUrl,
    mainEntity: {
      "@type": "Organization",
      name: "ActARion",
      url: siteUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "partnership inquiries",
        email: "partners@actarion.com",
        availableLanguage: ["English", "German", "Dutch"],
      },
    },
  };

  const structuredData = [webPageSchema, partnerSchema];
  const title = partnerCopy?.title || "Partner with ActARion";
  const subtitle =
    partnerCopy?.subtitle || partnerCopy?.description || fallbackDescription;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PartnerContactPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}