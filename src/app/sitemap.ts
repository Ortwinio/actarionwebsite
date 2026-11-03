import type { MetadataRoute } from 'next';
import { getPage, locales } from '@/lib/i18n';
import { pathFor, routeKeys, routes, type RouteDef } from '@/lib/routes';
import { absoluteUrl, alternatesFor } from '@/lib/seo';

/** One entry per page per language, with hreflang alternates and real lastmod dates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routeKeys
    .filter((k) => !(routes[k] as RouteDef).noindex)
    .flatMap((k) =>
      locales.map((l) => ({
        url: absoluteUrl(pathFor(k, l)),
        lastModified: getPage(l, k).updated,
        alternates: { languages: alternatesFor(k) },
      })),
    );
}
