/**
 * ROI calculator (design v2) — single source of truth for all calculations.
 * Pure TypeScript: no React, no i18n/routes imports. Used by the desktop calculator,
 * the mobile stepped flow and the report page, so numbers never differ.
 */

export type Lang = 'nl' | 'en' | 'de';
export type Mode = 'quick' | 'usecase';
export type Industry = 'food_beverage' | 'pharma' | 'packaging' | 'logistics' | 'other';
export type Impact = 'conservative' | 'typical' | 'ambitious';
export type UseCase = 'assembly' | 'changeover' | 'maintenance' | 'fault_recovery' | 'training';
export type Driver = 'training' | 'quality' | 'downtime' | 'travel';

export interface QuickInputs { nOp: number; nNew: number; hTrain: number; exec: number; err: number; costErr: number; dt: number; costDt: number; visits: number; costVisit: number }
export interface CostInputs { annual: number; once: number }
export interface UcInputs {
  a_units: number; a_errB: number; a_errA: number; a_cost: number;
  c_n: number; c_tB: number; c_tA: number; c_cpm: number; c_sB: number; c_sA: number;
  m_dt: number; m_red: number; m_cph: number; m_vis: number; m_cpv: number; m_vred: number;
  f_inc: number; f_mB: number; f_mA: number; f_cph: number; f_vis: number; f_cpv: number; f_vred: number;
  t_new: number; t_hB: number; t_hA: number; t_rO: number; t_rT: number; t_sB: number; t_sA: number;
}

export interface RoiState {
  mode: Mode;
  industry: Industry;
  impact: Impact;
  remote: boolean;
  q: QuickInputs;
  costs: CostInputs;
  sel: UseCase[];
  u: UcInputs;
}

export const INDUSTRIES: Industry[] = ['food_beverage', 'pharma', 'packaging', 'logistics', 'other'];
export const IMPACTS: Impact[] = ['conservative', 'typical', 'ambitious'];
export const USE_CASES: UseCase[] = ['assembly', 'changeover', 'maintenance', 'fault_recovery', 'training'];
export const DRIVERS: Driver[] = ['training', 'quality', 'downtime', 'travel'];

export const PRESETS: Record<Industry, QuickInputs> = {
  food_beverage: { nOp: 25, nNew: 6, hTrain: 24, exec: 400, err: 3, costErr: 250, dt: 40, costDt: 2000, visits: 12, costVisit: 1500 },
  pharma: { nOp: 30, nNew: 8, hTrain: 40, exec: 300, err: 2, costErr: 500, dt: 30, costDt: 5000, visits: 8, costVisit: 2500 },
  packaging: { nOp: 20, nNew: 5, hTrain: 20, exec: 500, err: 4, costErr: 200, dt: 50, costDt: 1500, visits: 10, costVisit: 1200 },
  logistics: { nOp: 35, nNew: 10, hTrain: 16, exec: 600, err: 5, costErr: 150, dt: 60, costDt: 1000, visits: 6, costVisit: 1000 },
  other: { nOp: 25, nNew: 6, hTrain: 24, exec: 400, err: 3, costErr: 250, dt: 40, costDt: 2000, visits: 10, costVisit: 1500 },
};

export const IMP: Record<Impact, { e: number; tr: number; d: number }> = {
  conservative: { e: 0.3, tr: 0.25, d: 0.25 },
  typical: { e: 0.5, tr: 0.4, d: 0.4 },
  ambitious: { e: 0.7, tr: 0.5, d: 0.5 },
};

/** Fixed model constants (shown in "how we calculate"). */
export const CONST = {
  rateOperator: 40,
  rateTrainer: 60,
  visitReduction: 0.5,
  adoption: [0.6, 0.8, 1.0] as const,
  discount: 0.08,
  years: 3,
};

export const DEFAULT_STATE: RoiState = {
  mode: 'quick',
  industry: 'other',
  impact: 'typical',
  remote: false,
  q: { ...PRESETS.other },
  costs: { annual: 29000, once: 25000 },
  sel: ['changeover', 'maintenance'],
  u: {
    a_units: 50000, a_errB: 3, a_errA: 1, a_cost: 150,
    c_n: 200, c_tB: 45, c_tA: 30, c_cpm: 50, c_sB: 200, c_sA: 50,
    m_dt: 80, m_red: 35, m_cph: 2000, m_vis: 12, m_cpv: 2000, m_vred: 50,
    f_inc: 50, f_mB: 4, f_mA: 2, f_cph: 2500, f_vis: 20, f_cpv: 1500, f_vred: 60,
    t_new: 8, t_hB: 40, t_hA: 20, t_rO: 40, t_rT: 60, t_sB: 500, t_sA: 200,
  },
};

/* ---------- slider definitions (ranges only; labels live in content) ---------- */

