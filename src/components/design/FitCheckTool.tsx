'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@/components/Analytics';
import type { FitCheckCopy } from '@/content/design/fitCheck';
import { DesignSlider } from './DesignSlider';

/** TEMPORARY scoring per design — to be replaced by ActARion's own qualification model. */
export function fitScore(v: { mens: number; freq: number; spreiding: number; inwerk: number; fout: number; exp: number; meting: number }) {
  const herhaling = Math.min(100, Math.round((Math.log10(v.mens * v.freq + 1) / 4.3) * 100));
  const inwerkS = Math.min(100, Math.round((v.inwerk / 12) * 100));
  const foutS = (v.fout - 1) * 25;
  const expS = (v.exp - 1) * 25;
  const spreidS = [30, 65, 100][v.spreiding];
  const meetS = [100, 60, 15][v.meting];
  const score = Math.round(0.25 * herhaling + 0.15 * inwerkS + 0.2 * foutS + 0.15 * expS + 0.1 * spreidS + 0.15 * meetS);
  const level: 'strong' | 'mid' | 'low' = score >= 70 && v.meting < 2 ? 'strong' : score >= 50 ? 'mid' : 'low';
  return { score, level, factors: [herhaling, foutS, inwerkS, expS, meetS] };
}

const card = 'flex flex-col gap-1.5 rounded-[22px] border border-line bg-white p-[22px]';
const seg = (on: boolean) => `h-11 rounded-xl text-sm font-bold ${on ? 'bg-white shadow-[0_1px_4px_rgba(16,37,58,.18)]' : ''}`;

function Badge({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="mb-1 flex items-center gap-2.5 text-lg font-bold">
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sky font-mono text-sm">{n}</span>
      {children}
    </h2>
  );
}

function Row({ id, label, value, children }: { id: string; label: string; value: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-semibold">{label}</label>
        <output htmlFor={id}>{value}</output>
      </div>
      {children}
    </div>
  );
}

