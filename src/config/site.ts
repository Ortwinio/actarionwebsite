export const locales = ['en', 'de', 'nl'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export type NavigationItemId = 'home' | 'about' | 'contact' | 'insight' | 'partner' | 'career' | 'faq';
export type InsightSubItemId = 'useCases' | 'blogposts' | 'events' | 'whitepapers' | 'videos' | 'news';

export interface NavigationSubItem {
  id: InsightSubItemId;
  segment: string;
}

export interface NavigationItem {
  id: NavigationItemId;
  /** Route slug without locale prefix */
  segment?: string;
  /** Submenu items for dropdown navigation */
  children?: NavigationSubItem[];
}

export const insightSubItems: NavigationSubItem[] = [
  { id: 'useCases', segment: 'use-cases' },
  { id: 'blogposts', segment: 'blog' },
  { id: 'events', segment: 'events' },
  { id: 'whitepapers', segment: 'whitepapers' },
  { id: 'videos', segment: 'videos' },
  { id: 'news', segment: 'news' },
];

export const navigationItems: NavigationItem[] = [
  { id: 'home' },
  { id: 'about', segment: 'about' },
  { id: 'contact', segment: 'contact' },
  { id: 'insight', children: insightSubItems },
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
