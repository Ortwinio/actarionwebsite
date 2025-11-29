# Complete Image Issues Report - All Pages

Generated: $(date)

## Summary
- **Total missing images:** 22 unique files
- **Case sensitivity issues:** 2 files
- **Duplicate filenames:** 3 cases (intentional - translations)
- **Files with multiple image declarations:** 1 file

---

## 1. MISSING IMAGES

### A. Use Case Pages (6 missing images)

These images are referenced in `src/config/useCases.ts` but do not exist. They should be placed in `/public/images/usecases/`:

1. **ar-guided-assembly-for-error-free-production-hero.png**
   - Path: `/images/usecases/ar-guided-assembly-for-error-free-production-hero.png`
   - Used by: Use case "AR guided assembly for error free production"

2. **ar-guided-changeover-to-reduce-downtime-hero.png**
   - Path: `/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png`
   - Used by: Use case "AR guided changeover to reduce downtime"

3. **ar-preventive-maintenance-with-data-driven-insights-hero.png**
   - Path: `/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png`
   - Used by: Use case "AR preventive maintenance with data driven insights"

4. **ar-remote-expert-support-for-corrective-maintenance-hero.png**
   - Path: `/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png`
   - Used by: Use case "AR remote expert support for corrective maintenance"

5. **ar-training-and-onboarding-for-industrial-teams-hero.png**
   - Path: `/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png`
   - Used by: Use case "AR training and onboarding for industrial teams"

6. **ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png**
   - Path: `/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png`
   - Used by: Use case "AR work instructions and SOPs to preserve corporate memory"

**Action:** Create `/public/images/usecases/` directory and add these 6 images.

---

### B. Blog Posts (16 missing images)

These images are referenced in blog post frontmatter but do not exist in `/public/blogs/`:

1. **ai-photos-videos-multilingual-instructions-hero.png**
   - Referenced in: `2025-11-26-how-ai-can-turn-photos-and-videos-into-multilingual-work-instructions.mdx`
   - Path: `/blogs/ai-photos-videos-multilingual-instructions-hero.png`

2. **ar-hardware-smart-glasses-tablets-smartphones-hero.png**
   - Referenced in: `2025-11-26-choosing-the-right-hardware-smart-glasses-tablets-or-smartphones-for-ar-on-the-job.mdx`
   - Path: `/blogs/ar-hardware-smart-glasses-tablets-smartphones-hero.png`

3. **ar-in-logistics-guided-picking-packing-loading.png**
   - Referenced in: `2025-11-26-ar-in-logistics-guided-picking-packing-and-loading-for-fewer-mistakes.mdx`
   - Path: `/blogs/ar-in-logistics-guided-picking-packing-loading.png`

4. **ar-sops-manufacturing-audits-hero.png**
   - Referenced in: `2025-11-26-augmented-reality-sops-for-manufacturing-audits-safer-faster-and-more-reliable-compliance.mdx`
   - Path: `/blogs/ar-sops-manufacturing-audits-hero.png`

5. **ar-training-design-hero.png**
   - Referenced in: `2025-11-26-designing-ar-training-scenarios-that-fit-your-existing-learning-journey.mdx`
   - Path: `/blogs/ar-training-design-hero.png`

6. **ar-work-instructions-high-risk-hero.png**
   - Referenced in: `2025-11-26-using-ar-work-instructions-to-standardise-rare-or-high-risk-procedures.mdx`
   - Path: `/blogs/ar-work-instructions-high-risk-hero.png`

7. **connected-worker-platform-vs-traditional-lms.png**
   - Referenced in: `2025-11-26-connected-worker-platform-vs-traditional-lms-what-is-the-difference-and-why-it-matters.mdx`
   - Path: `/blogs/connected-worker-platform-vs-traditional-lms.png`

8. **digital-library-work-safety-instructions-hero.png**
   - Referenced in: `2025-11-26-building-a-digital-library-of-work-and-safety-instructions-that-people-actually-use.mdx`
   - Path: `/blogs/digital-library-work-safety-instructions-hero.png`

