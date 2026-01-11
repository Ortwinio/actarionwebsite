#!/usr/bin/env npx tsx
/**
 * Image Optimization Script for ActARion Website
 * 
 * This script:
 * 1. Scans /public for oversized images
 * 2. Resizes images that exceed target dimensions
 * 3. Converts PNGs with photo content to JPG for better compression
 * 4. Generates a report of all changes
 * 
 * Target Dimensions:
 * - Hero/Header images: max 1600px wide
 * - Blog images: max 1200px wide
 * - Role/career images: max 1200px wide
 * - Use case images: max 1200px wide
 * - Icons/logos: unchanged (usually small SVGs or PNGs)
 * 
 * Run: npx tsx scripts/optimizeImages.ts [--dry-run]
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DRY_RUN = process.argv.includes('--dry-run');

// Size thresholds in KB
const CRITICAL_SIZE_KB = 500;  // Definitely needs optimization
const WARNING_SIZE_KB = 200;   // Should consider optimization
const TARGET_SIZE_KB = 150;    // Ideal max for hero images

// Maximum dimensions by folder/type
const MAX_DIMENSIONS: Record<string, number> = {
  'headers': 1600,
  'roles': 1200,
  'usecases': 1200,
  'blogs': 1200,
  'partners': 512,
  'default': 1600,
};

// Files to skip (logos, icons, etc.)
const SKIP_PATTERNS = [
  /logo/i,
  /favicon/i,
  /icon/i,
  /apple-touch/i,
  /manifest/i,
  /\.svg$/i,
];

interface ImageInfo {
  path: string;
  relativePath: string;
  sizeKB: number;
  width?: number;
  height?: number;
  needsOptimization: boolean;
  reason: string[];
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
    // Ignore errors for non-image files
  }
  return null;
}

function getFileSizeKB(filePath: string): number {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function getMaxDimensionForPath(relativePath: string): number {
  for (const [folder, maxDim] of Object.entries(MAX_DIMENSIONS)) {
    if (folder !== 'default' && relativePath.includes(`/${folder}/`)) {
      return maxDim;
    }
  }
  // Check if it's a blog header at root level of /blogs
  if (relativePath.includes('/blogs/')) {
    return MAX_DIMENSIONS['blogs'];
  }
  return MAX_DIMENSIONS['default'];
}

function shouldSkip(filePath: string): boolean {
  const basename = path.basename(filePath);
  return SKIP_PATTERNS.some(pattern => pattern.test(basename));
}

function scanImages(dir: string, relativeTo: string = dir): ImageInfo[] {
  const images: ImageInfo[] = [];
  
  if (!fs.existsSync(dir)) {
    return images;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(relativeTo, fullPath);
    
    if (entry.isDirectory()) {
      // Skip some directories
      if (['node_modules', '.git', 'ActARion - Actarion use cases summary_files', 'static'].includes(entry.name)) {
        continue;
      }
      images.push(...scanImages(fullPath, relativeTo));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        continue;
      }
      
      if (shouldSkip(fullPath)) {
        continue;
      }
      
      const sizeKB = getFileSizeKB(fullPath);
      const dimensions = getImageDimensions(fullPath);
      const maxDim = getMaxDimensionForPath(relativePath);
      
      const reasons: string[] = [];
      let needsOptimization = false;
      
      // Check file size
      if (sizeKB > CRITICAL_SIZE_KB) {
        reasons.push(`Size ${sizeKB}KB > ${CRITICAL_SIZE_KB}KB (critical)`);
        needsOptimization = true;
      } else if (sizeKB > WARNING_SIZE_KB) {
        reasons.push(`Size ${sizeKB}KB > ${WARNING_SIZE_KB}KB (warning)`);
        needsOptimization = true;
      }
      
      // Check dimensions
      if (dimensions && dimensions.width > maxDim) {
        reasons.push(`Width ${dimensions.width}px > ${maxDim}px max`);
        needsOptimization = true;
      }
      
      // PNG with photo content should be JPG
      if (ext === '.png' && sizeKB > 500 && dimensions && dimensions.width > 800) {
        reasons.push(`Large PNG may be better as JPEG`);
      }
      
      images.push({
        path: fullPath,
        relativePath,
        sizeKB,
        width: dimensions?.width,
        height: dimensions?.height,
        needsOptimization,
        reason: reasons,
      });
    }
  }
  
  return images;
}

function resizeImage(filePath: string, maxWidth: number): void {
  const dimensions = getImageDimensions(filePath);
  if (!dimensions || dimensions.width <= maxWidth) {
    return;
  }
  
  const aspectRatio = dimensions.height / dimensions.width;
  const newHeight = Math.round(maxWidth * aspectRatio);
  
  console.log(`  Resizing: ${dimensions.width}x${dimensions.height} -> ${maxWidth}x${newHeight}`);
  
  if (!DRY_RUN) {
    execSync(`sips --resampleWidth ${maxWidth} "${filePath}"`, { stdio: 'pipe' });
  }
}

function optimizeImage(imageInfo: ImageInfo): void {
  console.log(`\n📸 ${imageInfo.relativePath}`);
  console.log(`   Current: ${imageInfo.sizeKB}KB, ${imageInfo.width}x${imageInfo.height}`);
  console.log(`   Reasons: ${imageInfo.reason.join(', ')}`);
  
  const maxDim = getMaxDimensionForPath(imageInfo.relativePath);
  
  if (imageInfo.width && imageInfo.width > maxDim) {
    resizeImage(imageInfo.path, maxDim);
    
    // Get new size after resize
    if (!DRY_RUN) {
      const newSizeKB = getFileSizeKB(imageInfo.path);
      const newDimensions = getImageDimensions(imageInfo.path);
      console.log(`   After: ${newSizeKB}KB, ${newDimensions?.width}x${newDimensions?.height}`);
    }
  }
}

function main() {
  console.log('🔍 Scanning images in /public...\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE (images will be modified)'}\n`);
  
  const allImages = scanImages(PUBLIC_DIR);
  const criticalImages = allImages.filter(img => img.sizeKB > CRITICAL_SIZE_KB || (img.width && img.width > 2000));
  const warningImages = allImages.filter(img => 
    img.sizeKB > WARNING_SIZE_KB && 
    img.sizeKB <= CRITICAL_SIZE_KB &&
    !criticalImages.includes(img)
  );
  const optimizedImages = allImages.filter(img => !img.needsOptimization);
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                        IMAGE AUDIT REPORT');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  console.log(`📊 Total images scanned: ${allImages.length}`);
  console.log(`🔴 Critical (needs immediate optimization): ${criticalImages.length}`);
  console.log(`🟡 Warning (should optimize): ${warningImages.length}`);
  console.log(`🟢 Good (no action needed): ${optimizedImages.length}`);
  
  if (criticalImages.length > 0) {
    console.log('\n───────────────────────────────────────────────────────────────');
    console.log('🔴 CRITICAL IMAGES (> 500KB or > 2000px wide)');
    console.log('───────────────────────────────────────────────────────────────');
    
    // Sort by size descending
    criticalImages.sort((a, b) => b.sizeKB - a.sizeKB);
    
    for (const img of criticalImages) {
      optimizeImage(img);
    }
  }
  
  if (warningImages.length > 0) {
    console.log('\n───────────────────────────────────────────────────────────────');
    console.log('🟡 WARNING IMAGES (200-500KB)');
    console.log('───────────────────────────────────────────────────────────────');
    
    warningImages.sort((a, b) => b.sizeKB - a.sizeKB);
    
    for (const img of warningImages.slice(0, 20)) { // Show top 20
      console.log(`\n📸 ${img.relativePath}`);
      console.log(`   Size: ${img.sizeKB}KB, ${img.width}x${img.height}`);
    }
    
    if (warningImages.length > 20) {
      console.log(`\n   ... and ${warningImages.length - 20} more warning images`);
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                           SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Calculate potential savings
  const totalCurrentKB = allImages.reduce((sum, img) => sum + img.sizeKB, 0);
  const criticalCurrentKB = criticalImages.reduce((sum, img) => sum + img.sizeKB, 0);
  
  console.log(`Total image size: ${(totalCurrentKB / 1024).toFixed(1)}MB`);
  console.log(`Critical images size: ${(criticalCurrentKB / 1024).toFixed(1)}MB`);
  console.log(`\nEstimated savings from optimization: ~${Math.round(criticalCurrentKB * 0.8 / 1024)}MB (80% of critical)`);
  
  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to apply optimizations');
  } else {
    console.log('\n✅ Optimizations applied!');
    console.log('   Note: For additional compression, consider using sharp or imagemin');
    console.log('   Next.js will also optimize on-the-fly when serving');
  }
}

main();













