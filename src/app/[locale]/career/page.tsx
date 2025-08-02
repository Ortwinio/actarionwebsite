import { getDictionary } from "../../../lib/getDictionary";
import CareerPageClient from "./CareerPageClient";

interface CareerPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <CareerPageClient locale={locale} dictionary={dictionary} />;
} 