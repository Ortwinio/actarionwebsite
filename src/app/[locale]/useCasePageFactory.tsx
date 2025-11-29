import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UseCaseCta } from "../../components/UseCaseCta";
import {
  buildPageMetadata,
  buildTechArticleSchema,
  buildWebPageSchema,
  buildBreadcrumbListSchema,
} from "../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "../../config/site";
import type { UseCase } from "../../config/useCases";
import { getUseCaseBySlug } from "../../config/useCases";
import {
  UseCaseContentBlock,
  getUseCaseContent,
} from "../../config/useCaseContent";

interface PageParams {
  params: Promise<{
    locale: string;
  }>;
}

type UseCaseSlug = UseCase["slug"];

function renderBlock(block: UseCaseContentBlock, index: number) {
  if (block.type === "paragraph") {
    return (
      <p key={`paragraph-${index}`} className="text-slate-700">
        {block.content}
      </p>
    );
  }

  if (block.type === "unorderedList") {
    return (
      <ul
        key={`unordered-${index}`}
        className="list-disc space-y-1 pl-5 text-slate-700"
      >
        {block.items.map((item, itemIndex) => (
          <li key={`unordered-${index}-${itemIndex}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <ol
      key={`ordered-${index}`}
      className="list-decimal space-y-1 pl-5 text-slate-700"
    >
      {block.items.map((item, itemIndex) => (
        <li key={`ordered-${index}-${itemIndex}`}>{item}</li>
      ))}
    </ol>
  );
}

export function createUseCasePage(slug: UseCaseSlug) {
  const useCase = (() => {
    const resolved = getUseCaseBySlug(slug);
    if (!resolved) {
      throw new Error(`Unknown use case slug: ${slug}`);
    }
    return resolved;
  })();

  async function generateMetadata({
    params,
  }: PageParams): Promise<Metadata> {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) {
      notFound();
    }

    return buildPageMetadata({
      locale,
      title: `${useCase.title} | ActARion`,
      description: useCase.metaDescription,
      segment: slug,
    });
  }

  async function Page({ params }: PageParams) {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) {
      notFound();
    }

    const typedLocale = locale as Locale;
    const content = getUseCaseContent(typedLocale, slug);

    if (!content) {
      notFound();
    }

    // Build breadcrumb navigation
    const breadcrumbs = [
      { name: 'Home', url: buildLocalizedPath(typedLocale) },
      { name: 'Use Cases', url: buildLocalizedPath(typedLocale, 'use-cases') },
      { name: useCase.title, url: buildLocalizedPath(typedLocale, slug) },
    ];

    const structuredData = [
      buildWebPageSchema({
        locale: typedLocale,
        title: useCase.title,
        description: useCase.metaDescription,
        segment: slug,
      }),
      buildTechArticleSchema({
        locale: typedLocale,
        title: useCase.title,
        description: useCase.metaDescription,
        segment: slug,
      }),
      buildBreadcrumbListSchema(breadcrumbs),
    ];

    const [firstParagraph, ...restParagraphs] = content.heroParagraphs;
    const subtitle = firstParagraph || useCase.metaDescription;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <main className="section section-light">
          <div className="section-inner space-y-10">
            {/* Hero section with H1, intro, and hero image */}
            <section className="space-y-6">
              <div className="space-y-4">
                <h1 className="section-heading text-slate-900">
                  {content.heroTitle}
                </h1>
                <div className="space-y-3">
                  <p className="section-lead text-gray-700">{subtitle}</p>
                  {restParagraphs.length > 0 &&
                    restParagraphs.map((paragraph, index) => (
                      <p
                        key={`hero-${index}`}
                        className="section-lead text-gray-700"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
              {useCase.heroImage && (
                <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-card">
                  <Image
                    src={useCase.heroImage}
                    alt={useCase.heroImageAlt || content.heroTitle}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}
            </section>

            {content.sections.map((section) => (
              <section key={section.title} className="card space-y-3">
                <h2 className="section-subheading">{section.title}</h2>
                {section.blocks.map((block, index) => renderBlock(block, index))}
              </section>
            ))}

            {/* Link back to overview */}
            <div className="pt-4 border-t border-slate-200">
              <Link
                href={buildLocalizedPath(typedLocale, "use-cases")}
                className="btn btn-link px-0 inline-flex items-center"
              >
                ← Back to all use cases
              </Link>
            </div>

            <UseCaseCta locale={typedLocale} />
          </div>
        </main>
      </>
    );
  }

  return { Page, generateMetadata };
}


