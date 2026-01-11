import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema, buildItemListSchema, siteUrl } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { getBlogsForLocale, BlogEntry } from "@/lib/blogs";

interface NewsPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl' }>
}

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

const pageDescriptions = {
  en: "A selection of ActARion news articles and updates. Stay informed about the latest developments in AI and AR–guided work instructions, AR SOPs and digital work instructions.",
  de: "Eine Auswahl von ActARion News-Artikeln und Updates. Bleiben Sie informiert über die neuesten Entwicklungen bei KI- und AR-gestützten Arbeitsanweisungen, AR-SOPs und digitalen Arbeitsanweisungen.",
  nl: "Een selectie van ActARion nieuwsartikelen en updates. Blijf op de hoogte van de laatste ontwikkelingen in AI en AR-gestuurde werkinstructies, AR-SOPs en digitale werkinstructies."
};

// Short SEO descriptions (max 155 chars)
const seoDescriptions = {
  en: "ActARion news and updates on AR work instructions, digital SOPs, and AI for industrial operations. Latest developments and announcements.",
  de: "ActARion-Nachrichten und Updates zu AR-Arbeitsanweisungen, digitalen SOPs und KI für industrielle Abläufe.",
  nl: "ActARion nieuws en updates over AR-werkinstructies, digitale SOPs en AI voor industriële operaties."
};

const pageTitles = {
  en: "News – AR & AI Work Instructions Updates",
  de: "News – Updates zu AR- & KI-Arbeitsanweisungen",
  nl: "Nieuws – AR & AI Werkinstructies Updates"
};

const pageIntros = {
  en: "Stay informed about the latest developments at ActARion. Here you'll find company announcements, partnership updates, product news, and insights on how AI and AR are transforming industrial work across manufacturing, logistics, and energy sectors.",
  de: "Bleiben Sie über die neuesten Entwicklungen bei ActARion informiert. Hier finden Sie Unternehmensankündigungen, Partnerschafts-Updates, Produktneuigkeiten und Einblicke, wie KI und AR die industrielle Arbeit in Fertigung, Logistik und Energie transformieren.",
  nl: "Blijf op de hoogte van de laatste ontwikkelingen bij ActARion. Hier vindt u bedrijfsaankondigingen, partnerschapsupdates, productnieuws en inzichten over hoe AI en AR industrieel werk transformeren in productie, logistiek en energie."
};

const noNewsText = {
  en: "There are no news articles yet. Please check back later or subscribe to our newsletter to stay informed.",
  de: "Es gibt noch keine News-Artikel. Schauen Sie später wieder vorbei oder abonnieren Sie unseren Newsletter, um informiert zu bleiben.",
  nl: "Er zijn nog geen nieuwsartikelen. Kom later terug of schrijf u in voor onze nieuwsbrief om op de hoogte te blijven."
};

const aboutActARionText = {
  en: "ActARion helps industrial companies transform their operations with AI and AR-guided work instructions. We partner with leading technology providers and deploy connected worker solutions that reduce training time, minimise errors, and preserve critical knowledge. Our focus is on manufacturing, logistics, and energy sectors where operational excellence directly impacts safety, quality, and productivity.",
  de: "ActARion hilft Industrieunternehmen, ihre Abläufe mit KI- und AR-gestützten Arbeitsanweisungen zu transformieren. Wir arbeiten mit führenden Technologieanbietern zusammen und setzen Connected-Worker-Lösungen ein, die die Einarbeitungszeit verkürzen, Fehler minimieren und kritisches Wissen bewahren. Unser Fokus liegt auf Fertigung, Logistik und Energie, wo operative Exzellenz direkt Sicherheit, Qualität und Produktivität beeinflusst.",
  nl: "ActARion helpt industriële bedrijven hun operaties te transformeren met AI- en AR-gestuurde werkinstructies. We werken samen met toonaangevende technologieleveranciers en implementeren connected worker-oplossingen die de opleidingstijd verkorten, fouten minimaliseren en kritieke kennis behouden. Onze focus ligt op productie, logistiek en energie, waar operationele excellentie direct van invloed is op veiligheid, kwaliteit en productiviteit."
};

const stayConnectedText = {
  en: "Stay Connected",
  de: "Bleiben Sie verbunden",
  nl: "Blijf verbonden"
};

const stayConnectedDescText = {
  en: "For the latest updates on AR work instructions and industrial digital transformation, follow ActARion on LinkedIn or subscribe to our newsletter.",
  de: "Für die neuesten Updates zu AR-Arbeitsanweisungen und industrieller digitaler Transformation folgen Sie ActARion auf LinkedIn oder abonnieren Sie unseren Newsletter.",
  nl: "Voor de laatste updates over AR-werkinstructies en industriële digitale transformatie, volg ActARion op LinkedIn of schrijf u in voor onze nieuwsbrief."
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const description = seoDescriptions[locale];

  return buildPageMetadata({
    locale,
    // Don't add "| ActARion" - the root layout template will add it
    title: pageTitles[locale],
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
  const aboutActARion = aboutActARionText[locale];
  const stayConnected = stayConnectedText[locale];
  const stayConnectedDesc = stayConnectedDescText[locale];

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
      title,
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
          
          {/* About ActARion section */}
          <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {locale === 'de' ? 'Über ActARion' : locale === 'nl' ? 'Over ActARion' : 'About ActARion'}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-6">
              {aboutActARion}
            </p>
          </section>
          
          {/* Stay Connected section */}
          <section className="mt-8 pt-6 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              {stayConnected}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              {stayConnectedDesc}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
