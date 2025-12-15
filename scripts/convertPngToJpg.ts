#!/usr/bin/env npx tsx
/**
 * PNG to JPG Conversion Script
 * 
 * Converts large PNG photos to JPEG format for better compression.
 * Only converts PNGs that are:
 * - Larger than 1MB
 * - Not logos, icons, or graphics with transparency
 * 
 * Run: npx tsx scripts/convertPngToJpg.ts [--dry-run]
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DRY_RUN = process.argv.includes('--dry-run');
const SIZE_THRESHOLD_KB = 1000; // 1MB - only convert files larger than this
const JPEG_QUALITY = 85; // JPEG quality (0-100)

// Files to skip (logos, icons, etc.)
const SKIP_PATTERNS = [
  /logo/i,
  /favicon/i,
  /icon/i,
  /apple-touch/i,
  /manifest/i,
  /badge/i,
  /button/i,
  /ui-/i,
];

interface PngInfo {
  path: string;
  relativePath: string;
  sizeKB: number;
  hasTransparency: boolean;
}

function getFileSizeKB(filePath: string): number {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function shouldSkip(filePath: string): boolean {
  const basename = path.basename(filePath).toLowerCase();
  return SKIP_PATTERNS.some(pattern => pattern.test(basename));
}

function checkTransparency(filePath: string): boolean {
  try {
    // Use sips to check for alpha channel
    const output = execSync(`sips -g hasAlpha "${filePath}" 2>/dev/null`, {
      encoding: 'utf8',
    });
    return output.includes('hasAlpha: yes');
  } catch {
    return false;
  }
}

function convertToJpg(pngPath: string): { success: boolean; newSizeKB?: number; jpgPath?: string } {
  const jpgPath = pngPath.replace(/\.png$/i, '.jpg');
  
  try {
    // Convert PNG to JPG using sips
    execSync(`sips -s format jpeg -s formatOptions ${JPEG_QUALITY} "${pngPath}" --out "${jpgPath}" 2>/dev/null`, {
      stdio: 'pipe',
    });
    
    const newSizeKB = getFileSizeKB(jpgPath);
    return { success: true, newSizeKB, jpgPath };
  } catch (error) {
    console.error(`  ❌ Failed to convert: ${error}`);
    return { success: false };
  }
}

function scanPngs(dir: string, relativeTo: string = dir): PngInfo[] {
  const pngs: PngInfo[] = [];
  
  if (!fs.existsSync(dir)) {
    return pngs;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(relativeTo, fullPath);
    
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'ActARion - Actarion use cases summary_files', 'static'].includes(entry.name)) {
        continue;
      }
      pngs.push(...scanPngs(fullPath, relativeTo));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      if (shouldSkip(fullPath)) {
        continue;
      }
      
      const sizeKB = getFileSizeKB(fullPath);
      
      // Only consider large PNGs
      if (sizeKB >= SIZE_THRESHOLD_KB) {
        const hasTransparency = checkTransparency(fullPath);
        pngs.push({
          path: fullPath,
          relativePath,
          sizeKB,
          hasTransparency,
        });
      }
    }
  }
  
  return pngs;
}

function updateCodeReferences(oldPath: string, newPath: string): void {
  // Get relative paths for code replacement
  const oldRelative = '/' + path.relative(PUBLIC_DIR, oldPath);
  const newRelative = '/' + path.relative(PUBLIC_DIR, newPath);
  
  console.log(`   Updating references: ${oldRelative} → ${newRelative}`);
  
  // Find and replace in src directory
  try {
    const srcDir = path.join(process.cwd(), 'src');
    const contentDir = path.join(process.cwd(), 'content');
    
    // Use grep to find files containing the old path
    const escapedOldPath = oldRelative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    for (const searchDir of [srcDir, contentDir]) {
      if (!fs.existsSync(searchDir)) continue;
      
      try {
        const result = execSync(
          `grep -rl "${oldRelative}" "${searchDir}" 2>/dev/null || true`,
          { encoding: 'utf8' }
        );
        
        const files = result.split('\n').filter(f => f.trim());
        
        for (const file of files) {
          if (!DRY_RUN) {
            let content = fs.readFileSync(file, 'utf8');
            content = content.replace(new RegExp(escapedOldPath, 'g'), newRelative);
            fs.writeFileSync(file, content);
            console.log(`     Updated: ${path.relative(process.cwd(), file)}`);
          } else {
            console.log(`     Would update: ${path.relative(process.cwd(), file)}`);
          }
        }
      } catch {
        // grep found nothing, that's fine
      }
    }
  } catch (error) {
    console.error(`   ⚠️ Could not update code references: ${error}`);
  }
}

function main() {
  console.log('🔍 Scanning for large PNG files...\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be made)' : 'LIVE (files will be converted)'}\n`);
  console.log(`Threshold: ${SIZE_THRESHOLD_KB}KB | JPEG Quality: ${JPEG_QUALITY}%\n`);
  
  const pngs = scanPngs(PUBLIC_DIR);
  
  // Filter out PNGs with transparency (should stay as PNG)
  const convertible = pngs.filter(p => !p.hasTransparency);
  const withTransparency = pngs.filter(p => p.hasTransparency);
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                     PNG CONVERSION REPORT');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  console.log(`📊 Large PNGs found: ${pngs.length}`);
  console.log(`🔄 Convertible (no transparency): ${convertible.length}`);
  console.log(`🔒 Keeping as PNG (has transparency): ${withTransparency.length}\n`);
  
  if (convertible.length === 0) {
    console.log('No large PNGs to convert. All done! ✅');
    return;
  }
  
  console.log('───────────────────────────────────────────────────────────────');
  console.log('Converting large PNGs to JPEG:');
  console.log('───────────────────────────────────────────────────────────────\n');
  
  // Sort by size descending
  convertible.sort((a, b) => b.sizeKB - a.sizeKB);
  
  let totalSaved = 0;
  let successCount = 0;
  
  for (const png of convertible) {
    console.log(`📸 ${png.relativePath}`);
    console.log(`   PNG size: ${png.sizeKB}KB`);
    
    if (DRY_RUN) {
      console.log(`   Would convert to JPEG\n`);
      continue;
    }
    
    const result = convertToJpg(png.path);
    
    if (result.success && result.newSizeKB && result.jpgPath) {
      const saved = png.sizeKB - result.newSizeKB;
      totalSaved += saved;
      successCount++;
      
      console.log(`   JPG size: ${result.newSizeKB}KB (saved ${saved}KB, ${Math.round(saved/png.sizeKB*100)}%)`);
      
      // Update code references
      updateCodeReferences(png.path, result.jpgPath);
      
      // Delete original PNG
      fs.unlinkSync(png.path);
      console.log(`   ✅ Converted and replaced\n`);
    }
  }
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                           SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  if (!DRY_RUN) {
    console.log(`✅ Successfully converted: ${successCount} files`);
    console.log(`💾 Total space saved: ${(totalSaved / 1024).toFixed(1)}MB`);
  } else {
    console.log(`Would convert: ${convertible.length} files`);
    console.log(`Estimated savings: ~${Math.round(convertible.reduce((sum, p) => sum + p.sizeKB, 0) * 0.7 / 1024)}MB (assuming ~70% reduction)`);
    console.log('\n💡 Run without --dry-run to apply conversions');
  }
  
  if (withTransparency.length > 0) {
    console.log(`\n📝 Note: ${withTransparency.length} PNGs have transparency and were kept as PNG`);
  }
}

main();








