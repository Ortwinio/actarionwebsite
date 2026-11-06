/** Home page copy, verbatim from the design (Main.dc). */
import type { Locale } from '@/lib/locale';

type L3 = Record<Locale, string>;
const L = (nl: string, en: string, de: string): L3 => ({ nl, en, de });

export const homeText = {
  eyebrow: L('Digitale werkinstructies met AR · implementatiepartner in Europa', 'Digital work instructions with AR · implementation partner in Europe', 'Digitale Arbeitsanweisungen mit AR · Implementierungspartner in Europa'),
  h1: L('Werkinstructies die zich eerst bewijzen.', 'Work instructions that prove themselves first.', 'Arbeitsanweisungen, die sich zuerst beweisen.'),
  lead: L('Minder fouten, sneller inwerken en kortere stilstand, gemeten op uw eigen werkvloer. ActARion kiest met u het proces met de meeste impact, voert een meetbare pilot uit en laat de oplossing operationeel landen.', 'Fewer errors, faster onboarding and less downtime, measured on your own shop floor. ActARion picks the process with the most impact with you, runs a measurable pilot and makes the solution work in daily operations.', 'Weniger Fehler, schnellere Einarbeitung und kürzerer Stillstand, gemessen in Ihrer eigenen Produktion. ActARion wählt mit Ihnen den Prozess mit der größten Wirkung, führt einen messbaren Pilot durch und bringt die Lösung in den Betrieb.'),
  ctaDemo: L('Plan een gesprek met een expert', 'Book a call with an expert', 'Gespräch mit einem Experten'),
  ctaRoi: L('Bereken uw ROI', 'Calculate your ROI', 'ROI berechnen'),
  meta: L('30 minuten · vrijblijvend · met Jack (Benelux) of Mark (DACH)', '30 minutes · no obligation · with Jack (Benelux) or Mark (DACH)', '30 Minuten · unverbindlich · mit Jack (Benelux) oder Mark (DACH)'),
  heroAlt: L('Pentekening: handen in werkhandschoenen houden een tablet voor een afsluiter; het scherm markeert het handwiel en de draairichting', 'Pen drawing: gloved hands hold a tablet in front of a valve; the screen highlights the handwheel and turning direction', 'Federzeichnung: Hände in Arbeitshandschuhen halten ein Tablet vor ein Ventil; der Bildschirm markiert Handrad und Drehrichtung'),
  teaserEyebrow: L('Snelle ROI-check · 20 sec', 'Quick ROI check · 20 sec', 'Schneller ROI-Check · 20 Sek.'),
  teaserTitle: L('Wat levert het u per jaar op?', 'What could it save you per year?', 'Was bringt es Ihnen pro Jahr?'),
  teaserOps: L('Operators met SOP’s', 'Operators using SOPs', 'Werker mit SOPs'),
  teaserDt: L('Stilstand door fouten', 'Downtime from errors', 'Stillstand durch Fehler'),
  hYear: L('u/jr', 'h/yr', 'Std./J.'),
  teaserRes: L('Indicatie per jaar', 'Estimate per year', 'Schätzung pro Jahr'),
  teaserLink: L('Maak de volledige berekening (2 min) →', 'Run the full calculation (2 min) →', 'Vollständige Berechnung (2 Min.) →'),
  worksWith: L('Werkt met', 'Works with', 'Arbeitet mit'),
  devices: L('Tablet · smartphone · smart glasses', 'Tablet · smartphone · smart glasses', 'Tablet · Smartphone · Smart Glasses'),
  logo: L('Klantlogo', 'Customer logo', 'Kundenlogo'),
  probEyebrow: L('Begin bij uw probleem', 'Start with your problem', 'Beginnen Sie bei Ihrem Problem'),
  probTitle: L('Kies het proces dat u nu geld kost.', 'Pick the process that costs you money today.', 'Wählen Sie den Prozess, der Sie heute Geld kostet.'),
  allUc: L('Alle use cases →', 'All use cases →', 'Alle Anwendungen →'),
  more: L('Bekijk de aanpak →', 'See the approach →', 'Zum Vorgehen →'),
  byIndustry: L('Per branche:', 'By industry:', 'Nach Branche:'),
  pilotAlt: L('Pentekening van een medewerker met een Apple Vision Pro; zwevende SOP-panelen in Actarion-blauw tonen de huidige stap en een afgevinkte stap', 'Pen drawing of a person wearing an Apple Vision Pro; floating SOP panels in Actarion blue show the current step and a completed step', 'Federzeichnung einer Person mit Apple Vision Pro; schwebende SOP-Panels in Actarion-Blau zeigen den aktuellen und einen erledigten Schritt'),
  pilotEyebrow: L('De ActARion-pilot', 'The ActARion pilot', 'Der ActARion-Pilot'),
  pilotTitle: L('Klein starten. Hard meten. Dan pas schalen.', 'Start small. Measure hard. Then scale.', 'Klein starten. Hart messen. Dann skalieren.'),
  ctaPilot: L('Bespreek een pilot', 'Discuss a pilot', 'Pilot besprechen'),
  howApproach: L('Zo werkt de aanpak →', 'How the approach works →', 'So funktioniert das Vorgehen →'),
  roiEyebrow: L('ROI-calculator', 'ROI calculator', 'ROI-Rechner'),
  roiTitle: L('Reken het eerst door. Zonder e-mailadres.', 'Do the maths first. No email needed.', 'Erst durchrechnen. Ohne E-Mail-Adresse.'),
  roiText: L('Kies uw branche, schuif naar uw situatie en zie direct de besparing, terugverdientijd en ROI over drie jaar. Per use case of als snelle schatting.', 'Pick your industry, slide to your situation and instantly see savings, payback and three-year ROI. Per use case or as a quick estimate.', 'Wählen Sie Ihre Branche, stellen Sie Ihre Situation ein und sehen Sie sofort Einsparung, Amortisation und ROI über drei Jahre.'),
  roiCta: L('Start de ROI-calculator', 'Start the ROI calculator', 'ROI-Rechner starten'),
  exSave: L('Besparing per jaar', 'Savings per year', 'Einsparung pro Jahr'),
  exPay: L('Terugverdiend', 'Payback', 'Amortisiert'),
  exPayVal: L('15 mnd', '15 mo', '15 Mon.'),
  exRoi: L('ROI 3 jaar', '3-year ROI', 'ROI 3 Jahre'),
  exNote: L('Rekenvoorbeeld: 25 operators, 40 uur stilstand per jaar, gemiddelde impact, indicatieve kosten.', 'Worked example: 25 operators, 40 hours of downtime per year, typical impact, indicative costs.', 'Rechenbeispiel: 25 Werker, 40 Stunden Stillstand pro Jahr, typische Wirkung, Richtkosten.'),
  caseEyebrow: L('Praktijkcase', 'Customer story', 'Praxisbeispiel'),
  kpiCol: L('Onderdeel', 'Topic', 'Thema'),
  caseBadge: L('Geanonimiseerde DeepSight-klant', 'Anonymised DeepSight customer', 'Anonymisierter DeepSight-Kunde'),
  caseTitle: L('Voedingsmiddelenproducent, Noord-Amerika: AR-training voor opstart, reiniging en kwaliteit', 'Food manufacturer, North America: AR training for start-up, cleaning and quality', 'Lebensmittelhersteller, Nordamerika: AR-Schulung für Anfahren, Reinigung und Qualität'),
  base: L('Aanpak', 'Approach', 'Vorgehen'),
  after: L('Doel', 'Goal', 'Ziel'),
  quote: L('DeepSight-klanten melden 30 tot 40% kortere inwerktijd voor nieuwe medewerkers en minder fouten bij de eerste uitvoering.', 'DeepSight customers report 30 to 40% shorter training time for new staff and fewer first-time errors.', 'DeepSight-Kunden berichten von 30 bis 40% kürzerer Einarbeitung und weniger Fehlern bei der ersten Ausführung.'),
  quoteBy: L('Bron: AgFunderNews, februari 2026. Case op basis van openbare informatie; klantnaam weggelaten.', 'Source: AgFunderNews, February 2026. Case based on public information; customer name withheld.', 'Quelle: AgFunderNews, Februar 2026. Fall auf Basis öffentlicher Informationen; Kundenname weggelassen.'),
  whoEyebrow: L('Wie doet wat', 'Who does what', 'Wer macht was'),
  whoTitle: L('Powered by DeepSight. Operationeel gemaakt door ActARion.', 'Powered by DeepSight. Made operational by ActARion.', 'Powered by DeepSight. Einsatzbereit gemacht von ActARion.'),
  itTitle: L('Uw IT-team heeft vragen. Wij hebben het dossier.', 'Your IT team has questions. We have the dossier.', 'Ihre IT hat Fragen. Wir haben das Dossier.'),
  itText: L('Devices en toegang, data en opslaglocatie, koppelingen met CMMS, MES, QMS en LMS, offline gebruik.', 'Devices and access, data and storage location, integrations with CMMS, MES, QMS and LMS, offline use.', 'Geräte und Zugriff, Daten und Speicherort, Anbindung an CMMS, MES, QMS und LMS, Offline-Nutzung.'),
  itCta: L('Vraag het IT-dossier aan →', 'Request the IT dossier →', 'IT-Dossier anfordern →'),
  nextEyebrow: L('Kies uw volgende stap', 'Choose your next step', 'Wählen Sie Ihren nächsten Schritt'),
  nextTitle: L('Zo klein als u wilt. Zo concreet als nodig.', 'As small as you like. As concrete as needed.', 'So klein wie gewünscht. So konkret wie nötig.'),
  wpCover: L('AI- en AR-werkinstructies', 'AI and AR work instructions', 'KI- und AR-Arbeitsanweisungen'),
  wpCoverSub: L('Praktische gids voor operations-teams', 'A practical guide for operations teams', 'Praxisleitfaden für Betriebsteams'),
  wpEyebrow: L('Gratis whitepaper', 'Free whitepaper', 'Kostenloses Whitepaper'),
  wpTitle: L('Waar begint u, wat meet u en wanneer schaalt u op?', 'Where do you start, what do you measure and when do you scale?', 'Wo fangen Sie an, was messen Sie und wann skalieren Sie?'),
  wpText: L('Een compacte gids over use-case keuze, nulmeting, adoptie en het go/no-go-besluit.', 'A compact guide to use case choice, baseline, adoption and the go/no-go decision.', 'Ein kompakter Leitfaden zu Use-Case-Wahl, Ausgangsmessung, Akzeptanz und Go/No-Go.'),
  wpLabel: L('Zakelijk e-mailadres', 'Business email', 'Geschäftliche E-Mail'),
  wpPh: L('naam@bedrijf.nl', 'name@company.com', 'name@firma.de'),
  wpCta: L('Download de gids', 'Download the guide', 'Leitfaden herunterladen'),
  wpNote: L('Direct de pdf. Geen spam; afmelden kan altijd.', 'PDF straight away. No spam; unsubscribe any time.', 'Sofort als PDF. Kein Spam; jederzeit abbestellbar.'),
};

