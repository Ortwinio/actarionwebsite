import { getPage, locales } from '@/lib/i18n';
import { pathFor, routeKeys, routes, type RouteDef } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

/** llms.txt: a curated map of the site for AI assistants, generated from the route registry. */
export function GET() {
  const en = getPage('en', 'home');
  const lines = [
    '# ActARion',
    '',
    `> ${en.answer}`,
    '',
    ...locales.flatMap((l) => [
      `## ${l.toUpperCase()}`,
      ...routeKeys
        .filter((k) => !(routes[k] as RouteDef).noindex)
        .map((k) => `- [${getPage(l, k).label}](${absoluteUrl(pathFor(k, l))}): ${getPage(l, k).metaDescription}`),
      '',
    ]),
  ];
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
