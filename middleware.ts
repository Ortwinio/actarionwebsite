import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isSupportedLocale, locales, Locale } from './src/config/site';

// Get the preferred locale from the request
function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .map(lang => lang.substring(0, 2))
      .find(isSupportedLocale);
    
    if (preferredLocale) {
      return preferredLocale;
    }
  }
  return defaultLocale;
}

/**
 * SEO-optimized middleware for ActARion
 * 
 * Handles:
 * 1. Legacy non-localized paths → redirect to default locale
 * 2. Locale detection and routing
 * 3. Request header injection for locale context
 * 
 * @see docs/seo-issues-overview.md for full documentation
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files like .png, .ico, etc.
  ) {
    return NextResponse.next();
  }
  
  // Check if the pathname already has a locale
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (matchedLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-actarion-locale', matchedLocale);
    // Also set x-url for additional reliability in root layout
    requestHeaders.set('x-url', request.nextUrl.pathname);
    
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
    // Set a cookie for the locale - this is more reliable than headers
    response.cookies.set('NEXT_LOCALE', matchedLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    
    return response;
  }

  // Handle legacy non-localized paths - redirect to default locale [[memory:6499461]]
  // These redirects ensure no 404s for old bookmarks or external links
  const legacyPathMappings: Record<string, string> = {
    '/faq': '/faq',
    '/blog': '/blog',
    '/about': '/about',
    '/contact': '/contact',
    '/career': '/career',
    '/careers': '/career',
    '/jobs': '/career',
    '/use-cases': '/use-cases',
    '/usecases': '/use-cases',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/partner-contact': '/partner-contact',
    '/partners': '/partner-contact',
    '/events': '/events',
    '/whitepapers': '/whitepapers',
    '/videos': '/videos',
    '/news': '/news',
    '/demo': '/contact',
    '/request-demo': '/contact',
    '/book-demo': '/contact',
  };

  // Check if this is a known legacy path
  const normalizedPath = pathname.toLowerCase();
  if (legacyPathMappings[normalizedPath]) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${legacyPathMappings[normalizedPath]}`, request.url)
    );
  }

  // Handle legacy paths that start with known prefixes
  const legacyPrefixes = [
    '/use-cases/',
    '/usecases/',
    '/blog/',
    '/blogs/',
    '/faq/',
    '/explainer/',
    '/resources/',
  ];
  
  for (const prefix of legacyPrefixes) {
    if (normalizedPath.startsWith(prefix)) {
      // Redirect to localized version
      return NextResponse.redirect(
        new URL(`/${defaultLocale}${pathname}`, request.url)
      );
    }
  }

  // Redirect if there is no locale - add locale prefix
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  if (pathname === '/') {
    newUrl.pathname = `/${locale}`;
  }
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 