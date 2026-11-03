"""build.py - ActARion whitepaper house style: JSON content -> print HTML -> A4 PDF (Chromium).

House style (derived from the website design system):
- Cover: navy #10253A, pen drawing in a sky-blue (#A9DBF5) frame, Schibsted Grotesk 800 title,
  DM Mono meta line, logo mark + wordmark.
- Interior: canvas paper #F4F7FA? -> white pages for print economy; navy text, primary #166FA9 accents.
- Chapter openers: mono number '01' in a sky circle, eyebrow, H2; lead sentence in a tint box.
- Components: summary/answer box, key takeaways (navy panel), KPI cards, tables (navy header row),
  checklists (sky check circles), numbered steps, callouts (tint), quotes (sky rule).
- Back page: navy, expert CTA with Jack and Mark, contact and website.
Usage: python3 build.py [slug|all] [lang|all]
"""
import html, json, os, re, subprocess, sys, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
F = f'file://{ROOT}/fonts'
I = f'file://{ROOT}/img'

COVER = {
    'digital-work-instructions-guide': 'ar-tablet-work-instruction.jpg',
    'sop-software-digital-standard-work': 'usecase-changeover.jpg',
    'connected-worker-platform-buyers-guide': 'ar-vision-pro.jpg',
    'roi-business-case-digital-work-instructions': 'usecase-maintenance.jpg',
    'it-security-ar-ai': 'ar-authoring-workstation.jpg',
    'frontline-training-onboarding-playbook': 'training-ar-headset.jpg',
}
NO = {
    'digital-work-instructions-guide': '01', 'sop-software-digital-standard-work': '02',
    'connected-worker-platform-buyers-guide': '03', 'roi-business-case-digital-work-instructions': '04',
    'it-security-ar-ai': '05', 'frontline-training-onboarding-playbook': '06',
}
T = {
    'en': dict(wp='Whitepaper', series='ActARion whitepaper series', contents='Contents', inshort='In short', takeaways='Key takeaways',
               faq='Frequently asked questions', sources='Sources', chapter='Chapter', reading='min read', forr='For',
               cta1='Talk your process through with an expert.', ctasub='In 30 minutes we look at your process, your numbers and the fastest route to a measurable pilot. No sales pitch, just concrete advice.',
               book='Book a free intake call', roi='Calculate your ROI', web='www.actarion.com/en', region='Benelux · DACH', updated='November 2026',
               jack='Jack Kessels · Benelux', mark='Mark Dercksen · DACH', legal='© 2026 ActARion. This whitepaper is general information, not legal or financial advice.'),
    'nl': dict(wp='Whitepaper', series='ActARion whitepaperreeks', contents='Inhoud', inshort='In het kort', takeaways='Belangrijkste inzichten',
               faq='Veelgestelde vragen', sources='Bronnen', chapter='Hoofdstuk', reading='min lezen', forr='Voor',
               cta1='Bespreek uw proces met een expert.', ctasub='In 30 minuten kijken we samen naar uw proces, uw cijfers en de snelste weg naar een meetbare pilot. Geen verkooppraatje, wel een concreet advies.',
               book='Plan een kosteloze intake', roi='Bereken uw ROI', web='www.actarion.com/nl', region='Benelux · DACH', updated='november 2026',
               jack='Jack Kessels · Benelux', mark='Mark Dercksen · DACH', legal='© 2026 ActARion. Deze whitepaper is algemene informatie, geen juridisch of financieel advies.'),
    'de': dict(wp='Whitepaper', series='ActARion Whitepaper-Reihe', contents='Inhalt', inshort='Kurz gesagt', takeaways='Die wichtigsten Erkenntnisse',
               faq='Häufige Fragen', sources='Quellen', chapter='Kapitel', reading='Min. Lesezeit', forr='Für',
               cta1='Besprechen Sie Ihren Prozess mit einem Experten.', ctasub='In 30 Minuten schauen wir gemeinsam auf Ihren Prozess, Ihre Zahlen und den schnellsten Weg zu einem messbaren Pilot. Kein Verkaufsgespräch, sondern konkreter Rat.',
               book='Kostenloses Erstgespräch vereinbaren', roi='ROI berechnen', web='www.actarion.com/de', region='Benelux · DACH', updated='November 2026',
               jack='Jack Kessels · Benelux', mark='Mark Dercksen · DACH', legal='© 2026 ActARion. Dieses Whitepaper ist eine allgemeine Information, keine Rechts- oder Finanzberatung.'),
}

