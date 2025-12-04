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
    // Legacy headers (deprecated - use roles/usecases instead)
    header1: "/images/roles/career-product-manager-hero2.png",
    header2: "/images/usecases/usecases-overview.png",
    header3: "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png",
    header4: "/images/roles/career-product-manager-hero2.png",
  },

  // ============================================================
  // ROLE IMAGES (for career pages and random headers)
  // ============================================================
  roles: {
    arDeveloperHero: "/images/roles/career-ar-developer-hero.png",
    productManagerHero: "/images/roles/career-product-manager-hero.png",
    productManagerHero2: "/images/roles/career-product-manager-hero2.png",
    salesEngineerHero: "/images/roles/career-sales-engineer-hero.png",
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
    header2: "/images/usecases/usecases-overview.png",
    header3: "/images/roles/career-product-manager-hero2.png",
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
    usecasesOverviewHero: "/images/usecases/usecases-overview.png",
    // Individual use case hero images
    arWorkInstructions: "/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png",
    arTraining: "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png",
    arAssembly: "/images/usecases/ar-guided-assembly-for-error-free-production-hero.png",
    arChangeover: "/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png",
    arMaintenance: "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png",
    arRemoteSupport: "/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png",
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

// Default fallback image (now uses role/usecase images)
export const DEFAULT_HEADER_IMAGE = images.roles.arDeveloperHero;

