"use client";

import Image from "next/image";

interface ManagementPageClientProps {
  locale: string;
}

// Translations for all supported locales
const translations = {
  en: {
    intro: "At ActARion we believe that real change in how people work only succeeds when technology, operations and people are brought together. Our management team reflects exactly that mix.",
    ortwin: {
      name: "Ortwin Verreck",
      role: "Managing Partner – Benelux",
      bio: "Ortwin is an experienced entrepreneur with a long track record in building and scaling digital businesses in Europe. Before founding ActARion, he led and advised multiple companies in digital marketing, AI and SaaS – always with a focus on measurable business impact and practical implementation on the work floor.",
      experience: "Over the past years he has worked closely with industrial, logistics and technology-driven organisations on topics such as:",
      experienceItems: [
        "Digitising work instructions and training processes.",
        "Introducing new technologies like AI and AR in operational environments.",
        "Designing data-driven business models and go-to-market strategies.",
        "Building ecosystems of technology partners and implementation partners.",
      ],
      responsibility: "At ActARion, Ortwin is Managing Partner responsible for the Benelux region. He works with customers and partners in the Netherlands, Belgium and Luxembourg to:",
      responsibilityItems: [
        "Identify high-impact use cases for AR and AI in operations.",
        "Shape joint roadmaps for pilots and roll-outs.",
        "Connect organisations with the right technology, implementation and education partners.",
        "Safeguard that AR and AI projects are grounded in concrete business value: safer operations, faster onboarding and smarter decision-making.",
      ],
      strength: "Ortwin's strength lies in translating strategy and innovation into clear next steps for the organisation – from first pilot to international scale-up.",
    },
    mark: {
      name: "Mark Dercksen",
      role: "Managing Partner – DACH",
      bio: "Mark brings extensive experience in commercial, operational and transformation roles in international B2B environments. He has worked with industrial and technology-driven companies on topics like sales leadership, key account management, operational excellence and change management.",
      background: "His background includes:",
      backgroundItems: [
        "Leading and coaching sales and operations teams in complex, technical markets.",
        "Structuring and scaling recurring revenue and service models.",
        "Guiding organisations through change – from early adopters to broad adoption on the shop floor.",
        "Working across cultures and languages in multi-country settings.",
      ],
      responsibility: "At ActARion, Mark is Managing Partner responsible for the DACH region (Germany, Austria and Switzerland). He focuses on:",
      responsibilityItems: [
        "Building and supporting a strong network of customers and partners in DACH.",
        "Aligning AR and AI initiatives with local operational realities, regulations and culture.",
        "Ensuring implementations are robust, scalable and embedded in existing ways of working.",
        "Helping leadership teams translate strategic ambitions into concrete, phased programmes.",
      ],
      strength: "Mark's strength is bringing structure, pace and clarity to complex commercial and operational projects – ensuring that AR and AI become integral parts of daily work, not just innovation pilots.",
    },
    oneTeam: {
      title: "One team, shared mission",
      intro: "Together, Ortwin and Mark lead ActARion with a shared mission: help organisations in industry, logistics and energy work smarter, safer and faster with AI and Augmented Reality.",
      description: "They combine deep experience with digital and data-driven business models, a strong network in European industry and technology, and hands-on understanding of what it takes to change work on the shop floor.",
      cta: "If you operate in the Benelux and want to explore what AR and AI can mean for your way of working, Ortwin is your first point of contact. If you are based in the DACH region, Mark is ready to explore concrete use cases and next steps with you.",
    },
  },
  nl: {
    intro: "Bij ActARion geloven we dat echte verandering in hoe mensen werken alleen slaagt wanneer technologie, operations en mensen samenkomen. Ons managementteam weerspiegelt precies die mix.",
    ortwin: {
      name: "Ortwin Verreck",
      role: "Managing Partner – Benelux",
      bio: "Ortwin is een ervaren ondernemer met een lange staat van dienst in het bouwen en opschalen van digitale bedrijven in Europa. Voordat hij ActARion oprichtte, leidde en adviseerde hij meerdere bedrijven in digitale marketing, AI en SaaS – altijd met focus op meetbare business impact en praktische implementatie op de werkvloer.",
      experience: "De afgelopen jaren heeft hij nauw samengewerkt met industriële, logistieke en technologiegedreven organisaties op onderwerpen zoals:",
      experienceItems: [
        "Digitaliseren van werkinstructies en trainingsprocessen.",
        "Introduceren van nieuwe technologieën zoals AI en AR in operationele omgevingen.",
        "Ontwerpen van datagedreven businessmodellen en go-to-market strategieën.",
        "Opbouwen van ecosystemen van technologie- en implementatiepartners.",
      ],
      responsibility: "Bij ActARion is Ortwin Managing Partner verantwoordelijk voor de Benelux-regio. Hij werkt met klanten en partners in Nederland, België en Luxemburg aan:",
      responsibilityItems: [
        "Identificeren van high-impact use cases voor AR en AI in operations.",
        "Vormgeven van gezamenlijke roadmaps voor pilots en roll-outs.",
        "Verbinden van organisaties met de juiste technologie-, implementatie- en opleidingspartners.",
        "Bewaken dat AR en AI projecten gegrond zijn in concrete business value: veiligere operaties, snellere onboarding en slimmere besluitvorming.",
      ],
      strength: "Ortwins kracht ligt in het vertalen van strategie en innovatie naar duidelijke vervolgstappen voor de organisatie – van eerste pilot tot internationale opschaling.",
    },
    mark: {
      name: "Mark Dercksen",
      role: "Managing Partner – DACH",
      bio: "Mark brengt uitgebreide ervaring mee in commerciële, operationele en transformatierollen in internationale B2B-omgevingen. Hij heeft gewerkt met industriële en technologiegedreven bedrijven op onderwerpen als sales leadership, key account management, operational excellence en change management.",
      background: "Zijn achtergrond omvat:",
      backgroundItems: [
        "Leiden en coachen van sales- en operationele teams in complexe, technische markten.",
        "Structureren en opschalen van recurring revenue en servicemodellen.",
        "Begeleiden van organisaties door verandering – van early adopters tot brede adoptie op de werkvloer.",
        "Werken over culturen en talen heen in multi-country settings.",
      ],
      responsibility: "Bij ActARion is Mark Managing Partner verantwoordelijk voor de DACH-regio (Duitsland, Oostenrijk en Zwitserland). Hij richt zich op:",
      responsibilityItems: [
        "Opbouwen en ondersteunen van een sterk netwerk van klanten en partners in DACH.",
        "Afstemmen van AR en AI initiatieven op lokale operationele realiteiten, regelgeving en cultuur.",
        "Zorgen dat implementaties robuust, schaalbaar en ingebed zijn in bestaande manieren van werken.",
        "Helpen van leiderschapsteams bij het vertalen van strategische ambities naar concrete, gefaseerde programma's.",
      ],
      strength: "Marks kracht is het brengen van structuur, tempo en helderheid in complexe commerciële en operationele projecten – ervoor zorgen dat AR en AI integrale onderdelen worden van dagelijks werk, niet alleen innovatiepilots.",
    },
    oneTeam: {
      title: "Eén team, gedeelde missie",
      intro: "Samen leiden Ortwin en Mark ActARion met een gedeelde missie: organisaties in industrie, logistiek en energie helpen slimmer, veiliger en sneller te werken met AI en Augmented Reality.",
      description: "Ze combineren diepe ervaring met digitale en datagedreven businessmodellen, een sterk netwerk in Europese industrie en technologie, en hands-on begrip van wat er nodig is om werk op de werkvloer te veranderen.",
      cta: "Als u actief bent in de Benelux en wilt verkennen wat AR en AI kunnen betekenen voor uw manier van werken, is Ortwin uw eerste aanspreekpunt. Als u gevestigd bent in de DACH-regio, staat Mark klaar om concrete use cases en vervolgstappen met u te verkennen.",
    },
  },
  de: {
    intro: "Bei ActARion glauben wir, dass echte Veränderung in der Arbeitsweise nur gelingt, wenn Technologie, Betrieb und Menschen zusammengebracht werden. Unser Management-Team spiegelt genau diese Mischung wider.",
    ortwin: {
      name: "Ortwin Verreck",
      role: "Managing Partner – Benelux",
      bio: "Ortwin ist ein erfahrener Unternehmer mit einer langen Erfolgsbilanz im Aufbau und der Skalierung digitaler Unternehmen in Europa. Vor der Gründung von ActARion leitete und beriet er mehrere Unternehmen in den Bereichen digitales Marketing, KI und SaaS – immer mit Fokus auf messbare Geschäftswirkung und praktische Umsetzung auf dem Shopfloor.",
      experience: "In den vergangenen Jahren hat er eng mit Industrie-, Logistik- und technologiegetriebenen Organisationen an Themen wie diesen zusammengearbeitet:",
      experienceItems: [
        "Digitalisierung von Arbeitsanweisungen und Schulungsprozessen.",
        "Einführung neuer Technologien wie KI und AR in operativen Umgebungen.",
        "Gestaltung datengetriebener Geschäftsmodelle und Go-to-Market-Strategien.",
        "Aufbau von Ökosystemen aus Technologie- und Implementierungspartnern.",
      ],
      responsibility: "Bei ActARion ist Ortwin Managing Partner verantwortlich für die Benelux-Region. Er arbeitet mit Kunden und Partnern in den Niederlanden, Belgien und Luxemburg an:",
      responsibilityItems: [
        "Identifizierung von High-Impact Use Cases für AR und KI in Operationen.",
        "Gestaltung gemeinsamer Roadmaps für Piloten und Roll-outs.",
        "Verbindung von Organisationen mit den richtigen Technologie-, Implementierungs- und Bildungspartnern.",
        "Sicherstellung, dass AR- und KI-Projekte auf konkretem Geschäftswert basieren: sicherere Operationen, schnelleres Onboarding und intelligentere Entscheidungsfindung.",
      ],
      strength: "Ortwins Stärke liegt darin, Strategie und Innovation in klare nächste Schritte für die Organisation zu übersetzen – vom ersten Piloten bis zur internationalen Skalierung.",
    },
    mark: {
      name: "Mark Dercksen",
      role: "Managing Partner – DACH",
      bio: "Mark bringt umfangreiche Erfahrung in kommerziellen, operativen und Transformationsrollen in internationalen B2B-Umgebungen mit. Er hat mit Industrie- und technologiegetriebenen Unternehmen an Themen wie Vertriebsführung, Key Account Management, Operational Excellence und Change Management gearbeitet.",
      background: "Sein Hintergrund umfasst:",
      backgroundItems: [
        "Führung und Coaching von Vertriebs- und Operationsteams in komplexen, technischen Märkten.",
        "Strukturierung und Skalierung von wiederkehrenden Umsatz- und Servicemodellen.",
        "Begleitung von Organisationen durch Veränderung – von Early Adopters bis zur breiten Akzeptanz auf dem Shopfloor.",
        "Arbeit über Kulturen und Sprachen hinweg in Multi-Country-Settings.",
      ],
      responsibility: "Bei ActARion ist Mark Managing Partner verantwortlich für die DACH-Region (Deutschland, Österreich und Schweiz). Er konzentriert sich auf:",
      responsibilityItems: [
        "Aufbau und Unterstützung eines starken Netzwerks von Kunden und Partnern in DACH.",
        "Abstimmung von AR- und KI-Initiativen mit lokalen operativen Realitäten, Vorschriften und Kultur.",
        "Sicherstellung, dass Implementierungen robust, skalierbar und in bestehende Arbeitsweisen eingebettet sind.",
        "Unterstützung von Führungsteams bei der Übersetzung strategischer Ambitionen in konkrete, phasenweise Programme.",
      ],
      strength: "Marks Stärke ist es, Struktur, Tempo und Klarheit in komplexe kommerzielle und operative Projekte zu bringen – sicherzustellen, dass AR und KI integrale Bestandteile der täglichen Arbeit werden, nicht nur Innovationspiloten.",
    },
    oneTeam: {
      title: "Ein Team, gemeinsame Mission",
      intro: "Gemeinsam führen Ortwin und Mark ActARion mit einer gemeinsamen Mission: Organisationen in Industrie, Logistik und Energie dabei zu helfen, mit KI und Augmented Reality intelligenter, sicherer und schneller zu arbeiten.",
      description: "Sie kombinieren tiefe Erfahrung mit digitalen und datengetriebenen Geschäftsmodellen, ein starkes Netzwerk in europäischer Industrie und Technologie sowie praktisches Verständnis dafür, was es braucht, um Arbeit auf dem Shopfloor zu verändern.",
      cta: "Wenn Sie in der Benelux tätig sind und erkunden möchten, was AR und KI für Ihre Arbeitsweise bedeuten können, ist Ortwin Ihr erster Ansprechpartner. Wenn Sie in der DACH-Region ansässig sind, ist Mark bereit, konkrete Use Cases und nächste Schritte mit Ihnen zu erkunden.",
    },
  },
};

