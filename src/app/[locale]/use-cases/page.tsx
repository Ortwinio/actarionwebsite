import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import {
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
  siteUrl,
} from "../../../config/seo";
import {
  buildLocalizedPath,
  isSupportedLocale,
  Locale,
  locales,
} from "../../../config/site";
import { useCases } from "../../../config/useCases";

/**
 * Force static rendering to ensure metadata is included in initial HTML shell.
 */
export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface UseCasesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const pageContent = {
  en: {
    title: "Use cases",
    seoTitle: "AR Work Instruction Use Cases",
    intro: "These are common starting points for applying AI and AR-guided work instructions in operations, maintenance, and training. Each use case addresses a specific operational challenge where step-by-step visual guidance makes a measurable difference.",
    readUseCase: "Read the use case",
    roiTitle: "Estimate the business impact of these use cases",
    roiDescription: "Use the ROI calculator to explore potential impact on training time, errors, and downtime.",
    roiLink: "Estimate the business impact",
  },
  de: {
    title: "Anwendungsfälle",
    seoTitle: "AR-Arbeitsanweisungen Anwendungsfälle",
    intro: "Dies sind typische Ausgangspunkte für den Einsatz von KI- und AR-gestützten Arbeitsanweisungen in Betrieb, Wartung und Schulung. Jeder Anwendungsfall adressiert eine spezifische betriebliche Herausforderung, bei der visuelle Schritt-für-Schritt-Anleitungen einen messbaren Unterschied machen.",
    readUseCase: "Anwendungsfall lesen",
    roiTitle: "Geschäftliche Auswirkungen dieser Anwendungsfälle schätzen",
    roiDescription: "Nutzen Sie den ROI-Rechner, um potenzielle Auswirkungen auf Schulungszeit, Fehler und Ausfallzeiten zu erkunden.",
    roiLink: "Geschäftliche Auswirkungen schätzen",
  },
  nl: {
    title: "Use cases",
    seoTitle: "AR Werkinstructie Use Cases",
    intro: "Dit zijn veelvoorkomende startpunten voor het toepassen van AI- en AR-gestuurde werkinstructies in operaties, onderhoud en training. Elke use case richt zich op een specifieke operationele uitdaging waarbij stapsgewijze visuele begeleiding een meetbaar verschil maakt.",
    readUseCase: "Lees de use case",
    roiTitle: "Schat de zakelijke impact van deze use cases",
    roiDescription: "Gebruik de ROI-calculator om de potentiële impact op opleidingstijd, fouten en downtime te verkennen.",
    roiLink: "Schat de zakelijke impact",
  },
};

const seoDescriptions = {
  en: "Explore AR use cases for industrial operations: onboarding, assembly, changeovers, maintenance, and remote expert support with ActARion.",
  de: "Entdecken Sie AR-Anwendungsfälle für industrielle Abläufe: Einarbeitung, Montage, Umrüstung, Wartung und Remote-Expertenunterstützung.",
  nl: "Ontdek AR use cases voor industriële operaties: onboarding, assemblage, omstellingen, onderhoud en remote expert support.",
};

export async function generateMetadata({ params }: UseCasesPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  return buildPageMetadata({
    locale,
    title: content.seoTitle,
    description: seoDescriptions[locale as keyof typeof seoDescriptions] || seoDescriptions.en,
    segment: "use-cases",
  });
}

export default async function UseCasesOverviewPage({
  params,
}: UseCasesPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: content.title,
      description: content.intro,
      segment: "use-cases",
    }),
    buildItemListSchema(
      useCases.map((useCase) => ({
        name: useCase.title,
        description: useCase.summary,
        url: `${siteUrl}${buildLocalizedPath(typedLocale, `use-cases/${useCase.slug}`)}`,
      }))
    ),
  ];

  return (
    <>
      <PageHeader
        title={content.title}
        subtitle={content.intro}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner space-y-8">
          {/* Use case cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <article
                key={useCase.slug}
                className="card flex h-full flex-col gap-4"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {useCase.title}
                </h2>
                <p className="text-sm text-slate-600">
                  {useCase.summary}
                </p>
                <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                  {useCase.outcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <Link
                    href={buildLocalizedPath(typedLocale, `use-cases/${useCase.slug}`)}
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                  >
                    {content.readUseCase}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* ROI Calculator CTA */}
          <section className="pt-8 border-t border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              {content.roiTitle}
            </h2>
            <p className="text-slate-600 mb-4">
              {content.roiDescription}
            </p>
            <a
              href="https://roicalculator.actarion.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              {content.roiLink}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
