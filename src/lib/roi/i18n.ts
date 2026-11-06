import type { Locale } from '@/lib/locale';
import type { UseCaseId } from './types';

type L3 = Record<Locale, string>;
const t = (en: string, nl: string, de: string): L3 => ({ en, nl, de });

export type FieldKind = 'int' | 'eur' | 'pct' | 'min' | 'h';

export interface FieldDef {
  id: string;
  label: L3;
  kind: FieldKind;
}

export const USE_CASES: { id: UseCaseId; label: L3; text: L3; routeKey: string }[] = [
  {
    id: 'changeover',
    routeKey: 'ucChangeover',
    label: t('Changeovers (SMED)', 'Omstellen (SMED)', 'Rüsten (SMED)'),
    text: t('Shorter, standardised changeovers and less first-batch scrap.', 'Kortere, gestandaardiseerde omstellingen en minder afkeur bij opstart.', 'Kürzere, standardisierte Rüstvorgänge und weniger Anlaufausschuss.'),
  },
  {
    id: 'assembly',
    routeKey: 'ucAssembly',
    label: t('Error-free assembly', 'Foutloze assemblage', 'Fehlerfreie Montage'),
    text: t('Fewer errors from missed steps, wrong parts or sequences.', 'Minder fouten door overgeslagen stappen, verkeerde onderdelen of volgorde.', 'Weniger Fehler durch übersprungene Schritte, falsche Teile oder Reihenfolge.'),
  },
  {
    id: 'maintenance',
    routeKey: 'ucMaintenance',
    label: t('Preventive maintenance', 'Preventief onderhoud', 'Vorbeugende Wartung'),
    text: t('Less unplanned downtime and fewer emergency visits.', 'Minder ongeplande stilstand en minder spoedbezoeken.', 'Weniger ungeplanter Stillstand und weniger Notfalleinsätze.'),
  },
  {
    id: 'fault_recovery',
    routeKey: 'ucRemote',
    label: t('Remote expert support', 'Remote ondersteuning', 'Remote-Experten-Support'),
    text: t('Faster fault recovery (lower MTTR) without travel.', 'Sneller storingsherstel (lagere MTTR) zonder reizen.', 'Schnellere Störungsbehebung (niedrigere MTTR) ohne Reisen.'),
  },
  {
    id: 'training',
    routeKey: 'ucOnboarding',
    label: t('Onboarding & training', 'Inwerken en training', 'Einarbeitung und Schulung'),
    text: t('Shorter time to competence and less trainer time.', 'Kortere inwerktijd en minder tijd van trainers.', 'Kürzere Einarbeitungszeit und weniger Trainerzeit.'),
  },
];

export const FIELDS: Record<UseCaseId, FieldDef[]> = {
  changeover: [
    { id: 'changeoversPerYear', kind: 'int', label: t('Changeovers per year', 'Omstellingen per jaar', 'Rüstvorgänge pro Jahr') },
    { id: 'changeoverTimeBase', kind: 'min', label: t('Changeover time today', 'Omsteltijd nu', 'Rüstzeit heute') },
    { id: 'changeoverTimeAr', kind: 'min', label: t('Changeover time with ActARion', 'Omsteltijd met ActARion', 'Rüstzeit mit ActARion') },
    { id: 'costPerChangeoverMinute', kind: 'eur', label: t('Cost per minute of downtime', 'Kosten per minuut stilstand', 'Kosten pro Stillstandsminute') },
  ],
  assembly: [
    { id: 'unitsPerYear', kind: 'int', label: t('Units assembled per year', 'Geassembleerde eenheden per jaar', 'Montierte Einheiten pro Jahr') },
    { id: 'errorRateBase', kind: 'pct', label: t('Error rate today', 'Foutpercentage nu', 'Fehlerquote heute') },
    { id: 'errorRateAr', kind: 'pct', label: t('Error rate with ActARion', 'Foutpercentage met ActARion', 'Fehlerquote mit ActARion') },
    { id: 'costPerError', kind: 'eur', label: t('Cost per error (rework, scrap)', 'Kosten per fout (herstel, afkeur)', 'Kosten pro Fehler (Nacharbeit, Ausschuss)') },
  ],
  maintenance: [
    { id: 'downtimeHoursBasePerYear', kind: 'h', label: t('Unplanned downtime per year', 'Ongeplande stilstand per jaar', 'Ungeplanter Stillstand pro Jahr') },
    { id: 'downtimeReductionPct', kind: 'pct', label: t('Expected reduction', 'Verwachte reductie', 'Erwartete Reduktion') },
    { id: 'costPerDowntimeHour', kind: 'eur', label: t('Cost per downtime hour', 'Kosten per uur stilstand', 'Kosten pro Stillstandsstunde') },
  ],
  fault_recovery: [
    { id: 'incidentsPerYear', kind: 'int', label: t('Incidents per year', 'Storingen per jaar', 'Störungen pro Jahr') },
    { id: 'mttrBase', kind: 'h', label: t('Time to repair today (MTTR)', 'Hersteltijd nu (MTTR)', 'Reparaturzeit heute (MTTR)') },
    { id: 'mttrAr', kind: 'h', label: t('Time to repair with ActARion', 'Hersteltijd met ActARion', 'Reparaturzeit mit ActARion') },
    { id: 'costPerDowntimeHour', kind: 'eur', label: t('Cost per downtime hour', 'Kosten per uur stilstand', 'Kosten pro Stillstandsstunde') },
  ],
  training: [
    { id: 'newOperatorsPerYear', kind: 'int', label: t('New operators per year', 'Nieuwe operators per jaar', 'Neue Werker pro Jahr') },
    { id: 'trainingHoursBase', kind: 'h', label: t('Training hours today', 'Trainingsuren nu', 'Schulungsstunden heute') },
    { id: 'trainingHoursAr', kind: 'h', label: t('Training hours with ActARion', 'Trainingsuren met ActARion', 'Schulungsstunden mit ActARion') },
    { id: 'operatorRate', kind: 'eur', label: t('Operator hourly cost', 'Uurkosten operator', 'Stundensatz Werker') },
    { id: 'trainerRate', kind: 'eur', label: t('Trainer hourly cost', 'Uurkosten trainer', 'Stundensatz Trainer') },
  ],
};

