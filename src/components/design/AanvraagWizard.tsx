'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@/components/Analytics';
import type { AanvraagCopy } from '@/content/design/aanvraag';
import type { Locale } from '@/lib/locale';
import { DesignSlider } from './DesignSlider';

type Kind = 'demo' | 'contact' | 'partner';

const sel = (on: boolean) => (on ? 'border-2 border-primary bg-tint' : 'border-2 border-line bg-white hover:border-muted-light');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const inputCls = 'h-[50px] w-full rounded-xl border-2 bg-white px-4 text-base font-normal outline-none focus:border-primary-focus';

interface Day { wd: string; d: number; label: string; iso: string }

function nextWorkdays(locale: Locale, n = 5): Day[] {
  const out: Day[] = [];
  const dt = new Date();
  const numLoc = locale === 'nl' ? 'nl-NL' : locale === 'de' ? 'de-DE' : 'en-GB';
  while (out.length < n) {
    dt.setDate(dt.getDate() + 1);
    const wdN = dt.getDay();
    if (wdN === 0 || wdN === 6) continue;
    out.push({
      wd: dt.toLocaleDateString(numLoc, { weekday: 'short' }).replace('.', ''),
      d: dt.getDate(),
      label: dt.toLocaleDateString(numLoc, { weekday: 'short', day: 'numeric', month: 'short' }),
      iso: dt.toISOString().slice(0, 10),
    });
  }
  return out;
}

