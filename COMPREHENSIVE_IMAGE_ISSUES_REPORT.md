# Comprehensive Image Issues Report - All Pages

This report covers image issues across **all pages** of the ActARion website, including blog posts, use cases, and other pages.

---

## Summary

- **Total missing images:** 24 (blog posts only - updated December 2024)
  - Use case images: 0 ✅ (all exist)
  - Blog post images: 24
- **Missing directories:** 0 ✅
- **Files with multiple image declarations:** 1
- **Duplicate filenames:** 0 (case-insensitive check)

---

## 1. USE CASE IMAGES ✅ (All exist - Updated December 2024)

All 6 use case hero images now exist in `public/images/usecases/`:

1. ✅ **ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png**
2. ✅ **ar-training-and-onboarding-for-industrial-teams-hero.png**
3. ✅ **ar-guided-assembly-for-error-free-production-hero.png**
4. ✅ **ar-guided-changeover-to-reduce-downtime-hero.png**
5. ✅ **ar-preventive-maintenance-with-data-driven-insights-hero.png**
6. ✅ **ar-remote-expert-support-for-corrective-maintenance-hero.png**
7. ✅ **usecases-overview.png**

**No action required for use case images.**

---

## 2. BLOG POST IMAGES (24 missing - Updated December 2024)

See `IMAGE_CREATION_REQUIREMENTS.md` for detailed image specifications and visual descriptions.

### Quick List of Missing Blog Images:

1. 5-common-assembly-mistakes-ar-work-instructions-prevent-hero.png
2. ar-guided-changeovers-playbook-reduce-downtime-hero.png
3. ar-onboarding-new-hires-productivity-hero.png
4. ar-remote-expert-support-vs-phone-support-hero.png
5. ar-sops-audits-compliance-hero.png
6. ar-vs-pdf-onboarding-pilots-hero.png
7. assembly-process-ready-ar-work-instructions-checklist-hero.png
8. capturing-best-practice-changeover-sequences-ar-sops-hero.png
9. capturing-corporate-memory-ar-work-instructions-hero.png
10. connecting-sensor-data-ar-guided-maintenance-hero.png
11. design-first-ar-onboarding-program-shop-floor-hero.png
12. digital-work-instructions-maintenance-technicians-daily-routine-hero.png
13. hero-operators-standardised-changeovers-digital-work-instructions-hero.png
14. keeping-sops-up-to-date-digital-work-instructions-hero.png
15. organise-remote-expert-pool-ar-support-hero.png
16. paper-sops-to-ar-sops-assembly-errors-hero.png
17. pilot-ar-work-instructions-critical-changeover-hero.png
18. preventive-maintenance-ar-work-instructions-catch-issues-hero.png
19. reducing-downtime-ar-guided-remote-troubleshooting-hero.png
20. reducing-training-time-ar-work-instructions-90-days-hero.png
21. standardise-complex-assembly-digital-work-instructions-hero.png
22. standardising-inspections-ar-sops-fewer-surprises-hero.png
23. tribal-knowledge-to-ar-sops-roadmap-hero.png
24. what-to-measure-ar-remote-expert-support-pilots-hero.png

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

- [x] Create directory: `public/images/usecases/` ✅ Done
- [x] Add 6 use case hero images to `public/images/usecases/` ✅ Done
- [ ] Add 24 missing blog images to `public/blogs/` (see IMAGE_CREATION_REQUIREMENTS.md)
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

## 8. ALL MISSING IMAGES (Complete List - Updated December 2024)

### Use Case Images: ✅ All exist (0 missing)

### Blog Images (24 missing):
```
public/blogs/5-common-assembly-mistakes-ar-work-instructions-prevent-hero.png
public/blogs/ar-guided-changeovers-playbook-reduce-downtime-hero.png
public/blogs/ar-onboarding-new-hires-productivity-hero.png
public/blogs/ar-remote-expert-support-vs-phone-support-hero.png
public/blogs/ar-sops-audits-compliance-hero.png
public/blogs/ar-vs-pdf-onboarding-pilots-hero.png
public/blogs/assembly-process-ready-ar-work-instructions-checklist-hero.png
public/blogs/capturing-best-practice-changeover-sequences-ar-sops-hero.png
public/blogs/capturing-corporate-memory-ar-work-instructions-hero.png
public/blogs/connecting-sensor-data-ar-guided-maintenance-hero.png
public/blogs/design-first-ar-onboarding-program-shop-floor-hero.png
public/blogs/digital-work-instructions-maintenance-technicians-daily-routine-hero.png
public/blogs/hero-operators-standardised-changeovers-digital-work-instructions-hero.png
public/blogs/keeping-sops-up-to-date-digital-work-instructions-hero.png
public/blogs/organise-remote-expert-pool-ar-support-hero.png
public/blogs/paper-sops-to-ar-sops-assembly-errors-hero.png
public/blogs/pilot-ar-work-instructions-critical-changeover-hero.png
public/blogs/preventive-maintenance-ar-work-instructions-catch-issues-hero.png
public/blogs/reducing-downtime-ar-guided-remote-troubleshooting-hero.png
public/blogs/reducing-training-time-ar-work-instructions-90-days-hero.png
public/blogs/standardise-complex-assembly-digital-work-instructions-hero.png
public/blogs/standardising-inspections-ar-sops-fewer-surprises-hero.png
public/blogs/tribal-knowledge-to-ar-sops-roadmap-hero.png
public/blogs/what-to-measure-ar-remote-expert-support-pilots-hero.png
```

**Total: 24 missing blog images**

See `IMAGE_CREATION_REQUIREMENTS.md` for detailed visual descriptions and AI generation prompts.

---

## Notes

- All image paths in the code use absolute paths starting with `/` (e.g., `/blogs/image.png`)
- Images in `public/` are served from the root, so `/blogs/image.png` maps to `public/blogs/image.png`
- Use case images use `/images/usecases/` which maps to `public/images/usecases/`
- Case sensitivity: All checks are case-insensitive, but ensure actual filenames match exactly (including case) in production



