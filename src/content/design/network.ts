import type { Locale } from '@/lib/locale';

/** Network and ecosystem partners (source: 20261103_Partnerships.docx). Descriptions follow each partner's own website. */
export type Region = 'Benelux' | 'DACH' | 'Benelux / DACH' | 'Global';

export interface NetworkPartner {
  id: string;
  naam: string;
  region: Region;
  url: string;
  logo: string;
  w: number;
  h: number;
  text: Record<Locale, string>;
}

const L = (en: string, nl: string, de: string) => ({ en, nl, de });

export const networkPartners: NetworkPartner[] = [
  { id: 'hidelta', naam: 'Hi Delta', region: 'Benelux', url: 'https://hidelta.nl/', logo: 'hidelta', w: 322, h: 112,
    text: L('Network that connects the technology and manufacturing industry in South Holland: manufacturers, suppliers, knowledge institutes, training providers and government.',
      'Netwerk dat de technologische maakindustrie in Zuid-Holland verbindt: maakbedrijven, toeleveranciers, kennisinstellingen, opleiders en overheden.',
      'Netzwerk, das die technologische Fertigungsindustrie in Südholland verbindet: Hersteller, Zulieferer, Wissenseinrichtungen, Bildungsträger und Behörden.') },
  { id: 'indicia', naam: 'Indicia', region: 'Benelux', url: 'https://www.indicia.ai/', logo: 'indicia', w: 286, h: 81,
    text: L('Partner in technology, data and AI that has helped organisations with their digital challenges since 1996.',
      'Partner in tech, data en AI die organisaties sinds 1996 helpt met hun digitale vraagstukken.',
      'Partner für Technologie, Daten und KI, der Organisationen seit 1996 bei digitalen Fragestellungen unterstützt.') },
  { id: 'theipcompany', naam: 'theIPCompany', region: 'Benelux', url: 'https://www.theipcompany.nl/', logo: 'theipcompany', w: 318, h: 49,
    text: L('Wireless alerting and communication that reaches the right crew member anywhere on board, from alarm to action in seconds.',
      'Draadloze alarmering en communicatie die het juiste bemanningslid overal aan boord bereikt: van alarm naar actie in seconden.',
      'Drahtlose Alarmierung und Kommunikation, die das richtige Besatzungsmitglied überall an Bord erreicht: vom Alarm zur Aktion in Sekunden.') },
  { id: 'nlr', naam: 'NLR – Nederlands Lucht- en Ruimtevaartcentrum', region: 'Benelux', url: 'https://www.nlr.org/nl/', logo: 'nlr', w: 97, h: 124,
    text: L('Netherlands Aerospace Centre: research and development in aerospace, including data-driven aircraft maintenance.',
      'Nederlands Lucht- en Ruimtevaartcentrum: onderzoek en ontwikkeling in de lucht- en ruimtevaart, onder meer voor datagestuurd vliegtuigonderhoud.',
      'Niederländisches Luft- und Raumfahrtzentrum: Forschung und Entwicklung in der Luft- und Raumfahrt, unter anderem für datengestützte Flugzeugwartung.') },
  { id: 'higheye', naam: 'High Eye', region: 'Benelux', url: 'https://www.higheye.com/', logo: 'higheye', w: 294, h: 94,
    text: L('Developer of the Airboxer unmanned helicopter system for surveillance, mapping and inspection of critical infrastructure.',
      'Ontwikkelaar van de Airboxer, een onbemand helikoptersysteem voor bewaking, kartering en inspectie van kritieke infrastructuur.',
      'Entwickler des unbemannten Hubschraubersystems Airboxer für Überwachung, Kartierung und Inspektion kritischer Infrastruktur.') },
  { id: 'deal', naam: 'Deal Drechtsteden', region: 'Benelux', url: 'https://dealdrechtcities.nl/', logo: 'deal-drechtsteden', w: 305, h: 91,
    text: L('Connects companies, young talent and government to move the Drechtsteden region forward together.',
      'Verbindt bedrijven, young talent en overheid om samen de Drechtsteden vooruit te brengen.',
      'Verbindet Unternehmen, junge Talente und Behörden, um die Region Drechtsteden gemeinsam voranzubringen.') },
  { id: 'itanks', naam: 'iTanks', region: 'Benelux', url: 'https://itanks.eu/', logo: 'itanks', w: 370, h: 140,
    text: L('Innovation engine of the Dutch port areas, connecting companies around shared innovation challenges.',
      'De innovatiemotor van de havengebieden, die bedrijven verbindt rond gezamenlijke innovatievraagstukken.',
      'Innovationsmotor der niederländischen Hafengebiete, der Unternehmen rund um gemeinsame Innovationsfragen verbindet.') },
  { id: 'aanvalsplan', naam: 'Aanvalsplan Techniek', region: 'Benelux', url: 'https://aanvalsplantechniek.nl/', logo: 'aanvalsplan-techniek', w: 400, h: 55,
    text: L('Joint ambition of employers, unions, government and education to secure enough technical talent.',
      'Gezamenlijke ambitie van werkgevers, vakbonden, overheid en onderwijs om voldoende technisch talent te borgen.',
      'Gemeinsame Initiative von Arbeitgebern, Gewerkschaften, Staat und Bildung für ausreichend technische Fachkräfte.') },
  { id: 'independables', naam: 'The Independables', region: 'Benelux / DACH', url: 'https://www.theindependables.com/', logo: 'the-independables', w: 311, h: 58,
    text: L('Network of independent professionals for business transformation: empowering people, transforming organisations.',
      'Netwerk van zelfstandige professionals voor bedrijfstransformatie: mensen versterken, organisaties veranderen.',
      'Netzwerk unabhängiger Fachleute für Unternehmenstransformation: Menschen stärken, Organisationen verändern.') },
  { id: 'x-elance', naam: 'X-elance', region: 'DACH', url: 'https://x-elance.com/', logo: 'x-elance', w: 400, h: 98,
    text: L('Systems for internal and customer communication and collaboration, from interactive management systems to customer engagement.',
      'Systemen voor interne en klantcommunicatie en samenwerking, van interactieve managementsystemen tot customer engagement.',
      'Systeme für interne und Kundenkommunikation und Zusammenarbeit, von interaktiven Managementsystemen bis Customer Engagement.') },
  { id: 'fft', naam: 'FFT International Food Specialties', region: 'Benelux', url: 'https://fftint.com/', logo: 'fft-international', w: 262, h: 140,
    text: L('European food sourcing and export partner that connects buyers worldwide with quality European food.',
      'Europese partner voor inkoop en export van voeding, die kopers wereldwijd verbindt met kwalitatief Europees voedsel.',
      'Europäischer Partner für Lebensmittelbeschaffung und -export, der Käufer weltweit mit europäischen Qualitätslebensmitteln verbindet.') },
  { id: 'amalthea', naam: 'Amalthea', region: 'Benelux', url: 'https://amalthea.nl/en/home/', logo: 'amalthea', w: 229, h: 140,
    text: L('Producer of cheeses, dairy products and ingredients, combining craftsmanship with innovation.',
      'Producent van kazen, zuivelproducten en ingrediënten, met een combinatie van vakmanschap en innovatie.',
      'Hersteller von Käse, Milchprodukten und Zutaten, der Handwerk mit Innovation verbindet.') },
  { id: 'bnz', naam: 'Bildungsnetz Zug', region: 'DACH', url: 'https://www.bildungsnetzzug.ch/', logo: 'bildungsnetz-zug', w: 213, h: 111,
    text: L('Education network in the canton of Zug that brings together training offers for companies and learners.',
      'Onderwijsnetwerk in kanton Zug dat opleidingsaanbod voor bedrijven en lerenden samenbrengt.',
      'Bildungsnetzwerk im Kanton Zug, das Bildungsangebote für Unternehmen und Lernende bündelt.') },
  { id: 'easyenergy', naam: 'EasyEnergy Consulting & Technology', region: 'DACH', url: 'https://eecc.swiss/', logo: 'easyenergy', w: 400, h: 116,
    text: L('Swiss consultancy for industrial maintenance management, valves, sensors and actuators.',
      'Zwitsers adviesbureau voor industrieel onderhoudsmanagement, kleppen, sensoren en actuatoren.',
      'Schweizer Beratung für industrielles Instandhaltungsmanagement, Ventile, Sensoren und Aktoren.') },
  { id: 'hslu', naam: 'Lucerne University of Applied Sciences (HSLU)', region: 'DACH', url: 'https://www.hslu.ch/de-ch/informatik/studium/bachelor/immersive-technologies/', logo: 'hslu', w: 316, h: 48,
    text: L('Bachelor in Immersive Technologies: AR, VR and games for applications in many industries.',
      'Bachelor Immersive Technologies: AR, VR en games voor toepassingen in uiteenlopende sectoren.',
      'Bachelor Immersive Technologies: AR, VR und Games für Anwendungen in verschiedensten Branchen.') },
  { id: 'afca', naam: 'afca.', region: 'DACH', url: 'https://afca.ch/en/', logo: 'afca', w: 129, h: 140,
    text: L('Applied spatial AI: digital assistants, training solutions and spatial applications for people who work hands-on.',
      'Toegepaste spatial AI: digitale assistenten, trainingsoplossingen en ruimtelijke toepassingen voor mensen die met hun handen werken.',
      'Angewandte Spatial AI: digitale Assistenten, Trainingslösungen und räumliche Anwendungen für Menschen, die mit den Händen arbeiten.') },
  { id: 'swizz', naam: 'Swizz.ai', region: 'DACH', url: 'https://swizz.ai/', logo: 'swizz-ai', w: 196, h: 64,
    text: L('Swiss AI website builder that creates websites, logos and social media posts in minutes.',
      'Zwitserse AI-websitebouwer die in enkele minuten websites, logo’s en socialmediaposts maakt.',
      'Schweizer KI-Website-Baukasten, der in Minuten Websites, Logos und Social-Media-Beiträge erstellt.') },
  { id: 'syntech', naam: 'Syntech', region: 'DACH', url: 'https://syn-tech.ch/', logo: 'syn-tech', w: 376, h: 64,
    text: L('Develops websites, apps, CRM and marketing solutions for Swiss SMEs, from Uznach and Stansstad.',
      'Ontwikkelt websites, apps, CRM- en marketingoplossingen voor Zwitserse mkb-bedrijven, vanuit Uznach en Stansstad.',
      'Entwickelt Websites, Apps, CRM- und Marketinglösungen für Schweizer KMU, mit Standorten in Uznach und Stansstad.') },
  { id: 'digitalveterans', naam: 'Digital Veterans Association', region: 'DACH', url: 'https://www.digitalveterans.com/', logo: 'digital-veterans', w: 377, h: 140,
    text: L('Association that empowers the next generation of digital leaders through knowledge sharing and talent development.',
      'Vereniging die de volgende generatie digitale leiders versterkt met kennisdeling en talentontwikkeling.',
      'Verband, der die nächste Generation digitaler Führungskräfte durch Wissensvermittlung und Talentförderung stärkt.') },
  { id: 'ima', naam: 'International Maintenance Association (IMA)', region: 'Global', url: 'https://www.ima-world.org/', logo: 'ima', w: 400, h: 137,
    text: L('Swiss non-profit for the maintenance profession and organiser of the World Maintenance Forum.',
      'Zwitserse non-profit voor het onderhoudsvak en organisator van het World Maintenance Forum.',
      'Schweizer Non-Profit-Organisation für die Instandhaltung und Veranstalter des World Maintenance Forum.') },
];

