import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import PartnersPageClient from "./PartnersPageClient";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema, siteUrl } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "../../../config/site";
import { partners } from "../../../config/partners";

interface PartnersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Discover ActARion's partner ecosystem: technology vendors, implementation partners and education partners who help organisations work smarter, safer and faster with AR and AI.";

// Short SEO description (max 155 chars)
const seoDescription =
  "Explore ActARion's partner ecosystem: DeepSight, Microsoft HoloLens, Apple Vision Pro, and implementation partners for industrial AR solutions.";

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Use descriptive, keyword-rich title for SEO
  // Don't add "| ActARion" - the root layout template will add it
  const metaTitle = "Partners – AR & AI Technology Ecosystem";

  return buildPageMetadata({
    locale,
    title: metaTitle,
    description: seoDescription,
    segment: "partners",
  });
}

export default async function PartnersPage({ params }: PartnersPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const canonicalPath = buildLocalizedPath(typedLocale, "partners");
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  // Localized breadcrumb labels
  const breadcrumbLabels = {
    home: dictionary?.navigation?.home || 'Home',
    partners: dictionary?.navigation?.partner || 'Partners',
  };

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: breadcrumbLabels.home, url: buildLocalizedPath(typedLocale) },
    { name: breadcrumbLabels.partners, url: canonicalPath },
  ];

  const schemaTitle = "Partners – AR & AI Technology Ecosystem";

  const webPageSchema = buildWebPageSchema({
    locale: typedLocale,
    title: schemaTitle,
    description: fallbackDescription,
    segment: "partners",
  });

  const partnerSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: schemaTitle,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner">
          {/* Visual Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-8">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.url} className="flex items-center gap-2">
                  {index > 0 && <span className="text-slate-400">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-slate-900 font-medium">{crumb.name}</span>
                  ) : (
                    <Link 
                      href={crumb.url} 
                      className="hover:text-actarion-blue transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <PageHeader
            title={dictionary.pages?.partnerContact?.title || "Partners"}
            subtitle={dictionary.pages?.partnerContact?.subtitle || "ActARion works with a focused ecosystem of partners to help organisations work smarter, safer and faster with AI and Augmented Reality."}
          />
          <PartnersPageClient locale={locale} dictionary={dictionary} />
        </div>
      </main>
    </>
  );
}
