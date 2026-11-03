import * as en from '@/content/en';
import * as nl from '@/content/nl';
import * as de from '@/content/de';
import { defaultsFor } from '@/content/defaults';
import type { PageContent, UiStrings } from '@/content/types';
import type { RouteKey } from './routes';

import { locales, numberLocale, type Locale } from './locale';

export { locales, numberLocale, type Locale };
export const defaultLocale: Locale = 'en';

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const htmlLang: Record<Locale, string> = { en: 'en', nl: 'nl', de: 'de' };
export const ogLocale: Record<Locale, string> = { en: 'en_GB', nl: 'nl_NL', de: 'de_DE' };

import { wpPages } from '@/content/whitepapers';

const dictionaries = { en, nl, de };

export const getUi = (locale: Locale): UiStrings => dictionaries[locale].ui;

const BRAND = ' | ActARion';

const TAGLINE: Record<Locale, string> = {
  en: 'AI & AR work instructions',
  nl: 'werkinstructies met AI en AR',
  de: 'KI- & AR-Arbeitsanweisungen',
};

/** Keep titles within 30–65 characters (Semrush / Screaming Frog limits). */
function fitTitle(title: string, label: string, locale: Locale): string {
  if (title.length < 30) return `${title.replace(BRAND, '')} – ${TAGLINE[locale]}${BRAND}`;
  if (title.length <= 65) return title;
  const short = `${label}${BRAND}`;
  if (short.length <= 65) return short;
  return `${label.slice(0, 64 - BRAND.length).trimEnd()}…${BRAND}`;
}

/** Keep meta descriptions within 70–155 characters, cut at a word boundary. */
function fitDescription(d: string): string {
  if (d.length <= 155) return d;
  const cut = d.slice(0, 152);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;]$/, '')}…`;
}

const cache = new Map<string, PageContent>();

/**
 * Page content = type defaults (complete page with placeholders) merged with the
 * hand-written content for that page, if any. Labels always come from the catalogue.
 */
export function getPage(locale: Locale, key: RouteKey): PageContent {
  const id = `${locale}:${key}`;
  const hit = cache.get(id);
  if (hit) return hit;
  const base = defaultsFor(key, locale);
  const own = dictionaries[locale].pages[key] ?? wpPages[locale][key];
  const merged: PageContent = own
    ? { ...base, ...own, label: base.label, placeholder: own.placeholder ?? false }
    : base;
  merged.metaTitle = fitTitle(merged.metaTitle, merged.label, locale);
  merged.metaDescription = fitDescription(merged.metaDescription);
  cache.set(id, merged);
  return merged;
}

export const formatDate = (locale: Locale, iso: string) =>
  new Intl.DateTimeFormat(numberLocale[locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
