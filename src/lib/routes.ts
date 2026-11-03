/**
 * Route registry, built from the page catalogue (src/content/catalog.ts).
 * Canonicals, hreflang, breadcrumbs, navigation, sitemap.xml, the HTML sitemap and
 * llms.txt are all derived from here, so URLs are defined in exactly one place.
 */
import { catalog, type PageType } from '@/content/catalog';
import type { Locale } from './i18n';

export type { PageType };
export type RouteKey = string;

export interface RouteDef {
  key: RouteKey;
  type: PageType;
  parent?: RouteKey;
  phase: 1 | 2 | 3;
  slugs: Record<Locale, string>;
  labels: Record<Locale, string>;
  keyword?: string;
  noindex?: boolean;
}

export const routes: Record<RouteKey, RouteDef> = Object.fromEntries(
  catalog.map(([key, type, parent, phase, en, nl, de, enL, nlL, deL, keyword]) => [
    key,
    { key, type, parent: parent ?? undefined, phase, slugs: { en, nl, de }, labels: { en: enL, nl: nlL, de: deL }, keyword, noindex: type === 'roiReport' || undefined },
  ]),
);

export const routeKeys: RouteKey[] = catalog.map((r) => r[0]);

/* Build-time integrity checks: a broken catalogue fails the build instead of shipping 404s. */
(() => {
  const seen: Record<string, Set<string>> = { en: new Set(), nl: new Set(), de: new Set() };
  for (const k of routeKeys) {
    const r = routes[k];
    if (r.parent && !routes[r.parent]) throw new Error(`Route ${k}: unknown parent ${r.parent}`);
    for (const l of ['en', 'nl', 'de'] as const) {
      const s = r.slugs[l];
      if (seen[l].has(s)) throw new Error(`Duplicate ${l} slug: ${s}`);
      if (s !== s.toLowerCase() || /[^a-z0-9/-]/.test(s)) throw new Error(`Invalid ${l} slug: ${s}`);
      seen[l].add(s);
    }
  }
})();

export const pathFor = (key: RouteKey, locale: Locale): string => {
  const slug = routes[key].slugs[locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
};

export const resolveSlug = (locale: Locale, slug: string): RouteKey | undefined =>
  routeKeys.find((k) => routes[k].type !== 'home' && routes[k].slugs[locale] === slug);

export const trailFor = (key: RouteKey): RouteKey[] => {
  const trail: RouteKey[] = [];
  let current: RouteKey | undefined = key;
  while (current) {
    trail.unshift(current);
    current = routes[current].parent;
  }
  return trail;
};

export const childrenOf = (key: RouteKey): RouteKey[] => routeKeys.filter((k) => routes[k].parent === key);

export const ofType = (type: PageType): RouteKey[] => routeKeys.filter((k) => routes[k].type === type);
