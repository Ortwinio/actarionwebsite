import { getDictionary } from "../../lib/getDictionary";
import HomePageClient from "./HomePageClient";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <HomePageClient locale={locale} dictionary={dictionary} />;
}