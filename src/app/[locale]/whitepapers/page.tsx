import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";

interface WhitepapersPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl' }>
}

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

const pageDescriptions = {
  en: "Explore ActARion whitepapers on AI and AR–guided work instructions, AR SOPs and digital work instructions. Download resources about real-world use cases and implementation best practices.",
  de: "Entdecken Sie ActARion Whitepapers zu KI- und AR-gestützten Arbeitsanweisungen, AR-SOPs und digitalen Arbeitsanweisungen. Laden Sie Ressourcen zu realen Anwendungsfällen und Best Practices für die Implementierung herunter.",
  nl: "Ontdek ActARion whitepapers over AI en AR-gestuurde werkinstructies, AR-SOPs en digitale werkinstructies. Download bronnen over praktijkcases en implementatie best practices."
};

// Short SEO descriptions (max 155 chars)
const seoDescriptions = {
  en: "Download ActARion whitepapers on AR work instructions, digital SOPs, and AI-guided industrial operations. Real-world use cases and best practices.",
  de: "Laden Sie ActARion Whitepapers zu AR-Arbeitsanweisungen, digitalen SOPs und KI-gestützten Industrieabläufen herunter.",
  nl: "Download ActARion whitepapers over AR-werkinstructies, digitale SOPs en AI-gestuurde industriële operaties."
};

const pageTitles = {
  en: "Whitepapers – AR & AI Work Instructions Resources",
  de: "Whitepapers – Ressourcen zu AR- & KI-Arbeitsanweisungen",
  nl: "Whitepapers – AR & AI Werkinstructie Bronnen"
};

const pageIntros = {
  en: "Explore ActARion whitepapers on AI and AR–guided work instructions, AR SOPs and digital work instructions. This page will be updated with downloadable content about real-world use cases and implementation best practices.",
  de: "Entdecken Sie ActARion Whitepapers zu KI- und AR-gestützten Arbeitsanweisungen, AR-SOPs und digitalen Arbeitsanweisungen. Diese Seite wird mit herunterladbaren Inhalten zu realen Anwendungsfällen und Best Practices für die Implementierung aktualisiert.",
  nl: "Ontdek ActARion whitepapers over AI en AR-gestuurde werkinstructies, AR-SOPs en digitale werkinstructies. Deze pagina wordt bijgewerkt met downloadbare content over praktijkcases en implementatie best practices."
};

const comingSoonText = {
  en: "Whitepapers coming soon. Subscribe to our newsletter to be notified when new content is available.",
  de: "Whitepapers demnächst verfügbar. Abonnieren Sie unseren Newsletter, um benachrichtigt zu werden, wenn neue Inhalte verfügbar sind.",
  nl: "Whitepapers binnenkort beschikbaar. Schrijf u in voor onze nieuwsbrief om op de hoogte te worden gehouden wanneer nieuwe content beschikbaar is."
};

export async function generateMetadata({ params }: WhitepapersPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const description = seoDescriptions[locale];

  return buildPageMetadata({
    locale,
    // Don't add "| ActARion" - the root layout template will add it
    title: pageTitles[locale],
    description,
    segment: 'whitepapers',
  });
}

export default async function WhitepapersPage({ params }: WhitepapersPageProps) {
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;

  const title = pageTitles[locale];
  const description = pageDescriptions[locale];
  const intro = pageIntros[locale];
  const comingSoon = comingSoonText[locale];

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: dictionary?.navigation?.home || 'Home', url: buildLocalizedPath(typedLocale) },
    { name: title, url: buildLocalizedPath(typedLocale, 'whitepapers') },
  ];

  // Build structured data
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title,
      description,
      segment: 'whitepapers',
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader title={title} subtitle={intro} />
      <main className="section section-light">
        <div className="section-inner space-y-8">
          <div className="summary summary--floating">
            <p className="text-base">{comingSoon}</p>
          </div>
          
          {/* TODO: Replace with a dynamic list of whitepapers when content is available */}
          <div className="card-grid card-grid--three">
            {/* Placeholder cards for future whitepapers */}
            <div className="card opacity-50">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-400">Coming Soon</h3>
              <p className="text-sm text-slate-400 mt-2">AR Implementation Guide</p>
            </div>
            <div className="card opacity-50">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-400">Coming Soon</h3>
              <p className="text-sm text-slate-400 mt-2">ROI Calculator Guide</p>
            </div>
            <div className="card opacity-50">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-400">Coming Soon</h3>
              <p className="text-sm text-slate-400 mt-2">Industry Best Practices</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
