"""Final legal copy (privacy, terms, imprint) and the 2027 report teaser.

Based on what the site itself states: ActARion B.V., Netherlands; hello@actarion.com;
managing partners Jack Kessels (Benelux) and Mark Dercksen (DACH); forms are mailed via
Resend; analytics via Google Tag Manager / GA4 with Consent Mode (only after consent);
hosting on Vercel; platform by DeepSight (Trust Center at trust.deepsight.ca).
Company address, KvK and VAT number supplied by Mark Dercksen (5 Nov 2026).
"""

COMPANY = {
    'name': 'ActARion B.V.',
    'address': 'Lange Marktstraat 1, 8911 AD Leeuwarden',
    'kvk': '99555840',
    'vat': 'NL869038606B01',
    'email': 'hello@actarion.com',
}

E = COMPANY['email']
MAIL = f'[{E}](mailto:{E})'


def _addr(loc):
    a = COMPANY['address']
    country = {'nl': 'Nederland', 'en': 'the Netherlands', 'de': 'Niederlande'}[loc]
    return f"{COMPANY['name']}, {a}, {country}" if a else f"{COMPANY['name']}, {country}"


def _ids(loc):
    out = []
    if COMPANY['kvk']:
        out.append({'nl': f"KvK-nummer {COMPANY['kvk']}", 'en': f"Chamber of Commerce no. {COMPANY['kvk']}", 'de': f"Handelsregister (KvK) Nr. {COMPANY['kvk']}"}[loc])
    if COMPANY['vat']:
        out.append({'nl': f"btw-nummer {COMPANY['vat']}", 'en': f"VAT no. {COMPANY['vat']}", 'de': f"USt-IdNr. {COMPANY['vat']}"}[loc])
    return (', '.join(out) + '.') if out else ''


def _secs(heads, bodies):
    return [{'kind': 'text', 'h2': h, 'body': [b] if isinstance(b, str) else b} for h, b in zip(heads, bodies)]


