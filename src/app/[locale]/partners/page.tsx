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

const partnerEcosystemText = {
  en: {
    title: "Our Partner Ecosystem",
    description: "ActARion has built a focused partner network to deliver complete AR and AI solutions for industrial operations. Our partnerships span three key areas:",
    categories: [
      { name: "Technology Partners", description: "Hardware manufacturers and platform providers like Microsoft (HoloLens), Apple (Vision Pro), and Google (XR technologies) that power our AR experiences." },
      { name: "Solution Partners", description: "DeepSight provides the connected worker platform that powers ActARion's AR work instructions and digital SOPs." },
      { name: "Implementation Partners", description: "Regional consultants and system integrators who help customers deploy, configure, and scale AR solutions in their specific operational context." }
    ],
    cta: "Click on any partner below to learn more about our collaboration and what they bring to industrial AR solutions."
  },
  de: {
    title: "Unser Partner-Ökosystem",
    description: "ActARion hat ein fokussiertes Partnernetzwerk aufgebaut, um vollständige AR- und KI-Lösungen für industrielle Abläufe zu liefern. Unsere Partnerschaften umfassen drei Schlüsselbereiche:",
    categories: [
      { name: "Technologiepartner", description: "Hardware-Hersteller und Plattformanbieter wie Microsoft (HoloLens), Apple (Vision Pro) und Google (XR-Technologien), die unsere AR-Erlebnisse ermöglichen." },
      { name: "Lösungspartner", description: "DeepSight liefert die Connected-Worker-Plattform, die ActARions AR-Arbeitsanweisungen und digitale SOPs antreibt." },
      { name: "Implementierungspartner", description: "Regionale Berater und Systemintegratoren, die Kunden bei der Bereitstellung, Konfiguration und Skalierung von AR-Lösungen helfen." }
    ],
    cta: "Klicken Sie auf einen Partner unten, um mehr über unsere Zusammenarbeit zu erfahren."
  },
  nl: {
    title: "Ons Partner Ecosysteem",
    description: "ActARion heeft een gericht partnernetwerk opgebouwd om complete AR- en AI-oplossingen te leveren voor industriële operaties. Onze partnerschappen omvatten drie kerngebieden:",
    categories: [
      { name: "Technologiepartners", description: "Hardware-fabrikanten en platformproviders zoals Microsoft (HoloLens), Apple (Vision Pro) en Google (XR-technologieën) die onze AR-ervaringen mogelijk maken." },
      { name: "Oplossingspartners", description: "DeepSight levert het connected worker-platform dat ActARions AR-werkinstructies en digitale SOPs aandrijft." },
      { name: "Implementatiepartners", description: "Regionale consultants en systeemintegrators die klanten helpen AR-oplossingen te implementeren, configureren en schalen." }
    ],
    cta: "Klik op een partner hieronder om meer te leren over onze samenwerking."
  }
};

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
          
          {/* Partner Ecosystem Overview */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {partnerEcosystemText[typedLocale as keyof typeof partnerEcosystemText]?.title || partnerEcosystemText.en.title}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-6">
              {partnerEcosystemText[typedLocale as keyof typeof partnerEcosystemText]?.description || partnerEcosystemText.en.description}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {(partnerEcosystemText[typedLocale as keyof typeof partnerEcosystemText]?.categories || partnerEcosystemText.en.categories).map((category, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
                </div>
              ))}
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300">
              {partnerEcosystemText[typedLocale as keyof typeof partnerEcosystemText]?.cta || partnerEcosystemText.en.cta}
            </p>
          </section>
          
          <PartnersPageClient locale={locale} dictionary={dictionary} />
        </div>
      </main>
    </>
  );
}
