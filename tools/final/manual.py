"""Final copy for spots where a placeholder cannot simply be removed. (key, path) -> (nl, en, de) | DEL | {'section': {...}}"""
DEL = 'DEL'

def row(*cells_by_locale):
    return cells_by_locale

M = {
 # contact & company facts that are not public yet: leave them out instead of showing a placeholder
 ('contact', '.sections[1].rows[2]'): DEL,
 ('contact', '.sections[1].rows[3]'): DEL,
 ('company', '.sections[1].rows[4]'): DEL,
 ('company', '.sections[1].rows[5]'): DEL,
 ('team', '.sections[2].rows[2]'): DEL,
 ('demo', '.sections[2].body[0]'): (
  'Het gesprek duurt 30 minuten en vindt online plaats; op verzoek komen we langs op locatie. Je spreekt direct met Jack Kessels (Benelux) of Mark Dercksen (DACH).',
  'The call takes 30 minutes and is held online; on request we visit you on site. You talk directly to Jack Kessels (Benelux) or Mark Dercksen (DACH).',
  'Das Gespräch dauert 30 Minuten und findet online statt; auf Wunsch kommen wir zu Ihnen vor Ort. Sie sprechen direkt mit Mark Dercksen (DACH) oder Jack Kessels (Benelux).'),
 ('hwHololens', '.sections[2].rows[3][3]'): ('Ondersteuning per model toetsen we in de intake', 'Support per model is checked in the intake', 'Unterstützung je Modell prüfen wir im Erstgespräch'),
 ('home', '.sections[6].rows[0][2]'): ('Gemiddeld 30–40% korter bij DeepSight-klanten', 'On average 30–40% shorter at DeepSight customers', 'Im Schnitt 30–40% kürzer bei DeepSight-Kunden'),
 ('home', '.sections[6].rows[1][2]'): ('Gemeten tegen je nulmeting in de pilot', 'Measured against your baseline in the pilot', 'Gemessen an Ihrer Ausgangsmessung im Pilot'),
 ('home', '.sections[6].rows[2][2]'): ('Gemeten tegen je nulmeting in de pilot', 'Measured against your baseline in the pilot', 'Gemessen an Ihrer Ausgangsmessung im Pilot'),
 ('home', '.sections[6].rows[3][2]'): ('Registratie per uitvoering, direct te exporteren', 'A record per execution, ready to export', 'Aufzeichnung je Ausführung, direkt exportierbar'),
 ('roiCalculator', '.sections[1].rows[2][2]'): ('Pilotdoel; de calculator rekent standaard met 40%', 'Pilot target; the calculator uses 40% by default', 'Pilotziel; der Rechner nutzt standardmäßig 40%'),
 ('roiCalculator', '.sections[1].rows[7][2]'): ('Pilotdoel; de calculator rekent standaard met 50%', 'Pilot target; the calculator uses 50% by default', 'Pilotziel; der Rechner nutzt standardmäßig 50%'),
 ('roiCalculator', '.sections[1].rows[10][2]'): ('Pilotdoel; de calculator rekent standaard met 40%', 'Pilot target; the calculator uses 40% by default', 'Pilotziel; der Rechner nutzt standardmäßig 40%'),
 ('videos', '.sections[2].body[0]'): (
  'Wil je een video zien of het platform live bekijken? Vraag de video aan via hello@actarion.com of plan een gesprek; we laten je de toepassing zien die bij jouw proces past.',
  'Want to watch a video or see the platform live? Request the video via hello@actarion.com or book a call; we show you the use case that fits your process.',
  'Möchten Sie ein Video sehen oder die Plattform live erleben? Fordern Sie das Video über hello@actarion.com an oder vereinbaren Sie ein Gespräch; wir zeigen Ihnen die Anwendung, die zu Ihrem Prozess passt.'),
 ('whitepapers', '.sections[1].h2'): ('Welke whitepapers zijn er?', 'Which whitepapers are available?', 'Welche Whitepaper gibt es?'),
 ('pfIntegrations', '.sections[2].rows[1][2]'): ('Via API of CSV-export; scope per project', 'Through API or CSV export; scope per project', 'Über API oder CSV-Export; Umfang je Projekt'),
 ('pfIntegrations', '.sections[2].rows[2][2]'): ('Via API; scope per project', 'Through the API; scope per project', 'Über die API; Umfang je Projekt'),
 ('pfIntegrations', '.sections[2].rows[3][2]'): ('Via API of CSV-export', 'Through API or CSV export', 'Über API oder CSV-Export'),
 ('pfIntegrations', '.sections[2].rows[4][2]'): ('Microsoft Entra ID (Azure AD)', 'Microsoft Entra ID (Azure AD)', 'Microsoft Entra ID (Azure AD)'),
 ('partnerBecome', '.sections[3].body[0]'): (
  'Partners leveren en implementeren DeepSight-oplossingen bij hun eigen klanten: ze maken trainingen en werkinstructies in DeepSight Studio en begeleiden de uitrol. ActARion is de Europese partner voor licenties, training en ondersteuning. De voorwaarden en het partnermodel bespreken we in een kennismakingsgesprek.',
  'Partners deliver and implement DeepSight solutions for their own clients: they build training and work instructions in DeepSight Studio and guide the roll-out. ActARion is the European partner for licences, training and support. We discuss the terms and the partner model in an introductory call.',
  'Partner liefern und implementieren DeepSight-Lösungen bei ihren eigenen Kunden: Sie erstellen Schulungen und Arbeitsanweisungen in DeepSight Studio und begleiten den Rollout. ActARion ist der europäische Partner für Lizenzen, Schulung und Support. Bedingungen und Partnermodell besprechen wir in einem Kennenlerngespräch.'),
 ('pfSecurity', '.sections[2].steps[1].text'): (
  'Het platform draait in de cloud bij gespecialiseerde hostingproviders, of op verzoek in je eigen omgeving. De datalocatie leggen we vast in het contract.',
  'The platform runs in the cloud with specialised hosting providers, or on request in your own environment. The data location is fixed in the contract.',
  'Die Plattform läuft in der Cloud bei spezialisierten Hosting-Anbietern oder auf Wunsch in Ihrer eigenen Umgebung. Den Datenstandort legen wir im Vertrag fest.'),
 ('pfSecurity', '.sections[2].steps[2].text'): (
  'Rolgebaseerde rechten bepalen wie inhoud en uitvoeringsdata ziet. Inloggen kan met Microsoft Entra ID (Azure AD).',
  'Role-based permissions determine who sees content and execution data. Users can sign in with Microsoft Entra ID (Azure AD).',
  'Rollenbasierte Rechte legen fest, wer Inhalte und Ausführungsdaten sieht. Die Anmeldung ist über Microsoft Entra ID (Azure AD) möglich.'),
 ('pfSecurity', '.sections[2].steps[3].text'): (
  'DeepSight publiceert zijn beveiligingsdocumentatie in het DeepSight Trust Center. De certificaten en rapporten die je IT-afdeling nodig heeft, vragen we voor je op.',
  'DeepSight publishes its security documentation in the DeepSight Trust Center. We request the certificates and reports your IT department needs.',
  'DeepSight veröffentlicht seine Sicherheitsdokumentation im DeepSight Trust Center. Die Zertifikate und Berichte, die Ihre IT benötigt, fordern wir für Sie an.'),
 ('pfSecurity', '.sections[2].steps[4].text'): (
  'DeepSight publiceert een [Trust Center](https://trust.deepsight.ca) en een [privacybeleid](https://www.deepsight.ca/privacy-policy/).',
  'DeepSight publishes a [Trust Center](https://trust.deepsight.ca) and a [privacy policy](https://www.deepsight.ca/privacy-policy/).',
  'DeepSight veröffentlicht ein [Trust Center](https://trust.deepsight.ca) und eine [Datenschutzerklärung](https://www.deepsight.ca/privacy-policy/).'),
 ('pfAi', '.sections[3].rows[4][2]'): ('Tot 85% sneller (opgave DeepSight)', 'Up to 85% faster (DeepSight figure)', 'Bis zu 85% schneller (Angabe DeepSight)'),
 ('pfAi', '.sections[5].items[0]'): (
  '**Invoer:** Word, pdf, beelden en opnames uit de capture-app, plus 3D-modellen in gangbare formaten zoals GLB, FBX, OBJ en STEP.',
  '**Input:** Word, PDF, images and recordings from the capture app, plus 3D models in common formats such as GLB, FBX, OBJ and STEP.',
  '**Eingabe:** Word, PDF, Bilder und Aufnahmen aus der Capture-App sowie 3D-Modelle in gängigen Formaten wie GLB, FBX, OBJ und STEP.'),
 ('platform', '.sections[5].items[2]'): (
  '**Cloud:** inhoud en data worden centraal beheerd, in de cloud of op verzoek in je eigen omgeving.',
  '**Cloud:** content and data are managed centrally, in the cloud or on request in your own environment.',
  '**Cloud:** Inhalte und Daten werden zentral verwaltet, in der Cloud oder auf Wunsch in Ihrer eigenen Umgebung.'),
 ('indPharma', '.sections[2].body[0]'): (
  'Validatie gebeurt binnen je eigen kwaliteitssysteem, voor het beoogde gebruik. Wij leveren documentatie over het platform en richten rollen, goedkeuringen en audit trail mee in.',
  'Validation takes place within your own quality system, for the intended use. We provide documentation on the platform and help set up roles, approvals and the audit trail.',
  'Die Validierung erfolgt in Ihrem eigenen Qualitätssystem für den vorgesehenen Einsatz. Wir liefern Dokumentation zur Plattform und richten Rollen, Freigaben und Audit Trail mit ein.'),
}

