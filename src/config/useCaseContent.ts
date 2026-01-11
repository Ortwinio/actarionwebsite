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

export interface RelatedBlogPost {
  title: string;
  slug: string;
}

export interface UseCaseContent {
  heroTitle: string;
  heroParagraphs: string[];
  sections: UseCaseSectionContent[];
  relatedBlogPosts?: RelatedBlogPost[];
}

type UseCaseContentBySlug = Record<UseCaseSlug, UseCaseContent>;

const enContent: UseCaseContentBySlug = {
  "ar-work-instructions-corporate-memory": {
    heroTitle: "AR work instructions and SOPs to preserve corporate memory",
    heroParagraphs: [
      "When experienced experts leave your organisation, they often take years of tacit knowledge with them. Work instructions are spread across binders, notebooks and ad hoc fixes on the work floor. That makes it hard for new operators to learn fast and to execute work instructions consistently and safely.",
      "With AR SOPs and AI and AR–guided digital work instructions from ActARion and DeepSight, you capture expert knowledge once and turn it into reusable, visual work instructions that any operator can follow. This transforms tribal knowledge into a scalable, standardised asset that protects your operations for years to come.",
    ],
    sections: [
      {
        title: "The problem: knowledge loss and inconsistent SOPs",
        blocks: [
          {
            type: "paragraph",
            content:
              "Across manufacturing, energy, pharma and logistics, organisations face a silent crisis. Experienced operators and technicians—the people who truly understand how things work—are retiring, changing roles or leaving the industry. When they go, they take decades of practical knowledge that was never fully documented.",
          },
          {
            type: "unorderedList",
            items: [
              "Experts have deep, often undocumented process knowledge built up over decades of hands-on experience",
              "Procedures are fragmented across paper SOPs, PDFs, personal notebooks and informal workarounds",
              "New employees depend on shadowing and informal coaching, which varies by trainer and shift",
              "Audit findings reveal inconsistent execution, avoidable errors and quality issues that trace back to unclear or outdated SOPs",
              "Safety risks increase when critical steps are skipped or performed incorrectly due to knowledge gaps",
            ],
          },
          {
            type: "paragraph",
            content:
              "The result is not just slower onboarding. It is higher error rates, more rework, increased safety incidents and a growing compliance burden. Traditional documentation simply cannot keep up with the pace of change or capture the nuances of expert work.",
          },
        ],
      },
      {
        title: "How AI and AR–guided work instructions solve this",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR work instructions and AR SOPs offer a fundamentally different approach. Instead of writing procedures from memory or observation, you capture expert knowledge directly as it happens—on the shop floor, at the machine, in the real work environment. The combination of AI and AR technology transforms how knowledge is created, stored and shared.",
          },
          {
            type: "orderedList",
            items: [
              "A manager or process owner identifies a critical procedure that must be captured and standardised.",
              "The expert wears smart glasses or uses a tablet or smartphone and performs the task step by step in the real work environment.",
              "The AR SOP system records the actions, automatically structures the steps and adds images, video or 3D annotations.",
              "The expert enriches the AR SOP with voice notes, warnings, tips, best practices and safety reminders.",
              "AI assists by suggesting structure, detecting missing steps and enabling instant translation into multiple languages.",
              "The AR SOP is stored in a central digital library as the single source of truth, accessible from any device.",
            ],
          },
          {
            type: "paragraph",
            content:
              "From that moment, any operator can open the AR SOP on an AR device and follow the same procedure, guided directly in their field of view. Digital work instructions adapt to the user's language, experience level and specific equipment variant. Updates are pushed instantly to all users, eliminating version control headaches.",
          },
        ],
      },
      {
        title: "Who is this for?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR work instructions and AR SOPs for preserving corporate memory are relevant for a range of roles across industrial organisations:",
          },
          {
            type: "unorderedList",
            items: [
              "Operations managers who need to maintain consistent output quality even as workforce composition changes",
              "Maintenance managers responsible for ensuring technicians can perform complex procedures correctly, regardless of experience level",
              "HR and L&D leaders tasked with reducing onboarding time and ensuring new hires reach productivity faster",
              "HSE managers focused on reducing safety incidents caused by knowledge gaps or procedural errors",
              "Quality managers who must demonstrate standardised execution and audit-ready documentation",
              "Plant managers and site directors looking to protect operational continuity as experienced staff retire or transfer",
            ],
          },
        ],
      },
      {
        title: "Where is this used?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR SOPs and digital work instructions to preserve corporate memory are deployed across a wide range of industries and environments:",
          },
          {
            type: "unorderedList",
            items: [
              "Food and beverage manufacturing, where batch consistency, hygiene protocols and audit readiness depend on standardised procedures that are easy to follow and update",
              "Pharmaceutical and life sciences, where GMP compliance requires documented, validated SOPs with full traceability and version control",
              "Logistics and warehousing, where picking, packing and loading procedures benefit from visual guidance to reduce errors and speed up onboarding",
              "Energy and utilities, where field technicians perform complex inspections, maintenance and safety procedures in remote or hazardous environments",
              "Aerospace and defence, where zero-defect assembly and strict regulatory compliance demand precise, repeatable work instructions",
              "Industrial equipment and machinery, where setup, changeover and troubleshooting procedures must be captured before expert technicians retire",
            ],
          },
        ],
      },
      {
        title: "Typical process and workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR work instructions to preserve corporate memory typically follows a structured workflow:",
          },
          {
            type: "orderedList",
            items: [
              "Identify critical procedures: Work with operations, maintenance and quality teams to list procedures where knowledge loss poses the greatest risk.",
              "Prioritise and plan: Select the first procedures to digitise based on impact, complexity and expert availability. Define success criteria and KPIs.",
              "Capture expert knowledge: Equip experts with AR devices. Record their execution of each procedure, capturing video, images, voice notes and annotations.",
              "Structure and enrich content: Use the AR SOP platform to organise steps, add warnings, tips and quality checkpoints. Leverage AI to assist with translation and gap detection.",
              "Validate and publish: Review the AR SOP with process owners, trainers and operators. Approve and publish to the digital library.",
              "Train and deploy: Roll out AR work instructions to frontline teams. Provide brief onboarding on device usage and navigation.",
              "Continuously improve: Monitor usage data, collect feedback and update AR SOPs as processes evolve. Build a growing library of standardised procedures.",
            ],
          },
        ],
      },
      {
        title: "Concrete examples and mini-scenarios",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR work instructions and AR SOPs for preserving corporate memory deliver value in many real-world scenarios:",
          },
          {
            type: "paragraph",
            content:
              "Scenario 1: Changeover in a packaging line. A food manufacturer relies on two senior operators who know how to reconfigure the line for different products. When one retires, changeover times double and errors spike. With AR SOPs, the remaining expert records each changeover variant step by step. New operators follow the AR-guided procedure on tablets, reducing changeover time back to baseline and eliminating configuration errors.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 2: Batch setup in a pharma plant. A pharmaceutical company faces an FDA audit and must demonstrate consistent SOP execution. Using AR work instructions, batch setup procedures are digitised with built-in validation checkpoints. Operators confirm each step on their AR device, and the system logs completion with timestamps and photos. Auditors receive clear, traceable evidence of compliant execution.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 3: Preventive inspection in an energy facility. A utility company struggles to onboard new technicians for complex turbine inspections. The outgoing expert uses smart glasses to record the inspection process, highlighting hidden check points and common failure modes. New technicians follow the AR SOP in the field, reducing inspection time by 30% and catching issues that were previously missed.",
          },
        ],
      },
      {
        title: "Getting started with AR work instructions for this use case",
        blocks: [
          {
            type: "paragraph",
            content:
              "If you are considering AR SOPs and digital work instructions to preserve corporate memory, here is practical guidance to get started:",
          },
          {
            type: "unorderedList",
            items: [
              "Prerequisites: Identify the procedures where knowledge loss is most critical. Ensure you have access to experts willing to participate in the capture process.",
              "Pilot scope: Start with 3–5 high-impact procedures. Choose a mix of complexity levels to learn what works best for your teams.",
              "KPIs to track: Onboarding time, First Time Right rate, SOP creation speed, number of procedures digitised, audit findings related to procedural inconsistency.",
              "Devices: AR SOPs can run on smart glasses, tablets or smartphones. Start with the devices your teams already use, then consider smart glasses for hands-free scenarios.",
              "Change management: Involve frontline operators and supervisors early. Demonstrate quick wins and provide support during the transition.",
            ],
          },
        ],
      },
      {
        title: "FAQ: AR work instructions and SOPs to preserve corporate memory",
        blocks: [
          {
            type: "paragraph",
            content:
              "What types of procedures benefit most from AR work instructions? Procedures that are complex, safety-critical or rely on tacit knowledge benefit most. Examples include changeovers, inspections, maintenance routines and batch setups.",
          },
          {
            type: "paragraph",
            content:
              "How long does it take to create an AR SOP from an existing paper SOP? With modern AR SOP platforms, an expert can capture a procedure in roughly the same time it takes to perform it. AI-assisted structuring further speeds up content creation. Most organisations see 5–10x faster SOP creation compared to traditional documentation.",
          },
          {
            type: "paragraph",
            content:
              "Do operators need previous AR experience? No. AR work instructions are designed for intuitive use. Most operators are comfortable after a brief introduction of 10–15 minutes.",
          },
          {
            type: "paragraph",
            content:
              "Can AR SOPs be updated as processes change? Yes. Digital work instructions can be edited and republished instantly. All users see the latest version without manual distribution.",
          },
          {
            type: "paragraph",
            content:
              "How does this support audit and compliance? AR SOPs provide a clear, traceable record of procedure execution, including timestamps, photos and operator confirmations. This supports internal audits, customer audits and regulatory inspections.",
          },
        ],
      },
      {
        title: "Next steps",
        blocks: [
          {
            type: "paragraph",
            content:
              "Ready to protect your corporate memory with AR work instructions and AR SOPs? ActARion helps industrial organisations capture, standardise and share expert knowledge at scale. Whether you are facing upcoming retirements, rapid workforce growth or compliance pressure, we can help you build a library of digital work instructions that keeps your operations running smoothly.",
          },
          {
            type: "paragraph",
            content:
              "Schedule a discovery call to discuss your specific challenges and see how AR-guided work instructions can fit your environment. No commitment—just a practical conversation about what is possible.",
          },
        ],
      },
    ],
    relatedBlogPosts: [
      { title: "How AR SOPs help you pass audits with less stress", slug: "how-ar-sops-help-you-pass-audits" },
      { title: "Capturing corporate memory with AR work instructions before experts retire", slug: "capturing-corporate-memory-ar-work-instructions-before-experts-retire" },
      { title: "Keeping SOPs up to date in fast-changing environments with digital work instructions", slug: "keeping-sops-up-to-date-fast-changing-environments" },
      { title: "From tribal knowledge to AR SOPs: a practical roadmap", slug: "from-tribal-knowledge-to-ar-sops-practical-roadmap" },
    ],
  },
  "ar-training-and-onboarding": {
    heroTitle: "Onboarding & Training with AR SOPs",
    heroParagraphs: [
      "Traditional onboarding often means weeks of job shadowing and classroom training. It slows down productivity and puts extra pressure on a small group of experts. Augmented reality training changes this dynamic fundamentally.",
      "With AR-guided work instructions, new employees learn directly in the workplace, supported by clear AR overlays instead of static manuals. They perform real tasks with step-by-step guidance and build competence faster and more reliably. AR onboarding transforms training from a bottleneck into a competitive advantage.",
    ],
    sections: [
      {
        title: "The problem: slow and inconsistent onboarding drains resources",
        blocks: [
          {
            type: "paragraph",
            content:
              "Across manufacturing, logistics and field service, onboarding new employees is one of the most time-consuming and inconsistent processes. New hires shadow experienced colleagues for weeks, absorbing information passively while experts lose productive time. The result is a training bottleneck that slows hiring, increases costs and creates frustration on both sides.",
          },
          {
            type: "unorderedList",
            items: [
              "New hires depend on the availability and teaching style of individual experts, leading to inconsistent training outcomes",
              "Paper work instructions and PDF manuals are hard to interpret in the real work environment, causing confusion and errors",
              "Training quality varies significantly per trainer, shift, site and even day of the week",
              "Compliance and training proof are difficult to document, creating audit risks and gaps in qualification records",
              "High turnover rates multiply the burden—each departure triggers another lengthy onboarding cycle",
              "Language barriers make traditional training even slower for multilingual workforces",
            ],
          },
          {
            type: "paragraph",
            content:
              "These challenges translate directly into business impact: longer time to productivity, more errors during the learning phase, higher trainer workload and increased risk of compliance gaps. Companies that rely on traditional onboarding struggle to scale their workforce quickly or maintain consistent quality across shifts and sites.",
          },
        ],
      },
      {
        title: "How AI and AR–guided work instructions solve this",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR training and onboarding combine digital work instructions with real-world task execution. Instead of reading a manual or watching over someone's shoulder, new employees follow interactive, visual guidance in their field of view as they perform actual work. This hands-on approach accelerates learning, improves retention and standardises training across the organisation.",
          },
          {
            type: "orderedList",
            items: [
              "A manager or trainer assigns a task or training module to a new employee.",
              "The employee opens the corresponding AR guide on smart glasses, a tablet or a smartphone.",
              "The AR system displays visual, step-by-step work instructions directly in the field of view, overlaid on the real equipment or workspace.",
              "Arrows, highlights, 3D models and annotations indicate exactly where and how to perform each step—no guesswork required.",
              "The employee confirms each step, or the system verifies completion using visual recognition and AI-powered checks.",
              "Progress, completion times and any errors are logged automatically, building a digital training record.",
            ],
          },
          {
            type: "paragraph",
            content:
              "The result is a standardised, scalable onboarding process that delivers consistent outcomes regardless of who is training that day or which site the new hire joins. AR-guided onboarding frees up expert time, reduces errors during the learning phase and creates audit-ready documentation of every training activity.",
          },
        ],
      },
      {
        title: "Who is this for?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR training and onboarding for industrial teams is relevant for a wide range of roles and functions:",
          },
          {
            type: "unorderedList",
            items: [
              "HR and L&D managers responsible for reducing onboarding time, improving training quality and ensuring new hires reach productivity faster",
              "Operations managers who need to ramp up staff quickly to meet production demands without sacrificing quality or safety",
              "Maintenance managers tasked with training technicians on complex equipment and procedures across multiple sites",
              "HSE managers focused on ensuring all employees are trained on safety-critical procedures and can demonstrate compliance",
              "Quality managers who must document training and qualification for audits and certification requirements",
              "Plant managers and site directors looking to reduce the hidden costs of high turnover and lengthy onboarding cycles",
            ],
          },
        ],
      },
      {
        title: "Where is this used?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided training and onboarding is deployed across diverse industries and environments where practical skills and procedural consistency matter:",
          },
          {
            type: "unorderedList",
            items: [
              "Manufacturing and assembly, where new operators must learn complex processes quickly while maintaining First Time Right standards",
              "Logistics and warehousing, where picking, packing and loading procedures benefit from visual guidance that reduces errors and speeds up training",
              "Field service and utilities, where technicians in remote locations need hands-on training without constant expert supervision",
              "Food and beverage, where hygiene protocols and production procedures must be learned consistently across shifts and sites",
              "Pharmaceutical and life sciences, where GMP-compliant training records and documented qualification are mandatory",
              "Energy and industrial maintenance, where safety-critical tasks require structured training with clear evidence of competency",
            ],
          },
        ],
      },
      {
        title: "Typical process and workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR-guided training and onboarding follows a practical workflow that integrates with your existing training programmes:",
          },
          {
            type: "orderedList",
            items: [
              "Identify priority training needs: Work with HR, operations and training teams to list the roles, tasks and procedures where onboarding is slowest or most inconsistent.",
              "Select and digitise key procedures: Start with 5–10 high-impact tasks that new hires must learn early. Convert these into AR work instructions, capturing expert knowledge in visual, step-by-step format.",
              "Define training paths: Structure AR content into logical training modules or learning journeys, aligned with job roles and progression milestones.",
              "Pilot with a small group: Roll out AR-guided onboarding to a cohort of new hires. Gather feedback on usability, learning speed and confidence.",
              "Measure and refine: Track KPIs such as time to competency, First Time Right rate and training completion. Use data to improve content and identify gaps.",
              "Scale across the organisation: Expand AR training to additional roles, sites and shifts. Integrate with your LMS or training management system for centralised tracking.",
              "Continuously update: Keep AR content current as processes, equipment or regulations change. Use version control and instant publishing to ensure everyone trains on the latest procedures.",
            ],
          },
        ],
      },
      {
        title: "Concrete examples and mini-scenarios",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided training and onboarding delivers value in a wide range of real-world scenarios:",
          },
          {
            type: "paragraph",
            content:
              "Scenario 1: New operator onboarding in manufacturing. A production facility hires 20 new operators ahead of a seasonal peak. Instead of weeks of shadowing, new hires receive AR tablets loaded with step-by-step AR work instructions for their assigned workstations. Within days, operators are performing tasks independently with fewer errors than the previous cohort. Trainers can focus on exceptions and complex situations rather than basic procedure walk-throughs.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 2: Technician certification in field service. A utilities company must certify new field technicians on safety-critical inspection routines. Each technician follows AR-guided procedures on smart glasses while in the field. The system logs completion of every step with timestamps and photos. Supervisors review the records remotely, and technicians receive certification faster with documented evidence of compliant execution.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 3: Multilingual training in logistics. A distribution centre employs workers from multiple language backgrounds. Traditional training materials are available only in the local language, causing delays and misunderstandings. AR work instructions auto-translate into each user's language, ensuring every worker receives the same quality training. Onboarding time drops by 40% and picking errors fall sharply.",
          },
        ],
      },
      {
        title: "Getting started with AR training and onboarding",
        blocks: [
          {
            type: "paragraph",
            content:
              "If you are considering AR-guided training and onboarding, here is practical guidance to get started:",
          },
          {
            type: "unorderedList",
            items: [
              "Prerequisites: Identify the roles and tasks where onboarding is slowest or most inconsistent. Ensure you have subject matter experts available to validate content.",
              "Pilot scope: Start with 5–10 tasks that new hires must learn in their first weeks. Focus on high-impact procedures that directly affect productivity, quality or safety.",
              "KPIs to track: Time to competency, First Time Right rate, training completion rate, trainer hours saved, new hire feedback and error rates during onboarding.",
              "Devices: AR training can run on smart glasses, tablets or smartphones. Many organisations start with tablets or phones, then add smart glasses for hands-free scenarios.",
              "Change management: Involve trainers, supervisors and HR early. Demonstrate quick wins and provide ongoing support during the transition. Celebrate and share success stories.",
            ],
          },
        ],
      },
      {
        title: "FAQ: AR training and onboarding for industrial teams",
        blocks: [
          {
            type: "paragraph",
            content:
              "How much faster is AR onboarding compared to traditional methods? Most organisations report 30–50% reduction in time to competency. Some see even greater gains for repetitive or highly visual tasks.",
          },
          {
            type: "paragraph",
            content:
              "Do new hires need previous AR experience? No. AR-guided training is designed for intuitive use. A brief introduction of 10–15 minutes is usually sufficient for new users to get comfortable.",
          },
          {
            type: "paragraph",
            content:
              "Can AR training replace all classroom or shadowing sessions? AR training is most effective for hands-on procedural skills. Combine it with classroom sessions for theory, safety briefings and soft skills. AR enhances—rather than fully replaces—your training ecosystem.",
          },
          {
            type: "paragraph",
            content:
              "How does AR training support compliance and audits? AR training systems automatically log completion of every step, including timestamps, photos and operator confirmations. This creates an audit-ready record of who was trained, when and how.",
          },
          {
            type: "paragraph",
            content:
              "What languages are supported? Modern AR platforms support multiple languages. Content can be translated manually or with AI assistance, ensuring consistent training for multilingual workforces.",
          },
        ],
      },
      {
        title: "Next steps",
        blocks: [
          {
            type: "paragraph",
            content:
              "Ready to accelerate training and onboarding with AR work instructions? ActARion helps industrial organisations reduce onboarding time, improve training quality and build scalable learning programmes that work across sites, shifts and languages.",
          },
          {
            type: "paragraph",
            content:
              "Schedule a discovery call to discuss your specific training challenges and see how AR-guided onboarding can fit your environment. No commitment—just a practical conversation about what is possible.",
          },
        ],
      },
    ],
    relatedBlogPosts: [
      { title: "AR vs PDF: real numbers from onboarding pilots", slug: "ar-vs-pdf-real-numbers-onboarding-pilots" },
      { title: "How AR onboarding helps new hires reach productivity faster", slug: "ar-onboarding-new-hires-reach-productivity-faster" },
      { title: "Reducing training time with AR work instructions: what to expect in the first 90 days", slug: "reducing-training-time-ar-work-instructions-first-90-days" },
      { title: "How to design your first AR onboarding program for the shop floor", slug: "design-first-ar-onboarding-program-shop-floor" },
    ],
  },
  "ar-guided-assembly-production": {
    heroTitle: "AR-Guided Assembly",
    heroParagraphs: [
      "In production and assembly environments, small mistakes quickly lead to rework, scrap or product recalls. Paper-based instructions and verbal explanations leave too much room for interpretation, especially as product complexity and variant counts grow.",
      "AR-guided production and assembly provide operators with clear, visual work instructions at the workstation, combined with automated visual verification. That combination reduces human error, ensures consistent execution and creates complete, audit-ready documentation of each build. AR-guided assembly transforms quality from a checkpoint into a continuous, built-in process.",
    ],
    sections: [
      {
        title: "The problem: errors, rework, and recalls drain resources",
        blocks: [
          {
            type: "paragraph",
            content:
              "Assembly errors are among the most costly quality issues in manufacturing. A single missed fastener, incorrect component orientation or skipped verification step can result in expensive rework, scrapped units or—worst of all—product recalls that damage customer trust and brand reputation. As products become more complex and variant counts grow, the challenge intensifies.",
          },
          {
            type: "unorderedList",
            items: [
              "Operators work with static work instructions that are hard to keep up to date and even harder to interpret for complex assemblies",
              "Complex assemblies rely on memory, local workarounds and tribal knowledge, leading to inconsistent execution across shifts and sites",
              "Quality inspection is often manual, sampled and end-of-line—not integrated into each step of the build",
              "Traceability per product or batch is incomplete, making root cause analysis difficult when defects are discovered",
              "Engineering changes are slow to reach the shop floor, resulting in builds that use outdated procedures",
              "High-mix, low-volume production multiplies the risk—operators must switch between many variants with different requirements",
            ],
          },
          {
            type: "paragraph",
            content:
              "The cost of these issues compounds quickly. Rework consumes time and materials. Scrap represents lost value. Recalls trigger investigations, logistics costs and reputational damage. For operations leaders, reducing assembly errors is not just a quality goal—it is a financial imperative.",
          },
        ],
      },
      {
        title: "How AI and AR–guided work instructions solve this",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided assembly brings work instructions directly into the operator's field of view. Instead of consulting paper manuals, searching for the right page or asking a colleague, operators see exactly what to do, where to do it and in which order—overlaid on the actual product and workstation. AI-powered verification ensures each step is completed correctly before the next one begins.",
          },
          {
            type: "orderedList",
            items: [
              "The operator scans a product ID, serial number or order barcode to start the assembly session.",
              "The AR system automatically loads the correct digital work instructions for that specific variant, batch or configuration.",
              "In the field of view—via smart glasses or tablet—the AR system displays numbered steps and visual cues directly on the real assembly.",
              "For each step, arrows, highlights, 3D overlays or animations show exactly where to place, connect or adjust a component.",
              "The operator confirms each step, or the system uses AI-powered visual recognition to verify correct execution.",
              "After a successful check, the system captures a photo or short video as evidence and unlocks the next step.",
              "All images and data are linked to the order, serial number or batch, creating a complete, traceable record of the build.",
            ],
          },
          {
            type: "paragraph",
            content:
              "This step-by-step, verified approach prevents errors at the source rather than catching them at the end of the line. Digital work instructions can be updated instantly when engineering changes occur, ensuring every operator works from the latest validated procedure.",
          },
        ],
      },
      {
        title: "Who is this for?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided assembly for error-free production is relevant for a wide range of roles involved in manufacturing quality and efficiency:",
          },
          {
            type: "unorderedList",
            items: [
              "Operations managers who need to reduce rework, scrap and cycle time while maintaining throughput",
              "Quality managers responsible for First Time Right rates, defect reduction and audit-ready documentation",
              "Production engineers tasked with improving process consistency and managing variant complexity",
              "Maintenance and reliability managers who see the link between assembly quality and equipment uptime",
              "HSE managers focused on reducing incidents related to incorrect assembly or skipped safety steps",
              "Plant managers and site directors looking to improve yield, reduce cost of quality and strengthen customer confidence",
            ],
          },
        ],
      },
      {
        title: "Where is this used?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided assembly and digital work instructions are deployed across industries where quality, traceability and consistency are critical:",
          },
          {
            type: "unorderedList",
            items: [
              "Aerospace and defence, where zero-defect assembly and strict regulatory compliance require visual verification of every critical step",
              "Automotive and powertrain, where high variant counts and tight tolerances demand precise, repeatable assembly procedures",
              "Electronics and high-tech, where rapid product changeovers and miniaturised components increase the risk of error",
              "Industrial equipment and machinery, where complex subassemblies and customer-specific configurations benefit from guided procedures",
              "Medical devices and life sciences, where GMP compliance and full traceability are mandatory for regulatory approval",
              "Consumer goods and appliances, where high-volume, high-mix production lines face pressure to deliver consistent quality at speed",
            ],
          },
        ],
      },
      {
        title: "Typical process and workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR-guided assembly typically follows a structured workflow that integrates with your existing production systems:",
          },
          {
            type: "orderedList",
            items: [
              "Identify high-impact assembly processes: Work with quality, production and engineering teams to list the assemblies where errors, rework or recalls are most common or costly.",
              "Prioritise and define scope: Select the first assembly lines or workstations to digitise. Choose processes with clear steps, measurable quality metrics and available documentation.",
              "Convert work instructions to AR format: Translate existing SOPs, work instructions and engineering documents into interactive AR content. Add visual cues, verification checkpoints and variant logic.",
              "Integrate with production systems: Connect the AR assembly platform with your MES, ERP or quality management system to pull order data, push results and enable traceability.",
              "Pilot and validate: Roll out AR-guided assembly at one or more pilot stations. Measure First Time Right, cycle time and operator feedback. Refine content based on real-world use.",
              "Scale across lines and sites: Expand AR-guided assembly to additional workstations, products and sites. Standardise content templates and governance for consistent rollout.",
              "Continuously improve: Use data from AR-verified builds to identify patterns, improve work instructions and drive ongoing quality improvement.",
            ],
          },
        ],
      },
      {
        title: "Concrete examples and mini-scenarios",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided assembly delivers measurable results in a variety of real-world scenarios:",
          },
          {
            type: "paragraph",
            content:
              "Scenario 1: Aerospace subassembly with torque verification. An aerospace supplier digitises work instructions for composite subassemblies. AR overlays guide technicians through each fastener, highlight torque specifications and flag foreign object debris (FOD) risks. Visual verification captures evidence of correct torque application. Quality escapes drop by 40%, and torque-related rework is nearly eliminated.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 2: Automotive powertrain with variant management. A powertrain manufacturer deploys AR-guided assembly to handle dozens of engine variants. The system detects the specific model via scanned serial number, loads the correct sequence and uses visual cues to highlight critical differences between variants. Scrap from misbuilds falls by 60%, and new hires reach full productivity in half the usual time.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 3: Electronics assembly with component orientation checks. An electronics manufacturer faces frequent rework due to incorrect component orientation. AR work instructions display exact placement and polarity for each component. AI-powered visual recognition checks orientation before allowing the operator to proceed. Rework rates drop from 8% to under 2% within three months.",
          },
        ],
      },
      {
        title: "Getting started with AR-guided assembly",
        blocks: [
          {
            type: "paragraph",
            content:
              "If you are considering AR-guided assembly for error-free production, here is practical guidance to get started:",
          },
          {
            type: "unorderedList",
            items: [
              "Prerequisites: Identify assemblies with high rework, scrap or recall risk. Ensure existing work instructions and engineering data are accessible for conversion.",
              "Pilot scope: Start with 2–5 assembly stations or product lines. Choose processes with clear steps, measurable quality metrics and engaged teams.",
              "KPIs to track: First Time Right rate, rework rate, scrap rate, cycle time, quality escapes, customer complaints and audit findings.",
              "Devices: AR-guided assembly can run on smart glasses, tablets or fixed workstation displays. Smart glasses offer hands-free guidance; tablets work well for stationary assembly.",
              "Change management: Involve operators, quality engineers and supervisors early. Demonstrate quick wins and provide support during rollout. Address concerns about pace and monitoring transparently.",
            ],
          },
        ],
      },
      {
        title: "FAQ: AR-guided assembly for error-free production",
        blocks: [
          {
            type: "paragraph",
            content:
              "What types of assembly tasks benefit most from AR work instructions? Tasks with high variant complexity, critical torque or fastener requirements, strict quality standards or a history of rework and defects benefit most.",
          },
          {
            type: "paragraph",
            content:
              "Do operators need previous AR experience? No. AR-guided assembly systems are designed for intuitive use. Operators typically become comfortable within 15–30 minutes of introduction.",
          },
          {
            type: "paragraph",
            content:
              "How long does it take to create AR work instructions for an assembly? Conversion time depends on process complexity and existing documentation quality. With modern AR platforms, a typical assembly procedure can be digitised in a few hours to a few days.",
          },
          {
            type: "paragraph",
            content:
              "Can AR-guided assembly integrate with our MES or ERP? Yes. Most AR assembly platforms offer integrations with common MES, ERP and quality management systems. This enables automatic order loading, result logging and traceability.",
          },
          {
            type: "paragraph",
            content:
              "How does visual verification work? AI-powered visual recognition compares the real assembly against the expected state. If the system detects a mismatch, it prompts the operator to correct the issue before proceeding.",
          },
        ],
      },
      {
        title: "Next steps",
        blocks: [
          {
            type: "paragraph",
            content:
              "Ready to reduce rework, cut scrap and achieve error-free production with AR-guided assembly? ActARion helps manufacturers implement AI and AR–guided work instructions that deliver measurable quality improvements and full traceability.",
          },
          {
            type: "paragraph",
            content:
              "Schedule a discovery call to discuss your assembly challenges and see how AR-guided work instructions can fit your production environment. No commitment—just a practical conversation about what is possible.",
          },
        ],
      },
    ],
    relatedBlogPosts: [
      { title: "Checklist: is your assembly process ready for AR work instructions?", slug: "checklist-assembly-process-ready-ar-work-instructions" },
      { title: "From paper SOPs to AR SOPs: reducing assembly errors on the line", slug: "from-paper-sops-to-ar-sops-reducing-assembly-errors" },
      { title: "5 common assembly mistakes that AR work instructions can prevent", slug: "5-common-assembly-mistakes-ar-work-instructions-prevent" },
      { title: "How to standardise complex assembly tasks with digital work instructions", slug: "standardise-complex-assembly-tasks-digital-work-instructions" },
    ],
  },
  "ar-guided-changeover-batch-preparation": {
    heroTitle: "AR-Guided Changeovers",
    heroParagraphs: [
      "Changeovers and batch preparation are critical moments in manufacturing. Incorrect settings or missed steps lead to defects, scrap and unplanned downtime. Procedures are often complex and depend heavily on the experience of a few key operators.",
      "With AR-guided changeover and batch preparation, operators follow clear, standardised work instructions in augmented reality. Each step is documented and verified, and remote experts can join in real time if something unexpected happens. AR-guided changeovers transform one of manufacturing's most variable processes into a reliable, repeatable routine.",
    ],
    sections: [
      {
        title: "The problem: complex, error-prone changeovers cost time and money",
        blocks: [
          {
            type: "paragraph",
            content:
              "Changeovers are among the highest-impact activities in manufacturing operations. Every minute a line is down for changeover is a minute of lost production. Yet changeovers are also one of the most error-prone processes—settings are missed, steps are skipped and small mistakes cascade into startup problems that extend downtime further. The challenge grows as product portfolios expand and batch sizes shrink.",
          },
          {
            type: "unorderedList",
            items: [
              "Machine changeovers are time-consuming and rely on a small group of experienced specialists who know the nuances of each transition",
              "Settings, checks and adjustments are not always fully documented, leaving room for variation and error",
              "Small mistakes during changeover lead to startup defects, scrap and extended downtime in the next batch",
              "OEMs and field service partners have limited visibility into how changeovers are actually performed, making support and optimisation difficult",
              "Knowledge of best practices is concentrated in a few hero operators—when they are unavailable, changeover times balloon",
              "High product mix and frequent changeovers multiply the risk of error and inconsistency",
            ],
          },
          {
            type: "paragraph",
            content:
              "For operations leaders, changeover performance directly impacts OEE, throughput and cost. Reducing changeover time and eliminating errors is a proven lever for improving manufacturing competitiveness—but achieving consistency at scale requires more than better documentation.",
          },
        ],
      },
      {
        title: "How AI and AR–guided work instructions solve this",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided changeover procedures bring standardised, visual guidance directly to the operator at the machine. Instead of consulting binders, relying on memory or asking a colleague, operators see exactly what to do, where to do it and in which order—overlaid on the actual equipment. AI-powered verification ensures critical steps are completed correctly, and remote expert support is available instantly when needed.",
          },
          {
            type: "orderedList",
            items: [
              "The previous batch is completed and the line is ready for changeover.",
              "The operator scans a batch code or selects the next product in the AR system.",
              "The system automatically loads the specific AR changeover procedure for that batch, product or configuration.",
              "In the field of view—via smart glasses or tablet—the operator sees numbered, visual instructions in their preferred language.",
              "For critical settings and checks, the system prompts the operator to confirm completion or captures evidence via photo or video.",
              "If the system or operator detects a deviation, a remote expert session can be started instantly for guidance.",
              "After the final check, the AR system confirms that the machine is ready for production and logs the changeover as complete.",
              "All steps, timestamps and evidence are stored in a digital logbook for analysis, audits and continuous improvement.",
            ],
          },
          {
            type: "paragraph",
            content:
              "This step-by-step, verified approach reduces changeover variability, prevents errors and shortens transition times—regardless of which operator is on shift.",
          },
        ],
      },
      {
        title: "Who is this for?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided changeover and batch preparation is relevant for a wide range of roles focused on operational efficiency and quality:",
          },
          {
            type: "unorderedList",
            items: [
              "Operations managers who need to reduce changeover time, improve OEE and minimise unplanned downtime",
              "Production planners responsible for scheduling changeovers and managing batch transitions across multiple lines",
              "Maintenance managers who see the link between correct changeover execution and equipment reliability",
              "Quality managers focused on reducing startup defects and First Time Right issues after changeovers",
              "Continuous improvement leaders driving lean and SMED initiatives to standardise and accelerate changeovers",
              "Plant managers and site directors looking to improve throughput and reduce the hidden costs of slow or inconsistent changeovers",
            ],
          },
        ],
      },
      {
        title: "Where is this used?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided changeover and batch preparation is deployed across industries where frequent changeovers, high product mix or strict quality requirements make consistency critical:",
          },
          {
            type: "unorderedList",
            items: [
              "Food and beverage, where frequent product and flavour changes require fast, reliable changeovers to maximise line utilisation",
              "Pharmaceutical and life sciences, where batch-to-batch transitions must be documented, validated and compliant with GMP requirements",
              "Packaging and filling, where high-speed lines and frequent format changes demand precise setup procedures",
              "Automotive and industrial equipment, where high-mix production and customer-specific configurations require accurate changeover execution",
              "Chemicals and specialty materials, where process settings and cleaning steps are critical to product quality and safety",
              "Consumer goods, where seasonal and promotional product runs create frequent changeover cycles",
            ],
          },
        ],
      },
      {
        title: "Typical process and workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR-guided changeovers typically follows a structured workflow that integrates with your existing production planning and execution systems:",
          },
          {
            type: "orderedList",
            items: [
              "Identify critical changeover types: Work with operations, planning and quality teams to list the changeovers that are most frequent, longest or most error-prone.",
              "Document best-practice procedures: Capture the sequence, settings, checks and tips used by your most experienced operators. Involve subject matter experts in defining the standard.",
              "Convert to AR format: Translate changeover procedures into interactive AR content with visual cues, checkpoints and variant logic. Include language options for multilingual teams.",
              "Integrate with production systems: Connect the AR changeover platform with your MES, ERP or scheduling system to pull batch data and log results automatically.",
              "Pilot and validate: Roll out AR-guided changeovers on selected lines. Measure changeover time, First Time Right and operator feedback. Refine content based on real-world use.",
              "Scale and standardise: Expand AR-guided changeovers to additional lines, products and sites. Use templates and governance to ensure consistent rollout.",
              "Continuously improve: Use data from AR-logged changeovers to identify bottlenecks, optimise steps and drive ongoing improvement.",
            ],
          },
        ],
      },
      {
        title: "Concrete examples and mini-scenarios",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided changeovers deliver measurable results in a variety of real-world scenarios:",
          },
          {
            type: "paragraph",
            content:
              "Scenario 1: Packaging line format change in food manufacturing. A food manufacturer runs multiple product formats on the same packaging line. Changeover times vary widely depending on who performs them. AR work instructions standardise the sequence, highlight adjustment points and verify critical settings. Changeover time drops by 25% and startup defects are cut in half.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 2: Batch-to-batch transition in pharma. A pharmaceutical company must document every changeover step for GMP compliance. AR-guided procedures capture timestamps, operator confirmations and photos for each step. Auditors receive clear, traceable evidence of compliant execution—reducing audit preparation time and risk.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 3: High-mix CNC setup in industrial equipment. A job shop faces long setup times and frequent errors when changing over CNC machines for custom orders. AR SOPs guide operators through tool changes, fixture setup and programme selection. Setup time falls by 30% and scrap from incorrect settings drops sharply.",
          },
        ],
      },
      {
        title: "Getting started with AR-guided changeovers",
        blocks: [
          {
            type: "paragraph",
            content:
              "If you are considering AR-guided changeover procedures, here is practical guidance to get started:",
          },
          {
            type: "unorderedList",
            items: [
              "Prerequisites: Identify the changeovers that are most frequent, longest or most error-prone. Ensure you have access to subject matter experts who can define best-practice procedures.",
              "Pilot scope: Start with 2–5 changeover types on a selected line or area. Focus on changeovers with clear steps and measurable outcomes.",
              "KPIs to track: Changeover time, First Time Right rate at startup, downtime due to changeover errors, scrap from incorrect settings and operator feedback.",
              "Devices: AR-guided changeovers can run on smart glasses, tablets or smartphones. Smart glasses offer hands-free guidance for operators working on equipment.",
              "Change management: Involve operators, supervisors and planning teams early. Demonstrate quick wins and address concerns about pace and accountability transparently.",
            ],
          },
        ],
      },
      {
        title: "FAQ: AR-guided changeover and setup reduction",
        blocks: [
          {
            type: "paragraph",
            content:
              "How much can AR-guided changeovers reduce changeover time? Most organisations see 15–40% reduction in changeover time, depending on baseline variability and process complexity.",
          },
          {
            type: "paragraph",
            content:
              "Can AR changeover procedures adapt to different product variants? Yes. Modern AR platforms support variant logic, loading the correct procedure based on batch code, product type or configuration.",
          },
          {
            type: "paragraph",
            content:
              "How does remote expert support work during a changeover? If the operator encounters an issue, they can start a live video session with a remote expert. The expert sees what the operator sees and can add annotations, highlights and spoken guidance in real time.",
          },
          {
            type: "paragraph",
            content:
              "What if our changeover procedures are not fully documented? AR content creation can serve as the documentation process itself. As experts perform changeovers, the system captures steps, images and notes—building the SOP as the work is done.",
          },
          {
            type: "paragraph",
            content:
              "How does AR-guided changeover support lean and SMED initiatives? AR work instructions standardise internal and external setup activities, reduce search time and ensure consistency—key principles of SMED (Single-Minute Exchange of Die) methodology.",
          },
        ],
      },
      {
        title: "Next steps",
        blocks: [
          {
            type: "paragraph",
            content:
              "Ready to reduce changeover time, eliminate errors and improve OEE with AR-guided changeover procedures? ActARion helps manufacturers standardise and accelerate changeovers using AI and AR–guided work instructions.",
          },
          {
            type: "paragraph",
            content:
              "Schedule a discovery call to discuss your changeover challenges and see how AR-guided procedures can fit your production environment. No commitment—just a practical conversation about what is possible.",
          },
        ],
      },
    ],
    relatedBlogPosts: [
      { title: "AR-guided changeovers: a practical playbook to reduce downtime", slug: "ar-guided-changeovers-practical-playbook-reduce-downtime" },
      { title: "Capturing best-practice changeover sequences with AR SOPs", slug: "capturing-best-practice-changeover-sequences-ar-sops" },
      { title: "From 'hero operators' to standardised changeovers with digital work instructions", slug: "hero-operators-standardised-changeovers-digital-work-instructions" },
      { title: "How to pilot AR work instructions on a critical changeover", slug: "pilot-ar-work-instructions-critical-changeover" },
    ],
  },
  "ar-preventive-maintenance": {
    heroTitle: "Preventive & Predictive Maintenance",
    heroParagraphs: [
      "Preventive maintenance is meant to prevent downtime, but in practice there is often limited insight into how procedures are actually executed. Without data on execution quality, time and recurring issues, it is hard to improve maintenance strategies or demonstrate ROI.",
      "AR-supported preventive maintenance combines visual work instructions with automated data collection. Each task is executed in the same standardised way, documented with images and enriched with performance metrics. AR-guided preventive maintenance transforms maintenance from a cost centre into a source of operational intelligence.",
    ],
    sections: [
      {
        title: "The problem: limited visibility in maintenance execution",
        blocks: [
          {
            type: "paragraph",
            content:
              "Preventive maintenance is the foundation of asset reliability. Done well, it prevents breakdowns, extends equipment life and reduces unplanned downtime. But in many organisations, maintenance execution is a black box. Technicians follow procedures differently, paper checklists capture only basic completion data and there is no way to link maintenance effort to actual reliability outcomes.",
          },
          {
            type: "unorderedList",
            items: [
              "Preventive maintenance procedures are executed differently by each technician, leading to inconsistent results and missed issues",
              "Paper checklists and manual logs do not capture timing, deviations, photos or proof of work",
              "It is difficult to link maintenance effort—time, cost, materials—to reliability improvements and uptime gains",
              "Continuous improvement of maintenance plans is largely based on assumptions rather than data",
              "Technicians may skip or shortcut steps without visibility or accountability",
              "Knowledge of best practices is siloed—when experienced technicians leave, quality drops",
            ],
          },
          {
            type: "paragraph",
            content:
              "For maintenance and reliability leaders, this lack of visibility makes it hard to optimise schedules, justify investments or demonstrate the value of preventive programmes. The result is often over-maintenance (wasted effort) or under-maintenance (unexpected failures).",
          },
        ],
      },
      {
        title: "How AI and AR–guided work instructions solve this",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided preventive maintenance brings standardised, visual procedures directly to the technician at the asset. Instead of interpreting paper checklists or relying on memory, technicians follow step-by-step AR work instructions that guide them through every inspection, check and adjustment. The system captures execution data automatically—timing, completion, deviations and evidence—building a rich data set for analysis and improvement.",
          },
          {
            type: "orderedList",
            items: [
              "The technician receives a planned maintenance work order from the CMMS or maintenance management system.",
              "The technician starts the corresponding AR work instruction on smart glasses, tablet or smartphone.",
              "The AR system guides the technician step by step with visual cues overlaid on the actual asset.",
              "The system automatically records time spent per step, total task duration and sequence of actions.",
              "For each step, the technician confirms completion, and the system logs whether it was done First Time Right or required rework.",
              "At critical checkpoints, the system prompts for photos, sensor readings or video as evidence of correct execution.",
              "Any deviations, anomalies or issues discovered during the inspection are logged with notes and images.",
              "After completion, a detailed maintenance report is generated automatically and synced to the CMMS.",
            ],
          },
          {
            type: "paragraph",
            content:
              "This approach ensures every technician follows the same best-practice procedure and creates a data trail that supports continuous improvement, compliance and accountability.",
          },
        ],
      },
      {
        title: "Who is this for?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided preventive maintenance is relevant for a wide range of roles focused on asset reliability and operational performance:",
          },
          {
            type: "unorderedList",
            items: [
              "Maintenance managers responsible for ensuring preventive tasks are completed correctly and on time",
              "Reliability engineers focused on improving Mean Time Between Failures and reducing unplanned downtime",
              "Operations managers who depend on equipment uptime to meet production targets",
              "HSE managers ensuring safety-critical inspections are performed consistently and documented",
              "Quality managers who need traceable evidence of maintenance execution for audits and compliance",
              "Plant managers and site directors looking to reduce maintenance costs while improving asset availability",
            ],
          },
        ],
      },
      {
        title: "Where is this used?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided preventive maintenance is deployed across industries where asset reliability, safety and compliance are critical:",
          },
          {
            type: "unorderedList",
            items: [
              "Energy and utilities, where critical infrastructure inspections and safety checks must be performed consistently and documented thoroughly",
              "Manufacturing and process industries, where equipment uptime directly impacts throughput, quality and cost",
              "Pharmaceutical and life sciences, where GMP compliance requires documented, validated maintenance procedures",
              "Transportation and logistics, where fleet and facility maintenance affects safety and service levels",
              "Oil and gas, where safety-critical assets require rigorous inspection routines and audit-ready records",
              "Building management and facilities, where scheduled maintenance ensures comfort, safety and regulatory compliance",
            ],
          },
        ],
      },
      {
        title: "Typical process and workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR-guided preventive maintenance typically follows a structured workflow that integrates with your existing maintenance systems:",
          },
          {
            type: "orderedList",
            items: [
              "Identify priority assets and tasks: Work with maintenance, reliability and operations teams to list the preventive tasks where consistency, data capture or compliance are most important.",
              "Document best-practice procedures: Capture the steps, checks, tolerances and tips used by experienced technicians. Involve subject matter experts in defining the standard.",
              "Convert to AR format: Translate maintenance procedures into interactive AR content with visual cues, checkpoints and evidence capture prompts.",
              "Integrate with CMMS: Connect the AR maintenance platform with your CMMS or EAM system to pull work orders, push results and enable traceability.",
              "Pilot and validate: Roll out AR-guided preventive maintenance on selected assets or routes. Measure completion rates, timing, First Time Right and technician feedback. Refine content based on real-world use.",
              "Scale and standardise: Expand AR-guided maintenance to additional assets, sites and maintenance types. Use templates and governance for consistent rollout.",
              "Analyse and improve: Use data from AR-logged maintenance to identify trends, optimise intervals and drive continuous improvement.",
            ],
          },
        ],
      },
      {
        title: "Concrete examples and mini-scenarios",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR-guided preventive maintenance delivers measurable results in a variety of real-world scenarios:",
          },
          {
            type: "paragraph",
            content:
              "Scenario 1: Turbine inspection in an energy facility. A utility company struggles to ensure consistent turbine inspections across shifts and technicians. AR work instructions guide each technician through the same sequence of checks, prompting for photos at critical points. Inspection quality improves, and data analysis reveals a recurring issue that leads to a proactive repair—avoiding a costly unplanned outage.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 2: Cleanroom equipment maintenance in pharma. A pharmaceutical manufacturer must document preventive maintenance for GMP compliance. AR-guided procedures capture timestamps, technician confirmations and photos for each step. Auditors receive clear, traceable evidence of compliant execution, reducing audit preparation time and risk.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 3: Fleet preventive maintenance in logistics. A logistics company faces inconsistent vehicle inspections and missed issues. AR work instructions standardise the inspection routine for drivers and technicians. Data from AR-logged inspections identifies patterns—certain vehicles consistently show wear on specific components—enabling targeted, predictive interventions.",
          },
        ],
      },
      {
        title: "Getting started with AR-guided preventive maintenance",
        blocks: [
          {
            type: "paragraph",
            content:
              "If you are considering AR-guided preventive maintenance, here is practical guidance to get started:",
          },
          {
            type: "unorderedList",
            items: [
              "Prerequisites: Identify the assets and tasks where consistent execution, data capture or compliance are most critical. Ensure you have access to subject matter experts who can define best-practice procedures.",
              "Pilot scope: Start with 5–10 preventive maintenance tasks or a group of related assets. Focus on tasks with clear steps and measurable outcomes.",
              "KPIs to track: Task completion rate, First Time Right rate, time per task, deviations logged, unplanned downtime, audit findings and technician feedback.",
              "Devices: AR-guided maintenance can run on smart glasses, tablets or smartphones. Smart glasses offer hands-free guidance for technicians working on equipment.",
              "Change management: Involve technicians, supervisors and planners early. Demonstrate quick wins and address concerns about pace and accountability transparently.",
            ],
          },
        ],
      },
      {
        title: "FAQ: AR-guided preventive maintenance",
        blocks: [
          {
            type: "paragraph",
            content:
              "What types of preventive maintenance tasks benefit most from AR? Tasks that are complex, safety-critical, require evidence capture or are performed by multiple technicians with variable results benefit most.",
          },
          {
            type: "paragraph",
            content:
              "How does AR maintenance integrate with our CMMS? Most AR maintenance platforms offer integrations with common CMMS and EAM systems. Work orders are pulled automatically, and results are synced back for reporting and analysis.",
          },
          {
            type: "paragraph",
            content:
              "Can AR-guided maintenance capture sensor data or readings? Yes. Many AR platforms support integration with connected tools, sensors and IoT devices—allowing readings to be logged automatically alongside step completion.",
          },
          {
            type: "paragraph",
            content:
              "How does this support compliance and audits? AR-guided maintenance creates a digital audit trail—timestamps, technician confirmations, photos and notes—that can be retrieved for audits, incident investigations and compliance reporting.",
          },
          {
            type: "paragraph",
            content:
              "What if technicians resist new technology? Involve technicians early, focus on making their job easier (not adding surveillance) and demonstrate quick wins. Many technicians appreciate having clear guidance and documented evidence of their work.",
          },
        ],
      },
      {
        title: "Next steps",
        blocks: [
          {
            type: "paragraph",
            content:
              "Ready to improve asset reliability, capture maintenance data and drive continuous improvement with AR-guided preventive maintenance? ActARion helps industrial organisations standardise maintenance execution and unlock insights from the shop floor.",
          },
          {
            type: "paragraph",
            content:
              "Schedule a discovery call to discuss your maintenance challenges and see how AR-guided work instructions can fit your environment. No commitment—just a practical conversation about what is possible.",
          },
        ],
      },
    ],
    relatedBlogPosts: [
      { title: "Preventive maintenance with AR work instructions: catching issues before they escalate", slug: "preventive-maintenance-ar-work-instructions-catching-issues" },
      { title: "Standardising inspections with AR SOPs: fewer surprises, better data", slug: "standardising-inspections-ar-sops-fewer-surprises-better-data" },
      { title: "How digital work instructions change the daily routine of maintenance technicians", slug: "digital-work-instructions-maintenance-technicians-daily-routine" },
      { title: "Connecting sensor data to AR-guided maintenance steps", slug: "connecting-sensor-data-ar-guided-maintenance" },
    ],
  },
  "ar-remote-expert-support-corrective-maintenance": {
    heroTitle: "Remote Expert Support",
    heroParagraphs: [
      "When a critical asset fails, every minute counts. Often, the expert with the right knowledge is not on site, and travel time adds hours or even days of unplanned downtime. Phone calls and photos are not enough to guide complex repairs safely and effectively.",
      "Remote AR expert support brings the specialist virtually to the machine. The operator on site shares a live AR video feed, and the remote expert guides the repair step by step with voice and visual annotations. AR remote support transforms expert availability from a bottleneck into a scalable resource.",
    ],
    sections: [
      {
        title: "The problem: long downtime and limited expert availability",
        blocks: [
          {
            type: "paragraph",
            content:
              "Unplanned equipment failures are among the most disruptive events in industrial operations. Production stops, safety risks emerge and pressure mounts to restore service as quickly as possible. But the expert who knows how to fix the problem is often somewhere else—at another site, in another country or simply unavailable. Traditional remote support through phone calls, emails or static photos is slow, frustrating and error-prone.",
          },
          {
            type: "unorderedList",
            items: [
              "Experts cannot be at every site or shift at the same moment—availability is limited by geography and time zones",
              "Diagnosing complex faults remotely is difficult with only phone, email or static photos—context is lost and miscommunication is common",
              "Travel time, scheduling delays and waiting for the right expert extend unplanned downtime significantly",
              "Knowledge from previous incidents is often trapped in email threads or memory—not captured for reuse",
              "Escalation paths are unclear, leading to wasted time as operators try to reach the right person",
              "Junior technicians lack the confidence or knowledge to attempt repairs without expert guidance",
            ],
          },
          {
            type: "paragraph",
            content:
              "For operations and maintenance leaders, the cost of prolonged downtime is measured in lost production, delayed shipments, safety incidents and customer dissatisfaction. Reducing the time from fault detection to resolution is a critical lever for improving operational performance.",
          },
        ],
      },
      {
        title: "How AI and AR–guided remote expert support solves this",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR remote expert support connects on-site operators with off-site specialists through a live, visual collaboration session. Instead of describing problems over the phone, the operator shares exactly what they see in real time. The expert sees the same view and can guide the repair with voice instructions and visual annotations—arrows, circles, highlights—overlaid directly on the operator's field of view. This see-what-I-see approach eliminates ambiguity and accelerates resolution.",
          },
          {
            type: "orderedList",
            items: [
              "The operator detects a fault that cannot be resolved using local AR work instructions or standard procedures.",
              "The operator starts an AR remote support session on smart glasses, tablet or smartphone.",
              "The system connects the operator with an available remote expert—either from a central pool, an OEM support team or a specialist network.",
              "The remote expert joins the session and sees exactly what the operator sees in real time through the device camera.",
              "The expert adds visual annotations—arrows, circles, highlights, text—directly into the operator's field of view.",
              "Step by step, the expert guides the operator through diagnostics, troubleshooting and repair actions.",
              "The session is recorded, including video, screenshots, annotations and notes, creating a case for future reference.",
              "If the fault cannot be resolved remotely, the documented session prepares the on-site visit or escalation.",
            ],
          },
          {
            type: "paragraph",
            content:
              "This approach dramatically reduces the time from fault detection to resolution. Experts can support multiple sites in a single day without travel. Operators gain confidence knowing expert help is just a tap away.",
          },
        ],
      },
      {
        title: "Who is this for?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR remote expert support for corrective maintenance is relevant for a wide range of roles focused on minimising downtime and maximising expert utilisation:",
          },
          {
            type: "unorderedList",
            items: [
              "Maintenance managers responsible for reducing Mean Time To Repair and minimising unplanned downtime",
              "Field service leaders managing distributed teams and needing to scale expert support without increasing travel",
              "Reliability engineers focused on improving First Time Right rates for repairs and reducing repeat failures",
              "Operations managers who depend on equipment uptime to meet production and delivery targets",
              "OEM and equipment vendor support teams looking to provide faster, more effective remote assistance to customers",
              "HSE managers ensuring safety-critical repairs are performed correctly with expert oversight",
            ],
          },
        ],
      },
      {
        title: "Where is this used?",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR remote expert support is deployed across industries where equipment downtime is costly, expert knowledge is scarce or distributed teams need instant access to specialist support:",
          },
          {
            type: "unorderedList",
            items: [
              "Energy and utilities, where critical infrastructure failures require rapid, expert-guided response in remote or hazardous locations",
              "Manufacturing and process industries, where production line stoppages directly impact throughput and revenue",
              "Oil and gas, where offshore or remote sites make expert travel time-consuming and expensive",
              "Transportation and logistics, where fleet breakdowns affect service levels and delivery commitments",
              "Field service organisations, where technicians in the field need on-demand access to product experts",
              "Medical device and equipment, where complex repairs require specialist guidance to ensure safety and compliance",
            ],
          },
        ],
      },
      {
        title: "Typical process and workflow",
        blocks: [
          {
            type: "paragraph",
            content:
              "Implementing AR remote expert support typically follows a structured workflow that integrates with your existing support and maintenance processes:",
          },
          {
            type: "orderedList",
            items: [
              "Define the expert pool and escalation paths: Identify the experts who will provide remote support—internal specialists, OEM partners or third-party networks. Define when and how operators should escalate.",
              "Equip field teams: Deploy AR devices (smart glasses, tablets or smartphones) to operators and technicians who may need remote support. Provide brief training on starting sessions.",
              "Set up the remote support platform: Configure the AR remote support tool, integrate with CMMS or ticketing systems if needed and establish protocols for session handling.",
              "Pilot and validate: Run pilot sessions on selected sites or use cases. Measure resolution time, First Time Right and user feedback. Refine protocols based on real-world experience.",
              "Scale and standardise: Expand AR remote support to additional sites, shifts and equipment types. Build a library of resolved cases for future reference.",
              "Continuously improve: Analyse session data to identify recurring issues, training gaps or opportunities to convert frequent remote sessions into standalone AR work instructions.",
            ],
          },
        ],
      },
      {
        title: "Concrete examples and mini-scenarios",
        blocks: [
          {
            type: "paragraph",
            content:
              "AR remote expert support delivers measurable results in a variety of real-world scenarios:",
          },
          {
            type: "paragraph",
            content:
              "Scenario 1: Critical pump failure at a water utility. A pump fails at a remote treatment facility. The on-site technician is unfamiliar with the equipment model. Within minutes, an AR remote session connects the technician with a pump specialist. The expert guides the technician through diagnostics, identifies a seized bearing and walks through the replacement procedure. The pump is back online in under two hours—compared to a typical 8-hour wait for an expert site visit.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 2: Production line stoppage in manufacturing. A packaging machine faults during a critical production run. The operator starts an AR session with the OEM's support team. The remote expert sees the HMI screens, identifies a sensor misalignment and guides the operator to recalibrate. The line restarts within 30 minutes, avoiding a costly overnight delay.",
          },
          {
            type: "paragraph",
            content:
              "Scenario 3: Field service for medical equipment. A hospital's imaging system goes offline. The field technician cannot diagnose the issue alone. An AR remote session connects the technician with a product engineer. Together, they isolate the fault to a specific module and complete the repair. The documented session becomes training material for future similar issues.",
          },
        ],
      },
      {
        title: "Getting started with AR remote expert support",
        blocks: [
          {
            type: "paragraph",
            content:
              "If you are considering AR remote expert support, here is practical guidance to get started:",
          },
          {
            type: "unorderedList",
            items: [
              "Prerequisites: Identify the fault types, assets or situations where remote expert support would have the greatest impact on downtime or resolution quality.",
              "Pilot scope: Start with a defined set of equipment, sites or service contracts. Ensure you have experts available to participate in remote sessions.",
              "KPIs to track: Mean Time To Repair, First Time Right rate, number of avoided site visits, session duration, user satisfaction and knowledge reuse (cases converted to AR work instructions).",
              "Devices: AR remote support can run on smart glasses, tablets or smartphones. Smart glasses offer hands-free operation; tablets and phones work well for initial pilots.",
              "Change management: Train operators on when and how to start a session. Ensure experts understand the tools and protocols. Celebrate early wins and share success stories.",
            ],
          },
        ],
      },
      {
        title: "FAQ: AR remote expert support for corrective maintenance",
        blocks: [
          {
            type: "paragraph",
            content:
              "How quickly can a remote session be started? Most AR remote support platforms allow sessions to be started within seconds. Operators simply tap to connect with an available expert.",
          },
          {
            type: "paragraph",
            content:
              "What happens if the repair cannot be completed remotely? The session documentation—video, screenshots, annotations and notes—helps prepare an informed on-site visit or escalation, reducing wasted time and repeat troubleshooting.",
          },
          {
            type: "paragraph",
            content:
              "Can sessions be recorded for training or compliance? Yes. Most platforms support session recording, which can be used for training, root cause analysis or compliance documentation.",
          },
          {
            type: "paragraph",
            content:
              "How does AR remote support integrate with our existing systems? Many AR remote support tools integrate with CMMS, ticketing systems and knowledge bases—enabling case logging, routing and knowledge reuse.",
          },
          {
            type: "paragraph",
            content:
              "What connectivity is required? AR remote support works over Wi-Fi, cellular or even satellite connections. Video quality adapts to available bandwidth, ensuring sessions remain usable even in low-connectivity environments.",
          },
        ],
      },
      {
        title: "Next steps",
        blocks: [
          {
            type: "paragraph",
            content:
              "Ready to reduce downtime, scale expert support and resolve faults faster with AR remote expert support? ActARion helps industrial organisations connect field teams with specialists instantly, wherever they are.",
          },
          {
            type: "paragraph",
            content:
              "Schedule a discovery call to discuss your support challenges and see how AR remote expert support can fit your environment. No commitment—just a practical conversation about what is possible.",
          },
        ],
      },
    ],
    relatedBlogPosts: [
      { title: "AR remote expert support vs phone support: what changes in maintenance", slug: "ar-remote-expert-support-vs-phone-support-maintenance" },
      { title: "How to organise your remote expert pool for AR support", slug: "organise-remote-expert-pool-ar-support" },
      { title: "Reducing downtime with AR-guided remote troubleshooting", slug: "reducing-downtime-ar-guided-remote-troubleshooting" },
      { title: "What to measure in AR remote expert support pilots", slug: "what-to-measure-ar-remote-expert-support-pilots" },
    ],
  },
};

