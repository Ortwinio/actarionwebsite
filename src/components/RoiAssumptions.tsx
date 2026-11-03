import { Fragment } from "react";
import { numberLocale, type Locale } from '@/lib/i18n';
import { DEFAULT_COST_INPUTS, DEFAULT_GLOBAL_INPUTS, DEFAULT_USE_CASE_INPUTS } from '@/lib/roi/scenario';
import { COST_FIELDS, FIELDS, UNITS, USE_CASES } from '@/lib/roi/i18n';
import type { CostInputs } from '@/lib/roi/types';

const T = {
  h2: { en: 'Default assumptions and formulas', nl: 'Standaardaannames en formules', de: 'Standardannahmen und Formeln' },
  intro: {
    en: 'The calculator starts from these typical values. Replace them with your own figures for a reliable business case.',
    nl: 'De calculator start met deze typische waarden. Vervang ze door je eigen cijfers voor een betrouwbare business case.',
    de: 'Der Rechner startet mit diesen typischen Werten. Ersetzen Sie sie durch Ihre eigenen Zahlen für einen belastbaren Business Case.',
  },
  formulas: {
    en: ['Changeovers: changeovers × minutes saved × cost per minute', 'Assembly: units × (error rate today − with ActARion) × cost per error', 'Maintenance: downtime hours × reduction × cost per hour', 'Remote support: incidents × hours saved × cost per hour', 'Training: new operators × hours saved × (operator + trainer rate)', 'Payback, 3-year ROI and NPV at 8% discount rate, with adoption 60/80/100%'],
    nl: ['Omstellen: omstellingen × bespaarde minuten × kosten per minuut', 'Assemblage: eenheden × (foutpercentage nu − met ActARion) × kosten per fout', 'Onderhoud: uren stilstand × reductie × kosten per uur', 'Remote ondersteuning: storingen × bespaarde uren × kosten per uur', 'Training: nieuwe operators × bespaarde uren × (uurkosten operator + trainer)', 'Terugverdientijd, ROI over 3 jaar en NCW bij 8% disconteringsvoet, met adoptie 60/80/100%'],
    de: ['Rüsten: Rüstvorgänge × eingesparte Minuten × Kosten pro Minute', 'Montage: Einheiten × (Fehlerquote heute − mit ActARion) × Kosten pro Fehler', 'Wartung: Stillstandsstunden × Reduktion × Kosten pro Stunde', 'Remote-Support: Störungen × eingesparte Stunden × Kosten pro Stunde', 'Schulung: neue Werker × eingesparte Stunden × (Stundensatz Werker + Trainer)', 'Amortisation, ROI über 3 Jahre und Kapitalwert bei 8 % Zinssatz, Nutzung 60/80/100 %'],
  },
};

/** Server-rendered table of every default value and formula (citable by search engines and AI). */
export function RoiAssumptions({ locale }: { locale: Locale }) {
  const n = new Intl.NumberFormat(numberLocale[locale], { maximumFractionDigits: 1 });
  const fmt = (v: number, kind: string) =>
    kind === 'pct' ? `${n.format(v * 100)} %` : kind === 'eur' ? `€ ${n.format(v)}` : `${n.format(v)} ${UNITS[kind as keyof typeof UNITS][locale]}`.trim();
  return (
    <section id="assumptions" className="scroll-mt-24">
      <h2 className="h2 mb-4">{T.h2[locale]}</h2>
      <p className="mb-6 text-lg text-muted">{T.intro[locale]}</p>
      <div className="overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="bg-ink text-white">
              <th scope="col" className="p-3">{locale === 'de' ? 'Annahme' : locale === 'nl' ? 'Aanname' : 'Assumption'}</th>
              <th scope="col" className="p-3 text-right">{locale === 'de' ? 'Standardwert' : locale === 'nl' ? 'Standaardwaarde' : 'Default'}</th>
            </tr>
          </thead>
          <tbody>
            {USE_CASES.map((u) => (
              <Fragment key={u.id}>
                <tr className="bg-tint"><th colSpan={2} scope="colgroup" className="p-3 font-bold">{u.label[locale]}</th></tr>
                {FIELDS[u.id].map((f) => (
                  <tr key={u.id + f.id} className="border-t border-line">
                    <th scope="row" className="p-3 font-normal">{f.label[locale]}</th>
                    <td className="p-3 text-right font-mono">{fmt((DEFAULT_USE_CASE_INPUTS[u.id] as unknown as Record<string, number>)[f.id], f.kind)}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
            {COST_FIELDS.map((f) => (
              <tr key={f.id} className="border-t border-line">
                <th scope="row" className="p-3 font-normal">{f.label[locale]}</th>
                <td className="p-3 text-right font-mono">{fmt(DEFAULT_COST_INPUTS[f.id as keyof CostInputs], f.kind)}</td>
              </tr>
            ))}
            <tr className="border-t border-line">
              <th scope="row" className="p-3 font-normal">{locale === 'de' ? 'Zinssatz / Horizont' : locale === 'nl' ? 'Disconteringsvoet / horizon' : 'Discount rate / horizon'}</th>
              <td className="p-3 text-right font-mono">{n.format(DEFAULT_GLOBAL_INPUTS.discountRate * 100)} % / {DEFAULT_GLOBAL_INPUTS.horizonYears}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul className="mt-6 flex list-disc flex-col gap-1 pl-5 text-[15px] text-muted">
        {T.formulas[locale].map((f) => <li key={f}>{f}</li>)}
      </ul>
    </section>
  );
}
