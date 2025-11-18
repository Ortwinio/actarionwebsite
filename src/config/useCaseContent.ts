import { Locale } from "./site";
import { UseCase } from "./useCases";

type UseCaseSlug = UseCase["slug"];

export type UseCaseContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "unorderedList"; items: string[] }
  | { type: "orderedList"; items: string[] };

export interface UseCaseSectionContent {
  title: string;
  blocks: UseCaseContentBlock[];
}

export interface UseCaseContent {
  heroTitle: string;
  heroParagraphs: string[];
  sections: UseCaseSectionContent[];
}

type UseCaseContentBySlug = Record<UseCaseSlug, UseCaseContent>;

const enContent: UseCaseContentBySlug = {
  "ar-work-instructions-corporate-memory": {
    heroTitle: "AR work instructions and SOPs to preserve corporate memory",
    heroParagraphs: [
      "When experienced experts leave your organisation, they often take years of tacit knowledge with them. Work instructions are spread across binders, notebooks and ad hoc fixes on the work floor. That makes it hard for new operators to learn fast and to execute work instructions consistently and safely.",
      "With AR Standard Operating Procedures (AR SOPs) from ActARion and DeepSight, you capture expert knowledge once and turn it into reusable, visual work instructions that any operator can follow.",
    ],
    sections: [
      {
        title: "The challenge: critical knowledge walks out the door",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Experts have deep, often undocumented process knowledge",
              "Procedures are fragmented across paper, PDFs and personal notes",
              "New employees depend on shadowing and informal coaching",
              "Results are inconsistent execution, avoidable errors and quality issues",
            ],
          },
        ],
      },
      {
        title: "The solution: capture expert workflows with AR SOPs",
        blocks: [
          {
            type: "paragraph",
            content:
              "Using AR work instructions, you record the way an expert actually performs a critical task and transform it into a standard, digital procedure:",
          },
          {
            type: "orderedList",
            items: [
              "A manager or process owner selects a critical procedure that must be captured.",
              "The expert wears smart glasses or uses a tablet or smartphone and performs the task step by step.",
              "The AR SOP system records the actions, automatically structures the steps and adds images or video.",
              "The expert enriches the AR SOP with voice notes, warnings, tips and best practices.",
              "The AR SOP is stored in a central digital library as the single source of truth.",
            ],
          },
          {
            type: "paragraph",
            content:
              "From that moment, any operator can open the AR SOP on an AR device and follow the same procedure, guided directly in their field of view.",
          },
        ],
      },
      {
        title: "How AR SOPs support training and execution",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "New employees open the AR SOP on their device",
              "Step by step, AR overlays show what to do, where to do it and in which order",
              "Visual cues and annotations reduce interpretation errors",
              "Operators complete the task First Time Right, aligned with the expert standard",
            ],
          },
        ],
      },
      {
        title: "Key benefits and KPIs",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR SOPs to preserve corporate memory delivers measurable impact:",
          },
          {
            type: "unorderedList",
            items: [
              "Shorter onboarding time for new employees",
              "Higher First Time Right rate and more consistent execution",
              "Steady growth of the AR SOP library for critical procedures",
              "Five to ten times faster SOP creation compared to traditional documentation",
            ],
          },
          {
            type: "paragraph",
            content:
              "By turning expert knowledge into AR SOPs, you protect your corporate memory and make high quality execution scalable across teams, sites and shifts.",
          },
        ],
      },
    ],
  },
  "ar-training-and-onboarding": {
    heroTitle: "Accelerate training and onboarding with AR work instructions",
    heroParagraphs: [
      "Traditional onboarding often means weeks of job shadowing and classroom training. It slows down productivity and puts extra pressure on a small group of experts. Augmented reality training changes this dynamic.",
      "With AR guided work instructions, new employees learn directly in the workplace, supported by clear AR overlays instead of static manuals. They perform real tasks with step by step guidance and build competence faster and more reliably.",
    ],
    sections: [
      {
        title: "The challenge: slow and inconsistent onboarding",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "New hires depend on the availability and teaching style of experts",
              "Paper work instructions are hard to interpret in a real environment",
              "Training quality varies per trainer, shift and production location",
              "Compliance and training proof are difficult to document",
            ],
          },
        ],
      },
      {
        title: "The solution: AR guided onboarding in the real workplace",
        blocks: [
          {
            type: "paragraph",
            content: "AR training and onboarding combine digital work instructions with the real task:",
          },
          {
            type: "orderedList",
            items: [
              "A manager assigns a task to a new employee.",
              "The employee opens the corresponding AR guide on a smart glass, tablet or smartphone.",
              "The AR system shows visual, step by step work instructions in the field of view.",
              "Overlays, arrows and 3D models indicate exactly where and how to perform each step.",
              "The employee confirms each step or the system verifies it using visual recognition.",
            ],
          },
          {
            type: "paragraph",
            content: "The result is a standardised onboarding process, independent of who is training that day.",
          },
        ],
      },
      {
        title: "Built in compliance and performance evidence",
        blocks: [
          {
            type: "paragraph",
            content: "The AR training system automatically captures:",
          },
          {
            type: "unorderedList",
            items: [
              "Completed steps and confirmation per task",
              "Photos or video fragments as evidence of correct execution",
              "A digital audit trail for quality and compliance checks",
            ],
          },
          {
            type: "paragraph",
            content:
              "Supervisors and trainers can review the data, see where employees struggle and adapt content or training focus accordingly.",
          },
        ],
      },
      {
        title: "Key benefits and KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR guided onboarding and training typically deliver:",
          },
          {
            type: "unorderedList",
            items: [
              "Significantly shorter onboarding time and effort",
              "Higher First Time Right rates and fewer errors",
              "Documented, audit ready proof of compliant execution",
              "Shorter cycle time for specific tasks or production steps",
            ],
          },
          {
            type: "paragraph",
            content:
              "AR training scales the knowledge of your best experts to every new employee, without increasing their workload.",
          },
        ],
      },
    ],
  },
  "ar-guided-assembly-production": {
    heroTitle: "Error free production with AR guided assembly instructions",
    heroParagraphs: [
      "In production and assembly environments, small mistakes quickly lead to rework, scrap or product recalls. Paper based instructions and verbal explanations leave too much room for interpretation.",
      "AR guided production and assembly provide operators with clear, visual work instructions at the workstation, combined with automated visual verification. That combination reduces human error and creates complete, audit ready documentation of each build.",
    ],
    sections: [
      {
        title: "The challenge: errors, rework and recalls",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Operators work with static work instructions that are hard to keep up to date",
              "Complex assemblies rely on memory, local workarounds and tribal knowledge",
              "Quality inspection is often manual and sampled, not step based",
              "Traceability per product or batch is incomplete",
            ],
          },
        ],
      },
      {
        title: "The solution: guided assembly with visual verification",
        blocks: [
          {
            type: "paragraph",
            content: "ActARion and DeepSight deliver an AR guidance system that supports operators step by step:",
          },
          {
            type: "orderedList",
            items: [
              "The operator scans a product ID or selects an order in the AR system.",
              "The system loads the correct digital work instructions for that variant or batch.",
              "In the field of view, the AR system shows numbered steps and visual cues on the actual assembly.",
              "For each step, arrows, highlights or 3D overlays show exactly where to place or adjust a component.",
              "After a step is completed, the system takes a photo or short video as visual verification.",
              "Only after a successful check does the system unlock the next step.",
            ],
          },
          {
            type: "paragraph",
            content: "All images are linked to the order or serial number, creating a complete visual record of the process.",
          },
        ],
      },
      {
        title: "Automated, evidence based quality and compliance",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Each product has its own visual audit trail",
              "Quality inspectors can review the documented steps remotely when needed",
              "Customers and auditors receive objective proof that each step was executed correctly",
              "Data can be analysed to improve work instructions and process flow",
            ],
          },
        ],
      },
      {
        title: "Key benefits and KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR guided production and assembly help you:",
          },
          {
            type: "unorderedList",
            items: [
              "Increase First Time Right performance and reduce rework and scrap",
              "Shorten cycle times by removing uncertainty and search time",
              "Reduce product recalls and quality incidents",
              "Build a fully traceable, evidence based quality process per product or batch",
            ],
          },
        ],
      },
    ],
  },
  "ar-guided-changeover-batch-preparation": {
    heroTitle: "Reduce downtime with AR guided changeover procedures",
    heroParagraphs: [
      "Changeovers and batch preparation are critical moments in manufacturing. Incorrect settings or missed steps lead to defects, scrap and unplanned downtime. Procedures are often complex and depend heavily on the experience of a few operators.",
      "With AR guided changeover and batch preparation, operators follow clear, standardised work instructions in augmented reality. Each step is documented, and remote experts can join in real time if something unexpected happens.",
    ],
    sections: [
      {
        title: "The challenge: complex, error prone changeovers",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Machine changeovers are time consuming and rely on a few specialists",
              "Settings and checks are not always fully documented",
              "Small mistakes lead to start up problems in the next batch",
              "OEMs and field service partners have limited visibility on how changeovers are done",
            ],
          },
        ],
      },
      {
        title: "The solution: standardised AR changeover procedures",
        blocks: [
          {
            type: "paragraph",
            content: "AR work instructions guide operators through every changeover:",
          },
          {
            type: "orderedList",
            items: [
              "The previous batch is completed.",
              "The operator selects the next batch in the AR system.",
              "The system loads the specific AR changeover procedure for that batch.",
              "The operator sees numbered, visual instructions in the chosen language.",
              "For critical steps, the system records images or video as evidence.",
              "After the final check, the AR system confirms that the machine is ready for production.",
            ],
          },
          {
            type: "paragraph",
            content: "All steps and timestamps are stored in a digital logbook for later analysis.",
          },
        ],
      },
      {
        title: "Remote expert support when needed",
        blocks: [
          {
            type: "paragraph",
            content:
              "If the AR system or the operator detects a deviation, the operator can start a remote expert session:",
          },
          {
            type: "unorderedList",
            items: [
              "A remote specialist sees exactly what the operator sees through the AR device",
              "The expert can draw annotations, highlight components and give spoken instructions",
              "The session is recorded and stored as part of the changeover case",
            ],
          },
          {
            type: "paragraph",
            content: "This reduces the need for on site visits and speeds up problem solving.",
          },
        ],
      },
      {
        title: "Key benefits and KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR guided changeover and batch preparation deliver:",
          },
          {
            type: "unorderedList",
            items: [
              "Shorter changeover time and faster batch transitions",
              "Less downtime due to configuration errors",
              "Higher First Time Right rate at the start of production after a changeover",
              "Longer mean time between failures through correct settings and better handovers",
            ],
          },
        ],
      },
    ],
  },
  "ar-preventive-maintenance": {
    heroTitle: "Data driven AR preventive maintenance for higher uptime",
    heroParagraphs: [
      "Preventive maintenance is meant to prevent downtime, but in practice there is often limited insight into how procedures are actually executed. Without data on execution quality, time and recurring issues, it is hard to improve maintenance strategies.",
      "AR supported preventive maintenance combines visual work instructions with automated data collection. Each task is executed in the same way, documented with images and enriched with performance metrics.",
    ],
    sections: [
      {
        title: "The challenge: limited visibility in maintenance execution",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Preventive maintenance procedures are executed differently per technician",
              "Paper checklists do not capture timing, deviations or proof of work",
              "It is difficult to link maintenance effort to reliability and uptime",
              "Continuous improvement of maintenance plans is largely based on assumptions",
            ],
          },
        ],
      },
      {
        title: "The solution: AR guided maintenance with built in measurement",
        blocks: [
          {
            type: "paragraph",
            content: "With an AR maintenance system:",
          },
          {
            type: "orderedList",
            items: [
              "The technician receives a planned maintenance task in the maintenance system.",
              "The technician starts the corresponding AR work instruction on an AR device.",
              "The system guides the technician step by step with visual cues at the asset.",
              "The AR system automatically records time spent per step and total task duration.",
              "It captures whether each step was completed First Time Right and any errors or deviations during execution.",
              "For critical checks, the system captures photos or video as evidence of correct maintenance.",
            ],
          },
          {
            type: "paragraph",
            content: "After completion, a detailed maintenance report is generated automatically.",
          },
        ],
      },
      {
        title: "From preventive maintenance to continuous optimisation",
        blocks: [
          {
            type: "paragraph",
            content: "Maintenance planners can use the collected AR maintenance data to:",
          },
          {
            type: "unorderedList",
            items: [
              "Simplify or redesign steps that consistently take too long or cause confusion",
              "Adjust maintenance intervals based on real usage and failure patterns",
              "Identify training needs for technicians based on recurring errors",
            ],
          },
          {
            type: "paragraph",
            content:
              "Over time, preventive maintenance becomes more targeted, efficient and aligned with business impact.",
          },
        ],
      },
      {
        title: "Key benefits and KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "Data driven preventive maintenance with AR helps you:",
          },
          {
            type: "unorderedList",
            items: [
              "Increase First Time Right in maintenance tasks",
              "Reduce unplanned downtime and breakdowns",
              "Decrease the number of incidents and equipment failures",
              "Shorten maintenance time through standardisation and better insight",
            ],
          },
        ],
      },
    ],
  },
  "ar-remote-expert-support-corrective-maintenance": {
    heroTitle: "Faster corrective maintenance with AR remote expert support",
    heroParagraphs: [
      "When a critical asset fails, every minute counts. Often, the expert with the right knowledge is not on site, and travel time adds hours of downtime. Phone calls and photos are not enough to guide complex repairs.",
      "Remote AR expert support brings the specialist virtually to the machine. The operator on site shares a live AR video feed, and the remote expert guides the repair step by step with voice and visual annotations.",
    ],
    sections: [
      {
        title: "The challenge: long downtime and limited expert availability",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Experts cannot be at every site or shift at the same moment in time",
              "Diagnosing complex issues remotely is difficult with only phone or email",
              "Travel time and waiting time extend unplanned downtime",
              "Knowledge from previous incidents is not always captured and reused",
            ],
          },
        ],
      },
      {
        title: "The solution: live AR support for corrective maintenance",
        blocks: [
          {
            type: "paragraph",
            content: "With an AR remote support platform:",
          },
          {
            type: "orderedList",
            items: [
              "The operator detects a fault and cannot resolve it with local work instructions.",
              "The operator starts an AR support session on a smart glass, tablet or smartphone.",
              "A remote expert joins the session and sees what the operator sees in real time.",
              "The expert adds visual annotations in the operator's field of view, such as arrows and circles.",
              "Step by step, the expert guides the operator through diagnostics and repair actions.",
              "The session, notes and screenshots are saved as a case for future reference.",
            ],
          },
          {
            type: "paragraph",
            content:
              "If the fault is too complex to solve remotely, the documented session helps prepare an on site visit or escalation.",
          },
        ],
      },
      {
        title: "Building a reusable knowledge base",
        blocks: [
          {
            type: "paragraph",
            content: "Each remote support session contributes to:",
          },
          {
            type: "unorderedList",
            items: [
              "A growing library of resolved incidents and solutions",
              "Training material for operators and technicians",
              "Better AR work instructions for future similar faults",
            ],
          },
          {
            type: "paragraph",
            content: "This way, corrective maintenance becomes faster today and smarter tomorrow.",
          },
        ],
      },
      {
        title: "Key benefits and KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "Remote AR expert support for corrective maintenance delivers:",
          },
          {
            type: "unorderedList",
            items: [
              "Shorter unplanned downtime through faster fault resolution",
              "Higher First Time Right rate in repairs",
              "Longer mean time between failures through better root cause fixes",
              "More efficient use of expert capacity without travel and waiting time",
            ],
          },
        ],
      },
    ],
  },
};

