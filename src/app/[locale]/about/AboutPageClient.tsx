"use client";

import Link from "next/link";

interface AboutPageClientProps {
  locale: string;
  dictionary: any;
}

// Translations for all supported locales
const translations = {
  en: {
    intro: {
      p1: "At ActARion we help industrial, logistics and energy companies rethink how work is done on the shop floor. We combine augmented reality (AR) and AI-driven work instructions to turn your best expertise into practical guidance that every operator can follow in the real environment, on real equipment, at the exact moment of need.",
      p2: "Our solutions build on the DeepSight platform, which is already used in demanding sectors like mining, aerospace and advanced manufacturing. We bring this capability to European organisations that want to work smarter, safer and faster.",
    },
    whyChange: {
      title: "Why work needs to change",
      intro: "Technology is reshaping how we live, learn and work – and the pace keeps accelerating. At the same time, many organisations struggle with the same questions:",
      questions: [
        "How do we keep up with new technology while production has to keep running?",
        "How do we cope with shortages of technical talent and the retirement of experienced staff?",
        "How do we train a new generation that learns visually, on-demand and on their own terms?",
        "How do we reduce downtime and errors when processes, products and regulations change faster than our documentation?",
      ],
      conclusion: "Traditional approaches – binders, PDFs, classroom training, job shadowing – are no longer enough. They are slow to update, hard to search and difficult to standardise across shifts, sites and countries. We started ActARion to address exactly this gap.",
    },
    whatWeDo: {
      title: "What we do",
      intro: "ActARion turns your operational know-how into AR-powered, step-by-step guidance that runs on smart glasses, tablets and other connected devices on the work floor.",
      inPractice: "In practice this means:",
      features: [
        {
          title: "Knowledge capture in the real environment",
          text: "Experts record procedures directly on the line or installation using smart glasses or mobile devices. No separate film crew, no long editing cycles – just real work, captured once and structured into reusable AR Standard Operating Procedures (AR-SOPs).",
        },
        {
          title: "Guided work instructions with AR and AI",
          text: "Operators see exactly what to do next, overlaid onto the real world: 3D cues, images and short video snippets supported by concise text, automatic translation and optional text-to-speech. This reduces cognitive load and makes complex tasks accessible for new and experienced operators alike.",
        },
        {
          title: "Remote expert support when it really matters",
          textBefore: "When a breakdown occurs or a rare scenario appears, operators can call an expert who sees what they see and can annotate directly in their field of view. This underpins our ",
          linkText: "remote expert support for corrective maintenance",
          textAfter: " use case.",
        },
        {
          title: "Data for continuous improvement",
          text: "Each execution of a guide can collect evidence (photos, video, confirmations) and performance metrics such as time, error rates and completion steps. This feeds a skills matrix and helps you optimise procedures, training and maintenance strategies over time.",
        },
      ],
      portfolioIntro: "Our use case portfolio ranges from ",
      portfolioLinks: {
        assembly: "AR-guided assembly for error-free production",
        changeover: "guided changeovers to reduce downtime",
        maintenance: "preventive maintenance with data-driven insights",
        training: "training and onboarding for industrial teams",
        overview: "use case overview page",
      },
    },
    challenges: {
      title: "The challenges we help you solve",
      intro: "Across manufacturing, logistics and processing industries we see recurring patterns:",
      items: [
        {
          title: "Corporate memory at risk",
          textBefore: "Procedures live in the heads of a few veterans or in scattered notes and videos. When people leave, knowledge leaves with them. Our ",
          linkText: "AR work instructions and SOPs to preserve corporate memory",
          textAfter: " use case addresses this directly.",
        },
        {
          title: "Slow, inconsistent onboarding",
          textBefore: "New hires depend on job shadowing, pulling experienced staff away from production and resulting in different ways of working per shift, line or plant. With ",
          linkText: "AR training and onboarding",
          textAfter: " we shorten time-to-competence and standardise learning.",
        },
        {
          title: "Paper and PDF instructions that do not match reality",
          text: "Work instructions are hard to maintain, not always opened and often lag behind the actual process.",
        },
        {
          title: "Complex changeovers and batch prep",
          textBefore: "Setups and changeovers are time-consuming, error-prone and heavily dependent on specific people. Our ",
          linkText: "guided changeover",
          textAfter: " approach makes this more robust.",
        },
        {
          title: "Preventive and corrective maintenance under pressure",
          textBefore: "Maintenance teams must keep uptime high while dealing with complex assets, long travel times and incomplete histories. Here, ",
          linkText1: "AR-guided preventive maintenance",
          textMiddle: " and ",
          linkText2: "remote expert support",
          textAfter: " work hand in hand.",
        },
      ],
      conclusion: "All of these use cases are supported by one central AR-SOP library so you can build, maintain and roll out standardised ways of working across sites and countries.",
    },
    howWeWork: {
      title: "How we work with you",
      intro: "We believe in \"think big, act small and show results\". Instead of long programmes, we focus on concrete use cases with measurable impact.",
      steps: [
        {
          title: "Point of departure",
          text: "We start with your strategic and operational questions. Where are the biggest risks? Where do errors or stoppages hurt most? Where is knowledge most fragile?",
        },
        {
          title: "User insights on the work floor",
          text: "We talk with operators, team leads, quality and maintenance staff to understand how work really happens today and where digital support can help instead of distract.",
        },
        {
          title: "Co-create a first solution",
          text: "Together we select one or two high-impact use cases – for example onboarding on a key line, a complex changeover or a high-risk maintenance procedure – and build AR-guides with your experts.",
        },
        {
          title: "Pilot → impact → scale",
          text: "We run a pilot, measure impact (training time, error rates, downtime, first-time-right), refine the guides and then create a roadmap to roll out to other lines, sites or countries.",
        },
      ],
      conclusion: "This way, AR and AI are not a \"shiny demo\" but a practical tool that proves value in weeks, not years.",
    },
    ecosystem: {
      title: "Our ecosystem",
      intro: "ActARion is the European partner of DeepSight, a Montreal-based AR and generative AI knowledge management platform used in industries such as mining, aerospace, agro-food, wood and metal transformation and transportation.",
      together: "Together we bring:",
      items: [
        "A mature AR & AI platform focused on work instructions, training and support.",
        "Experience across high-demand, safety-critical environments.",
        "Support for smart glasses and mobile devices, with a roadmap for modern AR headsets.",
        "Integration options with your existing systems for maintenance, quality, learning or production data.",
      ],
      conclusion: "We work with a growing network of local technology, integration and education partners to ensure that AR and AI connect to your reality – technically, organisationally and culturally.",
    },
    whoWeAre: {
      title: "Who we are",
      intro: "ActARion was founded by experienced entrepreneurs and operators who have built and scaled digital and industrial businesses. We combine:",
      items: [
        "A deep understanding of production, logistics and regulated environments.",
        "Experience in digital transformation and change management.",
        "A strong partnership with a specialised AR & AI technology provider.",
      ],
      helpIntro: "We are not just here to sell software. We are here to help you answer questions like:",
      helpItems: [
        "Where does AR and AI really add value in your operations?",
        "How do we bring operators, engineers, quality and HR together around one way of working?",
        "How do we start small, learn fast and build towards a sustainable, scalable solution?",
      ],
      conclusionBefore: "If these are questions you recognise, we would be happy to explore them with you – starting with a concrete use case from our ",
      conclusionLink: "use case library",
      conclusionAfter: ".",
    },
  },
  nl: {
    intro: {
      p1: "Bij ActARion helpen we industriële, logistieke en energiebedrijven om de manier van werken op de werkvloer te heroverwegen. We combineren augmented reality (AR) en AI-gestuurde werkinstructies om uw beste expertise om te zetten in praktische begeleiding die elke operator kan volgen in de echte omgeving, op echte apparatuur, op het exacte moment dat het nodig is.",
      p2: "Onze oplossingen bouwen voort op het DeepSight-platform, dat al wordt gebruikt in veeleisende sectoren zoals mijnbouw, luchtvaart en geavanceerde productie. We brengen deze mogelijkheid naar Europese organisaties die slimmer, veiliger en sneller willen werken.",
    },
    whyChange: {
      title: "Waarom werk moet veranderen",
      intro: "Technologie verandert hoe we leven, leren en werken – en het tempo blijft versnellen. Tegelijkertijd worstelen veel organisaties met dezelfde vragen:",
      questions: [
        "Hoe houden we nieuwe technologie bij terwijl de productie moet doordraaien?",
        "Hoe gaan we om met tekorten aan technisch talent en de pensionering van ervaren medewerkers?",
        "Hoe trainen we een nieuwe generatie die visueel leert, on-demand en op hun eigen voorwaarden?",
        "Hoe verminderen we stilstand en fouten wanneer processen, producten en regelgeving sneller veranderen dan onze documentatie?",
      ],
      conclusion: "Traditionele aanpakken – ordners, PDF's, klassikale training, meelopen – zijn niet langer voldoende. Ze zijn traag om bij te werken, moeilijk te doorzoeken en lastig te standaardiseren over ploegen, locaties en landen. We zijn ActARion gestart om precies dit gat te dichten.",
    },
    whatWeDo: {
      title: "Wat we doen",
      intro: "ActARion zet uw operationele knowhow om in AR-gestuurde, stapsgewijze begeleiding die draait op smart glasses, tablets en andere verbonden apparaten op de werkvloer.",
      inPractice: "In de praktijk betekent dit:",
      features: [
        {
          title: "Kenniscaptatie in de echte omgeving",
          text: "Experts nemen procedures direct op aan de lijn of installatie met smart glasses of mobiele apparaten. Geen apart filmteam, geen lange bewerkingscycli – gewoon echt werk, één keer vastgelegd en gestructureerd in herbruikbare AR Standard Operating Procedures (AR-SOPs).",
        },
        {
          title: "Begeleide werkinstructies met AR en AI",
          text: "Operators zien precies wat ze moeten doen, geprojecteerd op de echte wereld: 3D-aanwijzingen, afbeeldingen en korte videofragmenten ondersteund door bondige tekst, automatische vertaling en optionele tekst-naar-spraak. Dit vermindert de cognitieve belasting en maakt complexe taken toegankelijk voor zowel nieuwe als ervaren operators.",
        },
        {
          title: "Remote expert support wanneer het er echt toe doet",
          textBefore: "Wanneer een storing optreedt of een zeldzaam scenario zich voordoet, kunnen operators een expert bellen die ziet wat zij zien en direct in hun gezichtsveld kan annoteren. Dit ondersteunt onze ",
          linkText: "remote expert support voor correctief onderhoud",
          textAfter: " use case.",
        },
        {
          title: "Data voor continue verbetering",
          text: "Elke uitvoering van een handleiding kan bewijs verzamelen (foto's, video, bevestigingen) en prestatiemetrieken zoals tijd, foutenpercentages en voltooide stappen. Dit voedt een competentiematrix en helpt u procedures, training en onderhoudsstrategieën in de loop van de tijd te optimaliseren.",
        },
      ],
      portfolioIntro: "Ons use case portfolio varieert van ",
      portfolioLinks: {
        assembly: "AR-geleide assemblage voor foutloze productie",
        changeover: "begeleide omstellingen om stilstand te verminderen",
        maintenance: "preventief onderhoud met datagedreven inzichten",
        training: "training en onboarding voor industriële teams",
        overview: "use case overzichtspagina",
      },
    },
    challenges: {
      title: "De uitdagingen die we helpen oplossen",
      intro: "In de productie-, logistiek- en verwerkingsindustrieën zien we terugkerende patronen:",
      items: [
        {
          title: "Bedrijfsgeheugen in gevaar",
          textBefore: "Procedures zitten in de hoofden van een paar veteranen of in verspreide notities en video's. Wanneer mensen vertrekken, vertrekt kennis mee. Onze ",
          linkText: "AR werkinstructies en SOPs om bedrijfsgeheugen te behouden",
          textAfter: " use case pakt dit direct aan.",
        },
        {
          title: "Trage, inconsistente onboarding",
          textBefore: "Nieuwe medewerkers zijn afhankelijk van meelopen, waardoor ervaren personeel wordt weggetrokken van de productie en verschillende manieren van werken ontstaan per ploeg, lijn of fabriek. Met ",
          linkText: "AR training en onboarding",
          textAfter: " verkorten we de tijd tot competentie en standaardiseren we het leren.",
        },
        {
          title: "Papieren en PDF-instructies die niet overeenkomen met de realiteit",
          text: "Werkinstructies zijn moeilijk te onderhouden, worden niet altijd geopend en lopen vaak achter op het daadwerkelijke proces.",
        },
        {
          title: "Complexe omstellingen en batchvoorbereiding",
          textBefore: "Setups en omstellingen zijn tijdrovend, foutgevoelig en sterk afhankelijk van specifieke mensen. Onze ",
          linkText: "begeleide omstelling",
          textAfter: " aanpak maakt dit robuuster.",
        },
        {
          title: "Preventief en correctief onderhoud onder druk",
          textBefore: "Onderhoudsteams moeten de uptime hoog houden terwijl ze te maken hebben met complexe assets, lange reistijden en onvolledige histories. Hier werken ",
          linkText1: "AR-geleid preventief onderhoud",
          textMiddle: " en ",
          linkText2: "remote expert support",
          textAfter: " hand in hand.",
        },
      ],
      conclusion: "Al deze use cases worden ondersteund door één centrale AR-SOP-bibliotheek, zodat u gestandaardiseerde manieren van werken kunt opbouwen, onderhouden en uitrollen over locaties en landen.",
    },
    howWeWork: {
      title: "Hoe we met u samenwerken",
      intro: "We geloven in \"denk groot, handel klein en toon resultaten\". In plaats van lange programma's richten we ons op concrete use cases met meetbare impact.",
      steps: [
        {
          title: "Vertrekpunt",
          text: "We beginnen met uw strategische en operationele vragen. Waar zitten de grootste risico's? Waar doen fouten of stilstanden het meeste pijn? Waar is kennis het meest kwetsbaar?",
        },
        {
          title: "Gebruikersinzichten op de werkvloer",
          text: "We praten met operators, teamleiders, kwaliteits- en onderhoudspersoneel om te begrijpen hoe werk vandaag echt gebeurt en waar digitale ondersteuning kan helpen in plaats van afleiden.",
        },
        {
          title: "Samen een eerste oplossing creëren",
          text: "Samen selecteren we één of twee high-impact use cases – bijvoorbeeld onboarding op een belangrijke lijn, een complexe omstelling of een risicovolle onderhoudsprocedure – en bouwen AR-handleidingen met uw experts.",
        },
        {
          title: "Pilot → impact → schalen",
          text: "We draaien een pilot, meten impact (trainingstijd, foutenpercentages, stilstand, first-time-right), verfijnen de handleidingen en creëren vervolgens een roadmap om uit te rollen naar andere lijnen, locaties of landen.",
        },
      ],
      conclusion: "Op deze manier zijn AR en AI geen \"glanzende demo\" maar een praktisch hulpmiddel dat waarde bewijst in weken, niet jaren.",
    },
    ecosystem: {
      title: "Ons ecosysteem",
      intro: "ActARion is de Europese partner van DeepSight, een in Montreal gevestigd AR- en generatief AI-kennismanagementplatform dat wordt gebruikt in industrieën zoals mijnbouw, luchtvaart, agro-food, hout- en metaalverwerking en transport.",
      together: "Samen brengen we:",
      items: [
        "Een volwassen AR & AI platform gericht op werkinstructies, training en ondersteuning.",
        "Ervaring in veeleisende, veiligheidskritische omgevingen.",
        "Ondersteuning voor smart glasses en mobiele apparaten, met een roadmap voor moderne AR-headsets.",
        "Integratiemogelijkheden met uw bestaande systemen voor onderhoud, kwaliteit, leren of productiedata.",
      ],
      conclusion: "We werken met een groeiend netwerk van lokale technologie-, integratie- en opleidingspartners om ervoor te zorgen dat AR en AI aansluiten bij uw realiteit – technisch, organisatorisch en cultureel.",
    },
    whoWeAre: {
      title: "Wie we zijn",
      intro: "ActARion is opgericht door ervaren ondernemers en operators die digitale en industriële bedrijven hebben opgebouwd en geschaald. We combineren:",
      items: [
        "Een diep begrip van productie, logistiek en gereguleerde omgevingen.",
        "Ervaring in digitale transformatie en verandermanagement.",
        "Een sterke samenwerking met een gespecialiseerde AR & AI technologiepartner.",
      ],
      helpIntro: "We zijn hier niet alleen om software te verkopen. We zijn hier om u te helpen vragen te beantwoorden zoals:",
      helpItems: [
        "Waar voegen AR en AI echt waarde toe in uw operaties?",
        "Hoe brengen we operators, engineers, kwaliteit en HR samen rond één manier van werken?",
        "Hoe beginnen we klein, leren we snel en bouwen we naar een duurzame, schaalbare oplossing?",
      ],
      conclusionBefore: "Als dit vragen zijn die u herkent, verkennen we graag met u – te beginnen met een concrete use case uit onze ",
      conclusionLink: "use case bibliotheek",
      conclusionAfter: ".",
    },
  },
  de: {
    intro: {
      p1: "Bei ActARion helfen wir Industrie-, Logistik- und Energieunternehmen, die Arbeitsweise auf dem Shopfloor neu zu denken. Wir kombinieren Augmented Reality (AR) und KI-gesteuerte Arbeitsanweisungen, um Ihr bestes Fachwissen in praktische Anleitungen umzuwandeln, die jeder Bediener in der realen Umgebung, an realer Ausrüstung, genau im Moment des Bedarfs befolgen kann.",
      p2: "Unsere Lösungen bauen auf der DeepSight-Plattform auf, die bereits in anspruchsvollen Sektoren wie Bergbau, Luft- und Raumfahrt und fortgeschrittener Fertigung eingesetzt wird. Wir bringen diese Fähigkeit zu europäischen Organisationen, die smarter, sicherer und schneller arbeiten wollen.",
    },
    whyChange: {
      title: "Warum sich Arbeit ändern muss",
      intro: "Technologie verändert, wie wir leben, lernen und arbeiten – und das Tempo beschleunigt sich weiter. Gleichzeitig kämpfen viele Organisationen mit denselben Fragen:",
      questions: [
        "Wie halten wir mit neuer Technologie Schritt, während die Produktion weiterlaufen muss?",
        "Wie gehen wir mit dem Mangel an technischem Talent und der Pensionierung erfahrener Mitarbeiter um?",
        "Wie schulen wir eine neue Generation, die visuell lernt, on-demand und zu ihren eigenen Bedingungen?",
        "Wie reduzieren wir Stillstandzeiten und Fehler, wenn Prozesse, Produkte und Vorschriften schneller ändern als unsere Dokumentation?",
      ],
      conclusion: "Traditionelle Ansätze – Ordner, PDFs, Klassenzimmer-Schulungen, Job-Shadowing – reichen nicht mehr aus. Sie sind langsam zu aktualisieren, schwer zu durchsuchen und schwierig über Schichten, Standorte und Länder hinweg zu standardisieren. Wir haben ActARion gegründet, um genau diese Lücke zu schließen.",
    },
    whatWeDo: {
      title: "Was wir tun",
      intro: "ActARion verwandelt Ihr operatives Know-how in AR-gestützte, schrittweise Anleitungen, die auf Smart Glasses, Tablets und anderen vernetzten Geräten auf dem Shopfloor laufen.",
      inPractice: "In der Praxis bedeutet das:",
      features: [
        {
          title: "Wissenserfassung in der realen Umgebung",
          text: "Experten zeichnen Verfahren direkt an der Linie oder Anlage mit Smart Glasses oder mobilen Geräten auf. Kein separates Filmteam, keine langen Bearbeitungszyklen – einfach echte Arbeit, einmal erfasst und in wiederverwendbare AR Standard Operating Procedures (AR-SOPs) strukturiert.",
        },
        {
          title: "Geführte Arbeitsanweisungen mit AR und KI",
          text: "Bediener sehen genau, was als nächstes zu tun ist, überlagert auf die reale Welt: 3D-Hinweise, Bilder und kurze Videoclips, unterstützt durch prägnanten Text, automatische Übersetzung und optionale Text-zu-Sprache. Dies reduziert die kognitive Belastung und macht komplexe Aufgaben sowohl für neue als auch für erfahrene Bediener zugänglich.",
        },
        {
          title: "Remote-Experten-Support, wenn es wirklich darauf ankommt",
          textBefore: "Wenn eine Störung auftritt oder ein seltenes Szenario erscheint, können Bediener einen Experten anrufen, der sieht, was sie sehen, und direkt in ihrem Sichtfeld annotieren kann. Dies unterstützt unseren ",
          linkText: "Remote-Experten-Support für korrektive Instandhaltung",
          textAfter: " Anwendungsfall.",
        },
        {
          title: "Daten für kontinuierliche Verbesserung",
          text: "Jede Ausführung einer Anleitung kann Nachweise sammeln (Fotos, Video, Bestätigungen) und Leistungskennzahlen wie Zeit, Fehlerquoten und Abschlussschritte. Dies speist eine Kompetenzmatrix und hilft Ihnen, Verfahren, Schulungen und Wartungsstrategien im Laufe der Zeit zu optimieren.",
        },
      ],
      portfolioIntro: "Unser Anwendungsfall-Portfolio reicht von ",
      portfolioLinks: {
        assembly: "AR-geführter Montage für fehlerfreie Produktion",
        changeover: "geführten Umrüstungen zur Reduzierung von Stillstandzeiten",
        maintenance: "präventiver Wartung mit datengestützten Erkenntnissen",
        training: "Schulung und Onboarding für Industrieteams",
        overview: "Anwendungsfall-Übersichtsseite",
      },
    },
    challenges: {
      title: "Die Herausforderungen, die wir lösen helfen",
      intro: "In der Fertigungs-, Logistik- und Verarbeitungsindustrie sehen wir wiederkehrende Muster:",
      items: [
        {
          title: "Unternehmensgedächtnis in Gefahr",
          textBefore: "Verfahren leben in den Köpfen einiger weniger Veteranen oder in verstreuten Notizen und Videos. Wenn Menschen gehen, geht Wissen mit ihnen. Unser ",
          linkText: "AR-Arbeitsanweisungen und SOPs zur Bewahrung des Unternehmensgedächtnisses",
          textAfter: " Anwendungsfall adressiert dies direkt.",
        },
        {
          title: "Langsames, inkonsistentes Onboarding",
          textBefore: "Neue Mitarbeiter sind auf Job-Shadowing angewiesen, was erfahrenes Personal von der Produktion abzieht und zu unterschiedlichen Arbeitsweisen pro Schicht, Linie oder Werk führt. Mit ",
          linkText: "AR-Schulung und Onboarding",
          textAfter: " verkürzen wir die Zeit bis zur Kompetenz und standardisieren das Lernen.",
        },
        {
          title: "Papier- und PDF-Anweisungen, die nicht der Realität entsprechen",
          text: "Arbeitsanweisungen sind schwer zu pflegen, werden nicht immer geöffnet und hinken oft dem tatsächlichen Prozess hinterher.",
        },
        {
          title: "Komplexe Umrüstungen und Chargenvorbereitung",
          textBefore: "Setups und Umrüstungen sind zeitaufwendig, fehleranfällig und stark von bestimmten Personen abhängig. Unser ",
          linkText: "geführter Umrüstungs",
          textAfter: "-Ansatz macht dies robuster.",
        },
        {
          title: "Präventive und korrektive Wartung unter Druck",
          textBefore: "Wartungsteams müssen die Verfügbarkeit hoch halten, während sie mit komplexen Anlagen, langen Fahrtzeiten und unvollständigen Historien zu kämpfen haben. Hier arbeiten ",
          linkText1: "AR-geführte präventive Wartung",
          textMiddle: " und ",
          linkText2: "Remote-Experten-Support",
          textAfter: " Hand in Hand.",
        },
      ],
      conclusion: "All diese Anwendungsfälle werden von einer zentralen AR-SOP-Bibliothek unterstützt, sodass Sie standardisierte Arbeitsweisen über Standorte und Länder hinweg aufbauen, pflegen und ausrollen können.",
    },
    howWeWork: {
      title: "Wie wir mit Ihnen arbeiten",
      intro: "Wir glauben an \"groß denken, klein handeln und Ergebnisse zeigen\". Anstatt langer Programme konzentrieren wir uns auf konkrete Anwendungsfälle mit messbarem Impact.",
      steps: [
        {
          title: "Ausgangspunkt",
          text: "Wir beginnen mit Ihren strategischen und operativen Fragen. Wo sind die größten Risiken? Wo schmerzen Fehler oder Stillstände am meisten? Wo ist Wissen am fragilsten?",
        },
        {
          title: "Nutzereinblicke auf dem Shopfloor",
          text: "Wir sprechen mit Bedienern, Teamleitern, Qualitäts- und Wartungspersonal, um zu verstehen, wie Arbeit heute wirklich abläuft und wo digitale Unterstützung helfen kann, statt abzulenken.",
        },
        {
          title: "Gemeinsam eine erste Lösung entwickeln",
          text: "Zusammen wählen wir ein oder zwei High-Impact-Anwendungsfälle – zum Beispiel Onboarding an einer wichtigen Linie, eine komplexe Umrüstung oder ein Hochrisiko-Wartungsverfahren – und erstellen AR-Anleitungen mit Ihren Experten.",
        },
        {
          title: "Pilot → Impact → Skalieren",
          text: "Wir führen einen Piloten durch, messen den Impact (Schulungszeit, Fehlerquoten, Stillstandzeit, First-Time-Right), verfeinern die Anleitungen und erstellen dann eine Roadmap für den Rollout auf andere Linien, Standorte oder Länder.",
        },
      ],
      conclusion: "Auf diese Weise sind AR und KI keine \"glänzende Demo\", sondern ein praktisches Werkzeug, das in Wochen, nicht Jahren, Wert beweist.",
    },
    ecosystem: {
      title: "Unser Ökosystem",
      intro: "ActARion ist der europäische Partner von DeepSight, einer in Montreal ansässigen AR- und generativen KI-Wissensmanagement-Plattform, die in Branchen wie Bergbau, Luft- und Raumfahrt, Agro-Food, Holz- und Metallverarbeitung und Transport eingesetzt wird.",
      together: "Gemeinsam bringen wir:",
      items: [
        "Eine ausgereifte AR & KI-Plattform, fokussiert auf Arbeitsanweisungen, Schulung und Support.",
        "Erfahrung in anspruchsvollen, sicherheitskritischen Umgebungen.",
        "Unterstützung für Smart Glasses und mobile Geräte, mit einer Roadmap für moderne AR-Headsets.",
        "Integrationsmöglichkeiten mit Ihren bestehenden Systemen für Wartung, Qualität, Lernen oder Produktionsdaten.",
      ],
      conclusion: "Wir arbeiten mit einem wachsenden Netzwerk lokaler Technologie-, Integrations- und Bildungspartner zusammen, um sicherzustellen, dass AR und KI mit Ihrer Realität verbunden sind – technisch, organisatorisch und kulturell.",
    },
    whoWeAre: {
      title: "Wer wir sind",
      intro: "ActARion wurde von erfahrenen Unternehmern und Operatoren gegründet, die digitale und industrielle Unternehmen aufgebaut und skaliert haben. Wir kombinieren:",
      items: [
        "Ein tiefes Verständnis von Produktion, Logistik und regulierten Umgebungen.",
        "Erfahrung in digitaler Transformation und Change Management.",
        "Eine starke Partnerschaft mit einem spezialisierten AR & KI-Technologieanbieter.",
      ],
      helpIntro: "Wir sind nicht nur hier, um Software zu verkaufen. Wir sind hier, um Ihnen bei der Beantwortung von Fragen zu helfen wie:",
      helpItems: [
        "Wo schaffen AR und KI wirklich Mehrwert in Ihren Abläufen?",
        "Wie bringen wir Bediener, Ingenieure, Qualität und HR um eine Arbeitsweise zusammen?",
        "Wie starten wir klein, lernen schnell und bauen zu einer nachhaltigen, skalierbaren Lösung auf?",
      ],
      conclusionBefore: "Wenn dies Fragen sind, die Sie erkennen, würden wir sie gerne mit Ihnen erkunden – beginnend mit einem konkreten Anwendungsfall aus unserer ",
      conclusionLink: "Anwendungsfall-Bibliothek",
      conclusionAfter: ".",
    },
  },
};

