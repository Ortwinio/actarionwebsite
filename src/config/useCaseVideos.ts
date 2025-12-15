/**
 * YouTube video mappings for use case pages.
 * Keys must match the use case slugs used in /use-cases/[slug].
 */
export const useCaseVideosBySlug: Record<string, { id: string; title: string }> = {
  // Use case 1: Corporate memory
  "ar-work-instructions-corporate-memory": {
    id: "Asbqj8w4obA",
    title: "Use case 1: Capturing corporate memory with AI & AR",
  },

  // Use case 2: Training and onboarding
  "ar-training-and-onboarding": {
    id: "2MRNjdKFTr0",
    title: "Use case 2: Training and onboarding faster & safer",
  },

  // Use case 3: Guided assembly
  "ar-guided-assembly-production": {
    id: "Iyo4pX30VZA",
    title: "Use case 3: Error-free assembly with AR work instructions",
  },

  // Use case 4: Changeover / batch preparation
  "ar-guided-changeover-batch-preparation": {
    id: "nsl48gIaaew",
    title: "Use case 4: Streamlining changeovers with AR-guided work instructions",
  },

  // Use case 5: Preventive maintenance
  "ar-preventive-maintenance": {
    id: "ts5sl85xEQg",
    title: "Use case 5: Data-driven preventive maintenance",
  },

  // Use case 6: Remote expert support / corrective maintenance
  "ar-remote-expert-support-corrective-maintenance": {
    id: "6OloDntjWjE",
    title: "Use case 6: Fast fault recovery with remote expert support",
  },
};
