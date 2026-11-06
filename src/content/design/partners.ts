import type { Locale } from '@/lib/locale';

export interface PartnerItem {
  id: 'deepsight';
  routeKey: 'partnerDeepsight';
  naam: string;
  soort: string;
  domein: string;
  url: string;
  intro: string;
  punten: string[];
  ctaKey: 'resources' | 'pilot';
  ctaLabel: string;
}

export interface PartnersCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  tableLabel: string;
  head: [string, string, string];
  rows: [string, string, string][];
  brings: string; // {naam}
  more: string; // {naam}
  newWindow: string;
  partners: PartnerItem[];
  hwTitle: string;
  hwText: string;
  hwLink: string;
  ctaHeading: string;
  detailOther: string;
  detailBack: string;
}

const base = [
  { id: 'deepsight', routeKey: 'partnerDeepsight', naam: 'DeepSight', domein: 'deepsight.ca', url: 'https://www.deepsight.ca/', ctaKey: 'resources' },
] as const;

const mk = (rows: { soort: string; intro: string; punten: string[]; ctaLabel: string }[]): PartnerItem[] =>
  rows.map((r, i) => ({ ...base[i], ...r }));

export const partnersCopy: Record<Locale, PartnersCopy> = {
  nl: {
    eyebrow: 'Partners',
    h1: 'Met wie werkt ActARion samen?',
    lead: 'ActARion werkt met DeepSight als vaste technologiepartner: DeepSight levert het AR-platform. ActARion regisseert het geheel, van use case tot uitrol, en haalt waar nodig partners uit het netwerk erbij.',
    cta: 'Plan een gesprek',
    tableLabel: 'Wie doet wat',
    head: ['Partner', 'Rol in uw project', 'Wanneer'],
    rows: [
      ['DeepSight', 'Het platform: no-code editor, AR-instructies op tablet en smart glasses, data en remote support', 'Pilot en uitrol'],
      ['ActARion', 'Use-case keuze, pilot en meting, implementatie en regie over het geheel', 'Van start tot opschaling'],
    ],
    brings: 'Wat {naam} inbrengt',
    more: 'Meer over {naam}',
    newWindow: '(opent in een nieuw venster)',
    partners: mk([
      { soort: 'Technologiepartner', intro: 'DeepSight is het AR-first connected worker platform achter ActARion. Experts maken stap-voor-stap instructies, trainingsscenario’s en storingsgidsen in een no-code editor en publiceren ze naar tablets, smartphones en smart glasses. ActARion is exclusief partner van DeepSight in Benelux en DACH.', punten: ['3D-instructies die precies over de werkomgeving vallen', 'Werkt op tablets, smartphones en smart glasses', 'Data per uitvoering voor kwaliteit, audit en verbetering'], ctaLabel: 'Lees over het platform' },
    ]),
    hwTitle: 'Zoekt u Apple Vision Pro, HoloLens of Android XR?',
    hwText: 'Hardware staat niet meer tussen de partners, maar heeft een eigen sectie met advies per device en een overstapgids voor HoloLens 2.',
    hwLink: 'Naar hardware →',
    ctaHeading: 'Welke partner past bij uw vraag?',
    detailOther: 'Andere partners',
    detailBack: '← Alle partners',
  },
  en: {
    eyebrow: 'Partners',
    h1: 'Who does ActARion work with?',
    lead: 'ActARion works with DeepSight as its permanent technology partner: DeepSight provides the AR platform. ActARion orchestrates the whole, from use case to roll-out, and brings in partners from its network where needed.',
    cta: 'Schedule a call',
    tableLabel: 'Who does what',
    head: ['Partner', 'Role in your project', 'When'],
    rows: [
      ['DeepSight', 'The platform: no-code editor, AR instructions on tablets and smart glasses, data and remote support', 'Pilot and roll-out'],
      ['ActARion', 'Use case selection, pilot and measurement, implementation and overall direction', 'From start to scale-up'],
    ],
    brings: 'What {naam} brings',
    more: 'More about {naam}',
    newWindow: '(opens in a new window)',
    partners: mk([
      { soort: 'Technology partner', intro: 'DeepSight is the AR-first connected worker platform behind ActARion. Experts create step-by-step instructions, training scenarios and troubleshooting guides in a no-code editor and publish them to tablets, smartphones and smart glasses. ActARion is DeepSight’s exclusive partner in Benelux and DACH.', punten: ['3D instructions overlaid precisely on the work environment', 'Works on tablets, smartphones and smart glasses', 'Data per execution for quality, audit and improvement'], ctaLabel: 'Read about the platform' },
    ]),
    hwTitle: 'Looking for Apple Vision Pro, HoloLens or Android XR?',
    hwText: 'Hardware is no longer listed among the partners but has its own section, with advice per device and a migration guide for HoloLens 2.',
    hwLink: 'Go to hardware →',
    ctaHeading: 'Which partner fits your question?',
    detailOther: 'Other partners',
    detailBack: '← All partners',
  },
  de: {
    eyebrow: 'Partner',
    h1: 'Mit wem arbeitet ActARion zusammen?',
    lead: 'ActARion arbeitet mit DeepSight als festem Technologiepartner: DeepSight liefert die AR-Plattform. ActARion steuert das Ganze, vom Use Case bis zum Rollout, und holt bei Bedarf Partner aus seinem Netzwerk dazu.',
    cta: 'Gespräch vereinbaren',
    tableLabel: 'Wer macht was',
    head: ['Partner', 'Rolle in Ihrem Projekt', 'Wann'],
    rows: [
      ['DeepSight', 'Die Plattform: No-Code-Editor, AR-Anweisungen auf Tablet und Datenbrille, Daten und Remote-Support', 'Pilot und Rollout'],
      ['ActARion', 'Use-Case-Auswahl, Pilot und Messung, Implementierung und Gesamtsteuerung', 'Vom Start bis zur Skalierung'],
    ],
    brings: 'Was {naam} einbringt',
    more: 'Mehr über {naam}',
    newWindow: '(öffnet in einem neuen Fenster)',
    partners: mk([
      { soort: 'Technologiepartner', intro: 'DeepSight ist die AR-first Plattform für Werkerassistenz hinter ActARion. Experten erstellen Schritt-für-Schritt-Anweisungen, Trainingsszenarien und Störungsleitfäden in einem No-Code-Editor und veröffentlichen sie auf Tablets, Smartphones und Datenbrillen. ActARion ist exklusiver Partner von DeepSight in Benelux und DACH.', punten: ['3D-Anweisungen, die exakt über der Arbeitsumgebung liegen', 'Funktioniert auf Tablets, Smartphones und Datenbrillen', 'Daten pro Ausführung für Qualität, Audit und Verbesserung'], ctaLabel: 'Mehr über die Plattform' },
    ]),
    hwTitle: 'Suchen Sie Apple Vision Pro, HoloLens oder Android XR?',
    hwText: 'Hardware steht nicht mehr bei den Partnern, sondern hat einen eigenen Bereich mit Empfehlungen pro Gerät und einem Umstiegsleitfaden für HoloLens 2.',
    hwLink: 'Zur Hardware →',
    ctaHeading: 'Welcher Partner passt zu Ihrer Frage?',
    detailOther: 'Weitere Partner',
    detailBack: '← Alle Partner',
  },
};