# ── Privacy ────────────────────────────────────────────────────────────────
PRIVACY_BODY = {
    'nl': [
        f"{_addr('nl')} is verwerkingsverantwoordelijke voor de persoonsgegevens die via actarion.com worden verzameld. {_ids('nl')} Je bereikt ons via {MAIL}.",
        "We verwerken de gegevens die je zelf invult: naam, zakelijk e-mailadres, bedrijf, functie, land en je bericht. Daarnaast verwerken we, alleen met je toestemming, gebruiksgegevens van de website zoals bezochte pagina's, apparaat- en browsergegevens.",
        "We gebruiken je gegevens om je aanvraag te beantwoorden, een demo of intake te plannen, een offerte of ROI-rapport te sturen en de samenwerking uit te voeren. Grondslag is de uitvoering van een (pre)contractuele afspraak of ons gerechtvaardigd belang om zakelijke vragen te beantwoorden. Voor analytische cookies is je toestemming de grondslag.",
        "Formulieren voor contact, demo, intake, partnerschap en het ROI-rapport worden per e-mail afgeleverd bij het ActARion-team. Een ROI-rapport sturen we naar het adres dat je opgeeft. We gebruiken deze gegevens niet voor nieuwsbrieven zonder je aparte toestemming.",
        "Noodzakelijke opslag (zoals je cookiekeuze) gebruiken we altijd. Google Analytics via Google Tag Manager plaatsen we alleen als je in de cookiemelding toestemming geeft; zonder toestemming staat meten standaard uit (Consent Mode). Je kunt je keuze wijzigen door de opgeslagen keuze in je browser te wissen.",
        "Werkinstructies, media en gebruikersgegevens in het DeepSight-platform verwerken we namens de klant. De klant is dan verwerkingsverantwoordelijke; ActARion en DeepSight zijn verwerker. Afspraken daarover leggen we vast in een verwerkersovereenkomst. Meer over beveiliging en hosting staat in het [DeepSight Trust Center](https://trust.deepsight.ca).",
        "We delen gegevens alleen met partijen die ons helpen de website en dienstverlening te leveren: Vercel (hosting), Resend (afleveren van formulier-e-mails), Google (analytics, alleen na toestemming) en DeepSight (platform). Met hen zijn verwerkersafspraken gemaakt. We verkopen je gegevens nooit.",
        "Sommige dienstverleners zitten in de Verenigde Staten of Canada. Doorgifte gebeurt op basis van een adequaatheidsbesluit van de Europese Commissie (zoals het EU-US Data Privacy Framework of het besluit voor Canada) of op basis van de standaardcontractbepalingen van de EU.",
        "We bewaren gegevens uit formulieren zolang nodig is om je vraag af te handelen en een eventuele samenwerking uit te voeren, en daarna niet langer dan twee jaar na het laatste contact, tenzij een wettelijke bewaarplicht langer is. Analysegegevens worden na maximaal 14 maanden verwijderd.",
        "We nemen passende technische en organisatorische maatregelen, zoals versleutelde verbindingen (HTTPS), beperkte toegang tot gegevens en beveiligde hosting.",
        f"Je hebt recht op inzage, correctie, verwijdering, beperking van de verwerking, gegevensoverdraagbaarheid en bezwaar. Gegeven toestemming kun je altijd intrekken. Stuur je verzoek naar {MAIL}; we reageren binnen één maand.",
        "Ben je niet tevreden over hoe we met je gegevens omgaan, laat het ons dan eerst weten. Je kunt ook een klacht indienen bij de [Autoriteit Persoonsgegevens](https://autoriteitpersoonsgegevens.nl) of bij de toezichthouder in je eigen land.",
        "We kunnen deze verklaring aanpassen als onze dienstverlening of de wet verandert. De datum bovenaan de pagina laat zien wanneer de tekst het laatst is bijgewerkt.",
        f"Vragen over privacy? Mail naar {MAIL}.",
    ],
    'en': [
        f"{_addr('en')} is the controller for the personal data collected through actarion.com. {_ids('en')} You can reach us at {MAIL}.",
        "We process the data you enter yourself: name, business email address, company, job title, country and your message. In addition, and only with your consent, we process website usage data such as pages visited and device and browser information.",
        "We use your data to answer your request, schedule a demo or intake, send a proposal or ROI report and carry out our cooperation. The legal basis is the performance of a (pre-)contractual arrangement or our legitimate interest in answering business enquiries. For analytics cookies the legal basis is your consent.",
        "Contact, demo, intake, partnership and ROI report forms are delivered by email to the ActARion team. An ROI report is sent to the address you provide. We do not use this data for newsletters without your separate consent.",
        "We always use necessary storage (such as your cookie choice). We only load Google Analytics through Google Tag Manager if you give consent in the cookie banner; without consent, measurement is off by default (Consent Mode). You can change your choice by clearing the stored choice in your browser.",
        "Work instructions, media and user data in the DeepSight platform are processed on behalf of the customer. The customer is then the controller; ActARion and DeepSight act as processors. This is set out in a data processing agreement. More on security and hosting is in the [DeepSight Trust Center](https://trust.deepsight.ca).",
        "We only share data with parties that help us deliver the website and our services: Vercel (hosting), Resend (delivery of form emails), Google (analytics, only after consent) and DeepSight (platform). Data processing agreements are in place with them. We never sell your data.",
        "Some service providers are based in the United States or Canada. Transfers take place on the basis of an adequacy decision of the European Commission (such as the EU-US Data Privacy Framework or the decision for Canada) or on the basis of the EU standard contractual clauses.",
        "We keep form data as long as needed to handle your request and carry out any cooperation, and no longer than two years after the last contact, unless a statutory retention period is longer. Analytics data is deleted after at most 14 months.",
        "We take appropriate technical and organisational measures, such as encrypted connections (HTTPS), restricted access to data and secure hosting.",
        f"You have the right of access, rectification, erasure, restriction of processing, data portability and objection. You can withdraw consent at any time. Send your request to {MAIL}; we respond within one month.",
        "If you are not satisfied with how we handle your data, please tell us first. You can also lodge a complaint with the Dutch Data Protection Authority ([Autoriteit Persoonsgegevens](https://autoriteitpersoonsgegevens.nl)) or with the supervisory authority in your own country.",
        "We may update this policy when our services or the law change. The date at the top of the page shows when the text was last updated.",
        f"Questions about privacy? Email {MAIL}.",
    ],
    'de': [
        f"Verantwortlicher für die über actarion.com erhobenen personenbezogenen Daten ist die {_addr('de')}. {_ids('de')} Sie erreichen uns unter {MAIL}.",
        "Wir verarbeiten die Daten, die Sie selbst angeben: Name, geschäftliche E-Mail-Adresse, Unternehmen, Funktion, Land und Ihre Nachricht. Zusätzlich verarbeiten wir, nur mit Ihrer Einwilligung, Nutzungsdaten der Website wie besuchte Seiten sowie Geräte- und Browserdaten.",
        "Wir nutzen Ihre Daten, um Ihre Anfrage zu beantworten, eine Demo oder ein Erstgespräch zu planen, ein Angebot oder einen ROI-Bericht zu senden und die Zusammenarbeit durchzuführen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag oder vorvertragliche Maßnahmen) bzw. lit. f (berechtigtes Interesse an der Beantwortung geschäftlicher Anfragen). Für Analyse-Cookies ist Ihre Einwilligung nach lit. a die Rechtsgrundlage.",
        "Kontakt-, Demo-, Erstgesprächs-, Partner- und ROI-Formulare werden per E-Mail an das ActARion-Team zugestellt. Einen ROI-Bericht senden wir an die von Ihnen angegebene Adresse. Ohne gesonderte Einwilligung nutzen wir diese Daten nicht für Newsletter.",
        "Notwendige Speicherung (etwa Ihre Cookie-Auswahl) nutzen wir immer. Google Analytics über den Google Tag Manager laden wir nur, wenn Sie im Cookie-Hinweis einwilligen; ohne Einwilligung ist die Messung standardmäßig deaktiviert (Consent Mode). Sie können Ihre Wahl ändern, indem Sie die gespeicherte Auswahl in Ihrem Browser löschen.",
        "Arbeitsanweisungen, Medien und Nutzerdaten in der DeepSight-Plattform verarbeiten wir im Auftrag des Kunden. Der Kunde ist dann Verantwortlicher; ActARion und DeepSight sind Auftragsverarbeiter. Dies regelt ein Auftragsverarbeitungsvertrag. Mehr zu Sicherheit und Hosting finden Sie im [DeepSight Trust Center](https://trust.deepsight.ca).",
        "Wir geben Daten nur an Dienstleister weiter, die uns bei Website und Leistungen unterstützen: Vercel (Hosting), Resend (Zustellung von Formular-E-Mails), Google (Analyse, nur nach Einwilligung) und DeepSight (Plattform). Mit ihnen bestehen Auftragsverarbeitungsverträge. Wir verkaufen Ihre Daten nie.",
        "Einige Dienstleister sitzen in den USA oder in Kanada. Die Übermittlung erfolgt auf Grundlage eines Angemessenheitsbeschlusses der Europäischen Kommission (etwa des EU-US Data Privacy Framework oder des Beschlusses für Kanada) oder der EU-Standardvertragsklauseln.",
        "Formulardaten speichern wir so lange, wie es für die Bearbeitung Ihrer Anfrage und eine mögliche Zusammenarbeit nötig ist, und höchstens zwei Jahre nach dem letzten Kontakt, sofern keine längere gesetzliche Aufbewahrungspflicht besteht. Analysedaten werden nach spätestens 14 Monaten gelöscht.",
        "Wir treffen angemessene technische und organisatorische Maßnahmen, etwa verschlüsselte Verbindungen (HTTPS), eingeschränkte Zugriffsrechte und sicheres Hosting.",
        f"Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine Einwilligung können Sie jederzeit widerrufen. Senden Sie Ihre Anfrage an {MAIL}; wir antworten innerhalb eines Monats.",
        "Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts. Für uns zuständig ist die niederländische [Autoriteit Persoonsgegevens](https://autoriteitpersoonsgegevens.nl).",
        "Wir können diese Erklärung anpassen, wenn sich unsere Leistungen oder die Rechtslage ändern. Das Datum oben auf der Seite zeigt den letzten Stand.",
        f"Fragen zum Datenschutz? Schreiben Sie an {MAIL}.",
    ],
}

