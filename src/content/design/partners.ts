import type { Locale } from '@/lib/locale';

export interface PartnerItem {
  id: 'deepsight' | 'potentify' | 'simply-change';
  routeKey: 'partnerDeepsight' | 'partnerPotentify' | 'partnerSimplyChange';
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
  { id: 'potentify', routeKey: 'partnerPotentify', naam: 'Potentify', domein: 'potentify.nl', url: 'https://potentify.nl/', ctaKey: 'resources' },
  { id: 'simply-change', routeKey: 'partnerSimplyChange', naam: 'Simply Change', domein: 'simplychange.nl', url: 'https://www.simplychange.nl/', ctaKey: 'pilot' },
] as const;

const mk = (rows: { soort: string; intro: string; punten: string[]; ctaLabel: string }[]): PartnerItem[] =>
  rows.map((r, i) => ({ ...base[i], ...r }));

export const partnersCopy: Record<Locale, PartnersCopy> = {
  nl: {
    eyebrow: 'Partners',
    h1: 'Met wie werkt ActARion samen?',
    lead: 'ActARion werkt met drie vaste partners. DeepSight levert het AR-platform. Potentify verbindt werkinstructies met HR, leren en vaardigheden. Simply Change zorgt dat de verandering op de werkvloer blijft hangen. ActARion regisseert het geheel: van use case tot uitrol.',
    cta: 'Plan een gesprek',
    tableLabel: 'Wie doet wat',
    head: ['Partner', 'Rol in uw project', 'Wanneer'],
    rows: [
      ['DeepSight', 'Het platform: no-code editor, AR-instructies op tablet en smart glasses, data en remote support', 'Pilot en uitrol'],
      ['Potentify', 'HR, learning design, competentieprofielen en skills-matrices', 'Inwerken en opleiden'],
      ['Simply Change', 'Verandermanagement, stakeholders en coaching van teamleiders', 'Uitrol en borging'],
      ['ActARion', 'Use-case keuze, pilot en meting, implementatie en regie over het geheel', 'Van start tot opschaling'],
    ],
    brings: 'Wat {naam} inbrengt',
    more: 'Meer over {naam}',
    newWindow: '(opent in een nieuw venster)',
    partners: mk([
      { soort: 'Technologiepartner', intro: 'DeepSight is het AR-first connected worker platform achter ActARion. Experts maken stap-voor-stap instructies, trainingsscenario’s en storingsgidsen in een no-code editor en publiceren ze naar tablets, smartphones en smart glasses. ActARion is exclusief partner van DeepSight in Benelux en DACH.', punten: ['3D-instructies die precies over de werkomgeving vallen', 'Werkt op tablets, smartphones en smart glasses', 'Data per uitvoering voor kwaliteit, audit en verbetering'], ctaLabel: 'Lees over het platform' },
      { soort: 'HR- en leerpartner', intro: 'Potentify is de HR-gerichte implementatiepartner. Samen verbinden we AR-werkinstructies met HR-, leer- en talentstrategieën, zodat training en SOP’s direct aansluiten op rollen, vaardigheden en loopbaanpaden.', punten: ['Expertise in HR, learning design en performance management', 'Ontwerp van competentieprofielen en skills-matrices', 'Werkinstructies afgestemd op inwerken, bijscholing en compliance'], ctaLabel: 'Lees over inwerken en training' },
      { soort: 'Partner verandermanagement', intro: 'Simply Change is de partner voor verandermanagement en implementatie, met veel ervaring in FMCG en operationele transformatie. Samen zorgen we dat AR-oplossingen niet bij een pilot blijven, maar onderdeel worden van het dagelijkse werk.', punten: ['Verandermanagement, stakeholdermanagement en communicatie', 'Ervaring in FMCG, waar snelheid, kwaliteit en compliance tellen', 'Praktische tools en coaching voor teamleiders tijdens de uitrol'], ctaLabel: 'Lees over de aanpak' },
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
    lead: 'ActARion works with three permanent partners. DeepSight provides the AR platform. Potentify connects work instructions to HR, learning and skills. Simply Change makes sure the change sticks on the shop floor. ActARion orchestrates the whole: from use case to roll-out.',
    cta: 'Schedule a call',
    tableLabel: 'Who does what',
    head: ['Partner', 'Role in your project', 'When'],
    rows: [
      ['DeepSight', 'The platform: no-code editor, AR instructions on tablets and smart glasses, data and remote support', 'Pilot and roll-out'],
      ['Potentify', 'HR, learning design, competency profiles and skills matrices', 'Onboarding and training'],
      ['Simply Change', 'Change management, stakeholders and coaching of team leaders', 'Roll-out and embedding'],
      ['ActARion', 'Use case selection, pilot and measurement, implementation and overall direction', 'From start to scale-up'],
    ],
    brings: 'What {naam} brings',
    more: 'More about {naam}',
    newWindow: '(opens in a new window)',
    partners: mk([
      { soort: 'Technology partner', intro: 'DeepSight is the AR-first connected worker platform behind ActARion. Experts create step-by-step instructions, training scenarios and troubleshooting guides in a no-code editor and publish them to tablets, smartphones and smart glasses. ActARion is DeepSight’s exclusive partner in Benelux and DACH.', punten: ['3D instructions overlaid precisely on the work environment', 'Works on tablets, smartphones and smart glasses', 'Data per execution for quality, audit and improvement'], ctaLabel: 'Read about the platform' },
      { soort: 'HR and learning partner', intro: 'Potentify is the HR-focused implementation partner. Together we connect AR work instructions to HR, learning and talent strategies, so training and SOPs align directly with roles, skills and career paths.', punten: ['Expertise in HR, learning design and performance management', 'Design of competency profiles and skills matrices', 'Work instructions aligned with onboarding, upskilling and compliance'], ctaLabel: 'Read about onboarding and training' },
      { soort: 'Change management partner', intro: 'Simply Change is the partner for change management and implementation, with extensive experience in FMCG and operational transformation. Together we make sure AR solutions don’t stop at a pilot but become part of everyday work.', punten: ['Change management, stakeholder management and communication', 'Experience in FMCG, where speed, quality and compliance count', 'Practical tools and coaching for team leaders during roll-out'], ctaLabel: 'Read about our approach' },
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
    lead: 'ActARion arbeitet mit drei festen Partnern. DeepSight liefert die AR-Plattform. Potentify verbindet Arbeitsanweisungen mit HR, Lernen und Qualifikationen. Simply Change sorgt dafür, dass die Veränderung in der Fertigung nachhaltig verankert wird. ActARion steuert das Ganze: vom Use Case bis zum Rollout.',
    cta: 'Gespräch vereinbaren',
    tableLabel: 'Wer macht was',
    head: ['Partner', 'Rolle in Ihrem Projekt', 'Wann'],
    rows: [
      ['DeepSight', 'Die Plattform: No-Code-Editor, AR-Anweisungen auf Tablet und Datenbrille, Daten und Remote-Support', 'Pilot und Rollout'],
      ['Potentify', 'HR, Learning Design, Kompetenzprofile und Qualifikationsmatrizen', 'Einarbeitung und Schulung'],
      ['Simply Change', 'Change Management, Stakeholder und Coaching von Teamleitern', 'Rollout und Verankerung'],
      ['ActARion', 'Use-Case-Auswahl, Pilot und Messung, Implementierung und Gesamtsteuerung', 'Vom Start bis zur Skalierung'],
    ],
    brings: 'Was {naam} einbringt',
    more: 'Mehr über {naam}',
    newWindow: '(öffnet in einem neuen Fenster)',
    partners: mk([
      { soort: 'Technologiepartner', intro: 'DeepSight ist die AR-first Plattform für Werkerassistenz hinter ActARion. Experten erstellen Schritt-für-Schritt-Anweisungen, Trainingsszenarien und Störungsleitfäden in einem No-Code-Editor und veröffentlichen sie auf Tablets, Smartphones und Datenbrillen. ActARion ist exklusiver Partner von DeepSight in Benelux und DACH.', punten: ['3D-Anweisungen, die exakt über der Arbeitsumgebung liegen', 'Funktioniert auf Tablets, Smartphones und Datenbrillen', 'Daten pro Ausführung für Qualität, Audit und Verbesserung'], ctaLabel: 'Mehr über die Plattform' },
      { soort: 'HR- und Lernpartner', intro: 'Potentify ist der HR-orientierte Implementierungspartner. Gemeinsam verbinden wir AR-Arbeitsanweisungen mit HR-, Lern- und Talentstrategien, sodass Schulungen und SOPs direkt an Rollen, Qualifikationen und Karrierepfade anschließen.', punten: ['Expertise in HR, Learning Design und Performance Management', 'Entwicklung von Kompetenzprofilen und Qualifikationsmatrizen', 'Arbeitsanweisungen abgestimmt auf Einarbeitung, Weiterbildung und Compliance'], ctaLabel: 'Mehr über Einarbeitung und Schulung' },
      { soort: 'Partner für Change Management', intro: 'Simply Change ist der Partner für Change Management und Implementierung, mit viel Erfahrung in FMCG und operativer Transformation. Gemeinsam sorgen wir dafür, dass AR-Lösungen nicht beim Pilot stehen bleiben, sondern Teil der täglichen Arbeit werden.', punten: ['Change Management, Stakeholder-Management und Kommunikation', 'Erfahrung in FMCG, wo Geschwindigkeit, Qualität und Compliance zählen', 'Praktische Werkzeuge und Coaching für Teamleiter während des Rollouts'], ctaLabel: 'Mehr über unser Vorgehen' },
    ]),
    hwTitle: 'Suchen Sie Apple Vision Pro, HoloLens oder Android XR?',
    hwText: 'Hardware steht nicht mehr bei den Partnern, sondern hat einen eigenen Bereich mit Empfehlungen pro Gerät und einem Umstiegsleitfaden für HoloLens 2.',
    hwLink: 'Zur Hardware →',
    ctaHeading: 'Welcher Partner passt zu Ihrer Frage?',
    detailOther: 'Weitere Partner',
    detailBack: '← Alle Partner',
  },
};
