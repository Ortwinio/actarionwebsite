export const locales = ['en', 'de', 'nl'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export type NavigationItemId = 'home' | 'services' | 'about' | 'contact' | 'insight' | 'partner';
export type InsightSubItemId = 'useCases' | 'blogposts' | 'events' | 'whitepapers' | 'videos' | 'news';
export type AboutSubItemId = 'aboutActarion' | 'vision' | 'management' | 'career' | 'faq';

export interface NavigationSubItem {
  id: InsightSubItemId | AboutSubItemId;
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

export const aboutSubItems: NavigationSubItem[] = [
  { id: 'aboutActarion', segment: 'about' },
  { id: 'vision', segment: 'vision' },
  { id: 'management', segment: 'management' },
  { id: 'career', segment: 'career' },
  { id: 'faq', segment: 'faq' },
];

/** Top-level navigation order: About us, Services, Insights, Partners, Contact */
export const navigationItems: NavigationItem[] = [
  { id: 'home' },
  { id: 'about', children: aboutSubItems },
  { id: 'services', segment: 'services' },
  { id: 'insight', children: insightSubItems },
  { id: 'partner', segment: 'partner-contact' },
  { id: 'contact', segment: 'contact' },
];

export const isSupportedLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const getValidLocale = (value: string): Locale =>
  (isSupportedLocale(value) ? value : defaultLocale);

export const buildLocalizedPath = (locale: Locale, segment?: string) =>
  `/${locale}${segment ? `/${segment}` : ''}`;
