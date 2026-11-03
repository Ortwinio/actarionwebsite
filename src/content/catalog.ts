/**
 * Page catalogue — the complete URL structure of actarion.com (EN / NL / DE).
 * Source: "Actarion – URL-structuur en contentoverzicht nieuwe website" + design sitemap.
 *
 * Row: [key, type, parent, phase, enSlug, nlSlug, deSlug, enLabel, nlLabel, deLabel, keyword (EN | NL | DE)]
 * Slugs are relative to the locale prefix. '' = locale home.
 */
export type PageType =
  | 'home'
  | 'hub'
  | 'resourcesHub'
  | 'glossaryHub'
  | 'solution'
  | 'platform'
  | 'useCase'
  | 'industry'
  | 'hardware'
  | 'template'
  | 'guide'
  | 'comparison'
  | 'glossaryTerm'
  | 'caseStudy'
  | 'partner'
  | 'whitepaper'
  | 'report'
  | 'media'
  | 'roi'
  | 'roiReport'
  | 'pilot'
  | 'fitCheck'
  | 'demo'
  | 'contact'
  | 'company'
  | 'team'
  | 'careers'
  | 'faq'
  | 'legal'
  | 'sitemap';

export type Row = [
  key: string,
  type: PageType,
  parent: string | null,
  phase: 1 | 2 | 3,
  en: string,
  nl: string,
  de: string,
  enLabel: string,
  nlLabel: string,
  deLabel: string,
  keyword?: string,
];

