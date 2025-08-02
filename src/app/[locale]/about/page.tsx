import { getDictionary } from "../../../lib/getDictionary";
import AboutPageClient from "./AboutPageClient";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <AboutPageClient locale={locale} dictionary={dictionary} />;
} 