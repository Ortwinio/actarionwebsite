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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle legacy non-localized paths
  if (pathname === '/faq') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/faq`, request.url));
  }
  if (pathname === '/blog') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/blog`, request.url));
  }
  
  // Check if the pathname already has a locale
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (matchedLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-actarion-locale', matchedLocale);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect if there is no locale
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