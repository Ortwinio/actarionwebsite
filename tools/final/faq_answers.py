# id -> (nl, en, de)
OFFLINE = (
 "Het platform is cloudgebaseerd: instructies en resultaten synchroniseren via wifi of het mobiele netwerk. Of en hoe lang een toestel zonder verbinding kan werken, hangt af van het toestel en de opzet. Dat testen we in de pilot op de echte werkplek, voordat je ergens zonder dekking gaat werken.",
 "The platform is cloud-based: instructions and results sync over Wi-Fi or the mobile network. Whether and for how long a device can work without a connection depends on the device and the setup. We test this in the pilot at the real workstation before you rely on it in places without coverage.",
 "Die Plattform ist cloudbasiert: Anweisungen und Ergebnisse synchronisieren über WLAN oder Mobilfunk. Ob und wie lange ein Gerät ohne Verbindung arbeiten kann, hängt von Gerät und Einrichtung ab. Das testen wir im Pilot am echten Arbeitsplatz, bevor Sie sich an Orten ohne Netz darauf verlassen.")
PILOT = (
 "Meestal 6 tot 8 weken op één lijn of proces, inclusief het vastleggen van de eerste instructies in 1 tot 2 dagen. De KPI's spreken we vooraf af en meten we aan het eind, over meerdere ploegen.",
 "Usually 6 to 8 weeks on one line or process, including capturing the first instructions in 1 to 2 days. We agree the KPIs up front and measure them at the end, across several shifts.",
 "Meist 6 bis 8 Wochen an einer Linie oder einem Prozess, inklusive Erfassung der ersten Anweisungen in 1 bis 2 Tagen. Die KPIs vereinbaren wir vorab und messen sie am Ende über mehrere Schichten.")
HOSTING = (
 "Het DeepSight-platform draait in de cloud bij gespecialiseerde hostingproviders; op verzoek kan het ook in je eigen omgeving worden gehost. De hostinglocatie, ook als je die in de EU wilt, leggen we vóór de start vast in het contract en de verwerkersovereenkomst.",
 "The DeepSight platform runs in the cloud with specialised hosting providers; on request it can also be hosted in your own environment. The hosting location, including an EU location if you require one, is fixed in the contract and the data processing agreement before the start.",
 "Die DeepSight-Plattform läuft in der Cloud bei spezialisierten Hosting-Anbietern; auf Wunsch kann sie auch in Ihrer eigenen Umgebung betrieben werden. Den Hosting-Standort, auch wenn Sie die EU vorschreiben, legen wir vor dem Start im Vertrag und im Auftragsverarbeitungsvertrag fest.")
SECURITY = (
 "Het DeepSight-platform draait in de cloud bij gespecialiseerde hostingproviders; op verzoek kan het ook in je eigen omgeving worden gehost. Gebruikers loggen in met een eigen account of met Microsoft Entra ID (Azure AD), en rollen bepalen wie wat mag zien en wijzigen. Hostinglocatie, certificeringen en bewaartermijnen leggen we vast in de verwerkersovereenkomst; DeepSight publiceert zijn beveiligingsdocumentatie in het DeepSight Trust Center.",
 "The DeepSight platform runs in the cloud with specialised hosting providers; on request it can also be hosted in your own environment. Users sign in with their own account or with Microsoft Entra ID (Azure AD), and roles control who can see and change what. Hosting location, certifications and retention periods are set out in the data processing agreement; DeepSight publishes its security documentation in the DeepSight Trust Center.",
 "Die DeepSight-Plattform läuft in der Cloud bei spezialisierten Hosting-Anbietern; auf Wunsch auch in Ihrer eigenen Umgebung. Nutzer melden sich mit eigenem Konto oder über Microsoft Entra ID (Azure AD) an, und Rollen regeln, wer was sehen und ändern darf. Hosting-Standort, Zertifizierungen und Aufbewahrungsfristen halten wir im Auftragsverarbeitungsvertrag fest; DeepSight veröffentlicht seine Sicherheitsdokumentation im DeepSight Trust Center.")
AITRAIN = (
 "Je SOP's en instructies blijven je eigendom. Welke AI-diensten je inhoud verwerken, en dat die niet mag worden gebruikt om publieke AI-modellen te trainen, leggen we vast in de verwerkersovereenkomst met Actarion en DeepSight.",
 "Your SOPs and instructions remain your property. Which AI services process your content, and that it may not be used to train public AI models, is set out in the data processing agreement with Actarion and DeepSight.",
 "Ihre SOPs und Anweisungen bleiben Ihr Eigentum. Welche KI-Dienste Ihre Inhalte verarbeiten und dass sie nicht zum Training öffentlicher KI-Modelle genutzt werden dürfen, halten wir im Auftragsverarbeitungsvertrag mit Actarion und DeepSight fest.")
API = ("via de API of CSV-export", "through the API or CSV export", "über die API oder den CSV-Export")

