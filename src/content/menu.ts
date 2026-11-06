/**
 * Navigation content, verbatim from the ActARion redesign (SiteHeader + Main footer).
 * Links point to catalogue route keys, so URLs stay localized.
 */
import type { Locale } from '@/lib/locale';

type L3 = Record<Locale, string>;
const L = (nl: string, en: string, de: string): L3 => ({ nl, en, de });

export interface MenuItem {
  key: string;
  label: L3;
  sub?: L3;
}
export interface MenuColumn {
  title: L3;
  items: MenuItem[];
}
export interface Featured {
  key: string;
  eyebrow: L3;
  title: L3;
  sub: L3;
  cta: L3;
}
export interface Menu {
  id: string;
  label: L3;
  /** Plain link instead of a megamenu. */
  link?: string;
  /** Route keys whose pages belong to this menu (active state). */
  section: string[];
  columns?: MenuColumn[];
  featured?: Featured;
}

export const headerText = {
  mainNav: L('Hoofdmenu', 'Main menu', 'Hauptmenü'),
  crumbLabel: L('Kruimelpad', 'Breadcrumb', 'Brotkrümelnavigation'),
  langLabel: L('Taal kiezen', 'Choose language', 'Sprache wählen'),
  roi: L('ROI berekenen', 'Calculate ROI', 'ROI berechnen'),
  demo: L('Plan een gesprek', 'Book a call', 'Gespräch vereinbaren'),
  secure: L('Uw gegevens blijven bij ActARion', 'Your data stays with ActARion', 'Ihre Daten bleiben bei ActARion'),
  home: L('Home', 'Home', 'Start'),
  langHint: L(
    'U blijft op dezelfde pagina. Elke taal heeft eigen, vertaalde URL’s en zoekwoorden.',
    'You stay on the same page. Every language has its own localised URLs and keywords.',
    'Sie bleiben auf derselben Seite. Jede Sprache hat eigene, lokalisierte URLs und Suchbegriffe.',
  ),
  menu: L('Menu', 'Menu', 'Menü'),
  close: L('Sluiten', 'Close', 'Schließen'),
};

export const langNames: Record<Locale, string> = { nl: 'Nederlands', en: 'English', de: 'Deutsch' };

