import Link from 'next/link';
import { getPage, getUi, locales, type Locale } from '@/lib/i18n';
import { pathFor, type RouteKey } from '@/lib/routes';
import { Logo } from './Logo';

const columns: RouteKey[][] = [
  ['digitalWorkInstructions', 'useCases', 'ucChangeover', 'ucTraining'],
  ['industries', 'indPharma', 'customers', 'roiCalculator'],
  ['resources', 'tplWorkInstruction', 'guideWriteWorkInstructions', 'glossary'],
];

export function Footer({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <footer className="bg-ink text-muted-lighter">
      <div className="wrap grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="max-w-xs text-[15px] leading-relaxed">{ui.footer.tagline}</p>
          <Link href={pathFor('pilot', locale)} className="btn-sky self-start">
            {ui.ctaPilot}
          </Link>
        </div>
        {columns.map((col, i) => (
          <ul key={i} className="flex flex-col gap-1">
            {col.map((k) => (
              <li key={k}>
                <Link href={pathFor(k, locale)} className="inline-flex min-h-[40px] items-center text-muted-lighter no-underline hover:text-white">
                  {getPage(locale, k).label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="border-t border-ink-3">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
          <span>© {new Date().getFullYear()} ActARion. {ui.footer.rights}</span>
          <div className="flex items-center gap-2">
            <span>{ui.footer.language}:</span>
            {locales.map((l) => (
              <Link key={l} href={pathFor('home', l)} hrefLang={l} lang={l} className="inline-flex min-h-[40px] items-center px-2 font-bold uppercase text-muted-lighter no-underline hover:text-white">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
