'use client';

import Image from 'next/image';
import { useState } from 'react';
import { track } from '@/components/Analytics';
import type { WhitepaperCopy } from '@/content/design/whitepaper';
import type { Locale } from '@/lib/locale';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function post(body: Record<string, unknown>) {
  const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(String(res.status));
}

export function WhitepaperForms({
  t, locale, page, initial, pdfHrefs, demoHref, intro,
}: { t: WhitepaperCopy; locale: Locale; page: string; initial: number; pdfHrefs: string[]; demoHref: string; intro: React.ReactNode }) {
  const [keuze, setKeuze] = useState(initial);
  const [mail, setMail] = useState('');
  const [nieuws, setNieuws] = useState(true);
  const [verzonden, setVerzonden] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [nb, setNb] = useState('');
  const [nbErr, setNbErr] = useState('');
  const [nbDone, setNbDone] = useState(false);
  const item = t.items[keuze];

  async function download(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(mail.trim())) { setErr(t.errEmail); document.getElementById('wp-mail')?.focus(); return; }
    setErr(''); setBusy(true);
    try {
      await post({ name: '', company: '', email: mail.trim(), message: `Whitepaper: ${item.title}`, kind: 'template', resource: item.slug, newsletter: nieuws, locale, page });
      track('generate_lead', { lead_kind: 'template', resource: item.slug, newsletter: nieuws, locale });
      setVerzonden(true);
    } catch { setErr(t.errSend); } finally { setBusy(false); }
  }

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(nb.trim())) { setNbErr(t.errEmail); document.getElementById('nb-mail')?.focus(); return; }
    setNbErr('');
    try {
      await post({ name: '', company: '', email: nb.trim(), message: 'Newsletter signup', kind: 'newsletter', locale, page });
      track('generate_lead', { lead_kind: 'newsletter', locale });
      setNbDone(true);
    } catch { setNbErr(t.errSend); }
  }

  return (
    <div className="mx-auto flex max-w-site flex-wrap items-start gap-10 px-6 pb-[90px] pt-14">
      <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-6">
        {intro}
        <div role="group" aria-label={t.groupLabel} className="flex flex-col gap-2.5">
          {t.items.map((it, i) => {
            const on = keuze === i;
            return (
              <button key={it.slug} type="button" aria-pressed={on} onClick={() => { setKeuze(i); setVerzonden(false); }}
                className={`flex items-center gap-4 rounded-[18px] border-2 px-[18px] py-4 text-left text-ink ${on ? 'border-primary bg-tint' : 'border-line bg-white hover:border-muted-light'}`}>
                <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-2 border-primary" aria-hidden="true">
                  <span className={`h-3 w-3 rounded-full ${on ? 'bg-primary' : ''}`} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[17px] font-bold">{it.title}</span>
                  <span className="text-sm text-muted">{it.voor}</span>
                </span>
                <span className="flex-none font-mono text-[13px] text-muted">{it.meta}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <div className="flex flex-col gap-[18px] rounded-[28px] bg-sky p-7">
          <div className="flex items-center gap-[18px]">
            <div className="flex-[0_0_120px] -rotate-3 rounded-lg bg-white p-2.5 shadow-[0_12px_26px_rgba(16,37,58,.18)]">
              <Image src={item.cover} alt="" width={200} height={267} sizes="100px" className="block aspect-[3/4] w-full rounded object-cover" />
            </div>
            <h2 className="font-display text-2xl font-extrabold leading-[1.1]" aria-live="polite">{item.title}</h2>
          </div>
          {!verzonden ? (
            <form className="flex flex-col gap-3" noValidate onSubmit={download}>
              <label htmlFor="wp-mail" className="flex flex-col gap-1.5 font-bold">
                {t.emailLabel}
                <input id="wp-mail" type="email" required autoComplete="email" placeholder={t.emailPh} value={mail}
                  onChange={(e) => { setMail(e.target.value); if (err) setErr(''); }}
                  aria-invalid={err ? true : undefined} aria-describedby={err ? 'wp-mail-err' : undefined}
                  className="h-14 rounded-[14px] border-2 border-ink bg-white px-[18px] text-[17px] font-normal outline-none focus:border-primary-focus" />
              </label>
              {err && <p id="wp-mail-err" role="alert" className="text-sm font-semibold text-[#8A1C12]">{err}</p>}
              <label className="flex items-start gap-2.5 leading-[1.4]">
                <input type="checkbox" checked={nieuws} onChange={(e) => setNieuws(e.target.checked)} className="m-0 h-[22px] w-[22px] flex-none accent-ink" />
                {t.optIn}
              </label>
              <button type="submit" disabled={busy} className="h-[58px] rounded-full bg-ink text-[17px] font-bold text-white disabled:opacity-70">{busy ? t.sending : t.download}</button>
              <p className="text-[13px] leading-[1.4]">{t.fine.replace('{X}', nieuws ? t.fineX : '')}</p>
            </form>
          ) : (
            <div className="flex flex-col gap-3 rounded-[18px] bg-white p-[18px]" role="status">
              <p className="font-display text-xl font-extrabold">{t.readyTitle}</p>
              <a href={pdfHrefs[keuze]} target="_blank" rel="noopener" className="inline-flex h-[52px] items-center justify-center rounded-full bg-primary text-base font-bold text-white no-underline">{t.openPdf}</a>
              <p className="leading-[1.45] text-[#33485A]">{t.readyText}</p>
              <a href={demoHref} className="font-bold">{t.readyLink}</a>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-white p-[22px]">
          <h2 className="text-lg font-bold">{t.nlTitle}</h2>
          <p className="leading-[1.45] text-muted">{t.nlText}</p>
          {nbDone ? (
            <p role="status" className="font-semibold text-[#33485A]">{t.nlDone}</p>
          ) : (
            <form className="flex flex-wrap gap-2" noValidate onSubmit={subscribe}>
              <label htmlFor="nb-mail" className="sr-only">{t.nlLabel}</label>
              <input id="nb-mail" type="email" required autoComplete="email" placeholder={t.emailPh} value={nb}
                onChange={(e) => { setNb(e.target.value); if (nbErr) setNbErr(''); }}
                aria-invalid={nbErr ? true : undefined} aria-describedby={nbErr ? 'nb-err' : undefined}
                className="h-[50px] min-w-0 flex-[1_1_200px] rounded-full border-2 border-line px-4 text-base outline-none focus:border-primary-focus" />
              <button type="submit" className="h-[50px] rounded-full border-2 border-ink bg-white px-5 font-bold">{t.nlButton}</button>
              {nbErr && <p id="nb-err" role="alert" className="w-full text-sm font-semibold text-[#B42318]">{nbErr}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
