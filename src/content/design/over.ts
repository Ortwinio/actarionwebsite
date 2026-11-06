import type { Locale } from '@/lib/locale';

export interface TeamMember { slug: string; naam: string; voornaam: string; rol: string; regio: string; cta: boolean; img: string; alt: string; bio: string; punten: string[] }

export interface OverCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  meetLink: string;
  facts: { dt: string; dd: string }[];
  mgmtEyebrow: string;
  mgmtH2: string;
  mgmtText: string;
  helps: string; // {voornaam}
  talkTo: string; // {voornaam}
  linkedinLabel: string; // {naam}
  team: TeamMember[];
  howEyebrow: string;
  howH2: string;
  how: { n: string; title: string; text: string }[];
  howLink: string;
  partnersEyebrow: string;
  partnersH2: string;
  partnersCta: string;
  imageNoteStrong: string;
  imageNote: string;
  groupAlt: string;
  ctaHeading: string;
}

const img = { jk: '/img/team/jack-kessels.webp', md: '/img/team/mark-dercksen.webp', ov: '/img/team/ortwin-verreck.webp' };

export const overCopy: Record<Locale, OverCopy> = {
  nl: {
    eyebrow: 'Over ActARion',
    h1: 'Wie is ActARion?',
    lead: 'ActARion is de Europese implementatiepartner van DeepSight voor digitale en AR-werkinstructies. We helpen industriële, logistieke en energiebedrijven in de Benelux en DACH om kennis van ervaren technici om te zetten in stap-voor-stap begeleiding op tablet of smart glasses: van de eerste pilot tot uitrol over lijnen, locaties en landen.',
    cta: 'Plan een gesprek',
    meetLink: 'Maak kennis met het management ↓',
    facts: [
      { dt: 'Rol', dd: 'Exclusieve partner van DeepSight in Benelux en DACH' },
      { dt: 'Vestigingen', dd: 'Nederland en Zwitserland' },
      { dt: 'Voor wie', dd: 'Industrie, logistiek en energie' },
      { dt: 'Talen', dd: 'Nederlands, Duits en Engels' },
    ],
    mgmtEyebrow: 'Management',
    mgmtH2: 'Technologie, operatie en mensen aan één tafel.',
    mgmtText: 'Twee managing partners, elk verantwoordelijk voor een eigen regio en uw eerste aanspreekpunt, en de oprichter in de advisory board.',
    helps: 'Waar {voornaam} u bij helpt',
    talkTo: 'Plan een gesprek met {voornaam}',
    linkedinLabel: '{naam} op LinkedIn',
    team: [
      { slug: 'jack-kessels', naam: 'Jack Kessels', voornaam: 'Jack', rol: 'Managing Partner', regio: 'Benelux', cta: true, img: img.jk, alt: 'Foto van Jack Kessels, managing partner Benelux', bio: 'Jack heeft ruime ervaring in operationeel leiderschap in food, FMCG en interim-transformaties. Hij leidde complexe operationele opdrachten en verbeterprogramma’s en zet verandering om in meetbaar resultaat op de werkvloer. Zijn aanpak is pragmatisch en draait om mensen.', punten: ['Use cases met veel impact vinden voor AR en AI in de operatie', 'Een gezamenlijke roadmap voor pilot en uitrol opstellen', 'De juiste technologie-, implementatie- en opleidingspartners verbinden'] },
      { slug: 'mark-dercksen', naam: 'Mark Dercksen', voornaam: 'Mark', rol: 'Oprichter en Managing Partner', regio: 'DACH', cta: true, img: img.md, alt: 'Foto van Mark Dercksen, oprichter en managing partner DACH', bio: 'Ruime ervaring in commerciële, operationele en transformatierollen in internationale B2B-omgevingen: salesleiderschap, key accounts, operational excellence en verandermanagement.', punten: ['Een sterk netwerk van klanten en partners in Duitsland, Oostenrijk en Zwitserland', 'AR- en AI-projecten afstemmen op lokale praktijk, regels en cultuur', 'Implementaties robuust en schaalbaar inbedden in het dagelijkse werk'] },
      { slug: 'ortwin-verreck', naam: 'Ortwin Verreck', voornaam: 'Ortwin', rol: 'Oprichter en advisory board', regio: 'Oprichter', cta: false, img: img.ov, alt: 'Foto van Ortwin Verreck, oprichter van ActARion', bio: 'Ondernemer met een lange staat van dienst in het bouwen en opschalen van digitale bedrijven in Europa. Voor ActARion leidde en adviseerde hij bedrijven in digitale marketing, AI en SaaS, altijd gericht op meetbaar resultaat op de werkvloer.', punten: ['Werkinstructies en trainingsprocessen digitaliseren', 'AI en AR invoeren in operationele omgevingen', 'Ecosystemen van technologie- en implementatiepartners bouwen'] },
    ],
    howEyebrow: 'Hoe we werken',
    howH2: 'Van vraag naar opschaling in vier stappen.',
    how: [
      { n: '01', title: 'Vertrekpunt', text: 'Waar doen fouten, stilstand of kwetsbare kennis nu het meeste pijn?' },
      { n: '02', title: 'Inzicht op de vloer', text: 'We praten met operators, teamleiders, kwaliteit en onderhoud over hoe het werk echt gaat.' },
      { n: '03', title: 'Samen de eerste oplossing', text: 'Eén of twee use cases met veel impact, gebouwd met uw eigen experts.' },
      { n: '04', title: 'Pilot, impact, opschalen', text: 'Meten op inwerktijd, fouten, stilstand en first time right. Daarna een roadmap.' },
    ],
    howLink: 'Lees meer over de pilotaanpak →',
    partnersEyebrow: 'Partners',
    partnersH2: 'Eén platform, een sterk netwerk van partners.',
    partnersCta: 'Bekijk alle partners',
    groupAlt: 'Jack Kessels, Mark Dercksen en Ortwin Verreck in gesprek aan tafel',
    imageNoteStrong: 'Over onze beelden.',
    imageNote: "Alle illustraties zijn pentekeningen in de ActARion-kleuren. Het management staat op eigen foto's. Overige werksituaties tonen geen herkenbare personen, locaties of klanten.",
    ctaHeading: 'Liever eerst even kennismaken?',
  },
  en: {
    eyebrow: 'About ActARion',
    h1: 'Who is ActARion?',
    lead: 'ActARion is DeepSight’s European implementation partner for digital and AR work instructions. We help manufacturing, logistics and energy companies in Benelux and DACH turn the knowledge of experienced technicians into step-by-step guidance on tablets or smart glasses: from the first pilot to roll-out across lines, sites and countries.',
    cta: 'Schedule a call',
    meetLink: 'Meet the management ↓',
    facts: [
      { dt: 'Role', dd: 'Exclusive DeepSight partner in Benelux and DACH' },
      { dt: 'Offices', dd: 'The Netherlands and Switzerland' },
      { dt: 'For', dd: 'Manufacturing, logistics and energy' },
      { dt: 'Languages', dd: 'Dutch, German and English' },
    ],
    mgmtEyebrow: 'Management',
    mgmtH2: 'Technology, operations and people at one table.',
    mgmtText: 'Two managing partners, each responsible for their own region and your first point of contact, and the founder on the advisory board.',
    helps: 'How {voornaam} helps you',
    talkTo: 'Schedule a call with {voornaam}',
    linkedinLabel: '{naam} on LinkedIn',
    team: [
      { slug: 'jack-kessels', naam: 'Jack Kessels', voornaam: 'Jack', rol: 'Managing Partner', regio: 'Benelux', cta: true, img: img.jk, alt: 'Photo of Jack Kessels, managing partner Benelux', bio: 'Jack has extensive experience in operational leadership in food, FMCG and interim transformations. He has led complex operational assignments and improvement programmes and turns change into measurable results on the shop floor. His approach is pragmatic and people-centred.', punten: ['Finding high-impact use cases for AR and AI in operations', 'Drawing up a joint roadmap for pilot and roll-out', 'Connecting the right technology, implementation and training partners'] },
      { slug: 'mark-dercksen', naam: 'Mark Dercksen', voornaam: 'Mark', rol: 'Founder and Managing Partner', regio: 'DACH', cta: true, img: img.md, alt: 'Photo of Mark Dercksen, founder and managing partner DACH', bio: 'Extensive experience in commercial, operational and transformation roles in international B2B environments: sales leadership, key accounts, operational excellence and change management.', punten: ['A strong network of clients and partners in Germany, Austria and Switzerland', 'Aligning AR and AI projects with local practice, regulations and culture', 'Embedding implementations robustly and scalably in everyday work'] },
      { slug: 'ortwin-verreck', naam: 'Ortwin Verreck', voornaam: 'Ortwin', rol: 'Founder and advisory board', regio: 'Founder', cta: false, img: img.ov, alt: 'Photo of Ortwin Verreck, founder of ActARion', bio: 'Entrepreneur with a long track record of building and scaling digital businesses in Europe. Before ActARion he led and advised companies in digital marketing, AI and SaaS, always focused on measurable results on the shop floor.', punten: ['Digitising work instructions and training processes', 'Introducing AI and AR in operational environments', 'Building ecosystems of technology and implementation partners'] },
    ],
    howEyebrow: 'How we work',
    howH2: 'From question to scale-up in four steps.',
    how: [
      { n: '01', title: 'Starting point', text: 'Where do errors, downtime or fragile knowledge hurt most today?' },
      { n: '02', title: 'Insight on the shop floor', text: 'We talk to operators, team leaders, quality and maintenance about how the work really gets done.' },
      { n: '03', title: 'The first solution, together', text: 'One or two high-impact use cases, built with your own experts.' },
      { n: '04', title: 'Pilot, impact, scale', text: 'Measured on time to competence, errors, downtime and first time right. Then a roadmap.' },
    ],
    howLink: 'Read more about the pilot approach →',
    partnersEyebrow: 'Partners',
    partnersH2: 'One platform, a strong network of partners.',
    partnersCta: 'View all partners',
    groupAlt: 'Jack Kessels, Mark Dercksen and Ortwin Verreck in conversation at a table',
    imageNoteStrong: 'About our images.',
    imageNote: 'All illustrations are pen drawings in the ActARion colours. The management is shown in their own photos. Other work situations show no recognisable people, locations or clients.',
    ctaHeading: 'Would you like to get acquainted first?',
  },
  de: {
    eyebrow: 'Über ActARion',
    h1: 'Wer ist ActARion?',
    lead: 'ActARion ist der europäische Implementierungspartner von DeepSight für digitale und AR-Arbeitsanweisungen. Wir helfen Industrie-, Logistik- und Energieunternehmen in Benelux und DACH, das Wissen erfahrener Techniker in Schritt-für-Schritt-Anleitungen auf Tablet oder Datenbrille zu überführen: vom ersten Pilot bis zum Rollout über Linien, Standorte und Länder.',
    cta: 'Gespräch vereinbaren',
    meetLink: 'Lernen Sie die Geschäftsleitung kennen ↓',
    facts: [
      { dt: 'Rolle', dd: 'Exklusiver Partner von DeepSight in Benelux und DACH' },
      { dt: 'Standorte', dd: 'Niederlande und Schweiz' },
      { dt: 'Für wen', dd: 'Industrie, Logistik und Energie' },
      { dt: 'Sprachen', dd: 'Niederländisch, Deutsch und Englisch' },
    ],
    mgmtEyebrow: 'Geschäftsleitung',
    mgmtH2: 'Technologie, Betrieb und Menschen an einem Tisch.',
    mgmtText: 'Zwei Managing Partner, jeweils verantwortlich für eine eigene Region und Ihr erster Ansprechpartner, sowie der Gründer im Advisory Board.',
    helps: 'Wobei {voornaam} Sie unterstützt',
    talkTo: 'Gespräch mit {voornaam} vereinbaren',
    linkedinLabel: '{naam} auf LinkedIn',
    team: [
      { slug: 'jack-kessels', naam: 'Jack Kessels', voornaam: 'Jack', rol: 'Managing Partner', regio: 'Benelux', cta: true, img: img.jk, alt: 'Foto von Jack Kessels, Managing Partner Benelux', bio: 'Jack verfügt über umfangreiche Erfahrung in operativer Führung in Food, FMCG und Interim-Transformationen. Er leitete komplexe operative Mandate und Verbesserungsprogramme und setzt Veränderung in messbare Ergebnisse in der Fertigung um. Sein Ansatz ist pragmatisch und stellt den Menschen in den Mittelpunkt.', punten: ['Use Cases mit hoher Wirkung für AR und KI im Betrieb finden', 'Eine gemeinsame Roadmap für Pilot und Rollout erstellen', 'Die richtigen Technologie-, Implementierungs- und Schulungspartner verbinden'] },
      { slug: 'mark-dercksen', naam: 'Mark Dercksen', voornaam: 'Mark', rol: 'Gründer und Managing Partner', regio: 'DACH', cta: true, img: img.md, alt: 'Foto von Mark Dercksen, Gründer und Managing Partner DACH', bio: 'Umfangreiche Erfahrung in kaufmännischen, operativen und Transformationsrollen in internationalen B2B-Umfeldern: Vertriebsleitung, Key Accounts, Operational Excellence und Change Management.', punten: ['Ein starkes Netzwerk aus Kunden und Partnern in Deutschland, Österreich und der Schweiz', 'AR- und KI-Projekte auf lokale Praxis, Vorschriften und Kultur abstimmen', 'Implementierungen robust und skalierbar im Arbeitsalltag verankern'] },
      { slug: 'ortwin-verreck', naam: 'Ortwin Verreck', voornaam: 'Ortwin', rol: 'Gründer und Advisory Board', regio: 'Gründer', cta: false, img: img.ov, alt: 'Foto von Ortwin Verreck, Gründer von ActARion', bio: 'Unternehmer mit langjähriger Erfahrung im Aufbau und in der Skalierung digitaler Unternehmen in Europa. Vor ActARion leitete und beriet er Unternehmen in den Bereichen digitales Marketing, KI und SaaS, stets mit Fokus auf messbare Ergebnisse in der Praxis.', punten: ['Arbeitsanweisungen und Schulungsprozesse digitalisieren', 'KI und AR in operativen Umgebungen einführen', 'Ökosysteme aus Technologie- und Implementierungspartnern aufbauen'] },
    ],
    howEyebrow: 'Wie wir arbeiten',
    howH2: 'Von der Frage zur Skalierung in vier Schritten.',
    how: [
      { n: '01', title: 'Ausgangspunkt', text: 'Wo verursachen Fehler, Stillstand oder gefährdetes Wissen heute die größten Probleme?' },
      { n: '02', title: 'Einblick in die Fertigung', text: 'Wir sprechen mit Werkern, Teamleitern, Qualität und Instandhaltung darüber, wie die Arbeit wirklich abläuft.' },
      { n: '03', title: 'Gemeinsam die erste Lösung', text: 'Ein oder zwei Use Cases mit hoher Wirkung, gebaut mit Ihren eigenen Experten.' },
      { n: '04', title: 'Pilot, Wirkung, Skalierung', text: 'Gemessen an Einarbeitungszeit, Fehlern, Stillstand und First Time Right. Danach eine Roadmap.' },
    ],
    howLink: 'Mehr über das Pilotvorgehen →',
    partnersEyebrow: 'Partner',
    partnersH2: 'Eine Plattform, ein starkes Partnernetzwerk.',
    partnersCta: 'Alle Partner ansehen',
    groupAlt: 'Jack Kessels, Mark Dercksen und Ortwin Verreck im Gespräch am Tisch',
    imageNoteStrong: 'Über unsere Bilder.',
    imageNote: 'Alle Illustrationen sind Federzeichnungen in den ActARion-Farben. Die Geschäftsleitung ist auf eigenen Fotos zu sehen. Andere Arbeitssituationen zeigen keine erkennbaren Personen, Standorte oder Kunden.',
    ctaHeading: 'Lieber erst einmal kennenlernen?',
  },
};
