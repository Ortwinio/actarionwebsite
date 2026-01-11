export const locales = ['en', 'de', 'nl'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export type NavigationItemId = 'home' | 'services' | 'about' | 'contact' | 'insight' | 'partner' | 'useCases';
export type InsightSubItemId = 'blogposts' | 'events' | 'whitepapers' | 'videos' | 'news';
export type AboutSubItemId = 'aboutActarion' | 'vision' | 'management' | 'career' | 'faq';
export type UseCaseSubItemId = 'onboardingTraining' | 'guidedAssembly' | 'guidedChangeovers' | 'preventiveMaintenance' | 'remoteExpertSupport' | 'allUseCases';

export interface NavigationSubItem {
  id: InsightSubItemId | AboutSubItemId | UseCaseSubItemId;
  segment: string;
}

export interface NavigationItem {
  id: NavigationItemId;
  /** Route slug without locale prefix */
  segment?: string;
  /** Submenu items for dropdown navigation */
  children?: NavigationSubItem[];
}

/**
 * Use case submenu items in canonical order.
 */
export const useCaseSubItems: NavigationSubItem[] = [
  { id: 'onboardingTraining', segment: 'use-cases/ar-training-and-onboarding' },
  { id: 'guidedAssembly', segment: 'use-cases/ar-guided-assembly-production' },
  { id: 'guidedChangeovers', segment: 'use-cases/ar-guided-changeover-batch-preparation' },
  { id: 'preventiveMaintenance', segment: 'use-cases/ar-preventive-maintenance' },
  { id: 'remoteExpertSupport', segment: 'use-cases/ar-remote-expert-support-corrective-maintenance' },
  { id: 'allUseCases', segment: 'use-cases' },
];

export const insightSubItems: NavigationSubItem[] = [
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

/** Top-level navigation order: Services, Use Cases, Insights, Partners, About Us, Contact */
export const navigationItems: NavigationItem[] = [
  { id: 'home' },
  { id: 'services', segment: 'services' },
  { id: 'useCases', children: useCaseSubItems },
  { id: 'insight', children: insightSubItems },
  { id: 'partner', segment: 'partners' },
  { id: 'about', children: aboutSubItems },
  { id: 'contact', segment: 'contact' },
];

export const isSupportedLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const getValidLocale = (value: string): Locale =>
  (isSupportedLocale(value) ? value : defaultLocale);

export const buildLocalizedPath = (locale: Locale, segment?: string) =>
  `/${locale}${segment ? `/${segment}` : ''}`;
