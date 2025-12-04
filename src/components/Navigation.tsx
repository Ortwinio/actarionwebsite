"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { buildLocalizedPath, getValidLocale, navigationItems, insightSubItems, aboutSubItems, Locale } from "../config/site";

interface NavigationProps {
  locale: Locale;
  dictionary: any;
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [isMobileInsightOpen, setIsMobileInsightOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "";
  const insightRef = useRef<HTMLDivElement>(null);
  const insightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
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

  // Build localized submenu items for About dropdown
  const aboutSubmenuItems = aboutSubItems.map((item) => {
    const href = buildLocalizedPath(normalizedLocale, item.segment);
    const label = dictionary?.navigation?.aboutSubmenu?.[item.id] ?? item.id;
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return { ...item, href, label, active };
  });

  // Check if any insight submenu item is active
  const isInsightActive = insightSubmenuItems.some((item) => item.active);

  // Check if any about submenu item is active
  const isAboutActive = aboutSubmenuItems.some((item) => item.active);

  const insightLabel = dictionary?.navigation?.insight ?? "Insights";
  const aboutLabel = dictionary?.navigation?.about ?? "About Us";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsMobileInsightOpen(false);
      setIsMobileAboutOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileInsightOpen(false);
    setIsMobileAboutOpen(false);
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

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }
    setIsAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutOpen(false);
    }, 150);
  };

  // Helper to render a dropdown menu item
  const renderDropdown = (
    itemId: string,
    label: string,
    isActive: boolean,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    dropdownRef: React.RefObject<HTMLDivElement | null>,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    submenuItems: { id: string; href: string; label: string; active: boolean }[]
  ) => (
    <div
      key={itemId}
      ref={dropdownRef as React.RefObject<HTMLDivElement>}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={`nav-link inline-flex items-center gap-1${isActive ? " nav-link--active" : ""}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform duration-200${isOpen ? " rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        className={`insight-dropdown${isOpen ? " insight-dropdown--open" : ""}`}
        role="menu"
        aria-orientation="vertical"
      >
        <ul className="py-2">
          {submenuItems.map(({ id, href, label: itemLabel, active }) => (
            <li key={id} role="none">
              <Link
                href={href}
                className={`insight-dropdown__item${active ? " insight-dropdown__item--active" : ""}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {itemLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Helper to render a mobile accordion menu item
  const renderMobileAccordion = (
    label: string,
    isActive: boolean,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    submenuItems: { id: string; href: string; label: string; active: boolean }[]
  ) => (
    <div className="mobile-insight">
      <button
        type="button"
        className={`nav-link w-full text-left inline-flex items-center justify-between${isActive ? " nav-link--active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform duration-200${isOpen ? " rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mobile-insight__submenu pl-4 mt-1 space-y-1 border-l-2 border-white/20">
          {submenuItems.map(({ id, href, label: itemLabel, active }) => (
            <Link
              key={id}
              href={href}
              className={`nav-link block text-sm${active ? " nav-link--active" : ""}`}
              onClick={closeMobileMenu}
            >
              {itemLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // Helper to render a regular nav link
  const renderNavLink = (id: string, href: string, label: string, active: boolean, onClick?: () => void) => (
    <Link
      key={id}
      href={href}
      className={`nav-link${active ? " nav-link--active" : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );

  // Render desktop navigation items in order
  const renderDesktopNavItems = () => {
    return navigationItems.map((item) => {
      if (item.id === 'home') {
        // Skip home in nav links (it's in the logo)
        return null;
      }
      
      if (item.id === 'about') {
        return (
          <React.Fragment key="about-dropdown">
            {renderDropdown(
              'about',
              aboutLabel,
              isAboutActive,
              isAboutOpen,
              setIsAboutOpen,
              aboutRef,
              handleAboutMouseEnter,
              handleAboutMouseLeave,
              aboutSubmenuItems
            )}
          </React.Fragment>
        );
      }
      
      if (item.id === 'insight') {
        return (
          <React.Fragment key="insight-dropdown">
            {renderDropdown(
              'insight',
              insightLabel,
              isInsightActive,
              isInsightOpen,
              setIsInsightOpen,
              insightRef,
              handleInsightMouseEnter,
              handleInsightMouseLeave,
              insightSubmenuItems
            )}
          </React.Fragment>
        );
      }
      
      // Regular link
      const localizedItem = localizedLinks.find((l) => l.id === item.id);
      if (localizedItem) {
        return renderNavLink(localizedItem.id, localizedItem.href, localizedItem.label, localizedItem.active);
      }
      
      return null;
    });
  };

  // Render mobile navigation items in order
  const renderMobileNavItems = () => {
    return navigationItems.map((item) => {
      if (item.id === 'home') {
        // Skip home in nav links (it's in the logo)
        return null;
      }
      
      if (item.id === 'about') {
        return (
          <div key="about">
            {renderMobileAccordion(
              aboutLabel,
              isAboutActive,
              isMobileAboutOpen,
              setIsMobileAboutOpen,
              aboutSubmenuItems
            )}
          </div>
        );
      }
      
      if (item.id === 'insight') {
        return (
          <div key="insight">
            {renderMobileAccordion(
              insightLabel,
              isInsightActive,
              isMobileInsightOpen,
              setIsMobileInsightOpen,
              insightSubmenuItems
            )}
          </div>
        );
      }
      
      // Regular link
      const localizedItem = localizedLinks.find((l) => l.id === item.id);
      if (localizedItem) {
        return renderNavLink(localizedItem.id, localizedItem.href, localizedItem.label, localizedItem.active, closeMobileMenu);
      }
      
      return null;
    });
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
          aria-label="ActARion homepage"
        >
          <Image
            src="/logo-actarion.png"
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
          {renderDesktopNavItems()}

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
            {renderMobileNavItems()}
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