A = {
 'dataSafe': (
  "Vraag elke leverancier waar data wordt verwerkt en of die wordt gebruikt om modellen te trainen. Bij Actarion draait het DeepSight-platform in de cloud, of op verzoek in je eigen omgeving. Waar je data staat en wat AI-diensten ermee mogen, leggen we vast in de verwerkersovereenkomst.",
  "Ask every vendor where data is processed and whether it is used for training. At Actarion, the DeepSight platform runs in the cloud or, on request, in your own environment. Where your data is stored and what AI services may do with it is set out in the data processing agreement.",
  "Fragen Sie jeden Anbieter, wo Daten verarbeitet werden und ob sie für das Training genutzt werden. Bei Actarion läuft die DeepSight-Plattform in der Cloud oder auf Wunsch in Ihrer eigenen Umgebung. Wo Ihre Daten liegen und was KI-Dienste damit dürfen, halten wir im Auftragsverarbeitungsvertrag fest."),
 'pilot': PILOT,
 'pilotSoftware': (
  "Lang genoeg om je KPI over echte diensten te meten. Bij Actarion is dat meestal 6 tot 8 weken op één lijn of proces.",
  "Long enough to measure your KPI on real shifts. At Actarion that is usually 6 to 8 weeks on one line or process.",
  "Lang genug, um Ihre KPI über echte Schichten zu messen. Bei Actarion sind das meist 6 bis 8 Wochen an einer Linie oder einem Prozess."),
 'tablets': (
  "Meestal wel. De DeepSight-app draait op iPad en op gangbare tablets en smartphones. Tijdens de intake toetsen we je toestellen; voor stoffige of natte omgevingen adviseren we een robuuste behuizing.",
  "Usually yes. The DeepSight app runs on iPad and on common tablets and smartphones. We check your devices during the intake; for dusty or wet environments we recommend a rugged case.",
  "Meist ja. Die DeepSight-App läuft auf dem iPad sowie auf gängigen Tablets und Smartphones. Im Erstgespräch prüfen wir Ihre Geräte; für staubige oder nasse Umgebungen empfehlen wir eine robuste Hülle."),
 'remoteSafe': (
  "Bij DeepSight Support kijkt de expert live mee via de camera van de operator en zet aantekeningen in beeld; alleen uitgenodigde gebruikers nemen deel. Hosting, toegang en bewaartermijnen leggen we vast in de verwerkersovereenkomst, en DeepSight publiceert zijn beveiligingsdocumentatie in het DeepSight Trust Center.",
  "With DeepSight Support the expert sees the operator's camera view live and annotates it; only invited users can join. Hosting, access and retention periods are set out in the data processing agreement, and DeepSight publishes its security documentation in the DeepSight Trust Center.",
  "Bei DeepSight Support sieht der Experte live das Kamerabild des Werkers und markiert darin; nur eingeladene Nutzer nehmen teil. Hosting, Zugriff und Aufbewahrungsfristen halten wir im Auftragsverarbeitungsvertrag fest, und DeepSight veröffentlicht seine Sicherheitsdokumentation im DeepSight Trust Center."),
 'webinars': (
  "Dat verschilt per webinar en staat bij de aanmelding. Kun je niet live meekijken? Vraag de opname of de slides aan via hello@actarion.com.",
  "That differs per webinar and is stated at registration. Can't attend live? Request the recording or the slides via hello@actarion.com.",
  "Das ist je Webinar unterschiedlich und steht bei der Anmeldung. Sie können nicht live dabei sein? Fordern Sie die Aufzeichnung oder die Folien über hello@actarion.com an."),
 'videos': (
  "Ja, voor interne presentaties en trainingen, met bronvermelding. Wil je ze buiten je organisatie gebruiken, vraag dan eerst toestemming via hello@actarion.com.",
  "Yes, for internal presentations and training, with attribution. If you want to use them outside your organisation, ask for permission first via hello@actarion.com.",
  "Ja, für interne Präsentationen und Schulungen, mit Quellenangabe. Für eine Nutzung außerhalb Ihrer Organisation fragen Sie bitte vorher über hello@actarion.com an."),
 'reference': (
  "Vraag ernaar tijdens de intake. Afhankelijk van je sector brengen we je in contact met een klant van Actarion of DeepSight, of lichten we een geanonimiseerde case toe, zoals die van de Noord-Amerikaanse voedingsproducent.",
  "Ask for it during the intake. Depending on your sector, we put you in touch with an Actarion or DeepSight customer, or walk you through an anonymised case such as the North American food manufacturer.",
  "Fragen Sie im Erstgespräch danach. Je nach Branche stellen wir den Kontakt zu einem Kunden von Actarion oder DeepSight her oder erläutern einen anonymisierten Fall, etwa den des nordamerikanischen Lebensmittelherstellers."),
 'cwpMes': (
  "Nee. Een MES stuurt productieorders en machines aan. Een connected worker platform ondersteunt de mensen die het werk doen. Ze vullen elkaar aan: uitvoeringsdata gaan via de API of CSV-export naar je MES of ERP.",
  "No. An MES controls production orders and machines. A connected worker platform supports the people doing the work. The two complement each other: execution data flows to your MES or ERP through the API or CSV export.",
  "Nein. Ein MES steuert Fertigungsaufträge und Maschinen. Ein Werkerassistenzsystem unterstützt die Menschen, die die Arbeit machen. Beide ergänzen sich: Ausführungsdaten fließen über die API oder den CSV-Export in Ihr MES oder ERP."),
 'security': SECURITY,
 'offline': OFFLINE,
 'devices': (
  "iPad en andere tablets en smartphones, plus AR-brillen zoals Apple Vision Pro en HoloLens 2. Of een specifieke Android XR-bril wordt ondersteund, checken we in de intake; daar kiezen we ook het toestel dat bij je werkplek past.",
  "iPad and other tablets and smartphones, plus AR glasses such as Apple Vision Pro and HoloLens 2. Whether a specific Android XR headset is supported is checked in the intake, where we also choose the device that fits your workstation.",
  "iPad und andere Tablets und Smartphones sowie AR-Brillen wie Apple Vision Pro und HoloLens 2. Ob eine bestimmte Android-XR-Brille unterstützt wird, prüfen wir im Erstgespräch; dort wählen wir auch das passende Gerät für Ihren Arbeitsplatz."),
 'mesErp': (
  "Uitvoerings- en vaardigheidsdata gaan via de API of CSV-export naar je ERP, MES of BI-tools zoals Power BI, en gebruikers kunnen inloggen met Microsoft Entra ID (Azure AD). Welke koppeling nodig is, bepalen we per project; voor een pilot is meestal geen koppeling nodig.",
  "Execution and skills data flows to your ERP, MES or BI tools such as Power BI through the API or CSV export, and users can sign in with Microsoft Entra ID (Azure AD). Which integration you need is decided per project; a pilot usually needs none.",
  "Ausführungs- und Qualifikationsdaten fließen über die API oder den CSV-Export in Ihr ERP, MES oder BI-Tools wie Power BI, und Nutzer können sich mit Microsoft Entra ID (Azure AD) anmelden. Welche Anbindung nötig ist, entscheiden wir je Projekt; für einen Pilot ist meist keine nötig."),
 'expertTime': (
  "De expert doet zijn werk zoals altijd terwijl het wordt opgenomen, en controleert daarna het AI-concept. Volgens DeepSight gaat vastleggen zo tot 95% sneller dan een instructie handmatig schrijven; reken per taak op één opnamesessie plus een controleronde.",
  "The expert mainly does the task as usual while it is recorded, and then reviews the AI draft. According to DeepSight, capture is up to 95% faster than writing an instruction by hand; plan one recording session plus one review round per task.",
  "Der Experte erledigt die Aufgabe wie gewohnt, während sie aufgezeichnet wird, und prüft danach den KI-Entwurf. Laut DeepSight geht das Erfassen so bis zu 95% schneller als das manuelle Schreiben einer Anweisung; planen Sie je Aufgabe eine Aufnahmesitzung und eine Prüfrunde ein."),
 'gmp': (
  "Het platform ondersteunt GMP-werk met versiebeheer, goedkeuring en een registratie van elke uitvoering. Validatie, bijvoorbeeld volgens GAMP 5, EU GMP Annex 11 of 21 CFR Part 11, doet de klant altijd zelf voor het beoogde gebruik, binnen het eigen kwaliteitssysteem. Actarion ondersteunt daarbij met documentatie en de inrichting van rollen, goedkeuringen en audit trail.",
  "The platform supports GMP work with version control, approval and a record of every execution. Validation, for example under GAMP 5, EU GMP Annex 11 or 21 CFR Part 11, is always done by the customer for the intended use, within its own quality system. Actarion supports this with documentation and the setup of roles, approvals and the audit trail.",
  "Die Plattform unterstützt GMP-Arbeit mit Versionierung, Freigabe und einer Aufzeichnung jeder Ausführung. Die Validierung, etwa nach GAMP 5, EU-GMP Annex 11 oder 21 CFR Part 11, erfolgt immer durch den Kunden für den vorgesehenen Einsatz im eigenen Qualitätssystem. Actarion unterstützt mit Dokumentation und der Einrichtung von Rollen, Freigaben und Audit Trail."),
 'dms': (
  "Ja. Je DMS of QMS blijft de bron voor gecontroleerde documenten. De digitale werkinstructie is de uitvoeringsvorm op de vloer en verwijst naar het brondocument en de versie; registraties en afwijkingen exporteer je via de API of CSV.",
  "Yes. Your DMS or QMS remains the source for controlled documents. The digital work instruction is the execution format on the floor and refers to the source document and version; records and deviations are exported through the API or CSV.",
  "Ja. Ihr DMS oder QMS bleibt die Quelle für gelenkte Dokumente. Die digitale Arbeitsanweisung ist die Ausführungsform in der Produktion und verweist auf Quelldokument und Version; Aufzeichnungen und Abweichungen exportieren Sie über die API oder als CSV."),
 'lms': (
  "Het LMS beheert cursussen en certificaten buiten de lijn. AR-training begeleidt mensen op de werkplek en levert aftekeningen terug aan de competentiematrix. Die resultaten kunnen via de API of CSV-export naar je LMS, zodat certificaten op één plek blijven.",
  "The LMS manages courses and certificates off the line. AR training guides people at the workstation and feeds sign-offs back to the skills matrix. Those results can go to your LMS through the API or CSV export, so certificates stay in one place.",
  "Das LMS verwaltet Kurse und Zertifikate abseits der Linie. AR-Training begleitet Menschen am Arbeitsplatz und meldet Freigaben an die Qualifikationsmatrix zurück. Diese Ergebnisse können über die API oder den CSV-Export in Ihr LMS fließen, sodass Zertifikate an einem Ort bleiben."),
 'support': (
  "Actarion is je eerste aanspreekpunt en ondersteunt je lokaal, in je eigen taal. Voor vragen over het platform zelf schakelen wij met DeepSight. Reactietijden en beschikbaarheid leggen we vast in de serviceafspraken bij de offerte.",
  "Actarion is your first point of contact and supports you locally, in your own language. For questions about the platform itself, we work directly with DeepSight. Response times and availability are set out in the service agreement with your quote.",
  "Actarion ist Ihr erster Ansprechpartner und unterstützt Sie vor Ort, in Ihrer Sprache. Bei Fragen zur Plattform selbst stimmen wir uns direkt mit DeepSight ab. Reaktionszeiten und Verfügbarkeit halten wir in der Servicevereinbarung zum Angebot fest."),
 'potentify': (
  "De website van Potentify is potentify.nl. Potentify werkt vanuit Nederland; via Actarion zit je samen met hen aan tafel voor vragen over HR, leren en vaardigheden.",
  "Potentify's website is potentify.nl. Potentify works from the Netherlands; through Actarion you sit down with them for questions about HR, learning and skills.",
  "Die Website von Potentify ist potentify.nl. Potentify arbeitet von den Niederlanden aus; über Actarion sitzen Sie für Fragen zu HR, Lernen und Kompetenzen gemeinsam mit ihnen am Tisch."),
 'format': (
  "Ja, voor gangbare formaten zoals Word en pdf. Gescand papier werkt ook als de tekst leesbaar is, en een video-opname van een expert kan ook als bron dienen. Controleer bij gescande documenten het AI-concept extra goed.",
  "Yes, for common formats such as Word and PDF. Scanned paper works too if the text is readable, and a video recording of an expert can also serve as the source. Check the AI draft extra carefully for scanned documents.",
  "Ja, für gängige Formate wie Word und PDF. Gescanntes Papier funktioniert ebenfalls, wenn der Text lesbar ist, und auch eine Videoaufnahme eines Experten kann als Quelle dienen. Prüfen Sie den KI-Entwurf bei gescannten Dokumenten besonders sorgfältig."),
 'aiTrain': AITRAIN,
 'audit': (
  "Elke uitvoering wordt vastgelegd met gebruiker, tijdstip, bevestigingen en afwijkingen, en is in de Console te raadplegen en te exporteren. Wie registraties mag inzien of wijzigen, bepaal je met rollen. In gereguleerde omgevingen toetsen we samen met je kwaliteitsafdeling of dit voldoet aan je eisen voor onveranderlijkheid.",
  "Every execution is recorded with user, time, confirmations and deviations, and can be viewed and exported in the Console. Roles determine who may view or change records. In regulated environments we check with your quality department whether this meets your immutability requirements.",
  "Jede Ausführung wird mit Nutzer, Zeitpunkt, Bestätigungen und Abweichungen aufgezeichnet und lässt sich in der Console einsehen und exportieren. Rollen legen fest, wer Aufzeichnungen sehen oder ändern darf. In regulierten Umgebungen prüfen wir mit Ihrer Qualitätsabteilung, ob das Ihre Anforderungen an Unveränderlichkeit erfüllt."),
 'hosting': HOSTING,
 'iso': (
  "Actarion is implementatiepartner; je gegevens staan op het DeepSight-platform. DeepSight publiceert zijn beveiligingsdocumentatie in het DeepSight Trust Center. De certificaten en rapporten die je IT-afdeling nodig heeft, vragen we voor je op tijdens de intake.",
  "Actarion is the implementation partner; your data is stored on the DeepSight platform. DeepSight publishes its security documentation in the DeepSight Trust Center. We request the certificates and reports your IT department needs during the intake.",
  "Actarion ist Implementierungspartner; Ihre Daten liegen auf der DeepSight-Plattform. DeepSight veröffentlicht seine Sicherheitsdokumentation im DeepSight Trust Center. Die Zertifikate und Berichte, die Ihre IT benötigt, fordern wir im Erstgespräch für Sie an."),
 'skills': (
  "Je bestaande matrix is het startpunt: we zetten medewerkers, vaardigheden en niveaus over naar de skills matrix in de DeepSight Console, bijvoorbeeld vanuit Excel. Daarna houden aftekeningen op de vloer de matrix bij.",
  "Your existing matrix is the starting point: we transfer employees, skills and levels to the skills matrix in the DeepSight Console, for example from Excel. After that, sign-offs on the floor keep the matrix up to date.",
  "Ihre bestehende Matrix ist der Ausgangspunkt: Wir übertragen Mitarbeitende, Qualifikationen und Stufen in die Qualifikationsmatrix der DeepSight Console, zum Beispiel aus Excel. Danach halten Freigaben in der Produktion die Matrix aktuell."),
 'sap': (
  "De standaardroute naar SAP is de API of CSV-export, bijvoorbeeld voor uitvoeringsdata, afwijkingen en vaardigheden. Welke gegevens je uitwisselt en in welke richting, bepalen we per project.",
  "The standard route to SAP is the API or CSV export, for example for execution data, deviations and skills. Which data you exchange and in which direction is decided per project.",
  "Der Standardweg zu SAP ist die API oder der CSV-Export, etwa für Ausführungsdaten, Abweichungen und Qualifikationen. Welche Daten Sie in welche Richtung austauschen, entscheiden wir je Projekt."),
 'translate': (
  "Instructies zijn meertalig: elke taal hangt aan dezelfde hoofdinstructie, en AI kan vertalingen voorstellen. We adviseren altijd een menselijke check op veiligheidskritische stappen.",
  "Instructions are multilingual: every language is linked to the same master instruction, and AI can propose translations. We always advise a human check on safety-critical steps.",
  "Anweisungen sind mehrsprachig: Jede Sprache hängt an derselben Masteranweisung, und KI kann Übersetzungen vorschlagen. Wir empfehlen bei sicherheitskritischen Schritten immer eine Prüfung durch einen Menschen."),
 'guest': (
  "Ja, als uitgenodigde deelnemer aan de sessie. Je bepaalt zelf wie toegang krijgt en voor hoe lang, en trekt de toegang na afloop weer in.",
  "Yes, as an invited participant in the session. You decide who gets access and for how long, and withdraw access afterwards.",
  "Ja, als eingeladener Teilnehmer der Sitzung. Sie bestimmen, wer wie lange Zugriff erhält, und entziehen ihn danach wieder."),
 'recorded': (
  "Tijdens een sessie kun je foto's en video's vastleggen voor de registratie of als basis voor een nieuwe instructie. Of gesprekken standaard worden opgenomen en hoe lang opnames bewaard blijven, leggen we vast in de verwerkersovereenkomst.",
  "During a session you can capture photos and videos for the record or as the basis for a new instruction. Whether calls are recorded by default and how long recordings are kept is set out in the data processing agreement.",
  "Während einer Sitzung können Sie Fotos und Videos für die Dokumentation oder als Grundlage für eine neue Anweisung aufnehmen. Ob Gespräche standardmäßig aufgezeichnet werden und wie lange Aufnahmen gespeichert bleiben, halten wir im Auftragsverarbeitungsvertrag fest."),
 'atex': (
  "Ja, met apparaten die voor de betreffende zone ATEX-gecertificeerd zijn, zoals explosieveilige tablets of smartphones. Standaard tablets en AR-brillen zijn dat niet; we stemmen de hardware af op je zone-indeling.",
  "Yes, with devices that are ATEX-certified for the zone in question, such as intrinsically safe tablets or smartphones. Standard tablets and AR glasses are not; we match the hardware to your zone classification.",
  "Ja, mit Geräten, die für die jeweilige Zone ATEX-zertifiziert sind, etwa explosionsgeschützte Tablets oder Smartphones. Standard-Tablets und AR-Brillen sind das nicht; wir stimmen die Hardware auf Ihre Zoneneinteilung ab."),
 'gmpValidated': (
  "Geen platform is GMP-gevalideerd zonder context: validatie gebeurt per klant voor het beoogde gebruik, binnen je eigen kwaliteitssysteem. Wij ondersteunen je met documentatie over het platform en met de inrichting van rollen, goedkeuringen en audit trail.",
  "No platform is GMP-validated without context: validation is done per customer for the intended use, within your own quality system. We support you with documentation on the platform and with setting up roles, approvals and the audit trail.",
  "Keine Plattform ist ohne Kontext GMP-validiert: Die Validierung erfolgt je Kunde für den vorgesehenen Einsatz im eigenen Qualitätssystem. Wir unterstützen Sie mit Dokumentation zur Plattform und bei der Einrichtung von Rollen, Freigaben und Audit Trail."),
 'ebr': (
  "Nee. Actarion begeleidt de uitvoering op de vloer. Resultaten en registraties kunnen via de API of CSV-export naar je MES of EBR, zodat het batchrecord de bron blijft.",
  "No. Actarion guides execution on the floor. Results and records can go to your MES or EBR through the API or CSV export, so the batch record remains the source.",
  "Nein. Actarion begleitet die Ausführung in der Produktion. Ergebnisse und Aufzeichnungen können über die API oder den CSV-Export in Ihr MES oder EBR fließen, sodass das Chargenprotokoll die Quelle bleibt."),
 'fsm': (
  "Ja, per project. Opdrachten en resultaten wissel je uit via de API of CSV-export; welke velden nodig zijn, bepalen we samen met je FSM-leverancier.",
  "Yes, per project. Jobs and results are exchanged through the API or CSV export; which fields are needed is agreed together with your FSM vendor.",
  "Ja, je Projekt. Aufträge und Ergebnisse tauschen Sie über die API oder den CSV-Export aus; welche Felder nötig sind, legen wir gemeinsam mit Ihrem FSM-Anbieter fest."),
 'noInternetCustomer': (
  "Laad instructies vooraf op het toestel en test dit in de pilot. Remote ondersteuning heeft altijd een mobiele verbinding nodig, en resultaten synchroniseren zodra er weer verbinding is.",
  "Load instructions onto the device in advance and test this in the pilot. Remote support always needs a mobile connection, and results sync once a connection is available again.",
  "Laden Sie Anweisungen vorab auf das Gerät und testen Sie das im Pilot. Remote-Support braucht immer eine Mobilfunkverbindung, und Ergebnisse synchronisieren, sobald wieder eine Verbindung besteht."),
 'secondSignoff': (
  "Ja. Bij kritieke stappen richten we een verplichte controlestap in voor een tweede, bevoegde persoon, met foto- of meetbewijs. In de pilot toetsen we of dit aansluit op je Part-145-procedures.",
  "Yes. For critical steps we set up a mandatory check by a second, authorised person, with photo or measurement evidence. In the pilot we verify that this fits your Part-145 procedures.",
  "Ja. Bei kritischen Schritten richten wir eine Pflichtprüfung durch eine zweite, berechtigte Person ein, mit Foto- oder Messnachweis. Im Pilot prüfen wir, ob das zu Ihren Part-145-Verfahren passt."),
 'mesErpPilot': (
  "Niet voor een pilot. Koppelingen via de API of CSV-export kunnen volgen bij het opschalen.",
  "Not for a pilot. Integrations through the API or CSV export can follow when you scale.",
  "Nicht für einen Pilot. Anbindungen über die API oder den CSV-Export können beim Skalieren folgen."),
 'whiteLabel': (
  "Ja, als onderdeel van je servicecontract. DeepSight heeft een partnermodel waarin je licenties en kant-en-klare instructies aan je klanten levert; Actarion helpt je dit in Europa op te zetten.",
  "Yes, as part of your service contract. DeepSight has a partner model in which you supply licences and ready-made instructions to your customers; Actarion helps you set this up in Europe.",
  "Ja, als Teil Ihres Servicevertrags. DeepSight hat ein Partnermodell, in dem Sie Lizenzen und fertige Anweisungen an Ihre Kunden liefern; Actarion hilft Ihnen, das in Europa aufzusetzen."),
 'customerAccess': (
  "Via de app op een tablet of smartphone bij de machine, of via een AR-bril. Klanten krijgen eigen accounts of groepstoegang voor hun operators, en jij bepaalt per klant welke instructies zichtbaar zijn.",
  "Through the app on a tablet or smartphone at the machine, or through AR glasses. Customers get their own accounts or group access for their operators, and you decide per customer which instructions are visible.",
  "Über die App auf einem Tablet oder Smartphone an der Maschine oder über eine AR-Brille. Kunden erhalten eigene Konten oder Gruppenzugang für ihre Werker, und Sie legen je Kunde fest, welche Anweisungen sichtbar sind."),
 'wet': (
  "Gebruik robuuste tablets met een passende IP-klasse, bijvoorbeeld IP65 of hoger bij spatwater, of een beschermhoes. AR-brillen zijn niet waterdicht; zet ze alleen in waar de schoonmaakmethode dat toelaat. Tijdens de intake kiezen we de hardware per zone.",
  "Use rugged tablets with a suitable IP rating, for example IP65 or higher for splash water, or a protective case. AR glasses are not waterproof; use them only where washdown allows. During the intake we choose the hardware per zone.",
  "Nutzen Sie robuste Tablets mit passender IP-Schutzart, etwa IP65 oder höher bei Spritzwasser, oder eine Schutzhülle. AR-Brillen sind nicht wasserdicht; setzen Sie sie nur ein, wo die Reinigungsmethode es zulässt. Im Erstgespräch wählen wir die Hardware je Zone."),
 'cad': (
  "Ja. Het platform importeert gangbare 3D-formaten zoals GLB/glTF, FBX, OBJ, STEP en STL, bijvoorbeeld als export uit SolidWorks. Foto's en korte video's werken ook goed.",
  "Yes. The platform imports common 3D formats such as GLB/glTF, FBX, OBJ, STEP and STL, for example exported from SolidWorks. Photos and short videos also work well.",
  "Ja. Die Plattform importiert gängige 3D-Formate wie GLB/glTF, FBX, OBJ, STEP und STL, zum Beispiel als Export aus SolidWorks. Fotos und kurze Videos funktionieren ebenfalls gut."),
 'sampling': (
  "Leg de steekproefregel vast in de instructie: welke controle, hoe vaak en met welk bewijs. Het steekproefplan zelf, bijvoorbeeld volgens AQL, blijft in je kwaliteitssysteem; in de pilot stemmen we af hoe beide op elkaar aansluiten.",
  "Capture the sampling rule in the instruction: which check, how often and with what evidence. The sampling plan itself, for example under AQL, stays in your quality system; in the pilot we align how the two fit together.",
  "Halten Sie die Stichprobenregel in der Anweisung fest: welche Prüfung, wie oft und mit welchem Nachweis. Der Stichprobenplan selbst, etwa nach AQL, bleibt in Ihrem Qualitätssystem; im Pilot stimmen wir ab, wie beides zusammenpasst."),
 'qms': (
  "Ja. Resultaten, foto's en afwijkingen exporteer je via de API of CSV naar je kwaliteitssysteem of naar BI-tools zoals Power BI.",
  "Yes. Results, photos and deviations are exported through the API or CSV to your quality system or to BI tools such as Power BI.",
  "Ja. Ergebnisse, Fotos und Abweichungen exportieren Sie über die API oder als CSV in Ihr QM-System oder in BI-Tools wie Power BI."),
 'wms': (
  "Koppelen is maatwerk per project, via de API of CSV-export. Voor een pilot is meestal geen koppeling nodig.",
  "Integration is project-specific, through the API or CSV export. A pilot usually needs no integration.",
  "Die Anbindung ist projektspezifisch, über die API oder den CSV-Export. Für einen Pilot ist meist keine nötig."),
 'cmms': (
  "Nee. Je onderhoudssysteem plant het werk. Actarion begeleidt de uitvoering en levert het resultaat terug via de API of CSV-export, zodat de werkorder in je CMMS compleet is.",
  "No. The CMMS plans the work. Actarion guides the execution and returns the result through the API or CSV export, so the work order in your CMMS is complete.",
  "Nein. Ihr Instandhaltungssystem plant die Arbeit. Actarion begleitet die Ausführung und meldet das Ergebnis über die API oder den CSV-Export zurück, sodass der Auftrag im CMMS vollständig ist."),
 'bandwidth': (
  "Een stabiele 4G- of wifiverbinding is normaal genoeg voor live video met aantekeningen. Test de dekking op de werkplek tijdens de pilot; bij een zwak signaal helpt een lokale wifi-hotspot.",
  "A stable 4G or Wi-Fi connection is normally enough for live video with annotations. Test coverage at the workstation during the pilot; with a weak signal a local Wi-Fi hotspot helps.",
  "Eine stabile 4G- oder WLAN-Verbindung reicht normalerweise für Live-Video mit Markierungen. Testen Sie die Abdeckung am Arbeitsplatz im Pilot; bei schwachem Signal hilft ein lokaler WLAN-Hotspot."),
 'external': (
  "Ja, met gasttoegang voor de sessie. Je nodigt de externe expert uit, bepaalt wat die ziet en trekt de toegang na afloop weer in.",
  "Yes, with guest access for the session. You invite the external expert, decide what they see and withdraw access afterwards.",
  "Ja, mit Gastzugang für die Sitzung. Sie laden den externen Experten ein, bestimmen, was er sieht, und entziehen den Zugang danach wieder."),
 'planning': (
  "Nee. De planning blijft in je planningstool. Actarion dekt de uitvoering en levert de voortgang terug via de API of CSV-export.",
  "No. Planning stays in your scheduling tool. Actarion covers the execution and returns progress through the API or CSV export.",
  "Nein. Die Planung bleibt in Ihrem Planungstool. Actarion deckt die Ausführung ab und meldet den Fortschritt über die API oder den CSV-Export zurück."),
 'contractors': (
  "Ze krijgen een eigen account of groepstoegang voor de duur van de stop. Hoe tijdelijke gebruikers in de licentie worden meegenomen, spreken we vooraf af in de offerte.",
  "They get their own account or group access for the duration of the shutdown. How temporary users are covered by the licence is agreed in advance in the quote.",
  "Sie erhalten ein eigenes Konto oder Gruppenzugang für die Dauer des Stillstands. Wie temporäre Nutzer in der Lizenz berücksichtigt werden, legen wir vorab im Angebot fest."),
 'hololens': (
  "In de basis wel. Instructies maak je in DeepSight Studio en ze zijn niet aan één toestel gebonden: dezelfde module publiceer je naar HoloLens 2, Apple Vision Pro of een tablet. Test wel per instructie of 3D-overlays en interacties goed uitkomen op het nieuwe toestel.",
  "Essentially yes. Instructions are built in DeepSight Studio and are not tied to one device: the same module can be published to HoloLens 2, Apple Vision Pro or a tablet. Do test per instruction whether 3D overlays and interactions work well on the new device.",
  "Grundsätzlich ja. Anweisungen erstellen Sie in DeepSight Studio, und sie sind nicht an ein Gerät gebunden: Dasselbe Modul veröffentlichen Sie auf HoloLens 2, Apple Vision Pro oder einem Tablet. Testen Sie aber je Anweisung, ob 3D-Overlays und Interaktionen auf dem neuen Gerät gut funktionieren."),
 'integrations': (
  "Ja. Uitvoerings- en vaardigheidsdata gaan via de API of CSV-export naar SAP, MES, LMS of BI-tools zoals Power BI, en gebruikers kunnen inloggen met Microsoft Entra ID (Azure AD). Wat je koppelt, bepalen we per project.",
  "Yes. Execution and skills data flows to SAP, MES, LMS or BI tools such as Power BI through the API or CSV export, and users can sign in with Microsoft Entra ID (Azure AD). What you connect is decided per project.",
  "Ja. Ausführungs- und Qualifikationsdaten fließen über die API oder den CSV-Export in SAP, MES, LMS oder BI-Tools wie Power BI, und Nutzer können sich mit Microsoft Entra ID (Azure AD) anmelden. Was Sie anbinden, entscheiden wir je Projekt."),
 'smedSaving': (
  "Dat hangt af van hoeveel handelingen nu intern zijn. Meet eerst een paar omstellingen; dan ziet u hoeveel er naar extern kan. Die nulmeting is ook het startpunt van een pilot.",
  "That depends on how many tasks are internal today. Measure a few changeovers first; then you see how much can move to external. That baseline is also the starting point of a pilot.",
  "Das hängt davon ab, wie viele Tätigkeiten heute intern sind. Messen Sie zuerst einige Rüstvorgänge; dann sehen Sie, wie viel nach extern verlagert werden kann. Diese Ausgangsmessung ist auch der Startpunkt eines Pilots."),
}

