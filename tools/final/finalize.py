#!/usr/bin/env python3
"""Make the imported strategy content final: replace every [TE BEVESTIGEN ...] / [CIJFER TE BEVESTIGEN]
placeholder with the best available answer (site content, DeepSight public documentation).
Run after tools/import-content.py:  python3 tools/final/finalize.py
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from faq_answers import A, ROWS
from manual import M, DEL, SECTION, DROP_COL, CELL_ALL
import legal

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
F = os.path.join(ROOT, 'src/content/imported.ts')
LOC = {'nl': 0, 'en': 1, 'de': 2}

src = open(F).read()
head, body = src[: src.index('= {') + 2], src[src.index('= {') + 2 :]
tail = body[body.rstrip().rindex('}') + 1 :]
data = json.loads(body[: body.rstrip().rindex('}') + 1])

TOK = r'`?\[(?:CIJFER )?TE BEVESTIGEN(?::[^\]]*)?\]`?'
LABEL_MAX_WORDS = 4
LABEL_ONLY = '[[LABEL-ONLY]]'


def clean(s):
    if not re.search(TOK, s):
        return s
    # split into sentences, keeping markdown links intact
    parts = re.split(r'(?<=[.!?])\s+(?=[A-Z*\[`(ÄÖÜ])', s)
    out = []
    for p in parts:
        if not re.search(TOK, p):
            out.append(p)
            continue
        first = re.search(TOK, p).start()
        colon = p.rfind(':', 0, first)
        if colon != -1 and ('CIJFER' in p or not p[colon + 1 : first].strip(' *`')):
            label = p[:colon]
            if len(re.sub(r'[*`]', '', label).split()) <= LABEL_MAX_WORDS and '](' not in label:
                if label.strip().startswith('**'):
                    out.append(label.strip() + ':' + ' ' + LABEL_ONLY)  # keep list label, flag for manual copy
                continue  # "Klantcijfers: [..]." -> drop the sentence
            out.append(label.rstrip() + '.')
            continue
        p = re.sub(r'\s*' + TOK, '', p)
        p = re.sub(r'\s+([.,;:)])', r'\1', p).strip()
        p = re.sub(r'^[.,;:]\s*', '', p)
        if p.strip(' .'):
            out.append(p)
    r = ' '.join(out).strip()
    r = re.sub(r'\.\.', '.', r)
    return r


def walk(o, fn, path=''):
    if isinstance(o, str):
        return fn(o, path)
    if isinstance(o, dict):
        return {k: walk(v, fn, f'{path}.{k}') for k, v in o.items()}
    if isinstance(o, list):
        res = []
        for i, v in enumerate(o):
            nv = walk(v, fn, f'{path}[{i}]')
            if nv is not DEL:
                res.append(nv)
        return res
    return o


AND = {'nl': 'en', 'en': 'and', 'de': 'und'}


def nordics(s, loc):
    a = AND[loc]
    s = re.sub(r'Benelux, DACH,? (?:en|and|und) (?:de |the |den )?Nordics', f'Benelux {a} DACH', s)
    s = re.sub(r'Benelux, DACH, Nordics', f'Benelux {a} DACH', s)
    s = re.sub(r',\s*Nordics', '', s)
    s = re.sub(r'\s*(?:,|en|and|und)\s+(?:de |the |den )?Nordics', '', s)
    return s


for loc, pages in data.items():
    li = LOC[loc]
    for key, pg in pages.items():
        # FAQ answers
        for i, f in enumerate(pg.get('faq') or []):
            aid = ROWS.get((key, i))
            if aid and re.search(r'\[', f['a']):
                f['a'] = A[aid][li]
        # whole sections
        for (k, si), val in SECTION.items():
            if k == key:
                pg['sections'][si] = val[li]
        for (k, si), col in DROP_COL.items():
            if k == key:
                sec = pg['sections'][si]
                sec['head'] = [h for j, h in enumerate(sec['head']) if j != col]
                sec['rows'] = [[c for j, c in enumerate(r) if j != col] for r in sec['rows']]
        for (k, si, col), val in CELL_ALL.items():
            if k == key:
                for r in pg['sections'][si]['rows']:
                    r[col] = val[li]

        def fn(s, path, key=key, loc=loc):
            for (k, p), val in M.items():
                if k != key:
                    continue
                if path == p:
                    return DEL if val == DEL else val[li]
                if val == DEL and path.startswith(p + '['):
                    return DEL
            return nordics(clean(s), loc)

        pages[key] = walk(pg, fn)
        # rows marked for deletion arrive as lists of DEL-removed cells; drop empty rows
        for sec in pages[key].get('sections', []):
            if isinstance(sec, dict) and 'rows' in sec:
                sec['rows'] = [r for r in sec['rows'] if r]

# template download promises, legal pages, report teaser
def strfix(s, path):
    if s in legal.STR:
        return DEL if legal.STR[s] is None else legal.STR[s]
    for a, b in legal.STR.items():
        if b is not None and a.endswith('.') and len(a) < 60 and a in s:
            s = s.replace(a, b)
    return s
for loc, pages in data.items():
    for key in list(pages):
        pages[key] = walk(pages[key], strfix)
legal.apply(data)

head = head.replace('Do not edit by hand.', 'Do not edit by hand; final copy is applied by tools/final/finalize.py.')
open(F, 'w').write(head + json.dumps(data, ensure_ascii=False, indent=1) + tail)

# report what is left
left = []
def find(o, path, loc, key):
    if isinstance(o, str):
        if re.search(r'TE BEVESTIGEN|\[CIJFER|LABEL-ONLY|Nordics|AANLEVEREN|\]\(#\)', o):
            left.append((loc, key, path, o[:160]))
    elif isinstance(o, dict):
        for k, v in o.items(): find(v, f'{path}.{k}', loc, key)
    elif isinstance(o, list):
        for i, v in enumerate(o): find(v, f'{path}[{i}]', loc, key)
for loc, pages in data.items():
    for key, pg in pages.items(): find(pg, '', loc, key)
print('placeholders left:', len(left))
for l in left: print(' ', l)