export function AanvraagWizard({
  t, kind, locale, page, guideHref, homeHref,
}: { t: AanvraagCopy; kind: Kind; locale: Locale; page: string; guideHref: string; homeHref: string }) {
  const types = kind === 'partner' ? t.partnerTypes : t.types;
  const [s, setS] = useState({ stap: 1, type: 0, proces: 1, mens: 60, loc: 2, regio: locale === 'de' ? 1 : 0, dag: 1, tijd: 2, naam: '', mail: '', bedrijf: '', tel: '', bericht: '', rol: 0, nieuws: false });
  const [days, setDays] = useState<Day[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const set = (p: Partial<typeof s>) => setS((o) => ({ ...o, ...p }));

  useEffect(() => setDays(nextWorkdays(locale)), [locale]);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    h1Ref.current?.focus();
    h1Ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [s.stap]);

  const isDemo = kind !== 'partner' && s.type === 0;
  const T = types[s.type];
  const contact = t.contacts[s.regio];
  const day = days[s.dag];
  const moment = day ? `${day.label} · ${t.times[s.tijd]}` : '…';
  const procesNaam = t.processes[s.proces];

  function validate() {
    const e: Record<string, string> = {};
    if (!s.naam.trim()) e.naam = t.errRequired;
    if (!s.mail.trim()) e.mail = t.errRequired;
    else if (!EMAIL.test(s.mail.trim())) e.mail = t.errEmail;
    if (!s.bedrijf.trim()) e.bedrijf = t.errRequired;
    setErrors(e);
    const firstKey = Object.keys(e)[0];
    if (firstKey) document.getElementById(`aw-${firstKey}`)?.focus();
    return !firstKey;
  }

  async function submit() {
    if (!validate()) return;
    setSending(true);
    setSendError(false);
    const fd = (document.getElementById('aw-website') as HTMLInputElement | null)?.value ?? '';
    const summary = [
      `${T.naam}`,
      `${t.sumProcess}: ${procesNaam}`,
      `${t.sumScale}: ${s.mens} ${t.people} · ${s.loc} ${s.loc === 1 ? t.site : t.sites}`,
      `${t.regionLabel}: ${t.regions[s.regio]}`,
      `${t.roleLabel}: ${t.roles[s.rol]}`,
      isDemo ? `${t.sumMoment}: ${moment}` : '',
    ].filter(Boolean).join('\n');
    const payload = {
      name: s.naam.trim(),
      company: s.bedrijf.trim(),
      email: s.mail.trim(),
      phone: s.tel.trim() || undefined,
      message: s.bericht.trim() ? `${s.bericht.trim()}\n\n${summary}` : summary,
      kind,
      locale,
      page,
      requestType: T.naam,
      process: procesNaam,
      employees: s.mens,
      sites: s.loc,
      region: t.regions[s.regio],
      role: t.roles[s.rol],
      slot: isDemo && day ? `${day.iso} ${t.times[s.tijd]}` : undefined,
      newsletter: s.nieuws,
      website: fd,
    };
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      track('generate_lead', { lead_kind: kind, request_type: T.naam, process: procesNaam, region: t.regions[s.regio], employees: s.mens, sites: s.loc, newsletter: s.nieuws, locale });
      set({ stap: 4 });
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  function field(key: 'naam' | 'mail' | 'bedrijf' | 'tel', label: string, ph: string, type: string, autoComplete: string, required: boolean) {
    const err = errors[key];
    return (
      <label className="flex flex-col gap-1.5 text-[15px] font-bold" htmlFor={`aw-${key}`}>
        {label}
        <input
          id={`aw-${key}`}
          type={type}
          placeholder={ph}
          autoComplete={autoComplete}
          required={required}
          aria-required={required || undefined}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `aw-${key}-err` : undefined}
          value={s[key]}
          onChange={(e) => { set({ [key]: e.target.value } as Partial<typeof s>); if (err) setErrors((o) => ({ ...o, [key]: '' })); }}
          className={`${inputCls} ${err ? 'border-[#B42318]' : 'border-line'}`}
        />
        {err && <span id={`aw-${key}-err`} className="text-sm font-semibold text-[#B42318]">{err}</span>}
      </label>
    );
  }

  const h1Cls = 'font-display font-extrabold leading-[1.02] tracking-[-0.03em] outline-none';

  return (
    <div className="mx-auto flex max-w-site flex-wrap items-start gap-10 px-6 pb-20 pt-12">
      <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-7">
        {/* Stepper */}
        <ol className="flex flex-wrap gap-2" aria-label={t.sumEyebrow}>
          {t.steps.map((label, i) => {
            const n = i + 1;
            const cur = n === s.stap;
            return (
              <li key={label} aria-current={cur ? 'step' : undefined}
                className={`inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-3.5 text-sm font-bold ${cur ? 'bg-ink text-white' : n < s.stap ? 'bg-tint text-muted' : 'text-muted'}`}>
                <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full font-mono text-[13px] text-ink ${n <= s.stap ? 'bg-sky' : 'bg-line'}`}>{n}</span>
                {label}
              </li>
            );
          })}
        </ol>

        {s.stap === 1 && (
          <div className="flex flex-col gap-5">
            <h1 ref={h1Ref} tabIndex={-1} className={`${h1Cls} text-[clamp(36px,4vw,48px)]`}>{kind === 'partner' ? t.partnerTitle : t.h1Choice}</h1>
            <p className="text-lg text-muted">{kind === 'partner' ? t.partnerLead : t.leadChoice}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3.5">
              {types.map((ty, i) => (
                <button key={ty.naam} type="button" aria-pressed={s.type === i} onClick={() => set({ type: i })}
                  className={`flex min-h-[150px] flex-col gap-2 rounded-[22px] p-[22px] text-left text-ink ${sel(s.type === i)}`}>
                  <span className="flex w-full items-baseline justify-between gap-3">
                    <span className="font-display text-2xl font-bold">{ty.naam}</span>
                    <span className="flex-none font-mono text-[13px] text-muted">{ty.duur}</span>
                  </span>
                  <span className="text-base leading-[1.45] text-[#33485A]">{ty.uitleg}</span>
                  <span className="mt-auto text-sm font-bold text-primary">{ty.vervolg}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {s.stap === 2 && (
          <div className="flex flex-col gap-[22px]">
            <h1 ref={h1Ref} tabIndex={-1} className={`${h1Cls} text-[clamp(34px,4vw,44px)]`}>{t.h1Situation}</h1>
            <fieldset className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-white p-6">
              <legend className="float-left mb-2.5 text-[17px] font-bold">{t.processQ}</legend>
              <div className="clear-both flex flex-wrap gap-2">
                {t.processes.map((p, i) => (
                  <button key={p} type="button" aria-pressed={s.proces === i} onClick={() => set({ proces: i })}
                    className={`h-[46px] rounded-full px-[18px] text-[15px] font-bold text-ink ${sel(s.proces === i)}`}>{p}</button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-3.5 rounded-[22px] border border-line bg-white p-6">
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="aw-mens" className="text-[17px] font-bold">{t.peopleLabel}</label>
                  <output htmlFor="aw-mens" className="font-mono text-2xl">{s.mens}</output>
                </div>
                <DesignSlider id="aw-mens" label={t.peopleLabel} min={5} max={500} step={5} value={s.mens} onChange={(v) => set({ mens: v })} />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="aw-loc" className="text-[17px] font-bold">{t.sitesLabel}</label>
                  <output htmlFor="aw-loc" className="font-mono text-2xl">{s.loc}</output>
                </div>
                <DesignSlider id="aw-loc" label={t.sitesLabel} min={1} max={20} value={s.loc} onChange={(v) => set({ loc: v })} />
              </div>
              <div role="group" aria-labelledby="aw-regio" className="flex flex-col gap-2">
                <span id="aw-regio" className="text-[17px] font-bold">{t.regionLabel}</span>
                <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-tint p-[5px] max-sm:grid-cols-3">
                  {t.regions.map((r, i) => (
                    <button key={r} type="button" aria-pressed={s.regio === i} onClick={() => set({ regio: i })}
                      className={`h-11 rounded-xl font-bold ${s.regio === i ? 'bg-white shadow-[0_1px_4px_rgba(16,37,58,.18)]' : ''}`}>{r}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {s.stap === 3 && (
          <form className="flex flex-col gap-[22px]" noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} id="aw-form">
            <h1 ref={h1Ref} tabIndex={-1} className={`${h1Cls} text-[clamp(34px,4vw,44px)]`}>{isDemo ? t.h1ContactDemo : t.h1Contact}</h1>
            {isDemo && (
              <div className="flex flex-col gap-3.5 rounded-[22px] border border-line bg-white p-6">
                <h2 className="text-[17px] font-bold">{t.pickMoment}</h2>
                <div className="grid grid-cols-5 gap-2">
                  {days.map((d, i) => (
                    <button key={d.iso} type="button" aria-pressed={s.dag === i} aria-label={d.label} onClick={() => set({ dag: i })}
                      className={`flex flex-col items-center rounded-[14px] px-1.5 py-3 ${sel(s.dag === i)}`}>
                      <span className="text-[13px] font-bold text-muted">{d.wd}</span>
                      <span className="font-mono text-xl">{d.d}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.times.map((tm, i) => (
                    <button key={tm} type="button" aria-pressed={s.tijd === i} onClick={() => set({ tijd: i })}
                      className={`h-11 rounded-full px-4 font-mono text-[15px] ${sel(s.tijd === i)}`}>{tm}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5 rounded-[22px] border border-line bg-white p-6">
              {field('naam', t.name, t.namePh, 'text', 'name', true)}
              {field('mail', t.email, t.emailPh, 'email', 'email', true)}
              {field('bedrijf', t.company, t.companyPh, 'text', 'organization', true)}
              {field('tel', t.phone, t.phonePh, 'tel', 'tel', false)}
              {kind !== 'demo' && (
                <label htmlFor="aw-bericht" className="col-span-full flex flex-col gap-1.5 text-[15px] font-bold">
                  {t.message}
                  <textarea id="aw-bericht" rows={4} placeholder={t.messagePh} value={s.bericht} onChange={(e) => set({ bericht: e.target.value })}
                    className="w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-base font-normal outline-none focus:border-primary-focus" />
                </label>
              )}
              <div role="group" aria-labelledby="aw-rol" className="col-span-full flex flex-col gap-1.5">
                <span id="aw-rol" className="text-[15px] font-bold">{t.roleLabel}</span>
                <div className="flex flex-wrap gap-2">
                  {t.roles.map((r, i) => (
                    <button key={r} type="button" aria-pressed={s.rol === i} onClick={() => set({ rol: i })}
                      className={`h-11 rounded-full px-4 text-sm font-bold ${sel(s.rol === i)}`}>{r}</button>
                  ))}
                </div>
              </div>
              <label className="col-span-full flex items-start gap-2.5 text-[15px] leading-[1.4]">
                <input type="checkbox" className="m-0 h-[22px] w-[22px] flex-none accent-primary" checked={s.nieuws} onChange={(e) => set({ nieuws: e.target.checked })} />
                {t.newsletter}
              </label>
              <input id="aw-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            </div>
            {sendError && <p role="alert" className="rounded-xl bg-warn-bg p-4 font-semibold text-warn-fg">{t.errSend}</p>}
          </form>
        )}

        {s.stap === 4 && (
          <div className="flex flex-col gap-[22px]" role="status">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sky" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10253A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            <h1 ref={h1Ref} tabIndex={-1} className={`${h1Cls} text-[clamp(36px,4vw,48px)]`}>{isDemo ? t.doneDemo : t.done}</h1>
            <p className="text-[19px] leading-normal text-[#33485A]">
              {isDemo ? t.doneDemoText.replace('{moment}', moment).replace('{contact}', contact.name).replace('{process}', procesNaam.toLowerCase()) : T.verw}
            </p>
            <div className="flex flex-col gap-3.5 rounded-[22px] border border-line bg-white p-6">
              <h2 className="text-lg font-bold">{t.prepTitle}</h2>
              <ol className="flex flex-col gap-3">
                {t.prep.map((p, i) => (
                  <li key={p} className="flex gap-3"><span className="font-mono text-primary">{String(i + 1).padStart(2, '0')}</span>{p}</li>
                ))}
              </ol>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={guideHref} className="inline-flex h-[54px] items-center rounded-full bg-primary px-6 font-bold text-white no-underline hover:bg-primary-hover">{t.readGuide}</a>
              <a href={homeHref} className="inline-flex h-[54px] items-center px-2 font-bold">{t.backHome}</a>
            </div>
          </div>
        )}

        {s.stap < 4 && (
          <div className="flex items-center justify-between border-t border-line pt-2">
            <button type="button" onClick={() => set({ stap: Math.max(1, s.stap - 1) })}
              className={`h-[54px] px-5 text-base font-bold ${s.stap === 1 ? 'invisible' : ''}`}>{t.back}</button>
            {s.stap < 3 ? (
              <button type="button" onClick={() => set({ stap: Math.min(4, s.stap + 1) })}
                className="h-[58px] rounded-full bg-primary px-[30px] text-[17px] font-bold text-white hover:bg-primary-hover">{t.next}</button>
            ) : (
              <button type="submit" form="aw-form" disabled={sending} aria-busy={sending}
                className="h-[58px] rounded-full bg-primary px-[30px] text-[17px] font-bold text-white hover:bg-primary-hover disabled:opacity-70">
                {sending ? t.sending : isDemo ? t.confirmDemo : t.submit}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-4" aria-label={t.sumEyebrow}>
        <div className="flex flex-col gap-4 rounded-[26px] bg-ink p-7 text-white">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-sky">{t.sumEyebrow}</p>
          <p className="font-display text-[30px] font-bold leading-tight">{T.naam}</p>
          <dl className="flex flex-col gap-2.5 text-[15px]">
            <div className="flex justify-between gap-3 border-b border-ink-3 pb-2.5"><dt className="text-muted-light">{t.sumProcess}</dt><dd className="font-semibold">{procesNaam}</dd></div>
            <div className="flex justify-between gap-3 border-b border-ink-3 pb-2.5"><dt className="text-muted-light">{t.sumScale}</dt><dd className="font-mono">{s.mens} {t.people} · {s.loc} {s.loc === 1 ? t.site : t.sites}</dd></div>
            <div className="flex justify-between gap-3 border-b border-ink-3 pb-2.5"><dt className="text-muted-light">{t.sumMoment}</dt><dd className="font-mono">{isDemo ? moment : t.byArrangement}</dd></div>
          </dl>
          <div className="rounded-2xl bg-[#1A3550] p-4">
            <p className="text-[13px] text-muted-light">{t.after}</p>
            <p className="leading-[1.45]">{T.verw}</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5 rounded-[22px] border border-line bg-white p-[22px]">
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-sky font-display font-extrabold" aria-hidden="true">{contact.initials}</span>
          <div>
            <p className="text-[13px] text-muted">{t.contactLabel}</p>
            <p className="text-[17px] font-bold">{contact.name}</p>
            <p className="text-sm text-muted">{contact.role}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
