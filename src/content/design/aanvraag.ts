import type { Locale } from '@/lib/locale';

export interface AanvraagType { naam: string; duur: string; uitleg: string; vervolg: string; verw: string }

export interface AanvraagCopy {
  steps: string[];
  h1Choice: string;
  leadChoice: string;
  types: AanvraagType[];
  h1Situation: string;
  processQ: string;
  processes: string[];
  peopleLabel: string;
  sitesLabel: string;
  regionLabel: string;
  regions: string[];
  h1ContactDemo: string;
  h1Contact: string;
  pickMoment: string;
  times: string[];
  name: string; namePh: string;
  email: string; emailPh: string;
  company: string; companyPh: string;
  phone: string; phonePh: string;
  message: string; messagePh: string;
  roleLabel: string;
  roles: string[];
  newsletter: string;
  back: string;
  next: string;
  confirmDemo: string;
  submit: string;
  sending: string;
  errRequired: string;
  errEmail: string;
  errSend: string;
  doneDemo: string;
  done: string;
  doneDemoText: string; // {moment} {contact} {process}
  prepTitle: string;
  prep: string[];
  readGuide: string;
  backHome: string;
  sumEyebrow: string;
  sumProcess: string;
  sumScale: string;
  people: string;
  site: string;
  sites: string;
  sumMoment: string;
  byArrangement: string;
  after: string;
  contactLabel: string;
  contacts: { initials: string; name: string; role: string }[];
  partnerTitle: string;
  partnerLead: string;
  partnerTypes: AanvraagType[];
}

