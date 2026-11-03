'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/locale';

const text: Record<Locale, { title: string; body: string; accept: string; reject: string }> = {
  en: { title: 'Cookies', body: 'We use analytics cookies to improve this website, only with your consent.', accept: 'Accept', reject: 'Only necessary' },
  nl: { title: 'Cookies', body: 'We gebruiken analytische cookies om deze website te verbeteren, alleen met je toestemming.', accept: 'Accepteren', reject: 'Alleen noodzakelijk' },
  de: { title: 'Cookies', body: 'Wir verwenden Analyse-Cookies zur Verbesserung dieser Website, nur mit Ihrer Einwilligung.', accept: 'Akzeptieren', reject: 'Nur notwendige' },
};

type Gtag = (...args: unknown[]) => void;

/** Minimal Consent Mode v2 banner. Swap for Cookiebot/Usercentrics later without touching GTM. */
export function ConsentBanner({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = text[locale];

  useEffect(() => {
    try {
      if (!localStorage.getItem('actarion-consent')) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const choose = (all: boolean) => {
    const choice = { analytics: all, marketing: all, ts: Date.now() };
    try {
      localStorage.setItem('actarion-consent', JSON.stringify(choice));
    } catch {}
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.('consent', 'update', {
      analytics_storage: all ? 'granted' : 'denied',
      ad_storage: all ? 'granted' : 'denied',
      ad_user_data: all ? 'granted' : 'denied',
      ad_personalization: all ? 'granted' : 'denied',
    });
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'consent_update', consent_analytics: all });
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-label={t.title} className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-card bg-ink p-4 sm:p-5 text-white shadow-float">
      <p className="mb-3 text-sm sm:text-[15px] leading-relaxed text-muted-lighter">{t.body}</p>
      <div className="flex gap-3">
        <button type="button" onClick={() => choose(true)} className="btn-sky min-h-[44px] flex-1 px-4 sm:flex-none">{t.accept}</button>
        <button type="button" onClick={() => choose(false)} className="btn min-h-[44px] flex-1 border-2 border-muted-light px-4 text-white sm:flex-none">{t.reject}</button>
      </div>
    </div>
  );
}
