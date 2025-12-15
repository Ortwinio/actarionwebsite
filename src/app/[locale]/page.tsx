import { getDictionary } from "../../lib/getDictionary";
import HomePageClient from "./HomePageClient";
import NewsletterPopup from "../../components/newsletter/NewsletterPopup";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
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