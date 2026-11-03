# AR-beelden (foto-composities)

Per beeld drie breedtes (800/1200/1600 px) in AVIF (kleinst) en WebP (fallback). 16:10.

```html
<picture>
  <source type="image/avif" srcset="/images/foto-ipad-robot-800.avif 800w, /images/foto-ipad-robot-1200.avif 1200w, /images/foto-ipad-robot-1600.avif 1600w" sizes="(max-width: 900px) 100vw, 1200px">
  <img src="/images/foto-ipad-robot-1200.webp" srcset="/images/foto-ipad-robot-800.webp 800w, /images/foto-ipad-robot-1200.webp 1200w, /images/foto-ipad-robot-1600.webp 1600w" sizes="(max-width: 900px) 100vw, 1200px" width="1600" height="1000" alt="Technicus houdt een iPad voor een robotlijn; op het scherm verschijnen SOP-stappen in AR" loading="lazy" decoding="async">
</picture>
```

| Bestand | Bedoeld voor | Alt-tekst (EN) |
|---|---|---|
| foto-ipad-robot | home / use case assembly / industries manufacturing | A technician holds an iPad up to a robotic welding line; the screen shows AR work instruction steps |
| foto-telefoon-loto | use case safety-loto / LOTO template | A phone held up to a machine shows lockout-tagout steps and a verified zero-energy check in AR |
| foto-visionpro-hal | hardware/apple-vision-pro / platform ar-guidance | A worker wearing Apple Vision Pro sees floating SOP panels over a production hall |

Gebruik boven de vouw geen `loading="lazy"` (en eventueel `fetchpriority="high"`). Bronnen: zie BRONNEN.md (Unsplash License).
