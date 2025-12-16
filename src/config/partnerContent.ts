export interface PartnerSection {
  title: string;
  items: string[];
}

export interface PartnerContent {
  slug: string;
  headline: string;
  intro: string[];
  sections: PartnerSection[];
  useCases?: {
    title: string;
    items: string[];
  };
  cta: {
    text: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const partnerContent: PartnerContent[] = [
  {
    slug: "deepsight",
    headline: "DeepSight – AI and AR–guided work instructions platform",
    intro: [
      "ActARion is the European partner of DeepSight, an AR-first connected worker platform for creating and deploying AI and AR–guided work instructions, training scenarios and remote support for industrial teams.",
      "Together we help organisations move from static manuals and video to interactive AR SOPs and digital work instructions on mobile devices and smart glasses.",
    ],
    sections: [
      {
        title: "What DeepSight brings",
        items: [
          "No-code authoring environment to build step-by-step AR SOPs, 3D procedures and training scenarios without programming.",
          "Centralised digital library for work instructions, troubleshooting flows and safety procedures.",
          "Cross-platform player to deploy digital work instructions on smartphones, tablets, Apple Vision Pro, HoloLens 2 and other supported devices.",
          "Integrated data capture: task completion times, quiz results, photos, videos and operator feedback.",
          "Rapid product evolution with frequent feature updates and roadmap driven by real-world use in industry.",
        ],
      },
      {
        title: "What the ActARion + DeepSight partnership enables",
        items: [
          "Faster onboarding and skills development by putting AI and AR–guided work instructions directly in the hands of technicians and operators.",
          "Safer, more consistent execution of complex tasks by guiding each step in the real environment with AR SOPs.",
          "Better knowledge capture and continuous improvement by turning expert know-how into reusable digital work instructions.",
          "Connected workers across plants and shifts through remote expert support and shared troubleshooting content.",
        ],
      },
    ],
    useCases: {
      title: "Typical joint use cases for AI and AR–guided work instructions",
      items: [
        "AR-guided assembly for error-free production.",
        "AR-guided changeovers to reduce downtime.",
        "AR-supported preventive maintenance based on data-driven insights.",
        "Remote expert support for corrective maintenance.",
        "AR training and onboarding for new team members.",
        "AR SOPs and digital work instructions that preserve corporate memory.",
      ],
    },
    cta: {
      text: "If you want to explore how DeepSight and ActARion can support your operations, training or maintenance processes with AI and AR–guided work instructions, contact us for a short, non-committal discovery call.",
      buttonText: "Contact ActARion",
      buttonHref: "contact",
    },
  },
  {
    slug: "apple-vision-pro",
    headline: "Apple Vision Pro – spatial computing for industrial AR",
    intro: [
      "Apple Vision Pro is one of our key hardware platforms for delivering immersive AR experiences to technicians, engineers and trainers.",
      "Combined with DeepSight and ActARion's implementation expertise, Apple Vision Pro becomes a practical tool for AR SOPs, digital work instructions and remote support.",
    ],
    sections: [
      {
        title: "Why Apple Vision Pro for industrial workflows",
        items: [
          "High-resolution displays and precise spatial tracking help overlay instructions and 3D models directly on machines and equipment.",
          "Comfortable design for longer sessions in training rooms, control rooms and selected operational environments.",
          "Integration with the broader Apple ecosystem (device management, security, apps) simplifies deployment in enterprise settings.",
        ],
      },
      {
        title: "How ActARion uses Apple Vision Pro",
        items: [
          "Running DeepSight-based AI and AR–guided work instructions for assembly, inspection and training scenarios.",
          "Visualising 3D models and exploded views of components to support troubleshooting and learning.",
          "Creating safe, controlled training experiences where operators can rehearse critical procedures step by step.",
        ],
      },
    ],
    cta: {
      text: "Interested in seeing AR instructions on Apple Vision Pro in action? Schedule a demo with ActARion.",
      buttonText: "Schedule a demo",
      buttonHref: "demo",
    },
  },
  {
    slug: "microsoft-hololens",
    headline: "Microsoft HoloLens – mixed reality for hands-on work",
    intro: [
      "Microsoft HoloLens is a proven mixed-reality headset for hands-free work in industrial environments.",
      "As an ActARion partner, HoloLens complements our AI and AR-guided work instructions for scenarios where technicians need both hands free.",
    ],
    sections: [
      {
        title: "Why HoloLens for industrial teams",
        items: [
          "Fully untethered headset with see-through holographic overlays in the real environment.",
          "Designed for use in industrial spaces where hands-free guidance is essential.",
          "Strong enterprise ecosystem with identity, security and device management.",
        ],
      },
      {
        title: "How ActARion integrates HoloLens",
        items: [
          "Delivering DeepSight digital work instructions directly on HoloLens for assembly, inspections and maintenance.",
          "Combining holographic instructions with on-device data capture (photos, video, confirmations).",
          "Enabling remote expert support sessions where experts see what the technician sees.",
        ],
      },
    ],
    cta: {
      text: "Want to discuss when HoloLens vs. other devices (tablets, Apple Vision Pro) is the right choice for your processes? Let's talk.",
      buttonText: "Contact ActARion",
      buttonHref: "contact",
    },
  },
  {
    slug: "google-xr",
    headline: "Google – XR technologies for AR in the field",
    intro: [
      "Google's XR technologies provide a foundation for AR experiences on Android-based devices and future XR hardware.",
      "For organisations with strong Android fleets, Google's ecosystem is an important building block in our device strategy.",
    ],
    sections: [
      {
        title: "What Google's XR ecosystem offers",
        items: [
          "AR capabilities on Android devices used by many field and service teams.",
          "Tools and frameworks that support spatial understanding and AR overlays.",
          "Flexibility to run AR-guided workflows on smartphones and tablets in the field.",
        ],
      },
      {
        title: "How ActARion leverages Google XR",
        items: [
          "Deploying AI and AR-guided work instructions on Android devices used by technicians and operators.",
          "Supporting hybrid device fleets where some teams use smartphones or tablets and others use head-mounted displays.",
          "Ensuring consistent content and data capture across devices.",
        ],
      },
    ],
    cta: {
      text: "Interested in a device strategy that combines Android, Apple Vision Pro and HoloLens? Contact ActARion to discuss your options.",
      buttonText: "Contact ActARion",
      buttonHref: "contact",
    },
  },
  {
    slug: "potentify",
    headline: "Potentify – HR implementation partner for learning and skills",
    intro: [
      "Potentify is our HR-focused implementation partner. Together we connect AI and AR-guided work instructions with HR, learning and talent strategies.",
      "This partnership is ideal for organisations that want to link AR training and SOPs directly to skills, roles and career paths.",
    ],
    sections: [
      {
        title: "What Potentify brings",
        items: [
          "Expertise in HR, learning design and performance management.",
          "Experience in designing competency frameworks and skills matrices.",
          "Practical support in aligning digital work instructions with onboarding, upskilling and compliance.",
        ],
      },
      {
        title: "What the partnership enables",
        items: [
          "Designing AR-enabled onboarding journeys that shorten time-to-competence.",
          "Linking training data from AR workflows to HR systems and learning records.",
          "Creating continuous learning paths that combine on-the-job AR guidance with formal training.",
        ],
      },
    ],
    useCases: {
      title: "Typical joint projects",
      items: [
        "HR-driven roll-out of AR onboarding for new technicians.",
        "Programmes to reskill existing teams for new equipment, product lines or safety standards.",
        "Skills and certification programmes that use AR tasks as evidence.",
      ],
    },
    cta: {
      text: "Are you an HR leader or L&D professional looking for HR-driven AR implementations? Schedule a conversation with ActARion and Potentify.",
      buttonText: "Contact ActARion",
      buttonHref: "contact",
    },
  },
  {
    slug: "simply-change",
    headline: "Simply Change – implementation partner for FMCG and change",
    intro: [
      "Simply Change is our change-management and implementation partner with strong experience in FMCG and operational transformation.",
      "Together we ensure that AI and AR solutions are not only piloted but embedded in daily work at scale.",
    ],
    sections: [
      {
        title: "What Simply Change brings",
        items: [
          "Expertise in change management, stakeholder engagement and communication.",
          "Experience with FMCG environments where speed, quality and compliance are critical.",
          "Practical tools and coaching to support supervisors and team leads during roll-out.",
        ],
      },
      {
        title: "What the partnership enables",
        items: [
          "Structured roll-out of AR work instructions across multiple plants or warehouses.",
          "Alignment of SOPs, roles and responsibilities so that new ways of working stick.",
          "Clear measurement of adoption and impact, from error reductions to training time.",
        ],
      },
    ],
    useCases: {
      title: "Typical joint projects",
      items: [
        "Rolling out AR-guided changeovers and setup procedures across FMCG production lines.",
        "Introducing AR-based work instructions in warehouses and logistics operations.",
        "Supporting continuous improvement programmes where AR data feeds into improvement cycles.",
      ],
    },
    cta: {
      text: "Are you an operations, quality or change leader in FMCG or a related sector? Contact ActARion and Simply Change for a joint discovery workshop.",
      buttonText: "Contact ActARion",
      buttonHref: "contact",
    },
  },
];

export const getPartnerContentBySlug = (slug: string): PartnerContent | undefined =>
  partnerContent.find((content) => content.slug === slug);


