export interface UseCase {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export const useCases: UseCase[] = [
  {
    slug: "ar-work-instructions-corporate-memory",
    title: "AR work instructions and SOPs to preserve corporate memory",
    shortDescription:
      "Capture expert knowledge once and turn it into standardised AR work instructions and SOPs.",
    metaDescription:
      "Preserve corporate memory with AR work instructions and SOPs. Capture expert knowledge once, standardise procedures and give operators clear, digital guidance on the job.",
    heroImage: "/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png",
    heroImageAlt: "Operator following AR work instructions that capture and preserve corporate knowledge",
  },
  {
    slug: "ar-training-and-onboarding",
    title: "AR training and onboarding for industrial teams",
    shortDescription:
      "Guide new employees step by step with AR work instructions and shorten onboarding time.",
    metaDescription:
      "Shorten onboarding with AR training and onboarding. Use AR work instructions to guide new employees step by step, improve First Time Right and document compliance.",
    heroImage: "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png",
    heroImageAlt: "New technician being trained with AR-guided onboarding steps",
  },
  {
    slug: "ar-guided-assembly-production",
    title: "AR guided assembly for error free production",
    shortDescription:
      "Use AR to reduce errors, rework and recalls with visual guidance at the workstation.",
    metaDescription:
      "Use AR guided assembly to reduce errors, rework and recalls. Give operators visual work instructions at the workstation and build a complete, visual audit trail per product.",
    heroImage: "/images/usecases/ar-guided-assembly-for-error-free-production-hero.png",
    heroImageAlt: "Technician performing error-free assembly with AR-guided work instructions",
  },
  {
    slug: "ar-guided-changeover-batch-preparation",
    title: "AR guided changeover to reduce downtime",
    shortDescription:
      "Standardise changeovers with AR and avoid configuration errors between batches.",
    metaDescription:
      "Standardise changeovers with AR guided work instructions. Reduce changeover time, avoid configuration errors and combine guidance with remote expert support.",
    heroImage: "/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png",
    heroImageAlt: "Operator performing fast changeover using AR-guided changeover steps",
  },
  {
    slug: "ar-preventive-maintenance",
    title: "AR preventive maintenance with data driven insights",
    shortDescription:
      "Guide technicians in preventive maintenance and collect execution data automatically.",
    metaDescription:
      "Improve reliability with AR preventive maintenance. Guide technicians step by step, capture execution data automatically and use insights to optimise maintenance plans.",
    heroImage: "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png",
    heroImageAlt: "Technician performing preventive maintenance with AR data overlays",
  },
  {
    slug: "ar-remote-expert-support-corrective-maintenance",
    title: "AR remote expert support for corrective maintenance",
    shortDescription:
      "Resolve faults faster with live AR remote expert support and cut unplanned downtime.",
    metaDescription:
      "Resolve faults faster with AR remote expert support. Let experts see what operators see, guide repairs with visual annotations and cut unplanned downtime.",
    heroImage: "/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png",
    heroImageAlt: "Field technician receiving remote AR expert support during a repair",
  },
];

export const getUseCaseBySlug = (slug: string) =>
  useCases.find((useCase) => useCase.slug === slug);

