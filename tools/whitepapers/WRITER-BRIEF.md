# Whitepaper writer brief (ActARion, 2026)

ActARion = European implementation partner for digital and AR work instructions (platform: DeepSight; ActARion does use-case selection, pilots with baseline measurement, content, change management, rollout in Benelux and DACH). Contacts: Jack Kessels (Benelux), Mark Dercksen (DACH). CTA everywhere: free intake call ("Plan een kosteloze intake" / "Book a free intake call" / "Kostenloses Erstgespräch vereinbaren"). NEVER mention prices.
Audience: operations managers, plant managers, quality/HSE, L&D/training managers, IT/OT in manufacturing, pharma, food, energy, MRO.
Voice: concrete, business-like, no hype. NL uses "u" (formal), DE uses "Sie". EN = UK spelling. Localise, do not translate literally (DE: Werkerassistenzsystem, Arbeitsanweisung, Rüsten/Rüstzeit, Einarbeitung, Qualifikationsmatrix, Instandhaltung; NL: werkinstructie(s), omstellen/omsteltijd, inwerken, competentiematrix, preventief onderhoud).
Old whitepapers (EN, reuse ideas freely, improve, restructure): /home/claude/wp/old/*.mdx
Facts: no invented statistics or customer results. Use public, verifiable sources for any figure (do web searches; cite in `sources` with title + URL). Where a customer figure or company fact is needed, write a bracketed placeholder like "[klantcijfer: … toevoegen]" / "[customer figure: …]" / "[Kundenzahl: …]". Keep placeholders rare (max ~5 per language).
Length per language: 1,800–2,600 words of body text. 5–7 chapters. Use varied block types (tables, checklists, steps, callouts, KPIs).
GEO: every chapter starts with a 1–2 sentence direct answer; use question-style chapter titles where natural; include definitions; short self-contained paragraphs.

## Output
One JSON file per whitepaper per language: /home/claude/wp/content/<slug>.<lang>.json (lang = en|nl|de). Exact schema:
{
 "slug": "...", "lang": "en",
 "title": "...", "subtitle": "...",
 "keyword": "primary keyword in this language",
 "metaTitle": "30–60 chars, ends with ' | ActARion'",
 "metaDescription": "140–155 chars",
 "audience": "for whom (short)",
 "readingTime": 12,
 "answer": "40–60 word self-contained summary (GEO)",
 "keyTakeaways": ["…", "…", "…", "…"],
 "chapters": [
   { "title": "…", "lead": "1–2 sentence direct answer",
     "blocks": [
       {"type":"p","text":"…"},
       {"type":"h3","text":"…"},
       {"type":"list","items":["…"]},
       {"type":"checklist","items":["…"]},
       {"type":"steps","items":[{"t":"title","d":"description"}]},
       {"type":"table","head":["…"],"rows":[["…"]]},
       {"type":"callout","title":"…","text":"…"},
       {"type":"kpis","items":[{"n":"…","l":"…"}]},
       {"type":"quote","text":"…","by":"…"}
     ] }
 ],
 "faq": [{"q":"…","a":"…"}],
 "sources": [{"title":"…","url":"https://…"}],
 "cta": {"title":"…","text":"…"}
}
Inline emphasis: you may use **bold** inside text. No HTML. Validate each file with `python3 -m json.tool`.
When done, reply with the files written, word counts per file (body text), and the list of placeholders.
