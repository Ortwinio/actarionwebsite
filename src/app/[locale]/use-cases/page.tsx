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
} from "../../../config/site";
import { useCases } from "../../../config/useCases";

/**
 * Force static rendering to ensure metadata is included in initial HTML shell.
 * This prevents title/canonical/robots from being streamed outside <head>.
 */
export const dynamic = 'force-static';

interface UseCasesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const pageDescription =
  "Discover how ActARion and DeepSight help industrial, logistics and energy organisations work smarter, faster and safer with augmented reality work instructions, training and maintenance support.";

export async function generateMetadata({ params }: UseCasesPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    title: "Industrial AR use cases | ActARion",
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

  const structuredData = [
    buildWebPageSchema({
      locale,
      title: "Industrial AR use cases | ActARion",
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
      <PageHeader
        title="Industrial AR use cases"
        subtitle={pageDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner space-y-8">
          <section className="space-y-4">
            <p className="section-lead max-w-2xl">{pageDescription}</p>

            <div className="grid gap-6 md:grid-cols-2">
              {useCases.map((useCase) => (
                <article
                  key={useCase.slug}
                  className="card flex h-full flex-col gap-4"
                >
                  <h2 className="text-xl font-semibold">{useCase.title}</h2>
                  <p className="text-sm text-gray-600">{useCase.shortDescription}</p>
                  <div className="mt-auto">
                    <Link
                      href={buildLocalizedPath(locale, useCase.slug)}
                      className="btn btn-link px-0"
                    >
                      View use case →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

