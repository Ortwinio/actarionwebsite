import { PageHeader } from "@/components/PageHeader";
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
  const heroTitle =
    dictionary?.hero?.title ||
    "Revolutionize SOP Execution with Augmented Reality";
  const heroSubtitle =
    dictionary?.hero?.subtitle ||
    "ActARion delivers step-by-step AR work instructions that keep frontline teams safer, faster, and more consistent.";

  return (
    <>
      <PageHeader
        title={heroTitle}
        subtitle={heroSubtitle}
      />
      <HomePageClient locale={locale} dictionary={dictionary} />
    </>
  );
} 