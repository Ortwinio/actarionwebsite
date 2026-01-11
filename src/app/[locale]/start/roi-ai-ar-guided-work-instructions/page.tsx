import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";

interface StartPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

const pageContent = {
  en: {
    title: "Start here: ROI of AI & AR–guided work instructions",
    seoTitle: "Start here: ROI of AI & AR-Guided Work Instructions",
    seoDescription: "Understand where ROI comes from when implementing AI and AR-guided work instructions. Calculator, methodology, use cases, and validation approach explained.",
    intro: `If you're responsible for operations, training, or maintenance in a manufacturing, logistics, or energy environment, you've probably heard claims about "digital work instructions" or "AR-guided SOPs." But what does that actually mean—and how do you know if it's worth the investment?

This page explains what AI- and AR-guided work instructions are, where the return on investment comes from, and how to evaluate whether they make sense for your situation. It's written for people who need to understand the basics before diving into tools or pilots.`,
  },
  de: {
    title: "Hier starten: ROI von KI- & AR-gestützten Arbeitsanweisungen",
    seoTitle: "Hier starten: ROI von KI- & AR-gestützten Arbeitsanweisungen",
    seoDescription: "Verstehen Sie, woher der ROI bei der Implementierung von KI- und AR-gestützten Arbeitsanweisungen kommt. Rechner, Methodik, Anwendungsfälle und Validierungsansatz erklärt.",
    intro: `Wenn Sie für Betrieb, Schulung oder Wartung in einer Fertigungs-, Logistik- oder Energieumgebung verantwortlich sind, haben Sie wahrscheinlich Behauptungen über "digitale Arbeitsanweisungen" oder "AR-gestützte SOPs" gehört. Aber was bedeutet das eigentlich—und woher wissen Sie, ob es die Investition wert ist?

Diese Seite erklärt, was KI- und AR-gestützte Arbeitsanweisungen sind, woher die Rendite kommt und wie Sie bewerten können, ob sie für Ihre Situation sinnvoll sind. Sie ist für Menschen geschrieben, die die Grundlagen verstehen müssen, bevor sie sich mit Tools oder Pilotprojekten befassen.`,
  },
  nl: {
    title: "Start hier: ROI van AI- & AR-gestuurde werkinstructies",
    seoTitle: "Start hier: ROI van AI- & AR-gestuurde werkinstructies",
    seoDescription: "Begrijp waar de ROI vandaan komt bij het implementeren van AI- en AR-gestuurde werkinstructies. Calculator, methodologie, use cases en validatieaanpak uitgelegd.",
    intro: `Als u verantwoordelijk bent voor operaties, training of onderhoud in een productie-, logistiek- of energie-omgeving, heeft u waarschijnlijk claims gehoord over "digitale werkinstructies" of "AR-gestuurde SOPs." Maar wat betekent dat eigenlijk—en hoe weet u of het de investering waard is?

Deze pagina legt uit wat AI- en AR-gestuurde werkinstructies zijn, waar het rendement vandaan komt en hoe u kunt evalueren of ze zinvol zijn voor uw situatie. Het is geschreven voor mensen die de basis moeten begrijpen voordat ze in tools of pilots duiken.`,
  },
};

export async function generateMetadata({ params }: StartPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  return buildPageMetadata({
    locale: locale as Locale,
    title: content.seoTitle,
    description: content.seoDescription,
    segment: "start/roi-ai-ar-guided-work-instructions",
  });
}

