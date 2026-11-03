import type { Locale } from '@/lib/locale';

type L<T> = Record<Locale, T>;

/** Generic labels for the use-case layout (all useCase / industry / solution / platform / hardware pages). */
export const useCaseUi: L<{
  ctaDemo: string;
  ctaFit: string;
  painTitle: string;
  howEyebrow: string;
  pilotEyebrow: string;
  pilotTitle: string;
  pilotLink: string;
  pilotTiles: { label: string; value: string; mono?: boolean }[];
  kpiLabel: string;
  others: string;
  othersFallback: string;
  ctaHeading: string;
}> = {
  nl: {
    ctaDemo: 'Plan een demo',
    ctaFit: 'Past dit bij ons?',
    painTitle: 'Herkent u dit?',
    howEyebrow: 'Zo werkt het op de vloer',
    pilotEyebrow: 'Pilot in het kort',
    pilotTitle: 'Eén lijn, één proces, harde cijfers.',
    pilotLink: 'Hoe een pilot werkt →',
    pilotTiles: [
      { label: 'Scope', value: '1–2 lijnen, 1 proces' },
      { label: 'Doorlooptijd', value: '[.. weken]', mono: true },
      { label: "KPI's", value: 'doorlooptijd · first time right · fouten' },
      { label: 'Voorwaarde', value: 'nulmeting op minstens [..] uitvoeringen' },
    ],
    kpiLabel: "KPI's",
    others: 'Andere use cases',
    othersFallback: 'Meer over dit onderwerp',
    ctaHeading: 'Zie uw eigen proces als digitale werkinstructie.',
  },
  en: {
    ctaDemo: 'Book a demo',
    ctaFit: 'Is this a fit for us?',
    painTitle: 'Sound familiar?',
    howEyebrow: 'How it works on the shop floor',
    pilotEyebrow: 'Pilot at a glance',
    pilotTitle: 'One line, one process, hard numbers.',
    pilotLink: 'How a pilot works →',
    pilotTiles: [
      { label: 'Scope', value: '1–2 lines, 1 process' },
      { label: 'Duration', value: '[.. weeks]', mono: true },
      { label: 'KPIs', value: 'lead time · first time right · errors' },
      { label: 'Prerequisite', value: 'baseline of at least [..] runs' },
    ],
    kpiLabel: 'KPIs',
    others: 'Other use cases',
    othersFallback: 'More on this topic',
    ctaHeading: 'See your own process as a digital work instruction.',
  },
  de: {
    ctaDemo: 'Demo vereinbaren',
    ctaFit: 'Passt das zu uns?',
    painTitle: 'Kommt Ihnen das bekannt vor?',
    howEyebrow: 'So funktioniert es in der Produktion',
    pilotEyebrow: 'Pilot im Überblick',
    pilotTitle: 'Eine Linie, ein Prozess, harte Zahlen.',
    pilotLink: 'So läuft ein Pilot ab →',
    pilotTiles: [
      { label: 'Umfang', value: '1–2 Linien, 1 Prozess' },
      { label: 'Laufzeit', value: '[.. Wochen]', mono: true },
      { label: 'KPIs', value: 'Durchlaufzeit · First Time Right · Fehler' },
      { label: 'Voraussetzung', value: 'Nullmessung über mindestens [..] Durchläufe' },
    ],
    kpiLabel: 'KPIs',
    others: 'Weitere Anwendungsfälle',
    othersFallback: 'Mehr zu diesem Thema',
    ctaHeading: 'Sehen Sie Ihren eigenen Prozess als digitale Arbeitsanweisung.',
  },
};

export interface UseCaseCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  ctaDemo: string;
  ctaFit: string;
  imageAlt: string;
  painTitle: string;
  pains: { title: string; text: string }[];
  howEyebrow: string;
  howTitle: string;
  steps: { title: string; text: string }[];
  pilotEyebrow: string;
  pilotTitle: string;
  pilotLink: string;
  pilotTiles: { label: string; value: string; mono?: boolean }[];
  others: string;
  othersLabels: Record<string, string>;
  ctaHeading: string;
}