export const menus: Menu[] = [
  {
    id: 'platform',
    label: L('Platform', 'Platform', 'Plattform'),
    section: ['platform', 'hardware'],
    columns: [
      {
        title: L('Platform', 'Platform', 'Plattform'),
        items: [
          { key: 'pfAi', label: L('AI-authoring', 'AI authoring', 'KI-Authoring'), sub: L('Van SOP naar instructie in minuten', 'From SOP to instruction in minutes', 'Von der SOP zur Anleitung in Minuten') },
          { key: 'pfAr', label: L('AR-begeleiding', 'AR guidance', 'AR-Führung'), sub: L('Uitvoeren op bril, tablet of telefoon', 'Run on glasses, tablet or phone', 'Auf Brille, Tablet oder Smartphone') },
          { key: 'pfAnalytics', label: L('Analytics en audit trail', 'Analytics and audit trail', 'Analytics und Audit-Trail'), sub: L('Bewijs voor kwaliteit en compliance', 'Evidence for quality and compliance', 'Nachweise für Qualität und Compliance') },
          { key: 'pfSecurity', label: L('Integraties en security', 'Integrations and security', 'Integrationen und Sicherheit'), sub: L('SAP, MES, LMS, SSO en EU-hosting', 'SAP, MES, LMS, SSO and EU hosting', 'SAP, MES, LMS, SSO und EU-Hosting') },
        ],
      },
      {
        title: L('Hardware', 'Hardware', 'Hardware'),
        items: [
          { key: 'hwTablets', label: L('Tablets en smartphones', 'Tablets and smartphones', 'Tablets und Smartphones') },
          { key: 'hwVisionPro', label: L('Apple Vision Pro', 'Apple Vision Pro', 'Apple Vision Pro') },
          { key: 'hwAndroidXr', label: L('Android XR', 'Android XR', 'Android XR') },
          { key: 'blogHololens', label: L('Overstappen van HoloLens 2', 'Moving on from HoloLens 2', 'Umstieg von HoloLens 2'), sub: L('Gids nu de productie is gestopt', 'Guide now production has ended', 'Leitfaden nach Produktionsende') },
        ],
      },
    ],
    featured: {
      key: 'partners',
      eyebrow: L('Partner', 'Partner', 'Partner'),
      title: L('Powered by DeepSight', 'Powered by DeepSight', 'Powered by DeepSight'),
      sub: L('Het platform van DeepSight, operationeel gemaakt door ActARion in Europa.', 'DeepSight’s platform, made operational in Europe by ActARion.', 'Die DeepSight-Plattform, in Europa einsatzbereit gemacht von ActARion.'),
      cta: L('Wie doet wat', 'Who does what', 'Wer macht was'),
    },
  },
  {
    id: 'oplossingen',
    label: L('Oplossingen', 'Solutions', 'Lösungen'),
    section: ['solutions', 'useCases'],
    columns: [
      {
        title: L('Oplossingen', 'Solutions', 'Lösungen'),
        items: [
          { key: 'solDwi', label: L('Digitale werkinstructies', 'Digital work instructions', 'Digitale Arbeitsanweisungen'), sub: L('SOP’s die operators echt volgen', 'SOPs operators actually follow', 'SOPs, denen Werker wirklich folgen') },
          { key: 'solTraining', label: L('Inwerken en training', 'Frontline training', 'Einarbeitung und Schulung'), sub: L('Sneller zelfstandig op de lijn', 'Faster to independent work', 'Schneller selbstständig an der Linie') },
          { key: 'solCwp', label: L('Connected worker platform', 'Connected worker platform', 'Werkerassistenzsystem'), sub: L('Kennis, data en support op één plek', 'Knowledge, data and support in one place', 'Wissen, Daten und Support an einem Ort') },
          { key: 'solChecklists', label: L('Digitale checklists', 'Digital checklists', 'Digitale Checklisten'), sub: L('Inspecties met foto als bewijs', 'Inspections with photo evidence', 'Prüfungen mit Fotonachweis') },
        ],
      },
      {
        title: L('Use cases', 'Use cases', 'Anwendungen'),
        items: [
          { key: 'ucChangeover', label: L('Changeovers', 'Changeovers', 'Umrüsten') },
          { key: 'ucAssembly', label: L('Assemblage', 'Assembly', 'Montage') },
          { key: 'ucMaintenance', label: L('Preventief onderhoud', 'Preventive maintenance', 'Vorbeugende Wartung') },
          { key: 'ucRemote', label: L('Remote expert support', 'Remote expert support', 'Remote-Expertenhilfe') },
        ],
      },
    ],
    featured: {
      key: 'roiCalculator',
      eyebrow: L('ROI-calculator · 2 min', 'ROI calculator · 2 min', 'ROI-Rechner · 2 Min.'),
      title: L('Wat levert het uw fabriek op?', 'What will it save your plant?', 'Was bringt es Ihrem Werk?'),
      sub: L('Besparing, terugverdientijd en 3-jaars-ROI, zonder e-mailadres.', 'Savings, payback and 3-year ROI, no email needed.', 'Einsparung, Amortisation und 3-Jahres-ROI, ohne E-Mail.'),
      cta: L('Bereken uw ROI', 'Calculate your ROI', 'ROI berechnen'),
    },
  },
  {
    id: 'branches',
    label: L('Sectoren', 'Industries', 'Branchen'),
    section: ['industries'],
    columns: [
      {
        title: L('Branches', 'Industries', 'Branchen'),
        items: [
          { key: 'indManufacturing', label: L('Maakindustrie', 'Manufacturing', 'Fertigung') },
          { key: 'indPharma', label: L('Pharma en biotech', 'Pharma and biotech', 'Pharma und Biotech') },
          { key: 'indFood', label: L('Food en beverage', 'Food and beverage', 'Lebensmittel und Getränke') },
        ],
      },
      {
        title: L(' ', ' ', ' '),
        items: [
          { key: 'indEnergy', label: L('Energie en utilities', 'Energy and utilities', 'Energie und Versorger') },
          { key: 'indAerospace', label: L('Lucht- en ruimtevaart', 'Aerospace', 'Luft- und Raumfahrt') },
          { key: 'indField', label: L('Field service', 'Field service', 'Außendienst') },
        ],
      },
    ],
    featured: {
      key: 'customers',
      eyebrow: L('Klantcases', 'Customer stories', 'Kundenstimmen'),
      title: L('[Case uit uw branche]', '[Case from your industry]', '[Fall aus Ihrer Branche]'),
      sub: L('Nulmeting, resultaat en het besluit na de pilot.', 'Baseline, result and the decision after the pilot.', 'Ausgangswert, Ergebnis und die Entscheidung nach dem Pilot.'),
      cta: L('Bekijk cases', 'View stories', 'Fälle ansehen'),
    },
  },
  { id: 'aanpak', label: L('Aanpak', 'Approach', 'Vorgehen'), link: 'pilot', section: ['pilot'] },
  {
    id: 'kennis',
    label: L('Kennisbank', 'Resources', 'Wissen'),
    section: ['resources', 'blog', 'compare'],
    columns: [
      {
        title: L('Kennisbank', 'Resources', 'Wissen'),
        items: [
          { key: 'resources', label: L('Alle artikelen en gidsen', 'All articles and guides', 'Alle Artikel und Leitfäden'), sub: L('Zoeken en filteren op onderwerp en branche', 'Search and filter by topic and industry', 'Suchen und filtern nach Thema und Branche') },
          { key: 'templates', label: L('Templates en checklists', 'Templates and checklists', 'Vorlagen und Checklisten'), sub: L('Werkinstructie, SMED, preventief onderhoud', 'Work instruction, SMED, preventive maintenance', 'Arbeitsanweisung, SMED, Wartung') },
          { key: 'whitepapers', label: L('Whitepapers', 'Whitepapers', 'Whitepaper') },
          { key: 'glossary', label: L('Woordenlijst', 'Glossary', 'Glossar'), sub: L('SOP, SMED, OEE, connected worker', 'SOP, SMED, OEE, connected worker', 'SOP, SMED, OEE, Werkerassistenzsystem') },
        ],
      },
      {
        title: L('Vergelijken en rekenen', 'Compare and calculate', 'Vergleichen und rechnen'),
        items: [
          { key: 'roiCalculator', label: L('ROI-calculator', 'ROI calculator', 'ROI-Rechner') },
          { key: 'cmpDigitalVsPaper', label: L('Digitaal vs. papieren SOP', 'Digital vs. paper SOPs', 'Digital vs. Papier-SOP') },
          { key: 'cmpGlassesTablets', label: L('AR-bril vs. tablet', 'AR glasses vs. tablets', 'AR-Brille vs. Tablet') },
          { key: 'customers', label: L('Klantcases', 'Customer stories', 'Kundenstimmen') },
        ],
      },
    ],
    featured: {
      key: 'blogSmed',
      eyebrow: L('Gids · 8 min', 'Guide · 8 min', 'Leitfaden · 8 Min.'),
      title: L('Een pilot op een kritieke omstelling', 'Piloting a critical changeover', 'Pilot bei einer kritischen Umrüstung'),
      sub: L('Team, nulmeting, succescriteria en opschalen in vier fases.', 'Team, baseline, success criteria and scale-up in four phases.', 'Team, Ausgangswert, Erfolgskriterien und Skalierung in vier Phasen.'),
      cta: L('Lees de gids', 'Read the guide', 'Leitfaden lesen'),
    },
  },
  { id: 'events', label: L('Events', 'Events', 'Events'), link: 'events', section: ['events'] },
  {
    id: 'bedrijf',
    label: L('Over ons', 'Company', 'Unternehmen'),
    section: ['company', 'partners'],
    columns: [
      {
        title: L('Bedrijf', 'Company', 'Unternehmen'),
        items: [
          { key: 'company', label: L('Over ActARion', 'About ActARion', 'Über ActARion'), sub: L('Lees meer over onze missie, aanpak en ons managementteam', 'Learn more about our mission, approach and management team', 'Erfahren Sie mehr über unsere Mission, unser Vorgehen und unser Managementteam') },
          { key: 'partners', label: L('Partners', 'Partners', 'Partner'), sub: L('Vind de juiste partner in ons partnerecosysteem', 'Find the right partner in our partner ecosystem', 'Finden Sie den passenden Partner in unserem Partner-Ökosystem') },
          { key: 'careers', label: L('Werken bij', 'Careers', 'Karriere') },
          { key: 'contact', label: L('Contact', 'Contact', 'Kontakt') },
        ],
      },
    ],
    featured: {
      key: 'demo',
      eyebrow: L('Lokaal team', 'Local team', 'Lokales Team'),
      title: L('Jack (Benelux) en Mark (DACH)', 'Jack (Benelux) and Mark (DACH)', 'Jack (Benelux) und Mark (DACH)'),
      sub: L('Een vrijblijvend gesprek met een expert uit uw regio, in uw taal.', 'A no-obligation call with an expert from your region, in your language.', 'Ein unverbindliches Gespräch mit einem Experten aus Ihrer Region, in Ihrer Sprache.'),
      cta: L('Plan een gesprek', 'Book a call', 'Gespräch vereinbaren'),
    },
  },
];

