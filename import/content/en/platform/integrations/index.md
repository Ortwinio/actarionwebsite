---
id: platform/integrations
lang: en
url: /en/platform/integrations/
alternates:
  en: /en/platform/integrations/
  nl: /nl/platform/integraties/
  de: /de/plattform/integrationen/
page_type: T3
title: "Integrations: SAP, MES and LMS Connections | Actarion"
description: "Connect digital work instructions to SAP, MES, LMS and BI tools. Export execution data, start tasks from orders and keep skills in sync. Scope per project."
h1: "Integrations with SAP, MES and LMS for work instructions"
keyword_primary: "work instruction integration"
keywords_secondary: ["SAP integration", "MES integration", "LMS integration", "Power BI"]
schema: ["SoftwareApplication", "FAQPage", "BreadcrumbList"]
image: /images/platform-integrations-1600.webp
image_alt: "A technician holds an iPad up to a control room; the screen shows AR work instruction steps for work instruction integration"
cta: intake
phase: 1
updated: 2026-11-03
---

# Integrations with SAP, MES and LMS for work instructions

> Work instruction integration means exchanging data between your digital work instructions and the systems you already run, such as ERP (for example SAP), MES, LMS or BI tools. The Actarion platform offers CSV export and API connections. Which systems you connect, and how, is scoped per project during the pilot.

![A technician holds an iPad up to a control room; the screen shows AR work instruction steps for work instruction integration](/images/platform-integrations-1600.webp)

## Why do isolated tools create extra work?

- Operators type the same order number into three systems.
- Training records in the LMS do not match who actually does the work.
- Execution data stays in a separate tool, and nobody combines it with OEE or quality data.
- IT blocks new software that does not fit the architecture.

## What can you connect?

The table shows typical integration goals. The available connection per system is confirmed during scoping.

| System | Typical goal | Status |
|---|---|---|
| BI (for example Power BI) | Analyze execution and deviation data | API and CSV export available |
| ERP (for example SAP) | Start an instruction from a work or maintenance order; return results | [TE BEVESTIGEN: standard SAP connector or API project] |
| MES | Link instructions to an order, product or workstation | [TE BEVESTIGEN: MES integration options] |
| LMS / HR | Sync skills, training and certificates | [TE BEVESTIGEN: LMS integration options] |
| Identity (SSO) | Log in with company accounts | [TE BEVESTIGEN: SSO support] |

## How does an integration project work?

1. **Define the goal.** Which data must go where, and why? Start from the pilot KPIs.
2. **Check the options.** Export, API or a ready-made connector, per system.
3. **Start simple.** Many pilots start with CSV export. That proves the value before building more.
4. **Build and test.** Your IT team or integrator connects through the API; Actarion supports.
5. **Run and monitor.** Data flows are checked as part of scale-up.

## What does it bring each role?

| Role | Benefit |
|---|---|
| Operator | Fewer double entries; the right instruction opens for the order |
| Team leader | One picture of output, deviations and skills |
| Quality / HSE | Execution data next to quality and batch data |
| HR / L&D | Skills and training records in sync |

## Technical points

- **Available:** CSV export; API connections to BI and ERP tools.
- **Authentication and API documentation:** [TE BEVESTIGEN]
- **Data ownership:** your execution data remains yours. [TE BEVESTIGEN: contractual data ownership]
- See also [security](/en/platform/security/).

## How Actarion helps

- We bring IT in early and document the data flows.
- We start the pilot with a simple export and plan integrations for scale-up.
- We coordinate between your IT, your integrator and technology partner DeepSight.

## FAQ

### Do we need an integration for a pilot?
Usually not. CSV export is often enough to measure the pilot KPIs.

### Is there a standard SAP connector?
[TE BEVESTIGEN]. Connection through the API is the general route.

### Who builds the integration?
Your IT team or integrator, supported by Actarion. Scope and effort are agreed per project.

## Discuss your system landscape

Book a free intake call. We review which integrations make sense for your first use case.

**[Book a free intake call](/en/demo/)**

## Related

- [Connected worker platform](/en/solutions/connected-worker-platform/)
- [Analytics and audit trail](/en/platform/analytics-audit-trail/)
- [Security](/en/platform/security/)
- [Start a pilot](/en/pilot/)
