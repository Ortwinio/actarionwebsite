/**
 * Image Validation Script
 * 
 * This script checks that all image paths referenced in the codebase
 * actually exist in the public folder.
 * 
 * Run with: npx ts-node scripts/checkImages.ts
 * Or add to package.json: "check:images": "ts-node scripts/checkImages.ts"
 */

import * as fs from 'fs';
import * as path from 'path';

// Import the centralized image config
// Note: This path is relative to the scripts folder
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Known image paths from the codebase
const knownImagePaths = {
  // Header images
  headers: [
    '/headers/header-1.jpg',
    '/headers/header-2.jpg',
    '/headers/header-3.jpg',
    '/headers/header-4.jpg',
  ],

  // Logo and branding
  branding: [
    '/Actarionlogo.png',
    '/actariontextlogo.png',
  ],

  // Homepage images
  homepage: [
    '/actarion-header-2.png',
    '/actarion-header-3.png',
    '/usecases-overview.png',
  ],

  // 404 page
  notFound: [
    '/404-header-actarion-ar-navigation.png',
  ],

  // Team images
  team: [
    '/Ortwin Vereck.png',
    '/Marc Dercksen.png',
  ],

  // Use case overview image (individual use case images not yet added)
  useCases: [
    '/usecases-overview.png',
    // Future: add individual use case hero images to public/images/usecases/
    // '/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png',
    // '/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png',
    // '/images/usecases/ar-guided-assembly-for-error-free-production-hero.png',
    // '/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png',
    // '/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png',
    // '/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png',
  ],

  // Blog images (existing)
  blogsExisting: [
    '/blogs/ar-ai-capture-expert-knowledge.png',
    '/blogs/ar-onboarding-manufacturing-hero.png',
    '/blogs/ar-sops-added-value.png',
    '/blogs/ar-sops-next-frontier.png',
    '/blogs/ar-training-revolution.png',
    '/blogs/deep-sight-alternatives-hero.png',
    '/blogs/future-of-work-industrial-training-hero.png',
    '/blogs/future-of-work.png',
    '/blogs/hololens-vs-apple-vision-pro-ar-guidance.png',
    '/blogs/paper-to-ar-workflow-hero.png',
    '/blogs/partnership-deepsight-actarion.png',
    '/blogs/remote-expert-support-ar-hero.png',
    '/blogs/safety-compliance-ar.png',
    '/blogs/the-future-of-work.png',
  ],

  // Blog images (referenced but missing)
  blogsMissing: [
    '/blogs/ai-photos-videos-multilingual-instructions-hero.png',
    '/blogs/ar-hardware-smart-glasses-tablets-smartphones-hero.png',
    '/blogs/ar-in-logistics-guided-picking-packing-loading.png',
    '/blogs/ar-sops-manufacturing-audits-hero.png',
    '/blogs/ar-training-design-hero.png',
    '/blogs/ar-work-instructions-high-risk-hero.png',
    '/blogs/connected-worker-platform-vs-traditional-lms.png',
    '/blogs/digital-library-work-safety-instructions-hero.png',
    '/blogs/error-free-assembly-ar-hero.png',
    '/blogs/field-service-ar-checklists-energy-utilities-hero.png',
    '/blogs/industrial-ar-adoption-visionpro-hololens-mobile-hero.png',
    '/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png',
    '/blogs/instruction-formats-safety-quality-hero.png',
    '/blogs/measure-roi-ar-ai-work-instructions-hero.png',
    '/blogs/mixed-reality-shutdown-turnaround-hero.png',
    '/blogs/tracking-skills-ar-compliance-hero.png',
  ],
};

interface CheckResult {
  path: string;
  exists: boolean;
  category: string;
}

function checkImageExists(imagePath: string): boolean {
  const fullPath = path.join(publicDir, imagePath);
  return fs.existsSync(fullPath);
}

function checkAllImages(): void {
  console.log('=' .repeat(80));
  console.log('IMAGE VALIDATION REPORT');
  console.log('=' .repeat(80));
  console.log(`\nChecking images in: ${publicDir}\n`);

  const results: CheckResult[] = [];
  let totalMissing = 0;
  let totalFound = 0;

  for (const [category, paths] of Object.entries(knownImagePaths)) {
    console.log(`\n--- ${category.toUpperCase()} ---`);
    
    for (const imagePath of paths) {
      const exists = checkImageExists(imagePath);
      results.push({ path: imagePath, exists, category });
      
      if (exists) {
        console.log(`  ✅ ${imagePath}`);
        totalFound++;
      } else {
        console.log(`  ❌ ${imagePath}`);
        totalMissing++;
      }
    }
  }

  // Summary
  console.log('\n' + '=' .repeat(80));
  console.log('SUMMARY');
  console.log('=' .repeat(80));
  console.log(`\n  Total images checked: ${totalFound + totalMissing}`);
  console.log(`  ✅ Found: ${totalFound}`);
  console.log(`  ❌ Missing: ${totalMissing}`);

  // Group missing by category
  if (totalMissing > 0) {
    console.log('\n' + '=' .repeat(80));
    console.log('MISSING IMAGES BY CATEGORY');
    console.log('=' .repeat(80));

    const missingByCategory: Record<string, string[]> = {};
    for (const result of results) {
      if (!result.exists) {
        if (!missingByCategory[result.category]) {
          missingByCategory[result.category] = [];
        }
        missingByCategory[result.category].push(result.path);
      }
    }

    for (const [category, paths] of Object.entries(missingByCategory)) {
      console.log(`\n  ${category}: ${paths.length} missing`);
      for (const p of paths) {
        console.log(`    - ${p}`);
      }
    }

    // Exit with error code if there are critical missing images
    const criticalCategories = ['headers', 'branding', 'homepage', 'notFound'];
    const hasCriticalMissing = results.some(
      r => !r.exists && criticalCategories.includes(r.category)
    );

    if (hasCriticalMissing) {
      console.log('\n⚠️  CRITICAL: Some essential images are missing!');
      process.exit(1);
    }
  }

  console.log('\n');
}

// Run the check
checkAllImages();