export default function ManagementPageClient({ locale }: ManagementPageClientProps) {
  // Get translations for current locale, fallback to English
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
        <div className="card space-y-10">
          {/* Intro */}
          <section className="section-stack">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.intro}</p>
            </div>
          </section>

          {/* Ortwin Verreck */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <Image
                  src="/ortwin-verreck.png"
                  alt="Ortwin Verreck - Managing Partner Benelux"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-40 h-40 md:w-48 md:h-48"
                />
              </div>
              <div>
                <h2 className="section-heading">{t.ortwin.name}</h2>
                <p className="font-medium text-slate-600 mt-1">{t.ortwin.role}</p>
              </div>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.ortwin.bio}</p>
              <p>{t.ortwin.experience}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.ortwin.experienceItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.ortwin.responsibility}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.ortwin.responsibilityItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.ortwin.strength}</p>
            </div>
          </section>

          {/* Mark Dercksen */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <Image
                  src="/marc-dercksen.png"
                  alt="Mark Dercksen - Managing Partner DACH"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-40 h-40 md:w-48 md:h-48"
                />
              </div>
              <div>
                <h2 className="section-heading">{t.mark.name}</h2>
                <p className="font-medium text-slate-600 mt-1">{t.mark.role}</p>
              </div>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.mark.bio}</p>
              <p>{t.mark.background}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.mark.backgroundItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.mark.responsibility}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.mark.responsibilityItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.mark.strength}</p>
            </div>
          </section>

          {/* One team, shared mission */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">{t.oneTeam.title}</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong>{t.oneTeam.intro}</strong>
              </p>
              <p>{t.oneTeam.description}</p>
              <p>{t.oneTeam.cta}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