def esc(s):
    s = html.escape(str(s))
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(\[[^\]]{2,80}\])', r'<span class="ph">\1</span>', s)
    return s

CHECK = '<svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#A9DBF5"/><path d="M6 10.2l2.6 2.6L14 7.4" stroke="#10253A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def block(b):
    t = b.get('type')
    if t == 'p': return f'<p>{esc(b["text"])}</p>'
    if t == 'h3': return f'<h3>{esc(b["text"])}</h3>'
    if t == 'list': return '<ul class="list">' + ''.join(f'<li>{esc(i)}</li>' for i in b['items']) + '</ul>'
    if t == 'checklist': return '<ul class="check">' + ''.join(f'<li>{CHECK}<span>{esc(i)}</span></li>' for i in b['items']) + '</ul>'
    if t == 'steps': return '<ol class="steps">' + ''.join(f'<li><span class="n">{k+1:02d}</span><div><b>{esc(s["t"])}</b><p>{esc(s["d"])}</p></div></li>' for k, s in enumerate(b['items'])) + '</ol>'
    if t == 'table':
        head = ''.join(f'<th>{esc(h)}</th>' for h in b['head'])
        rows = ''.join('<tr>' + ''.join(f'<td>{esc(c)}</td>' for c in r) + '</tr>' for r in b['rows'])
        return f'<table><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table>'
    if t == 'callout': return f'<aside class="callout"><b>{esc(b.get("title",""))}</b><p>{esc(b["text"])}</p></aside>'
    if t == 'kpis': return '<div class="kpis">' + ''.join(f'<div><span>{esc(k["n"])}</span><p>{esc(k["l"])}</p></div>' for k in b['items']) + '</div>'
    if t == 'quote': return f'<blockquote><p>“{esc(b["text"])}”</p><cite>{esc(b.get("by",""))}</cite></blockquote>'
    return ''

