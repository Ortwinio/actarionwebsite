import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema, buildItemListSchema, siteUrl } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { getBlogsForLocale, BlogEntry } from "@/lib/blogs";

interface NewsPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl' }>
}

const pageDescriptions = {
  en: "A selection of ActARion news articles and updates. Stay informed about the latest developments in AI and AR–guided work instructions, AR SOPs and digital work instructions.",
  de: "Eine Auswahl von ActARion News-Artikeln und Updates. Bleiben Sie informiert über die neuesten Entwicklungen bei KI- und AR-gestützten Arbeitsanweisungen, AR-SOPs und digitalen Arbeitsanweisungen.",
  nl: "Een selectie van ActARion nieuwsartikelen en updates. Blijf op de hoogte van de laatste ontwikkelingen in AI en AR-gestuurde werkinstructies, AR-SOPs en digitale werkinstructies."
};

const pageTitles = {
  en: "News – AR & AI Work Instructions Updates",
  de: "News – Updates zu AR- & KI-Arbeitsanweisungen",
  nl: "Nieuws – AR & AI Werkinstructies Updates"
};

const pageIntros = {
  en: "A selection of ActARion news articles and updates. This overview includes all blogposts whose title starts with \"News\".",
  de: "Eine Auswahl von ActARion News-Artikeln und Updates. Diese Übersicht enthält alle Blogbeiträge, deren Titel mit \"News\" beginnt.",
  nl: "Een selectie van ActARion nieuwsartikelen en updates. Dit overzicht bevat alle blogposts waarvan de titel begint met \"News\"."
};

const noNewsText = {
  en: "There are no news articles yet. Please check back later or subscribe to our newsletter to stay informed.",
  de: "Es gibt noch keine News-Artikel. Schauen Sie später wieder vorbei oder abonnieren Sie unseren Newsletter, um informiert zu bleiben.",
  nl: "Er zijn nog geen nieuwsartikelen. Kom later terug of schrijf u in voor onze nieuwsbrief om op de hoogte te blijven."
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const description = pageDescriptions[locale];

  return buildPageMetadata({
    locale,
    title: `${pageTitles[locale]} | ActARion`,
    description,
    segment: 'news',
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;

  const title = pageTitles[locale];
  const description = pageDescriptions[locale];
  const intro = pageIntros[locale];
  const noNews = noNewsText[locale];

  // Get all blog posts for this locale
  const { blogs } = getBlogsForLocale(typedLocale);
  
  // Filter for posts whose title starts with "News" (case-sensitive as requested)
  const newsPosts = blogs.filter((post: BlogEntry) => 
    post.title?.trim().startsWith("News")
  );

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: dictionary?.navigation?.home || 'Home', url: buildLocalizedPath(typedLocale) },
    { name: title, url: buildLocalizedPath(typedLocale, 'news') },
  ];

  // Build structured data
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: `${title} | ActARion`,
      description,
      segment: 'news',
    }),
    buildBreadcrumbListSchema(breadcrumbs),
    ...(newsPosts.length > 0 ? [buildItemListSchema(
      newsPosts.map((post: BlogEntry) => ({
        name: post.title,
        description: post.description,
        url: `${siteUrl}${buildLocalizedPath(typedLocale, `blog/${post.slug}`)}`,
      }))
    )] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader title={title} subtitle={intro} />
      <main className="section section-light">
        <div className="section-inner space-y-8">
          {newsPosts.length === 0 ? (
            <div className="summary summary--floating">
              <p className="text-base">{noNews}</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {newsPosts.map((post: BlogEntry) => (
                <li key={post.slug} className="card hover:shadow-lg transition-shadow">
                  <article className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {post.publishedAt &&
                        new Date(post.publishedAt).toLocaleDateString(
                          locale === 'de' ? 'de-DE' : locale === 'nl' ? 'nl-NL' : 'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                    </p>
                    <Link
                      href={buildLocalizedPath(typedLocale, `blog/${post.slug}`)}
                      className="block group"
                    >
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-actarion-blue transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    {post.description && (
                      <p className="text-base text-slate-600 dark:text-slate-300 line-clamp-3">
                        {post.description}
                      </p>
                    )}
                    <Link
                      href={buildLocalizedPath(typedLocale, `blog/${post.slug}`)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-actarion-blue hover:underline"
                    >
                      {locale === 'de' ? 'Weiterlesen' : locale === 'nl' ? 'Lees meer' : 'Read more'}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Array<"en" | "de" | "nl"> = ["en", "de", "nl"];
  return locales.map((l) => ({ locale: l }));
}
