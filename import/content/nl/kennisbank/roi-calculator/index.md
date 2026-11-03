---
id: resources/roi-calculator
lang: nl
url: /nl/kennisbank/roi-calculator/
alternates:
  en: /en/resources/roi-calculator/
  nl: /nl/kennisbank/roi-calculator/
  de: /de/ressourcen/roi-rechner/
page_type: T11
title: "ROI-calculator voor digitale werkinstructies | Actarion"
description: "Bereken de ROI van digitale en AR-werkinstructies: invoer, aannames en formule voor besparingen op inwerken, fouten, stilstand en auditvoorbereiding."
h1: "ROI-calculator voor digitale werkinstructies"
keyword_primary: "roi werkinstructies berekenen"
keywords_secondary: ["roi connected worker", "businesscase ar-training"]
schema: ["WebApplication", "FAQPage", "BreadcrumbList"]
image: /img/illustraties/resources-roi-calculator.svg
image_alt: "Pentekening: balans met een papieren SOP en een klok links en een tablet met cyane stapkaart rechts, plus een stijgende pijl"
cta: roi
phase: 1
updated: 2026-11-03
---

# ROI-calculator voor digitale werkinstructies

> De ROI van digitale werkinstructies is de jaarlijkse besparing op inwerken, fouten, stilstand en auditvoorbereiding, minus de kosten van de oplossing, gedeeld door die kosten. Deze pagina legt de invoer, aannames en formule van de ROI-calculator van Actarion uit, zodat je met je eigen cijfers een businesscase voor een pilot maakt.

![Pentekening: balans met een papieren SOP en een klok links en een tablet met cyane stapkaart rechts, plus een stijgende pijl](/img/illustraties/resources-roi-calculator.svg)

## Waarom is de businesscase lastig te maken?

- De kosten van traag inwerken zitten verstopt in de tijd van teamleiders.
- Fouten en afkeur worden geboekt op kwaliteit, niet op training.
- Stilstand door een verkeerde omstelling wordt zelden herleid tot de instructie.

## Welke invoer gebruikt de ROI-calculator?

| Invoer | Eenheid | Waar vind je het? |
|---|---|---|
| Nieuwe medewerkers per jaar (N) | personen | HR |
| Huidige inwerktijd tot zelfstandig (T₀) | dagen | Trainingsregistratie, teamleiders |
| Verwachte verkorting van de inwerktijd (r_t) | % | Pilotdoel [CIJFER TE BEVESTIGEN] |
| Begeleidingsuren per nieuwe medewerker (B) | uren | Teamleiders |
| Integrale loonkosten per uur (C) | € | Financiën |
| Fouten of afkeur per jaar door procedurefouten (E) | aantal | Kwaliteit |
| Gemiddelde kosten per fout (K_e) | € | Kwaliteit, financiën |
| Verwachte foutreductie (r_e) | % | Pilotdoel [CIJFER TE BEVESTIGEN] |
| Ongeplande stilstand per jaar door omstellen of onderhoud (D) | uren | Onderhoud, MES |
| Kosten per uur stilstand (K_d) | € | Financiën |
| Verwachte reductie van stilstand (r_d) | % | Pilotdoel [CIJFER TE BEVESTIGEN] |
| Uren per jaar voor auditvoorbereiding (A) | uren | Kwaliteit |

## Hoe wordt de ROI berekend?

1. **Besparing op inwerken** = N × (T₀ × 8 u × r_t × C + B × r_t × C)
2. **Besparing op fouten** = E × K_e × r_e
3. **Besparing op stilstand** = D × K_d × r_d
4. **Besparing op audits** = A × r_a × C, waarbij r_a de verwachte verkorting van de voorbereidingstijd is
5. **Jaarlijkse opbrengst** = som van 1 t/m 4
6. **ROI** = (jaarlijkse opbrengst − jaarlijkse kosten van de oplossing) ÷ jaarlijkse kosten van de oplossing
7. **Terugverdientijd (maanden)** = eenmalige implementatiekosten ÷ (jaarlijkse opbrengst ÷ 12)

De kosten van de oplossing vul je niet op deze pagina in. Die zijn maatwerk per sector en use case en bespreken we in de intake.

## Welke aannames gelden?

- Een werkdag telt 8 productieve uren; pas dit aan op je ploegenrooster.
- Tijdens het inwerken is een nieuwe medewerker niet volledig productief; de besparing is de teruggewonnen tijd.
- Reductiepercentages komen uit je eigen pilot-KPI's, niet uit algemene benchmarks.
- Alleen fouten door procedurefouten tellen mee, geen materiaal- of machinestoringen.
- De berekening is een schatting per jaar, zonder disconteren.

## Waar staat de interactieve calculator?

De interactieve versie draait op roicalculator.actarion.com. [TE BEVESTIGEN: integratie van de calculator op deze pagina]

## Hoe Actarion helpt

- We helpen je de invoer te verzamelen tijdens de use-case-discovery.
- De pilot meet de reductiepercentages op je eigen lijn.
- Uitvoeringsdata uit de audit trail maken de nameting objectief.

## Veelgestelde vragen

### Waarom toont de calculator geen prijzen?
De kosten hangen af van sector, use cases en aantal gebruikers. We bespreken ze in een kosteloze intake.

### Welke reductiepercentages moet ik invullen?
Begin voorzichtig en vervang ze door je gemeten pilot-KPI's.

### Kan ik veiligheidswinst meenemen?
Ja, als aparte kwalitatieve regel. Minder incidenten zijn waardevol maar lastig in geld uit te drukken.

## Volgende stap

Hulp nodig bij het invullen? [Plan een kosteloze intake](/nl/contact/).

## Gerelateerd

- [Pilot-aanpak](/nl/pilot/)
- [Klantcases](/nl/klanten/)
- [Digitale werkinstructies](/nl/oplossingen/digitale-werkinstructies/)
- [Inwerken en training](/nl/toepassingen/inwerken-training/)
