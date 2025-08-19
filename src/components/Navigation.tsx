"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  locale: string;
  dictionary: any;
}

export default function Navigation({ locale, dictionary }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 shadow-lg ${
      isScrolled 
        ? 'bg-white/98 dark:bg-neutral-900/98 backdrop-blur-xl shadow-2xl border-b border-gray-200 dark:border-neutral-600' 
        : 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-neutral-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200" onClick={closeMobileMenu}>
              <Image
                src="/Actarionlogo.png"
                alt="ActARion Logo"
                width={32}
                height={32}
                className="w-8 h-8 lg:w-10 lg:h-10"
              />
              <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                act<span className="text-cyan-500 dark:text-cyan-400">AR</span>ion
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(locale === 'en' ? '/' : `/${locale}`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.home}
            </Link>
            <Link
              href={locale === 'en' ? '/about' : `/${locale}/about`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(locale === 'en' ? '/about' : `/${locale}/about`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.about}
            </Link>
            <Link
              href={locale === 'en' ? '/contact' : `/${locale}/contact`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(locale === 'en' ? '/contact' : `/${locale}/contact`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.contact}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(`/${locale}/blog`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.blog}
            </Link>
            <Link
              href={locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.partner}
            </Link>
            <Link
              href={locale === 'en' ? '/career' : `/${locale}/career`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(locale === 'en' ? '/career' : `/${locale}/career`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.career}
            </Link>
            <Link
              href={locale === 'en' ? '/en/faq' : `/${locale}/faq`}
              className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                isActive(locale === 'en' ? '/en/faq' : `/${locale}/faq`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800 shadow-md ring-1 ring-cyan-500/20 dark:ring-cyan-400/20'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
              }`}
            >
              {dictionary.navigation.faq}
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Selector */}
            <LanguageSelector currentLocale={locale} dictionary={dictionary} />
          </div>

          {/* Mobile menu button */}
          {isClient && (
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
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
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isClient && isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-gray-200 dark:border-neutral-700">
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(locale === 'en' ? '/' : `/${locale}`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.home}
            </Link>
            <Link
              href={locale === 'en' ? '/about' : `/${locale}/about`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(locale === 'en' ? '/about' : `/${locale}/about`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.about}
            </Link>
            <Link
              href={locale === 'en' ? '/contact' : `/${locale}/contact`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(locale === 'en' ? '/contact' : `/${locale}/contact`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.contact}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(`/${locale}/blog`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.blog}
            </Link>
            <Link
              href={locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.partner}
            </Link>
            <Link
              href={locale === 'en' ? '/career' : `/${locale}/career`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(locale === 'en' ? '/career' : `/${locale}/career`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.career}
            </Link>
            <Link
              href={locale === 'en' ? '/en/faq' : `/${locale}/faq`}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive(locale === 'en' ? '/en/faq' : `/${locale}/faq`)
                  ? 'text-cyan-500 dark:text-cyan-400 bg-gray-100 dark:bg-neutral-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              {dictionary.navigation.faq}
            </Link>
            
            {/* Mobile Theme Toggle */}
            <div className="px-3 py-2 flex items-center justify-between">
              <ThemeToggle />
              <LanguageSelector currentLocale={locale} dictionary={dictionary} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 