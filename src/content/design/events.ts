import type { Locale } from '@/lib/locale';
import type { Region } from '@/content/design/network';

/**
 * Events where ActARion presents, exhibits or attends. Edit this list to update the Events page
 * (no CMS: changes are made via Claude and go live with the next deploy).
 *
 * - `start` / `end`: ISO dates (YYYY-MM-DD). Events whose end date has passed move to "Past events"
 *   automatically at the next build.
 * - `logo`: optional, file name without extension in /public/img/events/ (WebP, max 1200 px).
 * - `text`: one or two sentences per language.
 */
export interface EventItem {
  id: string;
  naam: string;
  start: string;
  end?: string;
  /** Market the event belongs to (same labels as the partner network). */
  region: Region;
  city?: string | Record<Locale, string>;
  country?: Record<Locale, string>;
  /** The event's own website (opens in a new tab). */
  url?: string;
  logo?: { file: string; w: number; h: number };
  text: Record<Locale, string>;
}

const L = (en: string, nl: string, de: string) => ({ en, nl, de });
const DE = L('Germany', 'Duitsland', 'Deutschland');
const NL = L('Netherlands', 'Nederland', 'Niederlande');
const CH = L('Switzerland', 'Zwitserland', 'Schweiz');

/** Source: Mark Dercksen, 5 Nov 2026 ("20261103 Events"). Dates and venues checked against the organisers. */
export const events: EventItem[] = [
  { id: 'anuga-2025', naam: 'Anuga', start: '2025-10-04', end: '2025-10-08', region: 'DACH', city: L('Cologne', 'Keulen', 'Köln'), country: DE, url: 'https://www.anuga.com/trade-fair/anuga/',
    text: L('The leading trade fair for the food and beverage industry, at Koelnmesse.', 'De grootste vakbeurs voor de food- en drankenindustrie, in de Koelnmesse.', 'Die Leitmesse für die Lebensmittel- und Getränkeindustrie in der Koelnmesse.') },
  { id: 'cphi-2025', naam: 'CPHI Frankfurt', start: '2025-10-28', end: '2025-10-30', region: 'DACH', city: 'Frankfurt', country: DE, url: 'https://www.cphi-online.com/event/cphi-frankfurt-2025/',
    text: L('The global meeting point of the pharmaceutical industry, at Messe Frankfurt.', 'Het wereldwijde trefpunt van de farmaceutische industrie, in Messe Frankfurt.', 'Der globale Treffpunkt der Pharmaindustrie in der Messe Frankfurt.') },
  { id: 'digital-veterans-2026', naam: 'Digital Veterans', start: '2026-03-11', region: 'DACH', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7437626529968398336/',
    text: L('Meeting of experienced digital leaders on technology and transformation in industry.', 'Bijeenkomst van ervaren digitale leiders over technologie en transformatie in de industrie.', 'Treffen erfahrener Digital-Führungskräfte zu Technologie und Transformation in der Industrie.') },
  { id: 'dbrt-2026', naam: 'DBRT Expert Forum', start: '2026-03-12', region: 'DACH', city: L('Zurich', 'Zürich', 'Zürich'), country: CH, url: 'https://dbrt.ch/evenement/save-the-date-dbrt-zurich-kpmg-expert-forum/',
    text: L('DBRT Zürich expert forum with KPMG on digital business and transformation.', 'Expertforum van DBRT Zürich met KPMG over digitale bedrijfsvoering en transformatie.', 'Expertenforum des DBRT Zürich mit KPMG zu digitalem Business und Transformation.') },
  { id: 'hidelta-2026', naam: 'Hi Delta Partnertour', start: '2026-06-24', region: 'Benelux', country: NL, url: 'https://hidelta.nl/hi-delta-partnertour-2026-innovatie-inspiratie-en-verbinding-in-de-regio/',
    text: L('Tour along partners of Hi Delta, the network of the manufacturing industry in South Holland.', 'Tour langs partners van Hi Delta, het netwerk van de maakindustrie in Zuid-Holland.', 'Tour bei Partnern von Hi Delta, dem Netzwerk der Fertigungsindustrie in Südholland.') },
  { id: 'dutch-naval-design-2026', naam: 'Dutch Naval Design workshop', start: '2026-10-05', region: 'Benelux', country: NL, url: 'https://dutchnavaldesign.nl/workshop',
    text: L('Workshop on the future of naval shipbuilding in the Netherlands.', 'Workshop over de toekomst van de marinescheepsbouw in Nederland.', 'Workshop zur Zukunft des Marineschiffbaus in den Niederlanden.') },
  { id: 'metavak-2026', naam: 'METAVAK', start: '2026-10-06', end: '2026-10-08', region: 'Benelux', city: 'Gorinchem', country: NL, url: 'https://www.metavak.nl/en/',
    text: L('The annual trade fair for the Dutch metalworking industry, at Evenementenhal Gorinchem.', 'De jaarlijkse vakbeurs voor de Nederlandse metaalbewerking, in de Evenementenhal Gorinchem.', 'Die jährliche Fachmesse der niederländischen Metallbearbeitung in der Evenementenhal Gorinchem.') },
  { id: 'industrial-heat-power-2026', naam: 'Industrial Heat & Power', start: '2026-10-06', end: '2026-10-08', region: 'Benelux', city: "'s-Hertogenbosch", country: NL, url: 'https://www.industrialheatandpower.nl/nl/',
    text: L('Trade fair on industrial energy supply and sustainability, at the Brabanthallen.', 'Vakbeurs over industriële energievoorziening en verduurzaming, in de Brabanthallen.', 'Fachmesse zu industrieller Energieversorgung und Nachhaltigkeit in den Brabanthallen.') },
  { id: 'hydrogen-expo-2026', naam: 'Hydrogen Technology World Expo', start: '2026-10-20', end: '2026-10-22', region: 'DACH', city: 'Hamburg', country: DE, url: 'https://www.hydrogen-worldexpo.com/',
    text: L('Large trade fair for hydrogen and fuel cell technology, at Messe Hamburg.', 'Grote vakbeurs voor waterstof- en brandstofceltechnologie, in Messe Hamburg.', 'Große Fachmesse für Wasserstoff- und Brennstoffzellentechnik in der Messe Hamburg.') },
  { id: 'ima-2026', naam: 'IMA World Maintenance Forum', start: '2026-10-27', end: '2026-10-29', region: 'Global', url: 'https://wmf2026.ima-world.org/',
    text: L('International congress on maintenance and asset management.', 'Internationaal congres over onderhoud en assetmanagement.', 'Internationaler Kongress zu Instandhaltung und Asset Management.') },
  { id: 'startup-nights-2026', naam: 'Startup Nights', start: '2026-11-05', end: '2026-11-06', region: 'DACH', city: 'Winterthur', country: CH, url: 'https://www.startup-nights.ch/',
    text: L("Switzerland's biggest startup event, at the Eulachhallen Winterthur.", 'Het grootste startup-event van Zwitserland, in de Eulachhallen Winterthur.', 'Der größte Startup-Event der Schweiz in den Eulachhallen Winterthur.') },
  { id: 'aerospace-maritime-2026', naam: 'Aerospace meets Maritime', start: '2026-11-09', region: 'Benelux', country: NL,
    text: L('Meeting of the aerospace and maritime industries, hosted at HELX.', 'Ontmoeting tussen lucht- en ruimtevaart en de maritieme sector, bij HELX.', 'Treffen von Luft- und Raumfahrt und maritimer Industrie bei HELX.') },
  { id: 'precisiebeurs-2026', naam: 'Precisiebeurs (Precision Fair)', start: '2026-11-18', end: '2026-11-19', region: 'Benelux', city: "'s-Hertogenbosch", country: NL, url: 'https://precisiebeurs.nl/',
    text: L('The trade fair for high- and ultra-precision technology, at the Brabanthallen.', 'De vakbeurs voor hoog- en ultraprecisietechnologie, in de Brabanthallen.', 'Die Fachmesse für Hoch- und Ultrapräzisionstechnik in den Brabanthallen.') },
  { id: 'neds-2026', naam: 'NEDS – NIDV Exhibition Defence & Security', start: '2026-11-19', region: 'Benelux', city: 'Rotterdam', country: NL, url: 'https://www.nidvexhibition.eu/',
    text: L('The defence and security exhibition of the Benelux, at Ahoy Rotterdam.', 'De defensie- en veiligheidsbeurs van de Benelux, in Ahoy Rotterdam.', 'Die Verteidigungs- und Sicherheitsmesse der Benelux in Ahoy Rotterdam.') },
  { id: 'anuga-foodtec-2027', naam: 'Anuga FoodTec', start: '2027-02-23', end: '2027-02-26', region: 'DACH', city: L('Cologne', 'Keulen', 'Köln'), country: DE, url: 'https://www.anugafoodtec.com/',
    text: L('International trade fair for food and beverage technology, at Koelnmesse.', 'Internationale vakbeurs voor food- en drankentechnologie, in de Koelnmesse.', 'Internationale Zuliefermesse für die Lebensmittel- und Getränkeindustrie in der Koelnmesse.') },
];