const deContent: UseCaseContentBySlug = {
  "ar-work-instructions-corporate-memory": {
    heroTitle: "AR-Arbeitsanweisungen und SOPs, um Unternehmenswissen zu bewahren",
    heroParagraphs: [
      "Wenn erfahrene Expertinnen und Experten das Unternehmen verlassen, nehmen sie oft jahrelanges Erfahrungswissen mit. Arbeitsanweisungen liegen verstreut in Ordnern, Notizbüchern und spontanen Shopfloor-Lösungen. Dadurch wird es für neue Mitarbeitende schwierig, schnell zu lernen und Aufgaben konsistent sowie sicher auszuführen.",
      "Mit AR-Standardarbeitsanweisungen (AR-SOPs) von ActARion und DeepSight erfassen Sie Expertenwissen einmalig und verwandeln es in wiederverwendbare, visuelle Schritt-für-Schritt-Anleitungen, denen jede Bedienerin und jeder Bediener folgen kann.",
    ],
    sections: [
      {
        title: "Die Herausforderung: Kritisches Wissen geht verloren",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Expertinnen und Experten besitzen tiefes, oft nicht dokumentiertes Prozesswissen",
              "Vorgaben sind über Papier, PDFs und persönliche Notizen fragmentiert",
              "Neue Mitarbeitende sind auf Shadowing und informelles Coaching angewiesen",
              "Das Ergebnis sind inkonsistente Ausführung, vermeidbare Fehler und Qualitätsprobleme",
            ],
          },
        ],
      },
      {
        title: "Die Lösung: Expertenabläufe mit AR-SOPs erfassen",
        blocks: [
          {
            type: "paragraph",
            content:
              "Mit AR-Arbeitsanweisungen zeichnen Sie den tatsächlichen Ablauf einer Expertin oder eines Experten auf und verwandeln ihn in eine standardisierte, digitale Prozedur:",
          },
          {
            type: "orderedList",
            items: [
              "Eine Führungskraft oder Prozessverantwortliche Person wählt eine kritische Prozedur aus.",
              "Die Expertin trägt Smart Glasses oder nutzt Tablet/Smartphone und führt den Task Schritt für Schritt aus.",
              "Das AR-SOP-System zeichnet die Aktionen auf, strukturiert die Schritte automatisch und ergänzt Bilder oder Video.",
              "Die Expertin versieht das AR-SOP mit Sprachnotizen, Warnhinweisen, Tipps und Best Practices.",
              "Das AR-SOP wird als einzige verlässliche Quelle in einer zentralen digitalen Bibliothek gespeichert.",
            ],
          },
          {
            type: "paragraph",
            content:
              "Ab diesem Moment kann jede Bedienerin bzw. jeder Bediener die AR-SOP auf dem Gerät öffnen und derselben Prozedur folgen – direkt im Sichtfeld geführt.",
          },
        ],
      },
      {
        title: "Wie AR-SOPs Training und Ausführung unterstützen",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Neue Mitarbeitende öffnen die AR-SOP auf ihrem Gerät",
              "AR-Overlays zeigen Schritt für Schritt, was wo und in welcher Reihenfolge zu tun ist",
              "Visuelle Hinweise und Annotationen reduzieren Interpretationsfehler",
              "Aufgaben werden First Time Right im Sinne des Expertenstandards abgeschlossen",
            ],
          },
        ],
      },
      {
        title: "Wichtigste Vorteile und KPIs",
        blocks: [
          {
            type: "paragraph",
            content:
              "Die Einführung von AR-SOPs zur Sicherung des Unternehmenswissens liefert messbare Effekte:",
          },
          {
            type: "unorderedList",
            items: [
              "Kürzere Einarbeitungszeit für neue Mitarbeitende",
              "Höherer First-Time-Right-Anteil und konsistentere Ausführung",
              "Kontinuierlicher Aufbau einer AR-SOP-Bibliothek für kritische Abläufe",
              "Fünf- bis zehnmal schnellere SOP-Erstellung im Vergleich zu klassischen Dokumentationen",
            ],
          },
          {
            type: "paragraph",
            content:
              "Indem Sie Expertenwissen in AR-SOPs überführen, schützen Sie Ihr Unternehmensgedächtnis und skalieren hochwertige Ausführung über Teams, Standorte und Schichten hinweg.",
          },
        ],
      },
    ],
  },
  "ar-training-and-onboarding": {
    heroTitle: "Training und Onboarding mit AR-Anweisungen beschleunigen",
    heroParagraphs: [
      "Klassisches Onboarding bedeutet oft Wochen des Mitlaufens und Präsenztrainings. Das bremst die Produktivität und belastet eine kleine Gruppe von Expertinnen und Experten. Augmented-Reality-Training durchbricht dieses Muster.",
      "Mit AR-gestützten Arbeitsanweisungen lernen neue Mitarbeitende direkt im Arbeitsumfeld. Klare Overlays ersetzen statische Handbücher, reale Aufgaben werden mit Schritt-für-Schritt-Unterstützung ausgeführt und Kompetenzen entstehen schneller und verlässlicher.",
    ],
    sections: [
      {
        title: "Die Herausforderung: Langsames und inkonsistentes Onboarding",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Neue Mitarbeitende hängen von Verfügbarkeit und Didaktik einzelner Expertinnen und Experten ab",
              "Papier-Anweisungen lassen sich im realen Umfeld schwer interpretieren",
              "Trainingsqualität schwankt je Trainer, Schicht und Standort",
              "Compliance-Nachweise und Trainingsprotokolle sind aufwendig zu dokumentieren",
            ],
          },
        ],
      },
      {
        title: "Die Lösung: AR-gestütztes Onboarding am realen Arbeitsplatz",
        blocks: [
          {
            type: "paragraph",
            content: "AR-Training verbindet digitale Arbeitsanweisungen mit der tatsächlichen Aufgabe:",
          },
          {
            type: "orderedList",
            items: [
              "Eine Führungskraft weist einer neuen Person einen Task zu.",
              "Die Person öffnet die passende AR-Anleitung auf Smart Glasses, Tablet oder Smartphone.",
              "Das System zeigt visuelle Schritt-für-Schritt-Anweisungen direkt im Sichtfeld.",
              "Overlays, Pfeile und 3D-Modelle markieren exakt, wo und wie jeder Schritt auszuführen ist.",
              "Jeder Schritt wird bestätigt oder automatisch durch visuelle Erkennung verifiziert.",
            ],
          },
          {
            type: "paragraph",
            content: "Das Ergebnis ist ein standardisiertes Onboarding – unabhängig davon, wer an diesem Tag trainiert.",
          },
        ],
      },
      {
        title: "Eingebaute Compliance- und Leistungsnachweise",
        blocks: [
          {
            type: "paragraph",
            content: "Das AR-Trainingssystem erfasst automatisch:",
          },
          {
            type: "unorderedList",
            items: [
              "Abgeschlossene Schritte und Bestätigungen pro Task",
              "Fotos oder Videosequenzen als Beleg korrekter Ausführung",
              "Einen digitalen Audit-Trail für Qualitäts- und Compliance-Prüfungen",
            ],
          },
          {
            type: "paragraph",
            content:
              "Trainerinnen, Trainer und Supervisoren sehen, wo Mitarbeitende Schwierigkeiten haben, und passen Inhalte oder Schwerpunkte gezielt an.",
          },
        ],
      },
      {
        title: "Wichtigste Vorteile und KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR-gestütztes Onboarding liefert typischerweise:",
          },
          {
            type: "unorderedList",
            items: [
              "Deutlich kürzere Einarbeitungszeit und geringeren Coaching-Aufwand",
              "Höhere First-Time-Right-Quoten und weniger Fehler",
              "Dokumentierte, auditfähige Nachweise für regelkonforme Ausführung",
              "Kürzere Durchlaufzeiten bei spezifischen Aufgaben oder Prozessschritten",
            ],
          },
          {
            type: "paragraph",
            content:
              "AR-Training skaliert das Wissen Ihrer besten Fachleute auf jede neue Person – ohne deren Arbeitslast zu erhöhen.",
          },
        ],
      },
    ],
  },
  "ar-guided-assembly-production": {
    heroTitle: "Fehlerfreie Produktion mit AR-gestützter Montageanleitung",
    heroParagraphs: [
      "In Produktion und Montage führen kleine Fehler schnell zu Nacharbeit, Ausschuss oder Produktrückrufen. Papierbasierte Anweisungen und mündliche Erklärungen lassen zu viel Interpretationsspielraum.",
      "AR-gestützte Produktion liefert Bedienenden klare, visuelle Arbeitsanweisungen direkt am Arbeitsplatz und kombiniert sie mit automatisierter visueller Verifikation. So sinken menschliche Fehler, während ein vollständiger, auditfähiger Nachweis jeder Baugruppe entsteht.",
    ],
    sections: [
      {
        title: "Die Herausforderung: Fehler, Nacharbeit und Rückrufe",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Bedienende arbeiten mit statischen Anweisungen, die schwer aktuell zu halten sind",
              "Komplexe Montagen stützen sich auf Gedächtnis, lokale Workarounds und Erfahrungswissen",
              "Qualitätskontrolle erfolgt häufig manuell und stichprobenbasiert statt schrittweise",
              "Rückverfolgbarkeit pro Produkt oder Charge ist unvollständig",
            ],
          },
        ],
      },
      {
        title: "Die Lösung: Geführte Montage mit visueller Verifikation",
        blocks: [
          {
            type: "paragraph",
            content: "ActARion und DeepSight liefern ein AR-Assistenzsystem, das Bedienende Schritt für Schritt unterstützt:",
          },
          {
            type: "orderedList",
            items: [
              "Die Bedienerin scannt eine Produkt-ID oder wählt den Auftrag im AR-System.",
              "Das System lädt die passenden digitalen Arbeitsanweisungen für Variante oder Charge.",
              "Im Sichtfeld erscheinen nummerierte Schritte und visuelle Hinweise direkt auf dem realen Aufbau.",
              "Pfeile, Hervorhebungen oder 3D-Overlays zeigen exakt, wo ein Teil platziert oder angepasst werden muss.",
              "Nach jedem Schritt erstellt das System ein Foto oder kurzes Video als visuellen Nachweis.",
              "Erst nach erfolgreicher Prüfung wird der nächste Schritt freigeschaltet.",
            ],
          },
          {
            type: "paragraph",
            content: "Alle Bilder werden dem Auftrag oder der Seriennummer zugeordnet und bilden eine vollständige visuelle Dokumentation.",
          },
        ],
      },
      {
        title: "Automatisierte, evidenzbasierte Qualität und Compliance",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Jedes Produkt erhält einen eigenen visuellen Audit-Trail",
              "Qualitätsprüferinnen und -prüfer können dokumentierte Schritte bei Bedarf remote einsehen",
              "Kundinnen, Kunden und Auditoren erhalten objektive Belege, dass jeder Schritt korrekt ausgeführt wurde",
              "Daten lassen sich analysieren, um Anweisungen und Prozessabläufe zu verbessern",
            ],
          },
        ],
      },
      {
        title: "Wichtigste Vorteile und KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR-gestützte Produktion und Montage helfen Ihnen:",
          },
          {
            type: "unorderedList",
            items: [
              "First-Time-Right-Leistung zu steigern und Nacharbeit sowie Ausschuss zu reduzieren",
              "Durchlaufzeiten zu verkürzen, indem Unsicherheit und Suchzeiten entfallen",
              "Produktrückrufe und Qualitätsvorfälle zu reduzieren",
              "Einen vollständig nachverfolgbaren, evidenzbasierten Qualitätsprozess pro Produkt oder Charge aufzubauen",
            ],
          },
        ],
      },
    ],
  },
  "ar-guided-changeover-batch-preparation": {
    heroTitle: "Stillstandszeiten mit AR-gestützten Umrüstprozessen reduzieren",
    heroParagraphs: [
      "Umrüstungen und Batch-Vorbereitung sind kritische Momente in der Fertigung. Falsche Einstellungen oder ausgelassene Schritte führen zu Ausschuss, Qualitätsproblemen und ungeplantem Stillstand. Die Prozeduren sind komplex und hängen stark von wenigen erfahrenen Bedienenden ab.",
      "Mit AR-geführten Umrüstungen folgen Teams klaren, standardisierten Arbeitsanweisungen in Augmented Reality. Jeder Schritt wird dokumentiert, und Remote-Expertinnen können bei Bedarf live unterstützen.",
    ],
    sections: [
      {
        title: "Die Herausforderung: Komplexe, fehleranfällige Umrüstungen",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Maschinenumrüstungen dauern lange und hängen von wenigen Spezialistinnen und Spezialisten ab",
              "Einstellungen und Kontrollen sind nicht immer vollständig dokumentiert",
              "Kleine Fehler verursachen Startprobleme im nächsten Batch",
              "OEMs und Servicepartner haben nur begrenzte Sicht darauf, wie Umrüstungen ablaufen",
            ],
          },
        ],
      },
      {
        title: "Die Lösung: Standardisierte AR-Umrüstprozeduren",
        blocks: [
          {
            type: "paragraph",
            content: "AR-Arbeitsanweisungen führen Bedienende durch jede Umrüstung:",
          },
          {
            type: "orderedList",
            items: [
              "Der vorherige Batch wird abgeschlossen.",
              "Die Bedienerin wählt den nächsten Batch im AR-System.",
              "Das System lädt die spezifische AR-Umrüstanweisung für diesen Batch.",
              "Im Sichtfeld erscheinen nummerierte, visuelle Anweisungen in der bevorzugten Sprache.",
              "Bei kritischen Schritten zeichnet das System Bilder oder Videos als Beleg auf.",
              "Nach dem Final Check bestätigt das AR-System, dass die Maschine produktionsbereit ist.",
            ],
          },
          {
            type: "paragraph",
            content: "Alle Schritte und Zeitstempel werden in einem digitalen Logbuch gespeichert und lassen sich später auswerten.",
          },
        ],
      },
      {
        title: "Remote-Expertinnen unterstützen bei Bedarf",
        blocks: [
          {
            type: "paragraph",
            content:
              "Erkennt das AR-System oder die Bedienung eine Abweichung, kann eine Remote-Session gestartet werden:",
          },
          {
            type: "unorderedList",
            items: [
              "Eine entfernte Spezialistin sieht live genau das, was die Bedienung sieht",
              "Sie kann Markierungen setzen, Komponenten hervorheben und Anweisungen geben",
              "Die Session wird aufgezeichnet und als Teil des Umrüstfalls gespeichert",
            ],
          },
          {
            type: "paragraph",
            content: "So sinkt der Bedarf an Vor-Ort-Einsätzen und Probleme werden schneller gelöst.",
          },
        ],
      },
      {
        title: "Wichtigste Vorteile und KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR-geführte Umrüstungen und Batch-Vorbereitung liefern:",
          },
          {
            type: "unorderedList",
            items: [
              "Kürzere Umrüstzeit und schnellere Batch-Übergänge",
              "Weniger Stillstand durch Konfigurationsfehler",
              "Höhere First-Time-Right-Quote beim Produktionsstart nach einem Wechsel",
              "Längere Mean Time Between Failure dank korrekter Einstellungen und besserer Übergaben",
            ],
          },
        ],
      },
    ],
  },
  "ar-preventive-maintenance": {
    heroTitle: "Datengetriebene AR-Instandhaltung für mehr Anlagenverfügbarkeit",
    heroParagraphs: [
      "Präventive Instandhaltung soll Ausfälle verhindern, doch in der Praxis fehlt oft Einblick, wie Prozeduren tatsächlich ausgeführt werden. Ohne Daten zu Qualität, Dauer und wiederkehrenden Problemen ist es schwer, Strategien zu verbessern.",
      "AR-unterstützte Instandhaltung kombiniert visuelle Arbeitsanweisungen mit automatischer Datenerfassung. Jede Aufgabe wird auf dieselbe Weise erledigt, mit Bildern dokumentiert und um Leistungskennzahlen ergänzt.",
    ],
    sections: [
      {
        title: "Die Herausforderung: Begrenzte Transparenz in der Ausführung",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Präventive Instandhaltungen werden je Technikerin bzw. Techniker unterschiedlich umgesetzt",
              "Papier-Checklisten erfassen weder Zeiten noch Abweichungen oder Nachweise",
              "Der Zusammenhang zwischen Aufwand und Anlagenzuverlässigkeit ist schwer belegbar",
              "Kontinuierliche Verbesserung basiert oft auf Annahmen statt auf Fakten",
            ],
          },
        ],
      },
      {
        title: "Die Lösung: AR-gestützte Wartung mit integrierter Messung",
        blocks: [
          {
            type: "paragraph",
            content: "Mit einem AR-Wartungssystem:",
          },
          {
            type: "orderedList",
            items: [
              "Die Technikerin erhält einen geplanten Wartungsauftrag im Maintenance-System.",
              "Sie startet die passende AR-Anweisung auf einem AR-Gerät.",
              "Das System führt Schritt für Schritt mit visuellen Hinweisen direkt am Asset.",
              "Zeit pro Schritt und Gesamtdauer werden automatisch erfasst.",
              "Das System dokumentiert, ob jeder Schritt First Time Right abgeschlossen wurde und hält Fehler oder Abweichungen fest.",
              "Bei kritischen Kontrollen werden Fotos oder Videos als Nachweis aufgenommen.",
            ],
          },
          {
            type: "paragraph",
            content: "Nach Abschluss entsteht automatisch ein detaillierter Wartungsbericht.",
          },
        ],
      },
      {
        title: "Von präventiver Wartung zu kontinuierlicher Optimierung",
        blocks: [
          {
            type: "paragraph",
            content: "Instandhaltungsplanerinnen nutzen die gesammelten AR-Daten, um:",
          },
          {
            type: "unorderedList",
            items: [
              "Schritte zu vereinfachen oder neu zu gestalten, wenn sie regelmäßig zu lange dauern oder Verwirrung stiften",
              "Wartungsintervalle anhand realer Nutzung und Ausfallmuster anzupassen",
              "Trainingsbedarf für Technikerinnen und Techniker anhand wiederkehrender Fehler zu erkennen",
            ],
          },
          {
            type: "paragraph",
            content: "So wird präventive Wartung im Zeitverlauf zielgerichteter, effizienter und näher am Geschäftsnutzen.",
          },
        ],
      },
      {
        title: "Wichtigste Vorteile und KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "Datengetriebene präventive Wartung mit AR hilft Ihnen:",
          },
          {
            type: "unorderedList",
            items: [
              "Den First-Time-Right-Anteil bei Wartungsaufgaben zu erhöhen",
              "Ungeplante Stillstände und Ausfälle zu reduzieren",
              "Die Anzahl von Incidents und Gerätefehlern zu senken",
              "Wartungszeiten durch Standardisierung und mehr Transparenz zu verkürzen",
            ],
          },
        ],
      },
    ],
  },
  "ar-remote-expert-support-corrective-maintenance": {
    heroTitle: "Schnellere Korrektur-Instandhaltung mit AR-Remote-Expertinnen",
    heroParagraphs: [
      "Fällt eine kritische Anlage aus, zählt jede Minute. Häufig ist die richtige Expertin nicht vor Ort, Reisezeiten verlängern den Stillstand. Telefonate oder Fotos reichen für komplexe Reparaturen nicht aus.",
      "AR-gestützter Remote-Support bringt die Spezialistin virtuell an die Maschine. Die Person vor Ort teilt einen Live-AR-Videostream, und die Expertin führt Schritt für Schritt mit Sprache und visuellen Annotationen.",
    ],
    sections: [
      {
        title: "Die Herausforderung: Lange Stillstände und limitierte Expertise",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Expertinnen können nicht gleichzeitig an jedem Standort und jeder Schicht sein",
              "Komplexe Diagnosen sind per Telefon oder E-Mail kaum möglich",
              "Reise- und Wartezeiten verlängern ungeplante Stillstände",
              "Erfahrungen aus früheren Vorfällen werden nicht konsequent dokumentiert und genutzt",
            ],
          },
        ],
      },
      {
        title: "Die Lösung: Live-AR-Unterstützung für Korrekturmaßnahmen",
        blocks: [
          {
            type: "paragraph",
            content: "Mit einer AR-Remote-Plattform:",
          },
          {
            type: "orderedList",
            items: [
              "Die Bedienung erkennt eine Störung, die sich lokal nicht beheben lässt.",
              "Sie startet eine AR-Support-Session auf Smart Glasses, Tablet oder Smartphone.",
              "Eine entfernte Expertin sieht in Echtzeit, was die Bedienung sieht.",
              "Sie fügt visuelle Annotationen – Pfeile, Kreise, Markierungen – direkt ins Sichtfeld ein.",
              "Schritt für Schritt führt sie durch Diagnose und Reparatur.",
              "Session, Notizen und Screenshots werden als Fall für zukünftige Referenz gespeichert.",
            ],
          },
          {
            type: "paragraph",
            content:
              "Ist eine Störung zu komplex für die Ferndiagnose, hilft die dokumentierte Session, einen Vor-Ort-Besuch oder eine Eskalation vorzubereiten.",
          },
        ],
      },
      {
        title: "Ein wiederverwendbares Wissensarchiv aufbauen",
        blocks: [
          {
            type: "paragraph",
            content: "Jede Remote-Session trägt bei zu:",
          },
          {
            type: "unorderedList",
            items: [
              "Einer wachsenden Bibliothek gelöster Incidents und Lösungen",
              "Trainingsmaterial für Bedienende und Technikerinnen",
              "Besseren AR-Arbeitsanweisungen für ähnliche Störungen in der Zukunft",
            ],
          },
          {
            type: "paragraph",
            content: "So wird Korrektur-Instandhaltung heute schneller und morgen schlauer.",
          },
        ],
      },
      {
        title: "Wichtigste Vorteile und KPIs",
        blocks: [
          {
            type: "paragraph",
            content: "AR-Remote-Support für Korrekturmaßnahmen liefert:",
          },
          {
            type: "unorderedList",
            items: [
              "Kürzere ungeplante Stillstände durch schnellere Fehlerbehebung",
              "Höhere First-Time-Right-Quote bei Reparaturen",
              "Längere Mean Time Between Failure durch bessere Ursachenbehebung",
              "Effizientere Nutzung von Expertinnenkapazität ohne Reise- und Wartezeiten",
            ],
          },
        ],
      },
    ],
  },
};

