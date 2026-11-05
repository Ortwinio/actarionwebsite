#!/usr/bin/env python3
"""Change requests applied on top of the finalized content (idempotent).
Run after tools/final/finalize.py:  python3 tools/final/changes.py

2026-11-05 (Mark Dercksen): Potentify and Simply Change are no longer partners;
Events moved to its own top-level page (/en/events, /nl/events, /de/events).
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(__file__))
import legal

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
F = os.path.join(ROOT, 'src/content/imported.ts')

src = open(F).read()
head, body = src[: src.index('= {') + 2], src[src.index('= {') + 2 :]
end = body.rstrip().rindex('}') + 1
tail = body[end:]
data = json.loads(body[:end])

REMOVED = ('Potentify', 'Simply Change')

PARTNERS = {
    'en': {
        'metaDescription': 'Actarion works with DeepSight, hardware makers and a network of industry partners, so AR work instructions really land on your shop floor.',
        'lead': 'Actarion works with DeepSight, hardware makers and a network of industry partners, so AR work instructions really land on your shop floor.',
        'answer': 'Actarion combines one technology platform with local implementation. DeepSight supplies the AR and AI platform for digital work instructions. Hardware from Apple, Microsoft and Google brings the instructions to the work. Actarion leads the implementation and brings in partners from its network where a project needs them.',
        'faq': ('Do I need all partners in my project?', 'No. We bring in a partner from our network only when your use case needs it.'),
    },
    'nl': {
        'metaDescription': 'Actarion werkt met DeepSight, hardwaremakers en een netwerk van branchepartners, zodat AR-werkinstructies echt landen op je werkvloer.',
        'lead': 'Actarion werkt met DeepSight, hardwaremakers en een netwerk van branchepartners, zodat AR-werkinstructies echt landen op je werkvloer.',
        'answer': 'Actarion combineert één technologieplatform met lokale implementatie. DeepSight levert het AR- en AI-platform voor digitale werkinstructies. Hardware van Apple, Microsoft en Google brengt de instructies naar het werk. Actarion leidt de implementatie en haalt partners uit het netwerk erbij waar een project daarom vraagt.',
        'faq': ('Heb ik alle partners nodig in mijn project?', 'Nee. We halen een partner uit ons netwerk er alleen bij als je use case daarom vraagt.'),
    },
    'de': {
        'metaDescription': 'Actarion arbeitet mit DeepSight, Hardwareherstellern und einem Netzwerk von Branchenpartnern, damit AR-Arbeitsanweisungen in Ihrer Fertigung ankommen.',
        'lead': 'Actarion arbeitet mit DeepSight, Hardwareherstellern und einem Netzwerk von Branchenpartnern, damit AR-Arbeitsanweisungen in Ihrer Fertigung ankommen.',
        'answer': 'Actarion verbindet eine Technologieplattform mit lokaler Implementierung. DeepSight liefert die AR- und KI-Plattform für digitale Arbeitsanweisungen. Hardware von Apple, Microsoft und Google bringt die Anweisungen an den Arbeitsplatz. Actarion leitet die Implementierung und holt Partner aus seinem Netzwerk dazu, wenn ein Projekt es erfordert.',
        'faq': ('Brauche ich alle Partner im Projekt?', 'Nein. Wir binden einen Partner aus unserem Netzwerk nur ein, wenn Ihr Anwendungsfall es erfordert.'),
    },
}

for loc, pages in data.items():
    pages.pop('partnerPotentify', None)
    pages.pop('partnerSimplyChange', None)
    p = pages.get('partners')
    if not p:
        continue
    c = PARTNERS[loc]
    for k in ('metaDescription', 'lead', 'answer'):
        p[k] = c[k]
    for sec in p.get('sections', []):
        if sec.get('kind') == 'table':
            sec['rows'] = [r for r in sec['rows'] if not any(n in r[0] for n in REMOVED)]
    q, a = c['faq']
    for f in p.get('faq', []):
        if any(n in f['a'] for n in REMOVED):
            f['q'], f['a'] = q, a
    for pg in pages.values():
        if 'related' in pg:
            pg['related'] = [r for r in pg['related'] if r not in ('partnerPotentify', 'partnerSimplyChange')]

legal.apply(data)  # company details and liability cap (Mark, 5 Nov 2026)
for loc, pages in data.items():
    for k in ('privacy', 'terms', 'imprint'):
        if k in pages:
            pages[k]['updated'] = '2026-11-05'

out = json.dumps(data, ensure_ascii=False, indent=1)
for old in ('/en/resources/events/', '/nl/kennisbank/events/', '/de/ressourcen/events/'):
    out = out.replace(old, '/' + old.split('/')[1] + '/events/')
assert not any(n in out for n in REMOVED), 'removed partner still mentioned'
open(F, 'w').write(head + out + tail)
print('ok')
