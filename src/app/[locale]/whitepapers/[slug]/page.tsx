import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import WhitepaperClient from "./WhitepaperClient";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "@/config/site";
import { buildPageMetadata, buildWebPageSchema, getAbsoluteUrl, siteUrl } from "@/config/seo";
import { getAllPublishedWhitepaperSlugs, getWhitepaperBySlug } from "@/lib/whitepapers";

/**
 * Force static rendering to ensure metadata is included in initial HTML shell.
 */
export const dynamic = 'force-static';

interface WhitepaperPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: WhitepaperPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const resolved = getWhitepaperBySlug(typedLocale, slug)
  if (!resolved) {
    return {
      title: 'Whitepaper Not Found',
      description: 'The requested whitepaper could not be found.',
    }
  }

  const { whitepaper } = resolved

  const pageTitle = whitepaper.seoTitle || whitepaper.title;
  const pageDescription = whitepaper.seoDescription || whitepaper.description;
  
  const metadata = buildPageMetadata({
    locale: typedLocale,
    title: pageTitle,
    description: pageDescription,
    segment: `whitepapers/${whitepaper.slug}`,
    type: 'article',
  })

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: whitepaper.publishedAt,
      modifiedTime: whitepaper.updatedAt,
      authors: [whitepaper.author],
    },
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  const uniqueSlugs = getAllPublishedWhitepaperSlugs()
  return uniqueSlugs.flatMap(slug => locales.map(locale => ({ locale, slug })))
}

// FAQ data for the ROI Calculator Guide
const roiCalculatorFAQ = [
  {
    question: "Is the ROI calculator conservative or optimistic?",
    answer: "The calculator uses conservative default values based on median outcomes from published case studies. Most organizations that implement AR-guided work instructions systematically report results at or above these benchmarks. However, actual results depend on process complexity, baseline maturity, and implementation quality."
  },
  {
    question: "Does the calculator include hardware costs?",
    answer: "The quick calculator focuses on operational savings and does not include hardware or implementation costs. The detailed calculator allows you to input total project costs (hardware, software, training, integration) to calculate net ROI and payback period."
  },
  {
    question: "Can this be used for logistics or energy operations?",
    answer: "Yes. While the default assumptions are based primarily on manufacturing data, the methodology applies to any environment where frontline workers follow procedures—including warehousing, field service, and energy operations. Adjust the input parameters to reflect your specific context."
  },
  {
    question: "What data is needed for accurate results?",
    answer: "For the most accurate estimate, you should provide: Number of new hires or role changes per year, average training duration (days or hours), current error or rework rate (%), unplanned downtime hours per year, fully loaded hourly cost of operators/technicians, and number of senior experts approaching retirement (if applicable)."
  }
];

export default async function WhitepaperPage({ params }: WhitepaperPageProps) {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const resolved = getWhitepaperBySlug(typedLocale, slug)
  if (!resolved) {
    notFound()
  }

  const { whitepaper, isFallback } = resolved
  const canonicalPath = buildLocalizedPath(typedLocale, `whitepapers/${whitepaper.slug}`)
  const absoluteUrl = `${siteUrl}${canonicalPath}`
  
  // Build structured data with TechArticle and FAQPage schemas
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: whitepaper.title,
      description: whitepaper.description,
      segment: `whitepapers/${whitepaper.slug}`,
    }),
    // TechArticle schema
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: whitepaper.title,
      description: whitepaper.description,
      datePublished: whitepaper.publishedAt,
      dateModified: whitepaper.updatedAt,
      inLanguage: typedLocale,
      author: {
        '@type': 'Organization',
        name: 'ActARion',
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ActARion',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/ActARionlogo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl,
      },
      image: `${siteUrl}/ActARionlogo.png`,
    },
    // FAQPage schema (only for ROI calculator guide)
    ...(slug === 'roi-calculator-guide' ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: roiCalculatorFAQ.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }] : []),
  ]

  return (
    <>
      <PageHeader
        title={whitepaper.title}
        subtitle={whitepaper.description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="section section-light">
        <div className="section-inner max-w-4xl">
          <WhitepaperClient whitepaper={whitepaper as any} locale={typedLocale} isFallback={isFallback} />
        </div>
      </main>
    </>
  );
}
