import * as en from '@/content/en';
import * as nl from '@/content/nl';
import * as de from '@/content/de';
import type { PageContent, UiStrings } from '@/content/types';
import type { RouteKey } from './routes';

export const locales = ['en', 'nl', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** BCP-47 tags for <html lang>, hreflang and Open Graph. */
export const htmlLang: Record<Locale, string> = { en: 'en', nl: 'nl', de: 'de' };
export const ogLocale: Record<Locale, string> = { en: 'en_GB', nl: 'nl_NL', de: 'de_DE' };
export const numberLocale: Record<Locale, string> = { en: 'en-GB', nl: 'nl-NL', de: 'de-DE' };

const dictionaries = { en, nl, de };

export const getUi = (locale: Locale): UiStrings => dictionaries[locale].ui;
export const getPage = (locale: Locale, key: RouteKey): PageContent => dictionaries[locale].pages[key];

export const formatDate = (locale: Locale, iso: string) =>
  new Intl.DateTimeFormat(numberLocale[locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
