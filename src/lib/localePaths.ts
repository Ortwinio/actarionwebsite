import { buildLocalizedPath, Locale, locales, isSupportedLocale } from "@/config/site";

const localePattern = new RegExp(`^/(?:${locales.join("|")})(?=$|/)`, "i");

const ensureLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const normalizePathname = (value?: string) => {
  if (!value) {
    return "/";
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }
  return ensureLeadingSlash(trimmed);
};

const splitHref = (href: string) => {
  const [pathWithQuery, hashFragment] = href.split("#");
  const [pathnamePart, queryPart] = (pathWithQuery || "").split("?");
  const pathname = pathnamePart || "/";
  const query = queryPart ? `?${queryPart}` : "";
  const hash = hashFragment ? `#${hashFragment}` : "";
  return { pathname, query, hash };
};

export const stripLocaleFromPathname = (pathname: string) => {
  const normalized = normalizePathname(pathname);
  const withoutLocale = normalized.replace(localePattern, "");
  if (!withoutLocale || withoutLocale === "/") {
    return "/";
  }
  return ensureLeadingSlash(withoutLocale);
};

export const replaceLocaleInPathname = (pathname: string, locale: Locale) => {
  const remainder = stripLocaleFromPathname(pathname);
  return remainder === "/" ? `/${locale}` : `/${locale}${remainder}`;
};

export const buildHrefWithLocale = (locale: Locale, href?: string) => {
  if (!href || href === "/") {
    return buildLocalizedPath(locale);
  }

  const trimmed = href.trim();
  if (!trimmed || trimmed === "/") {
    return buildLocalizedPath(locale);
  }

  if (/^(https?:|mailto:|tel:)/i.test(trimmed) || trimmed.startsWith("#")) {
    return trimmed;
  }

  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const { pathname, query, hash } = splitHref(normalized);
  const localizedPath = replaceLocaleInPathname(pathname, locale);
  return `${localizedPath}${query}${hash}`;
};

export const getLocaleFromPathname = (pathname: string): Locale | null => {
  const normalized = normalizePathname(pathname);
  const match = normalized.match(localePattern);
  if (!match) {
    return null;
  }
  const candidate = match[0].slice(1).toLowerCase();
  return isSupportedLocale(candidate) ? (candidate as Locale) : null;
};

