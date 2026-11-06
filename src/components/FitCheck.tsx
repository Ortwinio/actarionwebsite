'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/lib/locale';
import { track } from './Analytics';

const Q: Record<Locale, string[]> = {
  en: [
    'You have a process with clear, repeatable steps (changeover, assembly, maintenance, training).',
    'Errors, downtime or long onboarding in that process cost measurable time or money.',
    'An expert can spend 1–2 days helping to capture the process.',
    'Operators have, or can get, a tablet, phone or smart glasses at the workstation.',
    'You can measure a baseline KPI (minutes, error rate, training days).',
    'A team lead or manager owns the pilot for 6–8 weeks.',
  ],
  nl: [
    'Je hebt een proces met duidelijke, herhaalbare stappen (omstellen, assemblage, onderhoud, training).',
    'Fouten, stilstand of lang inwerken kosten in dat proces meetbaar tijd of geld.',
    'Een expert kan 1–2 dagen helpen het proces vast te leggen.',
    'Operators hebben op de werkplek een tablet, telefoon of smart glasses (of kunnen die krijgen).',
    'Je kunt een nulmeting doen (minuten, foutpercentage, inwerkdagen).',
    'Een teamleider of manager is 6–8 weken eigenaar van de pilot.',
  ],
  de: [
    'Sie haben einen Prozess mit klaren, wiederholbaren Schritten (Rüsten, Montage, Wartung, Schulung).',
    'Fehler, Stillstand oder lange Einarbeitung kosten dort messbar Zeit oder Geld.',
    'Ein Experte kann 1–2 Tage bei der Erfassung des Prozesses helfen.',
    'Werker haben am Arbeitsplatz ein Tablet, Smartphone oder eine Datenbrille (oder können eines bekommen).',
    'Sie können eine Ausgangs-KPI messen (Minuten, Fehlerquote, Einarbeitungstage).',
    'Eine Schicht- oder Teamleitung verantwortet den Pilot für 6–8 Wochen.',
  ],
};
const T: Record<Locale, { yes: string; no: string; good: string; maybe: string; low: string; pilot: string; talk: string; score: string }> = {
  en: { yes: 'Yes', no: 'No', good: 'Strong fit: you are ready for a pilot.', maybe: 'Good fit: a short intake will clarify the open points.', low: 'Not yet: let’s talk about where to start.', pilot: 'Plan a pilot', talk: 'Book a free intake', score: 'Score' },
  nl: { yes: 'Ja', no: 'Nee', good: 'Sterke match: je bent klaar voor een pilot.', maybe: 'Goede match: een korte intake maakt de open punten duidelijk.', low: 'Nog niet: laten we bespreken waar je kunt beginnen.', pilot: 'Plan een pilot', talk: 'Plan een kosteloze intake', score: 'Score' },
  de: { yes: 'Ja', no: 'Nein', good: 'Sehr gut geeignet: Sie sind bereit für einen Pilot.', maybe: 'Gut geeignet: ein kurzes Erstgespräch klärt die offenen Punkte.', low: 'Noch nicht: Lassen Sie uns besprechen, wo Sie starten können.', pilot: 'Pilot planen', talk: 'Kostenloses Erstgespräch', score: 'Ergebnis' },
};

export function FitCheck({ locale, pilotHref, demoHref }: { locale: Locale; pilotHref: string; demoHref: string }) {
  const q = Q[locale];
  const t = T[locale];
  const [a, setA] = useState<(boolean | null)[]>(q.map(() => null));
  const answered = a.filter((x) => x !== null).length;
  const yes = a.filter(Boolean).length;
  const done = answered === q.length;
  const verdict = yes >= 5 ? t.good : yes >= 3 ? t.maybe : t.low;

  const set = (i: number, v: boolean) => {
    const next = a.map((x, j) => (j === i ? v : x));
    setA(next);
    if (next.every((x) => x !== null)) track('fit_check_complete', { score: next.filter(Boolean).length, site_language: locale });
  };

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-3">
        {q.map((text, i) => (
          <li key={i} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold">{i + 1}. {text}</span>
            <fieldset className="flex flex-none gap-2">
              <legend className="sr-only">{text}</legend>
              {[true, false].map((v) => (
                <label key={String(v)} className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full border-2 px-5 font-bold ${a[i] === v ? 'border-primary bg-primary text-white' : 'border-line bg-white'}`}>
                  <input type="radio" name={`q${i}`} className="sr-only" checked={a[i] === v} onChange={() => set(i, v)} />
                  {v ? t.yes : t.no}
                </label>
              ))}
            </fieldset>
          </li>
        ))}
      </ol>
      <div aria-live="polite" className="rounded-card bg-ink p-6 text-white">
        <p className="font-mono text-2xl text-sky">{t.score}: {yes}/{q.length}</p>
        {done && <p className="mt-2 text-lg">{verdict}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={pilotHref} className="btn-sky">{t.pilot}</Link>
          <Link href={demoHref} className="btn border-2 border-sky text-white hover:text-white">{t.talk}</Link>
        </div>
      </div>
    </div>
  );
}
