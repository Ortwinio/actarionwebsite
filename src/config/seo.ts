import type { Metadata } from 'next';
import { buildLocalizedPath, Locale, locales } from './site';

export const siteUrl = 'https://www.actarion.com';

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  nl: 'nl_NL',
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

export const buildAlternateLanguages = (segment?: string) =>
  locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = buildLocalizedPath(locale, segment);
    return acc;
  }, {});

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
      availableLanguage: ['English', 'German', 'Dutch'],
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
  availableLanguage: ['English', 'German', 'Dutch'],
};

/**
 * @deprecated Use buildWebSiteWithSearchActionSchema instead for better SEO support
 * Kept for backward compatibility
 */
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

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const buildBreadcrumbListSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.url),
  })),
});

export interface ArticleSchemaInput {
  locale: Locale;
  title: string;
  description: string;
  segment: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  tags?: string[];
}

export const buildArticleSchema = ({
  locale,
  title,
  description,
  segment,
  author,
  datePublished,
  dateModified,
  image,
  tags,
}: ArticleSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  inLanguage: locale,
  author: {
    '@type': 'Person',
    name: author,
  },
  datePublished,
  dateModified: dateModified || datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': toAbsoluteUrl(buildLocalizedPath(locale, segment)),
  },
  image: image ? toAbsoluteUrl(image) : `${siteUrl}/ActARionlogo.png`,
  publisher: {
    '@type': 'Organization',
    name: 'ActARion',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/ActARionlogo.png`,
    },
  },
  ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
});

export interface BlogPostingSchemaInput extends ArticleSchemaInput {
  wordCount?: number;
}

export const buildBlogPostingSchema = (input: BlogPostingSchemaInput) => ({
  ...buildArticleSchema(input),
  '@type': 'BlogPosting',
  ...(input.wordCount && { wordCount: input.wordCount }),
});

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchemaInput {
  locale: Locale;
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  image?: string;
}

export const buildHowToSchema = ({
  locale,
  name,
  description,
  steps,
  totalTime,
  image,
}: HowToSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  inLanguage: locale,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.image && {
      image: toAbsoluteUrl(step.image),
    }),
    ...(step.url && {
      url: toAbsoluteUrl(step.url),
    }),
  })),
  ...(totalTime && { totalTime }),
  ...(image && { image: toAbsoluteUrl(image) }),
});

export interface WebSiteWithSearchActionSchemaInput {
  locale: Locale;
  searchActionUrl?: string;
}

export const buildWebSiteWithSearchActionSchema = ({
  locale,
  searchActionUrl,
}: WebSiteWithSearchActionSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ActARion',
  url: siteUrl,
  inLanguage: locale,
  publisher: {
    '@type': 'Organization',
    name: 'ActARion',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/ActARionlogo.png`,
    },
  },
  ...(searchActionUrl && {
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchActionUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  }),
});

// Enhanced organization schema with social media links
export const getOrganizationSchema = () => ({
  ...organizationSchema,
  sameAs: [
    'https://www.linkedin.com/company/ActARion',
    // Add other social media URLs as they become available
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: ['BE', 'NL', 'LU', 'DE', 'AT', 'CH', 'NO', 'SE', 'FI', 'DK'],
    addressRegion: ['Benelux', 'DACH', 'Nordics'],
  },
});
