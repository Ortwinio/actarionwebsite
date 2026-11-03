---
id: resources/roi-calculator
lang: en
url: /en/resources/roi-calculator/
alternates:
  en: /en/resources/roi-calculator/
  nl: /nl/kennisbank/roi-calculator/
  de: /de/ressourcen/roi-rechner/
page_type: T11
title: "ROI Calculator for Digital Work Instructions | Actarion"
description: "Estimate the ROI of digital and AR work instructions: inputs, assumptions and formula for savings on onboarding, errors, downtime and audit preparation."
h1: "ROI calculator for digital work instructions"
keyword_primary: "work instructions roi calculator"
keywords_secondary: ["connected worker roi", "ar training roi"]
schema: ["WebApplication", "FAQPage", "BreadcrumbList"]
image: /images/resources-roi-calculator-1600.webp
image_alt: "A technician holds an iPad up to a control room; the screen shows AR work instruction steps for work instructions roi calculator"
cta: roi
phase: 1
updated: 2026-11-03
---

# ROI calculator for digital work instructions

> The ROI of digital work instructions is the yearly saving on onboarding, errors, downtime and audit preparation, minus the cost of the solution, divided by that cost. This page explains the inputs, assumptions and formula used in the Actarion ROI calculator, so you can build a business case for a pilot with your own numbers.

![A technician holds an iPad up to a control room; the screen shows AR work instruction steps for work instructions roi calculator](/images/resources-roi-calculator-1600.webp)

## Why is the business case hard to make?

- The cost of slow onboarding is hidden in team leads' time.
- Errors and rejects are booked under quality, not training.
- Downtime from wrong changeovers is rarely traced back to the instruction.

## Which inputs does the ROI calculator use?

| Input | Unit | Where to find it |
|---|---|---|
| New hires per year (N) | people | HR |
| Current time to competence (T₀) | days | Training records, team leads |
| Expected reduction in time to competence (r_t) | % | Pilot target [CIJFER TE BEVESTIGEN] |
| Trainer/buddy hours per new hire (B) | hours | Team leads |
| Loaded labor cost per hour (C) | € | Finance |
| Errors or rejects per year caused by procedure mistakes (E) | count | Quality |
| Average cost per error (K_e) | € | Quality, finance |
| Expected error reduction (r_e) | % | Pilot target [CIJFER TE BEVESTIGEN] |
| Unplanned downtime hours per year linked to changeovers or maintenance (D) | hours | Maintenance, MES |
| Cost per downtime hour (K_d) | € | Finance |
| Expected downtime reduction (r_d) | % | Pilot target [CIJFER TE BEVESTIGEN] |
| Hours per year spent on audit preparation (A) | hours | Quality |

## How is the ROI calculated?

1. **Training savings** = N × (T₀ × 8 h × r_t × C + B × r_t × C)
2. **Error savings** = E × K_e × r_e
3. **Downtime savings** = D × K_d × r_d
4. **Audit savings** = A × r_a × C, where r_a is the expected reduction in preparation time
5. **Annual benefit** = sum of 1 to 4
6. **ROI** = (annual benefit − annual cost of the solution) ÷ annual cost of the solution
7. **Payback period (months)** = one-off implementation cost ÷ (annual benefit ÷ 12)

The cost of the solution is not filled in on this page. It is tailored per sector and use case and discussed in the intake.

## Which assumptions apply?

- A working day has 8 productive hours; adjust for your shift model.
- During onboarding, a new hire is not fully productive; the saving is the time won back.
- Reduction percentages come from your own pilot KPIs, not from generic benchmarks.
- Only errors caused by procedure mistakes count, not material or machine faults.
- The calculation is an estimate per year, without discounting.

## Where is the interactive calculator?

The interactive version runs at roicalculator.actarion.com. [TE BEVESTIGEN: integratie van de calculator op deze pagina]

## How Actarion helps

- We help you collect the input data during use case discovery.
- The pilot measures the reduction percentages on your own line.
- Execution data from the audit trail makes the after-measurement objective.

## FAQ

### Why does the calculator not show prices?
Costs depend on sector, use cases and number of users. We discuss them in a free intake.

### Which reduction percentages should I use?
Start conservatively and replace them with your measured pilot KPIs.

### Can I include safety benefits?
Yes, as a separate qualitative line. Fewer incidents are valuable but hard to price.

## Next step

Want help filling in the numbers? [Book a free intake call](/en/contact/).

## Related

- [Pilot approach](/en/pilot/)
- [Customer cases](/en/customers/)
- [Digital work instructions](/en/solutions/digital-work-instructions/)
- [Onboarding and training](/en/use-cases/onboarding-training/)
