# Comprehensive Image Issues Report - All Pages

This report covers image issues across **all pages** of the ActARion website, including blog posts, use cases, and other pages.

---

## Summary

- **Total missing images:** 22
  - Use case images: 6
  - Blog post images: 16
- **Missing directories:** 1 (`public/images/usecases/`)
- **Files with multiple image declarations:** 1
- **Duplicate filenames:** 0 (case-insensitive check)

---

## 1. USE CASE IMAGES (6 missing)

**⚠️ CRITICAL:** The directory `public/images/usecases/` does not exist!

All 6 use case hero images are missing. These are referenced in:
- Use cases overview page (`/en/use-cases`)
- Individual use case detail pages

### Missing Use Case Images:

1. **ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png**
   - Expected at: `public/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png`
   - Used in: Use case "AR work instructions and SOPs to preserve corporate memory"

2. **ar-training-and-onboarding-for-industrial-teams-hero.png**
   - Expected at: `public/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png`
   - Used in: Use case "AR training and onboarding for industrial teams"

3. **ar-guided-assembly-for-error-free-production-hero.png**
   - Expected at: `public/images/usecases/ar-guided-assembly-for-error-free-production-hero.png`
   - Used in: Use case "AR guided assembly for error free production"

4. **ar-guided-changeover-to-reduce-downtime-hero.png**
   - Expected at: `public/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png`
   - Used in: Use case "AR guided changeover to reduce downtime"

5. **ar-preventive-maintenance-with-data-driven-insights-hero.png**
   - Expected at: `public/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png`
   - Used in: Use case "AR preventive maintenance with data driven insights"

6. **ar-remote-expert-support-for-corrective-maintenance-hero.png**
   - Expected at: `public/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png`
   - Used in: Use case "AR remote expert support for corrective maintenance"

**Action Required:**
1. Create directory: `mkdir -p public/images/usecases/`
2. Add all 6 image files to this directory

---

## 2. BLOG POST IMAGES (16 missing)

See `BLOG_IMAGE_ISSUES_REPORT.md` for detailed information.

### Quick List of Missing Blog Images:

1. ai-photos-videos-multilingual-instructions-hero.png
2. ar-hardware-smart-glasses-tablets-smartphones-hero.png
3. ar-in-logistics-guided-picking-packing-loading.png
4. ar-sops-manufacturing-audits-hero.png
5. ar-training-design-hero.png
6. ar-work-instructions-high-risk-hero.png
7. connected-worker-platform-vs-traditional-lms.png
8. digital-library-work-safety-instructions-hero.png
9. error-free-assembly-ar-hero.png
10. field-service-ar-checklists-energy-utilities-hero.png
11. industrial-ar-adoption-visionpro-hololens-mobile-hero.png
12. industrial-ar-adoption-visionpro-hololens-mobile.png
13. instruction-formats-safety-quality-hero.png
14. measure-roi-ar-ai-work-instructions-hero.png
15. mixed-reality-shutdown-turnaround-hero.png
16. tracking-skills-ar-compliance-hero.png

**All should be placed in:** `public/blogs/`

---

## 3. OTHER PAGE IMAGES

✅ **All verified and exist:**
- `/usecases-overview.png` - Use cases overview page
- `/404-header-actarion-ar-navigation.png` - 404 page
- `/actarionlogo.png` - Logo (Navigation, Footer)
- `/ActARion header2.png` - Homepage
- `/ActARion header 3.png` - Homepage

---

## 4. HEADER IMAGES

✅ **All verified and exist:**
- `/headers/header-1.jpg` and `.png`
- `/headers/header-2.jpg` and `.png`
- `/headers/header-3.jpg` and `.png`
- `/headers/header-4.jpg`

---

## 5. FILES WITH MULTIPLE IMAGE DECLARATIONS

**File:** `content/blogs/2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`

This file has **two `image:` declarations** in the frontmatter:
```yaml
image: "/blogs/industrial-ar-adoption-visionpro-hololens-mobile-hero.png"
image: "/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png"
```

**Action Required:** Remove one of the duplicate `image:` lines. Keep only the one you want to use.

---

## 6. DUPLICATE FILENAMES

✅ **No duplicate filenames found** (case-insensitive check)

Note: Some images are intentionally shared between posts (e.g., translations):
- `deep-sight-alternatives-hero.png` (used by 2 posts)
- `future-of-work-industrial-training-hero.png` (used by 3 translation posts)
- `hololens-vs-apple-vision-pro-ar-guidance.png` (used by 2 posts)

---

## 7. QUICK FIX CHECKLIST

### Immediate Actions:

- [ ] Create directory: `public/images/usecases/`
- [ ] Add 6 use case hero images to `public/images/usecases/`
- [ ] Add 16 missing blog images to `public/blogs/`
- [ ] Fix duplicate image declaration in `2025-11-26-apple-vision-pro-hololens-and-mobile-what-really-matters-for-industrial-ar-adoption.mdx`

### Verification Steps:

1. After adding images, verify they load in development: `npm run dev`
2. Test in production build: `npm run build && npm run start`
3. Check browser console for 404 errors on image requests
4. Verify images display correctly on:
   - Use cases overview page: `/en/use-cases`
   - Individual use case pages
   - All blog post pages

---

## 8. ALL MISSING IMAGES (Complete List)

### Use Case Images (6):
```
public/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png
public/images/usecases/ar-training-and-onboarding-for-industrial-teams-hero.png
public/images/usecases/ar-guided-assembly-for-error-free-production-hero.png
public/images/usecases/ar-guided-changeover-to-reduce-downtime-hero.png
public/images/usecases/ar-preventive-maintenance-with-data-driven-insights-hero.png
public/images/usecases/ar-remote-expert-support-for-corrective-maintenance-hero.png
```

### Blog Images (16):
```
public/blogs/ai-photos-videos-multilingual-instructions-hero.png
public/blogs/ar-hardware-smart-glasses-tablets-smartphones-hero.png
public/blogs/ar-in-logistics-guided-picking-packing-loading.png
public/blogs/ar-sops-manufacturing-audits-hero.png
public/blogs/ar-training-design-hero.png
public/blogs/ar-work-instructions-high-risk-hero.png
public/blogs/connected-worker-platform-vs-traditional-lms.png
public/blogs/digital-library-work-safety-instructions-hero.png
public/blogs/error-free-assembly-ar-hero.png
public/blogs/field-service-ar-checklists-energy-utilities-hero.png
public/blogs/industrial-ar-adoption-visionpro-hololens-mobile-hero.png
public/blogs/industrial-ar-adoption-visionpro-hololens-mobile.png
public/blogs/instruction-formats-safety-quality-hero.png
public/blogs/measure-roi-ar-ai-work-instructions-hero.png
public/blogs/mixed-reality-shutdown-turnaround-hero.png
public/blogs/tracking-skills-ar-compliance-hero.png
```

**Total: 22 missing images**

---

## Notes

- All image paths in the code use absolute paths starting with `/` (e.g., `/blogs/image.png`)
- Images in `public/` are served from the root, so `/blogs/image.png` maps to `public/blogs/image.png`
- Use case images use `/images/usecases/` which maps to `public/images/usecases/`
- Case sensitivity: All checks are case-insensitive, but ensure actual filenames match exactly (including case) in production


