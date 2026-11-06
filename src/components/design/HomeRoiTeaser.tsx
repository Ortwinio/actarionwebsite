'use client';
import { useState } from 'react';

export interface HomeRoiTeaserText {
  eyebrow: string;
  title: string;
  ops: string;
  dt: string;
  hYear: string;
  res: string;
  link: string;
}

export function teaserValue(ops: number, dt: number) {
  const nNew = Math.round(ops * 0.24);
  return nNew * 24 * 0.4 * 100 + ops * 400 * 0.03 * 0.5 * 250 + dt * 0.4 * 2000;
}

export function HomeRoiTeaser({ t, href, numberLocale }: { t: HomeRoiTeaserText; href: string; numberLocale: string }) {
  const [ops, setOps] = useState(25);
  const [dt, setDt] = useState(40);
  const opsPct = ((ops - 5) / 295) * 100;
  const dtPct = (dt / 400) * 100;
  const fmt = new Intl.NumberFormat(numberLocale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const val = fmt.format(Math.round(teaserValue(ops, dt)));

  return (
    <div className="relative flex max-w-[380px] flex-col gap-[6px] rounded-[22px] border border-line bg-white p-[18px] md:ml-auto md:mr-6 md:mt-[-120px] md:gap-2 md:border-0 md:p-[22px] md:shadow-[0_18px_40px_rgba(16,37,58,.16)] max-md:max-w-none">
      <p className="m-0 text-[12px] font-bold uppercase tracking-[0.08em] text-primary md:text-[13px]">{t.eyebrow}</p>
      <p className="m-0 hidden font-display text-[22px] font-bold leading-[1.15] md:block">{t.title}</p>

      <div className="flex items-baseline justify-between">
        <label htmlFor="t-op" className="text-[15px] font-semibold">{t.ops}</label>
        <span className="font-mono text-[20px]">{ops}</span>
      </div>
      <div className="relative h-[44px]">
        <div className="absolute inset-x-0 top-[18px] h-2 rounded-[99px] bg-line" />
        <div className="absolute left-0 top-[18px] h-2 rounded-[99px] bg-primary" style={{ width: `${opsPct}%` }} />
        <input id="t-op" type="range" className="rng relative" min={5} max={300} step={1} value={ops} onChange={(e) => setOps(Number(e.target.value))} />
      </div>

      <div className="hidden md:block">
        <div className="flex items-baseline justify-between">
          <label htmlFor="t-dt" className="text-[15px] font-semibold">{t.dt}</label>
          <span className="font-mono text-[20px]">
            {dt}
            <span className="font-sans text-[13px] text-muted"> {t.hYear}</span>
          </span>
        </div>
        <div className="relative h-[44px]">
          <div className="absolute inset-x-0 top-[18px] h-2 rounded-[99px] bg-line" />
          <div className="absolute left-0 top-[18px] h-2 rounded-[99px] bg-primary" style={{ width: `${dtPct}%` }} />
          <input id="t-dt" type="range" className="rng relative" min={0} max={400} step={5} value={dt} onChange={(e) => setDt(Number(e.target.value))} />
        </div>
      </div>

      <div aria-live="polite" className="flex items-baseline justify-between gap-3 rounded-[14px] bg-ink px-[14px] py-3">
        <span className="text-[14px] text-muted-light">{t.res}</span>
        <span className="font-mono text-[22px] text-sky md:text-[24px]">{val}</span>
      </div>
      <a href={href} className="inline-flex min-h-[36px] items-center text-[15px] font-bold text-primary underline hover:text-primary-hover">
        {t.link}
      </a>
    </div>
  );
}
