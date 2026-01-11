import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema, siteUrl } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";

interface ROIPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

const pageContent = {
  en: {
    title: "Start Here: ROI of AI & AR-Guided Work Instructions",
    seoTitle: "ROI of AR Work Instructions – Start Here",
    subtitle: "A plain-language guide to understanding and calculating the business value of digital work instructions.",
    seoDescription: "Learn how to measure the ROI of AR and AI-guided work instructions. Calculator, methodology, and real-world benchmarks for training, errors, and downtime.",
    intro: "If you're evaluating AR or AI-guided work instructions for your operations, this page gives you a clear starting point. No jargon, no fluff—just the key concepts, tools, and resources you need.",
    sections: {
      whatIsIt: {
        title: "What are AR-guided work instructions?",
        content: "AR-guided work instructions overlay step-by-step guidance directly onto a worker's view of the real world—using smart glasses, tablets, or smartphones. Instead of reading a paper manual or watching a video, operators see exactly what to do, where to do it, and in what order. AI can help create, translate, and update these instructions automatically.",
      },
      whyMeasureROI: {
        title: "Why measure ROI?",
        content: "Most organisations considering AR/AI for frontline work need to justify the investment. The four areas where value is most commonly measured are:",
        items: [
          "Training time reduction – New hires become productive faster",
          "Error and rework reduction – Fewer mistakes, less scrap, better quality",
          "Downtime reduction – Faster troubleshooting and changeovers",
          "Knowledge capture – Expert know-how preserved and shared",
        ],
      },
      calculator: {
        title: "Use our ROI Calculator",
        content: "Our free calculator lets you estimate potential savings based on your own numbers. You can run a quick estimate in 2 minutes, or use the detailed version for a full business case.",
        cta: "Open ROI Calculator",
        ctaLink: "https://roicalculator.actarion.com/",
      },
      methodology: {
        title: "Understand the methodology",
        content: "If you want to know how the numbers are calculated—or need to explain it to your CFO—read our methodology guide. It covers definitions, assumptions, default values, and benchmark sources.",
        cta: "Read the ROI Calculator Guide",
        ctaLink: "/en/whitepapers/roi-calculator-guide",
      },
      useCases: {
        title: "See it in context",
        content: "Not sure where AR-guided work instructions apply? These use cases show typical applications in manufacturing, logistics, and energy:",
        items: [
          { title: "Training & Onboarding", href: "/en/ar-training-and-onboarding" },
          { title: "Preventive Maintenance", href: "/en/ar-preventive-maintenance" },
          { title: "Remote Expert Support", href: "/en/ar-remote-expert-support-corrective-maintenance" },
          { title: "Guided Assembly", href: "/en/ar-guided-assembly-production" },
        ],
      },
      deepDive: {
        title: "Go deeper",
        content: "For a comprehensive look at ROI measurement, including case studies and pitfalls to avoid, read our detailed blog article:",
        cta: "How to Measure the ROI of AR Work Instructions",
        ctaLink: "/en/blog/roi-ar-ai-guided-work-instructions",
      },
      nextSteps: {
        title: "Ready to talk?",
        content: "If you've done your research and want to discuss your specific situation, we're happy to help. A discovery call is a no-pressure conversation to explore whether AR-guided work instructions make sense for your operations.",
        cta: "Schedule a Discovery Call",
        ctaLink: "/en/contact",
      },
    },
  },
  de: {
    title: "Hier starten: ROI von KI- & AR-gestützten Arbeitsanweisungen",
    seoTitle: "ROI von AR-Arbeitsanweisungen – Hier starten",
    subtitle: "Ein verständlicher Leitfaden zur Berechnung des Geschäftswerts digitaler Arbeitsanweisungen.",
    seoDescription: "Erfahren Sie, wie Sie den ROI von AR- und KI-gestützten Arbeitsanweisungen messen. Rechner, Methodik und Benchmarks für Schulung, Fehler und Ausfallzeiten.",
    intro: "Wenn Sie AR- oder KI-gestützte Arbeitsanweisungen für Ihren Betrieb evaluieren, gibt Ihnen diese Seite einen klaren Ausgangspunkt. Kein Fachjargon, keine Floskeln—nur die wichtigsten Konzepte, Tools und Ressourcen.",
    sections: {
      whatIsIt: {
        title: "Was sind AR-gestützte Arbeitsanweisungen?",
        content: "AR-gestützte Arbeitsanweisungen blenden Schritt-für-Schritt-Anleitungen direkt in das Sichtfeld des Mitarbeiters ein—über Smart Glasses, Tablets oder Smartphones. Anstatt ein Handbuch zu lesen oder ein Video anzusehen, sehen Bediener genau, was zu tun ist, wo und in welcher Reihenfolge. KI kann diese Anweisungen automatisch erstellen, übersetzen und aktualisieren.",
      },
      whyMeasureROI: {
        title: "Warum ROI messen?",
        content: "Die meisten Organisationen, die AR/KI für Frontline-Arbeit in Betracht ziehen, müssen die Investition rechtfertigen. Die vier Bereiche, in denen der Wert am häufigsten gemessen wird:",
        items: [
          "Reduzierung der Schulungszeit – Neue Mitarbeiter werden schneller produktiv",
          "Reduzierung von Fehlern und Nacharbeit – Weniger Fehler, weniger Ausschuss, bessere Qualität",
          "Reduzierung von Ausfallzeiten – Schnellere Fehlerbehebung und Umrüstungen",
          "Wissenserfassung – Expertenwissen wird erhalten und geteilt",
        ],
      },
      calculator: {
        title: "Nutzen Sie unseren ROI-Rechner",
        content: "Unser kostenloser Rechner ermöglicht es Ihnen, potenzielle Einsparungen basierend auf Ihren eigenen Zahlen zu schätzen. Sie können in 2 Minuten eine schnelle Schätzung durchführen oder die detaillierte Version für einen vollständigen Business Case nutzen.",
        cta: "ROI-Rechner öffnen",
        ctaLink: "https://roicalculator.actarion.com/",
      },
      methodology: {
        title: "Die Methodik verstehen",
        content: "Wenn Sie wissen möchten, wie die Zahlen berechnet werden—oder es Ihrem CFO erklären müssen—lesen Sie unseren Methodikleitfaden. Er behandelt Definitionen, Annahmen, Standardwerte und Benchmark-Quellen.",
        cta: "ROI Calculator Guide lesen",
        ctaLink: "/de/whitepapers/roi-calculator-guide",
      },
      useCases: {
        title: "Im Kontext sehen",
        content: "Nicht sicher, wo AR-gestützte Arbeitsanweisungen anwendbar sind? Diese Anwendungsfälle zeigen typische Einsatzgebiete in Fertigung, Logistik und Energie:",
        items: [
          { title: "Schulung & Onboarding", href: "/de/ar-training-and-onboarding" },
          { title: "Vorbeugende Wartung", href: "/de/ar-preventive-maintenance" },
          { title: "Remote-Experten-Support", href: "/de/ar-remote-expert-support-corrective-maintenance" },
          { title: "Geführte Montage", href: "/de/ar-guided-assembly-production" },
        ],
      },
      deepDive: {
        title: "Tiefer eintauchen",
        content: "Für einen umfassenden Blick auf die ROI-Messung, einschließlich Fallstudien und zu vermeidender Fallstricke, lesen Sie unseren ausführlichen Blogartikel:",
        cta: "Wie man den ROI von AR-Arbeitsanweisungen misst",
        ctaLink: "/de/blog/roi-ar-ai-guided-work-instructions",
      },
      nextSteps: {
        title: "Bereit zum Gespräch?",
        content: "Wenn Sie Ihre Recherche abgeschlossen haben und Ihre spezifische Situation besprechen möchten, helfen wir gerne. Ein Discovery Call ist ein unverbindliches Gespräch, um zu erkunden, ob AR-gestützte Arbeitsanweisungen für Ihren Betrieb sinnvoll sind.",
        cta: "Discovery Call vereinbaren",
        ctaLink: "/de/contact",
      },
    },
  },
  nl: {
    title: "Start hier: ROI van AI- & AR-gestuurde werkinstructies",
    seoTitle: "ROI van AR-werkinstructies – Start hier",
    subtitle: "Een heldere gids om de zakelijke waarde van digitale werkinstructies te begrijpen en berekenen.",
    seoDescription: "Leer hoe u de ROI van AR- en AI-gestuurde werkinstructies meet. Calculator, methodologie en benchmarks voor training, fouten en downtime.",
    intro: "Als u AR- of AI-gestuurde werkinstructies voor uw operaties evalueert, geeft deze pagina u een duidelijk startpunt. Geen jargon, geen opvulling—alleen de belangrijkste concepten, tools en bronnen die u nodig heeft.",
    sections: {
      whatIsIt: {
        title: "Wat zijn AR-gestuurde werkinstructies?",
        content: "AR-gestuurde werkinstructies projecteren stap-voor-stap begeleiding direct in het zicht van de werknemer—via smart glasses, tablets of smartphones. In plaats van een handleiding te lezen of een video te bekijken, zien operators precies wat ze moeten doen, waar en in welke volgorde. AI kan deze instructies automatisch maken, vertalen en bijwerken.",
      },
      whyMeasureROI: {
        title: "Waarom ROI meten?",
        content: "De meeste organisaties die AR/AI voor frontline werk overwegen, moeten de investering rechtvaardigen. De vier gebieden waar waarde het vaakst wordt gemeten:",
        items: [
          "Verkorting van trainingstijd – Nieuwe medewerkers worden sneller productief",
          "Vermindering van fouten en herwerk – Minder fouten, minder afval, betere kwaliteit",
          "Vermindering van downtime – Snellere probleemoplossing en omstellingen",
          "Kennisborging – Expertkennis wordt vastgelegd en gedeeld",
        ],
      },
      calculator: {
        title: "Gebruik onze ROI-calculator",
        content: "Onze gratis calculator laat u potentiële besparingen schatten op basis van uw eigen cijfers. U kunt in 2 minuten een snelle schatting maken, of de gedetailleerde versie gebruiken voor een volledige business case.",
        cta: "ROI-calculator openen",
        ctaLink: "https://roicalculator.actarion.com/",
      },
      methodology: {
        title: "De methodologie begrijpen",
        content: "Als u wilt weten hoe de cijfers worden berekend—of het aan uw CFO moet uitleggen—lees dan onze methodologiegids. Deze behandelt definities, aannames, standaardwaarden en benchmarkbronnen.",
        cta: "ROI Calculator Guide lezen",
        ctaLink: "/nl/whitepapers/roi-calculator-guide",
      },
      useCases: {
        title: "Bekijk het in context",
        content: "Niet zeker waar AR-gestuurde werkinstructies van toepassing zijn? Deze use cases tonen typische toepassingen in productie, logistiek en energie:",
        items: [
          { title: "Training & Onboarding", href: "/nl/ar-training-and-onboarding" },
          { title: "Preventief onderhoud", href: "/nl/ar-preventive-maintenance" },
          { title: "Remote expert support", href: "/nl/ar-remote-expert-support-corrective-maintenance" },
          { title: "Begeleide assemblage", href: "/nl/ar-guided-assembly-production" },
        ],
      },
      deepDive: {
        title: "Dieper duiken",
        content: "Voor een uitgebreide kijk op ROI-meting, inclusief casestudies en valkuilen om te vermijden, lees ons gedetailleerde blogartikel:",
        cta: "Hoe meet je de ROI van AR-werkinstructies",
        ctaLink: "/nl/blog/roi-ar-ai-guided-work-instructions",
      },
      nextSteps: {
        title: "Klaar om te praten?",
        content: "Als u uw onderzoek heeft gedaan en uw specifieke situatie wilt bespreken, helpen we graag. Een discovery call is een vrijblijvend gesprek om te verkennen of AR-gestuurde werkinstructies zinvol zijn voor uw operaties.",
        cta: "Discovery call plannen",
        ctaLink: "/nl/contact",
      },
    },
  },
};