const deContent: UseCaseContentBySlug = {
  "ar-work-instructions-corporate-memory": {
    heroTitle: "AR-Arbeitsanweisungen und SOPs, um Unternehmenswissen zu bewahren",
    heroParagraphs: [
      "Wenn erfahrene Expertinnen und Experten das Unternehmen verlassen, nehmen sie oft jahrelanges Erfahrungswissen mit. Arbeitsanweisungen liegen verstreut in Ordnern, Notizbüchern und spontanen Shopfloor-Lösungen. Dadurch wird es für neue Mitarbeitende schwierig, schnell zu lernen und Aufgaben konsistent sowie sicher auszuführen.",
      "Mit AR-SOPs und KI- und AR-gestützten digitalen Arbeitsanweisungen von ActARion und DeepSight erfassen Sie Expertenwissen einmalig und verwandeln es in wiederverwendbare, visuelle Schritt-für-Schritt-Anleitungen, denen jede Bedienerin und jeder Bediener folgen kann.",
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
            content: "ActARion und DeepSight liefern KI- und AR-gestützte Arbeitsanweisungen, die Bedienende Schritt für Schritt unterstützen:",
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
      "Met AR-SOP's en AI en AR–geleide digitale werkinstructies van ActARion en DeepSight legt u expertise één keer vast en verandert u deze in herbruikbare, visuele instructies die iedere operator kan volgen.",
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
            content: "ActARion en DeepSight leveren AI en AR–geleide werkinstructies die operators stap voor stap helpen:",
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


