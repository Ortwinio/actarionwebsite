import Link from 'next/link';
import { getPage, getUi, locales, type Locale } from '@/lib/i18n';
import { childrenOf, pathFor, trailFor, type RouteKey } from '@/lib/routes';
import { Logo } from './Logo';

/** Main menu per the content overview: Platform · Solutions · Use cases · Industries · Resources · Customers. */
const menu: { key: RouteKey; items: RouteKey[] }[] = [
  { key: 'platform', items: childrenOf('platform') },
  { key: 'solutions', items: [...childrenOf('solutions'), 'compare'] },
  { key: 'useCases', items: childrenOf('useCases') },
  { key: 'industries', items: childrenOf('industries') },
  { key: 'resources', items: ['templates', 'blog', 'roiCalculator', 'glossary', 'whitepapers', 'events', 'hardware'] },
  { key: 'customers', items: [...childrenOf('customers'), 'partners'] },
];

/**
 * Server component, no client JavaScript.
 * Desktop: dropdowns open on hover and keyboard focus (CSS :focus-within).
 * Mobile: native <details>. Language switcher links to the translated page.
 */
export function Header({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const ui = getUi(locale);
  const trail = trailFor(routeKey);
  const label = (k: RouteKey) => getPage(locale, k).label;

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
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href={pathFor('home', locale)} className="no-underline" aria-label="ActARion home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {menu.map((m) => (
              <li key={m.key} className="group relative">
                <Link
                  href={pathFor(m.key, locale)}
                  aria-current={trail.includes(m.key) ? 'page' : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-3 text-[15px] font-semibold no-underline ${
                    trail.includes(m.key) ? 'bg-tint text-ink' : 'text-ink hover:bg-white hover:text-ink'
                  }`}
                >
                  {label(m.key)}
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="card flex flex-col p-2 shadow-float">
                    {m.items.map((k) => (
                      <li key={k}>
                        <Link href={pathFor(k, locale)} className="flex min-h-[40px] items-center rounded-xl px-3 font-semibold text-ink no-underline hover:bg-tint hover:text-ink">
                          {label(k)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {langs}
          <Link href={pathFor('demo', locale)} className="btn-primary min-h-[46px] px-5 text-[15px]">{ui.ctaDemo}</Link>
        </div>

        <details className="group xl:hidden">
          <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center rounded-full border-2 border-ink px-4 font-bold">
            <span className="group-open:hidden">{ui.menu}</span>
            <span className="hidden group-open:inline">{ui.close}</span>
          </summary>
          <nav aria-label="Mobile" className="absolute inset-x-0 top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto border-y border-line bg-canvas">
            <div className="wrap flex flex-col py-4">
              {menu.map((m) => (
                <details key={m.key} className="border-b border-line">
                  <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between text-lg font-semibold">
                    {label(m.key)} <span aria-hidden="true" className="font-mono text-primary">+</span>
                  </summary>
                  <ul className="flex flex-col pb-3 pl-3">
                    {[m.key, ...m.items].map((k) => (
                      <li key={k}><Link href={pathFor(k, locale)} className="flex min-h-[44px] items-center text-ink no-underline">{label(k)}</Link></li>
                    ))}
                  </ul>
                </details>
              ))}
              <Link href={pathFor('demo', locale)} className="btn-primary mt-4">{ui.ctaDemo}</Link>
              <div className="mt-4">{langs}</div>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