export default function AboutPageClient({ locale, dictionary: _dictionary }: AboutPageClientProps) {
  // Get translations for current locale, fallback to English
  const t = translations[locale as keyof typeof translations] || translations.en;
  
  // Helper to build localized paths
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
        <div className="card space-y-10">
          {/* Intro */}
          <section className="section-stack">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.intro.p1}</p>
              <p>{t.intro.p2}</p>
            </div>
          </section>

          {/* Why work needs to change */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.whyChange.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.whyChange.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.whyChange.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
              <p>{t.whyChange.conclusion}</p>
            </div>
          </section>

          {/* What we do */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.whatWeDo.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.whatWeDo.intro}</p>
              <p>{t.whatWeDo.inPractice}</p>
              <ul className="space-y-5 list-none">
                {t.whatWeDo.features.map((feature, index) => (
                  <li key={index}>
                    <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                    {'text' in feature ? (
                      <p>{feature.text}</p>
                    ) : (
                      <p>
                        {feature.textBefore}
                        <Link
                          href={localePath("/ar-remote-expert-support-corrective-maintenance")}
                          className="text-actarion-blue hover:underline"
                        >
                          {feature.linkText}
                        </Link>
                        {feature.textAfter}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p>
                {t.whatWeDo.portfolioIntro}
                <Link
                  href={localePath("/ar-guided-assembly-production")}
                  className="text-actarion-blue hover:underline"
                >
                  {t.whatWeDo.portfolioLinks.assembly}
                </Link>
                {" "}{locale === "de" ? "und" : locale === "nl" ? "en" : "and"}{" "}
                <Link
                  href={localePath("/ar-guided-changeover-batch-preparation")}
                  className="text-actarion-blue hover:underline"
                >
                  {t.whatWeDo.portfolioLinks.changeover}
                </Link>
                {" "}{locale === "de" ? "bis zu" : locale === "nl" ? "tot" : "to"}{" "}
                <Link
                  href={localePath("/ar-preventive-maintenance")}
                  className="text-actarion-blue hover:underline"
                >
                  {t.whatWeDo.portfolioLinks.maintenance}
                </Link>
                {" "}{locale === "de" ? "und" : locale === "nl" ? "en" : "and"}{" "}
                <Link
                  href={localePath("/ar-training-and-onboarding")}
                  className="text-actarion-blue hover:underline"
                >
                  {t.whatWeDo.portfolioLinks.training}
                </Link>
                . {locale === "de" ? "Sie können alle Anwendungsfälle auf der" : locale === "nl" ? "U kunt alle use cases bekijken op de" : "You can explore all use cases on the"}{" "}
                <Link
                  href={localePath("/use-cases")}
                  className="text-actarion-blue hover:underline"
                >
                  {t.whatWeDo.portfolioLinks.overview}
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Challenges we help solve */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.challenges.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.challenges.intro}</p>
              <ul className="space-y-5 list-none">
                {t.challenges.items.map((item, index) => (
                  <li key={index}>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    {'text' in item ? (
                      <p>{item.text}</p>
                    ) : 'linkText1' in item ? (
                      <p>
                        {item.textBefore}
                        <Link
                          href={localePath("/ar-preventive-maintenance")}
                          className="text-actarion-blue hover:underline"
                        >
                          {item.linkText1}
                        </Link>
                        {item.textMiddle}
                        <Link
                          href={localePath("/ar-remote-expert-support-corrective-maintenance")}
                          className="text-actarion-blue hover:underline"
                        >
                          {item.linkText2}
                        </Link>
                        {item.textAfter}
                      </p>
                    ) : (
                      <p>
                        {item.textBefore}
                        <Link
                          href={localePath(
                            index === 0 ? "/ar-work-instructions-corporate-memory" :
                            index === 1 ? "/ar-training-and-onboarding" :
                            "/ar-guided-changeover-batch-preparation"
                          )}
                          className="text-actarion-blue hover:underline"
                        >
                          {item.linkText}
                        </Link>
                        {item.textAfter}
                      </p>
                    )}
                </li>
                ))}
              </ul>
              <p>{t.challenges.conclusion}</p>
            </div>
          </section>

          {/* How we work */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.howWeWork.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.howWeWork.intro}</p>
              <ol className="list-decimal pl-6 space-y-4 text-slate-700">
                {t.howWeWork.steps.map((step, index) => (
                  <li key={index}>
                    <strong className="text-slate-900">{step.title}</strong> – {step.text}
                </li>
                ))}
              </ol>
              <p>{t.howWeWork.conclusion}</p>
            </div>
          </section>

          {/* Ecosystem */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.ecosystem.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.ecosystem.intro}</p>
              <p>{t.ecosystem.together}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.ecosystem.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.ecosystem.conclusion}</p>
            </div>
          </section>

          {/* Who we are */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.whoWeAre.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.whoWeAre.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.whoWeAre.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.whoWeAre.helpIntro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.whoWeAre.helpItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                {t.whoWeAre.conclusionBefore}
                <Link
                  href={localePath("/use-cases")}
                  className="text-actarion-blue hover:underline"
                >
                  {t.whoWeAre.conclusionLink}
                </Link>
                {t.whoWeAre.conclusionAfter}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
