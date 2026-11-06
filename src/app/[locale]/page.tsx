import type { Metadata } from 'next';
import { RenderPage } from '@/templates';
import { isLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildMetadata('home', locale) : {};
}

export default async function Home({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <RenderPage routeKey="home" locale={locale} />;
}