CSS = f"""
@font-face{{font-family:SG;src:url({F}/schibsted-800.woff2);font-weight:800}}
@font-face{{font-family:SG;src:url({F}/schibsted-800-ext.woff2);font-weight:800;unicode-range:U+0100-024F}}
@font-face{{font-family:FT;src:url({F}/figtree.woff2);font-weight:300 900}}
@font-face{{font-family:FT;src:url({F}/figtree-ext.woff2);font-weight:300 900;unicode-range:U+0100-024F}}
@font-face{{font-family:DM;src:url({F}/dmmono-500.woff2);font-weight:500}}
@page{{size:A4;margin:22mm 20mm 24mm 20mm}}
@page cover{{margin:0}}
@page back{{margin:0}}
*{{box-sizing:border-box}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;font-family:FT,Arial,sans-serif;font-size:10.4pt;line-height:1.55;color:#10253A;hyphens:auto}}
h1,h2,h3{{font-family:SG,Arial,sans-serif;font-weight:800;letter-spacing:-.02em;margin:0}}
.ph{{background:#FFF1D6;color:#6B4A00;padding:0 3px;border-radius:3px;font-size:.92em}}
strong{{font-weight:700}}
/* cover */
.cover{{page:cover;width:210mm;height:297mm;background:#10253A;color:#fff;padding:20mm 18mm 16mm;display:flex;flex-direction:column;break-after:page}}
.brand{{display:flex;align-items:center;gap:9px}}
.brand .tile{{width:30px;height:30px;border-radius:8px;background:#fff;display:flex;align-items:center;justify-content:center}}
.brand .tile img{{width:24px;height:24px}}
.brand b{{font-family:SG;font-size:17pt;letter-spacing:-.02em}} .brand b i{{font-style:normal;color:#A9DBF5}}
.cover .eyebrow{{margin-top:16mm;font-size:9pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#A9DBF5}}
.cover h1{{font-size:31pt;line-height:1.03;letter-spacing:-.03em;margin-top:5mm;max-width:165mm;text-wrap:balance}}
.cover .sub{{font-size:12.5pt;line-height:1.45;color:#D7E3EC;margin-top:5mm;max-width:150mm}}
.cover .frame{{margin-top:auto;border-radius:22px;background:#A9DBF5;padding:9px}}
.cover .frame img{{display:block;width:100%;height:98mm;object-fit:cover;border-radius:15px}}
.cover .meta{{display:flex;justify-content:space-between;margin-top:7mm;font-family:DM;font-size:8.5pt;color:#B8CBDA}}
.cover .no{{font-family:DM;font-size:9pt;color:#A9DBF5}}
/* intro page */
.intro{{break-after:page}} .intro .answer .for{{margin:2mm 0 0;font-size:8.5pt;color:#4A5D6E}}
.answer{{border-left:4px solid #166FA9;background:#E6F1F9;border-radius:0 14px 14px 0;padding:5mm 6mm;margin:0 0 7mm}}
.lab{{font-size:8pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#166FA9;margin:0 0 2mm}}
.answer p{{font-size:12pt;line-height:1.5;margin:0}}
.takeaways{{background:#10253A;color:#fff;border-radius:18px;padding:5mm 7mm;margin-bottom:5mm}}
.takeaways .lab{{color:#A9DBF5}}
.takeaways ol{{margin:0;padding:0;list-style:none;counter-reset:k}}
.takeaways li{{counter-increment:k;display:flex;gap:4mm;padding:1.6mm 0;font-size:9pt;border-top:1px solid #2C4560;color:#D7E3EC}}
.takeaways li:first-child{{border-top:0}}
.takeaways li:before{{content:counter(k,decimal-leading-zero);font-family:DM;color:#A9DBF5;flex:none}}
.toc h2{{font-size:15pt;margin-bottom:3mm}}
.toc ol{{list-style:none;margin:0;padding:0}}
.toc li{{display:flex;gap:4mm;padding:1.6mm 0;border-bottom:1px solid #DCE4EB;font-weight:600}}
.toc li span{{font-family:DM;color:#166FA9;width:9mm}}
.for{{font-size:9pt;color:#4A5D6E;margin-top:5mm}}
/* chapters */
.ch{{margin-top:9mm}} .chtop{{break-inside:avoid}} h3{{break-after:avoid}} .ch:first-of-type{{break-before:page}} .ch>header,.ch h2{{break-after:avoid}}
.chead{{display:flex;align-items:center;gap:4mm;margin-bottom:3mm}}
.chead .num{{width:11mm;height:11mm;border-radius:50%;background:#A9DBF5;font-family:DM;font-size:10pt;display:flex;align-items:center;justify-content:center;flex:none}}
.chead .lab{{margin:0}}
.ch h2{{font-size:21pt;line-height:1.08;margin-bottom:4mm;text-wrap:balance}}
.lead{{font-size:12pt;line-height:1.5;font-weight:600;margin:0 0 5mm;padding-bottom:4mm;border-bottom:2px solid #A9DBF5}}
p{{margin:0 0 3mm}}
h3{{font-size:12.5pt;margin:5mm 0 2mm}}
.list{{margin:0 0 4mm;padding-left:5mm}} .list li{{margin-bottom:1.2mm}}
.check{{list-style:none;margin:0 0 4mm;padding:0}} .check li{{display:flex;gap:3mm;align-items:flex-start;margin-bottom:2mm;break-inside:avoid}} .check svg{{flex:none;margin-top:1px}}
.steps{{list-style:none;margin:0 0 4mm;padding:0}}
.steps li{{display:flex;gap:4mm;border:1px solid #DCE4EB;border-radius:12px;padding:3mm 4mm;margin-bottom:2mm;break-inside:avoid}}
.steps .n{{font-family:DM;width:8mm;height:8mm;border-radius:50%;background:#A9DBF5;display:flex;align-items:center;justify-content:center;font-size:8pt;flex:none}}
.steps p{{margin:.5mm 0 0;color:#4A5D6E}}
table{{width:100%;border-collapse:separate;border-spacing:0;margin:2mm 0 5mm;font-size:9pt;border:1px solid #DCE4EB;border-radius:12px;overflow:hidden;break-inside:auto}}
th{{background:#10253A;color:#fff;text-align:left;padding:2.4mm 3mm;font-weight:700}}
td{{padding:2.2mm 3mm;border-top:1px solid #DCE4EB;vertical-align:top}}
tr{{break-inside:avoid}} tbody tr:nth-child(even) td{{background:#F4F7FA}}
.callout{{background:#E6F1F9;border-radius:14px;padding:4mm 5mm;margin:2mm 0 5mm;break-inside:avoid}}
.callout b{{display:block;margin-bottom:1mm}} .callout p{{margin:0}}
.kpis{{display:grid;grid-template-columns:repeat(auto-fit,minmax(38mm,1fr));gap:3mm;margin:2mm 0 5mm;break-inside:avoid}}
.kpis div{{background:#10253A;border-radius:14px;padding:4mm}}
.kpis span{{font-family:DM;font-size:16pt;color:#A9DBF5}} .kpis p{{color:#B8CBDA;font-size:8.5pt;margin:1mm 0 0;line-height:1.35}}
blockquote{{margin:3mm 0 5mm;padding:1mm 0 1mm 5mm;border-left:4px solid #A9DBF5;break-inside:avoid}}
blockquote p{{font-family:SG;font-size:13pt;line-height:1.3;margin:0}} cite{{font-style:normal;font-size:8.5pt;color:#4A5D6E}}
/* faq + sources */
.faq .q{{break-inside:avoid;border-bottom:1px solid #DCE4EB;padding:3mm 0}} .faq .q b{{display:block;margin-bottom:1mm}} .faq .q p{{margin:0;color:#4A5D6E}}
.src ol{{padding-left:5mm;font-size:8.5pt;color:#4A5D6E}} .src a{{color:#166FA9;word-break:break-all}}
/* back */
.back{{page:back;width:210mm;height:297mm;background:#10253A;color:#fff;padding:24mm 18mm 16mm;display:flex;flex-direction:column;break-before:page}}
.back .ppl{{display:flex;margin-top:auto}} .back .ppl img{{width:34mm;height:34mm;border-radius:50%;border:4px solid #A9DBF5;object-fit:cover;background:#F4F7FA}}
.back .ppl img+img{{margin-left:-7mm;border-color:#2C4560}}
.back h2{{font-size:27pt;line-height:1.05;margin-top:8mm;max-width:150mm}}
.back .s{{color:#D7E3EC;font-size:12pt;max-width:150mm;margin-top:4mm}}
.back .btns{{display:flex;gap:4mm;margin-top:8mm}}
.back .btn{{border-radius:999px;padding:3.5mm 7mm;font-weight:800;font-size:11pt}}
.back .b1{{background:#A9DBF5;color:#10253A}} .back .b2{{border:2px solid #A9DBF5;color:#fff}}
.back .who{{display:flex;gap:10mm;margin-top:8mm;font-size:9.5pt;color:#B8CBDA}}
.back .foot{{margin-top:auto;padding-top:6mm;border-top:1px solid #2C4560;display:flex;justify-content:space-between;align-items:center;font-size:8pt;color:#8FA6B8}}
"""