# whole sections that are replaced (tables full of unknown dates/events)
SECTION = {
 ('events', 1): (
  {'kind': 'text', 'h2': 'Welke events komen eraan?', 'body': ['Nieuwe webinars en beurzen kondigen we aan via [LinkedIn](https://www.linkedin.com/company/actarion/) en de nieuwsbrief. Wil je een sessie voor je eigen team? [Plan een gesprek](/nl/demo/).']},
  {'kind': 'text', 'h2': 'Which events are coming up?', 'body': ['We announce new webinars and trade fairs on [LinkedIn](https://www.linkedin.com/company/actarion/) and in the newsletter. Want a session for your own team? [Book a call](/en/demo/).']},
  {'kind': 'text', 'h2': 'Welche Events stehen an?', 'body': ['Neue Webinare und Messen kündigen wir auf [LinkedIn](https://www.linkedin.com/company/actarion/) und im Newsletter an. Sie möchten eine Session für Ihr eigenes Team? [Gespräch vereinbaren](/de/demo/).']}),
 ('news', 0): (
  {'kind': 'text', 'h2': 'Wat is het laatste nieuws?', 'body': ['Nieuws over partnerschappen, events en klantprojecten delen we op [LinkedIn](https://www.linkedin.com/company/actarion/). Volg ActARion daar of meld je aan voor de nieuwsbrief.']},
  {'kind': 'text', 'h2': 'What is the latest news?', 'body': ['We share news about partnerships, events and customer projects on [LinkedIn](https://www.linkedin.com/company/actarion/). Follow ActARion there or sign up for the newsletter.']},
  {'kind': 'text', 'h2': 'Was gibt es Neues?', 'body': ['Neuigkeiten zu Partnerschaften, Events und Kundenprojekten teilen wir auf [LinkedIn](https://www.linkedin.com/company/actarion/). Folgen Sie ActARion dort oder melden Sie sich für den Newsletter an.']}),
}
# drop a table column (videos: unknown lengths)
DROP_COL = {('videos', 1): 2}
# status column of whitepaper table
CELL_ALL = {('whitepapers', 1, 2): ('Beschikbaar', 'Available', 'Verfügbar')}