export const footerText = {
  about: L(
    'De Europese implementatiepartner voor digitale en AR-werkinstructies. Meetbare pilots, operationeel resultaat.',
    'The European implementation partner for digital and AR work instructions. Measurable pilots, operational results.',
    'Der europäische Implementierungspartner für digitale und AR-Arbeitsanweisungen. Messbare Pilots, operative Ergebnisse.',
  ),
  cta: L('Plan een gesprek met een expert', 'Book a call with an expert', 'Gespräch mit einem Experten'),
  nav: L('Sitemap', 'Sitemap', 'Sitemap'),
  lang: L('Taal', 'Language', 'Sprache'),
};

export const footerColumns: { title: L3; links: { key: string; label: L3 }[] }[] = [
  {
    title: L('Oplossingen', 'Solutions', 'Lösungen'),
    links: [
      { key: 'solDwi', label: L('Digitale werkinstructies', 'Digital work instructions', 'Digitale Arbeitsanweisungen') },
      { key: 'solTraining', label: L('Inwerken en training', 'Frontline training', 'Einarbeitung und Schulung') },
      { key: 'solCwp', label: L('Connected worker platform', 'Connected worker platform', 'Werkerassistenzsystem') },
      { key: 'useCases', label: L('Use cases', 'Use cases', 'Anwendungen') },
    ],
  },
  {
    title: L('Branches', 'Industries', 'Branchen'),
    links: [
      { key: 'indManufacturing', label: L('Maakindustrie', 'Manufacturing', 'Fertigung') },
      { key: 'indPharma', label: L('Pharma en biotech', 'Pharma and biotech', 'Pharma und Biotech') },
      { key: 'indFood', label: L('Food en beverage', 'Food and beverage', 'Lebensmittel') },
      { key: 'indEnergy', label: L('Energie en utilities', 'Energy and utilities', 'Energie und Versorger') },
    ],
  },
  {
    title: L('Kennis', 'Resources', 'Ressourcen'),
    links: [
      { key: 'resources', label: L('Kennisbank', 'Resources', 'Wissen') },
      { key: 'roiCalculator', label: L('ROI-calculator', 'ROI calculator', 'ROI-Rechner') },
      { key: 'whitepapers', label: L('Whitepapers', 'Whitepapers', 'Whitepaper') },
      { key: 'glossary', label: L('Woordenlijst', 'Glossary', 'Glossar') },
    ],
  },
  {
    title: L('Bedrijf', 'Company', 'Unternehmen'),
    links: [
      { key: 'company', label: L('Over ActARion', 'About ActARion', 'Über ActARion') },
      { key: 'pilot', label: L('Aanpak en pilot', 'Approach and pilot', 'Vorgehen und Pilot') },
      { key: 'partners', label: L('Partners', 'Partners', 'Partner') },
      { key: 'events', label: L('Events', 'Events', 'Events') },
      { key: 'contact', label: L('Contact', 'Contact', 'Kontakt') },
      { key: 'sitemap', label: L('Sitemap', 'Sitemap', 'Sitemap') },
    ],
  },
];

