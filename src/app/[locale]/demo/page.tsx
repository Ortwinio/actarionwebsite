import { getDictionary } from "../../../lib/getDictionary";
import DemoPageClient from "./DemoPageClient";

interface DemoPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return <DemoPageClient locale={locale} dictionary={dictionary} />;
}

