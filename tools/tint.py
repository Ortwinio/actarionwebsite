import sys, json, numpy as np
from PIL import Image, ImageDraw, ImageFilter
spec = {
 'usecase-assembly': {'screens': [[(312,265),(395,258),(412,318),(332,328)]], 'panels': [[(135,40),(242,40),(242,108),(135,108)], [(30,126),(97,126),(97,180),(30,180)]]},
 'usecase-changeover': {'screens': [[(235,237),(270,255),(212,320),(178,305)]], 'panels': [[(262,32),(455,32),(455,150),(262,150)]]},
 'usecase-maintenance': {'screens': [[(243,257),(292,250),(346,335),(300,345)]], 'panels': [[(238,97),(342,97),(342,228),(238,228)]]},
}
for name, sp in spec.items():
    im = Image.open(f'tab/{name}.webp').convert('RGB'); W, H = im.size; k = W / 600
    a = np.asarray(im).astype(float); L = a.mean(2, keepdims=True) / 255
    out = a.copy()
    for kind, col_dark, col_light in (('screens', (22,111,169), (169,219,245)), ('panels', (27,129,196), (230,241,249))):
        m = Image.new('L', (W, H), 0); d = ImageDraw.Draw(m)
        for poly in sp[kind]: d.polygon([(x*k, y*k) for x, y in poly], fill=255)
        m = np.asarray(m.filter(ImageFilter.GaussianBlur(1.5))).astype(float)[..., None] / 255
        dark, light = np.array(col_dark), np.array(col_light)
        t = np.clip((L - 0.35) / 0.6, 0, 1)
        col = dark * (1 - t) + light * t
        out = out * (1 - m) + col * m
    Image.fromarray(out.clip(0,255).astype('uint8')).save(f'tab/{name}-c.webp', 'WEBP', quality=72, method=6)
