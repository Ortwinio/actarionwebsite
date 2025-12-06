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
  locales,
} from "../../../config/site";
import { useCases } from "../../../config/useCases";
import { getDictionary } from "../../../lib/getDictionary";

// Helper to build use case URL under /use-cases/[slug]
function buildUseCaseHref(locale: Locale, slug: string): string {
  return buildLocalizedPath(locale, `use-cases/${slug}`);
}

interface UseCasesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const defaultContent = {
  title: "Use cases for AI and AR–guided work instructions",
  description: "Discover how ActARion and Deep Sight help industrial, logistics and energy organisations work smarter, faster and safer with AI and AR–guided work instructions, AR SOPs and digital work instructions.",
  intro: "ActARion and Deep Sight help you apply AI and AR–guided work instructions across your operations. From assembly and changeovers to maintenance, training and audits, we turn your SOPs into digital work instructions and AR SOPs that guide people step-by-step in the real environment.",
  learnMore: "Learn more",
};

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: UseCasesPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const useCasesContent = dictionary.pages?.useCases;
  const title = useCasesContent?.title || defaultContent.title;
  const description = useCasesContent?.description || defaultContent.description;

  return buildPageMetadata({
    locale,
    // Don't add "| ActARion" - the root layout template will add it
    title,
    description,
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

  const dictionary = await getDictionary(locale);
  const useCasesContent = dictionary.pages?.useCases;
  const typedLocale = locale as Locale;
  
  const title = useCasesContent?.title || defaultContent.title;
  const description = useCasesContent?.description || defaultContent.description;
  const intro = useCasesContent?.intro || defaultContent.intro;
  const learnMore = useCasesContent?.learnMore || defaultContent.learnMore;

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', url: buildLocalizedPath(typedLocale) },
    { name: locale === 'de' ? 'Anwendungsfälle' : locale === 'nl' ? 'Use cases' : 'Use Cases', url: buildLocalizedPath(typedLocale, 'use-cases') },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      // Don't add "| ActARion" - the root layout template will add it
      title,
      description,
      segment: "use-cases",
    }),
    buildItemListSchema(
      useCases.map((useCase) => ({
        name: useCase.title,
        description: useCase.shortDescription,
        url: `${siteUrl}${buildUseCaseHref(typedLocale, useCase.slug)}`,
      }))
    ),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  // Localized breadcrumb labels
  const breadcrumbLabels = {
    home: dictionary?.navigation?.home || 'Home',
    useCases: dictionary?.navigation?.insightSubmenu?.useCases || 'Use Cases',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner space-y-12">
          {/* Visual Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              <li className="flex items-center gap-2">
                <Link 
                  href={buildLocalizedPath(typedLocale)} 
                  className="hover:text-actarion-blue transition-colors"
                >
                  {breadcrumbLabels.home}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="text-slate-900 font-medium">{breadcrumbLabels.useCases}</span>
              </li>
            </ol>
          </nav>

          {/* Hero section with H1, intro, and image */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="section-heading text-slate-900">
                {title}
              </h1>
              <p className="section-lead max-w-3xl text-gray-700">
                {intro}
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-card">
              <Image
                src="/images/usecases/usecases-overview.png"
                alt="Overview of AI and AR–guided work instructions use cases for smarter, safer, faster work"
                width={1200}
                height={600}
                sizes="(max-width: 1200px) 100vw, 1200px"
                quality={75}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </section>

          {/* Use cases grid */}
          <section className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase) => {
                const useCaseHref = buildUseCaseHref(typedLocale, useCase.slug);
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={75}
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
                            {learnMore}
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

