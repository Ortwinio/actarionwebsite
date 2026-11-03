import type { PageContent, UiStrings } from './types';
import type { RouteKey } from '@/lib/routes';

/*
 * DRAFT CONTENT — template preview.
 * Copy is a first draft to show each page type working. Figures marked as
 * examples must be replaced by verified customer data before go-live.
 */

export const ui: UiStrings = {
  langName: 'English',
  skip: 'Skip to content',
  menu: 'Menu',
  close: 'Close',
  nav: {
    platform: 'Platform',
    useCases: 'Use cases',
    industries: 'Industries',
    resources: 'Resources',
    customers: 'Customers',
    roi: 'ROI calculator',
    blog: 'Blog',
  },
  placeholderNote: 'Draft: this page contains placeholder content that will be replaced.',
  imagePending: 'Image to follow',
  searchLabel: 'Search resources',
  searchPlaceholder: 'Search templates, guides, terms…',
  allPages: 'All pages',
  az: 'A–Z',
  nav2: { solutions: 'Solutions', hardware: 'Hardware', company: 'Company', partners: 'Partners', legal: 'Legal' },
  ctaPilot: 'Request a pilot',
  ctaRoi: 'Calculate your ROI',
  ctaDemo: 'Book a demo',
  breadcrumbHome: 'Home',
  updated: 'Last updated',
  answerLabel: 'In short',
  onThisPage: 'On this page',
  faqTitle: 'Frequently asked questions',
  relatedTitle: 'Related',
  readMore: 'Read more',
  download: 'Download the template',
  downloadNote: 'Free. We send the file to your inbox. No spam, unsubscribe anytime.',
  emailLabel: 'Work email',
  emailPlaceholder: 'name@company.com',
  nameLabel: 'Name',
  companyLabel: 'Company',
  messageLabel: 'What process do you want to improve?',
  submit: 'Send request',
  formNote: 'We reply within one working day. Your data is only used to handle this request.',
  before: 'Before',
  after: 'After',
  definition: 'Definition',
  footer: {
    tagline: 'AI and AR-guided work instructions for frontline teams in Europe.',
    company: 'Company',
    about: 'About us',
    contact: 'Contact',
    career: 'Careers',
    partners: 'Partners',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved.',
    language: 'Language',
  },
  roi: {
    title: 'Quick estimate: changeovers',
    operators: 'Changeovers per week',
    changeovers: 'Changeovers per week',
    minutes: 'Average changeover time (min)',
    reduction: 'Expected reduction',
    rate: 'Cost per production hour (€)',
    result: 'Estimated yearly saving',
    hours: 'production hours regained per year',
    perYear: 'per year',
    full: 'Open the full ROI calculator',
    disclaimer: 'Indicative estimate based on 46 production weeks. The full calculator covers five use cases, payback period and a PDF report.',
  },
  stats: [
    { n: '3', l: 'languages: English, Dutch, German' },
    { n: '5', l: 'proven use cases on the shop floor' },
    { n: '6–8 wk', l: 'typical pilot with clear KPIs' },
    { n: 'Any', l: 'device: tablet, phone or smart glasses' },
  ],
  checks: ['Hardware-independent', 'EU-hosted', 'Powered by DeepSight'],
  worksWith: 'Works with',
};

