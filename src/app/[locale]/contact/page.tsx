import { getDictionary } from "../../../lib/getDictionary";
import ContactPageClient from "./ContactPageClient";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <ContactPageClient locale={locale} dictionary={dictionary} />;
} 