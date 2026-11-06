'use client';

import { useMemo, useRef, useState } from 'react';
import { numberLocale, type Locale } from '@/lib/locale';
import { calculateScenario, DEFAULT_COST_INPUTS, DEFAULT_GLOBAL_INPUTS, DEFAULT_USE_CASE_INPUTS } from '@/lib/roi/scenario';
import type { CostInputs, UseCaseId, UseCaseInputs } from '@/lib/roi/types';
import { COST_FIELDS, FIELDS, TXT, UNITS, USE_CASES, type FieldDef } from '@/lib/roi/i18n';
import { track } from './Analytics';
import { LeadForm, type LeadUi } from './LeadForm';

type Values = Record<UseCaseId, Record<string, number>>;

/**
 * Full ROI calculator, running on www.actarion.com.
 * Same calculation engine as the former roicalculator.actarion.com, no third-party
 * libraries (chart is plain SVG, PDF via the browser's print dialog).
 * The first step is server-rendered, so crawlers see the use cases and labels.
 */
export function RoiCalculator({ locale, leadUi }: { locale: Locale; leadUi: LeadUi }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<UseCaseId[]>(['changeover']);
  const [values, setValues] = useState<Values>(() => JSON.parse(JSON.stringify(DEFAULT_USE_CASE_INPUTS)));
  const [costs, setCosts] = useState<CostInputs>({ ...DEFAULT_COST_INPUTS });
  const started = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const eur = useMemo(() => new Intl.NumberFormat(numberLocale[locale], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }), [locale]);
  const num = useMemo(() => new Intl.NumberFormat(numberLocale[locale], { maximumFractionDigits: 0 }), [locale]);

  const result = useMemo(
    () =>
      calculateScenario({
        global: DEFAULT_GLOBAL_INPUTS,
        costs,
        useCases: selected.map((id) => ({ id, payload: values[id] }) as unknown as UseCaseInputs),
      }),
    [selected, values, costs],
  );

  const go = (n: number) => {
    if (!started.current) {
      started.current = true;
      track('roi_calculator_start', { roi_variant: 'full', site_language: locale });
    }
    if (n === 3) track('roi_calculator_complete', { use_cases: selected.join(','), annual_benefit: Math.round(result.aggregated.totalAnnual), site_language: locale });
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggle = (id: UseCaseId) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const field = (f: FieldDef, value: number, onChange: (v: number) => void, prefix: string) => {
    const pct = f.kind === 'pct';
    return (
      <label key={f.id} className="flex flex-col gap-1.5 font-semibold">
        <span>{f.label[locale]}</span>
        <span className="flex items-center rounded-2xl border-2 border-line bg-white focus-within:border-primary">
          {f.kind === 'eur' && <span className="pl-4 text-muted">€</span>}
          <input
            id={`${prefix}-${f.id}`}
            type="number"
            inputMode="decimal"
            min={0}
            step={pct ? 0.1 : f.kind === 'eur' ? 10 : 1}
            value={pct ? Math.round(value * 1000) / 10 : value}
            onChange={(e) => {
              const v = Number(e.target.value);
              onChange(Number.isFinite(v) ? (pct ? v / 100 : v) : 0);
            }}
            className="h-14 w-full rounded-2xl bg-transparent px-4 font-mono text-lg outline-none"
          />
          {f.kind !== 'eur' && UNITS[f.kind][locale] && <span className="pr-4 text-muted">{UNITS[f.kind][locale]}</span>}
        </span>
      </label>
    );
  };

  const maxAbs = Math.max(...result.cumulativeCashflows.map(Math.abs), 1);

  return (
    <div ref={topRef} id="calculator" className="scroll-mt-24 rounded-panel border border-line bg-white p-5 md:p-8">
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Steps">
        {TXT.steps.map((s, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => i <= 3 && selected.length && go(i)}
              aria-current={step === i ? 'step' : undefined}
              className={`flex w-full flex-col items-start gap-1 rounded-2xl px-3 py-2 text-left text-sm font-bold ${step === i ? 'bg-ink text-white' : step > i ? 'bg-tint text-ink' : 'bg-canvas text-muted'}`}
            >
              <span className="font-mono">{i + 1}</span>
              <span className="hidden sm:inline">{s[locale]}</span>
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="h3 mb-4">{TXT.choose[locale]}</legend>
          <div className="grid gap-3 md:grid-cols-2">
            {USE_CASES.map((u) => {
              const on = selected.includes(u.id);
              return (
                <label key={u.id} className={`flex cursor-pointer items-start gap-3 rounded-card border-2 p-5 ${on ? 'border-primary bg-tint' : 'border-line bg-white'}`}>
                  <input type="checkbox" checked={on} onChange={() => toggle(u.id)} className="mt-1 h-5 w-5 accent-[#166FA9]" />
                  <span>
                    <span className="block text-lg font-bold">{u.label[locale]}</span>
                    <span className="block text-muted">{u.text[locale]}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-8">
          <p className="h3">{TXT.figures[locale]}</p>
          {selected.map((id) => (
            <fieldset key={id} className="flex flex-col gap-4 rounded-card bg-canvas p-5">
              <legend className="mb-2 font-display text-xl font-bold">{USE_CASES.find((u) => u.id === id)!.label[locale]}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {FIELDS[id].map((f) =>
                  field(f, values[id][f.id] ?? 0, (v) => setValues((s) => ({ ...s, [id]: { ...s[id], [f.id]: v } })), id),
                )}
              </div>
            </fieldset>
          ))}
        </div>
      )}

      {step === 2 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="h3 mb-4">{TXT.invest[locale]}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {COST_FIELDS.map((f) =>
              field(f, costs[f.id as keyof CostInputs], (v) => setCosts((c) => ({ ...c, [f.id]: v })), 'cost'),
            )}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-8" aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [TXT.annual[locale], eur.format(result.aggregated.totalAnnual)],
              [TXT.payback[locale], result.paybackMonths !== null ? `${result.paybackMonths} ${TXT.months[locale]}` : TXT.never[locale]],
              [TXT.roi[locale], `${num.format(result.roiHorizon)}%`],
              [TXT.npv[locale], eur.format(result.npv)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-card bg-ink p-5 text-white">
                <p className="text-sm text-muted-light">{k}</p>
                <p className="mt-1 font-mono text-2xl text-sky">{v}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="h3 mb-3 text-xl">{TXT.perUseCase[locale]}</h3>
            <ul className="flex flex-col gap-2">
              {result.useCases.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-4 rounded-2xl bg-canvas px-4 py-3">
                  <span className="font-semibold">{USE_CASES.find((x) => x.id === u.id)!.label[locale]}</span>
                  <span className="font-mono">{eur.format(u.benefits.totalAnnual)}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure>
            <h3 className="h3 mb-3 text-xl">{TXT.cumulative[locale]}</h3>
            <svg viewBox="0 0 800 230" className="h-auto w-full" role="img" aria-label={TXT.cumulative[locale]}>
              <line x1="0" y1="105" x2="800" y2="105" stroke="#DCE4EB" />
              {result.cumulativeCashflows.map((v, i) => {
                const h = (Math.abs(v) / maxAbs) * 95;
                const x = 50 + i * 190;
                return (
                  <g key={i}>
                    <rect x={x} y={v >= 0 ? 105 - h : 105} width="120" height={Math.max(h, 2)} rx="8" fill={v >= 0 ? '#166FA9' : '#A9DBF5'} />
                    <text x={x + 60} y="225" textAnchor="middle" fontSize="15" fill="#4A5D6E">{TXT.year[locale]} {i}</text>
                  </g>
                );
              })}
            </svg>
            <figcaption className="mt-2 flex flex-wrap gap-x-6 text-sm text-muted">
              {result.cumulativeCashflows.map((v, i) => <span key={i}>{TXT.year[locale]} {i}: <span className="font-mono">{eur.format(v)}</span></span>)}
            </figcaption>
            <p className="mt-2 text-sm text-muted">{TXT.adoption[locale]}</p>
          </figure>

          <div className="grid gap-6 rounded-card bg-canvas p-5 md:grid-cols-2 md:p-6 print:hidden">
            <div>
              <h3 className="h3 mb-2 text-xl">{TXT.report[locale]}</h3>
              <p className="text-muted">{TXT.reportText[locale]}</p>
              <button type="button" onClick={() => { track('roi_report_print', { site_language: locale }); window.print(); }} className="btn-outline mt-4 min-h-[48px]">
                {TXT.print[locale]}
              </button>
            </div>
            <LeadForm
              locale={locale}
              ui={leadUi}
              kind="roi"
              extra={{
                use_cases: selected.join(', '),
                annual_benefit_eur: Math.round(result.aggregated.totalAnnual),
                payback_months: result.paybackMonths ?? 'n/a',
                roi_3y_pct: Math.round(result.roiHorizon),
                inputs: JSON.stringify({ values: Object.fromEntries(selected.map((id) => [id, values[id]])), costs }),
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-line pt-6 print:hidden">
        {step > 0 ? <button type="button" onClick={() => go(step - 1)} className="btn-outline min-h-[48px]">{TXT.back[locale]}</button> : <span />}
        {step < 3 ? (
          <button type="button" disabled={!selected.length} onClick={() => go(step + 1)} className="btn-primary min-h-[48px] disabled:opacity-50">{TXT.next[locale]} →</button>
        ) : (
          <button type="button" onClick={() => go(0)} className="btn-outline min-h-[48px]">{TXT.restart[locale]}</button>
        )}
      </div>
    </div>
  );
}