export const homeChecks = [L('Nulmeting vóór de start', 'Baseline before the start', 'Ausgangsmessung vor dem Start'), L('Go/no-go op echte data', 'Go/no-go on real data', 'Go/No-Go auf echten Daten'), L('Lokaal team in Benelux en DACH', 'Local team in Benelux and DACH', 'Lokales Team in Benelux und DACH')];

export const homeStats = [
  { n: '1–2', l: L('use cases per pilot, met vooraf vastgelegde KPI’s', 'use cases per pilot, with KPIs agreed upfront', 'Anwendungen je Pilot, mit vorab festgelegten KPIs') },
  { n: '3–5', l: L('kansrijke processen uit één discovery-sessie', 'promising processes from one discovery session', 'aussichtsreiche Prozesse aus einer Discovery-Session') },
  { n: '4', l: L('stappen van keuze tot onderbouwd go/no-go-besluit', 'steps from choice to a solid go/no-go decision', 'Schritte von der Wahl bis zur fundierten Go/No-Go-Entscheidung') },
  { n: '2', l: L('regio’s met een eigen managing partner: Benelux en DACH', 'regions with their own managing partner: Benelux and DACH', 'Regionen mit eigenem Managing Partner: Benelux und DACH') },
];

export const homeTrust = [L('AVG/GDPR', 'GDPR', 'DSGVO'), L('Cloud of eigen hosting', 'Cloud or self-hosted', 'Cloud oder eigenes Hosting'), L('SSO en rollen', 'SSO and roles', 'SSO und Rollen'), L('DeepSight Trust Center', 'DeepSight Trust Center', 'DeepSight Trust Center')];