9. **error-free-assembly-ar-hero.png**
   - Referenced in: `2025-11-26-error-free-assembly-with-ar-reducing-rework-and-scrap-in-complex-production.mdx`
   - Path: `/blogs/error-free-assembly-ar-hero.png`

10. **field-service-ar-checklists-energy-utilities-hero.png**
    - Referenced in: `2025-11-26-field-service-in-energy-and-utilities-working-safer-with-ar-guided-checklists.mdx`
    - Path: `/blogs/field-service-ar-checklists-energy-utilities-hero.png`

11. **industrial-ar-adoption-visionpro-hololens-mobile-hero.png**
    - Referenced in: `2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`
    - Path: `/blogs/industrial-ar-adoption-visionpro-hololens-mobile-hero.png`
    - ⚠️ **Note:** This file also has a duplicate image declaration (see section 4)

12. **industrial-ar-adoption-visionpro-hololens-mobile.png**
    - Referenced in: `2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`
    - Path: `/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png`
    - ⚠️ **Note:** This file has TWO image declarations (see section 4)

13. **instruction-formats-safety-quality-hero.png**
    - Referenced in: `2025-11-26-from-text-and-video-to-3d-and-ar-why-format-of-instructions-influences-safety-and-quality.mdx`
    - Path: `/blogs/instruction-formats-safety-quality-hero.png`

14. **measure-roi-ar-ai-work-instructions-hero.png**
    - Referenced in: `2025-11-26-how-to-measure-the-roi-of-ar-and-ai-guided-work-instructions.mdx`
    - Path: `/blogs/measure-roi-ar-ai-work-instructions-hero.png`

15. **mixed-reality-shutdown-turnaround-hero.png**
    - Referenced in: `2025-11-26-digitizing-shutdown-and-turnaround-playbooks-with-mixed-reality-safer-faster-smarter-execution.mdx`
    - Path: `/blogs/mixed-reality-shutdown-turnaround-hero.png`

16. **tracking-skills-ar-compliance-hero.png**
    - Referenced in: `2025-11-26-tracking-skills-and-certifications-with-ar-how-to-keep-your-workforce-compliant.mdx`
    - Path: `/blogs/tracking-skills-ar-compliance-hero.png`

---

## 2. CASE SENSITIVITY ISSUES (2 files)

These images are referenced with incorrect case. On case-sensitive systems (Linux production servers), these will fail to load:

1. **ActARion header 3.png**
   - ❌ Referenced as: `/ActARion header 3.png` (in `src/app/[locale]/HomePageClient.tsx`)
   - ✅ Actual file: `actarion header 3.png` (lowercase 'a')
   - **Fix:** Change reference to `/actarion header 3.png` OR rename file to match reference

2. **ActARion header2.png**
   - ❌ Referenced as: `/ActARion header2.png` (in `src/app/[locale]/HomePageClient.tsx`)
   - ✅ Actual file: `actarion header2.png` (lowercase 'a')
   - **Fix:** Change reference to `/actarion header2.png` OR rename file to match reference

**Note:** On macOS/Windows (case-insensitive), these work locally but will fail in production on Linux servers.

---

## 3. DUPLICATE FILENAMES (3 cases - OK if intentional)

These images are used by multiple blog posts. This is **OK if intentional** (e.g., translations of the same post):

1. **deep-sight-alternatives-hero.png**
   - Used by 2 posts:
     - `2025-11-26-deep-sight-and-alternatives-pros-and-cons.mdx`
     - `2025-11-26-deep-sight-and-alternatives-pros-and-cons-of-ar-guided-work-instructions-in-industry.mdx`

2. **future-of-work-industrial-training-hero.png**
   - Used by 3 posts (likely translations):
     - `2025-11-26-future-of-work-safer-faster-smarter-industrial-training-de.mdx` (German)
     - `2025-11-26-future-of-work-safer-faster-smarter-industrial-training.mdx` (English)
     - `2025-11-26-future-of-work-safer-faster-smarter-industrial-training-nl.mdx` (Dutch)

