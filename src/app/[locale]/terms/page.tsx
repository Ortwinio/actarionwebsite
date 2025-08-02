import { getDictionary } from "../../../lib/getDictionary";
import TermsPageClient from "./TermsPageClient";

interface TermsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <TermsPageClient locale={locale} dictionary={dictionary} />;
} 