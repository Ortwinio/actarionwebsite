import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { UseCaseCta } from "../../components/UseCaseCta";
import YouTubeEmbed from "../../components/media/YouTubeEmbed";
import {
  buildPageMetadata,
  buildTechArticleSchema,
  buildWebPageSchema,
} from "../../config/seo";
import { isSupportedLocale, Locale } from "../../config/site";
import type { UseCase } from "../../config/useCases";
import { getUseCaseBySlug } from "../../config/useCases";
import {
  UseCaseContentBlock,
  getUseCaseContent,
} from "../../config/useCaseContent";
import { useCaseVideosBySlug } from "../../config/useCaseVideos";

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

    // Use seoTitle if available, otherwise fall back to title
    const metaTitle = useCase.seoTitle || useCase.title;
    
    return buildPageMetadata({
      locale,
      title: metaTitle,
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
    ];

    const [firstParagraph, ...restParagraphs] = content.heroParagraphs;
    const subtitle = firstParagraph || useCase.metaDescription;

    // Get YouTube video for this use case
    const video = useCaseVideosBySlug[slug];

    // Dev-only warning for missing video mappings
    if (process.env.NODE_ENV !== "production" && !video) {
      console.warn(`[UseCase] Missing YouTube video mapping for slug: ${slug}`);
    }

    return (
      <>
        <PageHeader
          title={content.heroTitle}
          subtitle={subtitle}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <main className="section section-light">
          <div className="section-inner space-y-10">
            {restParagraphs.length > 0 && (
              <section className="space-y-3">
                {restParagraphs.map((paragraph, index) => (
                  <p
                    key={`hero-${index}`}
                    className="section-lead text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            )}

            {/* YouTube video embed */}
            {video && (
              <section aria-label="Use case video" className="mt-6">
                <YouTubeEmbed videoId={video.id} title={video.title} />
              </section>
            )}

            {content.sections.map((section) => (
              <section key={section.title} className="card space-y-3">
                <h2 className="section-subheading">{section.title}</h2>
                {section.blocks.map((block, index) => renderBlock(block, index))}
              </section>
            ))}

            <UseCaseCta locale={typedLocale} />
          </div>
        </main>
      </>
    );
  }

  // Export dynamic config for Next.js page rendering
  const dynamic = "force-static" as const;

  return { Page, generateMetadata, dynamic };
}