export const eventsCopy: Record<Locale, {
  eyebrow: string;
  upcoming: string;
  past: string;
  none: string;
  visit: string;
  newWindow: string;
  ctaHeading: string;
}> = {
  nl: {
    eyebrow: 'Events',
    upcoming: 'Komende events',
    past: 'Eerdere events',
    none: 'De volgende events worden binnenkort bekendgemaakt. Volg ActARion op [LinkedIn](https://www.linkedin.com/company/actarion/) of [plan een gesprek](/nl/demo/) voor een sessie met uw eigen team.',
    visit: 'Naar de eventsite',
    newWindow: '(opent in een nieuw venster)',
    ctaHeading: 'Spreek ons op een event of plan een gesprek',
  },
  en: {
    eyebrow: 'Events',
    upcoming: 'Upcoming events',
    past: 'Past events',
    none: 'Our next events will be announced shortly. Follow ActARion on [LinkedIn](https://www.linkedin.com/company/actarion/) or [book a call](/en/demo/) for a session with your own team.',
    visit: 'Visit the event site',
    newWindow: '(opens in a new window)',
    ctaHeading: 'Meet us at an event or book a call',
  },
  de: {
    eyebrow: 'Events',
    upcoming: 'Kommende Events',
    past: 'Vergangene Events',
    none: 'Unsere nächsten Events geben wir in Kürze bekannt. Folgen Sie ActARion auf [LinkedIn](https://www.linkedin.com/company/actarion/) oder [vereinbaren Sie ein Gespräch](/de/demo/) für eine Session mit Ihrem Team.',
    visit: 'Zur Event-Website',
    newWindow: '(öffnet in einem neuen Fenster)',
    ctaHeading: 'Treffen Sie uns auf einem Event oder vereinbaren Sie ein Gespräch',
  },
};