export const homeCards = [
  { key: 'ucOnboarding', img: '/img/hero-tablet-ar.webp', alt: L('Pentekening van een tablet met AR-instructie voor een afsluiter', 'Pen drawing of a tablet with an AR instruction for a valve', 'Federzeichnung eines Tablets mit AR-Anleitung für ein Ventil'), kpi: L('meten op: inwerktijd', 'measure: time to competence', 'Messgröße: Einarbeitungszeit'), title: L('Inwerken en training', 'Onboarding and training', 'Einarbeitung und Schulung'), text: L('Nieuwe operators werken eerder zelfstandig, zonder dat er steeds een expert naast staat.', 'New operators work independently sooner, without an expert always beside them.', 'Neue Werker arbeiten früher selbstständig, ohne dass ständig ein Experte daneben steht.') },
  { key: 'ucChangeover', img: '/img/usecase-changeover.webp', alt: L('Pentekening van een changeover aan een flessenlijn: handen wisselen een formaatdeel, de stappen staan op een tablet', 'Pen drawing of a changeover on a bottling line: hands swap a format part, the steps are on a tablet', 'Federzeichnung einer Umrüstung an einer Abfüllanlage: Hände wechseln ein Formatteil, die Schritte stehen auf einem Tablet'), kpi: L('meten op: first time right · wisseltijd', 'measure: first time right · changeover time', 'Messgröße: First Time Right · Rüstzeit'), title: L('Changeovers en assemblage', 'Changeovers and assembly', 'Umrüsten und Montage'), text: L('Elke wissel volgens dezelfde stappen, met controles die niet over te slaan zijn.', 'Every changeover follows the same steps, with checks that cannot be skipped.', 'Jede Umrüstung nach denselben Schritten, mit Prüfungen, die sich nicht überspringen lassen.') },
  { key: 'ucMaintenance', img: '/img/usecase-maintenance.webp', alt: L('Pentekening van onderhoud aan een pompset: een hand zet met een ringsleutel een koppelingsbout vast', 'Pen drawing of maintenance on a pump set: a hand tightens a coupling bolt with a ring spanner', 'Federzeichnung einer Pumpenwartung: eine Hand zieht mit einem Ringschlüssel eine Kupplungsschraube an'), kpi: L('meten op: downtime · MTTR', 'measure: downtime · MTTR', 'Messgröße: Stillstand · MTTR'), title: L('Onderhoud en storingen', 'Maintenance and faults', 'Wartung und Störungen'), text: L('Technici volgen bewezen procedures en halen op afstand een expert erbij als het vastloopt.', 'Technicians follow proven procedures and bring in a remote expert when they get stuck.', 'Techniker folgen bewährten Abläufen und holen per Fernzugriff einen Experten dazu, wenn es hakt.') },
];