# ── Terms ──────────────────────────────────────────────────────────────────
TERMS_BODY = {
    'nl': [
        "In deze voorwaarden betekent: ActARion: ActARion B.V.; Klant: de organisatie die met ActARion een overeenkomst sluit; Diensten: implementatie, pilots, workshops, enablement en ondersteuning door ActARion; Platform: de software van DeepSight waarvoor ActARion licenties levert; Overeenkomst: de afspraak tussen ActARion en de Klant, inclusief offerte en deze voorwaarden.",
        "Deze voorwaarden gelden voor alle offertes, overeenkomsten en diensten van ActARion. Afwijkingen gelden alleen als ze schriftelijk zijn overeengekomen. Inkoop- of andere voorwaarden van de Klant zijn niet van toepassing, tenzij ActARion die schriftelijk aanvaardt.",
        "Offertes van ActARion zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld. Een overeenkomst komt tot stand als de Klant de offerte schriftelijk of per e-mail aanvaardt of als ActARion met de uitvoering begint op verzoek van de Klant.",
        "ActARion voert de Diensten uit naar beste inzicht en vermogen. Scope, planning, KPI's en opleveringen van een pilot of implementatie staan in de offerte. Een pilot is bedoeld om de waarde aan te tonen; de uitkomst hangt mede af van de inzet en de gegevens van de Klant.",
        "Het gebruik van het Platform valt onder de licentie- en gebruiksvoorwaarden van DeepSight, die ActARion bij de offerte meelevert. De licentie is niet-exclusief, niet overdraagbaar en geldt voor de duur en het aantal gebruikers of apparaten uit de offerte.",
        "De Klant zorgt tijdig voor de informatie, toegang tot locaties en systemen, contactpersonen en medewerkers die nodig zijn voor de uitvoering. De Klant is verantwoordelijk voor de juistheid van aangeleverde procedures en instructies en voor de veilige toepassing ervan op de werkvloer.",
        "Tarieven staan in de offerte en zijn exclusief btw. Facturen betaalt de Klant binnen 30 dagen na factuurdatum. Bij te late betaling is de Klant de wettelijke handelsrente verschuldigd. Licenties worden vooraf per contractperiode gefactureerd, tenzij anders afgesproken.",
        "De Klant blijft eigenaar van zijn eigen content, zoals werkinstructies, foto's, video's en procedures. Alle rechten op het Platform liggen bij DeepSight; rechten op methoden, templates en materialen van ActARion blijven bij ActARion. De Klant krijgt een gebruiksrecht voor de duur van de Overeenkomst.",
        "Beide partijen houden vertrouwelijke informatie van de ander geheim en gebruiken die alleen voor de uitvoering van de Overeenkomst. Deze plicht geldt ook na afloop van de Overeenkomst.",
        "Als ActARion bij de uitvoering persoonsgegevens verwerkt namens de Klant, sluiten partijen een verwerkersovereenkomst volgens de AVG. ActARion verwerkt die gegevens alleen in opdracht van de Klant. Zie ook onze [privacyverklaring](/nl/privacy).",
        "De aansprakelijkheid van ActARion is beperkt tot directe schade en tot ten hoogste het bedrag dat de Klant in de drie maanden vóór het schadeveroorzakende feit onder de Overeenkomst heeft betaald, of tot het bedrag dat sinds de laatst goedgekeurde projectmijlpaal is betaald als die periode korter is. ActARion is niet aansprakelijk voor indirecte schade, zoals gevolgschade, gederfde winst of productieverlies. Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid.",
        "Bij overmacht, zoals storingen bij toeleveranciers of in internet- en telecomverbindingen, overheidsmaatregelen of andere omstandigheden buiten de macht van ActARion, worden de verplichtingen opgeschort. Duurt de overmacht langer dan 60 dagen, dan mogen beide partijen de Overeenkomst schriftelijk beëindigen.",
        "De looptijd staat in de offerte. Licenties worden stilzwijgend verlengd met dezelfde periode, tenzij een partij uiterlijk twee maanden voor het einde schriftelijk opzegt. Beide partijen mogen de Overeenkomst direct beëindigen bij faillissement of een ernstige tekortkoming die na schriftelijke ingebrekestelling niet binnen 30 dagen is hersteld.",
        "Op de Overeenkomst is Nederlands recht van toepassing. Geschillen leggen partijen eerst in onderling overleg voor; lukt dat niet, dan beslist de bevoegde rechter in Nederland.",
    ],
    'en': [
        "In these terms: ActARion means ActARion B.V.; Customer means the organisation that enters into an agreement with ActARion; Services means implementation, pilots, workshops, enablement and support by ActARion; Platform means the DeepSight software for which ActARion supplies licences; Agreement means the arrangement between ActARion and the Customer, including the proposal and these terms.",
        "These terms apply to all proposals, agreements and services of ActARion. Deviations only apply if agreed in writing. The Customer's purchasing or other terms do not apply unless ActARion accepts them in writing.",
        "Proposals from ActARion are without obligation and valid for 30 days unless stated otherwise. An agreement is concluded when the Customer accepts the proposal in writing or by email, or when ActARion starts work at the Customer's request.",
        "ActARion performs the Services to the best of its knowledge and ability. Scope, timeline, KPIs and deliverables of a pilot or implementation are set out in the proposal. A pilot is intended to demonstrate value; its outcome also depends on the Customer's involvement and data.",
        "Use of the Platform is subject to DeepSight's licence and terms of use, which ActARion provides with the proposal. The licence is non-exclusive, non-transferable and applies for the term and the number of users or devices in the proposal.",
        "The Customer provides, in good time, the information, access to sites and systems, contacts and staff needed for the work. The Customer is responsible for the accuracy of the procedures and instructions it supplies and for their safe use on the shop floor.",
        "Fees are set out in the proposal and exclude VAT. The Customer pays invoices within 30 days of the invoice date. Late payment incurs the statutory commercial interest. Licences are invoiced in advance per contract period unless agreed otherwise.",
        "The Customer remains the owner of its own content, such as work instructions, photos, videos and procedures. All rights to the Platform belong to DeepSight; rights to ActARion's methods, templates and materials remain with ActARion. The Customer receives a right of use for the term of the Agreement.",
        "Both parties keep the other party's confidential information secret and use it only to perform the Agreement. This obligation continues after the Agreement ends.",
        "If ActARion processes personal data on behalf of the Customer, the parties conclude a data processing agreement in line with the GDPR. ActARion processes such data only on the Customer's instructions. See also our [privacy policy](/en/privacy).",
        "ActARion's liability is limited to direct damage and to no more than the amount the Customer paid under the Agreement in the three months before the event causing the damage, or the amount paid since the last approved project milestone if that period is shorter. ActARion is not liable for indirect damage such as consequential loss, lost profit or production loss. These limits do not apply in case of intent or wilful recklessness.",
        "In case of force majeure, such as failures at suppliers or in internet and telecom connections, government measures or other circumstances beyond ActARion's control, obligations are suspended. If force majeure lasts longer than 60 days, either party may terminate the Agreement in writing.",
        "The term is set out in the proposal. Licences renew automatically for the same period unless a party gives written notice at least two months before the end. Either party may terminate the Agreement immediately in case of bankruptcy or a material breach not remedied within 30 days of written notice.",
        "The Agreement is governed by Dutch law. The parties first try to resolve disputes by mutual consultation; failing that, the competent court in the Netherlands decides.",
    ],
    'de': [
        "In diesen AGB bedeutet: ActARion: die ActARion B.V.; Kunde: die Organisation, die mit ActARion einen Vertrag schließt; Leistungen: Implementierung, Pilotprojekte, Workshops, Befähigung und Support durch ActARion; Plattform: die Software von DeepSight, für die ActARion Lizenzen liefert; Vertrag: die Vereinbarung zwischen ActARion und dem Kunden einschließlich Angebot und dieser AGB.",
        "Diese AGB gelten für alle Angebote, Verträge und Leistungen von ActARion gegenüber Unternehmern. Abweichungen gelten nur, wenn sie schriftlich vereinbart sind. Einkaufs- oder sonstige Bedingungen des Kunden gelten nur, wenn ActARion ihnen schriftlich zustimmt.",
        "Angebote von ActARion sind freibleibend und 30 Tage gültig, sofern nicht anders angegeben. Ein Vertrag kommt zustande, wenn der Kunde das Angebot schriftlich oder per E-Mail annimmt oder ActARion auf Wunsch des Kunden mit der Ausführung beginnt.",
        "ActARion erbringt die Leistungen nach bestem Wissen und Können. Umfang, Zeitplan, KPIs und Ergebnisse eines Pilots oder einer Implementierung stehen im Angebot. Ein Pilot dient dem Nachweis des Nutzens; das Ergebnis hängt auch von der Mitwirkung und den Daten des Kunden ab.",
        "Die Nutzung der Plattform unterliegt den Lizenz- und Nutzungsbedingungen von DeepSight, die ActARion mit dem Angebot bereitstellt. Die Lizenz ist nicht exklusiv, nicht übertragbar und gilt für die Laufzeit sowie die Anzahl an Nutzern oder Geräten laut Angebot.",
        "Der Kunde stellt rechtzeitig die Informationen, den Zugang zu Standorten und Systemen, Ansprechpartner und Mitarbeitende bereit, die für die Ausführung nötig sind. Der Kunde ist für die Richtigkeit gelieferter Verfahren und Anweisungen und für deren sichere Anwendung in der Produktion verantwortlich.",
        "Die Vergütung steht im Angebot und versteht sich zuzüglich Umsatzsteuer. Rechnungen sind innerhalb von 30 Tagen nach Rechnungsdatum zu zahlen. Bei Zahlungsverzug schuldet der Kunde die gesetzlichen Verzugszinsen. Lizenzen werden je Vertragszeitraum im Voraus berechnet, sofern nicht anders vereinbart.",
        "Der Kunde bleibt Eigentümer seiner eigenen Inhalte wie Arbeitsanweisungen, Fotos, Videos und Verfahren. Alle Rechte an der Plattform liegen bei DeepSight; Rechte an Methoden, Vorlagen und Materialien von ActARion verbleiben bei ActARion. Der Kunde erhält ein Nutzungsrecht für die Vertragslaufzeit.",
        "Beide Parteien behandeln vertrauliche Informationen der anderen Partei vertraulich und nutzen sie nur zur Vertragserfüllung. Diese Pflicht gilt auch nach Vertragsende fort.",
        "Verarbeitet ActARion im Auftrag des Kunden personenbezogene Daten, schließen die Parteien einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. ActARion verarbeitet diese Daten nur auf Weisung des Kunden. Siehe auch unsere [Datenschutzerklärung](/de/datenschutz).",
        "ActARion haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden und auf höchstens den Betrag begrenzt, den der Kunde in den drei Monaten vor dem schadensbegründenden Ereignis aus dem Vertrag gezahlt hat, oder auf den seit dem zuletzt abgenommenen Projektmeilenstein gezahlten Betrag, wenn dieser Zeitraum kürzer ist. Für mittelbare Schäden wie entgangenen Gewinn oder Produktionsausfall haftet ActARion bei leichter Fahrlässigkeit nicht.",
        "Bei höherer Gewalt, etwa Störungen bei Zulieferern oder in Internet- und Telekommunikationsverbindungen, behördlichen Maßnahmen oder anderen Umständen außerhalb des Einflusses von ActARion, ruhen die Pflichten. Dauert die höhere Gewalt länger als 60 Tage, kann jede Partei den Vertrag schriftlich kündigen.",
        "Die Laufzeit steht im Angebot. Lizenzen verlängern sich stillschweigend um denselben Zeitraum, sofern nicht eine Partei spätestens zwei Monate vor Ablauf schriftlich kündigt. Jede Partei kann den Vertrag fristlos kündigen bei Insolvenz oder einer erheblichen Pflichtverletzung, die nicht innerhalb von 30 Tagen nach schriftlicher Abmahnung behoben wird.",
        "Es gilt niederländisches Recht unter Ausschluss des UN-Kaufrechts. Streitigkeiten versuchen die Parteien zunächst einvernehmlich zu lösen; gelingt das nicht, entscheidet das zuständige Gericht in den Niederlanden.",
    ],
}

