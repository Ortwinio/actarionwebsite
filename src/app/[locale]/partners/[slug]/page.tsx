import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../../lib/getDictionary";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema, siteUrl } from "../../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, locales, Locale } from "../../../../config/site";
import { partners, getPartnerBySlug } from "../../../../config/partners";
import { getPartnerContentBySlug } from "../../../../config/partnerContent";
import PartnerDetailClient from "./PartnerDetailClient";

interface PartnerPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    partners.forEach((partner) => {
      params.push({ locale, slug: partner.slug });
    });
  });
  return params;
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const partner = getPartnerBySlug(slug);
  if (!partner) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    // Don't add "| ActARion" - the root layout template will add it
    title: `${partner.name} Partner`,
    description: partner.metaDescription,
    segment: `partners/${slug}`,
  });
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const partner = getPartnerBySlug(slug);
  const partnerContent = getPartnerContentBySlug(slug);

  if (!partner || !partnerContent) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);
  const canonicalPath = buildLocalizedPath(locale as Locale, `partners/${slug}`);
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  const webPageSchema = buildWebPageSchema({
    locale: locale as Locale,
    title: `${partner.name} Partner`,
    description: partner.metaDescription,
    segment: `partners/${slug}`,
  });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: partner.name,
    url: partner.website,
    description: partner.metaDescription,
    logo: `${siteUrl}${partner.logoSrc}`,
  };

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(locale as Locale) },
    { name: 'Partners', url: buildLocalizedPath(locale as Locale, 'partner-contact') },
    { name: partner.name, url: canonicalPath },
  ];

  const structuredData = [webPageSchema, organizationSchema, buildBreadcrumbListSchema(breadcrumbs)];

  return (
    <>
      <PageHeader title={partner.name} subtitle={partner.tagline} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PartnerDetailClient
        locale={locale as Locale}
        partner={partner}
        content={partnerContent}
        dictionary={dictionary}
      />
    </>
  );
}