export const catalog: Row[] = [
  ['home', 'home', null, 1, '', '', '', 'Home', 'Home', 'Start', 'digital work instructions with AI & AR | digitale werkinstructies | digitale Arbeitsanweisungen'],

  // ── Solutions (commercial core) ──
  ['solutions', 'hub', 'home', 1, 'solutions', 'oplossingen', 'loesungen', 'Solutions', 'Oplossingen', 'Lösungen'],
  ['solDwi', 'solution', 'solutions', 1, 'solutions/digital-work-instructions', 'oplossingen/digitale-werkinstructies', 'loesungen/digitale-arbeitsanweisungen', 'Digital work instructions', 'Digitale werkinstructies', 'Digitale Arbeitsanweisungen', 'digital work instructions | digitale werkinstructies | digitale Arbeitsanweisung'],
  ['solCwp', 'solution', 'solutions', 1, 'solutions/connected-worker-platform', 'oplossingen/connected-worker-platform', 'loesungen/werkerassistenzsystem', 'Connected worker platform', 'Connected worker platform', 'Werkerassistenzsystem', 'connected worker platform | connected worker | Werkerassistenzsystem'],
  ['solSop', 'solution', 'solutions', 1, 'solutions/sop-software', 'oplossingen/sop-software', 'loesungen/sop-software', 'SOP software', 'SOP-software', 'SOP-Software', 'sop software | sop | SOP'],
  ['solTraining', 'solution', 'solutions', 1, 'solutions/frontline-training', 'oplossingen/training-en-inwerken', 'loesungen/mitarbeiter-einarbeitung', 'Frontline training & onboarding', 'Training en inwerken', 'Mitarbeiter-Einarbeitung', 'ar training | inwerkprogramma | Einarbeitungsplan'],
  ['solChecklists', 'solution', 'solutions', 2, 'solutions/digital-checklists', 'oplossingen/digitale-checklists', 'loesungen/digitale-checklisten', 'Digital checklists & inspections', 'Digitale checklists', 'Digitale Checklisten', 'digital checklist manufacturing | digitale checklist | digitale Checkliste'],
  ['solKnowledge', 'solution', 'solutions', 2, 'solutions/knowledge-capture', 'oplossingen/kennisborging', 'loesungen/wissenstransfer', 'Knowledge capture & transfer', 'Kennisborging', 'Wissenstransfer', 'knowledge capture | kennisoverdracht | Wissenstransfer'],

  // ── Platform ──
  ['platform', 'platform', 'home', 1, 'platform', 'platform', 'plattform', 'Platform', 'Platform', 'Plattform', 'work instruction platform | werkinstructie platform | Plattform Arbeitsanweisungen'],
  ['pfAi', 'platform', 'platform', 1, 'platform/ai-authoring', 'platform/ai-werkinstructies', 'plattform/ki-arbeitsanweisungen', 'AI authoring', 'AI-werkinstructies', 'KI-Arbeitsanweisungen', 'ai sop generator | AI werkinstructie | KI Arbeitsanweisung'],
  ['pfAr', 'platform', 'platform', 1, 'platform/ar-guidance', 'platform/ar-begeleiding', 'plattform/ar-werkerfuehrung', 'AR guidance', 'AR-begeleiding', 'AR-Werkerführung', 'augmented reality work instructions'],
  ['pfKnowledge', 'platform', 'platform', 2, 'platform/knowledge-capture', 'platform/kennis-vastleggen', 'plattform/wissen-erfassen', 'Knowledge capture', 'Kennis vastleggen', 'Wissen erfassen', 'expert knowledge capture'],
  ['pfSkills', 'platform', 'platform', 2, 'platform/skills-management', 'platform/competentiebeheer', 'plattform/qualifikationsmanagement', 'Skills management', 'Competentiebeheer', 'Qualifikationsmanagement', 'skills matrix software | competentiematrix | Qualifikationsmatrix Software'],
  ['pfAnalytics', 'platform', 'platform', 1, 'platform/analytics-audit-trail', 'platform/analyse-en-audit', 'plattform/analyse-audit-trail', 'Analytics & audit trail', 'Analyse en audit trail', 'Analyse und Audit-Trail', 'work instruction audit trail'],
  ['pfRemote', 'platform', 'platform', 2, 'platform/remote-support', 'platform/remote-support', 'plattform/remote-support', 'Remote expert support', 'Remote support', 'Remote-Support', 'remote assistance ar | remote support | Remote Support'],
  ['pfMultilingual', 'platform', 'platform', 2, 'platform/multilingual', 'platform/meertalig', 'plattform/mehrsprachig', 'Multilingual instructions', 'Meertalige instructies', 'Mehrsprachige Anweisungen', 'multilingual work instructions'],
  ['pfIntegrations', 'platform', 'platform', 2, 'platform/integrations', 'platform/integraties', 'plattform/integrationen', 'Integrations', 'Integraties', 'Integrationen', 'SAP / MES / LMS integration'],
  ['pfSecurity', 'platform', 'platform', 1, 'platform/security', 'platform/beveiliging', 'plattform/sicherheit', 'Security & compliance', 'Beveiliging en compliance', 'Sicherheit und Compliance', 'GDPR, EU hosting, ISO 27001, EU AI Act'],

  // ── Use cases ──
  ['useCases', 'hub', 'home', 1, 'use-cases', 'toepassingen', 'anwendungsfaelle', 'Use cases', 'Toepassingen', 'Anwendungsfälle'],
  ['ucOnboarding', 'useCase', 'useCases', 1, 'use-cases/onboarding-training', 'toepassingen/inwerken-training', 'anwendungsfaelle/einarbeitung-schulung', 'Onboarding & training', 'Inwerken en training', 'Einarbeitung und Schulung', 'operator onboarding | inwerken productiemedewerkers | Einarbeitung Produktion'],
  ['ucAssembly', 'useCase', 'useCases', 1, 'use-cases/assembly', 'toepassingen/assemblage', 'anwendungsfaelle/montage', 'Assembly', 'Assemblage', 'Montage', 'assembly work instructions | montage-instructies | Montageanleitung digital'],
  ['ucChangeover', 'useCase', 'useCases', 1, 'use-cases/changeover-smed', 'toepassingen/omstellen-smed', 'anwendungsfaelle/ruesten-smed', 'Changeovers (SMED)', 'Omstellen (SMED)', 'Rüsten (SMED)', 'changeover time reduction, SMED | omsteltijd verkorten | Rüstzeit reduzieren'],
  ['ucMaintenance', 'useCase', 'useCases', 1, 'use-cases/preventive-maintenance', 'toepassingen/preventief-onderhoud', 'anwendungsfaelle/vorbeugende-wartung', 'Preventive maintenance', 'Preventief onderhoud', 'Vorbeugende Wartung', 'ar maintenance | preventief onderhoud | Wartungsplan'],
  ['ucRemote', 'useCase', 'useCases', 1, 'use-cases/remote-expert-support', 'toepassingen/remote-ondersteuning', 'anwendungsfaelle/remote-experten-support', 'Remote expert support', 'Remote ondersteuning', 'Remote-Experten-Support', 'remote expert support | remote ondersteuning monteur | Remote-Support Servicetechniker'],
  ['ucQuality', 'useCase', 'useCases', 2, 'use-cases/quality-inspections', 'toepassingen/kwaliteitsinspecties', 'anwendungsfaelle/qualitaetspruefung', 'Quality inspections & audits', 'Kwaliteitsinspecties', 'Qualitätsprüfung', 'digital inspection checklist'],
  ['ucSafety', 'useCase', 'useCases', 2, 'use-cases/safety-loto', 'toepassingen/veiligheid-loto', 'anwendungsfaelle/arbeitssicherheit-loto', 'Safety & LOTO', 'Veiligheid en LOTO', 'Arbeitssicherheit und LOTO', 'lockout tagout procedure'],
  ['ucShutdown', 'useCase', 'useCases', 3, 'use-cases/shutdown-turnaround', 'toepassingen/stops-en-turnarounds', 'anwendungsfaelle/stillstand-revision', 'Shutdowns & turnarounds', 'Stops en turnarounds', 'Stillstand und Revision', 'shutdown turnaround planning'],
  ['ucLogistics', 'useCase', 'useCases', 3, 'use-cases/logistics', 'toepassingen/logistiek', 'anwendungsfaelle/logistik', 'Logistics (picking & packing)', 'Logistiek', 'Logistik', 'ar picking'],

  // ── Industries ──
  ['industries', 'hub', 'home', 1, 'industries', 'sectoren', 'branchen', 'Industries', 'Sectoren', 'Branchen'],
  ['indManufacturing', 'industry', 'industries', 1, 'industries/manufacturing', 'sectoren/maakindustrie', 'branchen/fertigung', 'Manufacturing', 'Maakindustrie', 'Fertigung', 'assembly, changeovers, OEE, errors'],
  ['indPharma', 'industry', 'industries', 1, 'industries/pharma-biotech', 'sectoren/farma-biotech', 'branchen/pharma-biotech', 'Pharma & biotech', 'Farma en biotech', 'Pharma und Biotech', 'GMP, batch preparation, line clearance, audit trail'],
  ['indEnergy', 'industry', 'industries', 2, 'industries/energy-utilities', 'sectoren/energie-utilities', 'branchen/energie-versorger', 'Energy & utilities', 'Energie en utilities', 'Energie und Versorger', 'field service, safety, shutdowns'],
  ['indFood', 'industry', 'industries', 2, 'industries/food-beverage', 'sectoren/voedingsmiddelen', 'branchen/lebensmittel', 'Food & beverage', 'Voedingsmiddelen', 'Lebensmittel', 'changeovers, cleaning (CIP), HACCP'],
  ['indAerospace', 'industry', 'industries', 2, 'industries/aerospace-mro', 'sectoren/luchtvaart-mro', 'branchen/luftfahrt-mro', 'Aerospace & MRO', 'Luchtvaart en MRO', 'Luftfahrt und MRO', 'MRO procedures, traceability'],
  ['indMachine', 'industry', 'industries', 2, 'industries/machine-builders', 'sectoren/machinebouw', 'branchen/maschinenbau', 'Machine builders (OEM)', 'Machinebouw', 'Maschinenbau', 'service instructions, Machinery Regulation'],
  ['indField', 'industry', 'industries', 3, 'industries/field-service', 'sectoren/field-service', 'branchen/aussendienst-service', 'Field service', 'Field service', 'Außendienst und Service', 'checklists, remote support'],

  // ── Hardware ──
  ['hardware', 'hardware', 'home', 1, 'hardware', 'hardware', 'hardware', 'AR hardware', 'AR-hardware', 'AR-Hardware', 'smart glasses for manufacturing | smart glasses, ar bril | Smart Glasses, AR Brille'],
  ['hwVisionPro', 'hardware', 'hardware', 1, 'hardware/apple-vision-pro', 'hardware/apple-vision-pro', 'hardware/apple-vision-pro', 'Apple Vision Pro', 'Apple Vision Pro', 'Apple Vision Pro', 'apple vision pro enterprise'],
  ['hwHololens', 'hardware', 'hardware', 1, 'hardware/hololens', 'hardware/hololens', 'hardware/hololens', 'Microsoft HoloLens', 'Microsoft HoloLens', 'Microsoft HoloLens', 'hololens 2 alternative'],
  ['hwAndroidXr', 'hardware', 'hardware', 2, 'hardware/android-xr', 'hardware/android-xr', 'hardware/android-xr', 'Android XR', 'Android XR', 'Android XR', 'android xr enterprise'],
  ['hwTablets', 'hardware', 'hardware', 2, 'hardware/tablets-smartphones', 'hardware/tablets-smartphones', 'hardware/tablets-smartphones', 'Tablets & smartphones', 'Tablets en smartphones', 'Tablets und Smartphones', 'work instructions on tablet'],

  // ── Resources ──
  ['resources', 'resourcesHub', 'home', 1, 'resources', 'kennisbank', 'ressourcen', 'Resources', 'Kennisbank', 'Ressourcen'],
  ['templates', 'hub', 'resources', 1, 'resources/templates', 'kennisbank/templates', 'ressourcen/vorlagen', 'Templates & checklists', 'Templates en checklists', 'Vorlagen und Checklisten', 'free manufacturing templates'],
  ['tplWorkInstruction', 'template', 'templates', 1, 'resources/templates/work-instruction-template', 'kennisbank/templates/werkinstructie-template', 'ressourcen/vorlagen/arbeitsanweisung-vorlage', 'Work instruction template', 'Werkinstructie-template', 'Arbeitsanweisung-Vorlage', 'Word + PDF'],
  ['tplSop', 'template', 'templates', 1, 'resources/templates/sop-template', 'kennisbank/templates/sop-template', 'ressourcen/vorlagen/sop-vorlage', 'SOP template', 'SOP-template', 'SOP-Vorlage', 'Word + PDF'],
  ['tplMaintenance', 'template', 'templates', 1, 'resources/templates/preventive-maintenance-checklist', 'kennisbank/templates/preventief-onderhoud-checklist', 'ressourcen/vorlagen/wartungscheckliste', 'Preventive maintenance checklist', 'Checklist preventief onderhoud', 'Wartungscheckliste', 'Excel + PDF'],
  ['tplSkills', 'template', 'templates', 1, 'resources/templates/skills-matrix-template', 'kennisbank/templates/competentiematrix-template', 'ressourcen/vorlagen/qualifikationsmatrix-vorlage', 'Skills matrix template', 'Competentiematrix-template', 'Qualifikationsmatrix-Vorlage', 'Excel'],
  ['tplSmed', 'template', 'templates', 1, 'resources/templates/smed-changeover-checklist', 'kennisbank/templates/smed-omstel-checklist', 'ressourcen/vorlagen/smed-ruest-checkliste', 'SMED changeover checklist', 'SMED-omstelchecklist', 'SMED-Rüstcheckliste', 'Excel + PDF'],
  ['tplOnboarding', 'template', 'templates', 2, 'resources/templates/operator-onboarding-plan', 'kennisbank/templates/inwerkprogramma-productie', 'ressourcen/vorlagen/einarbeitungsplan-produktion', 'Operator onboarding plan', 'Inwerkprogramma productie', 'Einarbeitungsplan Produktion', 'Word + Excel'],
  ['tplSchedule', 'template', 'templates', 2, 'resources/templates/maintenance-schedule', 'kennisbank/templates/onderhoudsplan', 'ressourcen/vorlagen/wartungsplan-vorlage', 'Maintenance schedule template', 'Onderhoudsplan-template', 'Wartungsplan-Vorlage', 'Excel'],
  ['tplLoto', 'template', 'templates', 2, 'resources/templates/lockout-tagout-procedure', 'kennisbank/templates/loto-procedure', 'ressourcen/vorlagen/loto-verfahren', 'Lockout/tagout procedure template', 'LOTO-procedure template', 'LOTO-Verfahren Vorlage', 'Word + PDF'],
  ['tplLineClearance', 'template', 'templates', 2, 'resources/templates/line-clearance-checklist', 'kennisbank/templates/line-clearance-checklist', 'ressourcen/vorlagen/line-clearance-checkliste', 'Line clearance checklist', 'Line clearance-checklist', 'Line-Clearance-Checkliste', 'PDF'],
  ['tplQuality', 'template', 'templates', 2, 'resources/templates/quality-inspection-checklist', 'kennisbank/templates/kwaliteitsinspectie-checklist', 'ressourcen/vorlagen/qualitaetspruefung-checkliste', 'Quality inspection checklist', 'Kwaliteitsinspectie-checklist', 'Qualitätsprüfung-Checkliste', 'Excel + PDF'],
  ['tpl5s', 'template', 'templates', 3, 'resources/templates/5s-audit-checklist', 'kennisbank/templates/5s-audit-checklist', 'ressourcen/vorlagen/5s-audit-checkliste', '5S audit checklist', '5S-auditchecklist', '5S-Audit-Checkliste', 'Excel + PDF'],
  ['tplPreShift', 'template', 'templates', 3, 'resources/templates/pre-shift-checklist', 'kennisbank/templates/opstartchecklist', 'ressourcen/vorlagen/schichtbeginn-checkliste', 'Pre-shift start-up checklist', 'Opstartchecklist', 'Schichtbeginn-Checkliste', 'PDF'],
  ['tplKnowledge', 'template', 'templates', 3, 'resources/templates/knowledge-transfer-plan', 'kennisbank/templates/kennisoverdrachtsplan', 'ressourcen/vorlagen/wissenstransfer-plan', 'Knowledge transfer plan', 'Kennisoverdrachtsplan', 'Wissenstransfer-Plan', 'Word'],

  ['roiCalculator', 'roi', 'resources', 1, 'resources/roi-calculator', 'kennisbank/roi-calculator', 'ressourcen/roi-rechner', 'ROI calculator', 'ROI-calculator', 'ROI-Rechner'],
  ['roiReport', 'roiReport', 'roiCalculator', 1, 'resources/roi-calculator/report', 'kennisbank/roi-calculator/rapport', 'ressourcen/roi-rechner/bericht', 'Your report', 'Uw rapport', 'Ihr Bericht'],
  ['whitepapers', 'hub', 'resources', 2, 'resources/whitepapers', 'kennisbank/whitepapers', 'ressourcen/whitepaper', 'Whitepapers', 'Whitepapers', 'Whitepaper'],
  ['wpDwi', 'whitepaper', 'whitepapers', 2, 'resources/whitepapers/digital-work-instructions-guide', 'kennisbank/whitepapers/digitale-werkinstructies-gids', 'ressourcen/whitepaper/digitale-arbeitsanweisungen-leitfaden', 'Digital work instructions guide', 'Gids digitale werkinstructies', 'Leitfaden digitale Arbeitsanweisungen'],
  ['wpSop', 'whitepaper', 'whitepapers', 2, 'resources/whitepapers/sop-software-digital-standard-work', 'kennisbank/whitepapers/sop-software-digitaal-standaardwerk', 'ressourcen/whitepaper/sop-software-digitale-standardarbeit', 'SOP software and digital standard work', 'SOP-software en digitaal standaardwerk', 'SOP-Software und digitale Standardarbeit'],
  ['wpCw', 'whitepaper', 'whitepapers', 2, 'resources/whitepapers/connected-worker-platform-buyers-guide', 'kennisbank/whitepapers/connected-worker-platform-kiezen', 'ressourcen/whitepaper/werkerassistenzsystem-auswahl', "Connected worker buyer's guide", 'Connected worker platform kiezen', 'Werkerassistenzsystem auswählen'],
  ['wpRoi', 'whitepaper', 'whitepapers', 2, 'resources/whitepapers/roi-business-case-digital-work-instructions', 'kennisbank/whitepapers/roi-businesscase-digitale-werkinstructies', 'ressourcen/whitepaper/roi-business-case-digitale-arbeitsanweisungen', 'ROI business case', 'ROI-businesscase', 'ROI-Business-Case'],
  ['wpItSecurity', 'whitepaper', 'whitepapers', 2, 'resources/whitepapers/it-security-ar-ai', 'kennisbank/whitepapers/it-beveiliging-ar-ai', 'ressourcen/whitepaper/it-sicherheit-ar-ki', 'IT & security for AR and AI', 'IT en beveiliging bij AR en AI', 'IT-Sicherheit bei AR und KI'],
  ['wpTraining', 'whitepaper', 'whitepapers', 2, 'resources/whitepapers/frontline-training-onboarding-playbook', 'kennisbank/whitepapers/inwerken-training-productie-playbook', 'ressourcen/whitepaper/einarbeitung-schulung-produktion-playbook', 'Frontline training playbook', 'Playbook inwerken en training', 'Playbook Einarbeitung und Schulung'],
  ['report2027', 'report', 'resources', 3, 'resources/frontline-work-report-2027', 'kennisbank/rapport-werkinstructies-2027', 'ressourcen/studie-werkerfuehrung-2027', 'State of frontline work 2027', 'Rapport werkinstructies 2027', 'Studie Werkerführung 2027'],
  ['events', 'media', 'resources', 2, 'resources/events', 'kennisbank/events', 'ressourcen/events', 'Webinars & events', 'Webinars en events', 'Webinare und Events'],
  ['videos', 'media', 'resources', 2, 'resources/videos', 'kennisbank/videos', 'ressourcen/videos', 'Videos', "Video's", 'Videos'],

  // ── Glossary ──
  ['glossary', 'glossaryHub', 'resources', 1, 'resources/glossary', 'kennisbank/begrippen', 'ressourcen/glossar', 'Glossary', 'Begrippen', 'Glossar'],
  ['termSop', 'glossaryTerm', 'glossary', 1, 'resources/glossary/sop', 'kennisbank/begrippen/sop', 'ressourcen/glossar/sop', 'SOP', 'SOP', 'SOP'],
  ['termWorkInstruction', 'glossaryTerm', 'glossary', 1, 'resources/glossary/work-instruction', 'kennisbank/begrippen/werkinstructie', 'ressourcen/glossar/arbeitsanweisung', 'Work instruction', 'Werkinstructie', 'Arbeitsanweisung'],
  ['termConnectedWorker', 'glossaryTerm', 'glossary', 1, 'resources/glossary/connected-worker', 'kennisbank/begrippen/connected-worker', 'ressourcen/glossar/connected-worker', 'Connected worker', 'Connected worker', 'Connected Worker'],
  ['termSmed', 'glossaryTerm', 'glossary', 1, 'resources/glossary/smed', 'kennisbank/begrippen/smed', 'ressourcen/glossar/smed', 'SMED', 'SMED', 'SMED'],
  ['termOee', 'glossaryTerm', 'glossary', 1, 'resources/glossary/oee', 'kennisbank/begrippen/oee', 'ressourcen/glossar/oee', 'OEE', 'OEE', 'OEE'],
  ['termPokaYoke', 'glossaryTerm', 'glossary', 1, 'resources/glossary/poka-yoke', 'kennisbank/begrippen/poka-yoke', 'ressourcen/glossar/poka-yoke', 'Poka-yoke', 'Poka-yoke', 'Poka-Yoke'],
  ['termSkillsMatrix', 'glossaryTerm', 'glossary', 1, 'resources/glossary/skills-matrix', 'kennisbank/begrippen/competentiematrix', 'ressourcen/glossar/qualifikationsmatrix', 'Skills matrix', 'Competentiematrix', 'Qualifikationsmatrix'],
  ['termLoto', 'glossaryTerm', 'glossary', 1, 'resources/glossary/loto', 'kennisbank/begrippen/loto', 'ressourcen/glossar/loto', 'Lockout/tagout (LOTO)', 'LOTO', 'Lockout-Tagout (LOTO)'],
  ['termLineClearance', 'glossaryTerm', 'glossary', 1, 'resources/glossary/line-clearance', 'kennisbank/begrippen/lijnvrijgave', 'ressourcen/glossar/line-clearance', 'Line clearance', 'Line clearance', 'Line Clearance'],
  ['termGmp', 'glossaryTerm', 'glossary', 1, 'resources/glossary/gmp', 'kennisbank/begrippen/gmp', 'ressourcen/glossar/gmp', 'GMP', 'GMP', 'GMP'],
  ['termCapa', 'glossaryTerm', 'glossary', 2, 'resources/glossary/capa', 'kennisbank/begrippen/capa', 'ressourcen/glossar/capa', 'CAPA', 'CAPA', 'CAPA'],
  ['termFtr', 'glossaryTerm', 'glossary', 2, 'resources/glossary/first-time-right', 'kennisbank/begrippen/first-time-right', 'ressourcen/glossar/first-time-right', 'First-time-right', 'First-time-right', 'First-Time-Right'],
  ['termAr', 'glossaryTerm', 'glossary', 2, 'resources/glossary/augmented-reality', 'kennisbank/begrippen/augmented-reality', 'ressourcen/glossar/augmented-reality', 'Augmented reality', 'Augmented reality', 'Augmented Reality'],
  ['termMr', 'glossaryTerm', 'glossary', 2, 'resources/glossary/mixed-reality', 'kennisbank/begrippen/mixed-reality', 'ressourcen/glossar/mixed-reality', 'Mixed reality', 'Mixed reality', 'Mixed Reality'],
  ['termSmartGlasses', 'glossaryTerm', 'glossary', 2, 'resources/glossary/smart-glasses', 'kennisbank/begrippen/slimme-bril', 'ressourcen/glossar/datenbrille', 'Smart glasses', 'Smart glasses', 'Datenbrille'],
  ['termRemote', 'glossaryTerm', 'glossary', 2, 'resources/glossary/remote-assistance', 'kennisbank/begrippen/remote-assistentie', 'ressourcen/glossar/remote-assistenz', 'Remote assistance', 'Remote assistance', 'Remote Assistance'],
  ['termKnowledgeCapture', 'glossaryTerm', 'glossary', 2, 'resources/glossary/knowledge-capture', 'kennisbank/begrippen/kennisborging', 'ressourcen/glossar/wissenserfassung', 'Knowledge capture', 'Kennisborging', 'Wissenssicherung'],
  ['termDigitalTwin', 'glossaryTerm', 'glossary', 2, 'resources/glossary/digital-twin', 'kennisbank/begrippen/digital-twin', 'ressourcen/glossar/digitaler-zwilling', 'Digital twin', 'Digital twin', 'Digitaler Zwilling'],
  ['termMes', 'glossaryTerm', 'glossary', 2, 'resources/glossary/mes', 'kennisbank/begrippen/mes', 'ressourcen/glossar/mes', 'MES', 'MES', 'MES'],
  ['termWas', 'glossaryTerm', 'glossary', 2, 'resources/glossary/werkerassistenzsystem', 'kennisbank/begrippen/werkerassistenzsystem', 'ressourcen/glossar/werkerassistenzsystem', 'Worker assistance system', 'Werkerassistentiesysteem', 'Werkerassistenzsystem'],

  // ── Blog & guides ──
  ['blog', 'hub', 'home', 1, 'blog', 'blog', 'blog', 'Blog & guides', 'Blog en gidsen', 'Blog und Leitfäden'],
  ['blogWriteWorkInstructions', 'guide', 'blog', 1, 'blog/how-to-write-work-instructions', 'blog/werkinstructie-maken', 'blog/arbeitsanweisung-erstellen', 'How to write work instructions', 'Werkinstructie maken', 'Arbeitsanweisung erstellen'],
  ['blogWhatIsSop', 'guide', 'blog', 1, 'blog/what-is-an-sop', 'blog/wat-is-een-sop', 'blog/was-ist-eine-sop', 'What is an SOP?', 'Wat is een SOP?', 'Was ist eine SOP?'],
  ['blogSmed', 'guide', 'blog', 1, 'blog/smed-guide', 'blog/smed-omsteltijd-verkorten', 'blog/smed-ruestzeit-reduzieren', 'SMED guide', 'SMED: omsteltijd verkorten', 'SMED: Rüstzeit reduzieren'],
  ['blogConnectedWorker', 'guide', 'blog', 1, 'blog/what-is-a-connected-worker', 'blog/wat-is-een-connected-worker', 'blog/was-ist-ein-werkerassistenzsystem', 'What is a connected worker?', 'Wat is een connected worker?', 'Was ist ein Werkerassistenzsystem?'],
  ['blogHololens', 'guide', 'blog', 1, 'blog/hololens-2-alternatives', 'blog/hololens-alternatieven', 'blog/hololens-alternativen', 'HoloLens 2 alternatives', 'HoloLens-alternatieven', 'HoloLens-Alternativen'],
  ['blogSkillsMatrix', 'guide', 'blog', 2, 'blog/skills-matrix-guide', 'blog/competentiematrix-maken', 'blog/qualifikationsmatrix-erstellen', 'Skills matrix guide', 'Competentiematrix maken', 'Qualifikationsmatrix erstellen'],
  ['blogVisual', 'guide', 'blog', 2, 'blog/visual-work-instructions', 'blog/visuele-werkinstructies', 'blog/visuelle-arbeitsanweisungen', 'Visual work instructions', 'Visuele werkinstructies', 'Visuelle Arbeitsanweisungen'],
  ['blogAiSop', 'guide', 'blog', 2, 'blog/ai-sop-generator', 'blog/sop-maken-met-ai', 'blog/sop-mit-ki-erstellen', 'Creating SOPs with AI', 'SOP maken met AI', 'SOP mit KI erstellen'],
  ['blogMaintenance', 'guide', 'blog', 2, 'blog/preventive-maintenance-guide', 'blog/preventief-onderhoud', 'blog/vorbeugende-wartung', 'Preventive maintenance guide', 'Preventief onderhoud', 'Vorbeugende Wartung'],
  ['blogOnboarding', 'guide', 'blog', 2, 'blog/operator-onboarding', 'blog/inwerken-nieuwe-medewerkers-productie', 'blog/einarbeitung-neuer-mitarbeiter-produktion', 'Onboarding production staff', 'Inwerken nieuwe medewerkers productie', 'Einarbeitung neuer Mitarbeiter'],
  ['blogArManufacturing', 'guide', 'blog', 2, 'blog/ar-in-manufacturing', 'blog/augmented-reality-industrie', 'blog/augmented-reality-industrie', 'AR in manufacturing', 'Augmented reality in de industrie', 'Augmented Reality in der Industrie'],
  ['blogSmartGlasses', 'guide', 'blog', 2, 'blog/smart-glasses-industry', 'blog/smart-glasses-industrie', 'blog/datenbrillen-industrie', 'Smart glasses for industry', 'Smart glasses in de industrie', 'Datenbrillen in der Industrie'],
  ['blogKnowledgeTransfer', 'guide', 'blog', 3, 'blog/knowledge-transfer-manufacturing', 'blog/kennisoverdracht-vergrijzing', 'blog/wissenstransfer-fachkraeftemangel', 'Knowledge transfer and an ageing workforce', 'Kennisoverdracht bij vergrijzing', 'Wissenstransfer und Fachkräftemangel'],

  // ── Compare ──
  ['compare', 'hub', 'resources', 1, 'compare', 'vergelijken', 'vergleich', 'Comparisons', 'Vergelijkingen', 'Vergleiche'],
  ['cmpDigitalVsPaper', 'comparison', 'compare', 1, 'compare/digital-vs-paper-work-instructions', 'vergelijken/digitale-vs-papieren-werkinstructies', 'vergleich/digitale-vs-papier-arbeitsanweisungen', 'Digital vs paper work instructions', 'Digitale vs papieren werkinstructies', 'Digitale vs. Papier-Arbeitsanweisungen'],
  ['cmpCwpVsLms', 'comparison', 'compare', 1, 'compare/connected-worker-vs-lms', 'vergelijken/connected-worker-vs-lms', 'vergleich/werkerassistenz-vs-lms', 'Connected worker platform vs LMS', 'Connected worker platform vs LMS', 'Werkerassistenzsystem vs. LMS'],
  ['cmpVisionProHololens', 'comparison', 'compare', 1, 'compare/vision-pro-vs-hololens', 'vergelijken/vision-pro-vs-hololens', 'vergleich/vision-pro-vs-hololens', 'Apple Vision Pro vs HoloLens', 'Apple Vision Pro vs HoloLens', 'Apple Vision Pro vs. HoloLens'],
  ['cmpGlassesTablets', 'comparison', 'compare', 2, 'compare/ar-glasses-vs-tablets', 'vergelijken/ar-bril-vs-tablet', 'vergleich/ar-brille-vs-tablet', 'AR glasses vs tablets', 'AR-bril vs tablet', 'AR-Brille vs. Tablet'],
  ['cmpBestSoftware', 'comparison', 'compare', 2, 'compare/best-work-instruction-software', 'vergelijken/beste-werkinstructie-software', 'vergleich/beste-software-arbeitsanweisungen', 'Best work instruction software', 'Beste werkinstructie-software', 'Beste Software für Arbeitsanweisungen'],

  // ── Customers & partners ──
  ['customers', 'hub', 'home', 1, 'customers', 'klanten', 'kunden', 'Customer stories', 'Klantverhalen', 'Kundengeschichten'],
  ['caseMining', 'caseStudy', 'customers', 1, 'customers/mining-training-maintenance', 'klanten/mijnbouw-training-onderhoud', 'kunden/bergbau-schulung-instandhaltung', 'Mining equipment manufacturer', 'Machinebouwer in de mijnbouw', 'Bergbau-Maschinenbauer'],
  ['caseFood', 'caseStudy', 'customers', 1, 'customers/food-changeover-inspections', 'klanten/voeding-omstellen-inspecties', 'kunden/lebensmittel-umruesten-pruefungen', 'Food producer', 'Voedingsmiddelenproducent', 'Lebensmittelhersteller'],
  ['casePharma', 'caseStudy', 'customers', 2, 'customers/pharma-training-changeover', 'klanten/farma-training-omstellen', 'kunden/pharma-schulung-umruesten', 'Pharmaceutical company', 'Farmaceutisch bedrijf', 'Pharmaunternehmen'],
  ['caseTransport', 'caseStudy', 'customers', 2, 'customers/transport-maintenance-traceability', 'klanten/transport-onderhoud-traceerbaarheid', 'kunden/transport-wartung-rueckverfolgbarkeit', 'Transport operator', 'Transportbedrijf', 'Verkehrsbetrieb'],
  ['partners', 'hub', 'home', 1, 'partners', 'partners', 'partner', 'Partners', 'Partners', 'Partner'],
  ['partnerDeepsight', 'partner', 'partners', 1, 'partners/deepsight', 'partners/deepsight', 'partner/deepsight', 'DeepSight', 'DeepSight', 'DeepSight'],
  ['partnerPotentify', 'partner', 'partners', 1, 'partners/potentify', 'partners/potentify', 'partner/potentify', 'Potentify', 'Potentify', 'Potentify'],
  ['partnerSimplyChange', 'partner', 'partners', 1, 'partners/simply-change', 'partners/simply-change', 'partner/simply-change', 'Simply Change', 'Simply Change', 'Simply Change'],
  ['partnerBecome', 'contact', 'partners', 1, 'partners/become-a-partner', 'partners/partner-worden', 'partner/partner-werden', 'Become a partner', 'Partner worden', 'Partner werden'],

  // ── Conversion ──
  ['pilot', 'pilot', 'home', 1, 'pilot', 'pilot', 'pilotprojekt', 'Pilot & approach', 'Pilot en aanpak', 'Pilotprojekt und Vorgehen'],
  ['fitCheck', 'fitCheck', 'pilot', 1, 'pilot/fit-check', 'pilot/fitcheck', 'pilotprojekt/check', 'Pilot fit check', 'Pilot-fitcheck', 'Pilot-Check'],
  ['demo', 'demo', 'home', 1, 'demo', 'demo', 'demo', 'Book a demo', 'Demo plannen', 'Demo vereinbaren'],
  ['contact', 'contact', 'home', 1, 'contact', 'contact', 'kontakt', 'Contact', 'Contact', 'Kontakt'],

  // ── Company & legal ──
  ['company', 'company', 'home', 1, 'company', 'over-ons', 'unternehmen', 'About ActARion', 'Over ActARion', 'Über ActARion'],
  ['vision', 'company', 'company', 1, 'company/vision', 'over-ons/visie', 'unternehmen/vision', 'Vision', 'Visie', 'Vision'],
  ['team', 'team', 'company', 1, 'company/team', 'over-ons/team', 'unternehmen/team', 'Team', 'Team', 'Team'],
  ['careers', 'careers', 'company', 1, 'company/careers', 'over-ons/vacatures', 'unternehmen/karriere', 'Careers', 'Vacatures', 'Karriere'],
  ['news', 'media', 'company', 1, 'company/news', 'over-ons/nieuws', 'unternehmen/news', 'News & press', 'Nieuws en pers', 'News und Presse'],
  ['faq', 'faq', 'home', 1, 'faq', 'veelgestelde-vragen', 'faq', 'FAQ', 'Veelgestelde vragen', 'Häufige Fragen'],
  ['privacy', 'legal', 'home', 1, 'privacy', 'privacy', 'datenschutz', 'Privacy policy', 'Privacyverklaring', 'Datenschutzerklärung'],
  ['terms', 'legal', 'home', 1, 'terms', 'voorwaarden', 'agb', 'Terms and conditions', 'Algemene voorwaarden', 'AGB'],
  ['imprint', 'legal', 'home', 1, 'legal-notice', 'colofon', 'impressum', 'Legal notice', 'Colofon', 'Impressum'],
  ['sitemap', 'sitemap', 'home', 1, 'sitemap', 'sitemap', 'sitemap', 'Sitemap', 'Sitemap', 'Sitemap'],
];