LEAD = {
    'privacy': {'nl': 'Hoe ActARion omgaat met persoonsgegevens van bezoekers, klanten en partners.', 'en': 'How ActARion handles the personal data of visitors, customers and partners.', 'de': 'Wie ActARion mit personenbezogenen Daten von Besuchern, Kunden und Partnern umgeht.'},
    'terms': {'nl': 'De voorwaarden voor offertes, pilots, implementaties en licenties van ActARion.', 'en': 'The terms for ActARion proposals, pilots, implementations and licences.', 'de': 'Die Bedingungen für Angebote, Pilotprojekte, Implementierungen und Lizenzen von ActARion.'},
}

# ── Imprint ────────────────────────────────────────────────────────────────
def imprint(loc):
    ids = _ids(loc)
    if loc == 'de':
        heads_bodies = [
            ('Angaben gemäß § 5 DDG', f"{_addr('de')}"),
            ('Vertreten durch', 'Jack Kessels (Managing Partner Benelux) und Mark Dercksen (Managing Partner DACH).'),
            ('Kontakt', f"E-Mail: {MAIL}. Oder nutzen Sie unser [Kontaktformular](/de/kontakt)."),
        ]
        if COMPANY['kvk']:
            heads_bodies.append(('Registereintrag', f"Handelsregister der niederländischen Handelskammer (Kamer van Koophandel), Nr. {COMPANY['kvk']}."))
        if COMPANY['vat']:
            heads_bodies.append(('Umsatzsteuer-ID', f"Umsatzsteuer-Identifikationsnummer: {COMPANY['vat']}."))
        heads_bodies += [
            ('Verantwortlich für den Inhalt', 'Mark Dercksen, Managing Partner DACH, ActARion B.V. Hinweise auf Fehler oder Korrekturen bitte an [mark@actarion.com](mailto:mark@actarion.com).'),
            ('Streitschlichtung', 'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Unsere Angebote richten sich ausschließlich an Unternehmen.'),
            ('Haftung für Inhalte und Links', 'Wir erstellen die Inhalte dieser Website mit Sorgfalt, übernehmen aber keine Gewähr für Vollständigkeit und Aktualität. Für Inhalte externer Websites, auf die wir verlinken, sind ausschließlich deren Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend.'),
            ('Urheberrecht', 'Texte, Bilder und Grafiken dieser Website unterliegen dem Urheberrecht von ActARion oder der jeweiligen Rechteinhaber. Die Vorlagen in unseren Ressourcen dürfen Sie frei nutzen und anpassen. DeepSight ist eine Marke der DeepSight Inc.'),
        ]
        return heads_bodies
    if loc == 'nl':
        return [
            ('Uitgever', f"{_addr('nl')}. {ids}".strip()),
            ('Directie', 'Jack Kessels (managing partner Benelux) en Mark Dercksen (managing partner DACH).'),
            ('Contact', f"E-mail: {MAIL}. Of gebruik ons [contactformulier](/nl/contact)."),
            ('Verantwoordelijk voor de inhoud', 'Mark Dercksen, managing partner DACH. Fouten of correcties op de website graag melden via [mark@actarion.com](mailto:mark@actarion.com).'),
            ('Aansprakelijkheid', 'We stellen de inhoud van deze website met zorg samen, maar kunnen niet garanderen dat alle informatie volledig en actueel is. Voor de inhoud van externe websites waarnaar we linken zijn wij niet verantwoordelijk.'),
            ('Auteursrecht', 'Teksten, beelden en illustraties op deze website zijn auteursrechtelijk beschermd en eigendom van ActARion of de betreffende rechthebbenden. De templates in onze kennisbank mag je vrij gebruiken en aanpassen. DeepSight is een merk van DeepSight Inc.'),
        ]
    return [
        ('Publisher', f"{_addr('en')}. {ids}".strip()),
        ('Management', 'Jack Kessels (Managing Partner Benelux) and Mark Dercksen (Managing Partner DACH).'),
        ('Contact', f"Email: {MAIL}. Or use our [contact form](/en/contact)."),
        ('Responsible for content', 'Mark Dercksen, Managing Partner DACH. Please report errors or corrections to [mark@actarion.com](mailto:mark@actarion.com).'),
        ('Liability', 'We compile the content of this website with care but cannot guarantee that all information is complete and up to date. We are not responsible for the content of external websites we link to.'),
        ('Copyright', 'Texts, images and illustrations on this website are protected by copyright and belong to ActARion or the respective rights holders. You may freely use and adapt the templates in our resources. DeepSight is a trademark of DeepSight Inc.'),
    ]


