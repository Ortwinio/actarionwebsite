'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { numberLocale, type Locale } from '@/lib/locale';
import type { UiStrings } from '@/content/types';
import { track } from './Analytics';

const WEEKS = 46;

function Slider({ id, label, value, min, max, step, unit, onChange }: {
  id: string; label: string; value: number; min: number; max: number; step: number; unit?: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-semibold">{label}</label>
        <output htmlFor={id} className="font-mono text-xl">{value}{unit}</output>
      </div>
      <div className="relative h-11">
        <div className="absolute inset-x-0 top-[18px] h-2 rounded-full bg-line" />
        <div className="absolute left-0 top-[18px] h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
        <input id={id} className="rng absolute inset-0" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    </div>
  );
}

/**
 * Quick changeover estimate. The full multi-use-case calculator (payback, PDF report,
 * lead capture) is linked below and will be ported into this route in the next phase.
 */
export function RoiQuick({ locale, t, fullHref, compact = false }: { locale: Locale; t: UiStrings['roi']; fullHref: string; compact?: boolean }) {
  const [perWeek, setPerWeek] = useState(10);
  const [minutes, setMinutes] = useState(45);
  const [reduction, setReduction] = useState(25);
  const [rate, setRate] = useState(400);
  const started = useRef(false);

  const fmt = useMemo(() => new Intl.NumberFormat(numberLocale[locale], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }), [locale]);
  const hours = (perWeek * WEEKS * minutes * (reduction / 100)) / 60;
  const saving = hours * rate;

  const set = (fn: (v: number) => void) => (v: number) => {
    if (!started.current) {
      started.current = true;
      track('roi_calculator_start', { roi_variant: 'quick', site_language: locale });
    }
    fn(v);
  };

  return (
    <div className={`flex flex-col gap-3 rounded-card bg-white p-6 ${compact ? 'shadow-float' : 'border border-line md:p-8'}`}>
      <p className="eyebrow">{t.title}</p>
      <Slider id="roi-n" label={t.changeovers} value={perWeek} min={1} max={60} step={1} onChange={set(setPerWeek)} />
      <Slider id="roi-m" label={t.minutes} value={minutes} min={5} max={240} step={5} onChange={set(setMinutes)} />
      {!compact && <Slider id="roi-r" label={t.reduction} value={reduction} min={5} max={60} step={5} unit="%" onChange={set(setReduction)} />}
      {!compact && <Slider id="roi-c" label={t.rate} value={rate} min={50} max={2000} step={50} onChange={set(setRate)} />}
      <div aria-live="polite" className="mt-2 flex flex-col gap-1 rounded-2xl bg-ink p-4 text-white">
        <span className="text-sm text-muted-light">{t.result}</span>
        <span className="font-mono text-3xl text-sky">{fmt.format(saving)}</span>
        <span className="text-sm text-muted-light">{Math.round(hours).toLocaleString(numberLocale[locale])} {t.hours}</span>
      </div>
      <Link
        href={fullHref}
        onClick={() => track('roi_calculator_open_full', { site_language: locale })}
        className="inline-flex min-h-[44px] items-center font-bold"
      >
        {t.full} →
      </Link>
      {!compact && <p className="text-sm text-muted">{t.disclaimer}</p>}
    </div>
  );
}
