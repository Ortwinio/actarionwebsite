// Asset budget: the build fails if a heavy file lands in /public.
// Keeps load times low for SEO (Core Web Vitals) and GEO.
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const MAX_BYTES = { '.webp': 120_000, '.avif': 120_000, '.png': 60_000, '.jpg': 150_000, '.jpeg': 150_000, '.svg': 20_000, '.ico': 20_000 };
const FORBIDDEN = ['.mp4', '.mov', '.webm', '.gif'];
const PDF_MAX = 800_000; // whitepapers only, under /public/downloads
const errors = [];

const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    const ext = extname(f).toLowerCase();
    if (/\s/.test(f) || f !== f.toLowerCase() && !['Actarionlogo.png'].includes(f)) errors.push(`${p}: use lowercase file names without spaces`);
    if (FORBIDDEN.includes(ext)) errors.push(`${p}: ${ext} not allowed in /public (host video externally with a facade)`);
    if (ext === '.pdf' && (!p.includes('downloads') || s.size > PDF_MAX)) errors.push(`${p}: pdf only allowed in /public/downloads and ≤ 800 kB`);
    if (MAX_BYTES[ext] && s.size > MAX_BYTES[ext]) errors.push(`${p}: ${(s.size / 1024).toFixed(0)} kB > ${(MAX_BYTES[ext] / 1024).toFixed(0)} kB budget`);
  }
};
walk('public');
if (errors.length) { console.error('Asset budget exceeded:\n' + errors.join('\n')); process.exit(1); }
console.log('Asset budget OK');