export type Bag = 'q' | 'costs' | 'u';
export interface FieldDef { bag: Bag; key: string; min: number; max: number; step: number; d?: number; pct?: boolean; cur?: boolean; after?: boolean }

const f = (bag: Bag, key: string, min: number, max: number, step: number, o: Partial<FieldDef> = {}): FieldDef => ({ bag, key, min, max, step, ...o });

export const QUICK_GROUPS: FieldDef[][] = [
  [f('q', 'nOp', 5, 300, 1), f('q', 'nNew', 0, 80, 1), f('q', 'hTrain', 4, 120, 1), f('q', 'exec', 50, 1500, 10)],
  [f('q', 'err', 0.5, 10, 0.1, { d: 1, pct: true }), f('q', 'costErr', 25, 2500, 25, { cur: true }), f('q', 'dt', 0, 400, 5), f('q', 'costDt', 250, 10000, 250, { cur: true })],
];
export const REMOTE_FIELDS: FieldDef[] = [f('q', 'visits', 0, 60, 1), f('q', 'costVisit', 250, 5000, 250, { cur: true })];
export const COST_FIELDS: FieldDef[] = [f('costs', 'annual', 5000, 150000, 1000, { cur: true }), f('costs', 'once', 0, 150000, 1000, { cur: true })];
export const UC_FIELDS: Record<UseCase, FieldDef[]> = {
  assembly: [f('u', 'a_units', 1000, 500000, 1000), f('u', 'a_errB', 0.5, 10, 0.1, { d: 1, pct: true }), f('u', 'a_errA', 0, 10, 0.1, { d: 1, pct: true, after: true }), f('u', 'a_cost', 10, 2000, 10, { cur: true })],
  changeover: [f('u', 'c_n', 10, 2000, 10), f('u', 'c_tB', 5, 240, 1), f('u', 'c_tA', 5, 240, 1, { after: true }), f('u', 'c_cpm', 5, 500, 5, { cur: true }), f('u', 'c_sB', 0, 2000, 10, { cur: true }), f('u', 'c_sA', 0, 2000, 10, { cur: true, after: true })],
  maintenance: [f('u', 'm_dt', 0, 500, 5), f('u', 'm_red', 5, 80, 1, { pct: true, after: true }), f('u', 'm_cph', 250, 10000, 250, { cur: true }), f('u', 'm_vis', 0, 100, 1), f('u', 'm_cpv', 250, 5000, 250, { cur: true })],
  fault_recovery: [f('u', 'f_inc', 0, 500, 5), f('u', 'f_mB', 0.5, 24, 0.5, { d: 1 }), f('u', 'f_mA', 0.5, 24, 0.5, { d: 1, after: true }), f('u', 'f_cph', 250, 10000, 250, { cur: true }), f('u', 'f_vis', 0, 100, 1)],
  training: [f('u', 't_new', 0, 100, 1), f('u', 't_hB', 4, 200, 2), f('u', 't_hA', 2, 200, 2, { after: true }), f('u', 't_rO', 15, 120, 1, { cur: true }), f('u', 't_rT', 20, 150, 1, { cur: true })],
};
/** Mobile stepped flow uses the same fields (subset of the quick estimate). */
export const MOBILE_STEP_FIELDS: FieldDef[][] = [
  [QUICK_GROUPS[0][0], QUICK_GROUPS[0][1]],
  [QUICK_GROUPS[1][0], QUICK_GROUPS[1][2]],
];

export const ALL_FIELDS: FieldDef[] = [...QUICK_GROUPS.flat(), ...REMOTE_FIELDS, ...COST_FIELDS, ...Object.values(UC_FIELDS).flat()];

export const getValue = (s: RoiState, fd: FieldDef): number => (s[fd.bag] as unknown as Record<string, number>)[fd.key];
export const setValue = (s: RoiState, fd: FieldDef, v: number): RoiState => ({ ...s, [fd.bag]: { ...s[fd.bag], [fd.key]: v } });
export const fieldPct = (fd: FieldDef, v: number) => Math.max(0, Math.min(100, ((v - fd.min) / (fd.max - fd.min)) * 100));

/* ---------- calculation ---------- */

export type Benefits = Record<Driver, number>;
const zero = (): Benefits => ({ training: 0, quality: 0, downtime: 0, travel: 0 });
export const sumBenefits = (b: Partial<Benefits>) => (b.training || 0) + (b.quality || 0) + (b.downtime || 0) + (b.travel || 0);

export function quickBenefits(s: RoiState, impact: Impact = s.impact): Benefits {
  const q = s.q;
  const im = IMP[impact];
  return {
    training: q.nNew * (q.hTrain * im.tr) * (CONST.rateOperator + CONST.rateTrainer),
    quality: q.nOp * q.exec * (q.err / 100) * im.e * q.costErr,
    downtime: q.dt * im.d * q.costDt,
    travel: s.remote ? q.visits * CONST.visitReduction * q.costVisit : 0,
  };
}

