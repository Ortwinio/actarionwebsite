"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { buildLocalizedPath, getValidLocale, navigationItems, insightSubItems, Locale } from "../config/site";

interface NavigationProps {
  locale: Locale;
  dictionary: any;
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [isMobileInsightOpen, setIsMobileInsightOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "";
  const insightRef = useRef<HTMLDivElement>(null);
  const insightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (insightRef.current && !insightRef.current.contains(event.target as Node)) {
        setIsInsightOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedLocale = getValidLocale(locale);
  const homeHref = buildLocalizedPath(normalizedLocale);
  const contactHref = buildLocalizedPath(normalizedLocale, "contact");
  const ctaLabel = dictionary?.navigation?.contact || "Contact";

  // Build localized links for regular navigation items (excluding insight which has children)
  const localizedLinks = navigationItems
    .filter((item) => !item.children)
    .map((item) => {
      const href = buildLocalizedPath(normalizedLocale, item.segment);
      const label = dictionary?.navigation?.[item.id] ?? item.id;
      const active = pathname === href || pathname.startsWith(`${href}/`);
      return { ...item, href, label, active };
    });

  // Build localized submenu items for Insight dropdown
  const insightSubmenuItems = insightSubItems.map((item) => {
    const href = buildLocalizedPath(normalizedLocale, item.segment);
    const label = dictionary?.navigation?.insightSubmenu?.[item.id] ?? item.id;
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return { ...item, href, label, active };
  });

  // Check if any insight submenu item is active
  const isInsightActive = insightSubmenuItems.some((item) => item.active);

  const insightLabel = dictionary?.navigation?.insight ?? "Insight";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsMobileInsightOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileInsightOpen(false);
  };

  const handleInsightMouseEnter = () => {
    if (insightTimeoutRef.current) {
      clearTimeout(insightTimeoutRef.current);
    }
    setIsInsightOpen(true);
  };

  const handleInsightMouseLeave = () => {
    insightTimeoutRef.current = setTimeout(() => {
      setIsInsightOpen(false);
    }, 150);
  };

  // Find the insight item's position in the original navigation array
  const insightNavItem = navigationItems.find((item) => item.id === 'insight');
  const insightIndex = navigationItems.findIndex((item) => item.id === 'insight');

  // Split regular links into before and after the insight dropdown
  const linksBeforeInsight = localizedLinks.filter((_, index) => {
    const originalIndex = navigationItems.findIndex((item) => item.id === localizedLinks[index].id);
    return originalIndex < insightIndex;
  });
  
  const linksAfterInsight = localizedLinks.filter((_, index) => {
    const originalIndex = navigationItems.findIndex((item) => item.id === localizedLinks[index].id);
    return originalIndex > insightIndex;
  });

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
    >
      <div className="site-header__inner">
        <Link
          href={homeHref}
          className="site-logo"
          onClick={closeMobileMenu}
          aria-label="ActARion homepage"
        >
          <Image
            src="/actarionlogo.png"
            alt="ActARion symbol"
            width={36}
            height={36}
            className="h-9 w-auto"
            priority
          />
          <span className="site-logo__text">
            Act<span className="logo-wordmark__accent">AR</span>ion
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {/* Links before Insight */}
          {linksBeforeInsight.map(({ id, href, label, active }) => (
            <Link
              key={id}
              href={href}
              className={`nav-link${active ? " nav-link--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          ))}

          {/* Insight Dropdown */}
          {insightNavItem && (
            <div
              ref={insightRef}
              className="relative"
              onMouseEnter={handleInsightMouseEnter}
              onMouseLeave={handleInsightMouseLeave}
            >
              <button
                type="button"
                className={`nav-link inline-flex items-center gap-1${isInsightActive ? " nav-link--active" : ""}`}
                aria-haspopup="true"
                aria-expanded={isInsightOpen}
                onClick={() => setIsInsightOpen(!isInsightOpen)}
              >
                {insightLabel}
                <svg
                  className={`h-4 w-4 transition-transform duration-200${isInsightOpen ? " rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`insight-dropdown${isInsightOpen ? " insight-dropdown--open" : ""}`}
                role="menu"
                aria-orientation="vertical"
              >
                <ul className="py-2">
                  {insightSubmenuItems.map(({ id, href, label, active }) => (
                    <li key={id} role="none">
                      <Link
                        href={href}
                        className={`insight-dropdown__item${active ? " insight-dropdown__item--active" : ""}`}
                        role="menuitem"
                        onClick={() => setIsInsightOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Links after Insight */}
          {linksAfterInsight.map(({ id, href, label, active }) => (
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
            <Link href={contactHref} className="btn btn-primary btn-pill">
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
            {/* Links before Insight */}
            {linksBeforeInsight.map(({ id, href, label, active }) => (
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

            {/* Mobile Insight Accordion */}
            {insightNavItem && (
              <div className="mobile-insight">
                <button
                  type="button"
                  className={`nav-link w-full text-left inline-flex items-center justify-between${isInsightActive ? " nav-link--active" : ""}`}
                  onClick={() => setIsMobileInsightOpen(!isMobileInsightOpen)}
                  aria-expanded={isMobileInsightOpen}
                >
                  {insightLabel}
                  <svg
                    className={`h-4 w-4 transition-transform duration-200${isMobileInsightOpen ? " rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMobileInsightOpen && (
                  <div className="mobile-insight__submenu pl-4 mt-1 space-y-1 border-l-2 border-white/20">
                    {insightSubmenuItems.map(({ id, href, label, active }) => (
                      <Link
                        key={id}
                        href={href}
                        className={`nav-link block text-sm${active ? " nav-link--active" : ""}`}
                        onClick={closeMobileMenu}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Links after Insight */}
            {linksAfterInsight.map(({ id, href, label, active }) => (
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