export const networkCopy: Record<Locale, { eyebrow: string; title: string; lead: string; regions: Record<Region, string>; visit: string }> = {
  en: {
    eyebrow: 'Network',
    title: 'Our network and ecosystem partners',
    lead: 'Besides our implementation partners, we work with industry networks, knowledge institutes and companies in the Benelux and DACH region.',
    regions: { Benelux: 'Benelux', DACH: 'DACH', 'Benelux / DACH': 'Benelux / DACH', Global: 'Global' },
    visit: 'Visit website',
  },
  nl: {
    eyebrow: 'Netwerk',
    title: 'Ons netwerk en onze ecosysteempartners',
    lead: 'Naast onze implementatiepartners werken we samen met branchenetwerken, kennisinstellingen en bedrijven in de Benelux en DACH.',
    regions: { Benelux: 'Benelux', DACH: 'DACH', 'Benelux / DACH': 'Benelux / DACH', Global: 'Wereldwijd' },
    visit: 'Naar website',
  },
  de: {
    eyebrow: 'Netzwerk',
    title: 'Unser Netzwerk und unsere Ökosystempartner',
    lead: 'Neben unseren Implementierungspartnern arbeiten wir mit Branchennetzwerken, Wissenseinrichtungen und Unternehmen in Benelux und DACH zusammen.',
    regions: { Benelux: 'Benelux', DACH: 'DACH', 'Benelux / DACH': 'Benelux / DACH', Global: 'Weltweit' },
    visit: 'Zur Website',
  },
};
