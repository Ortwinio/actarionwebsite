#!/usr/bin/env python3
"""Convert the Markdown pages from the content-import branch (import/content/{en,nl,de}/**/index.md)
into src/content/imported.ts (Partial<PageContent> per locale per route key).

Usage: python3 tools/import-content.py /path/to/import
Matching: the page URL in the front matter is matched to the route catalog (src/content/catalog.ts).
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMP = sys.argv[1] if len(sys.argv) > 1 else '/tmp/imp/import'

# ---- route catalog: path per locale -> key
cat = open(os.path.join(ROOT, 'src/content/catalog.ts')).read()
rows = re.findall(r"\[\s*'(\w+)',\s*'(\w+)',\s*(?:'\w*'|null|undefined),\s*\d+,\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'", cat)
by_path = {}
for key, typ, en, nl, de in rows:
    for loc, p in (('en', en), ('nl', nl), ('de', de)):
        by_path[f'/{loc}/' + (p + '/' if p else '')] = key

RELATED_H = re.compile(r'^(related|gerelateerd|verwandte seiten|verwandte themen|weiterführend|verder lezen|further reading|lees verder)$', re.I)
# Blocks the page templates already show (CTA band, download form): skip to avoid duplicates.
DUP_H = re.compile(r'^(next step|volgende stap|nächster schritt|plan een kosteloze intake|book a free intake call|kostenloses erstgespräch vereinbaren|download de template|get the template|vorlage sichern)$', re.I)
FAQ_H = re.compile(r'^(faq|frequently asked questions|veelgestelde vragen|häufige fragen|häufig gestellte fragen)', re.I)
PHOTOS = {  # photo compositions (import/images) by EN page id
    'use-cases/assembly': '/img/foto/ipad-robot.webp',
    'industries/manufacturing': '/img/foto/ipad-robot.webp',
    'use-cases/safety-loto': '/img/foto/telefoon-loto.webp',
    'resources/templates/loto-procedure': '/img/foto/telefoon-loto.webp',
    'hardware/apple-vision-pro': '/img/foto/visionpro-hal.webp',
    'platform/ar-guidance': '/img/foto/visionpro-hal.webp',
}


def strip_md(s):
    s = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'\1', s)
    s = re.sub(r'(?<!\w)\*(.+?)\*(?!\w)', r'\1', s)
    return s.replace('`', '').strip()


def front(s):
    _, fm, body = s.split('---', 2)
    d = {}
    for line in fm.splitlines():
        m = re.match(r'^(\w+):\s*(.*)$', line)
        if m:
            v = m.group(2).strip()
            if v.startswith('"') and v.endswith('"'):
                v = json.loads(v)
            d[m.group(1)] = v
    return d, body


def blocks(lines):
    """Split lines into blocks: ('p', text) ('ul', [..]) ('ol', [..]) ('table', rows) ('h3', text)"""
    out, i = [], 0
    while i < len(lines):
        l = lines[i].rstrip()
        if not l.strip():
            i += 1; continue
        if l.startswith('### '):
            out.append(('h3', l[4:].strip())); i += 1
        elif re.match(r'^\s*[-*] ', l):
            items = []
            while i < len(lines) and (re.match(r'^\s*[-*] ', lines[i]) or (lines[i].startswith('  ') and lines[i].strip() and items)):
                if re.match(r'^\s*[-*] ', lines[i]):
                    items.append(re.sub(r'^\s*[-*] (\[[ x]\] )?', '', lines[i]).strip())
                else:
                    items[-1] += ' ' + lines[i].strip()
                i += 1
            out.append(('ul', items))
        elif re.match(r'^\d+\. ', l):
            items = []
            while i < len(lines) and (re.match(r'^\d+\. ', lines[i]) or (lines[i].startswith('   ') and lines[i].strip() and items)):
                if re.match(r'^\d+\. ', lines[i]):
                    items.append(re.sub(r'^\d+\. ', '', lines[i]).strip())
                else:
                    items[-1] += ' ' + lines[i].strip()
                i += 1
            out.append(('ol', items))
        elif l.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                if not all(re.match(r'^:?-+:?$', c) for c in cells):
                    rows.append(cells)
                i += 1
            out.append(('table', rows))
        elif l.startswith('!['):
            i += 1
        else:
            para = []
            while i < len(lines) and lines[i].strip() and not re.match(r'^(#|\s*[-*] |\d+\. |\||!\[|>)', lines[i]):
                para.append(lines[i].strip()); i += 1
            if para:
                out.append(('p', ' '.join(para)))
            else:
                i += 1
    return out


def split_lead(item):
    m = re.match(r'^\*\*(.+?)\*\*[:.]?\s*(.*)$', item)
    if m:
        return m.group(1).rstrip(':').strip(), m.group(2).strip()
    return None


def to_sections(h2, bl):
    secs, title = [], h2
    def push(s):
        nonlocal title
        s['h2'] = title; title = ''
        secs.append(s)
    # H2 made of H3 sub-blocks with prose -> features
    if bl and bl[0][0] == 'h3' and all(k in ('h3', 'p') for k, _ in bl):
        items, cur = [], None
        for k, v in bl:
            if k == 'h3':
                cur = {'title': strip_md(v), 'text': ''}; items.append(cur)
            elif cur:
                cur['text'] = (cur['text'] + ' ' + v).strip()
        push({'kind': 'features', 'items': items})
        return secs
    text = []
    def flush():
        nonlocal text
        if text:
            push({'kind': 'text', 'body': text}); text = []
    for k, v in bl:
        if k == 'p':
            text.append(v)
        elif k == 'h3':
            text.append('**' + v + '**')
        elif k == 'ol':
            flush()
            steps = []
            for it in v:
                sl = split_lead(it)
                steps.append({'title': sl[0], 'text': sl[1]} if sl else {'title': strip_md(it.split('. ')[0])[:80], 'text': it if len(it) > 80 else ''})
            push({'kind': 'steps', 'steps': steps})
        elif k == 'ul':
            flush()
            push({'kind': 'checklist', 'items': v})
        elif k == 'table' and len(v) >= 2:
            flush()
            push({'kind': 'table', 'head': v[0], 'rows': v[1:]})
    flush()
    return secs


def convert(path):
    d, body = front(open(path).read())
    lines = body.splitlines()
    answer, h1 = None, d.get('h1')
    chunks, cur = [], None
    pre = []
    for l in lines:
        if l.startswith('# '):
            h1 = l[2:].strip(); continue
        if l.startswith('> ') and answer is None and cur is None:
            answer = l[2:].strip(); continue
        if l.startswith('>') and cur is None and answer is not None and l[1:].strip():
            answer += ' ' + l[1:].strip(); continue
        if l.startswith('## '):
            cur = [l[3:].strip(), []]; chunks.append(cur); continue
        (cur[1] if cur else pre).append(l)
    sections, faq, related = [], [], []
    intro = [v for k, v in blocks(pre) if k == 'p']
    for h2, bl_lines in chunks:
        bl = blocks(bl_lines)
        if RELATED_H.match(h2):
            for link in re.findall(r'\]\((/[^)\s]+)\)', '\n'.join(bl_lines)):
                k = by_path.get(link if link.endswith('/') else link + '/')
                if k and k not in related:
                    related.append(k)
            continue
        if DUP_H.match(h2):
            continue
        if FAQ_H.match(h2):
            q = None
            for k, v in bl:
                if k == 'h3':
                    q = {'q': strip_md(v), 'a': ''}; faq.append(q)
                elif k == 'p' and q is not None:
                    q['a'] = (q['a'] + ' ' + strip_md(v)).strip()
                elif k == 'ul' and q is not None:
                    q['a'] = (q['a'] + ' ' + '; '.join(strip_md(x) for x in v)).strip()
            continue
        sections += to_sections(h2, bl)
    eid = d['id']
    img = d.get('image', 'none')
    image = PHOTOS.get(eid) or (('/img/illustraties/' + os.path.basename(img).replace('.svg', '.webp')) if img and img != 'none' else None)
    if image and image.startswith('/img/illustraties/') and not os.path.exists(os.path.join(ROOT, 'public', image.lstrip('/'))):
        image = None
    title = re.sub(r'\s*\|\s*Actarion\s*$', ' | ActARion', d['title'])
    page = {
        'metaTitle': title,
        'metaDescription': d['description'],
        'h1': h1,
        'lead': strip_md(intro[0]) if intro else d['description'],
        'answer': strip_md(answer) if answer else None,
        'sections': sections,
        'faq': [f for f in faq if f['a']],
        'updated': d.get('updated', '2026-11-03'),
        'placeholder': False,
        'image': image,
        'related': related,
        'heroImage': d.get('image_alt') or None,
        'keyword': d.get('keyword_primary'),
    }
    return d['lang'], d['url'], {k: v for k, v in page.items() if v not in (None, [], '')}


out = {'en': {}, 'nl': {}, 'de': {}}
unmatched = []
for f in sorted(glob.glob(os.path.join(IMP, 'content/*/**/index.md'), recursive=True)):
    lang, url, page = convert(f)
    key = by_path.get(url)
    if not key:
        unmatched.append(url); continue
    page.pop('keyword', None)
    out[lang][key] = page

ts = ("// Generated by tools/import-content.py from the content-import branch (import/content). Do not edit by hand.\n"
      "import type { PageContent } from './types';\n\n"
      "export const importedPages: Record<'en' | 'nl' | 'de', Record<string, Partial<PageContent>>> = "
      + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
open(os.path.join(ROOT, 'src/content/imported.ts'), 'w').write(ts)
print({k: len(v) for k, v in out.items()}, 'unmatched:', unmatched)