def render(d):
    L = T[d['lang']]
    slug = d['slug']
    chs = d['chapters']
    out = [f'<!doctype html><html lang="{d["lang"]}"><head><meta charset="utf-8"><title>{esc(d["title"])}</title><style>{CSS}</style></head><body>']
    brand = f'<div class="brand"><span class="tile"><img src="{I}/Actarionlogo.png"></span><b>Act<i>AR</i>ion</b></div>'
    out.append(f'<section class="cover">{brand}<div class="eyebrow">{L["wp"]} · {esc(d.get("keyword",""))}</div><h1>{esc(d["title"])}</h1><p class="sub">{esc(d.get("subtitle",""))}</p>'
               f'<div class="frame"><img src="{I}/{COVER.get(slug, "ar-tablet-work-instruction.jpg")}"></div>'
               f'<div class="meta"><span class="no">{L["series"]} · {NO.get(slug,"")}</span><span>{d.get("readingTime",10)} {L["reading"]} · {L["updated"]}</span></div></section>')
    tk = ''.join(f'<li>{esc(k)}</li>' for k in d.get('keyTakeaways', []))
    toc = ''.join(f'<li><span>{i+1:02d}</span>{esc(c["title"])}</li>' for i, c in enumerate(chs))
    out.append(f'<section class="intro"><div class="answer"><p class="lab">{L["inshort"]}</p><p>{esc(d.get("answer",""))}</p><p class="for">{L["forr"]}: {esc(d.get("audience",""))}</p></div>'
               f'<div class="takeaways"><p class="lab">{L["takeaways"]}</p><ol>{tk}</ol></div>'
               f'<div class="toc"><h2>{L["contents"]}</h2><ol>{toc}</ol></div></section>')
    for i, c in enumerate(chs):
        body = ''.join(block(b) for b in c.get('blocks', []))
        out.append(f'<section class="ch"><div class="chtop"><div class="chead"><span class="num">{i+1:02d}</span><p class="lab">{L["chapter"]} {i+1}</p></div><h2>{esc(c["title"])}</h2>'
                   + (f'<p class="lead">{esc(c["lead"])}</p>' if c.get('lead') else '') + '</div>' + body + '</section>')
    if d.get('faq'):
        out.append('<section class="ch faq"><div class="chtop"><div class="chead"><span class="num">?</span></div><h2>' + L['faq'] + '</h2>' + ''.join(f'<div class="q"><b>{esc(f["q"])}</b><p>{esc(f["a"])}</p></div>' + ('</div>' if i==0 else '') for i,f in enumerate(d['faq'])) + '</section>')
    if d.get('sources'):
        out.append('<section class="src" style="margin-top:8mm"><p class="lab">' + L['sources'] + '</p><ol>' + ''.join(f'<li>{esc(s["title"])} — <a href="{html.escape(s["url"])}">{html.escape(s["url"])}</a></li>' for s in d['sources']) + '</ol></section>')
    cta = d.get('cta') or {}
    out.append(f'<section class="back">{brand}<div class="ppl"><img src="{I}/team-jack-kessels.jpg"><img src="{I}/team-marc-dercksen.jpg"></div>'
               f'<h2>{esc(cta.get("title") or L["cta1"])}</h2><p class="s">{esc(cta.get("text") or L["ctasub"])}</p>'
               f'<div class="btns"><span class="btn b1">{L["book"]}</span><span class="btn b2">{L["roi"]}</span></div>'
               f'<div class="who"><span>{L["jack"]}</span><span>{L["mark"]}</span><span>hello@actarion.com</span></div>'
               f'<div class="foot"><span>{L["web"]} · {L["region"]}</span><span>{L["legal"]}</span></div></section>')
    out.append('</body></html>')
    return ''.join(out)

