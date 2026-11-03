'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUi, locales, type Locale } from '@/lib/i18n';
import { pathFor, resolveSlug, type RouteKey } from '@/lib/routes';
import { Logo } from './Logo';

const navKeys: { key: RouteKey; label: keyof ReturnType<typeof getUi>['nav'] }[] = [
  { key: 'digitalWorkInstructions', label: 'platform' },
  { key: 'useCases', label: 'useCases' },
  { key: 'industries', label: 'industries' },
  { key: 'resources', label: 'resources' },
  { key: 'customers', label: 'customers' },
  { key: 'roiCalculator', label: 'roi' },
];

/** Resolve the route key of the current URL so the language switcher links to the translated page. */
function currentKey(pathname: string, locale: Locale): RouteKey {
  const slug = pathname.replace(new RegExp(`^/${locale}/?`), '').replace(/\/$/, '');
  return slug ? resolveSlug(locale, slug) ?? 'home' : 'home';
}

export function Header({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const pathname = usePathname() || `/${locale}`;
  const key = currentKey(pathname, locale);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (k: RouteKey) => pathname === pathFor(k, locale) || pathname.startsWith(`${pathFor(k, locale)}/`);

  const LangSwitch = ({ className = '' }: { className?: string }) => (
    <ul className={`flex gap-1 ${className}`} aria-label="Language">
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={pathFor(key, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? 'true' : undefined}
            className={`inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-sm font-bold uppercase no-underline ${
              l === locale ? 'bg-ink text-white hover:text-white' : 'text-ink hover:bg-tint'
            }`}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link href={pathFor('home', locale)} className="no-underline" aria-label="ActARion home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navKeys.map((n) => (
              <li key={n.key}>
                <Link
                  href={pathFor(n.key, locale)}
                  aria-current={isActive(n.key) ? 'page' : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-3.5 text-[15px] font-semibold no-underline ${
                    isActive(n.key) ? 'bg-tint text-ink' : 'text-ink hover:bg-white hover:text-ink'
                  }`}
                >
                  {ui.nav[n.label]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <Link href={pathFor('pilot', locale)} className="btn-primary min-h-[46px] px-5 text-[15px]">
            {ui.ctaPilot}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-ink px-4 font-bold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? ui.close : ui.menu}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col gap-1 py-4">
            {navKeys.map((n) => (
              <Link key={n.key} href={pathFor(n.key, locale)} className="flex min-h-[52px] items-center border-b border-line text-lg font-semibold text-ink no-underline">
                {ui.nav[n.label]}
              </Link>
            ))}
            <Link href={pathFor('pilot', locale)} className="btn-primary mt-4">
              {ui.ctaPilot}
            </Link>
            <LangSwitch className="mt-4" />
          </nav>
        </div>
      )}
    </header>
  );
}
