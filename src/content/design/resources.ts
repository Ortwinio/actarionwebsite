import type { Locale } from '@/lib/locale';
import type { PageType } from '@/content/catalog';

type L<T> = Record<Locale, T>;

/** Knowledge-base item types (design type badges). */
export type KbType = 'guide' | 'template' | 'comparison' | 'case' | 'tool' | 'term' | 'whitepaper';
export type KbTopic = 'dwi' | 'train' | 'ops' | 'impl';
export type KbInd = 'maak' | 'farma' | 'voeding' | 'energie' | 'luchtvaart' | 'machine';

export const kbTypeOrder: KbType[] = ['guide', 'template', 'comparison', 'case', 'tool', 'term', 'whitepaper'];
export const kbTopicOrder: KbTopic[] = ['dwi', 'train', 'ops', 'impl'];
export const kbIndOrder: KbInd[] = ['maak', 'farma', 'voeding', 'energie', 'luchtvaart', 'machine'];

export const kbTypeLabels: L<Record<KbType, string>> = {
  nl: { guide: 'Gids', template: 'Template', comparison: 'Vergelijking', case: 'Klantcase', tool: 'Tool', term: 'Begrip', whitepaper: 'Whitepaper' },
  en: { guide: 'Guide', template: 'Template', comparison: 'Comparison', case: 'Customer case', tool: 'Tool', term: 'Glossary', whitepaper: 'Whitepaper' },
  de: { guide: 'Leitfaden', template: 'Vorlage', comparison: 'Vergleich', case: 'Kundenfall', tool: 'Tool', term: 'Begriff', whitepaper: 'Whitepaper' },
};

export const kbTypeColors: Record<KbType, string> = {
  guide: '#A9DBF5',
  template: '#FFE7B0',
  comparison: '#D6F0E4',
  case: '#FFD9CC',
  tool: '#E6F1F9',
  term: '#EEF2F6',
  whitepaper: '#DCE4EB',
};

export const kbTopicLabels: L<Record<KbTopic, string>> = {
  nl: { dwi: 'Digitale werkinstructies', train: 'Training en kennisborging', ops: 'Onderhoud en operatie', impl: 'Hardware en implementatie' },
  en: { dwi: 'Digital work instructions', train: 'Training and knowledge retention', ops: 'Maintenance and operations', impl: 'Hardware and implementation' },
  de: { dwi: 'Digitale Arbeitsanweisungen', train: 'Schulung und Wissenssicherung', ops: 'Instandhaltung und Betrieb', impl: 'Hardware und Einführung' },
};

export const kbIndLabels: L<Record<KbInd, string>> = {
  nl: { maak: 'Maakindustrie', farma: 'Farma en biotech', voeding: 'Voedingsmiddelen', energie: 'Energie en utilities', luchtvaart: 'Luchtvaart en MRO', machine: 'Machinebouw' },
  en: { maak: 'Manufacturing', farma: 'Pharma and biotech', voeding: 'Food and beverage', energie: 'Energy and utilities', luchtvaart: 'Aerospace and MRO', machine: 'Machine building' },
  de: { maak: 'Fertigungsindustrie', farma: 'Pharma und Biotech', voeding: 'Lebensmittel', energie: 'Energie und Versorgung', luchtvaart: 'Luftfahrt und MRO', machine: 'Maschinenbau' },
};

/** Page types included in the knowledge base, mapped to a design badge. */
export const kbTypeFor: Partial<Record<PageType, KbType>> = {
  guide: 'guide',
  template: 'template',
  comparison: 'comparison',
  caseStudy: 'case',
  roi: 'tool',
  glossaryTerm: 'term',
  whitepaper: 'whitepaper',
  report: 'whitepaper',
};