# (routeKey, faq index in imported content) -> id
ROWS = {
 ('blogAiSop',3):'dataSafe', ('blogConnectedWorker',3):'pilot', ('hwTablets',0):'tablets', ('home',2):'pilot',
 ('termRemote',1):'remoteSafe', ('events',0):'webinars', ('videos',0):'videos', ('customers',2):'reference',
 ('solCwp',1):'cwpMes', ('solCwp',3):'security', ('solChecklists',0):'offline', ('solDwi',2):'devices', ('solDwi',3):'mesErp',
 ('solKnowledge',0):'expertTime', ('solSop',2):'gmp', ('solSop',3):'dms', ('solTraining',4):'lms', ('partnerDeepsight',2):'support',
 ('partnerPotentify',1):'potentify', ('pilot',1):'pilot', ('pfAi',1):'format', ('pfAi',2):'aiTrain', ('pfAnalytics',0):'audit',
 ('pfSecurity',0):'hosting', ('pfSecurity',1):'iso', ('pfSecurity',2):'aiTrain', ('pfSkills',0):'skills', ('pfIntegrations',1):'sap',
 ('pfMultilingual',0):'translate', ('pfRemote',1):'guest', ('pfRemote',2):'recorded', ('indEnergy',0):'atex', ('indEnergy',1):'offline',
 ('indPharma',0):'gmpValidated', ('indPharma',1):'ebr', ('indField',0):'fsm', ('indField',1):'noInternetCustomer',
 ('indAerospace',1):'secondSignoff', ('indManufacturing',0):'mesErpPilot', ('indMachine',0):'whiteLabel', ('indMachine',2):'customerAccess',
 ('indFood',0):'wet', ('ucAssembly',0):'cad', ('useCases',3):'pilot', ('ucQuality',1):'sampling', ('ucQuality',2):'qms',
 ('ucLogistics',2):'wms', ('ucMaintenance',0):'cmms', ('ucMaintenance',2):'offline', ('ucRemote',1):'bandwidth', ('ucRemote',2):'external',
 ('ucShutdown',0):'planning', ('ucShutdown',1):'contractors', ('cmpBestSoftware',1):'pilotSoftware', ('cmpDigitalVsPaper',2):'offline',
 ('cmpVisionProHololens',2):'hololens',
}
