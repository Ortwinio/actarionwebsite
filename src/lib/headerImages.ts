// src/lib/headerImages.ts

// Role header images
export const ROLE_HEADER_IMAGES = [
  "/images/roles/career-ar-developer-hero.jpg",
  "/images/roles/career-product-manager-hero.jpg",
  "/images/roles/career-product-manager-hero2.jpg",
  "/images/roles/career-sales-engineer-hero.jpg",
];

// Use case header images
export const USECASE_HEADER_IMAGES = [
  "/images/usecases/ar-guided-assembly-for-error-free-production-hero.jpg",
  "/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.jpg",
  "/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.jpg",
  "/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.jpg",
  "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.jpg",
  "/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.jpg",
  "/images/usecases/usecases-overview.jpg",
];

export const ALL_HEADER_IMAGES = [
  ...ROLE_HEADER_IMAGES,
  ...USECASE_HEADER_IMAGES,
];

const DEFAULT_FALLBACK =
  ALL_HEADER_IMAGES[0] ||
  "/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.jpg";

export function getRandomHeaderImage(): string {
  if (!ALL_HEADER_IMAGES.length) {
    return DEFAULT_FALLBACK;
  }
  const index = Math.floor(Math.random() * ALL_HEADER_IMAGES.length);
  return ALL_HEADER_IMAGES[index];
}