/** Topic, industries and popularity per route key (popularity values follow the design where it lists the item). */
export const kbMeta: Record<string, { topic: KbTopic; ind?: KbInd[]; pop?: number }> = {
  blogWriteWorkInstructions: { topic: 'dwi', pop: 97 },
  blogWhatIsSop: { topic: 'dwi', ind: ['farma', 'voeding'], pop: 95 },
  blogSmed: { topic: 'ops', ind: ['voeding', 'maak', 'farma'], pop: 93 },
  blogConnectedWorker: { topic: 'train', pop: 82 },
  blogSkillsMatrix: { topic: 'train', ind: ['maak', 'voeding'], pop: 79 },
  blogVisual: { topic: 'dwi', pop: 76 },
  blogAiSop: { topic: 'dwi', pop: 84 },
  blogMaintenance: { topic: 'ops', ind: ['energie', 'maak', 'machine'], pop: 88 },
  blogOnboarding: { topic: 'train', ind: ['maak', 'voeding', 'farma'], pop: 86 },
  blogArManufacturing: { topic: 'impl', ind: ['maak', 'luchtvaart'], pop: 74 },
  blogHololens: { topic: 'impl', pop: 91 },
  blogSmartGlasses: { topic: 'impl', pop: 72 },
  blogKnowledgeTransfer: { topic: 'train', pop: 71 },
  tplWorkInstruction: { topic: 'dwi', pop: 98 },
  tplSmed: { topic: 'ops', ind: ['voeding', 'maak'], pop: 90 },
  tplMaintenance: { topic: 'ops', ind: ['energie', 'machine'], pop: 87 },
  tplSop: { topic: 'dwi', ind: ['farma', 'voeding'], pop: 83 },
  tplSkills: { topic: 'train', ind: ['maak'], pop: 78 },
  tplOnboarding: { topic: 'train', pop: 77 },
  tplSchedule: { topic: 'ops', ind: ['energie', 'machine'], pop: 68 },
  tplLoto: { topic: 'ops', ind: ['energie', 'machine'], pop: 69 },
  tplLineClearance: { topic: 'dwi', ind: ['farma', 'voeding'], pop: 66 },
  tplQuality: { topic: 'dwi', ind: ['maak'], pop: 67 },
  tplPreShift: { topic: 'ops', pop: 65 },
  tplKnowledge: { topic: 'train', pop: 64 },
  cmpDigitalVsPaper: { topic: 'dwi', pop: 85 },
  cmpVisionProHololens: { topic: 'impl', pop: 80 },
  cmpCwpVsLms: { topic: 'train', pop: 63 },
  cmpGlassesTablets: { topic: 'impl', pop: 62 },
  cmpBestSoftware: { topic: 'dwi', pop: 75 },
  caseFood: { topic: 'train', ind: ['voeding'], pop: 89 },
  casePharma: { topic: 'dwi', ind: ['farma'], pop: 70 },
  caseMining: { topic: 'ops', ind: ['energie'], pop: 61 },
  caseTransport: { topic: 'ops', ind: ['luchtvaart'], pop: 60 },
  roiCalculator: { topic: 'impl', pop: 99 },
  wpItSecurity: { topic: 'impl', pop: 58 },
  termSop: { topic: 'dwi', pop: 50 },
  termWorkInstruction: { topic: 'dwi', pop: 50 },
  termConnectedWorker: { topic: 'train', pop: 45 },
  termSmed: { topic: 'ops', pop: 48 },
  termOee: { topic: 'ops', pop: 47 },
  termPokaYoke: { topic: 'dwi', ind: ['maak'], pop: 40 },
  termSkillsMatrix: { topic: 'train', pop: 42 },
  termLoto: { topic: 'ops', ind: ['energie', 'machine'], pop: 41 },
  termLineClearance: { topic: 'dwi', ind: ['farma', 'voeding'], pop: 39 },
  termGmp: { topic: 'dwi', ind: ['farma'], pop: 44 },
  termCapa: { topic: 'dwi', ind: ['farma'], pop: 38 },
  termFtr: { topic: 'ops', pop: 37 },
  termAr: { topic: 'impl', pop: 46 },
  termMr: { topic: 'impl', pop: 36 },
  termSmartGlasses: { topic: 'impl', pop: 43 },
  termRemote: { topic: 'impl', pop: 35 },
  termKnowledgeCapture: { topic: 'train', pop: 34 },
  termDigitalTwin: { topic: 'impl', pop: 33 },
  termMes: { topic: 'ops', pop: 32 },
  termWas: { topic: 'dwi', pop: 31 },
};

