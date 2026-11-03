/**
 * Default content per page type, in EN / NL / DE.
 *
 * Every page in the catalogue gets a complete, valid page from these defaults:
 * title, meta description, H1, lead, answer block, the fixed content blocks of its
 * page type (per the content overview, T1–T11), FAQ and image placeholders.
 * Hand-written content in src/content/{en,nl,de}.ts overrides these field by field.
 *
 * Draft text is marked with brackets [ … ] and the page shows a "draft" banner.
 */
import type { Locale } from '@/lib/i18n';
import { childrenOf, routes, type RouteKey } from '@/lib/routes';
import type { FaqItem, PageContent, Section } from './types';

type L3 = Record<Locale, string>;
const t = (en: string, nl: string, de: string): L3 => ({ en, nl, de });

const TBD = t('[Content to be supplied]', '[Content volgt]', '[Inhalt folgt]');
const tbd = (l: Locale, what: string) => `${TBD[l].slice(0, -1)}: ${what}]`;

const UPDATED = '2026-11-03';

/* ---------- Phrase helpers ---------- */

const lc = (s: string, l: Locale) => (l === 'de' ? s : s.charAt(0).toLowerCase() + s.slice(1));

function faqs(l: Locale, items: [L3, L3][]): FaqItem[] {
  return items.map(([q, a]) => ({ q: q[l], a: a[l] }));
}

const priceFaq: [L3, L3] = [
  t('What does it cost?', 'Wat kost het?', 'Was kostet es?'),
  t(
    'The investment is tailored per industry and sector, so we do not publish prices. Book a free intake and we will give you a clear proposal.',
    'De investering is maatwerk per branche en sector, daarom publiceren we geen prijzen. Plan een kosteloze intake en je krijgt een helder voorstel.',
    'Die Investition ist je Branche und Sektor individuell, daher veröffentlichen wir keine Preise. Vereinbaren Sie ein kostenloses Erstgespräch für ein klares Angebot.',
  ),
];
const implFaq: [L3, L3] = [
  t('How long does implementation take?', 'Hoe lang duurt de implementatie?', 'Wie lange dauert die Einführung?'),
  t(
    'A pilot on one process typically runs 6–8 weeks, including capturing the first instructions in 1–2 days.',
    'Een pilot op één proces duurt meestal 6–8 weken, inclusief het vastleggen van de eerste instructies in 1–2 dagen.',
    'Ein Pilot an einem Prozess dauert meist 6–8 Wochen, inklusive Erfassung der ersten Anweisungen in 1–2 Tagen.',
  ),
];
const hwFaq: [L3, L3] = [
  t('Which hardware do we need?', 'Welke hardware hebben we nodig?', 'Welche Hardware brauchen wir?'),
  t(
    'Tablets and smartphones are enough to start. Smart glasses such as Apple Vision Pro or Android XR devices are optional for hands-free work.',
    'Tablets en smartphones zijn genoeg om te starten. Smart glasses zoals Apple Vision Pro of Android XR zijn optioneel voor handsfree werken.',
    'Tablets und Smartphones reichen für den Start. Datenbrillen wie Apple Vision Pro oder Android-XR-Geräte sind optional für freihändiges Arbeiten.',
  ),
];
const gdprFaq: [L3, L3] = [
  t('Is our data stored in the EU?', 'Worden onze gegevens in de EU opgeslagen?', 'Werden unsere Daten in der EU gespeichert?'),
  t(
    'Yes. Data is hosted in the EU and processed in line with the GDPR. [Details on certifications to be confirmed]',
    'Ja. Gegevens worden in de EU gehost en verwerkt volgens de AVG. [Details over certificeringen te bevestigen]',
    'Ja. Daten werden in der EU gehostet und DSGVO-konform verarbeitet. [Details zu Zertifizierungen zu bestätigen]',
  ),
];
const integrationFaq: [L3, L3] = [
  t('Does it integrate with SAP, MES or our LMS?', 'Koppelt het met SAP, MES of ons LMS?', 'Lässt es sich mit SAP, MES oder unserem LMS verbinden?'),
  t(
    'Yes, via standard interfaces and SSO. [List of integrations to be supplied]',
    'Ja, via standaardkoppelingen en SSO. [Lijst met integraties volgt]',
    'Ja, über Standardschnittstellen und SSO. [Liste der Integrationen folgt]',
  ),
];

/* ---------- Per-type defaults ---------- */

const titleTail: Record<string, L3> = {
  hub: t('overview', 'overzicht', 'Übersicht'),
  solution: t('software & guide', 'software en uitleg', 'Software & Leitfaden'),
  platform: t('ActARion platform', 'ActARion-platform', 'ActARion-Plattform'),
  useCase: t('AI & AR work instructions', 'werkinstructies met AI en AR', 'KI- & AR-Arbeitsanweisungen'),
  industry: t('digital work instructions', 'digitale werkinstructies', 'digitale Arbeitsanweisungen'),
  hardware: t('for work instructions', 'voor werkinstructies', 'für Arbeitsanweisungen'),
  template: t('free download', 'gratis download', 'kostenloser Download'),
  guide: t('guide with examples', 'gids met voorbeelden', 'Leitfaden mit Beispielen'),
  comparison: t('comparison', 'vergelijking', 'Vergleich'),
  caseStudy: t('customer story', 'klantverhaal', 'Kundengeschichte'),
  partner: t('partner of ActARion', 'partner van ActARion', 'Partner von ActARion'),
  whitepaper: t('whitepaper', 'whitepaper', 'Whitepaper'),
  report: t('research report', 'onderzoeksrapport', 'Studie'),
  media: t('news and updates', 'nieuws en updates', 'Neuigkeiten'),
};

