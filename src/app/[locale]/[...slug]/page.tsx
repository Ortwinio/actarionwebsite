import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RenderPage } from '@/templates';
import { isLocale, locales } from '@/lib/i18n';
import { resolveSlug, routeKeys, routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ locale: string; slug: string[] }> };

// Every page is generated at build time (SSG): full HTML for search engines and AI crawlers.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    routeKeys
      .filter((k) => routes[k].type !== 'home')
      .map((k) => ({ locale, slug: routes[k].slugs[locale].split('/') })),
  );
}

async function resolve(params: Params['params']) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const key = resolveSlug(locale, slug.join('/'));
  return key ? { locale, key } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = await resolve(params);
  return r ? buildMetadata(r.key, r.locale) : {};
}

export default async function Page({ params }: Params) {
  const r = await resolve(params);
  if (!r) notFound();
  return <RenderPage routeKey={r.key} locale={r.locale} />;
}
