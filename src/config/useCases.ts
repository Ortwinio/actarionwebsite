export interface UseCase {
  slug: string;
  title: string;
  /** Short SEO title for search results (max ~48 chars before suffix) */
  seoTitle?: string;
  /** One-line summary for overview cards */
  summary: string;
  /** Three bullet outcomes for overview cards */
  outcomes: string[];
  shortDescription: string;
  metaDescription: string;
  /** Optional hero image for the use case detail page */
  heroImage?: string;
  /** Alt text for the hero image */
  heroImageAlt?: string;
}

/**
 * Canonical use-case list with standardized titles and order.
 * 
 * Order:
 * 1. Onboarding & Training with AR SOPs
 * 2. AR-Guided Assembly
 * 3. AR-Guided Changeovers
 * 4. Preventive & Predictive Maintenance
 * 5. Remote Expert Support
 */
export const useCases: UseCase[] = [
  {
    slug: "ar-training-and-onboarding",
    title: "Onboarding & Training with AR SOPs",
    seoTitle: "AR Onboarding & Training",
    summary: "Capture expert knowledge and train operators on the job with step-by-step AR SOPs.",
    outcomes: [
      "Reduce time-to-competence for new hires and role changes",
      "Increase first-time-right execution on standard work",
      "Reduce dependency on a few experienced people",
    ],
    shortDescription:
      "Guide new employees step by step with AR work instructions and shorten onboarding time.",
    metaDescription:
      "Shorten onboarding with AR training. Use AR work instructions to guide new employees step by step, improve first-time-right and document compliance.",
  },
  {
    slug: "ar-guided-assembly-production",
    title: "AR-Guided Assembly",
    seoTitle: "AR-Guided Assembly",
    summary: "Support complex assembly and installation tasks with clear, visual guidance at the point of work.",
    outcomes: [
      "Reduce assembly errors and rework",
      "Improve consistency across shifts and sites",
      "Shorten ramp-up time for new variants",
    ],
    shortDescription:
      "Use AR to reduce errors, rework and recalls with visual guidance at the workstation.",
    metaDescription:
      "Use AR guided assembly to reduce errors, rework and recalls. Give operators visual work instructions at the workstation and build a complete audit trail.",
  },
  {
    slug: "ar-guided-changeover-batch-preparation",
    title: "AR-Guided Changeovers",
    seoTitle: "AR-Guided Changeovers",
    summary: "Standardize changeovers and batch preparation to reduce setup time and avoid mistakes under time pressure.",
    outcomes: [
      "Reduce changeover duration and variability",
      "Avoid quality losses during batch prep",
      "Improve line availability and throughput",
    ],
    shortDescription:
      "Standardise changeovers with AR and avoid configuration errors between batches.",
    metaDescription:
      "Standardise changeovers with AR guided work instructions. Reduce changeover time, avoid configuration errors and combine guidance with remote expert support.",
  },
  {
    slug: "ar-preventive-maintenance",
    title: "Preventive & Predictive Maintenance",
    seoTitle: "AR Preventive Maintenance",
    summary: "Execute planned maintenance with guided steps and evidence of work completion.",
    outcomes: [
      "Improve maintenance quality and repeatability",
      "Reduce missed steps and compliance risks",
      "Increase equipment availability",
    ],
    shortDescription:
      "Guide technicians in preventive maintenance and collect execution data automatically.",
    metaDescription:
      "Improve reliability with AR preventive maintenance. Guide technicians step by step, capture execution data automatically and optimise maintenance plans.",
  },
  {
    slug: "ar-remote-expert-support-corrective-maintenance",
    title: "Remote Expert Support",
    seoTitle: "AR Remote Expert Support",
    summary: "Resolve breakdowns faster by connecting frontline teams to remote experts using AR-based assistance.",
    outcomes: [
      "Reduce troubleshooting time and MTTR",
      "Lower travel and escalation costs",
      "Keep production moving during critical incidents",
    ],
    shortDescription:
      "Resolve faults faster with live AR remote expert support and cut unplanned downtime.",
    metaDescription:
      "Resolve faults faster with AR remote expert support. Let experts see what operators see, guide repairs with visual annotations and cut unplanned downtime.",
  },
];

export const getUseCaseBySlug = (slug: string) =>
  useCases.find((useCase) => useCase.slug === slug);

/**
 * Deprecated slugs that should redirect to the canonical use cases.
 * Used for 301 redirects in next.config.ts
 */
export const deprecatedUseCaseSlugs = [
  {
    oldSlug: "ar-work-instructions-corporate-memory",
    newSlug: "ar-training-and-onboarding",
  },
];