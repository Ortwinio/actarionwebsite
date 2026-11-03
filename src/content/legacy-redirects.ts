/**
 * 301 map: old actarion.com paths (per locale, without the /{locale} prefix) → new route key.
 * Source: content overview §3.4 / §3.6 and the old site's navigation.
 * The full map of all ~149 old URLs (incl. blog posts) follows in the migration phase.
 */
export const legacyRedirects: Record<string, string> = {
  'use-cases/ar-training-and-onboarding': 'ucOnboarding',
  'use-cases/ar-guided-assembly-production': 'ucAssembly',
  'use-cases/ar-guided-changeover-batch-preparation': 'ucChangeover',
  'use-cases/ar-preventive-maintenance': 'ucMaintenance',
  'use-cases/ar-remote-expert-support-corrective-maintenance': 'ucRemote',
  'ar-training-and-onboarding': 'ucOnboarding',
  'ar-guided-assembly-production': 'ucAssembly',
  'ar-guided-changeover-batch-preparation': 'ucChangeover',
  'ar-preventive-maintenance': 'ucMaintenance',
  'ar-remote-expert-support-corrective-maintenance': 'ucRemote',
  'partners/apple-vision-pro': 'hwVisionPro',
  'partners/microsoft-hololens': 'hwHololens',
  'partners/google-xr': 'hwAndroidXr',
  'partner-contact': 'partnerBecome',
  services: 'solutions',
  about: 'company',
  vision: 'vision',
  management: 'team',
  career: 'careers',
  news: 'news',
  events: 'events',
  videos: 'videos',
  whitepapers: 'whitepapers',
  roi: 'roiCalculator',
  'start/roi-ai-ar-guided-work-instructions': 'roiCalculator',
  terms: 'terms',
  privacy: 'privacy',
};