export const homeIndustries = [
  { key: 'indManufacturing', l: L('Maakindustrie', 'Manufacturing', 'Fertigung') },
  { key: 'indPharma', l: L('Pharma en biotech', 'Pharma and biotech', 'Pharma und Biotech') },
  { key: 'indFood', l: L('Food en beverage', 'Food and beverage', 'Lebensmittel') },
  { key: 'indEnergy', l: L('Energie en utilities', 'Energy and utilities', 'Energie und Versorger') },
  { key: 'indAerospace', l: L('Lucht- en ruimtevaart', 'Aerospace', 'Luft- und Raumfahrt') },
  { key: 'indField', l: L('Field service', 'Field service', 'Außendienst') },
];

export const homeSteps = [
  [L('Kies het proces', 'Choose the process', 'Prozess wählen'), L('Samen met operations, quality, HR en IT kiezen we de taak waar fouten, training of stilstand aantoonbaar geld kosten.', 'With operations, quality, HR and IT we pick the task where errors, training or downtime demonstrably cost money.', 'Mit Betrieb, Qualität, HR und IT wählen wir die Aufgabe, bei der Fehler, Schulung oder Stillstand nachweislich Geld kosten.')],
  [L('Leg de nulmeting vast', 'Record the baseline', 'Ausgangswert festhalten'), L('KPI’s, databronnen en go/no-go-criteria staan vast vóórdat er iets gebouwd wordt.', 'KPIs, data sources and go/no-go criteria are fixed before anything is built.', 'KPIs, Datenquellen und Go/No-Go-Kriterien stehen fest, bevor etwas gebaut wird.')],
  [L('Bouw op de werkvloer', 'Build on the shop floor', 'In der Produktion bauen'), L('De eerste instructies maken we met uw eigen experts, in de echte werkomgeving.', 'We create the first instructions with your own experts, in the real work environment.', 'Die ersten Anleitungen erstellen wir mit Ihren eigenen Experten, in der echten Arbeitsumgebung.')],
  [L('Meet en besluit', 'Measure and decide', 'Messen und entscheiden'), L('U krijgt een pilotrapport met resultaat, adoptie en een concrete route naar meer lijnen en locaties.', 'You get a pilot report with results, adoption and a concrete route to more lines and sites.', 'Sie erhalten einen Pilotbericht mit Ergebnis, Akzeptanz und einem konkreten Weg zu weiteren Linien und Standorten.')],
] as const;