IMPRINT_META = {
    'nl': ('Colofon | ActARion', 'Colofon van ActARion: uitgever, directie, contactgegevens en informatie over aansprakelijkheid en auteursrecht van actarion.com.', 'Colofon', 'Wie achter actarion.com zit en hoe je ons bereikt.'),
    'en': ('Legal notice | ActARion', 'Legal notice of ActARion: publisher, management, contact details and information on liability and copyright for actarion.com.', 'Legal notice', 'Who is behind actarion.com and how to reach us.'),
    'de': (None, None, None, 'Anbieterkennzeichnung für actarion.com.'),
}
IMPRINT_ANSWER_DE = 'Das Impressum enthält die Anbieterangaben für actarion.com: Name und Sitz des Anbieters, vertretungsberechtigte Personen, Kontaktdaten und die für den Inhalt verantwortliche Person.'


# ── Report 2027 (not yet published) ─────────────────────────────────────────
REPORT = {
    'nl': {
        'lead': 'Ons onderzoek naar werkinstructies, inwerken en kennisoverdracht in de maakindustrie in Benelux en DACH. Het rapport verschijnt in 2027.',
        'answer': 'Het rapport werkinstructies 2027 brengt in kaart hoe productiebedrijven in Benelux en DACH werkinstructies maken, bijhouden en gebruiken, hoe lang inwerken duurt en waar AI en AR al worden ingezet. Het rapport verschijnt in 2027 en is dan gratis te downloaden.',
        'sections': [
            {'kind': 'checklist', 'h2': 'Wat het rapport behandelt', 'items': [
                'Hoe werkinstructies nu worden gemaakt en bijgehouden: papier, pdf of digitaal.',
                'Hoe lang het duurt voordat nieuwe medewerkers zelfstandig werken.',
                'Hoe bedrijven kennis van ervaren medewerkers vastleggen voordat die vertrekken.',
                'Waar AI en AR al worden gebruikt op de werkvloer en wat dat oplevert.',
            ]},
            {'kind': 'text', 'h2': 'Op de hoogte blijven', 'body': ['Volg [ActARion op LinkedIn](https://www.linkedin.com/company/actarion/) om te horen wanneer het rapport verschijnt. Wil je nu al weten waar jouw fabriek staat? [Plan een kosteloze intake](/nl/demo).']},
        ],
    },
    'en': {
        'lead': 'Our study of work instructions, onboarding and knowledge transfer in manufacturing across Benelux and DACH. The report will be published in 2027.',
        'answer': 'The State of frontline work 2027 report maps how manufacturers in Benelux and DACH create, maintain and use work instructions, how long onboarding takes and where AI and AR are already in use. The report will be published in 2027 and will be free to download.',
        'sections': [
            {'kind': 'checklist', 'h2': 'What the report covers', 'items': [
                'How work instructions are created and maintained today: paper, PDF or digital.',
                'How long it takes before new employees work independently.',
                'How companies capture the knowledge of experienced staff before they leave.',
                'Where AI and AR are already used on the shop floor and what it delivers.',
            ]},
            {'kind': 'text', 'h2': 'Stay informed', 'body': ['Follow [ActARion on LinkedIn](https://www.linkedin.com/company/actarion/) to hear when the report is published. Want to know where your plant stands today? [Book a free intake](/en/demo).']},
        ],
    },
    'de': {
        'lead': 'Unsere Studie zu Arbeitsanweisungen, Einarbeitung und Wissenstransfer in der Fertigung in Benelux und DACH. Die Studie erscheint 2027.',
        'answer': 'Die Studie Werkerführung 2027 zeigt, wie Hersteller in Benelux und DACH Arbeitsanweisungen erstellen, pflegen und nutzen, wie lange die Einarbeitung dauert und wo KI und AR bereits eingesetzt werden. Die Studie erscheint 2027 und steht dann kostenlos zum Download bereit.',
        'sections': [
            {'kind': 'checklist', 'h2': 'Was die Studie behandelt', 'items': [
                'Wie Arbeitsanweisungen heute erstellt und gepflegt werden: Papier, PDF oder digital.',
                'Wie lange es dauert, bis neue Mitarbeitende selbstständig arbeiten.',
                'Wie Unternehmen das Wissen erfahrener Mitarbeitender sichern, bevor diese gehen.',
                'Wo KI und AR bereits in der Produktion genutzt werden und was das bringt.',
            ]},
            {'kind': 'text', 'h2': 'Auf dem Laufenden bleiben', 'body': ['Folgen Sie [ActARion auf LinkedIn](https://www.linkedin.com/company/actarion/), um zu erfahren, wann die Studie erscheint. Sie möchten schon jetzt wissen, wo Ihr Werk steht? [Vereinbaren Sie ein kostenloses Erstgespräch](/de/demo).']},
        ],
    },
}