3. **hololens-vs-apple-vision-pro-ar-guidance.png**
   - Used by 2 posts:
     - `2025-11-26-holo-lens-vs-apple-vision-pro-glasses-glasses-tablet-or-mobile-comparison-as-ar-guidance-device.mdx`
     - `2025-11-26-hololens-vs-apple-vision-pro-glasses-tablet-or-mobile-which-ar-device-is-best-for-industrial-guidance.mdx`

**Action:** Verify these are intentional (likely yes for translations).

---

## 4. MULTIPLE IMAGE DECLARATIONS (1 file needs fixing)

This file has **multiple `image:` declarations** in the frontmatter, which will cause issues. Only the last one will be used:

**File:** `content/blogs/2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`

**Declarations found:**
```yaml
image: "/blogs/industrial-ar-adoption-visionpro-hololens-mobile-hero.png"
image: "/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png"
```

**Action required:** 
1. Open the file and remove one of the duplicate `image:` lines
2. Keep only the one you want to use
3. If both images are needed, one should be moved to the body content instead

---

## 5. QUICK REFERENCE: ALL MISSING IMAGES

### Use Case Images (create `/public/images/usecases/` directory first):
```
ar-guided-assembly-for-error-free-production-hero.png
ar-guided-changeover-to-reduce-downtime-hero.png
ar-preventive-maintenance-with-data-driven-insights-hero.png
ar-remote-expert-support-for-corrective-maintenance-hero.png
ar-training-and-onboarding-for-industrial-teams-hero.png
ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png
```

### Blog Post Images (add to `/public/blogs/`):
```
ai-photos-videos-multilingual-instructions-hero.png
ar-hardware-smart-glasses-tablets-smartphones-hero.png
ar-in-logistics-guided-picking-packing-loading.png
ar-sops-manufacturing-audits-hero.png
ar-training-design-hero.png
ar-work-instructions-high-risk-hero.png
connected-worker-platform-vs-traditional-lms.png
digital-library-work-safety-instructions-hero.png
error-free-assembly-ar-hero.png
field-service-ar-checklists-energy-utilities-hero.png
industrial-ar-adoption-visionpro-hololens-mobile-hero.png
industrial-ar-adoption-visionpro-hololens-mobile.png
instruction-formats-safety-quality-hero.png
measure-roi-ar-ai-work-instructions-hero.png
mixed-reality-shutdown-turnaround-hero.png
tracking-skills-ar-compliance-hero.png
```

---

## Recommended Actions (Priority Order)

### 🔴 HIGH PRIORITY (Will break in production):

1. **Fix case sensitivity issues:**
   - Edit `src/app/[locale]/HomePageClient.tsx`
   - Change `/ActARion header 3.png` → `/actarion header 3.png`
   - Change `/ActARion header2.png` → `/actarion header2.png`

2. **Fix duplicate frontmatter:**
   - Edit `content/blogs/2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`
   - Remove one of the duplicate `image:` declarations

### 🟡 MEDIUM PRIORITY (Missing images - will show broken image placeholders):

3. **Add use case images:**
   - Create directory: `mkdir -p public/images/usecases`
   - Add the 6 use case hero images listed above

4. **Add blog post images:**
   - Add the 16 missing blog post images to `/public/blogs/`

### 🟢 LOW PRIORITY (Verify intentional):

5. **Verify duplicate filenames:**
   - Check if the 3 duplicate filename cases are intentional (likely yes for translations)

---

## Files to Edit

1. `src/app/[locale]/HomePageClient.tsx` - Fix case sensitivity (lines 359, 420)
2. `content/blogs/2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx` - Remove duplicate image declaration

---

## Notes

- All image paths in code should match the actual filenames exactly (case-sensitive)
- Images in `/public/` are served from the root path (e.g., `/image.png` not `/public/image.png`)
- Blog images are normalized by `velite.config.ts` to `/blogs/filename.png`
- Use case images should be in `/public/images/usecases/` and referenced as `/images/usecases/filename.png`