const nlContent: UseCaseContentBySlug = {
  "ar-work-instructions-corporate-memory": {
    heroTitle: "AR-werkinstructies en SOP's om bedrijfsgeheugen te borgen",
    heroParagraphs: [
      "Wanneer ervaren experts uw organisatie verlaten, nemen ze vaak jaren aan stilzwijgende kennis mee. Werkinstructies slingeren rond in ordners, notitieboeken en ad-hocoplossingen op de werkvloer. Daardoor is het voor nieuwe medewerkers lastig om snel te leren en taken consistent en veilig uit te voeren.",
      "Met AR-Standard Operating Procedures (AR-SOP's) van ActARion en DeepSight legt u expertise één keer vast en verandert u deze in herbruikbare, visuele instructies die iedere operator kan volgen.",
    ],
    sections: [
      {
        title: "De uitdaging: Kritische kennis loopt weg",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Experts beschikken over diep, vaak ongedocumenteerd proceskennis",
              "Procedures zijn versnipperd over papier, pdf's en persoonlijke notities",
              "Nieuwe medewerkers zijn afhankelijk van meelopen en informeel coachen",
              "Gevolg: inconsistente uitvoering, vermijdbare fouten en kwaliteitsissues",
            ],
          },
        ],
      },
      {
        title: "De oplossing: Expertflows vastleggen met AR-SOP's",
        blocks: [
          {
            type: "paragraph",
            content:
              "Met AR-werkinstructies legt u vast hoe een expert een kritieke taak uitvoert en verandert u dit in een gestandaardiseerde, digitale procedure:",
          },
          {
            type: "orderedList",
            items: [
              "Een manager of proceseigenaar selecteert een cruciale procedure.",
              "De expert draagt smartglasses of gebruikt tablet/smartphone en voert de taak stap voor stap uit.",
              "Het AR-SOP-systeem registreert de acties, structureert de stappen automatisch en voegt beelden of video toe.",
              "De expert verrijkt het AR-SOP met gesproken notities, waarschuwingen, tips en best practices.",
              "Het AR-SOP wordt opgeslagen in een centrale digitale bibliotheek als single source of truth.",
            ],
          },
          {
            type: "paragraph",
            content:
              "Vanaf dat moment kan elke operator de AR-SOP openen en dezelfde procedure volgen, rechtstreeks in het gezichtsveld begeleid.",
          },
        ],
      },
      {
        title: "Hoe AR-SOP's training en uitvoering ondersteunen",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Nieuwe medewerkers openen de AR-SOP op hun device",
              "Stap voor stap laten overlays zien wat je waar en in welke volgorde doet",
              "Visuele cues en annotaties verminderen interpretatiefouten",
              "Taken worden First Time Right afgerond, in lijn met de expert-standaard",
            ],
          },
        ],
      },
      {
        title: "Belangrijkste voordelen en KPI's",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-SOP's voor het behoud van bedrijfsgeheugen leveren meetbare impact op:",
          },
          {
            type: "unorderedList",
            items: [
              "Kortere inwerktijd voor nieuwe medewerkers",
              "Hogere First-Time-Right-score en consistentere uitvoering",
              "Gestage groei van de AR-SOP-bibliotheek voor kritieke procedures",
              "Vijf tot tien keer snellere SOP-creatie dan traditionele documentatie",
            ],
          },
          {
            type: "paragraph",
            content:
              "Door expertise om te zetten in AR-SOP's beschermt u uw bedrijfsgeheugen en schaalt u hoogwaardige uitvoering over teams, sites en shifts.",
          },
        ],
      },
    ],
  },
  "ar-training-and-onboarding": {
    heroTitle: "Versnel training en onboarding met AR-werkinstructies",
    heroParagraphs: [
      "Traditionele onboarding betekent vaak weken meelopen en klassikale training. Dat remt productiviteit en legt extra druk op een kleine groep experts. Augmented-realitytraining verandert dat beeld.",
      "Met AR-begeleide werkinstructies leren nieuwe medewerkers direct op de werkplek. Heldere overlays vervangen statische handleidingen, echte taken worden stap voor stap uitgevoerd en competenties groeien sneller en betrouwbaarder.",
    ],
    sections: [
      {
        title: "De uitdaging: Traag en inconsistent onboarding",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Nieuwe medewerkers hangen af van de beschikbaarheid en stijl van experts",
              "Papieren instructies zijn lastig te interpreteren in de werkelijke omgeving",
              "Trainingskwaliteit verschilt per trainer, ploeg en locatie",
              "Compliance en trainingsbewijzen zijn moeilijk vast te leggen",
            ],
          },
        ],
      },
      {
        title: "De oplossing: AR-begeleide onboarding op de vloer",
        blocks: [
          {
            type: "paragraph",
            content: "AR-training combineert digitale werkinstructies met de echte taak:",
          },
          {
            type: "orderedList",
            items: [
              "Een leidinggevende wijst een taak toe aan een nieuwe medewerker.",
              "De medewerker opent de AR-gids op smartglasses, tablet of smartphone.",
              "Het AR-systeem toont visuele stap-voor-stap-instructies in het zichtveld.",
              "Overlays, pijlen en 3D-modellen geven exact aan waar en hoe elke stap gebeurt.",
              "Elke stap wordt bevestigd of automatisch geverifieerd via visuele herkenning.",
            ],
          },
          {
            type: "paragraph",
            content: "Het resultaat is een gestandaardiseerd onboardingproces, los van wie er die dag traint.",
          },
        ],
      },
      {
        title: "Ingebouwde compliance- en prestatiebewijzen",
        blocks: [
          {
            type: "paragraph",
            content: "Het AR-trainingssysteem registreert automatisch:",
          },
          {
            type: "unorderedList",
            items: [
              "Afgeronde stappen en bevestigingen per taak",
              "Foto's of videofragmenten als bewijs van correcte uitvoering",
              "Een digitale audittrail voor kwaliteit en compliance",
            ],
          },
          {
            type: "paragraph",
            content:
              "Teamleads en trainers zien waar medewerkers moeite hebben en sturen inhoud of focus bij.",
          },
        ],
      },
      {
        title: "Belangrijkste voordelen en KPI's",
        blocks: [
          {
            type: "paragraph",
            content: "AR-onboarding levert typisch:",
          },
          {
            type: "unorderedList",
            items: [
              "Significant kortere inwerktijd en minder coaching",
              "Hogere First-Time-Right-percentages en minder fouten",
              "Gedocumenteerd, auditklaar bewijs van conforme uitvoering",
              "Kortere doorlooptijd voor specifieke taken of processtappen",
            ],
          },
          {
            type: "paragraph",
            content:
              "AR-training schaalt de kennis van uw beste experts naar iedere nieuwe medewerker zonder hun workload te verhogen.",
          },
        ],
      },
    ],
  },
  "ar-guided-assembly-production": {
    heroTitle: "Foutloze productie met AR-ondersteunde montage",
    heroParagraphs: [
      "In productie en assemblage leiden kleine fouten snel tot rework, scrap of recalls. Papieren instructies en verbale uitleg laten te veel ruimte voor interpretatie.",
      "AR-begeleide productie geeft operators duidelijke visuele werkinstructies aan de werkplek, gecombineerd met geautomatiseerde visuele verificatie. Zo dalen menselijke fouten en ontstaat een volledig, auditproof dossier per product.",
    ],
    sections: [
      {
        title: "De uitdaging: Fouten, rework en recalls",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Operators werken met statische instructies die lastig up-to-date blijven",
              "Complexe assemblages steunen op geheugen, lokale trucs en tribal knowledge",
              "Kwaliteitscontrole is vaak handmatig en steekproefsgewijs",
              "Traceerbaarheid per product of batch is onvolledig",
            ],
          },
        ],
      },
      {
        title: "De oplossing: Geleide montage met visuele verificatie",
        blocks: [
          {
            type: "paragraph",
            content: "ActARion en DeepSight leveren een AR-gids die operators stap voor stap helpt:",
          },
          {
            type: "orderedList",
            items: [
              "De operator scant een product-ID of selecteert een order in het AR-systeem.",
              "Het systeem laadt de juiste digitale instructies voor variant of batch.",
              "In het zichtveld verschijnen genummerde stappen en visuele cues op de echte assemblage.",
              "Pijlen, highlights of 3D-overlays tonen exact waar onderdelen geplaatst of aangepast worden.",
              "Na elke stap maakt het systeem een foto of korte video als visueel bewijs.",
              "Pas na een geslaagde controle wordt de volgende stap vrijgegeven.",
            ],
          },
          {
            type: "paragraph",
            content: "Alle beelden worden gekoppeld aan order of serienummer en vormen een volledig visueel dossier.",
          },
        ],
      },
      {
        title: "Geautomatiseerde, evidence-based kwaliteit en compliance",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Elk product krijgt een eigen visuele audittrail",
              "Kwaliteitsinspecteurs kunnen stappen indien nodig op afstand bekijken",
              "Klanten en auditors krijgen objectief bewijs dat elke stap correct is uitgevoerd",
              "Data kunnen worden geanalyseerd om instructies en processen te verbeteren",
            ],
          },
        ],
      },
      {
        title: "Belangrijkste voordelen en KPI's",
        blocks: [
          {
            type: "paragraph",
            content: "AR-begeleide productie helpt u om:",
          },
          {
            type: "unorderedList",
            items: [
              "First-Time-Right te verhogen en rework/scrap te verlagen",
              "Doorlooptijden te verkorten door onzekerheid en zoektijd weg te nemen",
              "Productrecalls en kwaliteitsincidenten terug te dringen",
              "Een volledig traceerbaar, evidence-based kwaliteitsproces per product/batch op te bouwen",
            ],
          },
        ],
      },
    ],
  },
  "ar-guided-changeover-batch-preparation": {
    heroTitle: "Downtime verkorten met AR-gestuurde omstellingen",
    heroParagraphs: [
      "Omstellingen en batchvoorbereiding zijn kritieke momenten. Foute instellingen of gemiste stappen leiden tot defecten, afval en ongeplande stilstand. Procedures zijn complex en leunen op een paar ervaren operators.",
      "Met AR-begeleide omstellingen volgen operators duidelijke, gestandaardiseerde instructies in augmented reality. Elke stap wordt vastgelegd en remote experts kunnen live meekijken als er iets afwijkt.",
    ],
    sections: [
      {
        title: "De uitdaging: Complexe, foutgevoelige omstellingen",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Machine-omstellingen kosten tijd en hangen af van een paar specialisten",
              "Instellingen en checks zijn niet altijd volledig gedocumenteerd",
              "Kleine fouten zorgen voor opstartproblemen in de volgende batch",
              "OEM's en servicepartners hebben weinig zicht op hoe omstellingen gebeuren",
            ],
          },
        ],
      },
      {
        title: "De oplossing: Gestandaardiseerde AR-procedures",
        blocks: [
          {
            type: "paragraph",
            content: "AR-werkinstructies begeleiden elke omstelling:",
          },
          {
            type: "orderedList",
            items: [
              "De vorige batch wordt afgerond.",
              "De operator selecteert de volgende batch in het AR-systeem.",
              "Het systeem laadt de specifieke AR-omstellingsprocedure.",
              "De operator ziet genummerde, visuele instructies in de gewenste taal.",
              "Bij kritieke stappen worden beelden of video's als bewijs vastgelegd.",
              "Na de eindcontrole bevestigt het systeem dat de lijn klaar is voor productie.",
            ],
          },
          {
            type: "paragraph",
            content: "Alle stappen en tijdstempels worden opgeslagen in een digitaal logboek voor latere analyse.",
          },
        ],
      },
      {
        title: "Remote-experts wanneer nodig",
        blocks: [
          {
            type: "paragraph",
            content:
              "Bij een afwijking kan de operator direct een remote sessie starten:",
          },
          {
            type: "unorderedList",
            items: [
              "Een specialist op afstand ziet live hetzelfde beeld",
              "De expert kan annotaties tekenen, onderdelen highlighten en gesproken aanwijzingen geven",
              "De sessie wordt opgenomen en gekoppeld aan de omstellingscase",
            ],
          },
          {
            type: "paragraph",
            content: "Zo zijn minder site-visits nodig en wordt sneller opgelost.",
          },
        ],
      },
      {
        title: "Belangrijkste voordelen en KPI's",
        blocks: [
          {
            type: "paragraph",
            content: "AR-omstellingen en batchvoorbereiding leveren:",
          },
          {
            type: "unorderedList",
            items: [
              "Kortere omsteltijden en snellere batchwissels",
              "Minder downtime door configuratiefouten",
              "Hogere First-Time-Right bij de herstart van productie",
              "Langere Mean Time Between Failure door correcte instellingen en betere overdracht",
            ],
          },
        ],
      },
    ],
  },
  "ar-preventive-maintenance": {
    heroTitle: "Data-gedreven AR-planned maintenance voor hogere uptime",
    heroParagraphs: [
      "Preventief onderhoud moet stilstand voorkomen, maar inzicht in de daadwerkelijke uitvoering ontbreekt vaak. Zonder data over kwaliteit, tijd en terugkerende issues is optimaliseren moeilijk.",
      "AR-ondersteund onderhoud combineert visuele instructies met automatische datacollectie. Elke taak gebeurt op dezelfde manier, wordt met beelden vastgelegd en verrijkt met prestatie-indicatoren.",
    ],
    sections: [
      {
        title: "De uitdaging: Beperkt zicht op uitvoering",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Preventieve taken worden per technicus anders uitgevoerd",
              "Papieren checklists registreren geen tijd, afwijkingen of bewijsmateriaal",
              "Het is moeilijk om onderhouds-inspanning te koppelen aan betrouwbaarheid en uptime",
              "Continu verbeteren gebeurt vaak op aannames",
            ],
          },
        ],
      },
      {
        title: "De oplossing: AR-onderhoud met ingebouwde meting",
        blocks: [
          {
            type: "paragraph",
            content: "Met een AR-maintenanceplatform:",
          },
          {
            type: "orderedList",
            items: [
              "De technicus ontvangt een geplande taak in het onderhoudssysteem.",
              "Hij start de bijbehorende AR-instructie op een AR-device.",
              "Het systeem begeleidt stap voor stap met visuele aanwijzingen aan het asset.",
              "Tijd per stap en totale duur worden automatisch geregistreerd.",
              "Het systeem noteert First-Time-Right en eventuele fouten of afwijkingen.",
              "Bij kritieke checks maakt het systeem foto's of video als bewijs.",
            ],
          },
          {
            type: "paragraph",
            content: "Na afloop wordt automatisch een gedetailleerd onderhoudsrapport gemaakt.",
          },
        ],
      },
      {
        title: "Van preventief naar continu optimaliseren",
        blocks: [
          {
            type: "paragraph",
            content: "Onderhoudsplanners gebruiken de AR-data om:",
          },
          {
            type: "unorderedList",
            items: [
              "Stappen te vereenvoudigen of herontwerpen wanneer ze structureel te lang duren of verwarring geven",
              "Onderhoudsintervallen te herzien op basis van werkelijke belasting en storingen",
              "Opleidingsnoden te herkennen aan terugkerende fouten",
            ],
          },
          {
            type: "paragraph",
            content: "Zo wordt preventief onderhoud steeds gerichter, efficiënter en beter afgestemd op businessimpact.",
          },
        ],
      },
      {
        title: "Belangrijkste voordelen en KPI's",
        blocks: [
          {
            type: "paragraph",
            content: "Data-gedreven onderhoud met AR helpt u om:",
          },
          {
            type: "unorderedList",
            items: [
              "First-Time-Right bij onderhoudstaken te verhogen",
              "Ongeplande downtime en storingen te verlagen",
              "Het aantal incidenten en equipment failures terug te dringen",
              "Onderhoudstijd te verkorten via standaardisatie en beter inzicht",
            ],
          },
        ],
      },
    ],
  },
  "ar-remote-expert-support-corrective-maintenance": {
    heroTitle: "Snellere correctieve onderhoud met AR-remote experts",
    heroParagraphs: [
      "Bij een kritieke storing telt elke minuut. Vaak is de juiste expert niet ter plaatse en zorgen reistijden voor extra stilstand. Telefonisch of met foto's is het lastig complexe reparaties te begeleiden.",
      "AR-remote support brengt de specialist virtueel naar de machine. De operator deelt een live videofeed en de expert stuurt stap voor stap met audio en visuele annotaties.",
    ],
    sections: [
      {
        title: "De uitdaging: Lange downtime en beperkte expertise",
        blocks: [
          {
            type: "unorderedList",
            items: [
              "Experts kunnen niet op elke site of shift tegelijk zijn",
              "Diagnoses op afstand zijn moeilijk met enkel telefoon of e-mail",
              "Reis- en wachttijden verlengen ongeplande stilstand",
              "Lessen uit eerdere incidenten worden niet altijd vastgelegd en hergebruikt",
            ],
          },
        ],
      },
      {
        title: "De oplossing: Live AR-ondersteuning voor correctief onderhoud",
        blocks: [
          {
            type: "paragraph",
            content: "Met een AR-remote platform:",
          },
          {
            type: "orderedList",
            items: [
              "De operator detecteert een fout die lokaal niet oplosbaar is.",
              "Hij start een AR-supportsessie op smartglasses, tablet of smartphone.",
              "Een remote expert kijkt real time mee.",
              "De expert voegt visuele annotaties toe — pijlen, cirkels — in het zichtveld.",
              "Stap voor stap begeleidt hij diagnose en herstelacties.",
              "De sessie, notities en screenshots worden als case opgeslagen.",
            ],
          },
          {
            type: "paragraph",
            content:
              "Is een storing te complex voor remote oplossing, dan helpt de documentatie bij de voorbereiding van een site visit of escalatie.",
          },
        ],
      },
      {
        title: "Een herbruikbare kennisbasis",
        blocks: [
          {
            type: "paragraph",
            content: "Elke remote sessie draagt bij aan:",
          },
          {
            type: "unorderedList",
            items: [
              "Een groeiende bibliotheek van opgeloste incidenten en oplossingen",
              "Trainingsmateriaal voor operators en technici",
              "Betere AR-werkinstructies voor vergelijkbare storingen in de toekomst",
            ],
          },
          {
            type: "paragraph",
            content: "Zo wordt correctief onderhoud vandaag sneller en morgen slimmer.",
          },
        ],
      },
      {
        title: "Belangrijkste voordelen en KPI's",
        blocks: [
          {
            type: "paragraph",
            content: "AR-remote support levert:",
          },
          {
            type: "unorderedList",
            items: [
              "Kortere ongeplande downtime door snellere storingsoplossing",
              "Hogere First-Time-Right bij reparaties",
              "Langere Mean Time Between Failure dankzij betere root-cause fixes",
              "Efficiënter gebruik van expertcapaciteit zonder reis- en wachttijd",
            ],
          },
        ],
      },
    ],
  },
};

const localizedContent: Partial<Record<Locale, UseCaseContentBySlug>> = {
  en: enContent,
  de: deContent,
  nl: nlContent,
};

export function getUseCaseContent(locale: Locale, slug: UseCaseSlug) {
  return localizedContent[locale]?.[slug] ?? enContent[slug];
}


