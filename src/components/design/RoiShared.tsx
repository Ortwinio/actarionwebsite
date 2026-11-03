'use client';

import type { ReactNode } from 'react';
import { chartBars, DRIVERS, fieldPct, type Benefits, type FieldDef, type Lang } from '@/lib/roi/design';
import type { RoiCopy } from '@/content/design/roi';

export type Fmt = ReturnType<typeof import('@/lib/roi/design').formatters>;

export const card = 'rounded-[24px] border border-line bg-white p-6';
export const mono = 'font-mono font-medium';

export function Badge({ nr }: { nr: number }) {
  return (
    <span className={`inline-flex h-[34px] flex-[0_0_34px] items-center justify-center rounded-full bg-sky text-[15px] ${mono}`}>{nr}</span>
  );
}

export function CardHead({ nr, title, right }: { nr: number; title: string; right?: ReactNode }) {
  const head = (
    <div className="flex items-center gap-3">
      <Badge nr={nr} />
      <h2 className="m-0 font-display text-[22px] font-bold">{title}</h2>
    </div>
  );
  if (!right) return head;
  return <div className="flex items-center justify-between gap-3">{head}{right}</div>;
}

export function Slider({ id, fd, value, label, unit, hint, shown, onChange, big }: { id: string; fd: FieldDef; value: number; label: string; unit?: string; hint?: string; shown: string; onChange: (v: number) => void; big?: boolean }) {
  const fill = fd.after ? '#1B81C4' : '#166FA9';
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-base font-semibold">{label}</label>
        <div className={`whitespace-nowrap text-[22px] ${mono}`}>
          {shown}
          {unit ? <span className="text-[13px] text-muted"> {unit}</span> : null}
        </div>
      </div>
      <div className="relative h-11">
        <div className="absolute inset-x-0 top-[18px] h-2 rounded-full bg-line" />
        <div className="absolute left-0 top-[18px] h-2 rounded-full" style={{ background: fill, width: `${fieldPct(fd, value)}%` }} />
        <input
          id={id}
          className={`rng absolute left-0 top-0 w-full focus-visible:rounded-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary-focus ${big ? 'rng-m' : ''}`}
          type="range"
          min={fd.min}
          max={fd.max}
          step={fd.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      {hint ? <div className="-mt-1 text-[13px] text-muted">{hint}</div> : null}
    </div>
  );
}

export function Tick({ on, size = 24 }: { on: boolean; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[7px] border-2 border-primary"
      style={{ flex: `0 0 ${size}px`, height: size, background: on ? '#166FA9' : '#FFFFFF' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 7.2l2.6 2.6L11 4.4" stroke={on ? '#FFFFFF' : 'transparent'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Cumulative cash-flow bar chart (viewBox 400×190). */
export function CashChart({ cum, f, t }: { cum: number[]; f: Fmt; t: RoiCopy['t'] }) {
  const { zeroY, bars } = chartBars(cum);
  const label = t.cumTitle + ': ' + bars.map((b, i) => t.years[i] + ' ' + f.keur(b.v)).join(', ');
  return (
    <svg viewBox="0 0 400 190" width="100%" role="img" aria-label={label} className="block">
      <line x1="0" y1={zeroY} x2="400" y2={zeroY} stroke="#5B7894" strokeWidth="1.5" />
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="72" height={b.h} rx="8" fill={b.pos ? '#A9DBF5' : 'transparent'} stroke={b.pos ? '#A9DBF5' : '#FFB199'} strokeWidth="2" strokeDasharray={b.pos ? '0' : '6 4'} />
          <text x={b.cx} y={b.ly} textAnchor="middle" className="font-mono" fontSize="13" fill="#FFFFFF">{f.keur(b.v)}</text>
          <text x={b.cx} y="186" textAnchor="middle" className="font-sans" fontSize="13" fill="#B8CBDA">{t.years[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export function driverRows(drv: Benefits, labels: RoiCopy['drivers'], f: Fmt) {
  const maxD = Math.max(1, drv.training, drv.quality, drv.downtime, drv.travel);
  return DRIVERS.filter((k) => drv[k] > 0 || k !== 'travel').map((k) => ({ k, label: labels[k], val: f.eur(drv[k]), pct: (drv[k] / maxD) * 100 }));
}

export function DriverList({ drv, labels, f, small }: { drv: Benefits; labels: RoiCopy['drivers']; f: Fmt; small?: boolean }) {
  return (
    <>
      {driverRows(drv, labels, f).map((d) => (
        <div key={d.k}>
          <div className={`flex justify-between gap-3 ${small ? 'text-sm' : 'text-[15px]'}`}>
            <span className="font-semibold">{d.label}</span>
            <span className={mono}>{d.val}</span>
          </div>
          <div className={`mt-1.5 rounded-full bg-[#EEF2F6] ${small ? 'h-2' : 'h-2.5'}`}>
            <div className="h-full rounded-full bg-primary" style={{ width: `${d.pct}%` }} />
          </div>
        </div>
      ))}
    </>
  );
}

export const LANG = (l: string): Lang => (l === 'en' || l === 'de' ? l : 'nl');
