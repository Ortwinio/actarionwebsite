import Link from 'next/link';
import { getPage, getUi, locales, type Locale } from '@/lib/i18n';
import { childrenOf, pathFor, type RouteKey } from '@/lib/routes';
import { Logo } from './Logo';

const columns: RouteKey[][] = [
  ['solutions', ...childrenOf('solutions')],
  ['useCases', ...childrenOf('useCases').slice(0, 6)],
  ['industries', ...childrenOf('industries')],
  ['resources', 'templates', 'blog', 'roiCalculator', 'glossary', 'compare', 'whitepapers', 'hardware'],
  ['company', 'vision', 'team', 'careers', 'news', 'partners', 'customers', 'contact', 'faq'],
];
const legal: RouteKey[] = ['privacy', 'terms', 'imprint', 'sitemap'];

export function Footer({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const label = (k: RouteKey) => getPage(locale, k).label;
  return (
    <footer className="bg-ink text-muted-lighter">
      <div className="wrap grid gap-10 py-16 md:grid-cols-3 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="max-w-xs text-[15px] leading-relaxed">{ui.footer.tagline}</p>
          <p className="text-sm">Benelux · DACH · <a href="mailto:hello@actarion.com" className="text-sky">hello@actarion.com</a></p>
          <Link href={pathFor('demo', locale)} className="btn-sky self-start">{ui.ctaDemo}</Link>
        </div>
        {columns.map(([head, ...items]) => (
          <div key={head}>
            <Link href={pathFor(head, locale)} className="mb-2 inline-flex min-h-[40px] items-center font-bold text-white no-underline hover:text-sky">{label(head)}</Link>
            <ul className="flex flex-col">
              {items.map((k) => (
                <li key={k}><Link href={pathFor(k, locale)} className="inline-flex min-h-[36px] items-center text-[15px] text-muted-lighter no-underline hover:text-white">{label(k)}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-3">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
          <div className="flex flex-wrap items-center gap-x-4">
            <span>© {new Date().getFullYear()} ActARion. {ui.footer.rights}</span>
            {legal.map((k) => <Link key={k} href={pathFor(k, locale)} className="inline-flex min-h-[40px] items-center text-muted-lighter hover:text-white">{label(k)}</Link>)}
          </div>
          <div className="flex items-center gap-2">
            <span>{ui.footer.language}:</span>
            {locales.map((l) => (
              <Link key={l} href={pathFor('home', l)} hrefLang={l} lang={l} className="inline-flex min-h-[40px] items-center px-2 font-bold uppercase text-muted-lighter no-underline hover:text-white">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
