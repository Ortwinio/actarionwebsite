// src/lib/headerImages.ts

// Role header images
export const ROLE_HEADER_IMAGES = [
  "/images/roles/career-ar-developer-hero.png",
  "/images/roles/career-product-manager-hero.png",
  "/images/roles/career-product-manager-hero2.png",
  "/images/roles/career-sales-engineer-hero.png",
];

// Use case header images
export const USECASE_HEADER_IMAGES = [
  "/images/usecases/ar-guided-assembly-for-error-free-production-hero.png",
  "/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png",
  "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png",
  "/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png",
  "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png",
  "/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png",
  "/images/usecases/usecases-overview.png",
];

export const ALL_HEADER_IMAGES = [
  ...ROLE_HEADER_IMAGES,
  ...USECASE_HEADER_IMAGES,
];

const DEFAULT_FALLBACK =
  ALL_HEADER_IMAGES[0] ||
  "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png";

export function getRandomHeaderImage(): string {
  if (!ALL_HEADER_IMAGES.length) {
    return DEFAULT_FALLBACK;
  }
  const index = Math.floor(Math.random() * ALL_HEADER_IMAGES.length);
  return ALL_HEADER_IMAGES[index];
}
