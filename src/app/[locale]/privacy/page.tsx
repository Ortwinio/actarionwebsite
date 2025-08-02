import { getDictionary } from "../../../lib/getDictionary";
import PrivacyPageClient from "./PrivacyPageClient";

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <PrivacyPageClient locale={locale} dictionary={dictionary} />;
} 