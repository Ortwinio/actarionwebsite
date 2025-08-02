import { getDictionary } from "../../../lib/getDictionary";
import PartnerContactPageClient from "./PartnerContactPageClient";

interface PartnerContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PartnerContactPage({ params }: PartnerContactPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <PartnerContactPageClient locale={locale} dictionary={dictionary} />;
} 