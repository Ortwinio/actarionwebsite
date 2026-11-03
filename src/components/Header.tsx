import Link from 'next/link';
import { getUi, locales, type Locale } from '@/lib/i18n';
import { pathFor, trailFor, type RouteKey } from '@/lib/routes';
import { Logo } from './Logo';

const navKeys: { key: RouteKey; label: keyof ReturnType<typeof getUi>['nav'] }[] = [
  { key: 'digitalWorkInstructions', label: 'platform' },
  { key: 'useCases', label: 'useCases' },
  { key: 'industries', label: 'industries' },
  { key: 'resources', label: 'resources' },
  { key: 'customers', label: 'customers' },
  { key: 'roiCalculator', label: 'roi' },
];

/**
 * Server component: zero client JavaScript. The mobile menu uses native <details>,
 * the language switcher links to the translated counterpart of the current page.
 */
export function Header({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const ui = getUi(locale);
  const trail = trailFor(routeKey);
  const active = (k: RouteKey) => trail.includes(k);

  const langs = (
    <ul className="flex gap-1" aria-label="Language">
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={pathFor(routeKey, l)}
            hrefLang={l}
            lang={l}
            prefetch={false}
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
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
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
                  aria-current={active(n.key) ? 'page' : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-3.5 text-[15px] font-semibold no-underline ${
                    active(n.key) ? 'bg-tint text-ink' : 'text-ink hover:bg-white hover:text-ink'
                  }`}
                >
                  {ui.nav[n.label]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {langs}
          <Link href={pathFor('pilot', locale)} className="btn-primary min-h-[46px] px-5 text-[15px]">
            {ui.ctaPilot}
          </Link>
        </div>

        <details className="group lg:hidden">
          <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center rounded-full border-2 border-ink px-4 font-bold">
            <span className="group-open:hidden">{ui.menu}</span>
            <span className="hidden group-open:inline">{ui.close}</span>
          </summary>
          <nav aria-label="Mobile" className="absolute inset-x-0 top-[72px] border-y border-line bg-canvas">
            <div className="wrap flex flex-col gap-1 py-4">
              {navKeys.map((n) => (
                <Link key={n.key} href={pathFor(n.key, locale)} className="flex min-h-[52px] items-center border-b border-line text-lg font-semibold text-ink no-underline">
                  {ui.nav[n.label]}
                </Link>
              ))}
              <Link href={pathFor('pilot', locale)} className="btn-primary mt-4">
                {ui.ctaPilot}
              </Link>
              <div className="mt-4">{langs}</div>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