export const homeKpis = [
  { k: L('Inwerken', 'Onboarding', 'Einarbeitung'), a: L('Kritieke procedures als AR-instructie op bril of tablet', 'Critical procedures as AR guides on glasses or tablet', 'Kritische Abläufe als AR-Anleitung auf Brille oder Tablet'), b: L('Iedereen op dezelfde manier ingewerkt', 'Everyone trained the same way', 'Alle gleich eingearbeitet') },
  { k: L('Taal', 'Language', 'Sprache'), a: L('Gesproken instructies in Frans, Engels en Spaans', 'Spoken instructions in French, English and Spanish', 'Gesprochene Anleitungen auf Französisch, Englisch und Spanisch'), b: L('Taalbarrières op de vloer weg', 'No language barriers on the floor', 'Keine Sprachbarrieren in der Produktion') },
  { k: L('Kennis', 'Knowledge', 'Wissen'), a: L('Instructies vastleggen met video en AI', 'Capturing instructions with video and AI', 'Anleitungen mit Video und KI erfassen'), b: L('Minder verlies door afwijkingen', 'Fewer losses from non-compliance', 'Weniger Verluste durch Abweichungen') },
];

export const homeRoles = [
  { k: 'DeepSight', v: L('Het platform: no-code werkinstructies, tablets en smart glasses, dataregistratie en remote support.', 'The platform: no-code work instructions, tablets and smart glasses, data capture and remote support.', 'Die Plattform: No-Code-Arbeitsanweisungen, Tablets und Smart Glasses, Datenerfassung und Remote-Support.') },
  { k: 'ActARion', v: L('Use-case keuze, pilot en meting, contentontwerp, implementatie, verandermanagement en opschaling in Europa.', 'Use case selection, pilot and measurement, content design, implementation, change management and scale-up in Europe.', 'Use-Case-Auswahl, Pilot und Messung, Content-Design, Implementierung, Change-Management und Skalierung in Europa.') },
  { k: 'Partners', v: L('Hardware, koppelingen met CMMS, MES, QMS en LMS, en training.', 'Hardware, integrations with CMMS, MES, QMS and LMS, and training.', 'Hardware, Anbindung an CMMS, MES, QMS und LMS sowie Schulung.') },
];

export const homeNext = [
  { key: 'roiCalculator', dark: false, meta: L('01 · 2 min', '01 · 2 min', '01 · 2 Min.'), title: L('ROI-berekening', 'ROI calculation', 'ROI-Berechnung'), text: L('Zie zelf wat het oplevert, zonder gesprek en zonder e-mailadres.', 'See what it yields yourself, no call and no email needed.', 'Sehen Sie selbst, was es bringt, ohne Gespräch und ohne E-Mail.'), cta: L('Start de calculator', 'Start the calculator', 'Rechner starten') },
  { key: 'demo', dark: false, meta: L('02 · 30–45 min', '02 · 30–45 min', '02 · 30–45 Min.'), title: L('Demo', 'Demo', 'Demo'), text: L('Zie hoe uw type werk eruitziet op tablet en smart glasses.', 'See how your type of work looks on tablet and smart glasses.', 'Sehen Sie, wie Ihre Arbeit auf Tablet und Smart Glasses aussieht.'), cta: L('Plan een demo', 'Book a demo', 'Demo vereinbaren') },
  { key: 'demo', dark: true, meta: L('03 · 6–8 weken', '03 · 6–8 weeks', '03 · 6–8 Wochen'), title: L('Pilot', 'Pilot', 'Pilot'), text: L('Valideer één proces met KPI’s, nulmeting en een helder besluitkader.', 'Validate one process with KPIs, a baseline and a clear decision framework.', 'Validieren Sie einen Prozess mit KPIs, Ausgangswert und klarem Entscheidungsrahmen.'), cta: L('Bespreek een pilot', 'Discuss a pilot', 'Pilot besprechen') },
  { key: 'demo', dark: false, meta: L('04 · binnen 5 werkdagen', '04 · within 5 working days', '04 · innerhalb von 5 Werktagen'), title: L('Offerte', 'Quote', 'Angebot'), text: L('Een voorstel op maat voor scope, locaties, devices en ondersteuning.', 'A tailored proposal for scope, sites, devices and support.', 'Ein maßgeschneidertes Angebot für Umfang, Standorte, Geräte und Support.'), cta: L('Vraag een offerte aan', 'Request a quote', 'Angebot anfordern') },
];
