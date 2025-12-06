import { redirect } from "next/navigation";
import { locales } from "../../../config/site";

interface PartnerContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

/**
 * Partner contact page now redirects to the main partners page.
 */
export default async function PartnerContactPage({ params }: PartnerContactPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/partners`);
}
