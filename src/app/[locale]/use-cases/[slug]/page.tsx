import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UseCaseCta } from "../../../../components/UseCaseCta";
import {
  buildPageMetadata,
  buildTechArticleSchema,
  buildWebPageSchema,
  buildBreadcrumbListSchema,
} from "../../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "../../../../config/site";
import { useCases, getUseCaseBySlug, UseCase } from "../../../../config/useCases";
import {
  UseCaseContentBlock,
  getUseCaseContent,
  RelatedBlogPost,
} from "../../../../config/useCaseContent";
import { getDictionary } from "../../../../lib/getDictionary";

interface PageParams {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

/**
 * Generate static params for all use cases in all locales.
 * This enables static generation at build time.
 */
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const useCase of useCases) {
      params.push({
        locale,
        slug: useCase.slug,
      });
    }
  }
  
  return params;
}

export const dynamic = 'force-static';

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

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const useCase = getUseCaseBySlug(slug);
  if (!useCase) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    title: useCase.title,
    description: useCase.metaDescription,
    segment: `use-cases/${slug}`,
  });
}

export default async function UseCaseDetailPage({ params }: PageParams) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const useCase = getUseCaseBySlug(slug);
  if (!useCase) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const content = getUseCaseContent(typedLocale, slug as UseCase["slug"]);
  const dictionary = await getDictionary(typedLocale);

  if (!content) {
    notFound();
  }

  // Localized breadcrumb labels
  const breadcrumbLabels = {
    home: dictionary?.navigation?.home || 'Home',
    useCases: dictionary?.navigation?.insightSubmenu?.useCases || 'Use Cases',
  };

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: breadcrumbLabels.home, url: buildLocalizedPath(typedLocale) },
    { name: breadcrumbLabels.useCases, url: buildLocalizedPath(typedLocale, 'use-cases') },
    { name: useCase.title, url: buildLocalizedPath(typedLocale, `use-cases/${slug}`) },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: useCase.title,
      description: useCase.metaDescription,
      segment: `use-cases/${slug}`,
    }),
    buildTechArticleSchema({
      locale: typedLocale,
      title: useCase.title,
      description: useCase.metaDescription,
      segment: `use-cases/${slug}`,
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  const [firstParagraph, ...restParagraphs] = content.heroParagraphs;
  const subtitle = firstParagraph || useCase.metaDescription;

  // Localized labels
  const furtherReadingLabel = typedLocale === 'de' ? 'Weiterführende Lektüre' : typedLocale === 'nl' ? 'Verder lezen' : 'Further reading';
  const exploreArticlesLabel = typedLocale === 'de' 
    ? 'Erkunden Sie verwandte Artikel, um mehr über diesen Anwendungsfall zu erfahren:' 
    : typedLocale === 'nl' 
    ? 'Ontdek gerelateerde artikelen om meer te leren over deze use case:'
    : 'Explore related articles to learn more about this use case:';
  const backToUseCasesLabel = typedLocale === 'de' 
    ? '← Zurück zu allen Anwendungsfällen' 
    : typedLocale === 'nl' 
    ? '← Terug naar alle use cases'
    : '← Back to all use cases';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner space-y-10">
          {/* Visual Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.url} className="flex items-center gap-2">
                  {index > 0 && <span className="text-slate-400">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-slate-900 font-medium">{crumb.name}</span>
                  ) : (
                    <Link 
                      href={crumb.url} 
                      className="hover:text-actarion-blue transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

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
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  quality={75}
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

          {/* Further reading section with related blog posts */}
          {content.relatedBlogPosts && content.relatedBlogPosts.length > 0 && (
            <section className="card space-y-4">
              <h2 className="section-subheading">{furtherReadingLabel}</h2>
              <p className="text-slate-700">
                {exploreArticlesLabel}
              </p>
              <ul className="space-y-2">
                {content.relatedBlogPosts.map((post: RelatedBlogPost) => (
                  <li key={post.slug}>
                    <Link
                      href={buildLocalizedPath(typedLocale, `blog/${post.slug}`)}
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Link back to overview */}
          <div className="pt-4 border-t border-slate-200">
            <Link
              href={buildLocalizedPath(typedLocale, "use-cases")}
              className="btn btn-link px-0 inline-flex items-center"
            >
              {backToUseCasesLabel}
            </Link>
          </div>

          <UseCaseCta locale={typedLocale} />
        </div>
      </main>
    </>
  );
}

