---
id: resources/roi-calculator
lang: de
url: /de/ressourcen/roi-rechner/
alternates:
  en: /en/resources/roi-calculator/
  nl: /nl/kennisbank/roi-calculator/
  de: /de/ressourcen/roi-rechner/
page_type: T11
title: "ROI-Rechner für digitale Arbeitsanweisungen | Actarion"
description: "Berechnen Sie den ROI digitaler und AR-Arbeitsanweisungen: Eingaben, Annahmen und Formel für Einsparungen bei Einarbeitung, Fehlern, Stillstand und Audit."
h1: "ROI-Rechner für digitale Arbeitsanweisungen"
keyword_primary: "roi rechner arbeitsanweisungen"
keywords_secondary: ["roi connected worker", "business case ar schulung"]
schema: ["WebApplication", "FAQPage", "BreadcrumbList"]
image: /img/illustraties/resources-roi-calculator.svg
image_alt: "Federzeichnung: Waage mit Papier-SOP und Uhr links und einem Tablet mit cyanfarbener Schrittkarte rechts, dazu ein steigender Pfeil"
cta: roi
phase: 1
updated: 2026-11-03
---

# ROI-Rechner für digitale Arbeitsanweisungen

> Der ROI digitaler Arbeitsanweisungen ist die jährliche Einsparung bei Einarbeitung, Fehlern, Stillstand und Auditvorbereitung, abzüglich der Kosten der Lösung, geteilt durch diese Kosten. Diese Seite erklärt Eingaben, Annahmen und Formel des Actarion-ROI-Rechners, damit Sie mit eigenen Zahlen einen Business Case für ein Pilotprojekt erstellen.

![Federzeichnung: Waage mit Papier-SOP und Uhr links und einem Tablet mit cyanfarbener Schrittkarte rechts, dazu ein steigender Pfeil](/img/illustraties/resources-roi-calculator.svg)

## Warum ist der Business Case schwer zu rechnen?

- Die Kosten langsamer Einarbeitung stecken in der Zeit der Teamleiter.
- Fehler und Ausschuss werden der Qualität zugeordnet, nicht der Schulung.
- Stillstand durch falsches Rüsten wird selten auf die Anweisung zurückgeführt.

## Welche Eingaben nutzt der ROI-Rechner?

| Eingabe | Einheit | Quelle |
|---|---|---|
| Neue Mitarbeitende pro Jahr (N) | Personen | HR |
| Aktuelle Einarbeitungszeit bis zur Selbstständigkeit (T₀) | Tage | Schulungsnachweise, Teamleiter |
| Erwartete Verkürzung der Einarbeitungszeit (r_t) | % | Pilotziel [CIJFER TE BEVESTIGEN] |
| Betreuungsstunden je neuer Person (B) | Stunden | Teamleiter |
| Vollkosten je Arbeitsstunde (C) | € | Controlling |
| Fehler oder Ausschuss pro Jahr durch Verfahrensfehler (E) | Anzahl | Qualität |
| Durchschnittliche Kosten je Fehler (K_e) | € | Qualität, Controlling |
| Erwartete Fehlerreduktion (r_e) | % | Pilotziel [CIJFER TE BEVESTIGEN] |
| Ungeplanter Stillstand pro Jahr durch Rüsten oder Instandhaltung (D) | Stunden | Instandhaltung, MES |
| Kosten je Stillstandsstunde (K_d) | € | Controlling |
| Erwartete Stillstandsreduktion (r_d) | % | Pilotziel [CIJFER TE BEVESTIGEN] |
| Stunden pro Jahr für Auditvorbereitung (A) | Stunden | Qualität |

## Wie wird der ROI berechnet?

1. **Einsparung Einarbeitung** = N × (T₀ × 8 h × r_t × C + B × r_t × C)
2. **Einsparung Fehler** = E × K_e × r_e
3. **Einsparung Stillstand** = D × K_d × r_d
4. **Einsparung Audit** = A × r_a × C, wobei r_a die erwartete Verkürzung der Vorbereitungszeit ist
5. **Jährlicher Nutzen** = Summe aus 1 bis 4
6. **ROI** = (jährlicher Nutzen − jährliche Kosten der Lösung) ÷ jährliche Kosten der Lösung
7. **Amortisationszeit (Monate)** = einmalige Implementierungskosten ÷ (jährlicher Nutzen ÷ 12)

Die Kosten der Lösung tragen Sie auf dieser Seite nicht ein. Sie richten sich nach Branche und Anwendungsfall und werden im Erstgespräch besprochen.

## Welche Annahmen gelten?

- Ein Arbeitstag hat 8 produktive Stunden; passen Sie das an Ihr Schichtmodell an.
- Während der Einarbeitung ist eine neue Person nicht voll produktiv; die Einsparung ist die zurückgewonnene Zeit.
- Reduktionswerte stammen aus Ihren eigenen Pilot-KPIs, nicht aus allgemeinen Benchmarks.
- Es zählen nur Fehler durch Verfahrensfehler, keine Material- oder Maschinenstörungen.
- Die Berechnung ist eine Jahresschätzung ohne Abzinsung.

## Wo finde ich den interaktiven Rechner?

Die interaktive Version läuft unter roicalculator.actarion.com. [TE BEVESTIGEN: Einbindung des Rechners auf dieser Seite]

## Wie Actarion unterstützt

- Wir helfen Ihnen, die Eingaben in der Use-Case-Discovery zu erheben.
- Das Pilotprojekt misst die Reduktionswerte an Ihrer eigenen Linie.
- Ausführungsdaten aus dem Audit-Trail machen die Nachmessung objektiv.

## Häufige Fragen

### Warum zeigt der Rechner keine Preise?
Die Kosten hängen von Branche, Anwendungsfällen und Nutzerzahl ab. Wir besprechen sie in einem kostenlosen Erstgespräch.

### Welche Reduktionswerte soll ich eintragen?
Starten Sie vorsichtig und ersetzen Sie sie durch Ihre gemessenen Pilot-KPIs.

### Kann ich Sicherheitsgewinne einrechnen?
Ja, als separate qualitative Zeile. Weniger Vorfälle sind wertvoll, aber schwer zu beziffern.

## Nächster Schritt

Sie möchten Unterstützung beim Ausfüllen? [Kostenloses Erstgespräch vereinbaren](/de/kontakt/).

## Verwandte Seiten

- [Pilotprojekt](/de/pilotprojekt/)
- [Kundenprojekte](/de/kunden/)
- [Digitale Arbeitsanweisungen](/de/loesungen/digitale-arbeitsanweisungen/)
- [Einarbeitung und Schulung](/de/anwendungsfaelle/einarbeitung-schulung/)
