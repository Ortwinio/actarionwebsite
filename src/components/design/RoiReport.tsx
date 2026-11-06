'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/lib/locale';
import type { RoiCopy } from '@/content/design/roi';
import { track } from '@/components/Analytics';
import {
  calculate, CONST, decodeState, DEFAULT_STATE, encodeState, formatters, getValue, UC_FIELDS,
  QUICK_GROUPS, REMOTE_FIELDS, COST_FIELDS, type FieldDef, type RoiState,
} from '@/lib/roi/design';
import { DriverList, LANG, Tick, mono } from './RoiShared';

export type RoiReportCopy = Pick<RoiCopy, 'report' | 't' | 'drivers' | 'industries' | 'impacts' | 'useCases' | 'fields'>;

const input = 'box-border h-[52px] w-full rounded-[14px] border-[1.5px] border-[#B8C6D3] bg-white px-4 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary-focus';
const check = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7.2l2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function RoiReportClient({ locale, c, hrefs }: { locale: Locale; c: RoiReportCopy; hrefs: { back: string; plan: string; pilot: string; privacy: string } }) {
  const R = c.report;
  const t = c.t;
  const f = useMemo(() => formatters(LANG(locale)), [locale]);
  const [s, setS] = useState<RoiState>(DEFAULT_STATE);
  const [fromUrl, setFromUrl] = useState(true);
  const [month, setMonth] = useState('');
  const [rol, setRol] = useState(1);
  const [consult, setConsult] = useState(true);
  const [mail, setMail] = useState('');
  const [company, setCompany] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'sent' | 'err'>('idle');

  useEffect(() => {
    const d = decodeState(window.location.search);
    if (d) setS(d);
    setFromUrl(!!d);
    setMonth(new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date()));
  }, [locale]);

  const r = useMemo(() => calculate(s), [s]);
  const backHref = fromUrl ? `${hrefs.back}?${encodeState(s)}` : hrefs.back;
  const kpis = [
    [R.kAnnual, f.eur(r.annual)],
    [t.payback, f.payback(r.payM)],
    [t.roi3, f.roi(r.roi)],
    [t.npv, f.keur(r.npv)],
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('busy');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data,
          kind: 'roi',
          locale,
          page: location.pathname,
          role: R.roles[rol],
          consult: consult ? 'yes' : 'no',
          roi_mode: s.mode,
          annual_savings: Math.round(r.annual),
          payback_months: r.payM ?? '>36',
          roi_3y_pct: Math.round(r.roi),
          npv: Math.round(r.npv),
          annual_cost: s.costs.annual,
          one_time_cost: s.costs.once,
          calc: encodeState(s),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('roi_report_request', { roi_mode: s.mode, annual_savings: Math.round(r.annual), consult, site_language: locale });
      track('generate_lead', { form_type: 'roi', site_language: locale });
      setState('sent');
    } catch {
      setState('err');
    }
  }

  const fieldLabel = (fd: FieldDef) => c.fields[(fd.bag + '.' + fd.key) as keyof typeof c.fields];
  const inputRows: FieldDef[] =
    s.mode === 'quick'
      ? [...QUICK_GROUPS.flat(), ...(s.remote ? REMOTE_FIELDS : []), ...COST_FIELDS]
      : [...s.sel.flatMap((k) => UC_FIELDS[k]), ...COST_FIELDS];

  return (
    <div className="mx-auto flex max-w-site flex-wrap items-start gap-8 px-6 pb-24 pt-12">
      <style>{'@media print{header,footer,nav,.no-print{display:none!important}.print-only{display:block!important}body{background:#fff!important}}'}</style>

      <div className="no-print flex min-w-0 flex-[1_1_560px] flex-col gap-6">
        <a href={backHref} rel="nofollow" className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-primary no-underline hover:text-primary-hover">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="#166FA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {R.back}
        </a>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-primary">{R.eyebrow}</div>
          <h1 className="m-0 font-display text-[clamp(36px,4vw,54px)] font-extrabold leading-[1.02] tracking-[-0.03em]">{R.h1}</h1>
        </div>

        <div aria-live="polite" className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] rounded-[24px] bg-ink py-2 text-white">
          {kpis.map(([l, v], i) => (
            <div key={l} className={`px-[22px] py-4 ${i < kpis.length - 1 ? 'border-r border-ink-3' : ''}`}>
              <div className="text-[13px] text-muted-light">{l}</div>
              <div className={`text-[28px] ${mono} ${i === 0 ? 'text-sky' : ''}`}>{v}</div>
            </div>
          ))}
        </div>
        {!fromUrl && <p className="m-0 text-sm text-muted">{R.noData}</p>}

        {state !== 'sent' ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-[18px] rounded-[24px] border border-line bg-white p-7">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="r-naam" className="font-semibold">{R.name}</label>
                <input id="r-naam" name="name" type="text" autoComplete="name" placeholder={R.namePh} className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="r-mail" className="font-semibold">{R.mail}</label>
                <input id="r-mail" name="email" type="email" required autoComplete="email" placeholder={R.mailPh} value={mail} onChange={(e) => setMail(e.target.value)} className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="r-bedrijf" className="font-semibold">{R.company}</label>
                <input id="r-bedrijf" name="company" type="text" autoComplete="organization" placeholder={R.companyPh} value={company} onChange={(e) => setCompany(e.target.value)} className={input} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span id="r-rol" className="font-semibold">{R.role}</span>
              <div role="group" aria-labelledby="r-rol" className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-1.5 rounded-2xl bg-[#EEF2F6] p-[5px]">
                {R.roles.map((x, i) => (
                  <button key={x} type="button" aria-pressed={rol === i} onClick={() => setRol(i)} className={`min-h-11 rounded-xl text-[15px] font-bold text-ink ${rol === i ? 'bg-white shadow-[0_1px_4px_rgba(16,37,58,.18)]' : 'bg-transparent'}`}>
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" aria-pressed={consult} onClick={() => setConsult(!consult)} className={`flex min-h-16 items-center gap-3.5 rounded-2xl border-2 px-4 py-3 text-left text-ink ${consult ? 'border-primary bg-tint' : 'border-line bg-white'}`}>
              <Tick on={consult} />
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-bold">{R.consultTitle}</span>
                <span className="text-sm text-muted">{R.consultSub}</span>
              </span>
            </button>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={state === 'busy'} className="h-14 rounded-full bg-primary px-7 text-[17px] font-bold text-white hover:bg-primary-hover disabled:opacity-60">{R.submit}</button>
              <span className="text-sm text-muted">{R.submitNote}</span>
            </div>
            {state === 'err' && <p role="alert" className="m-0 font-semibold text-red-700">{R.error}</p>}
            <div className="flex items-center gap-3 rounded-[14px] border border-line bg-canvas px-4 py-3.5">
              <Image src="/img/team/mark-dercksen.webp" alt="" width={44} height={44} sizes="44px" loading="lazy" className="h-11 w-11 flex-none rounded-full border border-line object-cover" />
              <p className="m-0 text-sm leading-normal">
                {R.copyA}<strong>{R.copyB}</strong>{R.copyC}<a href={hrefs.privacy}>{R.privacy}</a>.
              </p>
            </div>
          </form>
        ) : (
          <div role="status" className="flex flex-col gap-3 rounded-[24px] bg-sky p-7">
            <div className="font-display text-[30px] font-extrabold">{R.sentTitle}</div>
            {[
              [R.sentTo, mail.trim() || R.mailPh],
              [R.copyTo, 'Mark Dercksen'],
            ].map(([a, b], i) => (
              <div key={a} className="flex items-center gap-2 text-base">
                <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-white">{check}</span>
                <span>{a} <strong>{b}</strong>{i === 1 ? ' (mark@actarion.com)' : ''}</span>
              </div>
            ))}
            <p className="m-0 text-[17px] leading-normal">{consult ? R.sentConsult : R.sentNoConsult}</p>
            <div className="flex flex-wrap gap-2.5">
              <a href={hrefs.plan} className="inline-flex h-[52px] items-center rounded-full bg-ink px-[22px] font-bold text-white no-underline">{R.plan}</a>
              <a href={hrefs.pilot} className="inline-flex h-[52px] items-center rounded-full border-2 border-ink px-5 font-bold text-ink no-underline">{R.pilot}</a>
            </div>
          </div>
        )}
        <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-primary hover:text-primary-hover">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6V2h8v4M4 12H2V7h12v5h-2M4 10h8v4H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          {R.print}
        </button>
      </div>

      <aside className="no-print flex min-w-0 flex-[1_1_380px] flex-col gap-4">
        <div className="flex justify-center rounded-[24px] border border-line bg-white p-7">
          <div aria-hidden="true" className="flex w-[300px] max-w-full -rotate-2 flex-col gap-3 rounded-[10px] bg-white p-[22px] shadow-[0_18px_40px_rgba(16,37,58,.18)]">
            <div className="flex items-center gap-2">
              <Image src="/Actarionlogo.png" alt="" width={24} height={24} sizes="24px" loading="lazy" />
              <span className="font-display text-[15px] font-extrabold">Act<span className="text-primary-focus">AR</span>ion</span>
            </div>
            <div className="font-display text-xl font-extrabold leading-[1.1]">{R.paperTitle}</div>
            <div className="text-xs text-muted">{company.trim() || R.paperCompany} · {month}</div>
            <div className="flex justify-between rounded-lg bg-ink p-3">
              <span className={`text-base text-sky ${mono}`}>{f.eur(r.annual)}</span>
              <span className={`text-base text-white ${mono}`}>{f.payback(r.payM)}</span>
            </div>
            <MiniChart cum={r.cum} />
            {[100, 80, 60].map((w) => <div key={w} className="h-1.5 rounded-[9px] bg-line" style={{ width: `${w}%` }} />)}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-[24px] bg-ink p-[26px] text-white">
          <div className="text-lg font-bold">{R.contentsTitle}</div>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {R.contents.map((x) => (
              <li key={x} className="flex gap-3 leading-[1.45] text-muted-lighter">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sky text-ink">{check}</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Print-only full report */}
      <section className="print-only hidden w-full text-ink">
        <div className="mb-4 flex items-center gap-2">
          <Image src="/Actarionlogo.png" alt="" width={28} height={28} sizes="28px" />
          <span className="font-display text-lg font-extrabold">ActARion</span>
        </div>
        <h2 className="m-0 font-display text-3xl font-extrabold">{R.paperTitle}</h2>
        <p className="mt-1 text-sm text-muted">{company.trim() || R.paperCompany} · {month}</p>
        <table className="mt-4 w-full border-collapse text-sm">
          <tbody>
            {kpis.map(([l, v]) => (
              <tr key={l} className="border-b border-line"><th scope="row" className="py-1.5 text-left font-normal">{l}</th><td className={`py-1.5 text-right ${mono}`}>{v}</td></tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-6 text-lg font-bold">{R.pCash}</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b-2 border-ink">{R.pCashHead.map((h, i) => <th key={h} scope="col" className={`py-1.5 ${i ? 'text-right' : 'text-left'}`}>{h}</th>)}</tr></thead>
          <tbody>
            <tr className="border-b border-line"><td className="py-1.5">{t.years[0]}</td><td className="text-right">–</td><td className="text-right">–</td><td className={`text-right ${mono}`}>{f.eur(s.costs.once)}</td><td className={`text-right ${mono}`}>{f.eur(-s.costs.once)}</td><td className={`text-right ${mono}`}>{f.eur(r.cum[0])}</td></tr>
            {r.net.map((n, i) => (
              <tr key={i} className="border-b border-line">
                <td className="py-1.5">{t.years[i + 1]}</td>
                <td className="text-right">{Math.round(CONST.adoption[i] * 100)}%</td>
                <td className={`text-right ${mono}`}>{f.eur(r.benefitsYear[i])}</td>
                <td className={`text-right ${mono}`}>{f.eur(s.costs.annual)}</td>
                <td className={`text-right ${mono}`}>{f.eur(n)}</td>
                <td className={`text-right ${mono}`}>{f.eur(r.cum[i + 1])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-6 text-lg font-bold">{t.drivers}</h3>
        <div className="flex flex-col gap-2"><DriverList drv={r.drivers} labels={c.drivers} f={f} small /></div>

        <h3 className="mt-6 text-lg font-bold">{R.pSens}</h3>
        {r.sensitivity ? (
          <table className="w-full border-collapse text-sm">
            <thead><tr className="border-b-2 border-ink"><th className="py-1.5 text-left">{R.pImpact}</th><th className="text-right">{R.kAnnual}</th><th className="text-right">{t.payback}</th><th className="text-right">{t.roi3}</th><th className="text-right">{t.npv}</th></tr></thead>
            <tbody>
              {r.sensitivity.map((x) => (
                <tr key={x.impact} className="border-b border-line">
                  <td className="py-1.5">{c.impacts[x.impact]}</td>
                  <td className={`text-right ${mono}`}>{f.eur(x.annual)}</td>
                  <td className={`text-right ${mono}`}>{f.payback(x.fin.payM)}</td>
                  <td className={`text-right ${mono}`}>{f.roi(x.fin.roi)}</td>
                  <td className={`text-right ${mono}`}>{f.keur(x.fin.npv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm">{R.pSensUc}</p>
        )}

        <h3 className="mt-6 text-lg font-bold">{R.pInputs}</h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-line"><th scope="row" className="py-1.5 text-left font-normal">{R.pMode}</th><td className="text-right">{t.modes[s.mode].label}</td></tr>
            {s.mode === 'quick' ? (
              <>
                <tr className="border-b border-line"><th scope="row" className="py-1.5 text-left font-normal">{R.pIndustry}</th><td className="text-right">{c.industries[s.industry]}</td></tr>
                <tr className="border-b border-line"><th scope="row" className="py-1.5 text-left font-normal">{R.pImpact}</th><td className="text-right">{c.impacts[s.impact]}</td></tr>
              </>
            ) : (
              <tr className="border-b border-line"><th scope="row" className="py-1.5 text-left font-normal">{R.pUseCases}</th><td className="text-right">{s.sel.map((k) => c.useCases[k].label).join(', ') || '–'}</td></tr>
            )}
            {inputRows.map((fd) => (
              <tr key={fd.bag + fd.key} className="border-b border-line">
                <th scope="row" className="py-1.5 text-left font-normal">{fieldLabel(fd).l}</th>
                <td className={`text-right ${mono}`}>{f.field(fd, getValue(s, fd))} {fieldLabel(fd).u}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-muted">{t.assumptions}</p>
      </section>
    </div>
  );
}

/** Small cumulative cash-flow sketch for the PDF mock (viewBox 256×70), driven by real values. */
function MiniChart({ cum }: { cum: number[] }) {
  const vals = cum;
  const max = Math.max(1, ...vals.map((v) => Math.abs(v)));
  const base = 46;
  return (
    <svg viewBox="0 0 256 70" width="100%">
      <line x1="0" y1={base} x2="256" y2={base} stroke="#B8C6D3" />
      {vals.map((v, i) => {
        const x = 10 + i * 62;
        if (v < 0) {
          const h = Math.max(2, (Math.abs(v) / max) * 22);
          return <rect key={i} x={x} y={base} width="44" height={h} rx="4" fill="none" stroke="#FFB199" strokeWidth="2" strokeDasharray="5 3" />;
        }
        const h = Math.max(2, (v / max) * 42);
        return <rect key={i} x={x} y={base - h} width="44" height={h} rx="4" fill="#A9DBF5" />;
      })}
    </svg>
  );
}