export function useCaseBenefits(u: UcInputs, k: UseCase): Partial<Benefits> {
  switch (k) {
    case 'assembly':
      return { quality: Math.max((u.a_units * (u.a_errB - u.a_errA)) / 100, 0) * u.a_cost };
    case 'changeover':
      return { downtime: u.c_n * Math.max(u.c_tB - u.c_tA, 0) * u.c_cpm, quality: u.c_n * Math.max(u.c_sB - u.c_sA, 0) };
    case 'maintenance':
      return { downtime: u.m_dt * (u.m_red / 100) * u.m_cph, travel: u.m_vis * (u.m_vred / 100) * u.m_cpv };
    case 'fault_recovery':
      return { downtime: u.f_inc * Math.max(u.f_mB - u.f_mA, 0) * u.f_cph, travel: u.f_vis * (u.f_vred / 100) * u.f_cpv };
    case 'training':
      return { training: u.t_new * Math.max(u.t_hB - u.t_hA, 0) * (u.t_rO + u.t_rT), quality: u.t_new * Math.max(u.t_sB - u.t_sA, 0) };
  }
}

export interface Finance { annual: number; cum: number[]; net: number[]; benefitsYear: number[]; npv: number; roi: number; payM: number | null; costsH: number; benefitsH: number }

export function finance(annual: number, costs: CostInputs): Finance {
  const cum = [-costs.once];
  const net: number[] = [];
  const benefitsYear: number[] = [];
  let benefitsH = 0;
  let npv = -costs.once;
  CONST.adoption.forEach((a, i) => {
    const b = annual * a;
    const n = b - costs.annual;
    benefitsYear.push(b);
    net.push(n);
    benefitsH += b;
    cum.push(cum[i] + n);
    npv += n / Math.pow(1 + CONST.discount, i + 1);
  });
  const costsH = costs.once + costs.annual * CONST.years;
  const roi = costsH ? ((benefitsH - costsH) / costsH) * 100 : 0;
  let payM: number | null = null;
  for (let y = 1; y <= CONST.years; y++) {
    if (cum[y] >= 0) {
      const prev = cum[y - 1];
      const frac = prev >= 0 ? 0 : -prev / (cum[y] - prev);
      payM = Math.round((y - 1 + frac) * 12);
      break;
    }
  }
  return { annual, cum, net, benefitsYear, npv, roi, payM, costsH, benefitsH };
}

export interface RoiResult extends Finance {
  drivers: Benefits;
  ucTotals: { k: UseCase; total: number }[];
  range: { lo: number; hi: number } | null;
  sensitivity: { impact: Impact; annual: number; fin: Finance }[] | null;
}

export function calculate(s: RoiState): RoiResult {
  let drivers = zero();
  const ucTotals: { k: UseCase; total: number }[] = [];
  if (s.mode === 'quick') {
    drivers = quickBenefits(s);
  } else {
    s.sel.forEach((k) => {
      const b = useCaseBenefits(s.u, k);
      (Object.keys(b) as Driver[]).forEach((d) => { drivers[d] += b[d] || 0; });
      ucTotals.push({ k, total: sumBenefits(b) });
    });
  }
  const annual = sumBenefits(drivers);
  const fin = finance(annual, s.costs);
  let range = null;
  let sensitivity = null;
  if (s.mode === 'quick') {
    range = { lo: sumBenefits(quickBenefits(s, 'conservative')), hi: sumBenefits(quickBenefits(s, 'ambitious')) };
    sensitivity = IMPACTS.map((impact) => {
      const a = sumBenefits(quickBenefits(s, impact));
      return { impact, annual: a, fin: finance(a, s.costs) };
    });
  }
  return { ...fin, drivers, ucTotals, range, sensitivity };
}

/* ---------- chart geometry (viewBox 0 0 400 190) ---------- */

export interface Bar { x: number; cx: number; y: number; h: number; pos: boolean; ly: number; v: number }
export function chartBars(cum: number[]): { zeroY: number; bars: Bar[] } {
  const maxAbs = Math.max(1, ...cum.map((v) => Math.abs(v)));
  const hasNeg = cum.some((v) => v < 0);
  const hasPos = cum.some((v) => v > 0);
  const top = 22;
  const bottom = 166;
  const mx = Math.max(...cum);
  const mn = Math.min(...cum);
  const zeroY = hasNeg && hasPos ? top + (bottom - top) * (mx / (mx - mn)) : hasPos ? bottom : top;
  const scale = hasNeg && hasPos ? (bottom - top) / (mx - mn) : (bottom - top) / maxAbs;
  const bars = cum.map((v, i) => {
    const h = Math.max(2, Math.abs(v) * scale);
    const x = 14 + i * 98;
    const pos = v >= 0;
    return { x, cx: x + 36, y: pos ? zeroY - h : zeroY, h, pos, ly: pos ? zeroY - h - 7 : Math.min(zeroY + h + 15, 174), v };
  });
  return { zeroY, bars };
}

