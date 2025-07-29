"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-90 backdrop-blur-md border-b border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <Image
                src="/Actarionlogo.png"
                alt="ActARion Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">
                act<span className="text-cyan-400">AR</span>ion
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Demo
            </Link>
            <Link
              href="/partner-contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/partner-contact')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Partner
            </Link>
            <Link
              href="/career"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/career')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Career
            </Link>
            <Link
              href="/faq"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/faq')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white hover:bg-neutral-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral-900 bg-opacity-95 backdrop-blur-md border-t border-neutral-700">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/about')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              Demo
            </Link>
            <Link
              href="/partner-contact"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/partner-contact')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              Partner
            </Link>
            <Link
              href="/career"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/career')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              Career
            </Link>
            <Link
              href="/faq"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/faq')
                  ? 'text-cyan-400 bg-neutral-800'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-800'
              }`}
              onClick={closeMobileMenu}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 