def main():
    want_slug = sys.argv[1] if len(sys.argv) > 1 else 'all'
    want_lang = sys.argv[2] if len(sys.argv) > 2 else 'all'
    jobs = []
    for f in sorted(glob.glob(os.environ.get('WP_GLOB', f'{ROOT}/content/*.json'))):
        d = json.load(open(f))
        if want_slug not in ('all', d['slug']) or want_lang not in ('all', d['lang']):
            continue
        h = f'{ROOT}/out/{d["slug"]}.{d["lang"]}.html'
        open(h, 'w').write(render(d))
        jobs.append((h, f'{ROOT}/out/{d["lang"]}/{d["slug"]}.pdf', d['title']))
    os.makedirs(f'{ROOT}/out/en', exist_ok=True); os.makedirs(f'{ROOT}/out/nl', exist_ok=True); os.makedirs(f'{ROOT}/out/de', exist_ok=True)
    json.dump(jobs, open(f'{ROOT}/out/jobs.json', 'w'))
    subprocess.run(['node', f'{ROOT}/pdf.js', f'{ROOT}/out/jobs.json'], check=True)
    from pypdf import PdfReader, PdfWriter
    for _, pdf, title in jobs:
        body, plain = PdfReader(pdf + '.body'), PdfReader(pdf + '.plain')
        n = len(body.pages)
        w = PdfWriter()
        for i in range(n):
            w.add_page((plain if i in (0, n - 1) else body).pages[i])
        w.add_metadata({'/Title': title, '/Author': 'ActARion', '/Subject': 'Whitepaper'})
        w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
        with open(pdf, 'wb') as fh:
            w.write(fh)
        os.remove(pdf + '.body'); os.remove(pdf + '.plain')
        print('pdf', pdf, n, 'pages', os.path.getsize(pdf) // 1024, 'kB')

if __name__ == '__main__':
    main()
