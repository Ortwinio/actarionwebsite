'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isSupportedLocale, defaultLocale } from '../config/site';

/**
 * Client component that sets the correct HTML lang attribute based on the URL.
 * This is a workaround for Next.js middleware header propagation issues in development mode.
 * In production, static generation should handle this correctly, but this component
 * ensures correctness in all environments.
 */
export function HtmlLangSetter() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Extract locale from pathname: /en/... or /nl/... or /de/...
    const match = pathname?.match(/^\/([a-z]{2})(\/|$)/);
    const locale = match && isSupportedLocale(match[1]) ? match[1] : defaultLocale;
    
    // Update HTML lang attribute if it doesn't match
    const htmlElement = document.documentElement;
    if (htmlElement.lang !== locale) {
      htmlElement.lang = locale;
    }
  }, [pathname]);
  
  return null;
}






