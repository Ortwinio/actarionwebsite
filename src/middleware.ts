import { NextResponse, type NextRequest } from 'next/server';
import { catalog } from './content/catalog';
import { legacyRedirects } from './content/legacy-redirects';

const LOCALES = ['en', 'nl', 'de'];
const PUBLIC_FILE = /\.[a-z0-9]+$/i;
const nonProd = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';

/**
 * - No automatic language detection (no IP / Accept-Language redirects): crawlers and
 *   users always get the URL they asked for. Paths without a locale go to English (301).
 * - Preview deployments get X-Robots-Tag: noindex on every response.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];

  let res: NextResponse;
  if (LOCALES.includes(first) || PUBLIC_FILE.test(pathname)) {
    res = NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    // Old non-localized URL with a known new home: go there in one hop.
    const legacy = legacyRedirects[pathname.replace(/^\/|\/$/g, '')];
    const row = legacy ? catalog.find((r) => r[0] === legacy) : undefined;
    url.pathname = row ? `/en/${row[4]}` : `/en${pathname === '/' ? '' : pathname}`;
    res = NextResponse.redirect(url, 301);
  }
  if (nonProd) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/((?!_next/|api/|og|sitemap.xml|robots.txt|llms.txt|favicon).*)'],
};
