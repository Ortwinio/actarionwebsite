"""Recolour the cyan/blue fills of the line illustrations to the ActARion palette."""
import sys, colorsys, numpy as np
from PIL import Image
for f in sys.argv[1:]:
    im = Image.open(f).convert('RGB'); a = np.asarray(im).astype(float) / 255
    hsv = np.asarray(im.convert('HSV')).astype(float) / 255
    h, s, v = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    sel = (h > 165) & (h < 250) & (s > 0.22)
    L = a.mean(2)
    stops = [(0.25, (16, 37, 58)), (0.45, (22, 111, 169)), (0.62, (27, 129, 196)), (0.82, (169, 219, 245)), (0.95, (230, 241, 249))]
    xs = [p[0] for p in stops]
    new = np.stack([np.interp(L, xs, [p[1][c] for p in stops]) for c in range(3)], -1) / 255
    w = np.clip((s - 0.22) / 0.2, 0, 1)[..., None] * sel[..., None]
    out = a * (1 - w) + new * w
    Image.fromarray((out * 255).astype('uint8')).save(f, 'WEBP', quality=80, method=6)
print('done', len(sys.argv) - 1)