export const pages: Record<RouteKey, Partial<PageContent>> = {
  home: {
    metaTitle: 'Digital Work Instructions with AI & AR | ActARion',
    metaDescription:
      'ActARion turns SOPs into AI and AR-guided work instructions. Shorter changeovers, fewer errors and faster onboarding for frontline teams.',
    label: 'Home',
    eyebrow: 'AI & AR work instructions',
    h1: 'Every operator works like your best expert.',
    lead: 'ActARion turns your SOPs into step-by-step guidance on tablet, phone or smart glasses. Shorter changeovers, fewer errors and new operators productive in days.',
    answer:
      'ActARion is a European platform for digital work instructions guided by AI and augmented reality. Manufacturers use it to standardise changeovers, assembly, maintenance and training, so frontline workers follow the right steps every time on any device.',
    updated: '2026-11-03',
    related: ['solDwi', 'useCases', 'roiCalculator'],
  },

  solDwi: {
    metaTitle: 'Digital Work Instructions: Guide, Benefits & Software | ActARion',
    metaDescription:
      'What digital work instructions are, how they compare to paper SOPs and how AI and AR make them faster to create and easier to follow.',
    label: 'Digital work instructions',
    eyebrow: 'Solution',
    h1: 'Digital work instructions with AI and AR',
    lead: 'Replace paper SOPs with visual, step-by-step guidance that operators actually use, and that stays up to date.',
    answer:
      'Digital work instructions are step-by-step procedures shown on a screen or headset instead of paper. They combine text, photos, video and 3D/AR overlays, record each completed step and are updated centrally, which reduces errors, shortens training and gives an audit trail.',
    cardText: 'The complete guide to digital work instructions and how AI and AR improve them.',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'text',
        id: 'what',
        h2: 'What are digital work instructions?',
        body: [
          'A digital work instruction is a procedure broken down into small, visual steps that an operator follows on a tablet, phone or smart glasses. Each step shows exactly what to do, with the right tool, part and quality check.',
          'Because instructions are managed centrally, a change is published once and every station uses the new version immediately.',
        ],
      },
      {
        kind: 'features',
        id: 'benefits',
        h2: 'Benefits for frontline teams',
        items: [
          { title: 'Fewer errors', text: 'Mandatory checks and visual guidance prevent skipped steps and wrong parts.' },
          { title: 'Faster onboarding', text: 'New operators learn on the job instead of shadowing an expert for weeks.' },
          { title: 'Shorter changeovers', text: 'Standardised SMED sequences remove waiting and searching.' },
          { title: 'Audit-ready', text: 'Every completed step is logged with time, user and evidence photo.' },
        ],
      },
      {
        kind: 'steps',
        id: 'how',
        h2: 'How ActARion works',
        steps: [
          { title: 'Capture', text: 'Record the expert doing the task with photos or video.' },
          { title: 'Generate', text: 'AI turns the recording into structured steps in three languages.' },
          { title: 'Guide', text: 'Operators follow the steps on any device, with AR where it helps.' },
          { title: 'Improve', text: 'Step timings and feedback show where the process can be improved.' },
        ],
      },
    ],
    faq: [
      { q: 'Do I need smart glasses?', a: 'No. ActARion runs on tablets and phones; smart glasses are optional for hands-free work.' },
      { q: 'Can we import our existing SOPs?', a: 'Yes. Existing Word or PDF procedures can be imported and converted into steps with AI.' },
      { q: 'Which languages are supported?', a: 'Instructions can be generated and maintained in English, Dutch and German, plus other languages on request.' },
    ],
    related: ['cmpDigitalVsPaper', 'blogWriteWorkInstructions', 'tplWorkInstruction'],
  },

  useCases: {
    metaTitle: 'Use Cases for AI & AR Work Instructions | ActARion',
    metaDescription:
      'How manufacturers use ActARion for changeovers, assembly, maintenance, training and remote support, with the KPIs that matter for each.',
    label: 'Use cases',
    eyebrow: 'Use cases',
    h1: 'Where guided work pays off first',
    lead: 'Start with one process where errors, downtime or training time hurt most. These are the use cases with the fastest payback.',
    answer:
      'The fastest returns from digital work instructions come from changeovers (SMED), complex assembly, preventive maintenance, onboarding of new operators and remote expert support. Each targets a measurable KPI such as changeover minutes, first-pass yield or time-to-competence.',
    updated: '2026-11-03',
  },
  ucChangeover: {
    metaTitle: 'AR-Guided Changeovers & SMED | ActARion',
    metaDescription:
      'Cut changeover time with AR-guided SMED procedures. Standardise every changeover across shifts and lines and measure each step.',
    label: 'Changeovers (SMED)',
    eyebrow: 'Use case',
    h1: 'Shorter changeovers, every shift',
    lead: 'Guide operators through each changeover with a standardised SMED sequence, so the fastest way becomes the normal way.',
    answer:
      'AR-guided changeovers show operators each SMED step in the right order, separating internal and external tasks and checking settings before restart. Plants typically use them to reduce changeover time variance between shifts and to train new operators on changeovers without an expert present.',
    cardText: 'Standardise SMED sequences across shifts and lines.',
    kpi: 'Changeover time',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'features',
        h2: 'The problem',
        items: [
          { title: 'Variance between shifts', text: 'The same changeover takes 25 minutes on one shift and 50 on the next.' },
          { title: 'Expert dependency', text: 'Only a few people know the fast sequence by heart.' },
          { title: 'Restart losses', text: 'Wrong settings are discovered only after the first bad parts.' },
        ],
      },
      {
        kind: 'steps',
        h2: 'How it works',
        steps: [
          { title: 'Map the changeover', text: 'Record the best performer and split internal and external steps.' },
          { title: 'Guide each step', text: 'Operators get visual steps with mandatory checks on critical settings.' },
          { title: 'Measure', text: 'Step times per shift show where minutes are lost.' },
        ],
      },
    ],
    faq: [
      { q: 'How long does it take to digitise a changeover?', a: 'A typical changeover is captured and published within one to two days.' },
    ],
    related: ['termSmed', 'caseFood', 'roiCalculator'],
  },
  ucOnboarding: {
    metaTitle: 'AR Training & Onboarding for Operators | ActARion',
    metaDescription:
      'Get new operators productive in days with AR-guided training on the job. Track skills and certifications per workstation.',
    label: 'Training & onboarding',
    eyebrow: 'Use case',
    h1: 'New operators productive in days, not weeks',
    lead: 'Train on the job with guided instructions instead of weeks of shadowing an expert.',
    answer:
      'AR-guided onboarding lets new operators learn a task by doing it with step-by-step visual guidance. It reduces the time experts spend shadowing, makes training consistent across sites and records which operator is qualified for which workstation.',
    cardText: 'Train on the job and track skills per workstation.',
    kpi: 'Time to competence',
    updated: '2026-11-03',
    related: ['solDwi', 'roiCalculator'],
  },

  industries: {
    metaTitle: 'Industries: Digital Work Instructions by Sector | ActARion',
    metaDescription:
      'Digital work instructions for pharma, manufacturing, energy, aerospace, food and field service: sector-specific use cases and compliance.',
    label: 'Industries',
    eyebrow: 'Industries',
    h1: 'Built for regulated, high-mix operations',
    lead: 'Each industry has its own compliance rules and critical processes. Find yours.',
    updated: '2026-11-03',
  },
  indPharma: {
    metaTitle: 'Digital Work Instructions for Pharma & GMP | ActARion',
    metaDescription:
      'GMP-compliant digital work instructions for pharma: batch preparation, line clearance and cleaning with full audit trail.',
    label: 'Pharma',
    eyebrow: 'Industry',
    h1: 'Digital work instructions for pharma',
    lead: 'Right-first-time batch preparation, line clearance and cleaning, with an audit trail inspectors can follow.',
    answer:
      'In pharma, digital work instructions support GMP by enforcing the approved procedure version, capturing each completed step with user and timestamp, and requiring evidence photos at critical points. This reduces deviations during batch preparation, line clearance and cleaning.',
    cardText: 'GMP-ready batch preparation, line clearance and cleaning.',
    kpi: 'Deviations',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'checklist',
        h2: 'Typical processes',
        items: ['Batch preparation and weighing', 'Line clearance', 'Cleaning and changeover', 'Equipment qualification', 'Operator training records'],
      },
    ],
    related: ['ucChangeover', 'ucOnboarding'],
  },

  resources: {
    metaTitle: 'Resources: Templates, Guides & Glossary | ActARion',
    metaDescription:
      'Free work instruction templates, SMED checklists, how-to guides and a glossary of connected worker terms.',
    label: 'Resources',
    eyebrow: 'Resources',
    h1: 'Templates, guides and answers',
    lead: 'Practical material to improve work instructions, whether you use ActARion or not.',
    updated: '2026-11-03',
  },
  tplWorkInstruction: {
    metaTitle: 'Free Work Instruction Template (Word & PDF) | ActARion',
    metaDescription:
      'Download a free work instruction template with example steps, safety checks and sign-off. Word and PDF, ready to use.',
    label: 'Work instruction template',
    eyebrow: 'Template',
    h1: 'Free work instruction template',
    lead: 'A clear, field-tested format for any procedure: steps, tools, safety checks and sign-off.',
    answer:
      'A good work instruction template contains a title and scope, required tools and materials, safety warnings, numbered steps with one action each, a visual per step, quality checks and a revision block. This template includes all of them in Word and PDF format.',
    cardText: 'Word and PDF template with example steps and safety checks.',
    kpi: 'Template',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'checklist',
        h2: "What's in the template",
        items: ['Title, scope and owner', 'Tools, parts and PPE', 'Numbered steps with one action each', 'Photo placeholder per step', 'Quality and safety checks', 'Revision history and sign-off'],
      },
    ],
    related: ['blogWriteWorkInstructions', 'solDwi'],
  },
  blogWriteWorkInstructions: {
    metaTitle: 'How to Write Work Instructions: 7 Steps + Examples | ActARion',
    metaDescription:
      'Write clear work instructions in 7 steps: scope, audience, one action per step, visuals, checks, testing and version control.',
    label: 'How to write work instructions',
    eyebrow: 'Guide',
    h1: 'How to write work instructions operators actually follow',
    lead: 'Seven steps to clear, visual instructions, with examples from the shop floor.',
    answer:
      'To write effective work instructions, define the scope and audience, break the task into steps with one action each, add a visual to every step, mark safety and quality checks, test the instruction with a new operator and manage versions centrally.',
    cardText: 'Seven steps to clear, visual instructions.',
    kpi: 'Guide',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'steps',
        id: 'steps',
        h2: 'The 7 steps',
        steps: [
          { title: 'Define scope and audience', text: 'Who performs the task and at what skill level?' },
          { title: 'Observe the best performer', text: 'Record how the expert actually does the job.' },
          { title: 'One action per step', text: 'Start each step with a verb and keep it short.' },
          { title: 'Add a visual to every step', text: 'A photo or short clip beats a paragraph of text.' },
          { title: 'Mark checks', text: 'Highlight safety warnings and quality checkpoints.' },
          { title: 'Test with a new operator', text: 'If they hesitate, the step is not clear yet.' },
          { title: 'Control versions', text: 'Publish centrally so everyone uses the latest version.' },
        ],
      },
    ],
    faq: [{ q: 'How long should a work instruction be?', a: 'As short as possible: most tasks fit in 8 to 20 steps. Split longer procedures into sub-tasks.' }],
    related: ['tplWorkInstruction', 'cmpDigitalVsPaper'],
  },
  glossary: {
    metaTitle: 'Glossary: Connected Worker & Lean Terms Explained | ActARion',
    metaDescription: 'Short definitions of SMED, OEE, SOP, connected worker and other manufacturing terms.',
    label: 'Glossary',
    eyebrow: 'Glossary',
    h1: 'Glossary',
    lead: 'Plain-language definitions of the terms used around digital work instructions and lean manufacturing.',
    updated: '2026-11-03',
  },
  termSmed: {
    metaTitle: 'What is SMED? Definition & Example | ActARion',
    metaDescription: 'SMED (Single-Minute Exchange of Die) is a lean method to reduce changeover time. Definition, steps and an example.',
    label: 'SMED',
    eyebrow: 'Glossary',
    h1: 'What is SMED?',
    lead: 'Single-Minute Exchange of Die, explained.',
    definition:
      'SMED (Single-Minute Exchange of Die) is a lean manufacturing method for reducing changeover time by converting internal setup steps, done while the machine is stopped, into external steps done while it is still running, and by streamlining the remaining steps.',
    cardText: 'Lean method to reduce changeover time.',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'steps',
        h2: 'The SMED steps',
        steps: [
          { title: 'Separate', text: 'Split internal and external setup activities.' },
          { title: 'Convert', text: 'Move internal activities to external where possible.' },
          { title: 'Streamline', text: 'Simplify and standardise all remaining steps.' },
        ],
      },
    ],
    related: ['ucChangeover', 'caseFood'],
  },
  cmpDigitalVsPaper: {
    metaTitle: 'Digital vs Paper Work Instructions: Comparison | ActARion',
    metaDescription: 'Digital vs paper work instructions compared on errors, updates, training, compliance and cost.',
    label: 'Digital vs paper',
    eyebrow: 'Comparison',
    h1: 'Digital vs paper work instructions',
    lead: 'An honest comparison to decide when paper is enough and when digital pays off.',
    answer:
      'Paper work instructions are cheap to start but hard to keep current and give no record of execution. Digital work instructions cost more upfront, but are updated centrally, include visuals and checks, and log every step, which pays off for complex, variable or regulated processes.',
    cardText: 'When paper is enough and when digital pays off.',
    kpi: 'Comparison',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'table',
        h2: 'Side by side',
        head: ['Criterion', 'Paper', 'Digital (ActARion)'],
        rows: [
          ['Keeping versions current', 'Manual reprint per station', 'Published once, live everywhere'],
          ['Visual guidance', 'Static photos', 'Photo, video, 3D and AR'],
          ['Proof of execution', 'Signature at the end', 'Every step logged'],
          ['Languages', 'One version per language', 'Generated per user language'],
          ['Upfront cost', 'Low', 'Subscription'],
        ],
      },
    ],
    related: ['solDwi', 'roiCalculator'],
  },

  customers: {
    metaTitle: 'Customer Stories & Results | ActARion',
    metaDescription: 'How manufacturers use ActARion to reduce changeover time, errors and training time, with measured results.',
    label: 'Customers',
    eyebrow: 'Customers',
    h1: 'Results from the shop floor',
    lead: 'Measured before and after, so you know what to expect.',
    updated: '2026-11-03',
  },
  caseFood: {
    placeholder: true,
    metaTitle: 'Case: Shorter Changeovers with AR Guidance | ActARion',
    metaDescription: 'How a manufacturer standardised changeovers across shifts with AR-guided SMED instructions.',
    label: 'Shorter changeovers',
    eyebrow: 'Customer story · example',
    h1: 'Changeover time down, variance between shifts gone',
    lead: 'Example case to show the template. Replace with verified customer data before go-live.',
    answer:
      'This example shows how a packaging line standardised its changeovers with AR-guided SMED instructions: the best-performing sequence was captured, every shift followed the same steps, and step timings revealed where minutes were lost.',
    cardText: 'Standardised SMED across three shifts.',
    kpi: 'Example case',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'kpis',
        h2: 'Results',
        rows: [
          { k: 'Changeover time', before: '[xx] min', after: '[xx] min' },
          { k: 'Variance between shifts', before: '[xx] min', after: '[xx] min' },
          { k: 'Training time', before: '[xx] days', after: '[xx] days' },
        ],
        note: 'Placeholders: to be filled with measured customer figures.',
      },
      { kind: 'text', h2: 'The challenge', body: ['[Describe the starting situation, the line and why changeovers were a problem.]'] },
      { kind: 'text', h2: 'The approach', body: ['[Describe the pilot scope, timeline and how operators were involved.]'] },
    ],
    related: ['ucChangeover', 'roiCalculator'],
  },

  roiCalculator: {
    metaTitle: 'ROI Calculator for AI & AR Work Instructions | ActARion',
    metaDescription:
      'Calculate the payback of digital work instructions for changeovers, assembly, maintenance, training and remote support.',
    label: 'ROI calculator',
    eyebrow: 'ROI calculator',
    h1: 'What would guided work save your plant?',
    lead: 'Estimate the yearly saving in two minutes, then build the full business case with payback period and a PDF report.',
    answer:
      'The ActARion ROI calculator estimates the yearly saving of AI and AR-guided work instructions from your own figures: number of changeovers or tasks, current duration, cost per production hour and expected reduction. It then calculates payback period and ROI per use case.',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'steps',
        id: 'method',
        h2: 'How the calculation works',
        steps: [
          { title: 'Choose a use case', text: 'Changeovers, assembly, maintenance, training or remote support.' },
          { title: 'Enter your baseline', text: 'Volumes, durations and costs from your own operation.' },
          { title: 'Apply a reduction', text: 'Conservative ranges based on pilot results, adjustable by you.' },
          { title: 'Get payback and ROI', text: 'Yearly saving, payback period and a PDF to share internally.' },
        ],
      },
    ],
    faq: [
      { q: 'Which assumptions does the calculator use?', a: 'Default reductions are conservative ranges per use case. You can override every assumption.' },
      { q: 'Is my data stored?', a: 'Only if you request the PDF report; then we store your inputs to send and discuss the report.' },
    ],
    related: ['caseFood', 'pilot'],
  },
  pilot: {
    metaTitle: 'Request a Pilot for AR Work Instructions | ActARion',
    metaDescription: 'Start a 6–8 week pilot with clear KPIs on one process. Tell us which process you want to improve.',
    label: 'Request a pilot',
    eyebrow: 'Pilot',
    h1: 'Prove it on one process first',
    lead: 'A 6–8 week pilot on one line or process, with KPIs agreed upfront and measured at the end.',
    updated: '2026-11-03',
    sections: [
      {
        kind: 'steps',
        h2: 'How a pilot runs',
        steps: [
          { title: 'Intake', text: 'We pick the process and agree on baseline KPIs.' },
          { title: 'Capture', text: 'Instructions are captured with your experts in 1–2 days.' },
          { title: 'Run', text: 'Operators work with the instructions for 4–6 weeks.' },
          { title: 'Evaluate', text: 'We measure the KPIs and decide on scaling together.' },
        ],
      },
    ],
  },
};
