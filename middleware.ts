import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de', 'nl'];
const defaultLocale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang.substring(0, 2)));
    
    if (preferredLocale) {
      return preferredLocale.substring(0, 2);
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle old FAQ path redirect
  if (pathname === '/faq') {
    return NextResponse.redirect(new URL('/en/faq', request.url));
  }
  // Redirect non-localized blog root to default locale
  if (pathname === '/blog') {
    return NextResponse.redirect(new URL('/en/blog', request.url));
  }
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Handle root path specially
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