export function defaultsFor(key: RouteKey, l: Locale): PageContent {
  const r = routes[key];
  const label = r.labels[l];
  const x = lc(label, l);
  const kw = r.keyword?.split('|')[{ en: 0, nl: 1, de: 2 }[l]]?.trim() || r.keyword?.split('|')[0]?.trim();
  const base: PageContent = {
    metaTitle: titleTail[r.type] ? `${label}: ${titleTail[r.type][l]} | ActARion` : `${label} | ActARion`,
    metaDescription: '',
    label,
    h1: label,
    lead: '',
    updated: UPDATED,
    placeholder: true,
  };

  switch (r.type) {
    case 'home':
      return { ...base, metaTitle: 'ActARion | AI & AR work instructions', metaDescription: 'ActARion: AI and AR-guided work instructions for frontline teams.', h1: 'ActARion', lead: '' };

    case 'hub':
    case 'resourcesHub':
    case 'glossaryHub': {
      const kids = childrenOf(key).map((k) => routes[k].labels[l]);
      const list = kids.slice(0, 3).join(', ');
      return {
        ...base,
        metaDescription: {
          en: `${label} from ActARion: ${list} and more. Practical, up to date and in English, Dutch and German.`,
          nl: `${label} van ActARion: ${list} en meer. Praktisch, actueel en in het Nederlands, Engels en Duits.`,
          de: `${label} von ActARion: ${list} und mehr. Praxisnah, aktuell und auf Deutsch, Englisch und Niederländisch.`,
        }[l],
        eyebrow: label,
        lead: {
          en: `Everything about ${x} in one place. Choose a topic below.`,
          nl: `Alles over ${x} op één plek. Kies hieronder een onderwerp.`,
          de: `Alles zu ${x} an einem Ort. Wählen Sie unten ein Thema.`,
        }[l],
        answer: tbd(l, { en: `40–60 word introduction to ${x}`, nl: `introductie van 40–60 woorden over ${x}`, de: `Einleitung mit 40–60 Wörtern zu ${x}` }[l]),
      };
    }

    case 'solution':
      return {
        ...base,
        metaDescription: {
          en: `${label} with AI and AR: what it is, how it works, benefits, use cases and FAQ. Book a free intake with ActARion.`,
          nl: `${label} met AI en AR: wat het is, hoe het werkt, voordelen, toepassingen en FAQ. Plan een kosteloze intake met ActARion.`,
          de: `${label} mit KI und AR: was es ist, wie es funktioniert, Vorteile, Anwendungen und FAQ. Kostenloses Erstgespräch mit ActARion.`,
        }[l],
        eyebrow: t('Solution', 'Oplossing', 'Lösung')[l],
        lead: {
          en: `${label} that operators actually use: created with AI, followed on any device, always up to date.`,
          nl: `${label} die operators echt gebruiken: gemaakt met AI, gevolgd op elk device, altijd actueel.`,
          de: `${label}, die Werker wirklich nutzen: mit KI erstellt, auf jedem Gerät befolgt, immer aktuell.`,
        }[l],
        answer: tbd(l, { en: `answer block, 40–60 words, defining ${x} (keyword: ${kw})`, nl: `antwoordblok van 40–60 woorden met definitie van ${x} (zoekwoord: ${kw})`, de: `Antwortblock mit 40–60 Wörtern, Definition von ${x} (Keyword: ${kw})` }[l]),
        heroImage: t('Operator following a step-by-step instruction on a tablet', 'Operator volgt een stap-voor-stapinstructie op een tablet', 'Werker folgt einer Schritt-für-Schritt-Anleitung auf dem Tablet')[l],
        sections: solutionSections(l, label),
        faq: faqs(l, [
          [t(`What is ${x}?`, `Wat is ${x}?`, `Was ist ${x}?`), t(TBD.en, TBD.nl, TBD.de)],
          priceFaq,
          implFaq,
          hwFaq,
          integrationFaq,
          gdprFaq,
          [t('Can we import existing SOPs?', 'Kunnen we bestaande SOP’s importeren?', 'Können wir bestehende SOPs importieren?'), t('Yes. Word and PDF procedures are converted into steps with AI.', 'Ja. Word- en PDF-procedures worden met AI omgezet in stappen.', 'Ja. Word- und PDF-Verfahren werden mit KI in Schritte umgewandelt.')],
          [t('Which languages are supported?', 'Welke talen worden ondersteund?', 'Welche Sprachen werden unterstützt?'), t('English, Dutch and German, plus more on request.', 'Nederlands, Engels en Duits, andere talen op aanvraag.', 'Deutsch, Englisch und Niederländisch, weitere auf Anfrage.')],
        ]),
        related: ['tplWorkInstruction', 'tplSop', 'roiCalculator'],
      };

    case 'platform':
      return {
        ...base,
        metaTitle: key === 'platform' ? t('Work instruction platform with AI & AR | ActARion', 'Werkinstructieplatform met AI en AR | ActARion', 'Plattform für Arbeitsanweisungen mit KI & AR | ActARion')[l] : base.metaTitle,
        h1: key === 'platform' ? t('One platform for work instructions, AI and AR', 'Eén platform voor werkinstructies, AI en AR', 'Eine Plattform für Arbeitsanweisungen, KI und AR')[l] : label,
        metaDescription: {
          en: `${label} in the ActARion platform: what it does, how it works, benefits per role, integrations and FAQ.`,
          nl: `${label} in het ActARion-platform: wat het doet, hoe het werkt, voordelen per rol, integraties en FAQ.`,
          de: `${label} in der ActARion-Plattform: Funktionen, Ablauf, Vorteile je Rolle, Integrationen und FAQ.`,
        }[l],
        eyebrow: t('Platform', 'Platform', 'Plattform')[l],
        lead: tbd(l, t('one-sentence summary of the function', 'samenvatting van de functie in één zin', 'Zusammenfassung der Funktion in einem Satz')[l]),
        answer: tbd(l, t('answer block, 40–60 words', 'antwoordblok van 40–60 woorden', 'Antwortblock mit 40–60 Wörtern')[l]),
        sections: [
          { kind: 'image', alt: t(`Screenshot: ${label}`, `Screenshot: ${label}`, `Screenshot: ${label}`)[l], ratio: '16/9', caption: t('Screenshot or video with transcript to be supplied', 'Screenshot of video met transcript volgt', 'Screenshot oder Video mit Transkript folgt')[l] },
          { kind: 'text', h2: t('What it does', 'Wat het doet', 'Was es leistet')[l], body: [TBD[l]] },
          { kind: 'steps', h2: t('How it works', 'Hoe het werkt', 'So funktioniert es')[l], steps: [1, 2, 3].map((n) => ({ title: `${t('Step', 'Stap', 'Schritt')[l]} ${n}`, text: TBD[l] })) },
          {
            kind: 'features',
            h2: t('Benefits per role', 'Voordelen per rol', 'Vorteile je Rolle')[l],
            items: [t('Operator', 'Operator', 'Werker'), t('Team lead', 'Teamleider', 'Schichtleiter'), t('Quality & EHS', 'Kwaliteit en VGM', 'Qualität & Arbeitssicherheit'), t('IT', 'IT', 'IT')].map((r) => ({ title: r[l], text: TBD[l] })),
          },
          ...(key === 'platform' ? [{ kind: 'links' as const, h2: t('Platform functions', 'Functies van het platform', 'Funktionen der Plattform')[l], keys: childrenOf('platform') }] : []),
        ],
        faq: faqs(l, [integrationFaq, gdprFaq, hwFaq]),
        related: ['solDwi', 'demo'],
      };

    case 'useCase':
      return {
        ...base,
        metaDescription: {
          en: `${label} with AI and AR-guided work instructions: the problem, the workflow, measurable results and how to start a pilot.`,
          nl: `${label} met werkinstructies met AI en AR: het probleem, de werkwijze, meetbare resultaten en hoe je een pilot start.`,
          de: `${label} mit KI- und AR-gestützten Arbeitsanweisungen: Problem, Ablauf, messbare Ergebnisse und Start eines Pilotprojekts.`,
        }[l],
        eyebrow: t('Use case', 'Toepassing', 'Anwendungsfall')[l],
        lead: tbd(l, t('one-sentence promise with the main KPI', 'belofte in één zin met de belangrijkste KPI', 'Nutzenversprechen in einem Satz mit der wichtigsten KPI')[l]),
        answer: tbd(l, { en: `answer block, 40–60 words (keyword: ${kw})`, nl: `antwoordblok van 40–60 woorden (zoekwoord: ${kw})`, de: `Antwortblock mit 40–60 Wörtern (Keyword: ${kw})` }[l]),
        kpi: tbd(l, 'KPI'),
        heroImage: t(`Photo: ${label} on the shop floor`, `Foto: ${x} op de werkvloer`, `Foto: ${label} in der Produktion`)[l],
        sections: [
          { kind: 'features', h2: t('The problem', 'Het probleem', 'Das Problem')[l], items: [1, 2, 3].map(() => ({ title: tbd(l, 'KPI'), text: TBD[l] })) },
          { kind: 'steps', h2: t('The workflow, step by step', 'De werkwijze, stap voor stap', 'Der Ablauf, Schritt für Schritt')[l], steps: [1, 2, 3, 4].map((n) => ({ title: `${t('Step', 'Stap', 'Schritt')[l]} ${n}`, text: TBD[l] })) },
          { kind: 'image', alt: t(`Workflow: ${label}`, `Werkwijze: ${x}`, `Ablauf: ${label}`)[l], ratio: '16/9' },
          { kind: 'kpis', h2: t('Measurable results', 'Meetbare resultaten', 'Messbare Ergebnisse')[l], rows: [1, 2, 3].map(() => ({ k: tbd(l, 'KPI'), before: '[xx]', after: '[xx]' })), note: t('Figures with source and date to be supplied', 'Cijfers met bron en datum volgen', 'Zahlen mit Quelle und Datum folgen')[l] },
          { kind: 'checklist', h2: t('Hardware needed', 'Benodigde hardware', 'Benötigte Hardware')[l], items: [t('Tablet or smartphone', 'Tablet of smartphone', 'Tablet oder Smartphone')[l], t('Optional: smart glasses', 'Optioneel: smart glasses', 'Optional: Datenbrille')[l]] },
          { kind: 'links', h2: t('Start with a pilot', 'Begin met een pilot', 'Mit einem Pilotprojekt starten')[l], keys: ['pilot', 'fitCheck', 'roiCalculator'] },
        ],
        faq: faqs(l, [implFaq, hwFaq, priceFaq]),
        related: ['solDwi', 'templates', 'customers'],
      };

    case 'industry':
      return {
        ...base,
        metaDescription: {
          en: `Digital work instructions for ${x}: sector challenges, regulations, relevant use cases and results. Book a free intake.`,
          nl: `Digitale werkinstructies voor ${x}: uitdagingen, regelgeving, relevante toepassingen en resultaten. Plan een kosteloze intake.`,
          de: `Digitale Arbeitsanweisungen für ${label}: Herausforderungen, Vorschriften, Anwendungsfälle und Ergebnisse. Kostenloses Erstgespräch.`,
        }[l],
        h1: t(`Digital work instructions for ${x}`, `Digitale werkinstructies voor ${x}`, `Digitale Arbeitsanweisungen für ${label}`)[l],
        eyebrow: t('Industry', 'Sector', 'Branche')[l],
        lead: tbd(l, kw || ''),
        answer: tbd(l, t('answer block, 40–60 words', 'antwoordblok van 40–60 woorden', 'Antwortblock mit 40–60 Wörtern')[l]),
        kpi: label,
        heroImage: t(`Photo: ${label}`, `Foto: ${x}`, `Foto: ${label}`)[l],
        sections: [
          { kind: 'features', h2: t('Challenges in this sector', 'Uitdagingen in deze sector', 'Herausforderungen der Branche')[l], items: [1, 2, 3].map(() => ({ title: TBD[l], text: TBD[l] })) },
          { kind: 'checklist', h2: t('Regulations', 'Regelgeving', 'Vorschriften')[l], items: [tbd(l, 'GMP / ISO / Machinery Regulation')] },
          { kind: 'links', h2: t('Relevant use cases', 'Relevante toepassingen', 'Relevante Anwendungsfälle')[l], keys: ['ucChangeover', 'ucOnboarding', 'ucMaintenance'] },
          { kind: 'kpis', h2: t('Sector figures', 'Sectorcijfers', 'Branchenzahlen')[l], rows: [1, 2].map(() => ({ k: tbd(l, 'KPI'), before: '[xx]', after: '[xx]' })) },
        ],
        faq: faqs(l, [priceFaq, implFaq, gdprFaq]),
        related: ['customers', 'solDwi', 'pilot'],
      };

    case 'hardware':
      return {
        ...base,
        metaTitle: key === 'hardware' ? t('AR hardware: choosing smart glasses or tablets | ActARion', 'AR-hardware: smart glasses of tablet kiezen | ActARion', 'AR-Hardware: Datenbrille oder Tablet wählen | ActARion')[l] : base.metaTitle,
        h1: key === 'hardware' ? t('Choosing AR hardware for the shop floor', 'AR-hardware kiezen voor de werkvloer', 'AR-Hardware für die Produktion wählen')[l] : label,
        metaDescription: {
          en: `${label} for AR work instructions on the shop floor: when it fits, pros and cons, and how ActARion supports it.`,
          nl: `${label} voor AR-werkinstructies op de werkvloer: wanneer het past, voor- en nadelen en hoe ActARion het ondersteunt.`,
          de: `${label} für AR-Arbeitsanweisungen in der Produktion: Einsatz, Vor- und Nachteile und Unterstützung durch ActARion.`,
        }[l],
        eyebrow: t('Hardware', 'Hardware', 'Hardware')[l],
        lead: tbd(l, kw || ''),
        answer: tbd(l, t('answer block, 40–60 words', 'antwoordblok van 40–60 woorden', 'Antwortblock mit 40–60 Wörtern')[l]),
        sections: [
          { kind: 'image', alt: label, ratio: '16/9' },
          ...(key === 'hardware'
            ? [{ kind: 'links' as const, h2: t('Devices', 'Devices', 'Geräte')[l], keys: childrenOf('hardware') }]
            : [
                { kind: 'table' as const, h2: t('Pros and cons', 'Voor- en nadelen', 'Vor- und Nachteile')[l], head: [t('Criterion', 'Criterium', 'Kriterium')[l], label], rows: [[t('Hands-free', 'Handsfree', 'Freihändig')[l], '[…]'], [t('Battery life', 'Accuduur', 'Akkulaufzeit')[l], '[…]'], [t('Price range', 'Prijsklasse', 'Preisklasse')[l], '[…]']] },
                { kind: 'text' as const, h2: t('When it fits', 'Wanneer het past', 'Wann es passt')[l], body: [TBD[l]] },
              ]),
        ],
        faq: faqs(l, [hwFaq]),
        related: ['cmpGlassesTablets', 'pfAr'],
      };

    case 'template':
      return {
        ...base,
        metaDescription: {
          en: `Free ${x} (${kw}): preview, how to fill it in, a worked example and a free download. By ActARion.`,
          nl: `Gratis ${x} (${kw}): preview, invulinstructie, ingevuld voorbeeld en gratis download. Door ActARion.`,
          de: `Kostenlose ${label} (${kw}): Vorschau, Ausfüllhilfe, ausgefülltes Beispiel und kostenloser Download. Von ActARion.`,
        }[l],
        h1: t(`Free ${x}`, `Gratis ${x}`, `Kostenlose ${label}`)[l],
        eyebrow: t('Template', 'Template', 'Vorlage')[l],
        lead: t(`Ready to use: preview it below, then download it for free (${kw}).`, `Direct te gebruiken: bekijk de preview en download gratis (${kw}).`, `Sofort einsetzbar: Vorschau ansehen und kostenlos herunterladen (${kw}).`)[l],
        answer: tbd(l, t('what it is and when to use it, 40–60 words', 'wat het is en wanneer je het gebruikt, 40–60 woorden', 'was es ist und wann man es nutzt, 40–60 Wörter')[l]),
        kpi: kw,
        sections: [
          { kind: 'table', h2: t('Preview', 'Preview', 'Vorschau')[l], head: ['#', t('Section', 'Onderdeel', 'Abschnitt')[l], t('What to fill in', 'Wat vul je in', 'Was eintragen')[l]], rows: [1, 2, 3, 4, 5].map((n) => [String(n), '[…]', TBD[l]]) },
          { kind: 'steps', h2: t('How to fill it in', 'Zo vul je het in', 'So füllen Sie es aus')[l], steps: [1, 2, 3].map((n) => ({ title: `${t('Section', 'Onderdeel', 'Abschnitt')[l]} ${n}`, text: TBD[l] })) },
          { kind: 'text', h2: t('Worked example', 'Ingevuld voorbeeld', 'Ausgefülltes Beispiel')[l], body: [TBD[l]] },
          { kind: 'links', h2: t('Make it digital with ActARion', 'Maak het digitaal met ActARion', 'Mit ActARion digitalisieren')[l], keys: ['solDwi', 'demo'] },
        ],
        faq: faqs(l, [[t('Is the template free?', 'Is de template gratis?', 'Ist die Vorlage kostenlos?'), t('Yes, free to use and adapt.', 'Ja, gratis te gebruiken en aan te passen.', 'Ja, kostenlos nutzbar und anpassbar.')]]),
        related: ['templates', 'solDwi'],
      };

    case 'guide':
      return {
        ...base,
        metaDescription: {
          en: `${label}: a practical guide with definitions, steps, examples and FAQ for manufacturing and maintenance teams.`,
          nl: `${label}: praktische gids met definities, stappen, voorbeelden en FAQ voor productie- en onderhoudsteams.`,
          de: `${label}: praktischer Leitfaden mit Definitionen, Schritten, Beispielen und FAQ für Produktion und Instandhaltung.`,
        }[l],
        eyebrow: t('Guide', 'Gids', 'Leitfaden')[l],
        lead: tbd(l, t('one-sentence summary', 'samenvatting in één zin', 'Zusammenfassung in einem Satz')[l]),
        answer: tbd(l, t('answer block, 40–60 words', 'antwoordblok van 40–60 woorden', 'Antwortblock mit 40–60 Wörtern')[l]),
        sections: [
          { kind: 'text', h2: t(`What is ${x}?`, `Wat is ${x}?`, `Was ist ${x}?`)[l].replace('??', '?'), body: [TBD[l]] },
          { kind: 'steps', h2: t('Step by step', 'Stap voor stap', 'Schritt für Schritt')[l], steps: [1, 2, 3, 4, 5].map((n) => ({ title: `${t('Step', 'Stap', 'Schritt')[l]} ${n}`, text: TBD[l] })) },
          { kind: 'table', h2: t('Overview', 'Overzicht', 'Übersicht')[l], head: [t('Aspect', 'Aspect', 'Aspekt')[l], t('Explanation', 'Uitleg', 'Erklärung')[l]], rows: [['[…]', TBD[l]], ['[…]', TBD[l]]] },
          { kind: 'text', h2: t('Example from practice', 'Voorbeeld uit de praktijk', 'Beispiel aus der Praxis')[l], body: [TBD[l]] },
        ],
        faq: faqs(l, [[t('Question', 'Vraag', 'Frage'), TBD]]),
        related: ['solDwi', 'templates'],
      };

    case 'comparison':
      return {
        ...base,
        metaDescription: {
          en: `${label}: an honest comparison on cost, usability, compliance and fit, with a clear conclusion and FAQ.`,
          nl: `${label}: eerlijke vergelijking op kosten, gebruiksgemak, compliance en geschiktheid, met conclusie en FAQ.`,
          de: `${label}: ehrlicher Vergleich zu Kosten, Bedienbarkeit, Compliance und Eignung, mit Fazit und FAQ.`,
        }[l],
        eyebrow: t('Comparison', 'Vergelijking', 'Vergleich')[l],
        lead: tbd(l, t('conclusion first', 'conclusie bovenaan', 'Fazit zuerst')[l]),
        answer: tbd(l, t('conclusion, 40–60 words', 'conclusie van 40–60 woorden', 'Fazit mit 40–60 Wörtern')[l]),
        sections: [
          { kind: 'table', h2: t('Side by side', 'Naast elkaar', 'Im direkten Vergleich')[l], head: [t('Criterion', 'Criterium', 'Kriterium')[l], 'A', 'B'], rows: [1, 2, 3, 4, 5].map(() => ['[…]', '[…]', '[…]']) },
          { kind: 'text', h2: t('Per criterion', 'Per criterium', 'Je Kriterium')[l], body: [TBD[l]] },
          { kind: 'text', h2: t('When to choose what', 'Wanneer kies je wat', 'Wann was wählen')[l], body: [TBD[l]] },
        ],
        faq: faqs(l, [[t('Question', 'Vraag', 'Frage'), TBD]]),
        related: ['solDwi', 'demo'],
      };

    case 'glossaryTerm':
      return {
        ...base,
        metaTitle: t(`What is ${label}? Definition & example | ActARion`, `Wat is ${label}? Betekenis en voorbeeld | ActARion`, `Was ist ${label}? Definition & Beispiel | ActARion`)[l],
        metaDescription: {
          en: `${label} explained: a short definition, an example from manufacturing, and related terms. ActARion glossary.`,
          nl: `${label} uitgelegd: korte definitie, voorbeeld uit de productie en verwante begrippen. Begrippenlijst van ActARion.`,
          de: `${label} erklärt: kurze Definition, Beispiel aus der Produktion und verwandte Begriffe. Glossar von ActARion.`,
        }[l],
        h1: t(`What is ${label}?`, `Wat is ${label}?`, `Was ist ${label}?`)[l],
        eyebrow: t('Glossary', 'Begrippen', 'Glossar')[l],
        lead: t(`${label}, explained in plain language.`, `${label}, uitgelegd in gewone taal.`, `${label}, verständlich erklärt.`)[l],
        definition: tbd(l, t('definition in 1–2 sentences', 'definitie in 1–2 zinnen', 'Definition in 1–2 Sätzen')[l]),
        sections: [
          { kind: 'text', h2: t('Explanation', 'Uitleg', 'Erklärung')[l], body: [tbd(l, '150–400')] },
          { kind: 'text', h2: t('Example', 'Voorbeeld', 'Beispiel')[l], body: [TBD[l]] },
        ],
        related: ['glossary', 'solDwi'],
      };

    case 'caseStudy':
      return {
        ...base,
        metaDescription: {
          en: `Customer story: how a ${x} improved frontline work with AI and AR-guided instructions. Results, approach and KPIs.`,
          nl: `Klantverhaal: hoe een ${x} het werk op de vloer verbeterde met werkinstructies met AI en AR. Resultaten en aanpak.`,
          de: `Kundengeschichte: wie ein ${label} die Arbeit mit KI- und AR-gestützten Anweisungen verbesserte. Ergebnisse und Vorgehen.`,
        }[l],
        eyebrow: t('Customer story · anonymised', 'Klantverhaal · geanonimiseerd', 'Kundengeschichte · anonymisiert')[l],
        lead: t('In collaboration with DeepSight. [Summary to be supplied]', 'In samenwerking met DeepSight. [Samenvatting volgt]', 'In Zusammenarbeit mit DeepSight. [Zusammenfassung folgt]')[l],
        answer: tbd(l, t('summary with the 3 main results', 'samenvatting met de 3 belangrijkste resultaten', 'Zusammenfassung mit den 3 wichtigsten Ergebnissen')[l]),
        kpi: t('Customer story', 'Klantverhaal', 'Kundengeschichte')[l],
        sections: [
          { kind: 'kpis', h2: t('Results', 'Resultaten', 'Ergebnisse')[l], rows: [1, 2, 3].map(() => ({ k: tbd(l, 'KPI'), before: '[xx]', after: '[xx]' })), note: t('Figures only as published, with source', 'Cijfers alleen zoals gepubliceerd, met bron', 'Zahlen nur wie veröffentlicht, mit Quelle')[l] },
          { kind: 'text', h2: t('The starting point', 'De uitgangssituatie', 'Die Ausgangslage')[l], body: [TBD[l]] },
          { kind: 'text', h2: t('The approach', 'De aanpak', 'Das Vorgehen')[l], body: [TBD[l]] },
          { kind: 'text', h2: t('In their words', 'In hun woorden', 'In ihren Worten')[l], body: [tbd(l, 'quote')] },
        ],
        related: ['pilot', 'roiCalculator'],
      };

    case 'partner':
      return {
        ...base,
        metaDescription: {
          en: `${label} and ActARion: how the partnership works, what it means for customers in Europe, and how to get started.`,
          nl: `${label} en ActARion: hoe de samenwerking werkt, wat het betekent voor klanten in Europa en hoe je start.`,
          de: `${label} und ActARion: wie die Partnerschaft funktioniert, was sie für Kunden in Europa bedeutet und wie Sie starten.`,
        }[l],
        eyebrow: t('Partner', 'Partner', 'Partner')[l],
        lead: tbd(l, t('partner description', 'beschrijving partner', 'Beschreibung des Partners')[l]),
        sections: [
          { kind: 'image', alt: t(`${label} logo`, `Logo ${label}`, `Logo ${label}`)[l], ratio: '3/1' },
          { kind: 'text', h2: t('About the partnership', 'Over de samenwerking', 'Über die Partnerschaft')[l], body: [TBD[l]] },
        ],
        related: ['partners', 'partnerBecome'],
      };

    case 'whitepaper':
    case 'report':
      return {
        ...base,
        metaDescription: {
          en: `${label}: a summary of the key findings in HTML, plus the full PDF to download for free. By ActARion.`,
          nl: `${label}: samenvatting van de belangrijkste inzichten in HTML, plus de volledige PDF gratis te downloaden.`,
          de: `${label}: Zusammenfassung der wichtigsten Erkenntnisse in HTML, plus das vollständige PDF kostenlos zum Download.`,
        }[l],
        eyebrow: titleTail[r.type][l],
        lead: tbd(l, t('summary', 'samenvatting', 'Zusammenfassung')[l]),
        answer: tbd(l, t('key findings in 40–60 words', 'belangrijkste inzichten in 40–60 woorden', 'wichtigste Erkenntnisse in 40–60 Wörtern')[l]),
        sections: [{ kind: 'checklist', h2: t('Key findings', 'Belangrijkste inzichten', 'Wichtigste Erkenntnisse')[l], items: [1, 2, 3].map(() => TBD[l]) }],
      };

    case 'media':
      return {
        ...base,
        metaDescription: {
          en: `${label} from ActARion: the latest updates on AI and AR-guided work instructions for frontline teams in Europe.`,
          nl: `${label} van ActARion: het laatste over werkinstructies met AI en AR voor teams op de werkvloer in Europa.`,
          de: `${label} von ActARion: Neuigkeiten zu KI- und AR-gestützten Arbeitsanweisungen für Teams in der Produktion.`,
        }[l],
        eyebrow: label,
        lead: tbd(l, t('items to be added', 'items worden toegevoegd', 'Einträge folgen')[l]),
        sections: [{ kind: 'text', h2: t('Latest', 'Laatste', 'Aktuell')[l], body: [TBD[l]] }],
      };

    case 'roi':
      return { ...base, metaDescription: '', lead: '' };

    case 'pilot':
    case 'fitCheck':
    case 'demo':
    case 'contact':
      return {
        ...base,
        metaTitle: `${label} | ActARion`,
        metaDescription: {
          en: `${label}: talk to ActARion about AI and AR-guided work instructions. We reply within one working day.`,
          nl: `${label}: praat met ActARion over werkinstructies met AI en AR. We reageren binnen één werkdag.`,
          de: `${label}: Sprechen Sie mit ActARion über KI- und AR-gestützte Arbeitsanweisungen. Antwort innerhalb eines Werktags.`,
        }[l],
        eyebrow: label,
        lead: t('A free intake, no obligation.', 'Een kosteloze intake, vrijblijvend.', 'Ein kostenloses, unverbindliches Erstgespräch.')[l],
        placeholder: r.type === 'contact',
      };

    case 'company':
    case 'team':
    case 'careers':
      return {
        ...base,
        metaTitle: `${label} | ActARion`,
        metaDescription: {
          en: `${label}: ActARion helps industrial teams in Europe work safer and faster with AI and AR-guided instructions.`,
          nl: `${label}: ActARion helpt industriële teams in Europa veiliger en sneller te werken met instructies met AI en AR.`,
          de: `${label}: ActARion hilft Industrieteams in Europa, mit KI- und AR-Anweisungen sicherer und schneller zu arbeiten.`,
        }[l],
        eyebrow: t('Company', 'Over ons', 'Unternehmen')[l],
        lead: tbd(l, label),
        sections: [{ kind: 'text', h2: label, body: [TBD[l]] }],
        related: ['vision', 'team', 'careers', 'news'].filter((k) => k !== key),
      };

    case 'faq':
      return {
        ...base,
        metaTitle: t('FAQ: AI & AR work instructions | ActARion', 'Veelgestelde vragen over werkinstructies | ActARion', 'FAQ zu KI- & AR-Arbeitsanweisungen | ActARion')[l],
        metaDescription: t(
          'Answers about AI and AR-guided work instructions: cost, implementation time, hardware, integrations and data security.',
          'Antwoorden over werkinstructies met AI en AR: kosten, implementatietijd, hardware, integraties en gegevensbeveiliging.',
          'Antworten zu KI- und AR-gestützten Arbeitsanweisungen: Kosten, Einführungszeit, Hardware, Integrationen und Datensicherheit.',
        )[l],
        h1: t('Frequently asked questions', 'Veelgestelde vragen', 'Häufige Fragen')[l],
        lead: t('Short answers to the questions we hear most.', 'Korte antwoorden op de vragen die we het vaakst horen.', 'Kurze Antworten auf die häufigsten Fragen.')[l],
        faq: faqs(l, [priceFaq, implFaq, hwFaq, integrationFaq, gdprFaq]),
        placeholder: false,
      };

    case 'legal':
      return {
        ...base,
        metaTitle: `${label} | ActARion`,
        metaDescription: t(`${label} of ActARion: how we handle data, agreements and legal information for this website.`, `${label} van ActARion: hoe we omgaan met gegevens, afspraken en juridische informatie over deze website.`, `${label} von ActARion: Umgang mit Daten, Vereinbarungen und rechtliche Angaben zu dieser Website.`)[l],
        lead: tbd(l, t('legal text to be supplied by ActARion', 'juridische tekst wordt aangeleverd door ActARion', 'Rechtstext wird von ActARion geliefert')[l]),
        sections: [{ kind: 'text', h2: label, body: [TBD[l]] }],
      };

    case 'sitemap':
      return {
        ...base,
        metaTitle: t('Sitemap: all pages of actarion.com | ActARion', 'Sitemap: alle pagina’s van actarion.com | ActARion', 'Sitemap: alle Seiten von actarion.com | ActARion')[l],
        metaDescription: t('All pages of actarion.com in one overview, ordered like the menu: solutions, platform, use cases, industries and resources.', 'Alle pagina’s van actarion.com in één overzicht, geordend zoals het menu: oplossingen, platform, toepassingen en meer.', 'Alle Seiten von actarion.com in einer Übersicht, geordnet wie das Menü: Lösungen, Plattform, Anwendungsfälle und mehr.')[l],
        lead: t('Every page, ordered like the menu.', 'Alle pagina’s, geordend zoals het menu.', 'Alle Seiten, geordnet wie das Menü.')[l],
        placeholder: false,
      };
  }
  return base;
}

