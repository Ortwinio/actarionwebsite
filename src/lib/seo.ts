import type { Metadata } from 'next';
import { getPage, getUi, locales, ogLocale, type Locale } from './i18n';
import { pathFor, routes, trailFor, type RouteDef, type RouteKey } from './routes';
import type { FaqItem } from '@/content/types';

/** Production origin. Canonicals always point here, also on preview deployments. */
export const siteUrl = 'https://www.actarion.com';

/** True on Vercel preview/development deployments: everything is noindex there. */
export const isNonProduction = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

/** hreflang map for a route: every locale plus x-default → English. */
export const alternatesFor = (key: RouteKey) => {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(pathFor(key, l));
  languages['x-default'] = absoluteUrl(pathFor(key, 'en'));
  return languages;
};

export function buildMetadata(key: RouteKey, locale: Locale): Metadata {
  const page = getPage(locale, key);
  const def = routes[key] as RouteDef;
  const url = absoluteUrl(pathFor(key, locale));
  const noindex = def.noindex || isNonProduction;
  const image = { url: absoluteUrl(`/og?title=${encodeURIComponent(page.h1)}`), width: 1200, height: 630, alt: page.h1 };

  return {
    // Absolute: titles already contain the brand, so no template suffix.
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url, languages: alternatesFor(key) },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      type: def.type === 'guide' || def.type === 'caseStudy' ? 'article' : 'website',
      url,
      siteName: 'ActARion',
      title: page.metaTitle,
      description: page.metaDescription,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.metaDescription, images: [image.url] },
  };
}

/* ---------- JSON-LD ---------- */

export const organizationId = `${siteUrl}/#organization`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': organizationId,
  name: 'ActARion',
  url: siteUrl,
  logo: absoluteUrl('/Actarionlogo.png'),
  description: 'European platform for AI and AR-guided digital work instructions for manufacturing and field operations.',
  email: 'info@actarion.com',
  legalName: 'ActARion B.V.',
  vatID: 'NL869038606B01',
  address: { '@type': 'PostalAddress', streetAddress: 'Lange Marktstraat 1', postalCode: '8911 AD', addressLocality: 'Leeuwarden', addressCountry: 'NL' },
  // TODO: confirm and complete profiles (Crunchbase, G2, partner pages).
  sameAs: ['https://www.linkedin.com/company/actarion'],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'ActARion',
  inLanguage: [...locales],
  publisher: { '@id': organizationId },
};

export const breadcrumbSchema = (key: RouteKey, locale: Locale) => {
  const ui = getUi(locale);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trailFor(key).map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k === 'home' ? ui.breadcrumbHome : getPage(locale, k).label,
      item: absoluteUrl(pathFor(k, locale)),
    })),
  };
};

export const webPageSchema = (key: RouteKey, locale: Locale) => {
  const page = getPage(locale, key);
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(pathFor(key, locale))}#webpage`,
    url: absoluteUrl(pathFor(key, locale)),
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: locale,
    dateModified: page.updated,
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: { '@id': organizationId },
  };
};

export const faqSchema = (faq: FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const articleSchema = (key: RouteKey, locale: Locale) => {
  const page = getPage(locale, key);
  return {
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: locale,
    dateModified: page.updated,
    datePublished: page.updated,
    mainEntityOfPage: absoluteUrl(pathFor(key, locale)),
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
  };
};

export const howToSchema = (name: string, steps: { title: string; text: string }[]) => ({
  '@type': 'HowTo',
  name,
  step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
});

export const definedTermSchema = (key: RouteKey, locale: Locale) => {
  const page = getPage(locale, key);
  return {
    '@type': 'DefinedTerm',
    name: page.label,
    description: page.definition,
    url: absoluteUrl(pathFor(key, locale)),
    inDefinedTermSet: absoluteUrl(pathFor('glossary', locale)),
  };
};

export const softwareSchema = {
  '@type': 'SoftwareApplication',
  name: 'ActARion',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Windows, Web',
  publisher: { '@id': organizationId },
};

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