export default async function StartROIPage({ params }: StartPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  const breadcrumbs = [
    { name: dictionary?.navigation?.home || "Home", url: buildLocalizedPath(typedLocale) },
    { name: content.title, url: buildLocalizedPath(typedLocale, "start/roi-ai-ar-guided-work-instructions") },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: content.title,
      description: content.seoDescription,
      segment: "start/roi-ai-ar-guided-work-instructions",
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  // Localized paths
  const roiCalculatorGuide = buildLocalizedPath(typedLocale, "whitepapers/roi-calculator-guide");
  const faqPath = buildLocalizedPath(typedLocale, "faq");
  const contactPath = buildLocalizedPath(typedLocale, "contact");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader title={content.title} />
      <main className="section section-light">
        <div className="section-inner max-w-3xl">
          <article className="card bg-white p-8 space-y-10 text-slate-700">
            
            {/* Introduction */}
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {content.intro}
            </div>

            {/* What problem this solves */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                What problem this solves
              </h2>
              <p className="mb-4">
                Most industrial organisations face a combination of these challenges:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Skills shortage and aging workforce.</strong> Experienced technicians are retiring faster than new ones can be trained. Their knowledge often leaves with them.</li>
                <li><strong>Increasing process complexity.</strong> Products, regulations, and equipment change frequently. Keeping instructions current is difficult.</li>
                <li><strong>Errors, rework, and downtime.</strong> When procedures are unclear or hard to access, mistakes happen. These cost time and money.</li>
                <li><strong>Slow onboarding.</strong> New hires spend weeks shadowing experienced colleagues. This ties up experts and delays productivity.</li>
              </ul>
              <p className="mt-4">
                AI- and AR-guided work instructions address these problems by making procedural knowledge easier to capture, access, and follow—directly in the work environment.
              </p>
            </section>

            {/* Where ROI comes from */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Where ROI comes from
              </h2>
              <p className="mb-4">
                The financial return from AR-guided work instructions typically comes from four areas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Faster onboarding.</strong> New employees reach baseline competency in days instead of weeks. Less shadowing time, less trainer burden.</li>
                <li><strong>Fewer errors.</strong> Step-by-step visual guidance reduces first-time mistakes. Less rework, less scrap, fewer quality issues.</li>
                <li><strong>Less downtime.</strong> Troubleshooting is faster when guidance is available on demand. Remote experts can assist without travel.</li>
                <li><strong>More consistent execution.</strong> Everyone follows the same procedure, regardless of experience level or shift.</li>
              </ul>
              <p className="mt-4">
                These improvements compound over time. A 30% reduction in training time multiplied across dozens of hires per year adds up quickly.
              </p>
              <p className="mt-4">
                <Link href={roiCalculatorGuide} className="text-primary-600 hover:underline">See how this is calculated →</Link>
                {" "}or{" "}
                <a href="https://roicalculator.actarion.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">estimate impact for your situation →</a>
              </p>
            </section>

            {/* How to use the ROI calculator */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                How to use the ROI calculator
              </h2>
              <p className="mb-4">
                ActARion provides a free calculator to estimate potential savings. There are two modes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Quick estimate.</strong> Enter a few basic numbers (headcount, training days, error rates). Get a rough order of magnitude in 2 minutes. Useful for early conversations.</li>
                <li><strong>Detailed estimate.</strong> Add more context: costs per error, downtime costs, number of at-risk experts. Useful for building a business case or comparing scenarios.</li>
              </ul>
              <p className="mt-4">
                The output is <em>directional</em>, not a guarantee. It shows what's plausible based on industry benchmarks. Actual results depend on implementation quality and starting conditions.
              </p>
              <p className="mt-4">
                <a href="https://roicalculator.actarion.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Open the ROI Calculator →</a>
              </p>
            </section>

            {/* Validate assumptions */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Validate assumptions, don't trust slides
              </h2>
              <p className="mb-4">
                Any ROI estimate is only as good as its assumptions. Default values in the calculator are based on published industry research (PwC, McKinsey, Deloitte, etc.), but your situation may differ.
              </p>
              <p className="mb-4">
                ActARion's approach is to validate assumptions through focused pilots:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Start with one or two high-impact processes</li>
                <li>Measure baseline performance before implementation</li>
                <li>Track KPIs (training time, error rates, task completion time) during the pilot</li>
                <li>Compare results to projections before scaling</li>
              </ul>
              <p className="mt-4">
                This builds confidence—for you and for finance stakeholders—before committing to a larger rollout.
              </p>
              <p className="mt-4">
                <Link href={roiCalculatorGuide} className="text-primary-600 hover:underline">Read the full methodology guide →</Link>
              </p>
            </section>

            {/* Explore by use case */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Explore by use case
              </h2>
              <p className="mb-4">
                AR-guided work instructions apply to many operational scenarios. The most common:
              </p>
              <ul className="space-y-3 ml-2">
                <li>
                  <Link href={buildLocalizedPath(typedLocale, "ar-training-and-onboarding")} className="text-primary-600 hover:underline font-medium">Onboarding & training</Link>
                  <span className="text-slate-600"> — Accelerate time-to-competency for new hires and role changes.</span>
                </li>
                <li>
                  <Link href={buildLocalizedPath(typedLocale, "ar-preventive-maintenance")} className="text-primary-600 hover:underline font-medium">Preventive maintenance</Link>
                  <span className="text-slate-600"> — Guide technicians through inspections and routine tasks with step-by-step overlays.</span>
                </li>
                <li>
                  <Link href={buildLocalizedPath(typedLocale, "ar-guided-changeover-batch-preparation")} className="text-primary-600 hover:underline font-medium">Changeovers & batch preparation</Link>
                  <span className="text-slate-600"> — Reduce setup time and variability between shifts.</span>
                </li>
                <li>
                  <Link href={buildLocalizedPath(typedLocale, "ar-remote-expert-support-corrective-maintenance")} className="text-primary-600 hover:underline font-medium">Remote expert support</Link>
                  <span className="text-slate-600"> — Connect field workers with specialists without travel.</span>
                </li>
                <li>
                  <Link href={buildLocalizedPath(typedLocale, "ar-work-instructions-corporate-memory")} className="text-primary-600 hover:underline font-medium">Safety & quality (corporate memory)</Link>
                  <span className="text-slate-600"> — Preserve and standardise expert knowledge before it leaves the organisation.</span>
                </li>
              </ul>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Frequently asked questions
              </h2>
              <p className="mb-4">
                Common questions we hear from operations and training leaders:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>What hardware is required? (Smart glasses, tablets, or smartphones all work.)</li>
                <li>How long does implementation take? (Pilots typically run 8–12 weeks.)</li>
                <li>What if our processes change frequently? (Content can be updated without code changes.)</li>
              </ul>
              <p className="mt-4">
                <Link href={faqPath} className="text-primary-600 hover:underline">See all frequently asked questions →</Link>
              </p>
            </section>

            {/* Closing */}
            <section className="border-t border-slate-200 pt-8">
              <p className="text-slate-600 italic">
                This page is designed as a starting point. Each linked resource goes deeper into one aspect of ROI, implementation, or validation.
              </p>
              <p className="mt-4">
                If you've reviewed the materials and want to discuss your specific situation,{" "}
                <Link href={contactPath} className="text-primary-600 hover:underline">schedule a discovery call</Link>. It's a no-pressure conversation to explore whether AR-guided work instructions make sense for your operations.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