export const aanvraagCopy: Record<Locale, AanvraagCopy> = {
  nl: {
    steps: ['Keuze', 'Situatie', 'Contact', 'Bevestiging'],
    h1Choice: 'Waar wilt u mee starten?',
    leadChoice: 'Elke keuze heeft één duidelijke vervolgstap. U kunt later altijd uitbreiden.',
    types: [
      { naam: 'Gesprek met een expert', duur: '30 min', uitleg: 'Vrijblijvend: bespreek uw proces en zie het werken op tablet of smart glasses.', vervolg: 'U plant direct een moment', verw: 'U ontvangt meteen een agenda-uitnodiging met de videolink.' },
      { naam: 'Workshop', duur: 'halve dag', uitleg: 'Prioriteer 3–5 use cases op waarde, haalbaarheid en meetbaarheid.', vervolg: 'We stemmen een datum met u af', verw: 'Binnen 1 werkdag belt uw contactpersoon om een datum en deelnemers af te stemmen.' },
      { naam: 'Pilot', duur: '6–8 weken', uitleg: 'Valideer één proces met nulmeting, KPI’s en een besluitkader.', vervolg: 'Eerst een kort scopinggesprek', verw: 'U ontvangt een voorstel voor scope, KPI’s en planning na een scopinggesprek van 30 minuten.' },
      { naam: 'Offerte', duur: 'binnen 5 werkdagen', uitleg: 'Een voorstel op maat voor scope, locaties, devices en ondersteuning.', vervolg: 'Voorstel per e-mail', verw: 'U ontvangt binnen [5] werkdagen een offerte; bij vragen bellen we eerst kort.' },
    ],
    h1Situation: 'Vertel kort over uw situatie.',
    processQ: 'Om welk proces gaat het?',
    processes: ['Inwerken', 'Changeover', 'Onderhoud', 'Kwaliteit', 'Anders'],
    peopleLabel: 'Medewerkers die dit werk doen',
    sitesLabel: 'Aantal locaties',
    regionLabel: 'Regio',
    regions: ['Benelux', 'DACH', 'Anders'],
    h1ContactDemo: 'Plan uw gesprek direct in.',
    h1Contact: 'Hoe bereiken we u?',
    pickMoment: 'Kies een moment · 45 minuten, online',
    times: ['09:00', '10:30', '13:00', '14:30', '16:00'],
    name: 'Naam', namePh: 'Voor- en achternaam',
    email: 'Zakelijk e-mailadres', emailPh: 'naam@bedrijf.nl',
    company: 'Organisatie', companyPh: 'Bedrijfsnaam',
    phone: 'Telefoon (optioneel)', phonePh: '+31 6 …',
    message: 'Uw vraag of toelichting', messagePh: 'Waar kunnen we u mee helpen?',
    roleLabel: 'Uw rol',
    roles: ['Operations', 'Proces / quality', 'IT / OT', 'Anders'],
    newsletter: 'Stuur mij ook de maandelijkse nieuwsbrief met praktijkinzichten.',
    back: '← Terug',
    next: 'Volgende',
    confirmDemo: 'Bevestig het gesprek',
    submit: 'Verstuur aanvraag',
    sending: 'Bezig met versturen…',
    errRequired: 'Vul dit veld in.',
    errEmail: 'Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.',
    errSend: 'Versturen is niet gelukt. Probeer het opnieuw of mail naar hello@actarion.com.',
    doneDemo: 'Uw gesprek staat gepland.',
    done: 'Bedankt, uw aanvraag is binnen.',
    doneDemoText: 'We zien u op {moment}. {contact} bereidt het gesprek voor op uw proces: {process}.',
    prepTitle: 'Zo bereidt u zich voor',
    prep: ['Kies één bestaande SOP of werkinstructie die u wilt laten zien.', 'Noteer wat dit proces nu kost: tijd, fouten of stilstand.', 'Nodig eventueel een collega van IT of quality uit.'],
    readGuide: 'Lees alvast de gids',
    backHome: 'Terug naar home',
    sumEyebrow: 'Uw aanvraag',
    sumProcess: 'Proces',
    sumScale: 'Schaal',
    people: 'mensen',
    site: 'locatie',
    sites: 'locaties',
    sumMoment: 'Moment',
    byArrangement: 'in overleg',
    after: 'Wat er daarna gebeurt',
    contactLabel: 'Uw contactpersoon',
    contacts: [
      { initials: 'JK', name: 'Jack Kessels', role: 'Managing Partner Benelux' },
      { initials: 'MD', name: 'Mark Dercksen', role: 'Oprichter · Managing Partner DACH' },
      { initials: 'AR', name: 'ActARion-team', role: 'hello@actarion.com' },
    ],
    partnerTitle: 'Hoe wilt u met ons samenwerken?',
    partnerLead: 'Kies het type partnerschap. We nemen binnen twee werkdagen contact op.',
    partnerTypes: [
      { naam: 'Implementatiepartner', duur: 'Benelux · DACH', uitleg: 'U begeleidt klanten bij invoering, training of verandermanagement.', vervolg: 'Kennismakingsgesprek', verw: 'Binnen 2 werkdagen nemen we contact op voor een kennismaking.' },
      { naam: 'Technologiepartner', duur: 'integratie', uitleg: 'Uw software of hardware sluit aan op DeepSight en AR-werkinstructies.', vervolg: 'Technische verkenning', verw: 'We plannen een technische verkenning met DeepSight en ActARion.' },
      { naam: 'Reseller', duur: 'regio', uitleg: 'U wilt ActARion-oplossingen aanbieden aan uw eigen klanten.', vervolg: 'Gesprek over voorwaarden', verw: 'U ontvangt een voorstel voor samenwerkingsvoorwaarden na een eerste gesprek.' },
    ],
  },
  en: {
    steps: ['Choice', 'Situation', 'Contact', 'Confirmation'],
    h1Choice: 'Where would you like to start?',
    leadChoice: 'Each choice has one clear next step. You can always expand later.',
    types: [
      { naam: 'Talk to an expert', duur: '30 min', uitleg: 'No obligation: discuss your process and see it working on a tablet or smart glasses.', vervolg: 'Book a slot right away', verw: 'You will immediately receive a calendar invitation with the video link.' },
      { naam: 'Workshop', duur: 'half a day', uitleg: 'Prioritise 3–5 use cases on value, feasibility and measurability.', vervolg: 'We agree a date with you', verw: 'Within 1 working day your contact will call to agree a date and participants.' },
      { naam: 'Pilot', duur: '6–8 weeks', uitleg: 'Validate one process with a baseline, KPIs and a decision framework.', vervolg: 'A short scoping call first', verw: 'You will receive a proposal for scope, KPIs and planning after a 30-minute scoping call.' },
      { naam: 'Quote', duur: 'within 5 working days', uitleg: 'A tailored proposal for scope, sites, devices and support.', vervolg: 'Proposal by email', verw: 'You will receive a quote within [5] working days; if anything is unclear, we will call you briefly first.' },
    ],
    h1Situation: 'Tell us briefly about your situation.',
    processQ: 'Which process is it about?',
    processes: ['Onboarding', 'Changeover', 'Maintenance', 'Quality', 'Other'],
    peopleLabel: 'Employees doing this work',
    sitesLabel: 'Number of sites',
    regionLabel: 'Region',
    regions: ['Benelux', 'DACH', 'Other'],
    h1ContactDemo: 'Book your call right away.',
    h1Contact: 'How can we reach you?',
    pickMoment: 'Choose a slot · 45 minutes, online',
    times: ['09:00', '10:30', '13:00', '14:30', '16:00'],
    name: 'Name', namePh: 'First and last name',
    email: 'Business email', emailPh: 'name@company.com',
    company: 'Organisation', companyPh: 'Company name',
    phone: 'Phone (optional)', phonePh: '+44 …',
    message: 'Your question or context', messagePh: 'How can we help?',
    roleLabel: 'Your role',
    roles: ['Operations', 'Process / quality', 'IT / OT', 'Other'],
    newsletter: 'Also send me the monthly newsletter with practical insights.',
    back: '← Back',
    next: 'Next',
    confirmDemo: 'Confirm the call',
    submit: 'Send request',
    sending: 'Sending…',
    errRequired: 'Please fill in this field.',
    errEmail: 'Please enter a valid email address, e.g. name@company.com.',
    errSend: 'Sending failed. Please try again or email hello@actarion.com.',
    doneDemo: 'Your call is booked.',
    done: 'Thank you, we have received your request.',
    doneDemoText: 'We will see you on {moment}. {contact} will prepare the call around your process: {process}.',
    prepTitle: 'How to prepare',
    prep: ['Pick one existing SOP or work instruction you would like to show.', 'Note what this process costs today: time, errors or downtime.', 'Consider inviting a colleague from IT or quality.'],
    readGuide: 'Read the guide',
    backHome: 'Back to home',
    sumEyebrow: 'Your request',
    sumProcess: 'Process',
    sumScale: 'Scale',
    people: 'people',
    site: 'site',
    sites: 'sites',
    sumMoment: 'Slot',
    byArrangement: 'to be agreed',
    after: 'What happens next',
    contactLabel: 'Your contact',
    contacts: [
      { initials: 'JK', name: 'Jack Kessels', role: 'Managing Partner Benelux' },
      { initials: 'MD', name: 'Mark Dercksen', role: 'Founder · Managing Partner DACH' },
      { initials: 'AR', name: 'ActARion team', role: 'hello@actarion.com' },
    ],
    partnerTitle: 'How would you like to work with us?',
    partnerLead: 'Choose the type of partnership. We will get in touch within two working days.',
    partnerTypes: [
      { naam: 'Implementation partner', duur: 'Benelux · DACH', uitleg: 'You support clients with roll-out, training or change management.', vervolg: 'Introductory call', verw: 'We will contact you within 2 working days for an introductory call.' },
      { naam: 'Technology partner', duur: 'integration', uitleg: 'Your software or hardware connects to DeepSight and AR work instructions.', vervolg: 'Technical exploration', verw: 'We will schedule a technical exploration with DeepSight and ActARion.' },
      { naam: 'Reseller', duur: 'region', uitleg: 'You want to offer ActARion solutions to your own clients.', vervolg: 'Call about terms', verw: 'You will receive a proposal for partnership terms after a first call.' },
    ],
  },
  de: {
    steps: ['Auswahl', 'Situation', 'Kontakt', 'Bestätigung'],
    h1Choice: 'Womit möchten Sie starten?',
    leadChoice: 'Jede Auswahl hat einen klaren nächsten Schritt. Sie können später jederzeit erweitern.',
    types: [
      { naam: 'Gespräch mit einem Experten', duur: '30 Min.', uitleg: 'Unverbindlich: Besprechen Sie Ihren Prozess und sehen Sie die Lösung auf Tablet oder Datenbrille.', vervolg: 'Sie buchen direkt einen Termin', verw: 'Sie erhalten sofort eine Kalendereinladung mit dem Videolink.' },
      { naam: 'Workshop', duur: 'halber Tag', uitleg: 'Priorisieren Sie 3–5 Use Cases nach Nutzen, Machbarkeit und Messbarkeit.', vervolg: 'Wir stimmen einen Termin ab', verw: 'Innerhalb von 1 Arbeitstag ruft Ihr Ansprechpartner an, um Termin und Teilnehmer abzustimmen.' },
      { naam: 'Pilot', duur: '6–8 Wochen', uitleg: 'Validieren Sie einen Prozess mit Nullmessung, KPIs und Entscheidungsrahmen.', vervolg: 'Zuerst ein kurzes Scoping-Gespräch', verw: 'Nach einem 30-minütigen Scoping-Gespräch erhalten Sie einen Vorschlag zu Umfang, KPIs und Zeitplan.' },
      { naam: 'Angebot', duur: 'innerhalb von 5 Werktagen', uitleg: 'Ein individueller Vorschlag zu Umfang, Standorten, Geräten und Support.', vervolg: 'Vorschlag per E-Mail', verw: 'Sie erhalten innerhalb von [5] Arbeitstagen ein Angebot; bei Rückfragen rufen wir vorher kurz an.' },
    ],
    h1Situation: 'Beschreiben Sie kurz Ihre Situation.',
    processQ: 'Um welchen Prozess geht es?',
    processes: ['Einarbeitung', 'Rüsten', 'Instandhaltung', 'Qualität', 'Sonstiges'],
    peopleLabel: 'Mitarbeitende in diesem Prozess',
    sitesLabel: 'Anzahl Standorte',
    regionLabel: 'Region',
    regions: ['Benelux', 'DACH', 'Sonstige'],
    h1ContactDemo: 'Buchen Sie Ihr Gespräch direkt.',
    h1Contact: 'Wie erreichen wir Sie?',
    pickMoment: 'Termin wählen · 45 Minuten, online',
    times: ['09:00', '10:30', '13:00', '14:30', '16:00'],
    name: 'Name', namePh: 'Vor- und Nachname',
    email: 'Geschäftliche E-Mail-Adresse', emailPh: 'name@unternehmen.de',
    company: 'Unternehmen', companyPh: 'Firmenname',
    phone: 'Telefon (optional)', phonePh: '+49 …',
    message: 'Ihre Frage oder Erläuterung', messagePh: 'Wobei können wir Ihnen helfen?',
    roleLabel: 'Ihre Rolle',
    roles: ['Produktion', 'Prozess / Qualität', 'IT / OT', 'Sonstige'],
    newsletter: 'Senden Sie mir auch den monatlichen Newsletter mit Praxiseinblicken.',
    back: '← Zurück',
    next: 'Weiter',
    confirmDemo: 'Gespräch bestätigen',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    errRequired: 'Bitte füllen Sie dieses Feld aus.',
    errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@unternehmen.de.',
    errSend: 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an hello@actarion.com.',
    doneDemo: 'Ihr Gespräch ist gebucht.',
    done: 'Vielen Dank, Ihre Anfrage ist eingegangen.',
    doneDemoText: 'Wir sehen uns am {moment}. {contact} bereitet das Gespräch auf Ihren Prozess vor: {process}.',
    prepTitle: 'So bereiten Sie sich vor',
    prep: ['Wählen Sie eine bestehende SOP oder Arbeitsanweisung, die Sie zeigen möchten.', 'Notieren Sie, was dieser Prozess heute kostet: Zeit, Fehler oder Stillstand.', 'Laden Sie gegebenenfalls einen Kollegen aus IT oder Qualität ein.'],
    readGuide: 'Leitfaden lesen',
    backHome: 'Zur Startseite',
    sumEyebrow: 'Ihre Anfrage',
    sumProcess: 'Prozess',
    sumScale: 'Umfang',
    people: 'Personen',
    site: 'Standort',
    sites: 'Standorte',
    sumMoment: 'Termin',
    byArrangement: 'nach Absprache',
    after: 'Was danach passiert',
    contactLabel: 'Ihr Ansprechpartner',
    contacts: [
      { initials: 'JK', name: 'Jack Kessels', role: 'Managing Partner Benelux' },
      { initials: 'MD', name: 'Mark Dercksen', role: 'Gründer · Managing Partner DACH' },
      { initials: 'AR', name: 'ActARion-Team', role: 'hello@actarion.com' },
    ],
    partnerTitle: 'Wie möchten Sie mit uns zusammenarbeiten?',
    partnerLead: 'Wählen Sie die Art der Partnerschaft. Wir melden uns innerhalb von zwei Arbeitstagen.',
    partnerTypes: [
      { naam: 'Implementierungspartner', duur: 'Benelux · DACH', uitleg: 'Sie begleiten Kunden bei Einführung, Schulung oder Change Management.', vervolg: 'Kennenlerngespräch', verw: 'Wir melden uns innerhalb von 2 Arbeitstagen für ein Kennenlerngespräch.' },
      { naam: 'Technologiepartner', duur: 'Integration', uitleg: 'Ihre Software oder Hardware lässt sich mit DeepSight und AR-Arbeitsanweisungen verbinden.', vervolg: 'Technische Sondierung', verw: 'Wir planen eine technische Sondierung mit DeepSight und ActARion.' },
      { naam: 'Reseller', duur: 'Region', uitleg: 'Sie möchten ActARion-Lösungen Ihren eigenen Kunden anbieten.', vervolg: 'Gespräch über Konditionen', verw: 'Nach einem ersten Gespräch erhalten Sie einen Vorschlag für die Partnerkonditionen.' },
    ],
  },
};
