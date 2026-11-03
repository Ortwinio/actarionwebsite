/**
 * V2 route registry — single source of truth for every page of the new site.
 *
 * Each route has a stable key, a page type (which template renders it) and a
 * localized slug per locale. Everything SEO-related is derived from this file:
 * canonical URLs, hreflang alternates, breadcrumbs, sitemap entries and the
 * language switcher (which always links to the translated counterpart).
 */
import type { Locale } from './i18n';


export type PageType =
  | 'home'
  | 'pillar'
  | 'hub'
  | 'useCase'
  | 'industry'
  | 'template'
  | 'guide'
  | 'glossaryTerm'
  | 'comparison'
  | 'caseStudy'
  | 'roi'
  | 'pilot';

export interface RouteDef {
  type: PageType;
  /** Localized path below the locale prefix ('' = locale home). */
  slugs: Record<Locale, string>;
  /** Parent route key, used for breadcrumbs. */
  parent?: string;
  /** Exclude from sitemap and add noindex (e.g. internal overview pages). */
  noindex?: boolean;
}

const r = <T extends Record<string, RouteDef>>(routes: T) => routes;

export const routes = r({
  home: { type: 'home', slugs: { en: '', nl: '', de: '' } },

  // Pillar
  digitalWorkInstructions: {
    type: 'pillar',
    slugs: { en: 'digital-work-instructions', nl: 'digitale-werkinstructies', de: 'digitale-arbeitsanweisungen' },
    parent: 'home',
  },

  // Use cases
  useCases: { type: 'hub', slugs: { en: 'use-cases', nl: 'toepassingen', de: 'anwendungsfaelle' }, parent: 'home' },
  ucChangeover: {
    type: 'useCase',
    slugs: { en: 'use-cases/changeover-smed', nl: 'toepassingen/omstellen-smed', de: 'anwendungsfaelle/ruesten-smed' },
    parent: 'useCases',
  },
  ucTraining: {
    type: 'useCase',
    slugs: { en: 'use-cases/training-onboarding', nl: 'toepassingen/training-inwerken', de: 'anwendungsfaelle/schulung-einarbeitung' },
    parent: 'useCases',
  },

  // Industries
  industries: { type: 'hub', slugs: { en: 'industries', nl: 'sectoren', de: 'branchen' }, parent: 'home' },
  indPharma: {
    type: 'industry',
    slugs: { en: 'industries/pharma', nl: 'sectoren/farma', de: 'branchen/pharma' },
    parent: 'industries',
  },

  // Resources
  resources: { type: 'hub', slugs: { en: 'resources', nl: 'kennisbank', de: 'wissen' }, parent: 'home' },
  tplWorkInstruction: {
    type: 'template',
    slugs: {
      en: 'resources/work-instruction-template',
      nl: 'kennisbank/werkinstructie-template',
      de: 'wissen/arbeitsanweisung-vorlage',
    },
    parent: 'resources',
  },
  guideWriteWorkInstructions: {
    type: 'guide',
    slugs: {
      en: 'resources/how-to-write-work-instructions',
      nl: 'kennisbank/werkinstructie-schrijven',
      de: 'wissen/arbeitsanweisung-erstellen',
    },
    parent: 'resources',
  },
  glossary: { type: 'hub', slugs: { en: 'glossary', nl: 'woordenlijst', de: 'glossar' }, parent: 'resources' },
  termSmed: {
    type: 'glossaryTerm',
    slugs: { en: 'glossary/smed', nl: 'woordenlijst/smed', de: 'glossar/smed' },
    parent: 'glossary',
  },
  cmpDigitalVsPaper: {
    type: 'comparison',
    slugs: {
      en: 'compare/digital-vs-paper-work-instructions',
      nl: 'vergelijk/digitale-vs-papieren-werkinstructies',
      de: 'vergleich/digitale-vs-papier-arbeitsanweisungen',
    },
    parent: 'resources',
  },

  // Customers
  customers: { type: 'hub', slugs: { en: 'customers', nl: 'klanten', de: 'kunden' }, parent: 'home' },
  caseChangeover: {
    type: 'caseStudy',
    slugs: {
      en: 'customers/changeover-time-reduction',
      nl: 'klanten/kortere-omsteltijd',
      de: 'kunden/kuerzere-ruestzeit',
    },
    parent: 'customers',
  },

  // Conversion
  roiCalculator: { type: 'roi', slugs: { en: 'roi-calculator', nl: 'roi-calculator', de: 'roi-rechner' }, parent: 'home' },
  pilot: { type: 'pilot', slugs: { en: 'request-pilot', nl: 'pilot-aanvragen', de: 'pilot-anfragen' }, parent: 'home' },
});

export type RouteKey = keyof typeof routes;

export const routeKeys = Object.keys(routes) as RouteKey[];

/** Locale-prefixed path for a route, without trailing slash. */
export const pathFor = (key: RouteKey, locale: Locale): string => {
  const slug = routes[key].slugs[locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
};

/** Resolve a catch-all slug (below the locale) to a route key. */
export const resolveSlug = (locale: Locale, slug: string): RouteKey | undefined =>
  routeKeys.find((k) => routes[k].type !== 'home' && routes[k].slugs[locale] === slug);

/** Ancestors from home down to (and including) the route itself. */
export const trailFor = (key: RouteKey): RouteKey[] => {
  const trail: RouteKey[] = [];
  let current: RouteKey | undefined = key;
  while (current) {
    trail.unshift(current);
    current = (routes[current] as RouteDef).parent as RouteKey | undefined;
  }
  return trail;
};

export const childrenOf = (key: RouteKey): RouteKey[] =>
  routeKeys.filter((k) => (routes[k] as RouteDef).parent === key);