function solutionSections(l: Locale, label: string): Section[] {
  const x = lc(label, l);
  return [
    { kind: 'text', id: 'what', h2: t(`What is ${x}?`, `Wat is ${x}?`, `Was ist ${x}?`)[l].replace('??', '?'), body: [tbd(l, t('definition and context', 'definitie en context', 'Definition und Kontext')[l])] },
    { kind: 'features', id: 'problem', h2: t('The problem with paper and PDF', 'Het probleem met papier en pdf', 'Das Problem mit Papier und PDF')[l], items: [1, 2, 3].map(() => ({ title: TBD[l], text: TBD[l] })) },
    { kind: 'steps', id: 'how', h2: t('How ActARion solves it', 'Hoe ActARion het oplost', 'Wie ActARion es löst')[l], steps: [t('Capture', 'Vastleggen', 'Erfassen'), t('Generate with AI', 'Genereren met AI', 'Mit KI generieren'), t('Guide with AR', 'Begeleiden met AR', 'Mit AR anleiten'), t('Improve', 'Verbeteren', 'Verbessern')].map((s) => ({ title: s[l], text: TBD[l] })) },
    { kind: 'image', alt: t(`How ${x} works in ActARion`, `Zo werkt ${x} in ActARion`, `So funktioniert ${label} in ActARion`)[l], ratio: '16/9' },
    { kind: 'features', id: 'features', h2: t('Key features', 'Belangrijkste functies', 'Wichtigste Funktionen')[l], items: [1, 2, 3, 4, 5, 6].map(() => ({ title: TBD[l], text: TBD[l] })) },
    {
      kind: 'table',
      id: 'compare',
      h2: t('Paper vs digital vs digital + AR', 'Papier vs digitaal vs digitaal + AR', 'Papier vs. digital vs. digital + AR')[l],
      head: [t('Criterion', 'Criterium', 'Kriterium')[l], t('Paper / Excel / PDF', 'Papier / Excel / pdf', 'Papier / Excel / PDF')[l], t('Digital', 'Digitaal', 'Digital')[l], t('Digital + AR', 'Digitaal + AR', 'Digital + AR')[l]],
      rows: [t('Up to date', 'Actueel', 'Aktualität'), t('Visual guidance', 'Visuele begeleiding', 'Visuelle Führung'), t('Proof of execution', 'Bewijs van uitvoering', 'Ausführungsnachweis'), t('Languages', 'Talen', 'Sprachen')].map((c) => [c[l], '[…]', '[…]', '[…]']),
    },
    { kind: 'kpis', id: 'results', h2: t('Results from pilots', 'Resultaten uit pilots', 'Ergebnisse aus Pilotprojekten')[l], rows: [1, 2, 3].map(() => ({ k: tbd(l, 'KPI'), before: '[xx]', after: '[xx]' })), note: t('Figures with source and date to be supplied', 'Cijfers met bron en datum volgen', 'Zahlen mit Quelle und Datum folgen')[l] },
    { kind: 'links', id: 'use-cases', h2: t('Use cases', 'Toepassingen', 'Anwendungsfälle')[l], keys: ['ucChangeover', 'ucOnboarding', 'ucMaintenance'] },
    { kind: 'links', id: 'industries', h2: t('Industries', 'Sectoren', 'Branchen')[l], keys: ['indManufacturing', 'indPharma', 'indFood'] },
  ];
}
