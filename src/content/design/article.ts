import type { Locale } from '@/lib/locale';

type L<T> = Record<Locale, T>;

export const articleUi: L<{
  authorName: string;
  authorRole: string;
  updatedOn: string;
  readTime: string;
  onThisPage: string;
  shortAnswer: string;
  definition: string;
  faq: string;
  readMore: string;
  inlineCta: { strong: string; text: string; btn: string };
  sideHeading: string;
  bandHeading: string;
  downloadTitle: string;
}> = {
  nl: {
    authorName: 'Ortwin Verreck',
    authorRole: 'Oprichter ActARion',
    updatedOn: 'Bijgewerkt op',
    readTime: 'min lezen',
    onThisPage: 'Op deze pagina',
    shortAnswer: 'Kort antwoord',
    definition: 'Definitie',
    faq: 'Veelgestelde vragen',
    readMore: 'Verder lezen',
    inlineCta: { strong: 'Waar begint u het liefst?', text: 'Jack denkt in 30 minuten vrijblijvend met u mee.', btn: 'Plan een gesprek' },
    sideHeading: 'Uw proces als pilot? Bespreek het met een expert.',
    bandHeading: 'Klaar om uw eerste werkinstructie te digitaliseren?',
    downloadTitle: 'Template downloaden',
  },
  en: {
    authorName: 'Ortwin Verreck',
    authorRole: 'Founder, ActARion',
    updatedOn: 'Updated on',
    readTime: 'min read',
    onThisPage: 'On this page',
    shortAnswer: 'Short answer',
    definition: 'Definition',
    faq: 'Frequently asked questions',
    readMore: 'Further reading',
    inlineCta: { strong: 'Where would you like to start?', text: 'Jack will think it through with you in 30 minutes, no obligation.', btn: 'Book a call' },
    sideHeading: 'Your process as a pilot? Discuss it with an expert.',
    bandHeading: 'Ready to digitise your first work instruction?',
    downloadTitle: 'Download the template',
  },
  de: {
    authorName: 'Ortwin Verreck',
    authorRole: 'Gründer von ActARion',
    updatedOn: 'Aktualisiert am',
    readTime: 'Min. Lesezeit',
    onThisPage: 'Auf dieser Seite',
    shortAnswer: 'Kurze Antwort',
    definition: 'Definition',
    faq: 'Häufige Fragen',
    readMore: 'Weiterlesen',
    inlineCta: { strong: 'Wo möchten Sie anfangen?', text: 'Jack denkt in 30 Minuten unverbindlich mit Ihnen mit.', btn: 'Gespräch vereinbaren' },
    sideHeading: 'Ihr Prozess als Pilot? Besprechen Sie es mit einem Experten.',
    bandHeading: 'Bereit, Ihre erste Arbeitsanweisung zu digitalisieren?',
    downloadTitle: 'Vorlage herunterladen',
  },
};

export interface SmedCopy {
  title: string;
  topic: string;
  minutes: number;
  h1: string;
  updated: string;
  updatedLabel: string;
  answer: string;
  toc: [string, string, string, string];
  s1: { h2: string; intro: string; steps: [string, string][] };
  s2: { h2: string; intro: string; head: [string, string, string]; rows: [string, string, string, boolean][]; caption: string };
  cta: { strong: string; text: string; btn: string };
  s3: { h2: string; items: [string, string][] };
  faq: { q: string; a: string }[];
  related: { key: string; label: string; title: string }[];
  sideHeading: string;
  bandHeading: string;
}