export const legalLinks: { key: string; label: L3 }[] = [
  { key: 'privacy', label: L('Privacy', 'Privacy', 'Datenschutz') },
  { key: 'terms', label: L('Voorwaarden', 'Terms', 'AGB') },
  { key: 'imprint', label: L('Colofon', 'Legal notice', 'Impressum') },
];

export const ctaExpertText = {
  eyebrow: L('Vrijblijvend gesprek', 'No-obligation call', 'Unverbindliches Gespräch'),
  h: L('Bespreek uw proces met een expert.', 'Talk your process through with an expert.', 'Besprechen Sie Ihren Prozess mit einem Experten.'),
  sub: L(
    'In 30 minuten kijken we samen naar uw proces, uw cijfers en de snelste weg naar een meetbare pilot. Geen verkooppraatje, wel een concreet advies.',
    'In 30 minutes we look at your process, your numbers and the fastest route to a measurable pilot. No sales pitch, just concrete advice.',
    'In 30 Minuten schauen wir gemeinsam auf Ihren Prozess, Ihre Zahlen und den schnellsten Weg zu einem messbaren Pilot. Kein Verkaufsgespräch, sondern konkreter Rat.',
  ),
  subShort: L('30 minuten, online. U krijgt een concreet advies voor uw proces.', '30 minutes, online. You get concrete advice for your process.', '30 Minuten, online. Sie erhalten konkreten Rat für Ihren Prozess.'),
  region: L('Waar zit u?', 'Where are you based?', 'Wo sind Sie?'),
  meta: L('30 min · online · NL, EN of DE', '30 min · online · EN, NL or DE', '30 Min. · online · DE, EN oder NL'),
  cta: L('Plan een gesprek met ', 'Book a call with ', 'Gespräch mit '),
  altJack: L('Foto van Jack Kessels', 'Photo of Jack Kessels', 'Foto von Jack Kessels'),
  altMark: L('Foto van Mark Dercksen', 'Photo of Mark Dercksen', 'Foto von Mark Dercksen'),
};
