---
id: resources/templates/preventive-maintenance-checklist
lang: en
url: /en/resources/templates/preventive-maintenance-checklist/
alternates:
  en: /en/resources/templates/preventive-maintenance-checklist/
  nl: /nl/kennisbank/templates/preventief-onderhoud-checklist/
  de: /de/ressourcen/vorlagen/wartungscheckliste/
page_type: T6
title: "Preventive Maintenance Checklist Template | Actarion"
description: "Free preventive maintenance checklist for machines: daily, weekly, monthly and annual tasks with limits and sign-off. Fill-in guide and example included."
h1: "Preventive Maintenance Checklist: Free Template for Machines"
keyword_primary: "preventive maintenance checklist"
keywords_secondary: ["pm checklist", "machine maintenance checklist", "equipment maintenance checklist template"]
schema: ["Article", "FAQPage", "BreadcrumbList"]
image: /img/illustraties/resources-templates-preventive-maintenance-checklist.svg
image_alt: "Pen drawing of a pump with a highlighted bearing next to a tablet showing a preventive maintenance checklist"
cta: template
phase: 1
updated: 2026-11-03
---

# Preventive Maintenance Checklist: Free Template for Machines

> A preventive maintenance checklist lists the inspections, lubrication, adjustments and replacements that keep an asset running, grouped by frequency, with limits and sign-off. This free preventive maintenance checklist covers daily to annual tasks for machines with motors, drives, hydraulics and pneumatics. Actarion turns it into AR-guided PM tasks with an automatic record.

![Pen drawing of a pump with a highlighted bearing next to a tablet showing a preventive maintenance checklist](/img/illustraties/resources-templates-preventive-maintenance-checklist.svg)

## Why does preventive maintenance still miss failures?

- Checks are ticked without measuring anything.
- Tasks are skipped when production pressure is high.
- Only one technician knows how to do the annual service.
- Findings stay on paper and never become a work order.

## What is a preventive maintenance checklist?

A preventive maintenance (PM) checklist is a list of planned tasks performed at fixed intervals to prevent breakdowns. Use one per asset or asset type. Base the tasks on the manufacturer's manual, failure history and risk. Plan all checklists over the year with a [maintenance schedule](/en/resources/templates/maintenance-schedule/).

## The preventive maintenance checklist

**Asset details**

| Field | Entry |
|---|---|
| Asset / ID / location | |
| Manufacturer / model | |
| Frequency of this checklist | Daily / Weekly / Monthly / Quarterly / Annual |
| Lockout required? (procedure ref.) | |
| Technician / date / hours meter | |

**Tasks**

| # | Freq. | Component | Task | Standard / limit | Result | OK | NOK | Action |
|---|---|---|---|---|---|---|---|---|
| 1 | D | Guards and E-stops | Check presence and function | All functional | | [ ] | [ ] | |
| 2 | D | Machine | Listen for abnormal noise, check leaks | None | | [ ] | [ ] | |
| 3 | W | Pneumatics | Check pressure, drain water separator | 6 bar ± 0.5 | | [ ] | [ ] | |
| 4 | W | Hydraulics | Check oil level and temperature | Between min/max, < 60 °C | | [ ] | [ ] | |
| 5 | W | Lubrication points | Lubricate per lube chart | Grease type per chart | | [ ] | [ ] | |
| 6 | M | Belts and chains | Check tension and wear | Per manufacturer | | [ ] | [ ] | |
| 7 | M | Motor | Check bearing temperature and vibration | Within baseline | | [ ] | [ ] | |
| 8 | M | Filters | Inspect or replace air and oil filters | Δp within limit | | [ ] | [ ] | |
| 9 | Q | Electrical cabinet | Inspect wiring, clean cooling fans | No damage, no dust | | [ ] | [ ] | |
| 10 | Q | Sensors | Clean and test function | Correct signal | | [ ] | [ ] | |
| 11 | A | Hydraulic oil | Sample or replace | Per oil analysis | | [ ] | [ ] | |
| 12 | A | Safety functions | Full test of interlocks and light curtains | Stop within spec | | [ ] | [ ] | |

- [ ] Guards refitted and lock removed per procedure
- [ ] Machine test-run and handed back to production
- [ ] Defects entered as work order (no.: ______)

**Sign-off:** Technician ______ · Production ______ · Date ______

## How do you fill in the checklist?

1. **Asset details:** one checklist per asset and frequency. Note the hours meter for usage-based tasks.
2. **Standard / limit:** always enter a measurable value. "Check belt" becomes "deflection 10–15 mm".
3. **Result:** write the measured value, not just a tick. Trends predict failures.
4. **NOK → action:** every NOK needs an action or work order number. Otherwise the finding disappears.
5. **Safety:** any task inside guards needs lockout first. Use the [LOTO procedure](/en/resources/templates/lockout-tagout-procedure/).
6. **Review:** adjust intervals each year based on failure data.

## Example (monthly, packaging line conveyor)

| Task | Limit | Result | Status |
|---|---|---|---|
| Chain tension | 10–15 mm sag | 18 mm | NOK → WO 2231, tensioned |
| Gearbox oil level | Sight glass mid | Mid | OK |
| Drive motor bearing temp. | < 70 °C | 54 °C | OK |

Download: [Word](#) [Excel](#) [PDF](#)

## From paper to digital with Actarion

- **AI authoring:** turn manufacturer manuals and existing PM sheets into step-by-step digital tasks.
- **AR guidance:** the technician sees which lubrication point or filter is next, directly on the machine.
- **Measured values:** input fields with limits flag NOK results immediately.
- **Audit trail:** every PM is logged with time, technician, photos and readings.
- **Remote assistance:** a specialist can join via video when a task gets complicated.

See the [preventive maintenance use case](/en/use-cases/preventive-maintenance/).

## FAQ

### What should a preventive maintenance checklist include?
Asset details, tasks by frequency, measurable limits, results, actions for deviations and sign-off.

### How often should preventive maintenance be done?
Follow the manufacturer's intervals first, then adjust based on usage, failure history and criticality.

### What is the difference between preventive and predictive maintenance?
Preventive maintenance follows fixed intervals. Predictive maintenance uses condition data, such as vibration or temperature, to decide when to act.

### Who should complete PM checklists?
Technicians for specialist tasks; operators can do daily checks under autonomous maintenance (TPM).

## Get the template

Copy the checklist or download it. **Book a free intake call** to see PM running with AR guidance.

## Related

- [Preventive maintenance use case](/en/use-cases/preventive-maintenance/)
- [Digital checklists](/en/solutions/digital-checklists/)
- [Maintenance schedule template](/en/resources/templates/maintenance-schedule/)
- [Lockout/tagout procedure](/en/resources/templates/lockout-tagout-procedure/)
