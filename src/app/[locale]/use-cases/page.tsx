import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UseCaseCta } from "../../../components/UseCaseCta";
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
} from "../../../config/site";
import { useCases } from "../../../config/useCases";

interface UseCasesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const pageDescription =
  "Discover how ActARion and DeepSight help industrial, logistics and energy organisations work smarter, faster and safer with augmented reality work instructions, training and maintenance support.";

const pageIntro =
  "Organisations use ActARion for AR and AI guided work to make operations safer, faster, and smarter. From assembly and changeover to maintenance and training, augmented reality work instructions help teams execute complex procedures with confidence and precision.";

export async function generateMetadata({ params }: UseCasesPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    title: "Use cases: safer, faster, smarter work with AI and AR | ActARion",
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

  const structuredData = [
    buildWebPageSchema({
      locale,
      title: "Use cases: safer, faster, smarter work with AI and AR | ActARion",
      description: pageDescription,
      segment: "use-cases",
    }),
    buildItemListSchema(
      useCases.map((useCase) => ({
        name: useCase.title,
        description: useCase.shortDescription,
        url: `${siteUrl}${buildLocalizedPath(locale, useCase.slug)}`,
      }))
    ),
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
                Use cases: safer, faster, smarter work with AI and AR
              </h1>
              <p className="section-lead max-w-3xl text-gray-700">
                {pageIntro}
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-card">
              <Image
                src="/usecases-overview.png"
                alt="Overview of ActARion AR and AI use cases in industrial operations"
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
                    className="card flex h-full flex-col gap-0 transition-all hover:shadow-lg hover:scale-[1.02] overflow-hidden"
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
                          <span className="btn btn-link px-0 inline-flex items-center">
                            Learn more{" "}
                            <span className="ml-1" aria-hidden="true">
                              →
                            </span>
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

