"""vr_color.py - VR/headset images: the person stays a black/white pen drawing,
the surroundings get colour (brand duotone ink -> AR blue -> sky), AR panels stay as they are.
usage: python3 vr_color.py pen.webp source_photo out.webp"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session
from scipy import ndimage

pen_p, src_p, out_p = sys.argv[1:4]
pen = Image.open(pen_p).convert('RGB')
W, H = pen.size
src = Image.open(src_p).convert('RGB').resize((W, H), Image.LANCZOS)

# person mask (incl. headset), feathered
m = remove(src, session=new_session('u2net_human_seg'), only_mask=True)
m = np.asarray(m.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2.5))).astype(float) / 255

# AR panels: large near-white blocks in the pen image
P = np.asarray(pen).astype(float)
white = P.min(2) >= 248
white = ndimage.binary_closing(white, iterations=4)
lab, n = ndimage.label(white)
panels = np.zeros_like(white)
for i, sl in enumerate(ndimage.find_objects(lab), 1):
    h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
    if h * w > W * H * 0.004 and (lab[sl] == i).mean() > 0.55:
        y0, y1 = max(sl[0].start - 6, 0), min(sl[0].stop + 6, H)
        x0, x1 = max(sl[1].start - 6, 0), min(sl[1].stop + 6, W)
        panels[y0:y1, x0:x1] = True
keep = np.clip(m + ndimage.gaussian_filter(panels.astype(float), 1.5), 0, 1)

# brand duotone of the photo
L = np.asarray(src.convert('L')).astype(float) / 255
stops = [(0.0, (16, 37, 58)), (0.35, (22, 111, 169)), (0.62, (27, 129, 196)), (0.85, (169, 219, 245)), (1.0, (230, 241, 249))]
xs = [s[0] for s in stops]
duo = np.stack([np.interp(L, xs, [s[1][c] for s in stops]) for c in range(3)], -1)
# keep the pen lines visible on top of the colour (multiply)
pen_l = (P.mean(2) / 245).clip(0, 1)[..., None]
env = duo * (0.35 + 0.65 * pen_l)

out = P * keep[..., None] + env * (1 - keep[..., None])
img = Image.fromarray(out.clip(0, 255).astype('uint8'))
q = 74
while True:
    img.save(out_p, 'WEBP', quality=q, method=6)
    import os
    if os.path.getsize(out_p) < 115_000 or q < 40:
        break
    q -= 6
print(out_p, os.path.getsize(out_p) // 1024, 'kB q', q)
