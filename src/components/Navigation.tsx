"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { buildLocalizedPath, getValidLocale, navigationItems, Locale } from "../config/site";

interface NavigationProps {
  locale: Locale;
  dictionary: any;
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const normalizedLocale = getValidLocale(locale);
  const homeHref = buildLocalizedPath(normalizedLocale);
  const contactHref = buildLocalizedPath(normalizedLocale, "contact");
  const ctaLabel = dictionary?.navigation?.contact || "Contact";
  const localizedLinks = navigationItems.map((item) => {
    const href = buildLocalizedPath(normalizedLocale, item.segment);
    const label = dictionary?.navigation?.[item.id] ?? item.id;
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return { ...item, href, label, active };
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
    >
      <div className="site-header__inner">
        <Link
          href={homeHref}
          className="site-logo"
          onClick={closeMobileMenu}
        >
          <Image
            src="/ActARionlogo.png"
            alt="ActARion Logo"
            width={36}
            height={36}
          />
          <span>
            Act<span className="logo-wordmark__accent">AR</span>ion
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {localizedLinks.map(({ id, href, label, active }) => (
            <Link
              key={id}
              href={href}
              className={`nav-link${active ? " nav-link--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <div className="site-header__meta">
            <ThemeToggle variant="header" />
            <LanguageSelector
              currentLocale={normalizedLocale}
              dictionary={dictionary}
              variant="header"
            />
            <Link href={contactHref} className="btn btn-secondary btn-pill">
              {ctaLabel}
            </Link>
          </div>
        </nav>

        {isClient && (
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="mobile-nav-toggle md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Toggle main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        )}
      </div>

      {isClient && isMobileMenuOpen && (
        <div className="mobile-nav md:hidden" id="mobile-menu">
          <div className="mobile-nav__links space-y-1">
            {localizedLinks.map(({ id, href, label, active }) => (
              <Link
                key={id}
                href={href}
                className={active ? "nav-link nav-link--active" : "nav-link"}
                aria-current={active ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <ThemeToggle variant="header" />
            <LanguageSelector
              currentLocale={normalizedLocale}
              dictionary={dictionary}
              variant="header"
            />
          </div>
          <Link
            href={contactHref}
            className="btn btn-primary btn-pill mt-4 w-full text-center"
            onClick={closeMobileMenu}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </header>
  );
} 