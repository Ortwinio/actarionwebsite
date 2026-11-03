import type { Locale } from '@/lib/locale';

export interface WpItem { slug: string; title: string; voor: string; meta: string; cover: string; routeKey?: string }

export interface WhitepaperCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  groupLabel: string;
  items: WpItem[];
  emailLabel: string;
  emailPh: string;
  optIn: string;
  download: string;
  sending: string;
  fine: string; // {X}
  fineX: string;
  errEmail: string;
  errSend: string;
  readyTitle: string;
  openPdf: string;
  readyText: string;
  readyLink: string;
  nlTitle: string;
  nlText: string;
  nlLabel: string;
  nlButton: string;
  nlDone: string;
  ctaHeading: string;
}

const covers = ['/img/hero-tablet-ar.webp', '/img/usecase-assembly.webp', '/img/usecase-maintenance.webp', '/img/usecase-changeover.webp', '/img/hero-tablet-ar.webp'];
const slugs = ['ai-ar-work-instructions-guide', 'digital-work-instructions-ar-sops', 'choosing-connected-worker-platforms', 'roi-calculator-method', 'it-security-ar-ai'];
const mk = (rows: [string, string, string][]): WpItem[] =>
  rows.map(([title, voor, meta], i) => ({ slug: slugs[i], title, voor, meta, cover: covers[i], routeKey: i === 4 ? 'wpItSecurity' : undefined }));

