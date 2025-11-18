export interface FAQListBlock {
  title?: string;
  items: string[];
  ordered?: boolean;
}

export interface FAQAnswer {
  paragraphs?: string[];
  lists?: FAQListBlock[];
}

export interface FAQEntry {
  question: string;
  answer: FAQAnswer;
}

export interface FAQSectionContent {
  id: string;
  title: string;
  items: FAQEntry[];
}

export const faqSections: FAQSectionContent[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      {
        question: 'What does ActARion actually do?',
        answer: {
          paragraphs: [
            'ActARion helps industrial, logistics and energy companies make work instructions, training and troubleshooting more digital, visual and data-driven.',
            'Together with partner DeepSight we implement an AR-first knowledge and connected-worker platform. Experts create step-by-step instructions, training scenarios and troubleshooting guides in a no-code editor and publish them to mobile devices and smart glasses.',
            'Technicians and field teams get clear, visual support at the moment they need it.',
          ],
        },
      },
      {
        question: 'Why are organisations choosing AR and AI-guided solutions?',
        answer: {
          lists: [
            {
              title: 'Many organisations are dealing with:',
              items: [
                'Growing complexity of machines and processes',
                'Shortage of experienced people',
                'Rising safety and compliance requirements',
                'High cost of mistakes and unplanned downtime',
              ],
            },
            {
              title: 'AR and AI-guided solutions help because they:',
              items: [
                'Bring instructions into the real environment instead of binders or PDFs',
                'Use visuals, 3D and short clips instead of long text',
                'Guide people step by step, hands-free if needed',
                'Capture data during each task (time, photos, answers, checks) for improvement',
              ],
            },
          ],
          paragraphs: [
            'AI also helps turn expert knowledge into multilingual work instructions much faster, so you can standardise best practices without long documentation projects.',
          ],
        },
      },
      {
        question: 'How is this different from traditional work instructions or an LMS?',
        answer: {
          lists: [
            {
              title: 'Traditional manuals and LMS modules:',
              items: [
                'Are often static and hard to keep up to date',
                'Live outside the workplace (SharePoint, PDFs, classroom)',
                'Are not linked to actual execution on the line or in the field',
              ],
            },
            {
              title: 'With ActARion and DeepSight:',
              items: [
                'Instructions are shown in context, on the machine or at the work location',
                'Content is created in a web-based no-code authoring tool and updated in minutes',
                'Data from each execution becomes available for training, audits and improvement',
              ],
            },
          ],
          paragraphs: [
            'You move from “people trying to remember the manual” to “the right instruction appears exactly when they need it”.',
          ],
        },
      },
    ],
  },
  {
    id: 'use-cases',
    title: 'Use Cases & Tools',
    items: [
      {
        question: 'Which use cases can ActARion help us with?',
        answer: {
          paragraphs: [
            'Typical use cases include:',
            'All content is stored in a central digital library, so you keep one version of the truth instead of scattered PDFs, PowerPoints and videos.',
          ],
          lists: [
            {
              items: [
                'Onboarding and cross-training: guiding new colleagues through safety checks, basic operations and first-line maintenance.',
                'Complex or infrequent procedures: changeovers, calibrations, deep cleaning, shutdown/start-up and rare repairs.',
                'Remote expert support: connecting local teams with experts via AR assistance to solve issues faster.',
                'Troubleshooting and diagnostics: step-by-step fault trees, visual checks and data capture for root-cause analysis.',
                'Quality checks and inspections: guided checklists, photo evidence and automatic logging.',
                'Safety and compliance procedures: lock-out/tag-out, permit-to-work, PPE checks and other mandatory steps.',
              ],
            },
          ],
        },
      },
      {
        question: 'Do we need smart glasses to start?',
        answer: {
          paragraphs: [
            'No. Many organisations start on smartphones or tablets. DeepSight is cross-platform and content can be used on mobile phones, tablets and smart glasses such as HoloLens 2 or Apple Vision Pro.',
            'Smart glasses are useful when people need both hands free or work in tight or hazardous environments, but they are not a prerequisite.',
          ],
        },
      },
      {
        question: 'How does AI help in practice?',
        answer: {
          paragraphs: [
            'AI in DeepSight is used to:',
            'This reduces the time experts spend on documentation, while keeping full control over the final content.',
          ],
          lists: [
            {
              items: [
                'Speed up the creation of new work instructions from existing documents, photos or videos',
                'Generate multilingual versions of procedures',
                'Suggest structure and steps based on similar procedures',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'training',
    title: 'Training & Rollout',
    items: [
      {
        question: 'How do we keep control over quality and training?',
        answer: {
          paragraphs: [
            'Each person has a profile that shows:',
            'Managers can see where extra training is needed, which procedures cause issues, and where best practices from one site could help another.',
          ],
          lists: [
            {
              items: [
                'Which instructions they have followed',
                'Which training modules they completed',
                'Which certifications or authorisations they hold',
              ],
            },
          ],
        },
      },
      {
        question: 'How quickly can we get value from this?',
        answer: {
          paragraphs: [
            'Most customers start with a focused pilot on one or two use cases such as onboarding on a critical line, a complex changeover or a recurring quality issue.',
            'Because the authoring tool is no-code and web-based, teams can create and adjust content quickly. ActARion supports the first months to help embed the new way of working.',
          ],
          lists: [
            {
              items: [
                'Onboarding on a critical line',
                'A complex changeover',
                'A recurring quality issue',
              ],
            },
          ],
        },
      },
      {
        question: 'How does ActARion support implementation?',
        answer: {
          paragraphs: [
            'We typically work in three steps:',
            'Throughout the process we help organisations build their own capability to create and maintain content.',
          ],
          lists: [
            {
              ordered: true,
              items: [
                'Discovery – map current training and work processes, main pain points and quick wins.',
                'Pilot – select a few high-impact use cases, implement DeepSight, create AR/AI-guided instructions and measure impact on errors, training time and downtime.',
                'Scale-up – expand to more lines, sites or processes and integrate with existing systems while building internal capability.',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'next-steps',
    title: 'Next Steps',
    items: [
      {
        question: 'How can we explore whether this makes sense for our organisation?',
        answer: {
          paragraphs: [
            'The simplest next step is a short discovery call or workshop where we walk through current training and work instructions, identify 2–3 high-impact use cases and show how similar organisations use AR and AI-guided instructions today.',
            'From there we jointly decide whether to move into a pilot or map additional requirements.',
          ],
        },
      },
    ],
  },
];
