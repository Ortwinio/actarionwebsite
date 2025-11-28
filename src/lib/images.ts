/**
 * Central image configuration for the ActARion website.
 * 
 * This file maps all known image paths to ensure consistency and prevent
 * broken image references across the site.
 * 
 * Benefits:
 * - Single source of truth for image paths
 * - Easy to update when files are renamed
 * - TypeScript autocomplete for image keys
 * - Can be validated at build time
 */

export const images = {
  // ============================================================
  // HEADER IMAGES (page backgrounds)
  // ============================================================
  headers: {
    header1: "/headers/header-1.jpg",
    header2: "/headers/header-2.jpg",
    header3: "/headers/header-3.jpg",
    header4: "/headers/header-4.jpg",
  },

  // ============================================================
  // LOGO & BRANDING
  // ============================================================
  branding: {
    logo: "/actarionlogo.png",
    logoText: "/actariontextlogo.png",
    onepager: "/onepager.png",
  },

  // ============================================================
  // HOMEPAGE IMAGES
  // ============================================================
  homepage: {
    header2: "/actarion header2.png",
    header3: "/actarion header 3.png",
    vertical1: "/actarion vertical 1.png",
    vertical2: "/ActARion vertical 2.png",
    vertical3: "/ActARion vertical 3.png",
  },

  // ============================================================
  // 404 PAGE
  // ============================================================
  notFound: {
    header: "/404-header-actarion-ar-navigation.png",
  },

  // ============================================================
  // USE CASES OVERVIEW
  // ============================================================
  useCases: {
    overview: "/usecases-overview.png",
    // Individual use case hero images - COMMENTED OUT until files are added
    // To enable: create public/images/usecases/ directory and add the images
    // arWorkInstructions: "/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png",
    // arTraining: "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png",
    // arAssembly: "/images/usecases/ar-guided-assembly-for-error-free-production-hero.png",
    // arChangeover: "/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png",
    // arMaintenance: "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png",
    // arRemoteSupport: "/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png",
  },

  // ============================================================
  // TEAM / ABOUT
  // ============================================================
  team: {
    ortwin: "/Ortwin Vereck.png",
    marc: "/Marc Dercksen.png",
  },

  // ============================================================
  // BLOG IMAGES (existing in public/blogs/)
  // ============================================================
  blogs: {
    // Existing images
    arAiCaptureExpertKnowledge: "/blogs/ar-ai-capture-expert-knowledge.png",
    arOnboardingManufacturing: "/blogs/ar-onboarding-manufacturing-hero.png",
    arSopsAddedValue: "/blogs/ar-sops-added-value.png",
    arSopsNextFrontier: "/blogs/ar-sops-next-frontier.png",
    arTrainingRevolution: "/blogs/ar-training-revolution.png",
    deepSightAlternatives: "/blogs/deep-sight-alternatives-hero.png",
    futureOfWorkIndustrialTraining: "/blogs/future-of-work-industrial-training-hero.png",
    futureOfWork: "/blogs/future-of-work.png",
    hololensVsAppleVisionPro: "/blogs/hololens-vs-apple-vision-pro-ar-guidance.png",
    paperToArWorkflow: "/blogs/paper-to-ar-workflow-hero.png",
    partnershipDeepsight: "/blogs/partnership-deepsight-actarion.png",
    remoteExpertSupport: "/blogs/remote-expert-support-ar-hero.png",
    safetyComplianceAr: "/blogs/safety-compliance-ar.png",
    theFutureOfWork: "/blogs/the-future-of-work.png",
  },
} as const;

// Type for all image paths
export type ImagePath = typeof images[keyof typeof images][keyof typeof images[keyof typeof images]];

// Helper to get all image paths as a flat array (useful for validation)
export function getAllImagePaths(): string[] {
  const paths: string[] = [];
  
  for (const category of Object.values(images)) {
    for (const path of Object.values(category)) {
      paths.push(path);
    }
  }
  
  return paths;
}

// Default fallback image
export const DEFAULT_HEADER_IMAGE = images.headers.header1;

