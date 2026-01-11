import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { getWhitepapersForLocale } from "@/lib/whitepapers";

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
  en: "Access detailed guides and methodology documents on implementing AI and AR-guided work instructions. Our whitepapers cover ROI calculation, implementation best practices, and real-world use cases from manufacturing, logistics, and energy sectors.",
  de: "Greifen Sie auf detaillierte Leitfäden und Methodendokumente zur Implementierung von KI- und AR-gestützten Arbeitsanweisungen zu. Unsere Whitepapers behandeln ROI-Berechnung, Implementierungs-Best-Practices und reale Anwendungsfälle aus Fertigung, Logistik und Energie.",
  nl: "Krijg toegang tot gedetailleerde handleidingen en methodologiedocumenten over de implementatie van AI- en AR-gestuurde werkinstructies. Onze whitepapers behandelen ROI-berekening, implementatie best practices en praktijkcases uit productie, logistiek en energie."
};

const comingSoonText = {
  en: "More whitepapers coming soon. Subscribe to our newsletter to be notified when new content is available.",
  de: "Weitere Whitepapers demnächst verfügbar. Abonnieren Sie unseren Newsletter, um benachrichtigt zu werden, wenn neue Inhalte verfügbar sind.",
  nl: "Meer whitepapers binnenkort beschikbaar. Schrijf u in voor onze nieuwsbrief om op de hoogte te worden gehouden wanneer nieuwe content beschikbaar is."
};

const whatYouLearnText = {
  en: {
    title: "What You'll Learn",
    description: "Our whitepapers are designed for operations managers, training leads, and digital transformation teams. Each document provides:",
    items: [
      "Practical methodologies backed by industry research",
      "Step-by-step implementation guidance",
      "Real benchmarks from manufacturing, logistics, and energy sectors",
      "Clear frameworks for building business cases"
    ]
  },
  de: {
    title: "Was Sie lernen werden",
    description: "Unsere Whitepapers sind für Betriebsleiter, Schulungsleiter und Teams für digitale Transformation konzipiert. Jedes Dokument bietet:",
    items: [
      "Praktische Methoden, gestützt auf Branchenforschung",
      "Schritt-für-Schritt-Implementierungsanleitung",
      "Reale Benchmarks aus Fertigung, Logistik und Energie",
      "Klare Frameworks für die Erstellung von Business Cases"
    ]
  },
  nl: {
    title: "Wat u leert",
    description: "Onze whitepapers zijn ontworpen voor operations managers, trainingsleiders en digitale transformatieteams. Elk document biedt:",
    items: [
      "Praktische methodologieën ondersteund door brancheonderzoek",
      "Stap-voor-stap implementatierichtlijnen",
      "Echte benchmarks uit productie, logistiek en energie",
      "Duidelijke frameworks voor het opbouwen van business cases"
    ]
  }
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
  const { whitepapers } = getWhitepapersForLocale(typedLocale);

  const title = pageTitles[locale];
  const description = pageDescriptions[locale];
  const intro = pageIntros[locale];
  const comingSoon = comingSoonText[locale];
  const whatYouLearn = whatYouLearnText[locale];

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
          <div className="card-grid card-grid--three">
            {/* Published whitepapers */}
            {whitepapers.map((wp) => (
              <Link
                key={wp.slug}
                href={buildLocalizedPath(typedLocale, `whitepapers/${wp.slug}`)}
                className="card group hover:shadow-lg transition-shadow"
              >
                {wp.image ? (
                  <div className="h-40 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={wp.image} 
                      alt={wp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="h-12 w-12 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {wp.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                  {wp.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-primary-600 dark:text-primary-400">
                  Read now
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
            
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
              <p className="text-sm text-slate-400 mt-2">Industry Best Practices</p>
            </div>
          </div>
          
          {/* What You'll Learn section */}
          <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {whatYouLearn.title}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-4">
              {whatYouLearn.description}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
              {whatYouLearn.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          
          <div className="summary summary--floating mt-8">
            <p className="text-base">{comingSoon}</p>
          </div>
        </div>
      </main>
    </>
  );
}
