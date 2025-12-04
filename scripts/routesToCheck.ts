/**
 * Canonical routes to check for locale coverage
 * 
 * This file defines the key routes that should exist in all locales (EN, NL, DE).
 * Used by checkLocales.ts and can be imported by other QA scripts.
 */

export const staticSegments = [
  undefined,           // locale root (home)
  "about",
  "contact",
  "demo",
  "partner-contact",
  "career",
  "faq",
  "privacy",
  "terms",
  "use-cases",
  "events",
  "whitepapers",
  "videos",
  "news",
  "blog",
  "vision",
  "management",
  "services",
];

export const useCaseSegments = [
  "ar-preventive-maintenance",
  "ar-training-and-onboarding",
  "ar-guided-assembly-production",
  "ar-remote-expert-support-corrective-maintenance",
  "ar-guided-changeover-batch-preparation",
  "ar-work-instructions-corporate-memory",
];

export const locales = ["en", "nl", "de"] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = "en";

/**
 * Build full route list for a locale
 */
export function buildRoutes(locale: Locale): string[] {
  const routes: string[] = [];
  
  // Static pages
  staticSegments.forEach(segment => {
    routes.push(`/${locale}${segment ? `/${segment}` : ""}`);
  });
  
  // Use case pages
  useCaseSegments.forEach(segment => {
    routes.push(`/${locale}/${segment}`);
  });
  
  return routes;
}

/**
 * Get all routes for all locales
 */
export function getAllRoutes(): { locale: Locale; route: string }[] {
  const allRoutes: { locale: Locale; route: string }[] = [];
  
  locales.forEach(locale => {
    buildRoutes(locale).forEach(route => {
      allRoutes.push({ locale, route });
    });
  });
  
  return allRoutes;
}

