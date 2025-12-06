import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "../../lib/getDictionary";
import { buildPageMetadata } from "../../config/seo";
import { isSupportedLocale, Locale, locales } from "../../config/site";
import HomePageClient from "./HomePageClient";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Force static generation for all locales to ensure metadata
 * is included in the initial HTML, not streamed.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

// Home page metadata with title to ensure it's in <head>
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    return { title: "Not Found" };
  }

  const dictionary = await getDictionary(locale as Locale);
  const siteTitle = dictionary?.metadata?.title || "ActARion";
  const description = dictionary?.metadata?.description || 
    "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.";

  return buildPageMetadata({
    locale: locale as Locale,
    title: `${siteTitle} - Action with AR Revolutionize Excellence`,
    description,
    // Empty segment for home page (will resolve to /{locale})
    segment: undefined,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    notFound();
  }
  
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <HomePageClient locale={locale} dictionary={dictionary} />;
}