/* ---------- formatting ---------- */

const NUM_LOCALE: Record<Lang, string> = { nl: 'nl-NL', en: 'en-GB', de: 'de-DE' };
export function formatters(lang: Lang) {
  const loc = NUM_LOCALE[lang];
  const eurF = new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const eur = (v: number) => eurF.format(Math.round(v));
  const num = (v: number, d = 0) => new Intl.NumberFormat(loc, { maximumFractionDigits: d, minimumFractionDigits: d }).format(v);
  const keur = (v: number) => {
    const a = Math.abs(v);
    return (v < 0 ? '−' : '') + (a >= 1000 ? '€' + num(a / 1000, 0) + 'k' : eur(a));
  };
  const mon = { nl: 'mnd', en: 'mo', de: 'Mon.' }[lang];
  const payback = (payM: number | null) => (payM === null ? '> 36 ' + mon : payM < 1 ? '< 1 ' + mon : payM + ' ' + mon);
  const roi = (r: number) => num(Math.round(r), 0) + '%';
  const field = (fd: FieldDef, v: number) => (fd.cur ? eur(v) : num(v, fd.d || 0) + (fd.pct ? '%' : ''));
  return { eur, num, keur, payback, roi, field };
}

/* ---------- URL encoding (calculator → report) ---------- */

const UC_KEYS = Object.keys(DEFAULT_STATE.u) as (keyof UcInputs)[];
const Q_KEYS = Object.keys(DEFAULT_STATE.q) as (keyof QuickInputs)[];
const ranges = new Map(ALL_FIELDS.map((fd) => [fd.bag + '.' + fd.key, fd]));

/** Compact query string, e.g. `m=q&i=4&p=1&r=0&q=25_6_24_…&c=29000_25000`. */
export function encodeState(s: RoiState): string {
  const p = new URLSearchParams();
  p.set('m', s.mode === 'quick' ? 'q' : 'u');
  p.set('c', `${s.costs.annual}_${s.costs.once}`);
  if (s.mode === 'quick') {
    p.set('i', String(INDUSTRIES.indexOf(s.industry)));
    p.set('p', String(IMPACTS.indexOf(s.impact)));
    p.set('r', s.remote ? '1' : '0');
    p.set('q', Q_KEYS.map((k) => s.q[k]).join('_'));
  } else {
    p.set('s', s.sel.map((k) => USE_CASES.indexOf(k)).join(''));
    p.set('u', UC_KEYS.map((k) => s.u[k]).join('_'));
  }
  return p.toString();
}

function readNums(raw: string | null, n: number): number[] | null {
  if (!raw) return null;
  const a = raw.split('_').map(Number);
  return a.length === n && a.every((x) => Number.isFinite(x)) ? a : null;
}
function clampField(bag: Bag, key: string, v: number, fallback: number): number {
  const fd = ranges.get(bag + '.' + key);
  if (!Number.isFinite(v)) return fallback;
  return fd ? Math.min(fd.max, Math.max(fd.min, v)) : Math.max(0, v);
}

export function decodeState(search: string | URLSearchParams): RoiState | null {
  const p = typeof search === 'string' ? new URLSearchParams(search) : search;
  const m = p.get('m');
  if (m !== 'q' && m !== 'u') return null;
  const s: RoiState = structuredCloneState(DEFAULT_STATE);
  s.mode = m === 'q' ? 'quick' : 'usecase';
  const c = readNums(p.get('c'), 2);
  if (c) s.costs = { annual: clampField('costs', 'annual', c[0], 29000), once: clampField('costs', 'once', c[1], 25000) };
  if (s.mode === 'quick') {
    s.industry = INDUSTRIES[Number(p.get('i'))] || 'other';
    s.impact = IMPACTS[Number(p.get('p'))] || 'typical';
    s.remote = p.get('r') === '1';
    const q = readNums(p.get('q'), Q_KEYS.length);
    if (q) Q_KEYS.forEach((k, i) => { s.q[k] = clampField('q', k, q[i], s.q[k]); });
  } else {
    const sel = (p.get('s') || '').split('').map((x) => USE_CASES[Number(x)]).filter(Boolean);
    s.sel = Array.from(new Set(sel));
    const u = readNums(p.get('u'), UC_KEYS.length);
    if (u) UC_KEYS.forEach((k, i) => { s.u[k] = clampField('u', k, u[i], s.u[k]); });
  }
  return s;
}

export function structuredCloneState(s: RoiState): RoiState {
  return { ...s, q: { ...s.q }, costs: { ...s.costs }, sel: [...s.sel], u: { ...s.u } };
}