M.update({
 ('demo', '.sections[4].items[2]'): ('Een lokaal aanspreekpunt in de Benelux of DACH.', 'Local contact in Benelux or DACH.', 'Ein Ansprechpartner vor Ort in DACH oder Benelux.'),
 ('partnerBecome', '.faq[1].a'): ('De Benelux en DACH.', 'Benelux and DACH.', 'DACH und Benelux.'),
 ('hwHololens', '.sections[5].items[0]'): (
  '**Ondersteuning HoloLens 2 op het platform:** de DeepSight-app draait op HoloLens 2, met inloggen via Microsoft Entra ID (Azure AD).',
  '**HoloLens 2 support on the platform:** the DeepSight app runs on HoloLens 2, with sign-in through Microsoft Entra ID (Azure AD).',
  '**HoloLens-2-Unterstützung der Plattform:** Die DeepSight-App läuft auf HoloLens 2, mit Anmeldung über Microsoft Entra ID (Azure AD).'),
 ('hwVisionPro', '.sections[5].items[0]'): (
  '**Platformondersteuning:** de DeepSight-app is beschikbaar voor Apple Vision Pro; we testen je instructies op het toestel tijdens de pilot.',
  '**Platform support:** the DeepSight app is available for Apple Vision Pro; we test your instructions on the device during the pilot.',
  '**Plattformunterstützung:** Die DeepSight-App ist für Apple Vision Pro verfügbar; im Pilot testen wir Ihre Anweisungen auf dem Gerät.'),
 ('hwAndroidXr', '.sections[5].items[2]'): (
  '**Platformondersteuning:** of de DeepSight-app op een specifiek Android XR-toestel draait, toetsen we in de intake; tablets en smartphones zijn de veilige start.',
  '**Platform support:** whether the DeepSight app runs on a specific Android XR device is checked in the intake; tablets and smartphones are the safe start.',
  '**Plattformunterstützung:** Ob die DeepSight-App auf einem bestimmten Android-XR-Gerät läuft, prüfen wir im Erstgespräch; Tablets und Smartphones sind der sichere Start.'),
 ('pfAnalytics', '.sections[6].items[2]'): (
  '**Bewaartermijn:** stem je af op je kwaliteitssysteem en de AVG; we leggen de termijn vast in de verwerkersovereenkomst.',
  '**Retention:** align it with your quality system and the GDPR; we fix the period in the data processing agreement.',
  '**Aufbewahrung:** Stimmen Sie sie auf Ihr Qualitätssystem und die DSGVO ab; wir legen die Frist im Auftragsverarbeitungsvertrag fest.'),
 ('pfAr', '.sections[6].items[2]'): (
  '**Offline gebruik:** het platform is cloudgebaseerd; werken zonder verbinding testen we per toestel in de pilot.',
  '**Offline use:** the platform is cloud-based; working without a connection is tested per device in the pilot.',
  '**Offline-Nutzung:** Die Plattform ist cloudbasiert; das Arbeiten ohne Verbindung testen wir je Gerät im Pilot.'),
 ('pfIntegrations', '.sections[5].items[1]'): (
  '**Authenticatie en API-documentatie:** API-toegang en documentatie krijg je bij de start van het integratieproject; gebruikers loggen in via Microsoft Entra ID (Azure AD).',
  '**Authentication and API documentation:** you receive API access and documentation at the start of the integration project; users sign in through Microsoft Entra ID (Azure AD).',
  '**Authentifizierung und API-Dokumentation:** API-Zugang und Dokumentation erhalten Sie zum Start des Integrationsprojekts; Nutzer melden sich über Microsoft Entra ID (Azure AD) an.'),
 ('pfMultilingual', '.sections[5].items[0]'): (
  '**Talen:** trainingsmodules zijn beschikbaar in de taal van je teams; welke talen je nodig hebt, leggen we vast in de intake.',
  '**Languages:** training modules are available in your teams’ languages; we record which languages you need in the intake.',
  '**Sprachen:** Schulungsmodule gibt es in der Sprache Ihrer Teams; welche Sprachen Sie brauchen, halten wir im Erstgespräch fest.'),
 ('pfMultilingual', '.sections[5].items[1]'): (
  '**Taal van de app:** de interfacetaal stem je af per gebruiker; de beschikbare talen bevestigen we in de intake.',
  '**Interface language:** the interface language is set per user; we confirm the available languages in the intake.',
  '**Sprache der App:** Die Oberflächensprache wird je Nutzer eingestellt; die verfügbaren Sprachen bestätigen wir im Erstgespräch.'),
 ('pfRemote', '.sections[5].items[1]'): (
  '**Kant van de expert:** de expert werkt op een laptop of pc met browser, of op een mobiel toestel.',
  '**Expert side:** the expert works on a laptop or PC with a browser, or on a mobile device.',
  '**Expertenseite:** Der Experte arbeitet am Laptop oder PC mit Browser oder auf einem Mobilgerät.'),
 ('pfSkills', '.sections[6].items[1]'): (
  '**Verloop:** leg per vaardigheid vast hoe lang een kwalificatie geldig is en plan hertoetsing; de skills matrix laat zien wie welke vaardigheid heeft.',
  '**Expiry:** record per skill how long a qualification is valid and schedule requalification; the skills matrix shows who has which skill.',
  '**Gültigkeit:** Legen Sie je Qualifikation fest, wie lange sie gilt, und planen Sie die Wiederholungsprüfung; die Qualifikationsmatrix zeigt, wer welche Fähigkeit hat.'),
 ('contact', '.sections[3].steps[0].title'): ('We reageren binnen één werkdag.', 'We respond within one working day.', 'Wir antworten innerhalb eines Werktags.'),
})
M[('ucOnboarding', '.sections[4].items[2]')] = (
 'Wifi op de werkvloer. Werken zonder verbinding testen we per toestel in de pilot.',
 'Wi-Fi on the shop floor. Working without a connection is tested per device in the pilot.',
 'WLAN in der Halle. Das Arbeiten ohne Verbindung testen wir je Gerät im Pilot.')
