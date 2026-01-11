import { Metadata } from "next";
import { getDictionary } from "../../lib/getDictionary";
import HomePageClient from "./HomePageClient";
import NewsletterPopup from "../../components/newsletter/NewsletterPopup";
import { buildPageMetadata } from "../../config/seo";
import { isSupportedLocale, Locale } from "../../config/site";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Force static rendering to ensure metadata is included in initial HTML shell.
 * This prevents title/canonical/robots from being streamed outside <head>.
 */
export const dynamic = 'force-static';

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    return {
      title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    };
  }

  const typedLocale = locale as Locale;
  
  return buildPageMetadata({
    locale: typedLocale,
    title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
    segment: undefined, // homepage has no segment
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return (
    <>
      <NewsletterPopup />
      <HomePageClient locale={locale} dictionary={dictionary} />
    </>
  );
}