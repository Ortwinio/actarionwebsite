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
            At ActARion we help you turn AR and AI from &quot;interesting
            technology&quot; into practical tools in daily operations. Our services
            are built around one simple goal: help your teams work smarter,
            safer and faster.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We don&apos;t start with features, but with your reality: assets,
            processes, people, regulations and targets. From there, we design a
            concrete path: discover → prove → scale.
          </p>
        </section>

        {/* 1. Strategy and use case discovery */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            1. Strategy and use case discovery
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Find the few use cases where AR and AI make a
            real difference.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Short intake with operations, maintenance, quality, HR and IT.
            </li>
            <li>
              Mapping of critical processes and &quot;moments that matter&quot; on the
              shop floor.
            </li>
            <li>
              Identification and prioritisation of AR/AI use cases, for example:
              AR-guided assembly and inspections, changeovers, training and
              onboarding, preventive maintenance and remote troubleshooting,
              work instructions and SOPs to preserve corporate memory.
            </li>
            <li>
              High-level roadmap: where to start, what to measure, how to scale.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> a concise use case and roadmap
            document that you can share internally.
          </p>
        </section>

        {/* 2. Proof of concept and pilot projects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            2. Proof of concept and pilot projects
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Show measurable impact in weeks, not years.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Select one or two high-impact use cases (for example a complex
              changeover or a critical maintenance task).
            </li>
            <li>
              Configure the DeepSight platform for your environment.
            </li>
            <li>
              Capture real procedures together with your experts on the line or
              installation.
            </li>
            <li>
              Build the first AR-guides with clear steps, visuals, checks and
              documentation.
            </li>
            <li>
              Train a small group of operators and supervisors.
            </li>
            <li>
              Run a pilot and measure key metrics such as time to complete the
              task, error rate, downtime and training time.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> a pilot report with results, lessons
            learned and a recommendation for next steps.
          </p>
        </section>

        {/* 3. AR work instructions and SOP design */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            3. AR work instructions and SOP design
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Turn your best way of working into reusable
            AR-SOPs.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Help subject-matter experts structure procedures into clear steps.
            </li>
            <li>
              Capture work instructions in the real environment with smart
              glasses or mobile devices.
            </li>
            <li>
              Add visuals such as photos, short clips, 3D cues and annotations.
            </li>
            <li>
              Include checks, safety steps and data capture (photos,
              confirmations, notes).
            </li>
            <li>
              Organise everything into a central AR-SOP library by line, asset,
              product or site.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            You can use these AR-SOPs for daily production and assembly,
            quality checks and inspections, maintenance tasks, training and
            onboarding, audits and compliance.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> a growing digital library of AR work
            instructions and SOPs that you can maintain yourself.
          </p>
        </section>

        {/* 4. Training and onboarding programmes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            4. Training and onboarding programmes
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Shorten time-to-competence and keep training
            consistent.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Design AR-supported learning paths for new operators and
              technicians.
            </li>
            <li>
              Combine self-paced AR-guides with on-the-job coaching.
            </li>
            <li>
              Configure skills tracking and certifications in the platform.
            </li>
            <li>
              Train internal trainers and supervisors to create and manage
              content.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> a training and onboarding blueprint
            with AR content and a clear role for trainers and supervisors.
          </p>
        </section>

        {/* 5. Maintenance and remote support solutions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            5. Maintenance and remote support solutions
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Increase uptime and reduce time-to-repair.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Capture preventive maintenance tasks as AR-guides, including
              checks and data capture.
            </li>
            <li>
              Structure inspections so technicians can easily follow and
              document each step.
            </li>
            <li>
              Implement remote expert support so technicians can call for help
              when needed.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            Use cases include AR-guided preventive maintenance, remote expert
            support for corrective maintenance and standardised inspections for
            regulatory compliance.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> maintenance playbooks supported by AR,
            plus a working remote support setup.
          </p>
        </section>

        {/* 6. Integration and change management */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            6. Integration and change management
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Make AR and AI part of daily work, not a side
            project.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Align AR/AI initiatives with existing systems (such as CMMS, MES,
              QMS, LMS) where relevant.
            </li>
            <li>
              Work with IT and security to meet your standards and policies.
            </li>
            <li>
              Define roles and responsibilities for content creation, approval
              and training.
            </li>
            <li>
              Support internal communication and change, from pilots to broader
              rollout.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> an implementation and governance model
            that fits your organisation.
          </p>
        </section>

        {/* 7. Support, analytics and continuous improvement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            7. Support, analytics and continuous improvement
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Goal:</strong> Keep the solution up-to-date and increase
            value over time.
          </p>
          <p className="text-gray-700 dark:text-gray-300">What we do:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Provide ongoing support on the DeepSight platform together with
              our technology partner.
            </li>
            <li>
              Help you monitor usage and performance of guides: which
              procedures are used most, where operators get stuck and which
              skills and certifications need attention.
            </li>
            <li>
              Facilitate regular improvement workshops with your teams.
            </li>
            <li>
              Share best practices from other projects and industries.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Deliverable:</strong> a continuous improvement cycle around
            AR-guided work, with clear metrics.
          </p>
        </section>

        {/* Regional focus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Services tailored to your region
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            ActARion is organised to support you locally:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Benelux</strong> – led by Managing Partner Ortwin
              Verreck, focusing on industrial, logistics and energy companies in
              the Netherlands, Belgium and Luxembourg.
            </li>
            <li>
              <strong>DACH (Germany, Austria, Switzerland)</strong> – led by
              Managing Partner Mark Dercksen, focusing on robust, scalable AR
              and AI implementations across the region.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            Together we help you clarify where to start, design a concrete first
            use case and build a roadmap from pilot to scale.
          </p>
        </section>
      </main>
    </>
  );
}

