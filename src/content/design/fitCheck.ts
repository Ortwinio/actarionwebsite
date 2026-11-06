import type { Locale } from '@/lib/locale';

export interface FitOutcome { oordeel: string; advies: string; adviesNoMeasure?: string; stap: string; stapUitleg: string; stapCta: string }

export interface FitCheckCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  q1: string; mens: string; freq: string; where: string; spreiding: string[];
  q2: string; inwerk: string; weeks: string; fout: string; foutLabels: string[]; foutMin: string; foutMax: string;
  exp: string; expLabels: string[]; tip: string;
  q3: string; meting: { label: string; uitleg: string }[];
  outcome: string; indicative: string; scoreLabel: string;
  factorsTitle: string; factors: string[];
  strong: FitOutcome; mid: FitOutcome; low: FitOutcome;
  recommended: string;
  mailResult: string;
  ctaHeading: string;
}

export const fitCheckCopy: Record<Locale, FitCheckCopy> = {
  nl: {
    eyebrow: 'Pilot-fitcheck · 2 minuten',
    h1: 'Is uw proces klaar voor een pilot?',
    lead: 'Schuif de waarden naar uw situatie. U ziet direct of een pilot zinvol is, of dat een workshop of demo een betere eerste stap is.',
    q1: 'Hoe vaak gebeurt het?', mens: 'Medewerkers op dit proces', freq: 'Uitvoeringen per week', where: 'Waar gebeurt het?',
    spreiding: ['1 ploeg', 'Meerdere ploegen', 'Meerdere locaties'],
    q2: 'Wat kost het nu?', inwerk: 'Inwerktijd tot zelfstandig', weeks: ' weken', fout: 'Impact van één fout of storing',
    foutLabels: ['Verwaarloosbaar', 'Beperkt', 'Merkbaar', 'Hoog', 'Kritiek'], foutMin: 'verwaarloosbaar', foutMax: 'kritiek',
    exp: 'Afhankelijkheid van een paar experts', expLabels: ['Geen', 'Klein', 'Merkbaar', 'Groot', 'Volledig'],
    tip: 'Tip: hoe vaak wordt er gebeld als die ene collega met vakantie is?',
    q3: 'Kunt u het meten?',
    meting: [
      { label: 'Ja', uitleg: 'KPI’s worden al gemeten' },
      { label: 'Deels', uitleg: 'data bestaat, niet per proces' },
      { label: 'Nee', uitleg: 'er is geen meting' },
    ],
    outcome: 'Uw uitkomst', indicative: 'indicatief · geen offerte', scoreLabel: 'Score',
    factorsTitle: 'Wat deze uitkomst bepaalt', factors: ['Herhaling', 'Foutkosten', 'Inwerktijd', 'Expertafhankelijk', 'Meetbaarheid'],
    strong: { oordeel: 'Sterke pilotkandidaat', advies: 'Veel herhaling, merkbare kosten en u kunt meten. Dit is precies waar een pilot zich bewijst.', stap: 'Pilot', stapUitleg: 'Een scopinggesprek van 30 minuten, daarna een voorstel met KPI’s, nulmeting en planning.', stapCta: 'Bespreek een pilot' },
    mid: { oordeel: 'Kansrijk, eerst scherpstellen', advies: 'Er is potentieel. Kies samen het proces met de grootste impact.', adviesNoMeasure: 'De kansen zijn er, maar zonder nulmeting is het effect niet aan te tonen.', stap: 'Workshop', stapUitleg: 'We prioriteren 3–5 use cases op waarde, haalbaarheid en meetbaarheid en leggen de nulmeting vast.', stapCta: 'Vraag een workshop aan' },
    low: { oordeel: 'Nog geen pilot', advies: 'Dit proces lijkt (nog) te weinig op te leveren. Een ander proces kan wel passen.', stap: 'Demo', stapUitleg: 'Bekijk in 45 minuten wat AR-instructies kunnen en waar ze bij u wel renderen.', stapCta: 'Plan een demo' },
    recommended: 'Aanbevolen eerste stap',
    mailResult: 'Mail mij de uitkomst',
    ctaHeading: 'Twijfelt u over de uitkomst? Bespreek uw proces met een expert.',
  },
  en: {
    eyebrow: 'Pilot fit check · 2 minutes',
    h1: 'Is your process ready for a pilot?',
    lead: 'Move the sliders to match your situation. You will see straight away whether a pilot makes sense, or whether a workshop or demo is a better first step.',
    q1: 'How often does it happen?', mens: 'Employees on this process', freq: 'Executions per week', where: 'Where does it happen?',
    spreiding: ['1 shift', 'Multiple shifts', 'Multiple sites'],
    q2: 'What does it cost today?', inwerk: 'Time to independent work', weeks: ' weeks', fout: 'Impact of a single error or failure',
    foutLabels: ['Negligible', 'Limited', 'Noticeable', 'High', 'Critical'], foutMin: 'negligible', foutMax: 'critical',
    exp: 'Dependence on a few experts', expLabels: ['None', 'Small', 'Noticeable', 'Large', 'Complete'],
    tip: 'Tip: how often does someone call when that one colleague is on holiday?',
    q3: 'Can you measure it?',
    meting: [
      { label: 'Yes', uitleg: 'KPIs are already tracked' },
      { label: 'Partly', uitleg: 'data exists, not per process' },
      { label: 'No', uitleg: 'there is no measurement' },
    ],
    outcome: 'Your outcome', indicative: 'indicative · not a quote', scoreLabel: 'Score',
    factorsTitle: 'What drives this outcome', factors: ['Repetition', 'Cost of errors', 'Time to competence', 'Expert dependence', 'Measurability'],
    strong: { oordeel: 'Strong pilot candidate', advies: 'Lots of repetition, noticeable costs and you can measure. This is exactly where a pilot proves itself.', stap: 'Pilot', stapUitleg: 'A 30-minute scoping call, followed by a proposal with KPIs, baseline and planning.', stapCta: 'Discuss a pilot' },
    mid: { oordeel: 'Promising, sharpen first', advies: 'There is potential. Let’s choose the process with the biggest impact together.', adviesNoMeasure: 'The opportunities are there, but without a baseline the effect cannot be proven.', stap: 'Workshop', stapUitleg: 'We prioritise 3–5 use cases on value, feasibility and measurability and define the baseline.', stapCta: 'Request a workshop' },
    low: { oordeel: 'Not a pilot yet', advies: 'This process seems to deliver too little (for now). A different process may well fit.', stap: 'Demo', stapUitleg: 'See in 45 minutes what AR instructions can do and where they will pay off for you.', stapCta: 'Book a demo' },
    recommended: 'Recommended first step',
    mailResult: 'Email me the outcome',
    ctaHeading: 'Unsure about the outcome? Discuss your process with an expert.',
  },
  de: {
    eyebrow: 'Pilot-Check · 2 Minuten',
    h1: 'Ist Ihr Prozess bereit für einen Pilot?',
    lead: 'Stellen Sie die Werte auf Ihre Situation ein. Sie sehen sofort, ob ein Pilot sinnvoll ist oder ob ein Workshop oder eine Demo der bessere erste Schritt ist.',
    q1: 'Wie oft kommt es vor?', mens: 'Mitarbeitende in diesem Prozess', freq: 'Ausführungen pro Woche', where: 'Wo findet es statt?',
    spreiding: ['1 Schicht', 'Mehrere Schichten', 'Mehrere Standorte'],
    q2: 'Was kostet es heute?', inwerk: 'Einarbeitungszeit bis zur Selbstständigkeit', weeks: ' Wochen', fout: 'Auswirkung eines Fehlers oder einer Störung',
    foutLabels: ['Vernachlässigbar', 'Gering', 'Spürbar', 'Hoch', 'Kritisch'], foutMin: 'vernachlässigbar', foutMax: 'kritisch',
    exp: 'Abhängigkeit von wenigen Experten', expLabels: ['Keine', 'Gering', 'Spürbar', 'Groß', 'Vollständig'],
    tip: 'Tipp: Wie oft wird angerufen, wenn dieser eine Kollege im Urlaub ist?',
    q3: 'Können Sie es messen?',
    meting: [
      { label: 'Ja', uitleg: 'KPIs werden bereits gemessen' },
      { label: 'Teilweise', uitleg: 'Daten vorhanden, nicht pro Prozess' },
      { label: 'Nein', uitleg: 'es gibt keine Messung' },
    ],
    outcome: 'Ihr Ergebnis', indicative: 'indikativ · kein Angebot', scoreLabel: 'Score',
    factorsTitle: 'Was dieses Ergebnis bestimmt', factors: ['Wiederholung', 'Fehlerkosten', 'Einarbeitungszeit', 'Expertenabhängigkeit', 'Messbarkeit'],
    strong: { oordeel: 'Starker Pilotkandidat', advies: 'Viel Wiederholung, spürbare Kosten und Sie können messen. Genau hier beweist sich ein Pilot.', stap: 'Pilot', stapUitleg: 'Ein 30-minütiges Scoping-Gespräch, danach ein Vorschlag mit KPIs, Nullmessung und Zeitplan.', stapCta: 'Pilot besprechen' },
    mid: { oordeel: 'Aussichtsreich, erst schärfen', advies: 'Es gibt Potenzial. Wählen wir gemeinsam den Prozess mit der größten Wirkung.', adviesNoMeasure: 'Die Chancen sind da, aber ohne Nullmessung lässt sich die Wirkung nicht nachweisen.', stap: 'Workshop', stapUitleg: 'Wir priorisieren 3–5 Use Cases nach Nutzen, Machbarkeit und Messbarkeit und legen die Nullmessung fest.', stapCta: 'Workshop anfragen' },
    low: { oordeel: 'Noch kein Pilot', advies: 'Dieser Prozess scheint (noch) zu wenig einzubringen. Ein anderer Prozess kann durchaus passen.', stap: 'Demo', stapUitleg: 'Sehen Sie in 45 Minuten, was AR-Arbeitsanweisungen leisten und wo sie sich bei Ihnen rechnen.', stapCta: 'Demo vereinbaren' },
    recommended: 'Empfohlener erster Schritt',
    mailResult: 'Ergebnis per E-Mail senden',
    ctaHeading: 'Unsicher über das Ergebnis? Besprechen Sie Ihren Prozess mit einem Experten.',
  },
};
