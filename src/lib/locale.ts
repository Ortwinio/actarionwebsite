/** Client-safe locale helpers (no content imports, so nothing heavy ends up in the browser bundle). */
export const locales = ['en', 'nl', 'de'] as const;
export type Locale = (typeof locales)[number];
export const numberLocale: Record<Locale, string> = { en: 'en-GB', nl: 'nl-NL', de: 'de-DE' };
