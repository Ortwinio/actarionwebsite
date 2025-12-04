"use client";

interface VisionPageClientProps {
  locale: string;
}

// Translations for all supported locales
const translations = {
  en: {
    intro: {
      p1: "At ActARion we believe the future of work in industry is not about more complexity, but about giving people simpler, smarter ways to do complex work.",
      p2: "Our vision is a world where every operator can perform critical tasks first-time-right, knowledge is captured and shared instead of disappearing, and training and support are embedded in the work itself rather than hidden in manuals and classrooms.",
    },
    whyChange: {
      title: "Why the way we work must change",
      intro: "Industrial, logistics and energy companies face structural shifts:",
      items: [
        "Shortage of skilled people and ageing workforces.",
        "Increasing product and process complexity.",
        "Stricter safety, quality and regulatory requirements.",
        "Pressure on costs, uptime and lead times.",
      ],
      conclusion: "Meanwhile, the way we transfer knowledge and train people has hardly changed: static procedures, classroom training and job shadowing that depend on who is available. This model does not scale. We need dynamic, visual and data-driven guidance that can follow the pace of change.",
    },
    guidedWork: {
      title: "From documents to guided work",
      p1: "We believe work instructions should move from documents that you need to search, interpret and remember, to guided experiences that show you step-by-step what to do, when and why.",
      p2: "With AR and AI this means:",
      items: [
        "Instructions that live on the asset – overlaid on the real equipment or workspace.",
        "Context-aware support: the right step, at the right moment, in the right language.",
        "Real-time capture of what actually happened: checks, photos, measurements and notes.",
      ],
      conclusion: "In this world, the \"procedure\" is no longer a static PDF, but a living guide that supports assembly and production, standardises changeovers, helps technicians with preventive and corrective maintenance, onboards new colleagues and preserves corporate memory.",
    },
    peopleFirst: {
      title: "People first, then technology",
      p1: "Our vision is not fully automated factories where people disappear. We see a different path: people remain central in production, maintenance and logistics, while technology removes friction, guesswork and routine overhead.",
      p2: "That is why we design solutions around:",
      items: [
        { strong: "Clarity for operators", text: " – simple, visual steps instead of long texts." },
        { strong: "Confidence for experts", text: " – knowing their way of working is captured, reused and improved." },
        { strong: "Control for management", text: " – insight into skills, compliance and performance." },
      ],
      conclusion: "AR and AI are there to make people more capable and more independent, not to replace them.",
    },
    ecosystem: {
      title: "Our role in the ecosystem",
      p1: "We do not aim to be yet another platform on its own. Our vision is to be a bridge between mature AR & AI technology, the realities of European factories and logistics operations, and local partners for implementation, hardware and training.",
      p2: "Concretely, that means:",
      items: [
        "Helping organisations choose the right first use cases, not just the most impressive demo.",
        "Bringing together operations, maintenance, quality, HR and IT around one way of working.",
        "Working with local partners in Benelux and DACH who understand the culture and the shop floor.",
        "Integrating with existing systems where it makes sense, instead of creating new islands.",
      ],
      conclusion: "We want to be the team you call when you say: \"We know we should do something with AR and AI on the shop floor – but where do we start, and how do we make it stick?\"",
    },
    responsible: {
      title: "Responsible and sustainable innovation",
      intro: "Our vision for AR and AI is also about responsibility. Solutions must be transparent, safe, measurable and sustainable.",
      items: [
        { strong: "Transparent", text: " – operators understand what the system does and what it does not do." },
        { strong: "Safe", text: " – solutions strengthen safety culture instead of encouraging shortcuts." },
        { strong: "Measurable", text: " – every project has clear goals and metrics such as errors, downtime and training time." },
        { strong: "Sustainable", text: " – content and processes are maintainable by your own teams, not only by external consultants." },
      ],
      conclusion: "We aim for solutions that you can explain and defend to operators, unions, customers, auditors and your board.",
    },
    heading: {
      title: "Where we are heading",
      intro: "In the coming years we see three major shifts and shape our roadmap accordingly:",
      items: [
        { strong: "From pilots to standard practice", text: " – AR and AI will move from innovation labs into standard operating procedures, training plans and maintenance routines." },
        { strong: "From isolated plants to connected networks", text: " – best practices will be captured once and shared across sites, countries and partners, while still allowing local adaptation." },
        { strong: "From reactive to predictive guidance", text: " – data from executions, sensors and systems will allow AI to suggest improvements, identify risks and personalise guidance." },
      ],
      conclusion: "ActARion's vision is to guide organisations through this journey – starting with one concrete use case, but with a clear line of sight to a smarter, safer and faster way of working across the whole operation.",
    },
  },
  nl: {
    intro: {
      p1: "Bij ActARion geloven we dat de toekomst van werk in de industrie niet gaat over meer complexiteit, maar over het geven van eenvoudigere, slimmere manieren om complex werk te doen.",
      p2: "Onze visie is een wereld waarin elke operator kritieke taken in één keer goed kan uitvoeren, kennis wordt vastgelegd en gedeeld in plaats van te verdwijnen, en training en ondersteuning zijn ingebed in het werk zelf in plaats van verborgen in handleidingen en klaslokalen.",
    },
    whyChange: {
      title: "Waarom de manier waarop we werken moet veranderen",
      intro: "Industriële, logistieke en energiebedrijven worden geconfronteerd met structurele verschuivingen:",
      items: [
        "Tekort aan geschoolde mensen en vergrijzende werknemers.",
        "Toenemende product- en procescomplexiteit.",
        "Strengere veiligheids-, kwaliteits- en regelgevingseisen.",
        "Druk op kosten, uptime en doorlooptijden.",
      ],
      conclusion: "Ondertussen is de manier waarop we kennis overdragen en mensen opleiden nauwelijks veranderd: statische procedures, klassikale training en meelopen die afhangen van wie beschikbaar is. Dit model schaalt niet. We hebben dynamische, visuele en datagedreven begeleiding nodig die het tempo van verandering kan volgen.",
    },
    guidedWork: {
      title: "Van documenten naar begeleide werkzaamheden",
      p1: "Wij geloven dat werkinstructies moeten evolueren van documenten die je moet doorzoeken, interpreteren en onthouden, naar begeleide ervaringen die je stap voor stap laten zien wat je moet doen, wanneer en waarom.",
      p2: "Met AR en AI betekent dit:",
      items: [
        "Instructies die leven op het asset – geprojecteerd op de echte apparatuur of werkruimte.",
        "Contextbewuste ondersteuning: de juiste stap, op het juiste moment, in de juiste taal.",
        "Real-time vastlegging van wat er daadwerkelijk is gebeurd: controles, foto's, metingen en notities.",
      ],
      conclusion: "In deze wereld is de \"procedure\" niet langer een statische PDF, maar een levende gids die assemblage en productie ondersteunt, omstellingen standaardiseert, technici helpt bij preventief en correctief onderhoud, nieuwe collega's inwerkt en bedrijfsgeheugen bewaart.",
    },
    peopleFirst: {
      title: "Eerst mensen, dan technologie",
      p1: "Onze visie is niet volledig geautomatiseerde fabrieken waar mensen verdwijnen. Wij zien een ander pad: mensen blijven centraal in productie, onderhoud en logistiek, terwijl technologie wrijving, giswerk en routinematige overhead verwijdert.",
      p2: "Daarom ontwerpen we oplossingen rond:",
      items: [
        { strong: "Duidelijkheid voor operators", text: " – eenvoudige, visuele stappen in plaats van lange teksten." },
        { strong: "Vertrouwen voor experts", text: " – wetende dat hun manier van werken wordt vastgelegd, hergebruikt en verbeterd." },
        { strong: "Controle voor management", text: " – inzicht in vaardigheden, compliance en prestaties." },
      ],
      conclusion: "AR en AI zijn er om mensen capabeler en onafhankelijker te maken, niet om ze te vervangen.",
    },
    ecosystem: {
      title: "Onze rol in het ecosysteem",
      p1: "We streven er niet naar om zomaar een ander platform op zichzelf te zijn. Onze visie is om een brug te zijn tussen volwassen AR & AI-technologie, de realiteiten van Europese fabrieken en logistieke operaties, en lokale partners voor implementatie, hardware en training.",
      p2: "Concreet betekent dat:",
      items: [
        "Organisaties helpen de juiste eerste use cases te kiezen, niet alleen de meest indrukwekkende demo.",
        "Operations, onderhoud, kwaliteit, HR en IT samenbrengen rond één manier van werken.",
        "Samenwerken met lokale partners in Benelux en DACH die de cultuur en de werkvloer begrijpen.",
        "Integreren met bestaande systemen waar het zinvol is, in plaats van nieuwe eilanden te creëren.",
      ],
      conclusion: "We willen het team zijn dat je belt wanneer je zegt: \"We weten dat we iets moeten doen met AR en AI op de werkvloer – maar waar beginnen we, en hoe zorgen we dat het beklijft?\"",
    },
    responsible: {
      title: "Verantwoorde en duurzame innovatie",
      intro: "Onze visie voor AR en AI gaat ook over verantwoordelijkheid. Oplossingen moeten transparant, veilig, meetbaar en duurzaam zijn.",
      items: [
        { strong: "Transparant", text: " – operators begrijpen wat het systeem wel en niet doet." },
        { strong: "Veilig", text: " – oplossingen versterken de veiligheidscultuur in plaats van shortcuts aan te moedigen." },
        { strong: "Meetbaar", text: " – elk project heeft duidelijke doelen en metrics zoals fouten, downtime en trainingstijd." },
        { strong: "Duurzaam", text: " – content en processen zijn onderhoudbaar door je eigen teams, niet alleen door externe consultants." },
      ],
      conclusion: "We streven naar oplossingen die je kunt uitleggen en verdedigen tegenover operators, vakbonden, klanten, auditors en je bestuur.",
    },
    heading: {
      title: "Waar we naartoe gaan",
      intro: "In de komende jaren zien we drie grote verschuivingen en vormen we onze roadmap dienovereenkomstig:",
      items: [
        { strong: "Van pilots naar standaardpraktijk", text: " – AR en AI zullen van innovatielabs naar standaard operationele procedures, trainingsplannen en onderhoudsroutines gaan." },
        { strong: "Van geïsoleerde fabrieken naar verbonden netwerken", text: " – best practices worden eenmalig vastgelegd en gedeeld over locaties, landen en partners, terwijl lokale aanpassing mogelijk blijft." },
        { strong: "Van reactieve naar predictieve begeleiding", text: " – data van uitvoeringen, sensoren en systemen zullen AI in staat stellen verbeteringen voor te stellen, risico's te identificeren en begeleiding te personaliseren." },
      ],
      conclusion: "De visie van ActARion is om organisaties door deze reis te begeleiden – beginnend met één concrete use case, maar met een duidelijk zicht op een slimmere, veiligere en snellere manier van werken over de hele operatie.",
    },
  },
  de: {
    intro: {
      p1: "Bei ActARion glauben wir, dass die Zukunft der Arbeit in der Industrie nicht mehr Komplexität bedeutet, sondern Menschen einfachere, intelligentere Wege zu geben, um komplexe Arbeit zu erledigen.",
      p2: "Unsere Vision ist eine Welt, in der jeder Operator kritische Aufgaben beim ersten Mal richtig ausführen kann, Wissen erfasst und geteilt wird statt zu verschwinden, und Training und Unterstützung in die Arbeit selbst eingebettet sind anstatt in Handbüchern und Klassenzimmern versteckt zu sein.",
    },
    whyChange: {
      title: "Warum sich die Art, wie wir arbeiten, ändern muss",
      intro: "Industrie-, Logistik- und Energieunternehmen stehen vor strukturellen Veränderungen:",
      items: [
        "Mangel an Fachkräften und alternde Belegschaften.",
        "Zunehmende Produkt- und Prozesskomplexität.",
        "Strengere Sicherheits-, Qualitäts- und Regulierungsanforderungen.",
        "Druck auf Kosten, Verfügbarkeit und Durchlaufzeiten.",
      ],
      conclusion: "Inzwischen hat sich die Art, wie wir Wissen transferieren und Menschen ausbilden, kaum verändert: statische Verfahren, Klassenzimmertraining und Job Shadowing, das davon abhängt, wer verfügbar ist. Dieses Modell skaliert nicht. Wir brauchen dynamische, visuelle und datengetriebene Anleitung, die dem Tempo des Wandels folgen kann.",
    },
    guidedWork: {
      title: "Von Dokumenten zu geführter Arbeit",
      p1: "Wir glauben, dass Arbeitsanweisungen sich von Dokumenten, die man durchsuchen, interpretieren und sich merken muss, zu geführten Erlebnissen entwickeln sollten, die Schritt für Schritt zeigen, was zu tun ist, wann und warum.",
      p2: "Mit AR und KI bedeutet das:",
      items: [
        "Anweisungen, die auf dem Asset leben – überlagert auf der echten Ausrüstung oder dem Arbeitsbereich.",
        "Kontextbewusste Unterstützung: der richtige Schritt, zum richtigen Zeitpunkt, in der richtigen Sprache.",
        "Echtzeit-Erfassung dessen, was tatsächlich passiert ist: Prüfungen, Fotos, Messungen und Notizen.",
      ],
      conclusion: "In dieser Welt ist das \"Verfahren\" kein statisches PDF mehr, sondern ein lebendiger Leitfaden, der Montage und Produktion unterstützt, Umstellungen standardisiert, Technikern bei präventiver und korrektiver Wartung hilft, neue Kollegen einarbeitet und das Unternehmensgedächtnis bewahrt.",
    },
    peopleFirst: {
      title: "Menschen zuerst, dann Technologie",
      p1: "Unsere Vision sind keine vollautomatisierten Fabriken, in denen Menschen verschwinden. Wir sehen einen anderen Weg: Menschen bleiben zentral in Produktion, Wartung und Logistik, während Technologie Reibung, Rätselraten und Routine-Overhead beseitigt.",
      p2: "Deshalb gestalten wir Lösungen rund um:",
      items: [
        { strong: "Klarheit für Operatoren", text: " – einfache, visuelle Schritte statt langer Texte." },
        { strong: "Vertrauen für Experten", text: " – wissend, dass ihre Arbeitsweise erfasst, wiederverwendet und verbessert wird." },
        { strong: "Kontrolle für das Management", text: " – Einblick in Fähigkeiten, Compliance und Leistung." },
      ],
      conclusion: "AR und KI sind da, um Menschen fähiger und unabhängiger zu machen, nicht um sie zu ersetzen.",
    },
    ecosystem: {
      title: "Unsere Rolle im Ökosystem",
      p1: "Wir streben nicht danach, nur eine weitere eigenständige Plattform zu sein. Unsere Vision ist es, eine Brücke zwischen ausgereifter AR- & KI-Technologie, den Realitäten europäischer Fabriken und Logistikoperationen und lokalen Partnern für Implementierung, Hardware und Training zu sein.",
      p2: "Konkret bedeutet das:",
      items: [
        "Organisationen helfen, die richtigen ersten Use Cases zu wählen, nicht nur die eindrucksvollste Demo.",
        "Operations, Wartung, Qualität, HR und IT um eine Arbeitsweise zusammenbringen.",
        "Mit lokalen Partnern in Benelux und DACH arbeiten, die die Kultur und den Shopfloor verstehen.",
        "Integration mit bestehenden Systemen, wo es Sinn macht, statt neue Inseln zu schaffen.",
      ],
      conclusion: "Wir wollen das Team sein, das Sie anrufen, wenn Sie sagen: \"Wir wissen, dass wir etwas mit AR und KI auf dem Shopfloor machen sollten – aber wo fangen wir an, und wie sorgen wir dafür, dass es funktioniert?\"",
    },
    responsible: {
      title: "Verantwortungsvolle und nachhaltige Innovation",
      intro: "Unsere Vision für AR und KI geht auch um Verantwortung. Lösungen müssen transparent, sicher, messbar und nachhaltig sein.",
      items: [
        { strong: "Transparent", text: " – Operatoren verstehen, was das System tut und was nicht." },
        { strong: "Sicher", text: " – Lösungen stärken die Sicherheitskultur, anstatt Abkürzungen zu fördern." },
        { strong: "Messbar", text: " – jedes Projekt hat klare Ziele und Metriken wie Fehler, Ausfallzeiten und Trainingszeit." },
        { strong: "Nachhaltig", text: " – Inhalte und Prozesse sind von Ihren eigenen Teams wartbar, nicht nur von externen Beratern." },
      ],
      conclusion: "Wir streben nach Lösungen, die Sie Operatoren, Gewerkschaften, Kunden, Prüfern und Ihrem Vorstand erklären und verteidigen können.",
    },
    heading: {
      title: "Wohin wir gehen",
      intro: "In den kommenden Jahren sehen wir drei große Verschiebungen und gestalten unsere Roadmap entsprechend:",
      items: [
        { strong: "Von Piloten zur Standardpraxis", text: " – AR und KI werden von Innovationslaboren in Standard-Betriebsverfahren, Trainingspläne und Wartungsroutinen übergehen." },
        { strong: "Von isolierten Werken zu verbundenen Netzwerken", text: " – Best Practices werden einmal erfasst und über Standorte, Länder und Partner geteilt, während lokale Anpassung weiterhin möglich bleibt." },
        { strong: "Von reaktiver zu prädiktiver Anleitung", text: " – Daten aus Ausführungen, Sensoren und Systemen werden KI ermöglichen, Verbesserungen vorzuschlagen, Risiken zu identifizieren und Anleitung zu personalisieren." },
      ],
      conclusion: "Die Vision von ActARion ist es, Organisationen durch diese Reise zu führen – beginnend mit einem konkreten Use Case, aber mit klarer Sicht auf eine intelligentere, sicherere und schnellere Arbeitsweise in der gesamten Operation.",
    },
  },
};

