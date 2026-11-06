'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/lib/locale';

export interface CtaExpertText { eyebrow: string; h: string; sub: string; subShort: string; region: string; meta: string; cta: string; altJack: string; altMark: string }

const REG = [{ label: 'Benelux', name: 'Jack' }, { label: 'DACH', name: 'Mark' }];

/** CtaExpert from the redesign: 'band' (full-width section) or 'card' (sidebar). */
export function CtaExpert({ locale, t, href, variant = 'band', heading }: { locale: Locale; t: CtaExpertText; href: string; variant?: 'band' | 'card'; heading?: string }) {
  const [reg, setReg] = useState(locale === 'de' ? 1 : 0);
  const cta = `${t.cta}${REG[reg].name}${locale === 'de' ? ' vereinbaren' : ''}`;
  const ring = (i: number) => (reg === i ? '#A9DBF5' : '#2C4560');
  const Seg = ({ small }: { small?: boolean }) => (
    <div role="group" aria-label={t.region} className={`grid grid-cols-2 bg-ink-2 ${small ? 'gap-1 rounded-[14px] p-1' : 'gap-1.5 rounded-2xl p-[5px]'}`}>
      {REG.map((r, i) => (
        <button key={r.label} type="button" aria-pressed={reg === i} onClick={() => setReg(i)}
          className={`font-bold ${small ? 'min-h-11 rounded-[10px] text-sm' : 'min-h-12 rounded-xl text-[15px]'} ${reg === i ? 'bg-white text-ink' : 'bg-transparent text-muted-lighter'}`}>{r.label}</button>
      ))}
    </div>
  );

  if (variant === 'card') {
    return (
      <aside aria-labelledby="cta-card-h" className="flex flex-col gap-3.5 rounded-3xl bg-ink p-6 text-white">
        <div className="flex items-center gap-3">
          <span className="flex">
            <img src="/img/team/jack-kessels.webp" alt="" width={60} height={60} className="h-[60px] w-[60px] rounded-full border-[3px] bg-canvas object-cover" style={{ borderColor: ring(0) }} />
            <img src="/img/team/mark-dercksen.webp" alt="" width={60} height={60} className="-ml-3.5 h-[60px] w-[60px] rounded-full border-[3px] bg-canvas object-cover" style={{ borderColor: ring(1) }} />
          </span>
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-sky">{t.eyebrow}</span>
        </div>
        <h2 id="cta-card-h" className="m-0 font-display text-2xl font-extrabold leading-[1.12]">{heading ?? t.h}</h2>
        <p className="m-0 text-[15px] leading-[1.45] text-muted-lighter">{t.subShort}</p>
        <Seg small />
        <Link href={href} className="flex min-h-[54px] items-center justify-center rounded-full bg-sky px-4 text-center text-base font-extrabold text-ink no-underline hover:text-ink">{cta}</Link>
        <p className="m-0 text-center text-[13px] text-muted-light">{t.meta}</p>
      </aside>
    );
  }
  return (
    <section aria-labelledby="cta-band-h" className="mx-auto max-w-site px-6 pb-24 pt-6 print:hidden">
      <div className="flex flex-wrap items-center gap-10 rounded-panel bg-ink p-8 text-white md:p-11">
        <div className="flex flex-none items-center">
          <img src="/img/team/jack-kessels.webp" alt={t.altJack} width={132} height={132} loading="lazy" className="h-[132px] w-[132px] rounded-full border-4 bg-canvas object-cover" style={{ borderColor: ring(0) }} />
          <img src="/img/team/mark-dercksen.webp" alt={t.altMark} width={132} height={132} loading="lazy" className="-ml-7 h-[132px] w-[132px] rounded-full border-4 bg-canvas object-cover" style={{ borderColor: ring(1) }} />
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.08em] text-sky">{t.eyebrow}</span>
          <h2 id="cta-band-h" className="m-0 font-display text-[clamp(30px,3.4vw,44px)] font-extrabold leading-[1.04] tracking-[-0.03em]">{heading ?? t.h}</h2>
          <p className="m-0 text-lg leading-[1.5] text-muted-lighter">{t.sub}</p>
        </div>
        <div className="flex min-w-[260px] flex-[0_1_340px] flex-col gap-3">
          <span className="text-sm text-muted-light">{t.region}</span>
          <Seg />
          <Link href={href} className="flex h-[60px] items-center justify-center rounded-full bg-sky text-lg font-extrabold text-ink no-underline hover:text-ink">{cta}</Link>
          <p className="m-0 text-center text-sm text-muted-light">{t.meta}</p>
        </div>
      </div>
    </section>
  );
}
