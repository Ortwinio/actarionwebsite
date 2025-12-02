import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UseCaseCta } from "../../../components/UseCaseCta";
import {
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildBreadcrumbListSchema,
  siteUrl,
} from "../../../config/seo";
import {
  buildLocalizedPath,
  isSupportedLocale,
  Locale,
} from "../../../config/site";
import { useCases } from "../../../config/useCases";

interface UseCasesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const pageDescription =
  "Discover how ActARion and Deep Sight help industrial, logistics and energy organisations work smarter, faster and safer with AI and AR–guided work instructions, AR SOPs and digital work instructions.";

const pageIntro =
  "ActARion and Deep Sight help you apply AI and AR–guided work instructions across your operations. From assembly and changeovers to maintenance, training and audits, we turn your SOPs into digital work instructions and AR SOPs that guide people step-by-step in the real environment.";

export async function generateMetadata({ params }: UseCasesPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    title: "Use cases for AI and AR–guided work instructions | ActARion",
    description: pageDescription,
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

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: 'Use Cases', url: buildLocalizedPath(typedLocale, 'use-cases') },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: "Use cases for AI and AR–guided work instructions | ActARion",
      description: pageDescription,
      segment: "use-cases",
    }),
    buildItemListSchema(
      useCases.map((useCase) => ({
        name: useCase.title,
        description: useCase.shortDescription,
        url: `${siteUrl}${buildLocalizedPath(typedLocale, useCase.slug)}`,
      }))
    ),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner space-y-12">
          {/* Hero section with H1, intro, and image */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="section-heading text-slate-900">
                Use cases for AI and AR–guided work instructions
              </h1>
              <p className="section-lead max-w-3xl text-gray-700">
                {pageIntro}
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-card">
              <Image
                src="/images/usecases/usecases-overview.png"
                alt="Overview of AI and AR–guided work instructions use cases for smarter, safer, faster work"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </section>

          {/* Use cases grid */}
          <section className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase) => {
                const useCaseHref = buildLocalizedPath(typedLocale, useCase.slug);
                return (
                  <Link
                    key={useCase.slug}
                    href={useCaseHref}
                    className="group card flex h-full flex-col gap-0 transition-all hover:shadow-lg hover:scale-[1.02] overflow-hidden"
                  >
                    <article className="flex h-full flex-col">
                      {/* Image at the top of the card */}
                      {useCase.heroImage && (
                        <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                          <Image
                            src={useCase.heroImage}
                            alt={useCase.heroImageAlt || useCase.title}
                            width={480}
                            height={270}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {/* Card content */}
                      <div className="flex h-full flex-col gap-4 p-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                          {useCase.title}
                        </h2>
                        <p className="text-sm text-gray-600 flex-grow">
                          {useCase.shortDescription}
                        </p>
                        <div className="mt-auto">
                          <span className="inline-flex items-center justify-center gap-2 rounded-full bg-actarion-blue px-4 py-2 text-xs font-semibold text-white shadow-[0_15px_30px_rgba(26,128,194,0.35)] transition-all duration-200 group-hover:bg-actarion-blue-strong">
                            Learn more
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA section */}
          <section className="mt-16">
            <UseCaseCta locale={typedLocale} />
          </section>
        </div>
      </main>
    </>
  );
}