export function FitCheckTool({ t, ctaHref, mailHref }: { t: FitCheckCopy; ctaHref: string; mailHref: string }) {
  const [v, setV] = useState({ mens: 45, freq: 20, spreiding: 1, inwerk: 8, fout: 4, exp: 4, meting: 1 });
  const set = (p: Partial<typeof v>) => setV((o) => ({ ...o, ...p }));
  const r = fitScore(v);
  const o = t[r.level];
  const advies = r.level === 'mid' && v.meting === 2 && o.adviesNoMeasure ? o.adviesNoMeasure : o.advies;

  // Fire fit_check_complete once the visitor has interacted and the result settles.
  const touched = useRef(false);
  const sent = useRef('');
  useEffect(() => {
    if (!touched.current) { touched.current = true; return; }
    const id = window.setTimeout(() => {
      const key = `${r.score}-${r.level}`;
      if (sent.current === key) return;
      sent.current = key;
      track('fit_check_complete', { score: r.score, outcome: r.level, recommended_step: o.stap, ...v });
    }, 1500);
    return () => window.clearTimeout(id);
  }, [v]);

  return (
    <div className="flex flex-wrap items-start gap-7">
      <div className="flex min-w-0 max-w-[560px] flex-[1_1_520px] flex-col gap-3.5">
        <section className={card}>
          <Badge n={1}>{t.q1}</Badge>
          <Row id="f-mens" label={t.mens} value={<span className="font-mono text-2xl">{v.mens}</span>}>
            <DesignSlider id="f-mens" label={t.mens} min={2} max={500} value={v.mens} onChange={(x) => set({ mens: x })} />
          </Row>
          <Row id="f-freq" label={t.freq} value={<span className="font-mono text-2xl">{v.freq}</span>}>
            <DesignSlider id="f-freq" label={t.freq} min={1} max={200} value={v.freq} onChange={(x) => set({ freq: x })} />
          </Row>
          <div role="group" aria-labelledby="f-where" className="mt-1.5 flex flex-col gap-2">
            <span id="f-where" className="font-semibold">{t.where}</span>
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-tint p-[5px]">
              {t.spreiding.map((x, i) => <button key={x} type="button" aria-pressed={v.spreiding === i} onClick={() => set({ spreiding: i })} className={seg(v.spreiding === i)}>{x}</button>)}
            </div>
          </div>
        </section>
        <section className={card}>
          <Badge n={2}>{t.q2}</Badge>
          <Row id="f-inwerk" label={t.inwerk} value={<><span className="font-mono text-2xl">{v.inwerk}</span><span className="text-sm text-muted">{t.weeks}</span></>}>
            <DesignSlider id="f-inwerk" label={t.inwerk} min={1} max={26} value={v.inwerk} onChange={(x) => set({ inwerk: x })} />
          </Row>
          <Row id="f-fout" label={t.fout} value={<span className="text-lg font-bold">{t.foutLabels[v.fout - 1]}</span>}>
            <DesignSlider id="f-fout" label={t.fout} min={1} max={5} value={v.fout} onChange={(x) => set({ fout: x })} />
            <div className="flex justify-between text-[13px] text-muted" aria-hidden="true"><span>{t.foutMin}</span><span>{t.foutMax}</span></div>
          </Row>
          <div className="mt-1.5">
            <Row id="f-exp" label={t.exp} value={<span className="text-lg font-bold">{t.expLabels[v.exp - 1]}</span>}>
              <DesignSlider id="f-exp" label={t.exp} min={1} max={5} value={v.exp} onChange={(x) => set({ exp: x })} />
            </Row>
          </div>
          <p className="text-[13px] text-muted">{t.tip}</p>
        </section>
        <section className={`${card} gap-2.5`}>
          <Badge n={3}>{t.q3}</Badge>
          <div className="grid grid-cols-3 gap-2" role="group" aria-label={t.q3}>
            {t.meting.map((m, i) => (
              <button key={m.label} type="button" aria-pressed={v.meting === i} onClick={() => set({ meting: i })}
                className={`flex flex-col gap-1 rounded-2xl border-2 p-3.5 text-left ${v.meting === i ? 'border-primary bg-tint' : 'border-line bg-white'}`}>
                <span className="font-bold">{m.label}</span>
                <span className="text-[13px] leading-[1.35] text-muted">{m.uitleg}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5" aria-live="polite">
        <section className="flex flex-col gap-[18px] rounded-[28px] bg-ink p-[30px] text-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-sky">{t.outcome}</h2>
            <span className="rounded-full border border-[#3A5672] px-3 py-1.5 text-[13px] text-muted-light">{t.indicative}</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative h-[150px] w-[260px] max-w-full">
              <svg width="260" height="150" viewBox="0 0 220 128" aria-hidden="true" className="max-w-full">
                <path d="M20 118A90 90 0 0 1 200 118" fill="none" stroke="#2C4560" strokeWidth="16" strokeLinecap="round" />
                <path d="M20 118A90 90 0 0 1 200 118" fill="none" stroke="#A9DBF5" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${((r.score / 100) * 282.7).toFixed(1)} 400`} />
              </svg>
              <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[52px] leading-none"><span className="sr-only">{t.scoreLabel}: </span>{r.score}</p>
            </div>
            <div className="flex flex-[1_1_160px] flex-col gap-2">
              <p className="font-display text-[30px] font-extrabold leading-[1.05]">{o.oordeel}</p>
              <p className="leading-[1.45] text-muted-light">{advies}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 border-t border-ink-3 pt-4">
            <h3 className="text-sm font-bold">{t.factorsTitle}</h3>
            <dl className="flex flex-col gap-2.5">
              {t.factors.map((f, i) => (
                <div key={f} className="grid grid-cols-[minmax(0,150px)_1fr_40px] items-center gap-3 text-sm">
                  <dt className="text-muted-lighter">{f}</dt>
                  <span className="h-2 rounded-full bg-ink-3" aria-hidden="true"><span className="block h-2 rounded-full bg-sky" style={{ width: `${r.factors[i]}%` }} /></span>
                  <dd className="text-right font-mono text-muted-light">{r.factors[i]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="flex flex-col gap-3.5 rounded-[24px] bg-sky p-[26px]">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.08em]">{t.recommended}</h2>
          <p className="font-display text-[34px] font-extrabold">{o.stap}</p>
          <p className="leading-[1.45]">{o.stapUitleg}</p>
          <div className="flex flex-wrap gap-3">
            <a href={ctaHref} className="inline-flex h-[54px] items-center rounded-full bg-ink px-6 font-bold text-white no-underline">{o.stapCta}</a>
            <a href={mailHref} className="inline-flex h-[54px] items-center rounded-full border-2 border-ink px-5 font-bold text-ink no-underline">{t.mailResult}</a>
          </div>
        </section>
      </div>
    </div>
  );
}