/** Verbatim design copy for the SMED article (route key blogSmed). */
export const smedCopy: L<SmedCopy> = {
  nl: {
    title: 'SMED: omsteltijd verkorten in zeven stappen',
    topic: 'Onderhoud en operatie',
    minutes: 8,
    h1: 'SMED: hoe verkort u de omsteltijd in zeven stappen?',
    updated: '2026-10-28',
    updatedLabel: '28 oktober 2026',
    answer:
      'SMED (Single-Minute Exchange of Die) is een methode om de omsteltijd van een machine of lijn terug te brengen. U filmt een omstelling, scheidt de handelingen die tijdens productie kunnen (extern) van de handelingen die stilstand vragen (intern), zet zoveel mogelijk intern om naar extern en standaardiseert de rest. Digitale werkinstructies zorgen dat elke ploeg de nieuwe werkwijze ook echt volgt.',
    toc: ['De zeven stappen', 'Intern vs. extern', 'Resultaat vasthouden', 'Veelgestelde vragen'],
    s1: {
      h2: 'Welke zeven stappen doorloopt u?',
      intro: 'Werk met een klein team van operators, een technicus en een teamleider. Neem per stap één omstelling als uitgangspunt.',
      steps: [
        ['Kies de omstelling', 'Neem een omstelling die vaak voorkomt en veel stilstand kost.'],
        ['Film en meet', 'Leg een complete omstelling vast en noteer de tijd per handeling.'],
        ['Scheid intern en extern', 'Markeer welke handelingen stilstand vragen en welke niet.'],
        ['Maak intern extern', 'Zet klaarleggen, opzoeken en voorbereiden vóór de stop.'],
        ['Versnel wat intern blijft', 'Snelkoppelingen, vaste aanslagen en parallel werken.'],
        ['Standaardiseer', 'Leg de beste werkwijze vast als digitale werkinstructie.'],
        ['Meet en verbeter', 'Vergelijk elke omstelling met de nulmeting en stel bij.'],
      ],
    },
    s2: {
      h2: 'Wat is het verschil tussen interne en externe handelingen?',
      intro: 'Interne handelingen kunnen alleen als de machine stilstaat. Externe handelingen kunnen terwijl de vorige order nog loopt. Hoe meer u extern doet, hoe korter de stilstand.',
      head: ['Handeling', 'Nu', 'Na SMED'],
      rows: [
        ['Formaatdelen en gereedschap klaarzetten', 'intern', 'extern', true],
        ['Instellingen opzoeken', 'intern', 'extern (in de instructie)', true],
        ['Formaatdelen wisselen', 'intern', 'intern, met snelkoppelingen', false],
        ['Eerste product controleren', 'intern', 'intern, met vaste checkpunten', false],
      ],
      caption: 'Een voorbeeld van een indeling. Uw eigen omstelling bepaalt welke handelingen extern kunnen.',
    },
    cta: { strong: 'Welke omstelling pakt u als eerste aan?', text: 'Jack denkt in 30 minuten vrijblijvend met u mee.', btn: 'Plan een gesprek' },
    s3: {
      h2: 'Hoe houdt u de nieuwe omsteltijd vast?',
      items: [
        ['Leg elke stap vast in een digitale werkinstructie,', 'met foto of video van de juiste uitvoering.'],
        ['Maak controles verplicht:', 'een stap gaat pas door als het checkpunt is afgevinkt.'],
        ['Meet elke omstelling:', 'tijd en aanloopafkeur per ploeg, zodat afwijkingen zichtbaar worden.'],
        ['Verbeter de instructie, niet de mensen:', 'feedback van operators gaat direct in de volgende versie.'],
      ],
    },
    faq: [
      { q: 'Hoeveel omsteltijd kunt u met SMED besparen?', a: 'Dat hangt af van hoeveel handelingen nu intern zijn. Meet eerst een paar omstellingen; dan ziet u hoeveel er naar extern kan. [Benchmark uit eigen pilots toevoegen.]' },
      { q: 'Werkt SMED alleen in de maakindustrie?', a: 'Nee. Het werkt overal waar een lijn of machine stilstaat voor een wissel, ook in voedingsmiddelen, farma en verpakking.' },
      { q: 'Wat voegen digitale werkinstructies toe aan SMED?', a: 'Ze borgen de nieuwe werkwijze: elke ploeg volgt dezelfde stappen, controles zijn niet over te slaan en u meet elke omstelling.' },
    ],
    related: [
      { key: 'tplSmed', label: 'Template', title: 'SMED-omstelchecklist (Excel en pdf)' },
      { key: 'ucChangeover', label: 'Use case', title: 'Omstellen met digitale werkinstructies' },
      { key: 'roiCalculator', label: 'Tool', title: 'Bereken wat kortere omsteltijd oplevert' },
    ],
    sideHeading: 'Uw omstelling als pilot? Bespreek het met een expert.',
    bandHeading: 'Klaar om uw eerste omstelling te digitaliseren?',
  },
  en: {
    title: 'SMED: reduce changeover time in seven steps',
    topic: 'Maintenance and operations',
    minutes: 8,
    h1: 'SMED: how do you reduce changeover time in seven steps?',
    updated: '2026-10-28',
    updatedLabel: '28 October 2026',
    answer:
      'SMED (Single-Minute Exchange of Die) is a method for reducing the changeover time of a machine or line. You film a changeover, separate the tasks that can be done during production (external) from those that require downtime (internal), convert as much internal work as possible to external and standardise the rest. Digital work instructions make sure every shift actually follows the new method.',
    toc: ['The seven steps', 'Internal vs. external', 'Sustaining the result', 'Frequently asked questions'],
    s1: {
      h2: 'Which seven steps do you follow?',
      intro: 'Work with a small team of operators, a technician and a team leader. Use one changeover as the starting point for each step.',
      steps: [
        ['Choose the changeover', 'Pick a changeover that happens often and causes a lot of downtime.'],
        ['Film and measure', 'Record a complete changeover and note the time for each task.'],
        ['Separate internal and external', 'Mark which tasks require downtime and which do not.'],
        ['Make internal external', 'Move staging, looking up and preparing to before the stop.'],
        ['Speed up what stays internal', 'Quick-release couplings, fixed stops and working in parallel.'],
        ['Standardise', 'Capture the best method as a digital work instruction.'],
        ['Measure and improve', 'Compare every changeover with the baseline and adjust.'],
      ],
    },
    s2: {
      h2: 'What is the difference between internal and external tasks?',
      intro: 'Internal tasks can only be done when the machine is stopped. External tasks can be done while the previous order is still running. The more you do externally, the shorter the downtime.',
      head: ['Task', 'Now', 'After SMED'],
      rows: [
        ['Staging format parts and tools', 'internal', 'external', true],
        ['Looking up settings', 'internal', 'external (in the instruction)', true],
        ['Changing format parts', 'internal', 'internal, with quick-release couplings', false],
        ['Checking the first product', 'internal', 'internal, with fixed checkpoints', false],
      ],
      caption: 'An example breakdown. Your own changeover determines which tasks can be external.',
    },
    cta: { strong: 'Which changeover will you tackle first?', text: 'Jack will think it through with you in 30 minutes, no obligation.', btn: 'Book a call' },
    s3: {
      h2: 'How do you sustain the new changeover time?',
      items: [
        ['Capture every step in a digital work instruction,', 'with a photo or video of the correct execution.'],
        ['Make checks mandatory:', 'a step only proceeds once the checkpoint is ticked off.'],
        ['Measure every changeover:', 'time and start-up scrap per shift, so deviations become visible.'],
        ['Improve the instruction, not the people:', 'operator feedback goes straight into the next version.'],
      ],
    },
    faq: [
      { q: 'How much changeover time can SMED save?', a: 'That depends on how many tasks are internal today. Measure a few changeovers first; then you will see how much can move to external. [Add benchmark from our own pilots.]' },
      { q: 'Does SMED only work in discrete manufacturing?', a: 'No. It works wherever a line or machine stops for a changeover, including food, pharma and packaging.' },
      { q: 'What do digital work instructions add to SMED?', a: 'They secure the new method: every shift follows the same steps, checks cannot be skipped and you measure every changeover.' },
    ],
    related: [
      { key: 'tplSmed', label: 'Template', title: 'SMED changeover checklist (Excel and PDF)' },
      { key: 'ucChangeover', label: 'Use case', title: 'Changeovers with digital work instructions' },
      { key: 'roiCalculator', label: 'Tool', title: 'Calculate what shorter changeovers deliver' },
    ],
    sideHeading: 'Your changeover as a pilot? Discuss it with an expert.',
    bandHeading: 'Ready to digitise your first changeover?',
  },
  de: {
    title: 'SMED: Rüstzeit in sieben Schritten verkürzen',
    topic: 'Instandhaltung und Betrieb',
    minutes: 8,
    h1: 'SMED: Wie verkürzen Sie die Rüstzeit in sieben Schritten?',
    updated: '2026-10-28',
    updatedLabel: '28. Oktober 2026',
    answer:
      'SMED (Single-Minute Exchange of Die) ist eine Methode, um die Rüstzeit einer Maschine oder Linie zu senken. Sie filmen einen Rüstvorgang, trennen die Tätigkeiten, die während der Produktion möglich sind (extern), von denen, die einen Stillstand erfordern (intern), verlagern so viel internes wie möglich nach extern und standardisieren den Rest. Digitale Arbeitsanweisungen sorgen dafür, dass jede Schicht die neue Arbeitsweise auch wirklich einhält.',
    toc: ['Die sieben Schritte', 'Intern vs. extern', 'Ergebnis sichern', 'Häufige Fragen'],
    s1: {
      h2: 'Welche sieben Schritte durchlaufen Sie?',
      intro: 'Arbeiten Sie mit einem kleinen Team aus Bedienern, einem Techniker und einer Schichtleitung. Nehmen Sie pro Schritt einen Rüstvorgang als Ausgangspunkt.',
      steps: [
        ['Rüstvorgang auswählen', 'Wählen Sie einen Rüstvorgang, der häufig vorkommt und viel Stillstand kostet.'],
        ['Filmen und messen', 'Zeichnen Sie einen kompletten Rüstvorgang auf und notieren Sie die Zeit pro Tätigkeit.'],
        ['Intern und extern trennen', 'Markieren Sie, welche Tätigkeiten einen Stillstand erfordern und welche nicht.'],
        ['Internes extern machen', 'Bereitlegen, Nachschlagen und Vorbereiten vor den Stopp verlagern.'],
        ['Beschleunigen, was intern bleibt', 'Schnellkupplungen, feste Anschläge und paralleles Arbeiten.'],
        ['Standardisieren', 'Halten Sie die beste Arbeitsweise als digitale Arbeitsanweisung fest.'],
        ['Messen und verbessern', 'Vergleichen Sie jeden Rüstvorgang mit der Nullmessung und justieren Sie nach.'],
      ],
    },
    s2: {
      h2: 'Was ist der Unterschied zwischen internen und externen Tätigkeiten?',
      intro: 'Interne Tätigkeiten sind nur bei stehender Maschine möglich. Externe Tätigkeiten lassen sich erledigen, während der vorige Auftrag noch läuft. Je mehr Sie extern erledigen, desto kürzer der Stillstand.',
      head: ['Tätigkeit', 'Heute', 'Nach SMED'],
      rows: [
        ['Formatteile und Werkzeug bereitlegen', 'intern', 'extern', true],
        ['Einstellwerte nachschlagen', 'intern', 'extern (in der Anweisung)', true],
        ['Formatteile wechseln', 'intern', 'intern, mit Schnellkupplungen', false],
        ['Erstes Produkt prüfen', 'intern', 'intern, mit festen Prüfpunkten', false],
      ],
      caption: 'Ein Beispiel für eine Einteilung. Ihr eigener Rüstvorgang bestimmt, welche Tätigkeiten extern möglich sind.',
    },
    cta: { strong: 'Welchen Rüstvorgang gehen Sie zuerst an?', text: 'Jack denkt in 30 Minuten unverbindlich mit Ihnen mit.', btn: 'Gespräch vereinbaren' },
    s3: {
      h2: 'Wie halten Sie die neue Rüstzeit?',
      items: [
        ['Erfassen Sie jeden Schritt in einer digitalen Arbeitsanweisung,', 'mit Foto oder Video der richtigen Ausführung.'],
        ['Machen Sie Prüfungen verpflichtend:', 'Ein Schritt geht erst weiter, wenn der Prüfpunkt abgehakt ist.'],
        ['Messen Sie jeden Rüstvorgang:', 'Zeit und Anlaufausschuss pro Schicht, damit Abweichungen sichtbar werden.'],
        ['Verbessern Sie die Anweisung, nicht die Menschen:', 'Feedback der Bediener fließt direkt in die nächste Version.'],
      ],
    },
    faq: [
      { q: 'Wie viel Rüstzeit lässt sich mit SMED einsparen?', a: 'Das hängt davon ab, wie viele Tätigkeiten heute intern sind. Messen Sie zuerst einige Rüstvorgänge; dann sehen Sie, wie viel nach extern verlagert werden kann. [Benchmark aus eigenen Piloten ergänzen.]' },
      { q: 'Funktioniert SMED nur in der Fertigungsindustrie?', a: 'Nein. Es funktioniert überall, wo eine Linie oder Maschine für einen Wechsel stillsteht, auch in Lebensmittel, Pharma und Verpackung.' },
      { q: 'Was bringen digitale Arbeitsanweisungen für SMED?', a: 'Sie sichern die neue Arbeitsweise: Jede Schicht folgt denselben Schritten, Prüfungen lassen sich nicht überspringen und Sie messen jeden Rüstvorgang.' },
    ],
    related: [
      { key: 'tplSmed', label: 'Vorlage', title: 'SMED-Rüstcheckliste (Excel und PDF)' },
      { key: 'ucChangeover', label: 'Anwendungsfall', title: 'Rüsten mit digitalen Arbeitsanweisungen' },
      { key: 'roiCalculator', label: 'Tool', title: 'Berechnen, was kürzere Rüstzeiten bringen' },
    ],
    sideHeading: 'Ihr Rüstvorgang als Pilot? Besprechen Sie es mit einem Experten.',
    bandHeading: 'Bereit, Ihren ersten Rüstvorgang zu digitalisieren?',
  },
};