export async function generateMetadata({ params }: ROIPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  return buildPageMetadata({
    locale: locale as Locale,
    title: content.seoTitle,
    description: content.seoDescription,
    segment: "roi",
  });
}

export default async function ROIPage({ params }: ROIPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: dictionary?.navigation?.home || "Home", url: buildLocalizedPath(typedLocale) },
    { name: content.title, url: buildLocalizedPath(typedLocale, "roi") },
  ];

  // Build structured data
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: content.title,
      description: content.seoDescription,
      segment: "roi",
    }),
    buildBreadcrumbListSchema(breadcrumbs),
    // HowTo schema for the ROI calculation process
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to calculate ROI for AR-guided work instructions",
      description: "A step-by-step guide to estimating the return on investment for implementing AR and AI-guided work instructions in industrial operations.",
      step: [
        {
          "@type": "HowToStep",
          name: "Identify improvement areas",
          text: "Determine which areas to measure: training time, error rates, downtime, or knowledge capture.",
        },
        {
          "@type": "HowToStep",
          name: "Gather baseline data",
          text: "Collect current metrics: training duration, error rates, downtime hours, and hourly costs.",
        },
        {
          "@type": "HowToStep",
          name: "Use the ROI calculator",
          text: "Enter your data into the ActARion ROI calculator to estimate potential savings.",
          url: "https://roicalculator.actarion.com/",
        },
        {
          "@type": "HowToStep",
          name: "Validate assumptions",
          text: "Review the methodology guide to understand default values and adjust for your context.",
          url: `${siteUrl}/en/whitepapers/roi-calculator-guide`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <main className="section section-light">
        <div className="section-inner max-w-4xl">
          <article className="card bg-white p-8 space-y-12">
            {/* Introduction */}
            <p className="text-lg text-slate-700 leading-relaxed">
              {content.intro}
            </p>

            {/* What is it */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                {content.sections.whatIsIt.title}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {content.sections.whatIsIt.content}
              </p>
            </section>

            {/* Why measure ROI */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                {content.sections.whyMeasureROI.title}
              </h2>
              <p className="text-slate-700 mb-4">
                {content.sections.whyMeasureROI.content}
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                {content.sections.whyMeasureROI.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Calculator CTA */}
            <section className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                {content.sections.calculator.title}
              </h2>
              <p className="text-slate-700 dark:text-slate-200 mb-6">
                {content.sections.calculator.content}
              </p>
              <a
                href={content.sections.calculator.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-pill inline-flex items-center"
              >
                {content.sections.calculator.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </section>

            {/* Methodology */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                {content.sections.methodology.title}
              </h2>
              <p className="text-slate-700 mb-4">
                {content.sections.methodology.content}
              </p>
              <Link
                href={content.sections.methodology.ctaLink}
                className="btn btn-secondary btn-pill inline-flex items-center"
              >
                {content.sections.methodology.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                {content.sections.useCases.title}
              </h2>
              <p className="text-slate-700 mb-4">
                {content.sections.useCases.content}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.sections.useCases.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="p-4 border border-slate-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                  >
                    <span className="font-medium text-slate-900 group-hover:text-primary-700">
                      {item.title}
                    </span>
                    <svg className="w-4 h-4 inline-block ml-2 text-slate-400 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>

            {/* Deep Dive */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                {content.sections.deepDive.title}
              </h2>
              <p className="text-slate-700 mb-4">
                {content.sections.deepDive.content}
              </p>
              <Link
                href={content.sections.deepDive.ctaLink}
                className="btn btn-link inline-flex items-center"
              >
                {content.sections.deepDive.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </section>

            {/* Next Steps */}
            <section className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                {content.sections.nextSteps.title}
              </h2>
              <p className="text-slate-700 dark:text-slate-200 mb-6">
                {content.sections.nextSteps.content}
              </p>
              <Link
                href={content.sections.nextSteps.ctaLink}
                className="btn btn-primary btn-pill inline-flex items-center"
              >
                {content.sections.nextSteps.cta}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