export default function VisionPageClient({ locale }: VisionPageClientProps) {
  // Get translations for current locale, fallback to English
  const t = translations[locale as keyof typeof translations] || translations.en;

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

          {/* Why the way we work must change */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <h2 className="section-heading">{t.whyChange.title}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.whyChange.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.whyChange.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.whyChange.conclusion}</p>
            </div>
          </section>

          {/* From documents to guided work */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <h2 className="section-heading">{t.guidedWork.title}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.guidedWork.p1}</p>
              <p>{t.guidedWork.p2}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.guidedWork.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.guidedWork.conclusion}</p>
            </div>
          </section>

          {/* People first, then technology */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <h2 className="section-heading">{t.peopleFirst.title}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.peopleFirst.p1}</p>
              <p>{t.peopleFirst.p2}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.peopleFirst.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ul>
              <p>{t.peopleFirst.conclusion}</p>
            </div>
          </section>

          {/* Our role in the ecosystem */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <h2 className="section-heading">{t.ecosystem.title}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.ecosystem.p1}</p>
              <p>{t.ecosystem.p2}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.ecosystem.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t.ecosystem.conclusion}</p>
            </div>
          </section>

          {/* Responsible and sustainable innovation */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <h2 className="section-heading">{t.responsible.title}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.responsible.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {t.responsible.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ul>
              <p>{t.responsible.conclusion}</p>
            </div>
          </section>

          {/* Where we are heading */}
          <section className="section-stack border-t border-slate-200 pt-8">
            <h2 className="section-heading">{t.heading.title}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{t.heading.intro}</p>
              <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                {t.heading.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.strong}</strong>{item.text}
                  </li>
                ))}
              </ol>
              <p>{t.heading.conclusion}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