/** Badge label for any page type (used on article/hub cards). */
const otherTypeLabels: L<Partial<Record<PageType, string>>> = {
  nl: { useCase: 'Use case', industry: 'Branche', solution: 'Oplossing', platform: 'Platform', hardware: 'Hardware', media: 'Media', company: 'Over ons', team: 'Team', careers: 'Vacatures', legal: 'Juridisch', faq: 'FAQ', partner: 'Partner', hub: 'Overzicht', resourcesHub: 'Kennisbank', glossaryHub: 'Begrippen', pilot: 'Pilot', fitCheck: 'Tool', demo: 'Demo', contact: 'Contact' },
  en: { useCase: 'Use case', industry: 'Industry', solution: 'Solution', platform: 'Platform', hardware: 'Hardware', media: 'Media', company: 'About us', team: 'Team', careers: 'Careers', legal: 'Legal', faq: 'FAQ', partner: 'Partner', hub: 'Overview', resourcesHub: 'Resources', glossaryHub: 'Glossary', pilot: 'Pilot', fitCheck: 'Tool', demo: 'Demo', contact: 'Contact' },
  de: { useCase: 'Anwendungsfall', industry: 'Branche', solution: 'Lösung', platform: 'Plattform', hardware: 'Hardware', media: 'Medien', company: 'Über uns', team: 'Team', careers: 'Karriere', legal: 'Rechtliches', faq: 'FAQ', partner: 'Partner', hub: 'Übersicht', resourcesHub: 'Wissensdatenbank', glossaryHub: 'Glossar', pilot: 'Pilot', fitCheck: 'Tool', demo: 'Demo', contact: 'Kontakt' },
};

export function typeLabel(type: PageType, locale: Locale): string {
  const kb = kbTypeFor[type];
  if (kb) return kbTypeLabels[locale][kb];
  return otherTypeLabels[locale][type] ?? type;
}

