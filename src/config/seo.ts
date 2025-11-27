import type { Metadata } from 'next';
import { buildLocalizedPath, defaultLocale, Locale, locales } from './site';

export const siteUrl = 'https://www.actarion.com';

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  nl: 'nl_NL',
  de: 'de_DE',
};

export interface SocialImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

const defaultSocialImage: SocialImage = {
  url: '/ActARionlogo.png',
  width: 1200,
  height: 630,
  alt: 'ActARion - AR-Powered SOP Solutions',
};

const toAbsoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${siteUrl}${path}`;

const withAbsoluteImage = (image: SocialImage) => ({
  ...image,
  url: toAbsoluteUrl(image.url),
});

export const getAbsoluteUrl = (path: string) => toAbsoluteUrl(path);

export const buildAlternateLanguages = (segment?: string) => {
  const alternates = locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = buildLocalizedPath(locale, segment);
    return acc;
  }, {});
  // Add x-default pointing to English (default locale)
  alternates['x-default'] = buildLocalizedPath(defaultLocale, segment);
  return alternates;
};

export interface PageMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  segment?: string;
  image?: SocialImage;
  type?: 'website' | 'article';
}

export const buildPageMetadata = ({
  locale,
  title,
  description,
  segment,
  image = defaultSocialImage,
  type = 'website',
}: PageMetadataInput): Metadata => {
  const canonicalPath = buildLocalizedPath(locale, segment);
  const absoluteUrl = toAbsoluteUrl(canonicalPath);
  const ogImage = withAbsoluteImage(image);

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalPath,
      languages: buildAlternateLanguages(segment),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: 'ActARion',
      locale: openGraphLocales[locale],
      type,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
};

export interface WebPageSchemaInput {
  locale: Locale;
  title: string;
  description: string;
  segment?: string;
}

export const buildWebPageSchema = ({
  locale,
  title,
  description,
  segment,
}: WebPageSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  inLanguage: locale,
  url: toAbsoluteUrl(buildLocalizedPath(locale, segment)),
  isPartOf: siteUrl,
});

export interface TechArticleSchemaInput {
  locale: Locale;
  title: string;
  description: string;
  segment: string;
}

export const buildTechArticleSchema = ({
  locale,
  title,
  description,
  segment,
}: TechArticleSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  name: title,
  description,
  inLanguage: locale,
  mainEntityOfPage: toAbsoluteUrl(buildLocalizedPath(locale, segment)),
});

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ActARion',
  url: siteUrl,
  logo: `${siteUrl}/ActARionlogo.png`,
  sameAs: [] as string[],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: ['Benelux', 'DACH', 'Nordics'],
      availableLanguage: ['English', 'Dutch', 'German'],
      email: 'hello@actarion.com',
    },
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ActARion',
  url: siteUrl,
  serviceType: 'Augmented reality SOP platform and implementation services',
  areaServed: [
    'Belgium',
    'Netherlands',
    'Luxembourg',
    'Germany',
    'Austria',
    'Switzerland',
    'Norway',
    'Sweden',
    'Finland',
    'Denmark',
  ],
  availableLanguage: ['English', 'Dutch', 'German'],
};

export const buildWebsiteSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ActARion',
  url: siteUrl,
  inLanguage: locale,
  publisher: {
    '@type': 'Organization',
    name: 'ActARion',
  },
});

export interface ItemListEntry {
  name: string;
  description?: string;
  url: string;
}

export const buildItemListSchema = (items: ItemListEntry[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    description: item.description,
    url: item.url,
  })),
});
