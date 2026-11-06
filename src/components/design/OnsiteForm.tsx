'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/locale';
import type { OnsiteCopy } from '@/content/design/onsite';
import { track } from '@/components/Analytics';

const field = 'h-14 w-full rounded-2xl border-2 border-line bg-white px-4 text-[17px] text-ink focus:border-primary';

/** Request form for an on-site visit; mailed to Mark and Jack via /api/lead (kind "onsite"). */
export function OnsiteForm({ locale, t }: { locale: Locale; t: OnsiteCopy }) {
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('busy');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, kind: 'onsite', locale, page: location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('generate_lead', { form_type: 'onsite', site_language: locale });
      setState('ok');
    } catch {
      setState('err');
    }
  }

  if (state === 'ok') return <p role="status" className="rounded-2xl bg-tint p-6 text-lg font-semibold text-ink">{t.done}</p>;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 font-semibold">{t.name}<input name="name" required autoComplete="name" className={field} /></label>
        <label className="flex flex-col gap-1.5 font-semibold">{t.company}<input name="company" required autoComplete="organization" className={field} /></label>
        <label className="flex flex-col gap-1.5 font-semibold">{t.email}<input name="email" type="email" required autoComplete="email" className={field} /></label>
        <label className="flex flex-col gap-1.5 font-semibold">{t.phone}<input name="phone" type="tel" autoComplete="tel" className={field} /></label>
      </div>
      <label className="flex flex-col gap-1.5 font-semibold">{t.site}<input name="site" required placeholder={t.sitePlaceholder} className={field} /></label>
      <label className="flex flex-col gap-1.5 font-semibold">
        {t.message}
        <textarea name="message" rows={3} className="w-full rounded-2xl border-2 border-line bg-white p-4 text-[17px] text-ink focus:border-primary" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" disabled={state === 'busy'} className="btn-primary self-start disabled:opacity-60">{t.submit}</button>
      <p className="m-0 text-sm text-muted">{t.note}</p>
      {state === 'err' && <p role="alert" className="font-semibold text-red-700">{t.failed}</p>}
    </form>
  );
}
