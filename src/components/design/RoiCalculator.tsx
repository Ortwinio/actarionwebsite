'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/locale';
import type { RoiCopy } from '@/content/design/roi';
import { track } from '@/components/Analytics';
import {
  calculate, COST_FIELDS, decodeState, DEFAULT_STATE, encodeState, formatters, getValue, IMP, IMPACTS, INDUSTRIES,
  MOBILE_STEP_FIELDS, PRESETS, QUICK_GROUPS, REMOTE_FIELDS, setValue, UC_FIELDS, USE_CASES, sumBenefits, useCaseBenefits,
  type FieldDef, type RoiState,
} from '@/lib/roi/design';
import { CardHead, CashChart, DriverList, LANG, Slider, Tick, card, mono } from './RoiShared';

export type RoiCalcCopy = Omit<RoiCopy, 'how' | 'howMore' | 'report'>;

const segTrack = 'grid gap-1.5 rounded-2xl p-[5px]';
const segOn = 'bg-white shadow-[0_1px_4px_rgba(16,37,58,.18)]';
const pickBtn = (on: boolean) => (on ? 'border-primary bg-tint' : 'border-line bg-white');

export function RoiCalculatorDesign({ locale, c, reportHref, expertHref }: { locale: Locale; c: RoiCalcCopy; reportHref: string; expertHref: string }) {
  const [s, setS] = useState<RoiState>(DEFAULT_STATE);
  const [invest, setInvest] = useState(false);
  const [step, setStep] = useState(1);
  const t = c.t;
  const f = useMemo(() => formatters(LANG(locale)), [locale]);
  const r = useMemo(() => calculate(s), [s]);

  // Restore a calculation from the URL (e.g. "back to your calculation" from the report page).
  useEffect(() => {
    const restored = decodeState(window.location.search);
    if (restored) setS(restored);
  }, []);

  // Analytics: start on first interaction, complete once the user pauses after interacting.
  const started = useRef(false);
  const completed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const latest = useRef({ s, r });
  latest.current = { s, r };
  const complete = () => {
    if (completed.current) return;
    completed.current = true;
    const { s: cs, r: cr } = latest.current;
    track('roi_calculator_complete', { roi_mode: cs.mode, annual_savings: Math.round(cr.annual), payback_months: cr.payM, roi_3y: Math.round(cr.roi), site_language: locale });
  };
  const touch = () => {
    if (!started.current) {
      started.current = true;
      track('roi_calculator_start', { site_language: locale });
    }
    if (!completed.current) {
      clearTimeout(timer.current);
      timer.current = setTimeout(complete, 2500);
    }
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const update = (fn: (p: RoiState) => RoiState) => {
    touch();
    setS(fn);
  };
  const setField = (fd: FieldDef, v: number) => update((p) => setValue(p, fd, v));

  const slider = (fd: FieldDef, opts: { prefix?: string; hint?: boolean; label?: string; big?: boolean; shown?: string } = {}) => {
    const k = fd.bag + '.' + fd.key;
    const copy = c.fields[k as keyof typeof c.fields];
    const v = getValue(s, fd);
    return (
      <Slider
        key={k}
        id={`${opts.prefix || 'roi'}-${fd.bag}-${fd.key}`}
        fd={fd}
        value={v}
        label={opts.label || copy.l}
        unit={opts.shown ? undefined : copy.u}
        hint={opts.hint === false ? undefined : copy.h}
        shown={opts.shown || f.field(fd, v)}
        onChange={(nv) => setField(fd, nv)}
        big={opts.big}
      />
    );
  };

  const pickIndustry = (k: (typeof INDUSTRIES)[number]) => update((p) => ({ ...p, industry: k, q: { ...PRESETS[k] } }));
  const pickImpact = (k: (typeof IMPACTS)[number]) => update((p) => ({ ...p, impact: k }));
  const im = IMP[s.impact];
  const chips = [`−${Math.round(im.e * 100)}% ${t.chip.e}`, `−${Math.round(im.tr * 100)}% ${t.chip.tr}`, `−${Math.round(im.d * 100)}% ${t.chip.d}`];
  const rangeLine = r.range ? `${t.rangeLabel}: ${f.eur(r.range.lo)} – ${f.eur(r.range.hi)} ${t.rangeSuffix}` : t.rangeUc;
  const reportLink = `${reportHref}?${encodeState(s)}`;
  const investSummary = `${f.eur(s.costs.annual)} ${t.perYear} + ${f.eur(s.costs.once)} ${t.oneTime} · ${t.adjust}`;

  /* ---------------- desktop ---------------- */
  const modeSwitch = (
    <div className="hidden min-w-0 flex-[0_1_420px] flex-col gap-2 sm:flex">
      <span id="mode-lbl" className="text-sm font-bold text-muted">{t.modeLabel}</span>
      <div role="group" aria-labelledby="mode-lbl" className={`${segTrack} grid-cols-2 bg-[#E3EAF0]`}>
        {(['quick', 'usecase'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={s.mode === m}
            onClick={() => update((p) => ({ ...p, mode: m }))}
            className={`flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl px-2.5 py-1.5 text-ink ${s.mode === m ? segOn : 'bg-transparent'}`}
          >
            <span className="text-[15px] font-bold">{t.modes[m].label}</span>
            <span className="text-xs text-muted">{t.modes[m].sub}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const quickInputs = (
    <div className="flex flex-col gap-4">
      <section className={`${card} flex flex-col gap-4`}>
        <CardHead nr={1} title={t.s1} />
        <p className="m-0 text-[15px] text-muted">{t.s1hint}</p>
        <div role="group" aria-label={t.s1} className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
          {INDUSTRIES.map((k) => (
            <button key={k} type="button" aria-pressed={s.industry === k} onClick={() => pickIndustry(k)} className={`min-h-14 rounded-[14px] border-2 px-3.5 py-2.5 text-left text-[15px] font-bold text-ink ${pickBtn(s.industry === k)}`}>
              {c.industries[k]}
            </button>
          ))}
        </div>
      </section>
      {QUICK_GROUPS.map((g, gi) => (
        <section key={gi} className={`${card} flex flex-col gap-2.5`}>
          <div className="pb-1"><CardHead nr={gi + 2} title={t.groups[gi]} /></div>
          {g.map((fd) => slider(fd))}
        </section>
      ))}
      <section className={`${card} flex flex-col gap-3.5`}>
        <CardHead nr={4} title={t.s4} />
        <div role="group" aria-label={t.s4} className={`${segTrack} grid-cols-3 bg-[#EEF2F6]`}>
          {IMPACTS.map((k) => (
            <button key={k} type="button" aria-pressed={s.impact === k} onClick={() => pickImpact(k)} className={`min-h-12 rounded-xl text-[15px] font-bold text-ink ${s.impact === k ? segOn : 'bg-transparent'}`}>
              {c.impacts[k]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((x) => <span key={x} className={`rounded-full bg-tint px-3 py-1.5 text-[13px] ${mono}`}>{x}</span>)}
        </div>
        <p className="m-0 text-sm leading-[1.45] text-muted">{t.s4hint}</p>
        <button
          type="button"
          aria-expanded={s.remote}
          onClick={() => update((p) => ({ ...p, remote: !p.remote }))}
          className="flex min-h-[52px] items-center justify-between gap-3 rounded-[14px] border border-line bg-[#F7F9FB] px-4 text-left text-[15px] font-bold text-ink"
        >
          <span>{t.remoteToggle}</span>
          <span className="relative h-7 flex-[0_0_46px] rounded-full" style={{ background: s.remote ? '#166FA9' : '#B8C6D3' }}>
            <span className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(16,37,58,.3)] transition-[left]" style={{ left: s.remote ? 21 : 3 }} />
          </span>
        </button>
        {s.remote && <div className="flex flex-col gap-1.5">{REMOTE_FIELDS.map((fd) => slider(fd, { hint: false }))}</div>}
      </section>
    </div>
  );

  const ucInputs = (
    <div className="flex flex-col gap-4">
      <section className={`${card} flex flex-col gap-3.5`}>
        <CardHead nr={1} title={t.u1} />
        <p className="m-0 text-[15px] text-muted">{t.u1hint}</p>
        <div role="group" aria-label={t.u1} className="flex flex-col gap-2">
          {USE_CASES.map((k) => {
            const on = s.sel.includes(k);
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => update((p) => ({ ...p, sel: on ? p.sel.filter((x) => x !== k) : [...p.sel, k] }))}
                className={`flex min-h-16 items-center gap-3.5 rounded-2xl border-2 px-4 py-3 text-left text-ink ${pickBtn(on)}`}
              >
                <Tick on={on} />
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-base font-bold">{c.useCases[k].label}</span>
                  <span className="text-sm text-muted">{c.useCases[k].sub}</span>
                </span>
                <span className={`text-[13px] text-muted ${mono}`}>{c.useCases[k].drv}</span>
              </button>
            );
          })}
        </div>
      </section>
      {s.sel.map((k, i) => (
        <section key={k} className={`${card} flex flex-col gap-2.5`}>
          <div className="pb-1">
            <CardHead
              nr={i + 2}
              title={c.useCases[k].label}
              right={<span className={`rounded-full bg-sky px-3 py-1.5 text-[15px] ${mono}`}>{f.keur(sumBenefits(useCaseBenefits(s.u, k)))} / {t.perYearShort}</span>}
            />
          </div>
          {UC_FIELDS[k].map((fd) => slider(fd, { hint: false }))}
        </section>
      ))}
    </div>
  );

  const investCard = (
    <section className="rounded-[24px] border border-line bg-white p-2">
      <button
        type="button"
        aria-expanded={invest}
        aria-controls="roi-invest-panel"
        onClick={() => setInvest(!invest)}
        className="flex min-h-16 w-full items-center justify-between gap-3 rounded-[18px] bg-transparent px-4 py-2 text-left text-ink"
      >
        <span className="flex flex-col gap-0.5">
          <span className="font-display text-xl font-bold">{t.invest}</span>
          <span className="text-sm text-muted">{investSummary}</span>
        </span>
        <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: `rotate(${invest ? 180 : 0}deg)` }}>
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="#10253A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {invest && (
        <div id="roi-invest-panel" className="flex flex-col gap-1.5 px-4 pb-4 pt-1">
          {COST_FIELDS.map((fd) => slider(fd))}
          <div className="mt-1.5 rounded-[14px] bg-warn-bg px-3.5 py-3 text-sm leading-[1.45] text-warn-fg">{t.investNote}</div>
        </div>
      )}
    </section>
  );

  const results = (
    <aside aria-live="polite" aria-label={t.resLabel} className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
      <div className="flex flex-col gap-[22px] rounded-[28px] bg-ink p-7 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-sky">{t.resEyebrow}</span>
          <span className="rounded-full border border-[#3A5672] px-3 py-[5px] text-[13px] text-muted-light">{t.noEmail}</span>
        </div>
        <div>
          <div className="text-base text-muted-light">{t.annual}</div>
          <div className={`text-[clamp(44px,5vw,64px)] leading-[1.05] text-sky ${mono}`}>{f.eur(r.annual)}</div>
          <div className="mt-1.5 text-[15px] text-muted-lighter">{rangeLine}</div>
        </div>
        <div className="grid grid-cols-3 border-y border-ink-3">
          {[
            [t.payback, f.payback(r.payM), 'border-r border-ink-3 py-4 pr-3'],
            [t.roi3, f.roi(r.roi), 'border-r border-ink-3 px-3 py-4'],
            [t.npv, f.keur(r.npv), 'py-4 pl-3'],
          ].map(([l, v, cls]) => (
            <div key={l} className={cls}>
              <div className="text-[13px] text-muted-light">{l}</div>
              <div className={`mt-1 text-[28px] ${mono}`}>{v}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="text-base font-bold">{t.cumTitle}</div>
          <CashChart cum={r.cum} f={f} t={t} />
          <div className="flex flex-wrap gap-4 text-[13px] text-muted-light">
            <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 rounded bg-sky" />{t.legendPos}</span>
            <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 rounded border-2 border-dashed border-[#FFB199]" />{t.legendNeg}</span>
          </div>
        </div>
      </div>
      <div className={`${card} flex flex-col gap-3.5`}>
        <div className="text-[17px] font-bold">{t.drivers}</div>
        <DriverList drv={r.drivers} labels={c.drivers} f={f} />
        <div className="border-t border-line pt-1.5 text-[13px] leading-[1.45] text-muted">{t.assumptions}</div>
      </div>
      <div className="flex flex-col gap-3 rounded-[24px] bg-sky p-6">
        <div className="font-display text-2xl font-extrabold leading-[1.15]">{t.nextTitle}</div>
        <p className="m-0 text-[15px] leading-[1.45]">{t.nextSub}</p>
        <div className="flex flex-wrap gap-2.5">
          <a href={reportLink} rel="nofollow" onClick={complete} className="inline-flex h-[52px] items-center rounded-full bg-ink px-[22px] font-bold text-white no-underline hover:bg-ink-2">{t.ctaPdf}</a>
          <a href={expertHref} className="inline-flex h-[52px] items-center rounded-full border-2 border-ink px-5 font-bold text-ink no-underline hover:bg-white/40">{t.ctaCheck}</a>
        </div>
      </div>
    </aside>
  );

  /* ---------------- mobile stepped flow (< 640px), same state + calc ---------------- */
  const m = c.mobile;
  const quickUpdate = (fn: (p: RoiState) => RoiState) => update((p) => fn({ ...p, mode: 'quick' }));
  const goStep = (n: number) => {
    setStep(n);
    if (n === 5) {
      if (s.mode !== 'quick') setS((p) => ({ ...p, mode: 'quick' }));
      touch();
      complete();
    }
  };
  const mSlider = (fd: FieldDef) => {
    const v = getValue(s, fd);
    const shown = fd.key === 'err' ? f.num(v, 1) + '%' : fd.key === 'dt' ? `${f.num(v)} ${m.hourShort}` : f.num(v);
    return (
      <div key={fd.key} className="rounded-[18px] border border-line bg-white px-4 pb-2.5 pt-3.5">
        <Slider id={`m-${fd.key}`} fd={fd} value={v} label={m.labels[fd.key as keyof typeof m.labels]} shown={shown} onChange={(nv) => quickUpdate((p) => setValue(p, fd, nv))} big />
      </div>
    );
  };
  const h2m = 'm-0 font-display text-[28px] font-extrabold leading-[1.05]';
  const nextLabel = step < 4 ? m.next : step === 4 ? m.show : m.done;

  const mobile = (
    <div className="mx-auto flex max-w-site flex-col sm:hidden">
      <div className="flex flex-col gap-2 border-b border-line bg-white px-5 pb-3 pt-2">
        <div className="flex items-center justify-between">
          <p className="m-0 font-display text-[22px] font-extrabold">{m.title}</p>
          <span className={`text-[13px] text-muted ${mono}`}>{step < 5 ? m.stepOf.replace('{n}', String(step)) : m.result}</span>
        </div>
        <div role="progressbar" aria-label={m.progress} aria-valuemin={1} aria-valuemax={5} aria-valuenow={step} className="h-1.5 rounded-full bg-line">
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>
      <div className="flex flex-col gap-3 px-4 py-5">
        {step === 1 && (
          <>
            <h2 className={h2m}>{m.h1}</h2>
            <p className="m-0 text-[15px] text-muted">{t.s1hint}</p>
            <div role="group" aria-label={m.h1} className="grid grid-cols-2 gap-2">
              {INDUSTRIES.map((k) => (
                <button key={k} type="button" aria-pressed={s.industry === k} onClick={() => quickUpdate((p) => ({ ...p, industry: k, q: { ...PRESETS[k] } }))} className={`min-h-16 rounded-2xl border-2 px-3 py-2.5 text-left text-[15px] font-bold text-ink ${pickBtn(s.industry === k)}`}>
                  {c.industries[k]}
                </button>
              ))}
            </div>
          </>
        )}
        {(step === 2 || step === 3) && (
          <>
            <h2 className={`${h2m} mb-1.5`}>{step === 2 ? m.h2 : m.h3}</h2>
            {MOBILE_STEP_FIELDS[step - 2].map(mSlider)}
          </>
        )}
        {step === 4 && (
          <>
            <h2 className={h2m}>{m.h4}</h2>
            <div role="group" aria-label={m.h4} className="flex flex-col gap-2">
              {IMPACTS.map((k) => (
                <button key={k} type="button" aria-pressed={s.impact === k} onClick={() => quickUpdate((p) => ({ ...p, impact: k }))} className={`flex min-h-16 flex-col items-start justify-center gap-0.5 rounded-2xl border-2 px-4 py-3 text-left text-ink ${pickBtn(s.impact === k)}`}>
                  <span className="text-base font-bold">{c.impacts[k]}</span>
                  <span className={`text-xs text-muted ${mono}`}>−{Math.round(IMP[k].e * 100)}% {t.chip.e} · −{Math.round(IMP[k].tr * 100)}% {t.chip.tr} · −{Math.round(IMP[k].d * 100)}% {t.chip.d}</span>
                </button>
              ))}
            </div>
            <p className="m-0 text-sm text-muted">{t.s4hint}</p>
          </>
        )}
        {step === 5 && (
          <>
            <h2 className={h2m}>{m.h5}</h2>
            <div className="grid grid-cols-2 gap-2">
              {[[t.roi3, f.roi(r.roi)], [t.npv, f.keur(r.npv)]].map(([l, v]) => (
                <div key={l} className="rounded-2xl border border-line bg-white p-3.5">
                  <div className="text-[13px] text-muted">{l}</div>
                  <div className={`text-[26px] ${mono}`}>{v}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-3.5">
              <DriverList drv={r.drivers} labels={c.drivers} f={f} small />
            </div>
            <a href={reportLink} rel="nofollow" className="flex h-14 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white no-underline">{t.ctaPdf}</a>
          </>
        )}
      </div>
      <div className="sticky bottom-0 z-[2] flex flex-col gap-2.5 border-t border-line bg-white px-3 pb-3.5 pt-2.5">
        <div aria-live="polite" className="flex items-center justify-between rounded-2xl bg-ink px-3.5 py-2.5 text-white">
          <div>
            <div className="text-xs text-muted-light">{m.liveAnnual}</div>
            <div className={`text-2xl text-sky ${mono}`}>{f.eur(r.annual)}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-muted-light">{m.livePayback}</div>
            <div className={`text-xl ${mono}`}>{f.payback(r.payM)}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label={m.prev} onClick={() => goStep(Math.max(1, step - 1))} className="inline-flex h-[52px] w-14 items-center justify-center rounded-full border-2 border-ink bg-white" style={{ opacity: step === 1 ? 0.4 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="#10253A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={() => goStep(Math.min(5, step + 1))} className="h-[52px] flex-1 rounded-full bg-primary text-[17px] font-bold text-white">{nextLabel}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div id="calculator">
      <style>{'.rng-m::-webkit-slider-thumb{width:32px;height:32px;margin-top:6px}.rng-m::-moz-range-thumb{width:24px;height:24px}'}</style>
      <section className="mx-auto flex max-w-site flex-wrap items-end justify-between gap-7 px-6 pb-8 pt-8 sm:pt-12">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-4">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-primary">{t.eyebrow}</div>
          <h1 className="m-0 font-display text-[clamp(38px,4.6vw,62px)] font-extrabold leading-none tracking-[-0.035em]">{t.h1}</h1>
          <p className="m-0 max-w-[640px] text-[19px] leading-normal text-muted">{t.lead}</p>
        </div>
        {modeSwitch}
      </section>
      {mobile}
      <div className="mx-auto hidden max-w-site flex-wrap items-start gap-7 px-6 pb-24 sm:flex">
        <div className="flex min-w-0 max-w-[620px] flex-[1_1_540px] flex-col gap-4">
          {s.mode === 'quick' ? quickInputs : ucInputs}
          {investCard}
        </div>
        {results}
      </div>
    </div>
  );
}

