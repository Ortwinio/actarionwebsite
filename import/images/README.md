# AR-beelden (foto-composities) – 120 stuks, één per pagina-id

Bestandsnaam = pagina-id met `/` → `-`, bv. `use-cases/changeover-smed` → `use-cases-changeover-smed`.
Per beeld: 800/1200/1600 px breed, 16:10, in **AVIF** (kleinst) en **WebP** (fallback). Mapping: `../_manifest/images.tsv`.
De frontmatter in `import/content` verwijst al naar `/images/<naam>-1600.webp` en heeft per taal een alt-tekst (`image_alt`).

```html
<picture>
  <source type="image/avif" srcset="/images/home-800.avif 800w, /images/home-1200.avif 1200w, /images/home-1600.avif 1600w" sizes="(max-width: 900px) 100vw, 1200px">
  <img src="/images/home-1200.webp" srcset="/images/home-800.webp 800w, /images/home-1200.webp 1200w, /images/home-1600.webp 1600w"
       sizes="(max-width: 900px) 100vw, 1200px" width="1600" height="1000" alt="{image_alt}" loading="lazy" decoding="async">
</picture>
```
Boven de vouw: geen `loading="lazy"`, wel `fetchpriority="high"`.
Verdeling apparaten: iPad 63, telefoon 32, Apple Vision Pro 25 (≈21%). Bronnen: BRONNEN.md (Unsplash License).