/** Verbatim design copy for the changeover use case (route key ucChangeover). */
export const changeoverCopy: L<UseCaseCopy> = {
  nl: {
    eyebrow: 'Use case · changeovers en batchvoorbereiding',
    h1: 'Elke formaatwissel in één keer goed.',
    lead: "Operators volgen bij elke wissel dezelfde visuele stappen, met controles die niet over te slaan zijn en foto's als bewijs. Ook in de nachtploeg, ook voor wie de wissel voor het eerst doet.",
    ctaDemo: 'Zie een changeover-demo',
    ctaFit: 'Past dit bij ons?',
    imageAlt: 'Pentekening van een changeover aan een flessenlijn: twee gehandschoende handen houden een nieuw formaatdeel vast, de stappen staan op een tablet aan een arm',
    painTitle: 'Herkent u dit?',
    pains: [
      { title: 'Elke ploeg wisselt anders', text: 'De wisseltijd hangt af van wie er dienst heeft.' },
      { title: 'Fouten pas bij de eerste batch', text: 'Een verkeerde instelling kost afkeur, rework en opnieuw opstarten.' },
      { title: 'Kennis zit in een paar hoofden', text: 'Is de ervaren collega er niet, dan duurt het langer of gaat het mis.' },
    ],
    howEyebrow: 'Zo werkt het op de vloer',
    howTitle: 'Van ervaring naar standaard, in drie stappen.',
    steps: [
      { title: 'Vastleggen', text: 'Uw beste operator voert de wissel uit; wij leggen elke stap vast met foto, korte video en instelwaarden.' },
      { title: 'Begeleiden', text: 'Op tablet of smart glasses ziet de operator stap voor stap wat er moet gebeuren, met verplichte controles.' },
      { title: 'Verbeteren', text: 'Elke uitvoering levert tijd- en foutdata op. Zo ziet u welke stap de wissel vertraagt.' },
    ],
    pilotEyebrow: 'Pilot in het kort',
    pilotTitle: 'Eén lijn, één wissel, harde cijfers.',
    pilotLink: 'Hoe een pilot werkt →',
    pilotTiles: [
      { label: 'Scope', value: '1–2 lijnen, 1 type wissel' },
      { label: 'Doorlooptijd', value: '[.. weken]', mono: true },
      { label: "KPI's", value: 'wisseltijd · first time right · afkeur eerste batch' },
      { label: 'Voorwaarde', value: 'nulmeting op minstens [..] wissels' },
    ],
    others: 'Andere use cases',
    othersLabels: { ucOnboarding: 'Inwerken en training', ucMaintenance: 'Preventief onderhoud', ucRemote: 'Remote expert support' },
    ctaHeading: 'Zie uw eigen omstelling als digitale werkinstructie.',
  },
  en: {
    eyebrow: 'Use case · changeovers and batch preparation',
    h1: 'Every format change right first time.',
    lead: 'Operators follow the same visual steps at every changeover, with checks that cannot be skipped and photos as proof. On the night shift too, and for anyone doing the changeover for the first time.',
    ctaDemo: 'See a changeover demo',
    ctaFit: 'Is this a fit for us?',
    imageAlt: 'Pen drawing of a changeover on a bottling line: two gloved hands hold a new format part, the steps are shown on a tablet mounted on an arm',
    painTitle: 'Sound familiar?',
    pains: [
      { title: 'Every shift changes over differently', text: 'Changeover time depends on who is on shift.' },
      { title: 'Errors only show in the first batch', text: 'A wrong setting means scrap, rework and another start-up.' },
      { title: 'Know-how sits in a few heads', text: 'When the experienced colleague is away, it takes longer or goes wrong.' },
    ],
    howEyebrow: 'How it works on the shop floor',
    howTitle: 'From experience to standard, in three steps.',
    steps: [
      { title: 'Capture', text: 'Your best operator performs the changeover; we capture every step with photos, short videos and settings.' },
      { title: 'Guide', text: 'On a tablet or smart glasses the operator sees step by step what to do, with mandatory checks.' },
      { title: 'Improve', text: 'Every run produces time and error data, so you can see which step slows the changeover down.' },
    ],
    pilotEyebrow: 'Pilot at a glance',
    pilotTitle: 'One line, one changeover, hard numbers.',
    pilotLink: 'How a pilot works →',
    pilotTiles: [
      { label: 'Scope', value: '1–2 lines, 1 changeover type' },
      { label: 'Duration', value: '[.. weeks]', mono: true },
      { label: 'KPIs', value: 'changeover time · first time right · first-batch scrap' },
      { label: 'Prerequisite', value: 'baseline of at least [..] changeovers' },
    ],
    others: 'Other use cases',
    othersLabels: { ucOnboarding: 'Onboarding and training', ucMaintenance: 'Preventive maintenance', ucRemote: 'Remote expert support' },
    ctaHeading: 'See your own changeover as a digital work instruction.',
  },
  de: {
    eyebrow: 'Anwendungsfall · Rüsten und Chargenvorbereitung',
    h1: 'Jeder Formatwechsel auf Anhieb richtig.',
    lead: 'Bediener folgen bei jedem Rüstvorgang denselben visuellen Schritten, mit Prüfungen, die sich nicht überspringen lassen, und Fotos als Nachweis. Auch in der Nachtschicht, auch beim ersten Rüsten.',
    ctaDemo: 'Rüst-Demo ansehen',
    ctaFit: 'Passt das zu uns?',
    imageAlt: 'Federzeichnung eines Formatwechsels an einer Abfülllinie: zwei behandschuhte Hände halten ein neues Formatteil, die Schritte stehen auf einem Tablet an einem Schwenkarm',
    painTitle: 'Kommt Ihnen das bekannt vor?',
    pains: [
      { title: 'Jede Schicht rüstet anders', text: 'Die Rüstzeit hängt davon ab, wer Schicht hat.' },
      { title: 'Fehler erst bei der ersten Charge', text: 'Eine falsche Einstellung kostet Ausschuss, Nacharbeit und einen erneuten Anlauf.' },
      { title: 'Wissen steckt in wenigen Köpfen', text: 'Fehlt der erfahrene Kollege, dauert es länger oder geht schief.' },
    ],
    howEyebrow: 'So funktioniert es in der Produktion',
    howTitle: 'Von Erfahrung zum Standard, in drei Schritten.',
    steps: [
      { title: 'Erfassen', text: 'Ihr bester Bediener führt den Rüstvorgang durch; wir erfassen jeden Schritt mit Foto, kurzem Video und Einstellwerten.' },
      { title: 'Führen', text: 'Auf Tablet oder Datenbrille sieht der Bediener Schritt für Schritt, was zu tun ist, mit Pflichtprüfungen.' },
      { title: 'Verbessern', text: 'Jede Ausführung liefert Zeit- und Fehlerdaten. So sehen Sie, welcher Schritt das Rüsten bremst.' },
    ],
    pilotEyebrow: 'Pilot im Überblick',
    pilotTitle: 'Eine Linie, ein Rüstvorgang, harte Zahlen.',
    pilotLink: 'So läuft ein Pilot ab →',
    pilotTiles: [
      { label: 'Umfang', value: '1–2 Linien, 1 Rüstart' },
      { label: 'Laufzeit', value: '[.. Wochen]', mono: true },
      { label: 'KPIs', value: 'Rüstzeit · First Time Right · Ausschuss erste Charge' },
      { label: 'Voraussetzung', value: 'Nullmessung über mindestens [..] Rüstvorgänge' },
    ],
    others: 'Weitere Anwendungsfälle',
    othersLabels: { ucOnboarding: 'Einarbeitung und Schulung', ucMaintenance: 'Vorbeugende Instandhaltung', ucRemote: 'Remote-Expertensupport' },
    ctaHeading: 'Sehen Sie Ihren eigenen Rüstvorgang als digitale Arbeitsanweisung.',
  },
};

export const useCaseImages: Record<string, string> = {
  ucChangeover: '/img/usecase-changeover.webp',
  ucAssembly: '/img/usecase-assembly.webp',
  ucMaintenance: '/img/usecase-maintenance.webp',
  ucOnboarding: '/img/training-ar.webp',
  solTraining: '/img/training-ar.webp',
  pfAi: '/img/ar-authoring.webp',
  pfAr: '/img/vision-pro-sop.webp',
  hwVisionPro: '/img/vision-pro-sop.webp',
};

export const imageSize: Record<string, [number, number]> = {
  '/img/training-ar.webp': [1200, 675],
  '/img/vision-pro-sop.webp': [1200, 799],
};