export const kbUi: L<{
  eyebrow: string;
  h1: string;
  lead: string;
  searchLabel: string;
  placeholder: string;
  clear: string;
  popularLabel: string;
  popular: string[];
  filters: string;
  topic: string;
  type: string;
  ind: string;
  all: string;
  asideCta: string;
  result: string;
  results: string;
  sort: string;
  sortNew: string;
  sortPop: string;
  removeFilter: string;
  clearAll: string;
  minutes: string;
  interactive: string;
  updated: string;
  expertTitle: string;
  expertText: string;
  expertBtn: string;
  emptyQuery: string;
  emptyFilters: string;
  emptyText: string;
  emptyCta: string;
  emptyReset: string;
  roiTitle: string;
  roiSub: string;
  fitTitle: string;
  fitSub: string;
  bandHeading: string;
  hubCta: string;
}> = {
  nl: {
    eyebrow: 'Kennisbank',
    h1: 'Alles over digitale werkinstructies, training en AR op de werkvloer.',
    lead: 'Gidsen, templates, vergelijkingen en klantcases van ons team. Zoek op uw vraag of filter op onderwerp en branche.',
    searchLabel: 'Zoek in de kennisbank',
    placeholder: 'Bijv. werkinstructie maken, SOP, omsteltijd verkorten',
    clear: 'Wissen',
    popularLabel: 'Veel gezocht:',
    popular: ['werkinstructie', 'SOP', 'SMED', 'HoloLens', 'inwerken'],
    filters: 'Filters',
    topic: 'Onderwerp',
    type: 'Type',
    ind: 'Branche',
    all: 'Alles',
    asideCta: 'Vraag het direct aan een expert.',
    result: 'resultaat',
    results: 'resultaten',
    sort: 'Sorteren',
    sortNew: 'Nieuwste',
    sortPop: 'Meest gelezen',
    removeFilter: 'Filter {label} verwijderen',
    clearAll: 'Alles wissen',
    minutes: 'min',
    interactive: 'interactief',
    updated: 'bijgewerkt',
    expertTitle: 'Niet gevonden wat u zoekt?',
    expertText: 'Leg uw vraag in 30 minuten voor aan Jack of Mark. Vrijblijvend.',
    expertBtn: 'Plan een gesprek',
    emptyQuery: 'Geen artikelen voor “{q}”.',
    emptyFilters: 'Geen artikelen met deze filters.',
    emptyText: 'Probeer een ander woord of minder filters. Of stel uw vraag direct aan een expert: dat gaat vaak sneller.',
    emptyCta: 'Plan een gesprek met een expert',
    emptyReset: 'Alle filters wissen',
    roiTitle: 'ROI-calculator',
    roiSub: 'Besparing en terugverdientijd in 2 minuten',
    fitTitle: 'Pilot-fitcheck',
    fitSub: 'Is uw proces klaar voor een pilot?',
    bandHeading: 'Uw vraag staat er niet tussen? Stel hem aan een expert.',
    hubCta: 'Vraag het direct aan een expert.',
  },
  en: {
    eyebrow: 'Resources',
    h1: 'Everything about digital work instructions, training and AR on the shop floor.',
    lead: 'Guides, templates, comparisons and customer cases from our team. Search for your question or filter by topic and industry.',
    searchLabel: 'Search the resources',
    placeholder: 'E.g. create a work instruction, SOP, reduce changeover time',
    clear: 'Clear',
    popularLabel: 'Popular searches:',
    popular: ['work instruction', 'SOP', 'SMED', 'HoloLens', 'onboarding'],
    filters: 'Filters',
    topic: 'Topic',
    type: 'Type',
    ind: 'Industry',
    all: 'All',
    asideCta: 'Ask an expert directly.',
    result: 'result',
    results: 'results',
    sort: 'Sort',
    sortNew: 'Newest',
    sortPop: 'Most read',
    removeFilter: 'Remove filter {label}',
    clearAll: 'Clear all',
    minutes: 'min',
    interactive: 'interactive',
    updated: 'updated',
    expertTitle: 'Can’t find what you need?',
    expertText: 'Put your question to Jack or Mark in 30 minutes. No obligation.',
    expertBtn: 'Book a call',
    emptyQuery: 'No articles for “{q}”.',
    emptyFilters: 'No articles match these filters.',
    emptyText: 'Try another word or fewer filters. Or ask an expert directly: that is often quicker.',
    emptyCta: 'Book a call with an expert',
    emptyReset: 'Clear all filters',
    roiTitle: 'ROI calculator',
    roiSub: 'Savings and payback in 2 minutes',
    fitTitle: 'Pilot fit check',
    fitSub: 'Is your process ready for a pilot?',
    bandHeading: 'Your question isn’t listed? Ask an expert.',
    hubCta: 'Ask an expert directly.',
  },
  de: {
    eyebrow: 'Wissensdatenbank',
    h1: 'Alles über digitale Arbeitsanweisungen, Schulung und AR in der Produktion.',
    lead: 'Leitfäden, Vorlagen, Vergleiche und Kundenfälle von unserem Team. Suchen Sie nach Ihrer Frage oder filtern Sie nach Thema und Branche.',
    searchLabel: 'In der Wissensdatenbank suchen',
    placeholder: 'z. B. Arbeitsanweisung erstellen, SOP, Rüstzeit verkürzen',
    clear: 'Löschen',
    popularLabel: 'Häufig gesucht:',
    popular: ['Arbeitsanweisung', 'SOP', 'SMED', 'HoloLens', 'Einarbeitung'],
    filters: 'Filter',
    topic: 'Thema',
    type: 'Typ',
    ind: 'Branche',
    all: 'Alle',
    asideCta: 'Fragen Sie direkt einen Experten.',
    result: 'Ergebnis',
    results: 'Ergebnisse',
    sort: 'Sortieren',
    sortNew: 'Neueste',
    sortPop: 'Meistgelesen',
    removeFilter: 'Filter {label} entfernen',
    clearAll: 'Alle löschen',
    minutes: 'Min.',
    interactive: 'interaktiv',
    updated: 'aktualisiert',
    expertTitle: 'Nicht gefunden, was Sie suchen?',
    expertText: 'Besprechen Sie Ihre Frage in 30 Minuten mit Jack oder Mark. Unverbindlich.',
    expertBtn: 'Gespräch vereinbaren',
    emptyQuery: 'Keine Artikel zu „{q}“.',
    emptyFilters: 'Keine Artikel mit diesen Filtern.',
    emptyText: 'Versuchen Sie ein anderes Wort oder weniger Filter. Oder stellen Sie Ihre Frage direkt einem Experten: Das geht oft schneller.',
    emptyCta: 'Gespräch mit einem Experten vereinbaren',
    emptyReset: 'Alle Filter löschen',
    roiTitle: 'ROI-Rechner',
    roiSub: 'Einsparung und Amortisation in 2 Minuten',
    fitTitle: 'Pilot-Fitcheck',
    fitSub: 'Ist Ihr Prozess bereit für einen Pilot?',
    bandHeading: 'Ihre Frage ist nicht dabei? Stellen Sie sie einem Experten.',
    hubCta: 'Fragen Sie direkt einen Experten.',
  },
};
