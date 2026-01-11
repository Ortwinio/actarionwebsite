# Blog Post Image Issues Report

Generated: $(date)

## Summary
- **Total blog posts checked:** 33
- **Unique missing images:** 16
- **Duplicate filenames:** 3 (same image used by multiple posts - this is OK if intentional)
- **Files with multiple image declarations:** 1 (needs fixing)

---

## 1. MISSING IMAGES (16 unique files)

These images are referenced in blog post frontmatter but do not exist in `/public/blogs/`:

### Missing Image Files:

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

12. **industrial-ar-adoption-visionpro-hololens-mobile.png**
    - Referenced in: `2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`
    - Path: `/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png`
    - ⚠️ **Note:** This file has TWO image declarations (see section 3)

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

## 2. DUPLICATE FILENAMES (3 cases)

These images are used by multiple blog posts. This is **OK if intentional** (e.g., translations of the same post), but verify they should share the same image:

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

---

## 3. MULTIPLE IMAGE DECLARATIONS (1 file needs fixing)

This file has **multiple `image:` declarations** in the frontmatter, which will cause issues. Only the last one will be used, but this should be fixed:

**File:** `2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`

**Declarations found:**
```yaml
image: "/blogs/industrial-ar-adoption-visionpro-hololens-mobile-hero.png"
image: "/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png"
```

**Action required:** Remove one of the duplicate `image:` lines. Keep only the one you want to use.

---

## 4. EXISTING IMAGES (for reference)

These images **DO exist** in `/public/blogs/` and are working correctly:

- ar-ai-capture-expert-knowledge.png
- ar-onboarding-manufacturing-hero.png
- ar-sops-added-value.png
- ar-sops-next-frontier.png
- ar-training-revolution.png
- deep-sight-alternatives-hero.png
- future-of-work-industrial-training-hero.png
- future-of-work.png
- hololens-vs-apple-vision-pro-ar-guidance.png
- O_ar-sops-added-value.png (duplicate/old version?)
- O_ar-sops-next-frontier.png (duplicate/old version?)
- O_ar-training-revolution.png (duplicate/old version?)
- paper-to-ar-workflow-hero.png
- partnership-deepsight-actarion.png
- remote-expert-support-ar-hero.png
- safety-compliance-ar.png
- the-future-of-work.png

---

## Recommended Actions

1. **Add missing images:** Create or locate the 16 missing image files and place them in `/public/blogs/`

2. **Fix duplicate frontmatter:** Edit `2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx` and remove one of the duplicate `image:` declarations

3. **Verify duplicate filenames:** Check if the 3 duplicate filename cases are intentional (e.g., translations sharing the same image)

4. **Clean up old images:** Consider removing the `O_*.png` files if they are old/duplicate versions

---

## Quick Reference: All Missing Images (copy-paste list)

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

















