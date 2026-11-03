import type { Locale } from '@/lib/locale';

export interface PilotCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  ctaPilot: string;
  ctaFit: string;
  youGet: string;
  timeline: { n: string; dur: string; title: string; text: string; get: string }[];
  measureEyebrow: string;
  measureH2: string;
  measureText: string;
  measureLink: string;
  pills: { label: string; blue: boolean }[];
  fitH3: string;
  fit: string[];
  notFitH3: string;
  notFit: string[];
  askEyebrow: string;
  askH2: string;
  ask: { n: string; title: string; text: string }[];
  faqEyebrow: string;
  faqH2: string;
  faq: { q: string; a: string }[];
  ctaHeading: string;
}

export const pilotCopy: Record<Locale, PilotCopy> = {
  nl: {
    eyebrow: 'Aanpak',
    h1: 'Een pilot die eindigt in een besluit. Niet in een demo.',
    lead: 'We bakenen één proces af, meten vooraf, bouwen met uw mensen en leveren een rapport waarmee uw directie kan kiezen: opschalen, bijsturen of stoppen.',
    ctaPilot: 'Bespreek een pilot',
    ctaFit: 'Doe de fitcheck',
    youGet: 'U krijgt:',
    timeline: [
      { n: '01', dur: '[.. weken]', title: 'Discovery', text: 'Intake met operations, maintenance, quality, HR en IT. We brengen de momenten in kaart waar het misgaat en kiezen 3–5 kansen.', get: 'use-case- en roadmapdocument' },
      { n: '02', dur: '[.. weken]', title: 'Nulmeting', text: "We leggen KPI's, databronnen en besluitcriteria vast. Zo weet iedereen vooraf wat succes is.", get: 'meetplan en go/no-go-criteria' },
      { n: '03', dur: '[.. weken]', title: 'Pilot op de vloer', text: 'We configureren DeepSight, leggen procedures vast met uw experts en trainen een kleine groep operators en supervisors.', get: 'werkende AR-instructies in productie' },
      { n: '04', dur: '[.. weken]', title: 'Rapport en besluit', text: 'Resultaat tegen de nulmeting, adoptie, technische randvoorwaarden en een advies voor de volgende stap.', get: 'pilotrapport en schaalroute' },
    ],
    measureEyebrow: 'Wat we meten',
    measureH2: "KPI's die uw controller ook gelooft.",
    measureText: "We kiezen per pilot twee of drie KPI's die u al meet of eenvoudig kunt meten. De ROI-calculator geeft vooraf een hypothese; de pilot levert het bewijs.",
    measureLink: 'Open de ROI-calculator →',
    pills: [
      { label: 'first time right', blue: true }, { label: 'cyclustijd', blue: false }, { label: 'inwerktijd', blue: true }, { label: 'wisseltijd', blue: false },
      { label: 'ongeplande stilstand', blue: false }, { label: 'MTTR', blue: true }, { label: 'rework', blue: false }, { label: 'auditbewijs', blue: false },
    ],
    fitH3: 'Een pilot past als…',
    fit: ['het werk vaak wordt herhaald, door veel mensen of in ploegen', "u afhankelijk bent van een paar ervaren collega's", 'fouten, rework of stilstand aantoonbaar geld kosten', 'u bewijs nodig heeft voor kwaliteit, veiligheid of compliance'],
    notFitH3: 'We raden het af als…',
    notFit: ['een eenvoudige checklist het probleem al oplost', 'niemand eigenaar wordt van de instructies', 'er geen KPI of nulmeting beschikbaar is', 'u vooral een AR-demo zoekt, zonder operationele verandering'],
    askEyebrow: 'Wat een pilot van u vraagt',
    askH2: 'Weinig tijd, de juiste mensen.',
    ask: [
      { n: '1', title: 'proceseigenaar', text: 'Beslist over scope en draagt het resultaat.' },
      { n: '2–3', title: 'vakexperts', text: 'Leggen samen met ons de beste werkwijze vast.' },
      { n: '[..]', title: 'operators', text: 'Werken met de instructies en geven feedback.' },
      { n: '1', title: 'IT/OT-contact', text: 'Toetst devices, toegang en data vóór de start.' },
    ],
    faqEyebrow: 'Vaak gevraagd',
    faqH2: 'Korte antwoorden.',
    faq: [
      { q: 'Moeten we met smart glasses beginnen?', a: 'Nee. De meeste organisaties starten op smartphones of tablets. Smart glasses zoals HoloLens 2 of Apple Vision Pro kunnen later.' },
      { q: 'Wie beheert de instructies na de pilot?', a: 'Uw eigen team, met een no-code editor. Wij leggen rollen voor maken, goedkeuren en bijwerken vast.' },
      { q: 'Wat kost een pilot?', a: '[Vanaf € .. voor één use case op één locatie, inclusief licenties, begeleiding en rapport.] U ontvangt een offerte op maat.' },
      { q: 'Met wie sluiten we het contract?', a: '[Toelichting contractpartij en support: ActARion en/of DeepSight.]' },
    ],
    ctaHeading: 'Welk proces bewijst het als eerste? Bepaal het samen met een expert.',
  },
  en: {
    eyebrow: 'Approach',
    h1: 'A pilot that ends in a decision. Not in a demo.',
    lead: 'We scope one process, measure up front, build with your people and deliver a report your management can act on: scale up, adjust or stop.',
    ctaPilot: 'Discuss a pilot',
    ctaFit: 'Take the fit check',
    youGet: 'You get:',
    timeline: [
      { n: '01', dur: '[.. weeks]', title: 'Discovery', text: 'Intake with operations, maintenance, quality, HR and IT. We map the moments where things go wrong and pick 3–5 opportunities.', get: 'use case and roadmap document' },
      { n: '02', dur: '[.. weeks]', title: 'Baseline', text: 'We define KPIs, data sources and decision criteria, so everyone knows up front what success looks like.', get: 'measurement plan and go/no-go criteria' },
      { n: '03', dur: '[.. weeks]', title: 'Pilot on the shop floor', text: 'We configure DeepSight, capture procedures with your experts and train a small group of operators and supervisors.', get: 'working AR instructions in production' },
      { n: '04', dur: '[.. weeks]', title: 'Report and decision', text: 'Results against the baseline, adoption, technical prerequisites and a recommendation for the next step.', get: 'pilot report and scale-up route' },
    ],
    measureEyebrow: 'What we measure',
    measureH2: 'KPIs your controller will believe.',
    measureText: 'For each pilot we choose two or three KPIs you already track or can easily measure. The ROI calculator gives you a hypothesis up front; the pilot delivers the proof.',
    measureLink: 'Open the ROI calculator →',
    pills: [
      { label: 'first time right', blue: true }, { label: 'cycle time', blue: false }, { label: 'time to competence', blue: true }, { label: 'changeover time', blue: false },
      { label: 'unplanned downtime', blue: false }, { label: 'MTTR', blue: true }, { label: 'rework', blue: false }, { label: 'audit evidence', blue: false },
    ],
    fitH3: 'A pilot fits if…',
    fit: ['the work is repeated often, by many people or across shifts', 'you depend on a handful of experienced colleagues', 'errors, rework or downtime demonstrably cost money', 'you need evidence for quality, safety or compliance'],
    notFitH3: 'We advise against it if…',
    notFit: ['a simple checklist already solves the problem', 'nobody will own the instructions', 'no KPI or baseline is available', 'you mainly want an AR demo, without operational change'],
    askEyebrow: 'What a pilot asks of you',
    askH2: 'Little time, the right people.',
    ask: [
      { n: '1', title: 'process owner', text: 'Decides on scope and owns the result.' },
      { n: '2–3', title: 'subject-matter experts', text: 'Capture the best way of working together with us.' },
      { n: '[..]', title: 'operators', text: 'Work with the instructions and give feedback.' },
      { n: '1', title: 'IT/OT contact', text: 'Checks devices, access and data before the start.' },
    ],
    faqEyebrow: 'Frequently asked',
    faqH2: 'Short answers.',
    faq: [
      { q: 'Do we have to start with smart glasses?', a: 'No. Most organisations start on smartphones or tablets. Smart glasses such as HoloLens 2 or Apple Vision Pro can follow later.' },
      { q: 'Who manages the instructions after the pilot?', a: 'Your own team, with a no-code editor. We define the roles for creating, approving and updating.' },
      { q: 'What does a pilot cost?', a: '[From € .. for one use case at one site, including licences, guidance and report.] You receive a tailored quote.' },
      { q: 'Who do we sign the contract with?', a: '[Explanation of contracting party and support: ActARion and/or DeepSight.]' },
    ],
    ctaHeading: 'Which process proves it first? Decide together with an expert.',
  },
  de: {
    eyebrow: 'Vorgehen',
    h1: 'Ein Pilot, der mit einer Entscheidung endet. Nicht mit einer Demo.',
    lead: 'Wir grenzen einen Prozess ab, messen vorab, bauen mit Ihren Mitarbeitenden und liefern einen Bericht, mit dem Ihre Geschäftsleitung entscheiden kann: skalieren, nachsteuern oder stoppen.',
    ctaPilot: 'Pilot besprechen',
    ctaFit: 'Zum Pilot-Check',
    youGet: 'Sie erhalten:',
    timeline: [
      { n: '01', dur: '[.. Wochen]', title: 'Discovery', text: 'Aufnahme mit Produktion, Instandhaltung, Qualität, HR und IT. Wir erfassen die Momente, in denen es schiefgeht, und wählen 3–5 Chancen.', get: 'Use-Case- und Roadmap-Dokument' },
      { n: '02', dur: '[.. Wochen]', title: 'Nullmessung', text: 'Wir legen KPIs, Datenquellen und Entscheidungskriterien fest. So weiß jeder vorab, was Erfolg bedeutet.', get: 'Messplan und Go/No-Go-Kriterien' },
      { n: '03', dur: '[.. Wochen]', title: 'Pilot in der Fertigung', text: 'Wir konfigurieren DeepSight, erfassen Abläufe mit Ihren Fachexperten und schulen eine kleine Gruppe von Werkern und Schichtleitern.', get: 'funktionierende AR-Arbeitsanweisungen in der Produktion' },
      { n: '04', dur: '[.. Wochen]', title: 'Bericht und Entscheidung', text: 'Ergebnis gegenüber der Nullmessung, Akzeptanz, technische Rahmenbedingungen und eine Empfehlung für den nächsten Schritt.', get: 'Pilotbericht und Skalierungspfad' },
    ],
    measureEyebrow: 'Was wir messen',
    measureH2: 'KPIs, denen auch Ihr Controlling glaubt.',
    measureText: 'Pro Pilot wählen wir zwei oder drei KPIs, die Sie bereits messen oder einfach messen können. Der ROI-Rechner liefert vorab eine Hypothese; der Pilot liefert den Nachweis.',
    measureLink: 'Zum ROI-Rechner →',
    pills: [
      { label: 'First Time Right', blue: true }, { label: 'Zykluszeit', blue: false }, { label: 'Einarbeitungszeit', blue: true }, { label: 'Rüstzeit', blue: false },
      { label: 'ungeplanter Stillstand', blue: false }, { label: 'MTTR', blue: true }, { label: 'Nacharbeit', blue: false }, { label: 'Auditnachweis', blue: false },
    ],
    fitH3: 'Ein Pilot passt, wenn…',
    fit: ['die Arbeit häufig wiederholt wird, von vielen Personen oder im Schichtbetrieb', 'Sie von wenigen erfahrenen Kollegen abhängig sind', 'Fehler, Nacharbeit oder Stillstand nachweislich Geld kosten', 'Sie Nachweise für Qualität, Sicherheit oder Compliance benötigen'],
    notFitH3: 'Wir raten ab, wenn…',
    notFit: ['eine einfache Checkliste das Problem bereits löst', 'niemand die Verantwortung für die Arbeitsanweisungen übernimmt', 'keine KPI oder Nullmessung verfügbar ist', 'Sie vor allem eine AR-Demo suchen, ohne operative Veränderung'],
    askEyebrow: 'Was ein Pilot von Ihnen verlangt',
    askH2: 'Wenig Zeit, die richtigen Personen.',
    ask: [
      { n: '1', title: 'Prozessverantwortlicher', text: 'Entscheidet über den Umfang und verantwortet das Ergebnis.' },
      { n: '2–3', title: 'Fachexperten', text: 'Legen gemeinsam mit uns die beste Arbeitsweise fest.' },
      { n: '[..]', title: 'Werker', text: 'Arbeiten mit den Anweisungen und geben Feedback.' },
      { n: '1', title: 'IT/OT-Ansprechpartner', text: 'Prüft Geräte, Zugänge und Daten vor dem Start.' },
    ],
    faqEyebrow: 'Häufige Fragen',
    faqH2: 'Kurze Antworten.',
    faq: [
      { q: 'Müssen wir mit Datenbrillen beginnen?', a: 'Nein. Die meisten Unternehmen starten mit Smartphones oder Tablets. Datenbrillen wie HoloLens 2 oder Apple Vision Pro können später folgen.' },
      { q: 'Wer pflegt die Arbeitsanweisungen nach dem Pilot?', a: 'Ihr eigenes Team, mit einem No-Code-Editor. Wir legen Rollen für Erstellen, Freigeben und Aktualisieren fest.' },
      { q: 'Was kostet ein Pilot?', a: '[Ab € .. für einen Use Case an einem Standort, inklusive Lizenzen, Begleitung und Bericht.] Sie erhalten ein individuelles Angebot.' },
      { q: 'Mit wem schließen wir den Vertrag?', a: '[Erläuterung Vertragspartner und Support: ActARion und/oder DeepSight.]' },
    ],
    ctaHeading: 'Welcher Prozess liefert den ersten Nachweis? Legen Sie es gemeinsam mit einem Experten fest.',
  },
};
