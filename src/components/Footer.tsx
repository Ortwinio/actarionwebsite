import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { footerColumns, footerText, langNames, legalLinks } from '@/content/menu';
import { Wordmark } from './SiteHeaderClient';

/** Footer from the redesign (Main.dc.html §2.10). */
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-ink text-muted-lighter print:hidden">
      <div className="mx-auto flex max-w-site flex-col gap-11 px-6 pb-24 pt-16 md:pb-9">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[340px] flex-[1_1_280px] flex-col gap-4">
            <span className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white"><img src="/Actarionlogo.png" alt="" width={32} height={32} /></span>
              <Wordmark light />
            </span>
            <p className="leading-[1.5]">{footerText.about[locale]}</p>
            <Link href={pathFor('demo', locale)} className="inline-flex h-12 items-center self-start rounded-full bg-sky px-[22px] font-bold text-ink no-underline hover:text-ink">{footerText.cta[locale]}</Link>
          </div>
          <nav aria-label={footerText.nav[locale]} className="grid flex-[2_1_600px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-7 text-[15px]">
            {footerColumns.map((c) => (
              <div key={c.title.en} className="flex flex-col gap-1">
                <span className="pb-1.5 font-bold text-white">{c.title[locale]}</span>
                {c.links.map((l) => (
                  <Link key={l.key} href={pathFor(l.key, locale)} className="inline-flex min-h-8 items-center text-muted-lighter hover:text-white">{l.label[locale]}</Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-3 pt-6">
          <div aria-label={footerText.lang[locale]} role="group" className="inline-flex gap-1 rounded-full bg-ink-2 p-1">
            {locales.map((l) => (
              <Link key={l} href={pathFor('home', l)} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}
                className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-bold no-underline ${l === locale ? 'bg-sky text-ink hover:text-ink' : 'text-muted-lighter hover:text-white'}`}>{langNames[l]}</Link>
            ))}
          </div>
          <p className="text-sm text-[#8FA6B8]">
            © {new Date().getFullYear()} ActARion
            {legalLinks.map((l) => <span key={l.key}> · <Link href={pathFor(l.key, locale)} className="text-[#8FA6B8] hover:text-white">{l.label[locale]}</Link></span>)}
          </p>
        </div>
      </div>
    </footer>
  );
}
