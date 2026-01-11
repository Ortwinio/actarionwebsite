/**
 * YouTube video mappings for use case pages.
 * Keys must match the use case slugs used in /use-cases/[slug].
 * 
 * Canonical order:
 * 1. Onboarding & Training with AR SOPs
 * 2. AR-Guided Assembly
 * 3. AR-Guided Changeovers
 * 4. Preventive & Predictive Maintenance
 * 5. Remote Expert Support
 */
export const useCaseVideosBySlug: Record<string, { id: string; title: string }> = {
  // Use case 1: Onboarding & Training
  "ar-training-and-onboarding": {
    id: "2MRNjdKFTr0",
    title: "Onboarding & Training with AR SOPs",
  },

  // Use case 2: AR-Guided Assembly
  "ar-guided-assembly-production": {
    id: "Iyo4pX30VZA",
    title: "AR-Guided Assembly",
  },

  // Use case 3: AR-Guided Changeovers
  "ar-guided-changeover-batch-preparation": {
    id: "nsl48gIaaew",
    title: "AR-Guided Changeovers",
  },

  // Use case 4: Preventive & Predictive Maintenance
  "ar-preventive-maintenance": {
    id: "ts5sl85xEQg",
    title: "Preventive & Predictive Maintenance",
  },

  // Use case 5: Remote Expert Support
  "ar-remote-expert-support-corrective-maintenance": {
    id: "6OloDntjWjE",
    title: "Remote Expert Support",
  },
};