export const whitepaperCopy: Record<Locale, WhitepaperCopy> = {
  nl: {
    eyebrow: 'Kennis · gratis te downloaden',
    h1: 'Onderbouw uw businesscase, voordat u iets koopt.',
    lead: 'Kies de gids die past bij de vraag die nu op tafel ligt.',
    groupLabel: 'Kies een whitepaper',
    items: mk([
      ['AI- en AR-werkinstructies: praktische gids', 'Voor operations: inwerken, onderhoud, veiligheid en adoptie', 'pdf'],
      ['Digitale werkinstructies en AR-SOP’s', 'Voor quality en HSE: standaardwerk en compliance', 'pdf'],
      ['Connected worker platforms kiezen', 'Voor wie platforms vergelijkt: waar AR waarde toevoegt', 'pdf'],
      ['ROI-calculator: methode en aannames', 'Voor de businesscase: bronnen, definities, bandbreedtes', 'pdf'],
      ['IT- en securitydossier', 'Voor IT, OT en security: devices, data, koppelingen, offline', 'nieuw'],
    ]),
    emailLabel: 'Zakelijk e-mailadres',
    emailPh: 'naam@bedrijf.nl',
    optIn: 'Ja, stuur mij maandelijks praktijkinzichten over AR op de werkvloer.',
    download: 'Download de pdf',
    sending: 'Bezig…',
    fine: 'De download start direct. We gebruiken uw adres alleen voor deze gids{X}. Afmelden kan altijd.',
    fineX: ' en de maandelijkse nieuwsbrief',
    errEmail: 'Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.',
    errSend: 'Er ging iets mis. Probeer het opnieuw of mail naar hello@actarion.com.',
    readyTitle: 'Uw download staat klaar.',
    openPdf: 'Open de pdf',
    readyText: 'Liever direct sparren over uw eigen proces? In 30–45 minuten bepalen we 2–3 startpunten.',
    readyLink: 'Plan een demo →',
    nlTitle: 'Alleen de nieuwsbrief?',
    nlText: 'Eén keer per maand: een praktijkvoorbeeld, een KPI om op te sturen en nieuws uit DeepSight.',
    nlLabel: 'E-mailadres voor de nieuwsbrief',
    nlButton: 'Inschrijven',
    nlDone: 'Dank u. U bent ingeschreven voor de nieuwsbrief.',
    ctaHeading: 'Liever direct antwoord op uw vraag? Spreek een expert.',
  },
  en: {
    eyebrow: 'Knowledge · free to download',
    h1: 'Build your business case before you buy anything.',
    lead: 'Choose the guide that fits the question on the table right now.',
    groupLabel: 'Choose a whitepaper',
    items: mk([
      ['AI and AR work instructions: a practical guide', 'For operations: onboarding, maintenance, safety and adoption', 'pdf'],
      ['Digital work instructions and AR SOPs', 'For quality and HSE: standard work and compliance', 'pdf'],
      ['Choosing a connected worker platform', 'For anyone comparing platforms: where AR adds value', 'pdf'],
      ['ROI calculator: method and assumptions', 'For the business case: sources, definitions, ranges', 'pdf'],
      ['IT and security dossier', 'For IT, OT and security: devices, data, integrations, offline', 'new'],
    ]),
    emailLabel: 'Business email',
    emailPh: 'name@company.com',
    optIn: 'Yes, send me monthly practical insights on AR on the shop floor.',
    download: 'Download the PDF',
    sending: 'Sending…',
    fine: 'The download starts immediately. We only use your address for this guide{X}. You can unsubscribe at any time.',
    fineX: ' and the monthly newsletter',
    errEmail: 'Please enter a valid email address, e.g. name@company.com.',
    errSend: 'Something went wrong. Please try again or email hello@actarion.com.',
    readyTitle: 'Your download is ready.',
    openPdf: 'Open the PDF',
    readyText: 'Rather talk through your own process straight away? In 30–45 minutes we identify 2–3 starting points.',
    readyLink: 'Book a demo →',
    nlTitle: 'Just the newsletter?',
    nlText: 'Once a month: a practical example, a KPI to steer on and news from DeepSight.',
    nlLabel: 'Email address for the newsletter',
    nlButton: 'Subscribe',
    nlDone: 'Thank you. You are subscribed to the newsletter.',
    ctaHeading: 'Rather get a direct answer to your question? Talk to an expert.',
  },
  de: {
    eyebrow: 'Wissen · kostenlos herunterladen',
    h1: 'Untermauern Sie Ihren Business Case, bevor Sie etwas kaufen.',
    lead: 'Wählen Sie den Leitfaden, der zu Ihrer aktuellen Frage passt.',
    groupLabel: 'Whitepaper wählen',
    items: mk([
      ['KI- und AR-Arbeitsanweisungen: Praxisleitfaden', 'Für die Produktion: Einarbeitung, Instandhaltung, Sicherheit und Akzeptanz', 'pdf'],
      ['Digitale Arbeitsanweisungen und AR-SOPs', 'Für Qualität und Arbeitssicherheit: Standardarbeit und Compliance', 'pdf'],
      ['Werkerassistenzsysteme auswählen', 'Für alle, die Plattformen vergleichen: wo AR Mehrwert schafft', 'pdf'],
      ['ROI-Rechner: Methode und Annahmen', 'Für den Business Case: Quellen, Definitionen, Bandbreiten', 'pdf'],
      ['IT- und Sicherheitsdossier', 'Für IT, OT und Security: Geräte, Daten, Schnittstellen, offline', 'neu'],
    ]),
    emailLabel: 'Geschäftliche E-Mail-Adresse',
    emailPh: 'name@unternehmen.de',
    optIn: 'Ja, senden Sie mir monatlich Praxiseinblicke zu AR in der Fertigung.',
    download: 'PDF herunterladen',
    sending: 'Bitte warten…',
    fine: 'Der Download startet sofort. Wir verwenden Ihre Adresse nur für diesen Leitfaden{X}. Abmelden ist jederzeit möglich.',
    fineX: ' und den monatlichen Newsletter',
    errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@unternehmen.de.',
    errSend: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie an hello@actarion.com.',
    readyTitle: 'Ihr Download ist bereit.',
    openPdf: 'PDF öffnen',
    readyText: 'Lieber direkt über Ihren eigenen Prozess sprechen? In 30–45 Minuten legen wir 2–3 Ansatzpunkte fest.',
    readyLink: 'Demo vereinbaren →',
    nlTitle: 'Nur der Newsletter?',
    nlText: 'Einmal im Monat: ein Praxisbeispiel, eine KPI zur Steuerung und Neuigkeiten von DeepSight.',
    nlLabel: 'E-Mail-Adresse für den Newsletter',
    nlButton: 'Anmelden',
    nlDone: 'Vielen Dank. Sie sind für den Newsletter angemeldet.',
    ctaHeading: 'Lieber direkt eine Antwort auf Ihre Frage? Sprechen Sie mit einem Experten.',
  },
};
