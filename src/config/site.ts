export const locales = ['en', 'de', 'nl'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export type NavigationItemId = 'home' | 'about' | 'contact' | 'blog' | 'partner' | 'career' | 'faq';

export interface NavigationItem {
  id: NavigationItemId;
  /** Route slug without locale prefix */
  segment?: string;
}

export const navigationItems: NavigationItem[] = [
  { id: 'home' },
  { id: 'about', segment: 'about' },
  { id: 'contact', segment: 'contact' },
  { id: 'blog', segment: 'blog' },
  { id: 'partner', segment: 'partner-contact' },
  { id: 'career', segment: 'career' },
  { id: 'faq', segment: 'faq' },
];

export const isSupportedLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const getValidLocale = (value: string): Locale =>
  (isSupportedLocale(value) ? value : defaultLocale);

export const buildLocalizedPath = (locale: Locale, segment?: string) =>
  `/${locale}${segment ? `/${segment}` : ''}`;