REPORT_META = {
    'nl': {'metaTitle': 'Rapport werkinstructies 2027 | ActARion', 'metaDescription': 'Onderzoek naar werkinstructies, inwerken en kennisoverdracht in de maakindustrie in Benelux en DACH. Verschijnt in 2027.'},
    'en': {'metaTitle': 'State of frontline work 2027 report | ActARion', 'metaDescription': 'A study of work instructions, onboarding and knowledge transfer in manufacturing across Benelux and DACH. Published in 2027.'},
    'de': {'metaTitle': 'Studie Werkerführung 2027 | ActARion', 'metaDescription': 'Studie zu Arbeitsanweisungen, Einarbeitung und Wissenstransfer in der Fertigung in Benelux und DACH. Erscheint 2027.'},
}

# ── Templates: there are no downloadable files, so no download promises ───
STR = {
    'Download: [Word](#) [Excel](#) [PDF](#)': None,
    'Use them online or download for Word.': 'Use them online or copy them into your own system.',
    'Copy it or download for Excel.': 'Copy it straight into Excel.',
    'Copy or download.': 'Copy it into your own system.',
    'Copy it or download for Word.': 'Copy it straight into Word.',
    'Every template is complete on the page. You can copy it straight into your own system or download it as Word, Excel or PDF.': 'Every template is complete on the page. Copy it straight into Word, Excel or your own system, or print it.',
    'Elke template staat volledig op de pagina. Je kopieert hem direct of downloadt hem als Word, Excel of PDF.': 'Elke template staat volledig op de pagina. Je kopieert hem direct naar Word, Excel of je eigen systeem, of je print hem.',
    'Jede Vorlage steht vollständig auf der Seite. Sie können sie direkt übernehmen oder als Word, Excel oder PDF herunterladen.': 'Jede Vorlage steht vollständig auf der Seite. Sie können sie direkt in Word, Excel oder Ihr eigenes System übernehmen oder ausdrucken.',
    'Download a template below, or book a free intake call to see your own SOP running as a digital, AR-guided instruction.': 'Use a template below, or book a free intake call to see your own SOP running as a digital, AR-guided instruction.',
    'Download een template, of plan een kosteloze intake en zie je eigen SOP als digitale instructie met AR-begeleiding.': 'Gebruik een template, of plan een kosteloze intake en zie je eigen SOP als digitale instructie met AR-begeleiding.',
    '**[Download all templates]** · **Book a free intake call**': '**[Book a free intake call](/en/demo)**',
    '**[Download alle templates]** · **Plan een kosteloze intake**': '**[Plan een kosteloze intake](/nl/demo)**',
    '**[Alle Vorlagen herunterladen]** · **Kostenloses Erstgespräch vereinbaren**': '**[Kostenloses Erstgespräch vereinbaren](/de/demo)**',
    'Yes. You can use and adapt every template on these pages. Downloads in Word, Excel and PDF are free as well.': 'Yes. You can use, copy and adapt every template on these pages for free.',
    'Ja. Je mag elke template gebruiken en aanpassen. Ook de downloads in Word, Excel en PDF zijn gratis.': 'Ja. Je mag elke template gratis gebruiken, kopiëren en aanpassen.',
    'Ja. Sie dürfen jede Vorlage nutzen und anpassen. Auch die Downloads in Word, Excel und PDF sind kostenlos.': 'Ja. Sie dürfen jede Vorlage kostenlos nutzen, kopieren und anpassen.',
}


def apply(data):
    """Apply legal pages, report teaser and template string fixes to the imported data."""
    for loc, pages in data.items():
        for key, heads_src in (('privacy', PRIVACY_BODY), ('terms', TERMS_BODY)):
            pg = pages[key]
            heads = [s['h2'] for s in pg['sections']]
            pg['sections'] = _secs(heads, heads_src[loc])
            pg['lead'] = LEAD[key][loc]
        hb = imprint(loc)
        title, desc, h1, lead = IMPRINT_META[loc]
        pg = pages.setdefault('imprint', {})
        if title:
            pg.update({'metaTitle': title, 'metaDescription': desc, 'h1': h1})
        if loc == 'de':
            pg['answer'] = IMPRINT_ANSWER_DE
        pg['lead'] = lead
        pg['sections'] = _secs([h for h, _ in hb], [b for _, b in hb])
        REPORT[loc].update(REPORT_META[loc])
        rp = pages.get('report2027')
        if rp is not None:
            rp.update(REPORT[loc])
        else:
            pages['report2027'] = dict(REPORT[loc])
    return data
