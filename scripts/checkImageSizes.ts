#!/usr/bin/env npx tsx
/**
 * Image Size Check Script for CI/CD
 * 
 * This script checks that images in /public don't exceed defined size thresholds.
 * Use in CI to catch oversized images before they're merged.
 * 
 * Exit codes:
 * - 0: All images pass
 * - 1: Found images exceeding thresholds
 * 
 * Run: npx tsx scripts/checkImageSizes.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Size thresholds in KB
// Note: Next.js will convert to WebP/AVIF at ~75% quality, reducing size by ~70-80%
// These thresholds apply to SOURCE files in /public
const THRESHOLDS = {
  error: 3000,   // Fail CI if any image > 3MB (would be ~600KB after optimization)
  warn: 1500,    // Warn if > 1.5MB
};

// Dimension thresholds
const MAX_WIDTH = 2000;  // Fail if wider than 2000px (hero images should be max 1600px)

// Files to skip
const SKIP_PATTERNS = [
  /node_modules/,
  /\.git/,
  /ActARion - Actarion use cases summary_files/,
  /\.mp4$/i,
  /\.webm$/i,
  /\.svg$/i,
];

interface ImageIssue {
  path: string;
  sizeKB: number;
  width?: number;
  height?: number;
  level: 'error' | 'warn';
  reason: string;
}

function getFileSizeKB(filePath: string): number {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function getImageDimensions(filePath: string): { width: number; height: number } | null {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}" 2>/dev/null`, {
      encoding: 'utf8',
    });
    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
    if (widthMatch && heightMatch) {
      return {
        width: parseInt(widthMatch[1], 10),
        height: parseInt(heightMatch[1], 10),
      };
    }
  } catch {
    // Ignore errors
  }
  return null;
}

function shouldSkip(filePath: string): boolean {
  return SKIP_PATTERNS.some(pattern => pattern.test(filePath));
}

function scanImages(dir: string, issues: ImageIssue[] = []): ImageIssue[] {
  if (!fs.existsSync(dir)) {
    return issues;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(PUBLIC_DIR, fullPath);
    
    if (shouldSkip(fullPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanImages(fullPath, issues);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
        continue;
      }
      
      const sizeKB = getFileSizeKB(fullPath);
      const dimensions = getImageDimensions(fullPath);
      
      // Check size threshold
      if (sizeKB > THRESHOLDS.error) {
        issues.push({
          path: relativePath,
          sizeKB,
          width: dimensions?.width,
          height: dimensions?.height,
          level: 'error',
          reason: `Size ${sizeKB}KB exceeds ${THRESHOLDS.error}KB limit`,
        });
      } else if (sizeKB > THRESHOLDS.warn) {
        issues.push({
          path: relativePath,
          sizeKB,
          width: dimensions?.width,
          height: dimensions?.height,
          level: 'warn',
          reason: `Size ${sizeKB}KB exceeds ${THRESHOLDS.warn}KB warning threshold`,
        });
      }
      
      // Check dimension threshold
      if (dimensions && dimensions.width > MAX_WIDTH) {
        // Don't duplicate if already added
        const existing = issues.find(i => i.path === relativePath);
        if (existing) {
          existing.reason += ` | Width ${dimensions.width}px exceeds ${MAX_WIDTH}px`;
        } else {
          issues.push({
            path: relativePath,
            sizeKB,
            width: dimensions.width,
            height: dimensions.height,
            level: 'error',
            reason: `Width ${dimensions.width}px exceeds ${MAX_WIDTH}px limit`,
          });
        }
      }
    }
  }
  
  return issues;
}

function main() {
  console.log('🔍 Checking image sizes in /public...\n');
  
  const issues = scanImages(PUBLIC_DIR);
  const errors = issues.filter(i => i.level === 'error');
  const warnings = issues.filter(i => i.level === 'warn');
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All images pass size checks!\n');
    process.exit(0);
  }
  
  if (errors.length > 0) {
    console.log('❌ ERRORS (must fix before merge):\n');
    for (const issue of errors) {
      console.log(`  ${issue.path}`);
      console.log(`    ${issue.reason}`);
      if (issue.width && issue.height) {
        console.log(`    Dimensions: ${issue.width}x${issue.height}`);
      }
      console.log();
    }
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (consider optimizing):\n');
    for (const issue of warnings.slice(0, 10)) {
      console.log(`  ${issue.path} (${issue.sizeKB}KB)`);
    }
    if (warnings.length > 10) {
      console.log(`  ... and ${warnings.length - 10} more warnings`);
    }
    console.log();
  }
  
  console.log('───────────────────────────────────────────────────────────────');
  console.log(`Total: ${errors.length} errors, ${warnings.length} warnings`);
  console.log('───────────────────────────────────────────────────────────────\n');
  
  if (errors.length > 0) {
    console.log('💡 To fix: Resize images to max 1600px width and use Next.js <Image> for optimization');
    console.log('   Run: npx tsx scripts/optimizeImages.ts\n');
    process.exit(1);
  }
  
  process.exit(0);
}

main();