export const COST_FIELDS: FieldDef[] = [
  { id: 'oneTimeCost', kind: 'eur', label: t('One-time: implementation & first content', 'Eenmalig: implementatie en eerste content', 'Einmalig: Einführung & erste Inhalte') },
  { id: 'annualSoftwareCost', kind: 'eur', label: t('Per year: software', 'Per jaar: software', 'Pro Jahr: Software') },
  { id: 'annualHardwareCost', kind: 'eur', label: t('Per year: hardware', 'Per jaar: hardware', 'Pro Jahr: Hardware') },
  { id: 'annualOpexCost', kind: 'eur', label: t('Per year: content & internal time', 'Per jaar: content en interne uren', 'Pro Jahr: Inhalte & interne Zeit') },
];

export const UNITS: Record<FieldKind, L3> = {
  int: t('', '', ''),
  eur: t('€', '€', '€'),
  pct: t('%', '%', '%'),
  min: t('min', 'min', 'Min.'),
  h: t('h', 'uur', 'Std.'),
};

export const TXT = {
  steps: [t('Use cases', 'Toepassingen', 'Anwendungsfälle'), t('Your figures', 'Jouw cijfers', 'Ihre Zahlen'), t('Investment', 'Investering', 'Investition'), t('Result', 'Resultaat', 'Ergebnis')],
  choose: t('Which processes do you want to improve?', 'Welke processen wil je verbeteren?', 'Welche Prozesse möchten Sie verbessern?'),
  figures: t('Enter your own figures (defaults are typical values)', 'Vul je eigen cijfers in (standaard staan typische waarden)', 'Geben Sie Ihre Zahlen ein (Vorgaben sind typische Werte)'),
  invest: t('Investment (indicative defaults, adjust to your proposal)', 'Investering (indicatieve standaardwaarden, pas aan op je voorstel)', 'Investition (Richtwerte, an Ihr Angebot anpassen)'),
  next: t('Next', 'Volgende', 'Weiter'),
  back: t('Back', 'Terug', 'Zurück'),
  annual: t('Yearly benefit at full adoption', 'Jaarlijkse opbrengst bij volledige adoptie', 'Jährlicher Nutzen bei voller Nutzung'),
  payback: t('Payback period', 'Terugverdientijd', 'Amortisationszeit'),
  roi: t('ROI over 3 years', 'ROI over 3 jaar', 'ROI über 3 Jahre'),
  npv: t('Net present value (8%)', 'Netto contante waarde (8%)', 'Kapitalwert (8 %)'),
  months: t('months', 'maanden', 'Monate'),
  never: t('not within 3 years', 'niet binnen 3 jaar', 'nicht innerhalb von 3 Jahren'),
  perUseCase: t('Benefit per use case (per year)', 'Opbrengst per toepassing (per jaar)', 'Nutzen je Anwendungsfall (pro Jahr)'),
  cumulative: t('Cumulative cash flow', 'Cumulatieve kasstroom', 'Kumulierter Cashflow'),
  year: t('Year', 'Jaar', 'Jahr'),
  adoption: t('Adoption ramps up: 60% in year 1, 80% in year 2, 100% in year 3.', 'Adoptie loopt op: 60% in jaar 1, 80% in jaar 2, 100% in jaar 3.', 'Nutzung steigt: 60 % im 1. Jahr, 80 % im 2., 100 % im 3. Jahr.'),
  report: t('Get this business case as a report', 'Ontvang deze business case als rapport', 'Diesen Business Case als Bericht erhalten'),
  reportText: t('We send you the calculation and discuss it in a free intake. No obligation.', 'We sturen je de berekening en bespreken die in een kosteloze intake. Vrijblijvend.', 'Wir senden Ihnen die Berechnung und besprechen sie in einem kostenlosen Erstgespräch. Unverbindlich.'),
  print: t('Print or save as PDF', 'Afdrukken of opslaan als pdf', 'Drucken oder als PDF speichern'),
  restart: t('Start over', 'Opnieuw beginnen', 'Neu beginnen'),
};
