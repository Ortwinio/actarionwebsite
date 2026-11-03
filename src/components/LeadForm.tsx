'use client';

import { useState } from 'react';
import { getUi, type Locale } from '@/lib/i18n';
import { track } from './Analytics';

export type LeadKind = 'pilot' | 'template' | 'demo' | 'contact' | 'partner';
type Kind = LeadKind;

const done: Record<Locale, string> = {
  en: 'Thank you! We received your request.',
  nl: 'Bedankt! We hebben je aanvraag ontvangen.',
  de: 'Vielen Dank! Wir haben Ihre Anfrage erhalten.',
};
const failed: Record<Locale, string> = {
  en: 'Something went wrong. Please email info@actarion.com.',
  nl: 'Er ging iets mis. Mail ons via info@actarion.com.',
  de: 'Etwas ist schiefgelaufen. Bitte schreiben Sie an info@actarion.com.',
};

const field = 'h-14 w-full rounded-2xl border-2 border-line bg-white px-4 text-[17px] focus:border-primary';

export function LeadForm({ locale, kind, resource }: { locale: Locale; kind: Kind; resource?: string }) {
  const ui = getUi(locale);
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('busy');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, kind, resource, locale, page: location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track(kind === 'template' ? 'file_download' : 'generate_lead', { form_type: kind, resource, site_language: locale });
      setState('ok');
    } catch {
      setState('err');
    }
  }

  if (state === 'ok') return <p role="status" className="rounded-card bg-tint p-6 text-lg font-semibold">{done[locale]}</p>;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate={false}>
      {kind !== 'template' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-semibold">{ui.nameLabel}<input name="name" required autoComplete="name" className={field} /></label>
            <label className="flex flex-col gap-1.5 font-semibold">{ui.companyLabel}<input name="company" required autoComplete="organization" className={field} /></label>
          </div>
        </>
      )}
      <label className="flex flex-col gap-1.5 font-semibold">
        {ui.emailLabel}
        <input name="email" type="email" required autoComplete="email" placeholder={ui.emailPlaceholder} className={field} />
      </label>
      {kind !== 'template' && (
        <label className="flex flex-col gap-1.5 font-semibold">
          {ui.messageLabel}
          <textarea name="message" rows={4} className="w-full rounded-2xl border-2 border-line bg-white p-4 text-[17px] focus:border-primary" />
        </label>
      )}
      {/* Honeypot against bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" disabled={state === 'busy'} className="btn-primary self-start disabled:opacity-60">
        {kind === 'template' ? ui.download : ui.submit}
      </button>
      <p className="text-sm text-muted">{kind === 'template' ? ui.downloadNote : ui.formNote}</p>
      {state === 'err' && <p role="alert" className="font-semibold text-red-700">{failed[locale]}</p>}
    </form>
  );
}
