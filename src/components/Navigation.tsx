"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import {
  buildLocalizedPath,
  getValidLocale,
  navigationItems,
  Locale,
  NavigationItem,
  NavigationSubItem,
} from "../config/site";

interface NavigationProps {
  locale: Locale;
  dictionary: any;
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname() || "";

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const normalizedLocale = getValidLocale(locale);
  const homeHref = buildLocalizedPath(normalizedLocale);
  const contactHref = buildLocalizedPath(normalizedLocale, "contact");
  const ctaLabel = dictionary?.navigation?.contact || "Contact";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMobileDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (id: string) => {
    setOpenMobileDropdown(openMobileDropdown === id ? null : id);
  };

  const getLabel = (item: NavigationItem | NavigationSubItem, parentId?: string) => {
    // Check for submenu labels based on parent
    if (parentId === "useCases") {
      const label = dictionary?.navigation?.useCasesSubmenu?.[item.id];
      if (label) return label;
    }
    if (parentId === "insight") {
      const label = dictionary?.navigation?.insightSubmenu?.[item.id];
      if (label) return label;
    }
    if (parentId === "about") {
      const label = dictionary?.navigation?.aboutSubmenu?.[item.id];
      if (label) return label;
    }
    // Fallback to main navigation labels
    return dictionary?.navigation?.[item.id] ?? item.id;
  };

  const isActive = (segment?: string) => {
    if (!segment) return false;
    const href = buildLocalizedPath(normalizedLocale, segment);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isParentActive = (item: NavigationItem) => {
    if (item.children) {
      return item.children.some((child) => isActive(child.segment));
    }
    return isActive(item.segment);
  };

  // Filter out home and contact from main nav (home is logo, contact is CTA button)
  const mainNavItems = navigationItems.filter(
    (item) => item.id !== "home" && item.id !== "contact"
  );

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
            alt="ActARion"
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
          {mainNavItems.map((item) => {
            if (item.children) {
              // Dropdown menu
              return (
                <div
                  key={item.id}
                  className="nav-dropdown"
                  onMouseEnter={() => handleDropdownEnter(item.id)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    className={`nav-link nav-link--dropdown${
                      isParentActive(item) ? " nav-link--active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === item.id ? null : item.id);
                    }}
                    aria-expanded={openDropdown === item.id}
                    aria-haspopup="true"
                  >
                    {getLabel(item)}
                    <ChevronDownIcon
                      className={`nav-dropdown__icon ${
                        openDropdown === item.id ? "nav-dropdown__icon--open" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === item.id && (
                    <div
                      className="nav-dropdown__menu"
                      onMouseEnter={() => handleDropdownEnter(item.id)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.children.map((child) => (
            <Link
                          key={child.id}
                          href={buildLocalizedPath(normalizedLocale, child.segment)}
                          className={`nav-dropdown__item${
                            isActive(child.segment) ? " nav-dropdown__item--active" : ""
                          }`}
                          onClick={() => setOpenDropdown(null)}
            >
                          {getLabel(child, item.id)}
            </Link>
          ))}
                    </div>
                  )}
                </div>
              );
            }

            // Regular link
            const href = buildLocalizedPath(normalizedLocale, item.segment);
            return (
              <Link
                key={item.id}
                href={href}
                className={`nav-link${isActive(item.segment) ? " nav-link--active" : ""}`}
                aria-current={isActive(item.segment) ? "page" : undefined}
              >
                {getLabel(item)}
              </Link>
            );
          })}

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

      {/* Mobile Navigation */}
      {isClient && isMobileMenuOpen && (
        <div className="mobile-nav md:hidden" id="mobile-menu">
          <div className="mobile-nav__links space-y-1">
            {mainNavItems.map((item) => {
              if (item.children) {
                // Mobile dropdown
                return (
                  <div key={item.id} className="mobile-nav__dropdown">
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(item.id)}
                      className={`nav-link nav-link--dropdown w-full justify-between${
                        isParentActive(item) ? " nav-link--active" : ""
                      }`}
                      aria-expanded={openMobileDropdown === item.id}
                    >
                      {getLabel(item)}
                      <ChevronDownIcon
                        className={`nav-dropdown__icon ${
                          openMobileDropdown === item.id ? "nav-dropdown__icon--open" : ""
                        }`}
                      />
                    </button>
                    {openMobileDropdown === item.id && (
                      <div className="mobile-nav__submenu">
                        {item.children.map((child) => (
              <Link
                            key={child.id}
                            href={buildLocalizedPath(normalizedLocale, child.segment)}
                            className={`nav-link nav-link--submenu${
                              isActive(child.segment) ? " nav-link--active" : ""
                            }`}
                onClick={closeMobileMenu}
              >
                            {getLabel(child, item.id)}
              </Link>
            ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular mobile link
              const href = buildLocalizedPath(normalizedLocale, item.segment);
              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`nav-link${isActive(item.segment) ? " nav-link--active" : ""}`}
                  aria-current={isActive(item.segment) ? "page" : undefined}
                  onClick={closeMobileMenu}
                >
                  {getLabel(item)}
                </Link>
              );
            })}
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
