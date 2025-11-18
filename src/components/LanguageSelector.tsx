"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Locale, locales } from "@/config/site";
import { buildHrefWithLocale, replaceLocaleInPathname } from "@/lib/localePaths";

interface LanguageSelectorProps {
  currentLocale: Locale;
  dictionary: any;
  variant?: 'default' | 'header';
}

const localeMetadata: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  nl: { name: "Nederlands", flag: "🇳🇱" },
};

export default function LanguageSelector({ currentLocale, dictionary, variant = 'default' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const basePath = replaceLocaleInPathname(pathname, locale);
    const queryString = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const target =
      `${basePath}${queryString ? `?${queryString}` : ""}${hash || ""}` ||
      buildHrefWithLocale(locale, pathname);

    setIsOpen(false);
    router.push(target);
  };

  const currentLanguage = localeMetadata[currentLocale];

  const triggerClassName =
    variant === 'header'
      ? 'site-header__icon-button'
      : 'language-selector__trigger';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        data-testid="language-selector-toggle"
        onClick={() => setIsOpen((open) => !open)}
        className={triggerClassName}
        aria-label={dictionary?.languageSelector?.title || "Language"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span className="inline">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div
          className="language-selector__menu absolute right-0 mt-2 z-50"
          role="menu"
        >
          <div className="space-y-1">
            {locales.map((code) => {
              const metadata = localeMetadata[code];
              const isActive = currentLocale === code;
              const itemClass = `language-selector__item${isActive ? " language-selector__item--active" : ""}`;

              return (
                <button
                  key={code}
                  type="button"
                  data-testid={`language-option-${code}`}
                  onClick={() => handleLanguageChange(code)}
                  className={itemClass}
                  role="menuitemradio"
                  aria-checked={isActive}
                >
                  <span className="text-lg">{metadata.flag}</span>
                  <span>{metadata.name}</span>
                  {isActive && (
                    <span className="ml-auto text-sm" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}