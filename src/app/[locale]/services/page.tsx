import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "../../../config/site";

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "We help you turn AR and AI into practical tools on the shop floor.";

const fallbackSubtitle =
  "We help you turn AR and AI into practical tools on the shop floor.";

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const servicesCopy = dictionary.pages?.services;
  const description =
    servicesCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;

  return buildPageMetadata({
    locale,
    title: servicesCopy?.title || "Services",
    description,
    segment: "services",
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const servicesCopy = dictionary.pages?.services;
  const sections = servicesCopy?.sections;
  const intro = servicesCopy?.intro;
  const description =
    servicesCopy?.description?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const pageTitle = servicesCopy?.title || "Services";
  const headerSubtitle = servicesCopy?.subtitle || fallbackSubtitle;

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: pageTitle, url: buildLocalizedPath(typedLocale, 'services') },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: pageTitle,
      description,
      segment: "services",
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <PageHeader
        title={pageTitle}
        subtitle={headerSubtitle}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {intro?.p1 || "At ActARion we help you turn AR and AI from \"interesting technology\" into practical tools in daily operations. Our services are built around one simple goal: help your teams work smarter, safer and faster."}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {intro?.p2 || "We don't start with features, but with your reality: assets, processes, people, regulations and targets. From there, we design a concrete path: discover → prove → scale."}
          </p>
        </section>

        {/* 1. Strategy and use case discovery */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.strategy?.title || "1. Strategy and use case discovery"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.strategy?.goal || "Goal:"}</strong> {sections?.strategy?.goalText || "Find the few use cases where AR and AI make a real difference."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.strategy?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.strategy?.items ? (
              sections.strategy.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Short intake with operations, maintenance, quality, HR and IT.</li>
                <li>Mapping of critical processes and &quot;moments that matter&quot; on the shop floor.</li>
                <li>Identification and prioritisation of AR/AI use cases.</li>
                <li>High-level roadmap: where to start, what to measure, how to scale.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.strategy?.deliverable || "Deliverable:"}</strong> {sections?.strategy?.deliverableText || "a concise use case and roadmap document that you can share internally."}
          </p>
        </section>

        {/* 2. Proof of concept and pilot projects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.poc?.title || "2. Proof of concept and pilot projects"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.poc?.goal || "Goal:"}</strong> {sections?.poc?.goalText || "Show measurable impact in weeks, not years."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.poc?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.poc?.items ? (
              sections.poc.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Select one or two high-impact use cases.</li>
                <li>Configure the DeepSight platform for your environment.</li>
                <li>Capture real procedures together with your experts.</li>
                <li>Build the first AR-guides with clear steps, visuals, checks and documentation.</li>
                <li>Train a small group of operators and supervisors.</li>
                <li>Run a pilot and measure key metrics.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.poc?.deliverable || "Deliverable:"}</strong> {sections?.poc?.deliverableText || "a pilot report with results, lessons learned and a recommendation for next steps."}
          </p>
        </section>

        {/* 3. AR work instructions and SOP design */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.arDesign?.title || "3. AR work instructions and SOP design"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.arDesign?.goal || "Goal:"}</strong> {sections?.arDesign?.goalText || "Turn your best way of working into reusable AR-SOPs."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.arDesign?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.arDesign?.items ? (
              sections.arDesign.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Help subject-matter experts structure procedures into clear steps.</li>
                <li>Capture work instructions in the real environment.</li>
                <li>Add visuals such as photos, short clips, 3D cues and annotations.</li>
                <li>Include checks, safety steps and data capture.</li>
                <li>Organise everything into a central AR-SOP library.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            {sections?.arDesign?.usage || "You can use these AR-SOPs for daily production and assembly, quality checks and inspections, maintenance tasks, training and onboarding, audits and compliance."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.arDesign?.deliverable || "Deliverable:"}</strong> {sections?.arDesign?.deliverableText || "a growing digital library of AR work instructions and SOPs that you can maintain yourself."}
          </p>
        </section>

        {/* 4. Training and onboarding programmes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.training?.title || "4. Training and onboarding programmes"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.training?.goal || "Goal:"}</strong> {sections?.training?.goalText || "Shorten time-to-competence and keep training consistent."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.training?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.training?.items ? (
              sections.training.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Design AR-supported learning paths for new operators and technicians.</li>
                <li>Combine self-paced AR-guides with on-the-job coaching.</li>
                <li>Configure skills tracking and certifications in the platform.</li>
                <li>Train internal trainers and supervisors to create and manage content.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.training?.deliverable || "Deliverable:"}</strong> {sections?.training?.deliverableText || "a training and onboarding blueprint with AR content and a clear role for trainers and supervisors."}
          </p>
        </section>

        {/* 5. Maintenance and remote support solutions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.maintenance?.title || "5. Maintenance and remote support solutions"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.maintenance?.goal || "Goal:"}</strong> {sections?.maintenance?.goalText || "Increase uptime and reduce time-to-repair."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.maintenance?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.maintenance?.items ? (
              sections.maintenance.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Capture preventive maintenance tasks as AR-guides.</li>
                <li>Structure inspections so technicians can easily follow and document each step.</li>
                <li>Implement remote expert support so technicians can call for help when needed.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            {sections?.maintenance?.useCases || "Use cases include AR-guided preventive maintenance, remote expert support for corrective maintenance and standardised inspections for regulatory compliance."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.maintenance?.deliverable || "Deliverable:"}</strong> {sections?.maintenance?.deliverableText || "maintenance playbooks supported by AR, plus a working remote support setup."}
          </p>
        </section>

        {/* 6. Integration and change management */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.integration?.title || "6. Integration and change management"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.integration?.goal || "Goal:"}</strong> {sections?.integration?.goalText || "Make AR and AI part of daily work, not a side project."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.integration?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.integration?.items ? (
              sections.integration.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Align AR/AI initiatives with existing systems (such as CMMS, MES, QMS, LMS) where relevant.</li>
                <li>Work with IT and security to meet your standards and policies.</li>
                <li>Define roles and responsibilities for content creation, approval and training.</li>
                <li>Support internal communication and change, from pilots to broader rollout.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.integration?.deliverable || "Deliverable:"}</strong> {sections?.integration?.deliverableText || "an implementation and governance model that fits your organisation."}
          </p>
        </section>

        {/* 7. Support, analytics and continuous improvement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.support?.title || "7. Support, analytics and continuous improvement"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.support?.goal || "Goal:"}</strong> {sections?.support?.goalText || "Keep the solution up-to-date and increase value over time."}
          </p>
          <p className="text-gray-700 dark:text-gray-300">{sections?.support?.whatWeDo || "What we do:"}</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {sections?.support?.items ? (
              sections.support.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>
                <li>Provide ongoing support on the DeepSight platform together with our technology partner.</li>
                <li>Help you monitor usage and performance of guides.</li>
                <li>Facilitate regular improvement workshops with your teams.</li>
                <li>Share best practices from other projects and industries.</li>
              </>
            )}
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{sections?.support?.deliverable || "Deliverable:"}</strong> {sections?.support?.deliverableText || "a continuous improvement cycle around AR-guided work, with clear metrics."}
          </p>
        </section>

        {/* Regional focus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {sections?.regional?.title || "Services tailored to your region"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {sections?.regional?.intro || "ActARion is organised to support you locally:"}
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>{sections?.regional?.benelux || "Benelux"}</strong> {sections?.regional?.beneluxText || "– led by Managing Partner Ortwin Verreck, focusing on industrial, logistics and energy companies in the Netherlands, Belgium and Luxembourg."}
            </li>
            <li>
              <strong>{sections?.regional?.dach || "DACH (Germany, Austria, Switzerland)"}</strong> {sections?.regional?.dachText || "– led by Managing Partner Mark Dercksen, focusing on robust, scalable AR and AI implementations across the region."}
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            {sections?.regional?.outro || "Together we help you clarify where to start, design a concrete first use case and build a roadmap from pilot to scale."}
          </p>
        </section>
      </main>
    </>
  );
}
