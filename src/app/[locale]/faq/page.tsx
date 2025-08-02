import { getDictionary } from "../../../lib/getDictionary";
import FAQPageClient from "./FAQPageClient";

interface FAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <FAQPageClient locale={locale} dictionary={dictionary} />;
} 