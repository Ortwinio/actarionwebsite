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
    header1: "/images/roles/career-product-manager-hero2.jpg",
    header2: "/images/usecases/usecases-overview.jpg",
    header3: "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.jpg",
    header4: "/images/roles/career-product-manager-hero2.jpg",
  },

  // ============================================================
  // ROLE IMAGES (for career pages and random headers)
  // ============================================================
  roles: {
    arDeveloperHero: "/images/roles/career-ar-developer-hero.jpg",
    productManagerHero: "/images/roles/career-product-manager-hero.jpg",
    productManagerHero2: "/images/roles/career-product-manager-hero2.jpg",
    salesEngineerHero: "/images/roles/career-sales-engineer-hero.jpg",
  },

  // ============================================================
  // LOGO & BRANDING
  // ============================================================
  branding: {
    logo: "/Actarionlogo.png",
    logoText: "/actariontextlogo.png",
  },

  // ============================================================
  // HOMEPAGE IMAGES
  // ============================================================
  homepage: {
    header2: "/images/usecases/usecases-overview.jpg",
    header3: "/images/roles/career-product-manager-hero2.jpg",
    vertical1: "/actarion vertical 1.jpg",
    vertical2: "/ActARion vertical 2.jpg",
    vertical3: "/ActARion vertical 3.jpg",
  },

  // ============================================================
  // 404 PAGE
  // ============================================================
  notFound: {
    header: "/404-header-actarion-ar-navigation.jpg",
  },

  // ============================================================
  // USE CASES OVERVIEW
  // ============================================================
  useCases: {
    overview: "/usecases-overview.jpg",
    usecasesOverviewHero: "/images/usecases/usecases-overview.jpg",
    // Individual use case hero images
    arWorkInstructions: "/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.jpg",
    arTraining: "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.jpg",
    arAssembly: "/images/usecases/ar-guided-assembly-for-error-free-production-hero.jpg",
    arChangeover: "/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.jpg",
    arMaintenance: "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.jpg",
    arRemoteSupport: "/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.jpg",
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
    arAiCaptureExpertKnowledge: "/blogs/ar-ai-capture-expert-knowledge.jpg",
    arOnboardingManufacturing: "/blogs/ar-onboarding-manufacturing-hero.jpg",
    arSopsAddedValue: "/blogs/ar-sops-added-value.jpg",
    arSopsNextFrontier: "/blogs/ar-sops-next-frontier.jpg",
    arTrainingRevolution: "/blogs/ar-training-revolution.png",
    deepSightAlternatives: "/blogs/deep-sight-alternatives-hero.jpg",
    futureOfWorkIndustrialTraining: "/blogs/future-of-work-industrial-training-hero.jpg",
    futureOfWork: "/blogs/future-of-work.png",
    hololensVsAppleVisionPro: "/blogs/hololens-vs-apple-vision-pro-ar-guidance.jpg",
    paperToArWorkflow: "/blogs/paper-to-ar-workflow-hero.jpg",
    partnershipDeepsight: "/blogs/partnership-deepsight-actarion.png",
    remoteExpertSupport: "/blogs/remote-expert-support-ar-hero.jpg",
    safetyComplianceAr: "/blogs/safety-compliance-ar.jpg",
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

