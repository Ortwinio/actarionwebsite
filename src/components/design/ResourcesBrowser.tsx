'use client';

import { useEffect, useMemo, useState } from 'react';

export interface KbItem {
  key: string;
  type: string;
  typeLabel: string;
  typeColor: string;
  title: string;
  summary: string;
  topic: string;
  topicLabel: string;
  ind: string[];
  min: number;
  date: string;
  dateLabel: string;
  pop: number;
  href: string;
}

export interface KbStrings {
  searchLabel: string;
  placeholder: string;
  clear: string;
  popularLabel: string;
  popular: string[];
  filters: string;
  topic: string;
  type: string;
  ind: string;
  all: string;
  result: string;
  results: string;
  sort: string;
  sortNew: string;
  sortPop: string;
  removeFilter: string;
  clearAll: string;
  minutes: string;
  interactive: string;
  updated: string;
  expertTitle: string;
  expertText: string;
  expertBtn: string;
  emptyQuery: string;
  emptyFilters: string;
  emptyText: string;
  emptyCta: string;
  emptyReset: string;
}

type Opt = { value: string; label: string };
type Group = 'topic' | 'type' | 'ind';
type State = { q: string; topic: string; type: string; ind: string; sort: 'new' | 'pop' };
const initial: State = { q: '', topic: '', type: '', ind: '', sort: 'new' };

function matches(it: KbItem, s: State, ignore?: Group) {
  if (ignore !== 'topic' && s.topic && it.topic !== s.topic) return false;
  if (ignore !== 'type' && s.type && it.type !== s.type) return false;
  if (ignore !== 'ind' && s.ind && it.ind.length && !it.ind.includes(s.ind)) return false;
  const q = s.q.trim().toLowerCase();
  if (q && !`${it.title} ${it.summary} ${it.typeLabel} ${it.topicLabel}`.toLowerCase().includes(q)) return false;
  return true;
}

function X() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2l8 8M10 2l-8 8" stroke="#10253A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Knowledge-base search + filters. The server renders the full item list (state = initial),
 * so every item is in the HTML; filtering happens client-side.
 */
export function ResourcesBrowser({
  items,
  t,
  topics,
  types,
  inds,
  expert,
  aside,
}: {
  items: KbItem[];
  t: KbStrings;
  topics: Opt[];
  types: Opt[];
  inds: Opt[];
  expert: { href: string; avatars: { src: string; alt: string }[] };
  aside: React.ReactNode;
}) {
  const [s, setS] = useState<State>(initial);
  const set = (patch: Partial<State>) => setS((prev) => ({ ...prev, ...patch }));

  // Read initial filters from the URL (?q=&topic=&type=&ind=&sort=) and keep it in sync.
  useEffect(() => {
    // Filters live in the hash (#topic=…) so crawlers never see parameter URLs; ?query is still read for old links.
    const p = new URLSearchParams(window.location.hash.slice(1) || window.location.search);
    const next: Partial<State> = {};
    for (const k of ['q', 'topic', 'type', 'ind'] as const) {
      const v = p.get(k);
      if (v) next[k] = v;
    }
    if (p.get('sort') === 'pop') next.sort = 'pop';
    if (Object.keys(next).length) setS((prev) => ({ ...prev, ...next }));
  }, []);
  useEffect(() => {
    const p = new URLSearchParams();
    if (s.q) p.set('q', s.q);
    if (s.topic) p.set('topic', s.topic);
    if (s.type) p.set('type', s.type);
    if (s.ind) p.set('ind', s.ind);
    if (s.sort !== 'new') p.set('sort', s.sort);
    const qs = p.toString();
    window.history.replaceState(null, '', qs ? `${window.location.pathname}#${qs}` : window.location.pathname);
  }, [s]);

  const list = useMemo(() => {
    const r = items.filter((it) => matches(it, s));
    return r.sort((a, b) => (s.sort === 'pop' ? b.pop - a.pop : b.date.localeCompare(a.date)));
  }, [items, s]);

  const count = (g: Group, value: string) => items.filter((it) => matches(it, s, g) && (!value || (g === 'ind' ? !it.ind.length || it.ind.includes(value) : it[g] === value))).length;

  const groups: { g: Group; legend: string; opts: Opt[] }[] = [
    { g: 'topic', legend: t.topic, opts: topics },
    { g: 'type', legend: t.type, opts: types },
    { g: 'ind', legend: t.ind, opts: inds },
  ];

  const active: { label: string; clear: Partial<State> }[] = [];
  if (s.topic) active.push({ label: topics.find((o) => o.value === s.topic)?.label ?? s.topic, clear: { topic: '' } });
  if (s.type) active.push({ label: types.find((o) => o.value === s.type)?.label ?? s.type, clear: { type: '' } });
  if (s.ind) active.push({ label: inds.find((o) => o.value === s.ind)?.label ?? s.ind, clear: { ind: '' } });
  if (s.q.trim()) active.push({ label: `“${s.q.trim()}”`, clear: { q: '' } });
  const resetAll = () => set({ q: '', topic: '', type: '', ind: '' });

  const expertCard = (
    <a key="__expert" href={expert.href} className="box-border flex min-h-[220px] flex-col gap-3 rounded-[22px] bg-sky p-[22px] text-ink no-underline hover:text-ink">
      <span className="flex">
        {expert.avatars.map((a, i) => (
          <img key={a.src} src={a.src} alt={a.alt} width={52} height={52} loading="lazy" className={`h-[52px] w-[52px] rounded-full border-[3px] border-white object-cover ${i ? '-ml-3' : ''}`} />
        ))}
      </span>
      <span className="font-display text-[22px] font-extrabold leading-[1.15]">{t.expertTitle}</span>
      <span className="flex-grow text-[15px] leading-[1.45]">{t.expertText}</span>
      <span className="inline-flex h-[46px] items-center self-start rounded-full bg-ink px-[18px] font-bold text-white">{t.expertBtn}</span>
    </a>
  );

  const cards: React.ReactNode[] = list.map((it) => (
    <a key={it.key} href={it.href} className="box-border flex min-h-[220px] flex-col gap-[10px] rounded-[22px] border border-line bg-white p-[22px] text-ink no-underline hover:border-primary hover:text-ink">
      <span className="flex items-center justify-between gap-2">
        <span className="rounded-full px-[10px] py-[5px] text-xs font-bold uppercase tracking-[0.06em] text-ink" style={{ background: it.typeColor }}>{it.typeLabel}</span>
        <span className="font-mono text-xs text-muted">{it.type === 'tool' ? t.interactive : `${it.min} ${t.minutes}`}</span>
      </span>
      <h2 className="m-0 font-display text-[21px] font-bold leading-[1.2]">{it.title}</h2>
      <p className="m-0 line-clamp-4 flex-grow text-[15px] leading-[1.45] text-muted">{it.summary}</p>
      <span className="flex justify-between gap-2 border-t border-[#EEF2F6] pt-[10px] text-[13px] text-muted">
        <span>{it.topicLabel}</span>
        <span>{t.updated} {it.dateLabel}</span>
      </span>
      <span className="font-mono text-[11px] text-[#4A5D6E] [overflow-wrap:anywhere]">{it.href}</span>
    </a>
  ));
  if (cards.length) cards.splice(Math.min(5, cards.length), 0, expertCard);

  return (
    <>
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-site flex-col gap-5 px-6 pb-12 pt-5">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-2 flex max-w-[820px] flex-wrap gap-2">
            <label htmlFor="kb-q" className="sr-only">{t.searchLabel}</label>
            <div className="relative flex-[1_1_420px]">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="absolute left-5 top-[19px]">
                <circle cx="9.5" cy="9.5" r="7" stroke="#4A5D6E" strokeWidth="2" />
                <path d="M15 15l5 5" stroke="#4A5D6E" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                id="kb-q"
                type="search"
                autoComplete="off"
                value={s.q}
                onChange={(e) => set({ q: e.target.value })}
                placeholder={t.placeholder}
                className="h-[60px] w-full rounded-full border-0 bg-white pl-[54px] pr-5 text-lg text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
              />
            </div>
            {s.q && (
              <button type="button" onClick={() => set({ q: '' })} className="h-[60px] rounded-full border-2 border-sky bg-transparent px-[22px] text-base font-bold text-white">
                {t.clear}
              </button>
            )}
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-muted-light">{t.popularLabel}</span>
            {t.popular.map((p) => (
              <button key={p} type="button" onClick={() => set({ q: p })} className="min-h-[40px] rounded-full border border-[#3A5672] bg-ink-2 px-[14px] text-sm font-semibold text-white">
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-site flex-wrap items-start gap-8 px-6 pt-10">
        <aside aria-label={t.filters} className="flex min-w-0 max-w-[300px] flex-[1_1_260px] flex-col gap-[22px]">
          {groups.map(({ g, legend, opts }) => (
            <fieldset key={g} className="m-0 flex flex-col gap-[6px] border-0 p-0">
              <legend className="pb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{legend}</legend>
              {[{ value: '', label: t.all }, ...opts].map((o) => {
                const sel = s[g] === o.value;
                return (
                  <button
                    key={o.value || 'all'}
                    type="button"
                    aria-pressed={sel}
                    onClick={() => set({ [g]: o.value } as Partial<State>)}
                    className={`flex min-h-[44px] items-center justify-between gap-[10px] rounded-xl border px-3 text-left text-[15px] text-ink ${sel ? 'border-primary bg-tint font-bold' : 'border-line bg-white font-medium'}`}
                  >
                    <span>{o.label}</span>
                    <span className="font-mono text-xs text-muted">{count(g, o.value)}</span>
                  </button>
                );
              })}
            </fieldset>
          ))}
          {aside}
        </aside>

        <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-[18px]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 text-base" aria-live="polite">
              <strong className="font-mono">{list.length}</strong> {list.length === 1 ? t.result : t.results}
            </p>
            <div role="group" aria-label={t.sort} className="inline-flex gap-1 rounded-[14px] bg-[#E3EAF0] p-1">
              {(['new', 'pop'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={s.sort === v}
                  onClick={() => set({ sort: v })}
                  className={`min-h-[40px] rounded-[10px] border-0 px-[14px] text-sm font-bold text-ink ${s.sort === v ? 'bg-white shadow-[0_1px_4px_rgba(16,37,58,.18)]' : 'bg-transparent'}`}
                >
                  {v === 'new' ? t.sortNew : t.sortPop}
                </button>
              ))}
            </div>
          </div>

          {active.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {active.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  aria-label={t.removeFilter.replace('{label}', a.label)}
                  onClick={() => set(a.clear)}
                  className="inline-flex min-h-[36px] items-center gap-2 rounded-full border-0 bg-sky px-3 text-sm font-bold text-ink"
                >
                  {a.label} <X />
                </button>
              ))}
              <button type="button" onClick={resetAll} className="min-h-[36px] border-0 bg-transparent px-2 text-sm font-bold text-primary">
                {t.clearAll}
              </button>
            </div>
          )}

          {cards.length ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">{cards}</div>
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-3xl border border-line bg-white p-8">
              <p className="m-0 font-display text-[26px] font-extrabold">{s.q.trim() ? t.emptyQuery.replace('{q}', s.q.trim()) : t.emptyFilters}</p>
              <p className="m-0 leading-[1.5] text-muted">{t.emptyText}</p>
              <div className="flex flex-wrap gap-[10px]">
                <a href={expert.href} className="inline-flex h-[52px] items-center rounded-full bg-primary px-[22px] font-bold text-white no-underline hover:bg-primary-hover hover:text-white">{t.emptyCta}</a>
                <button type="button" onClick={resetAll} className="h-[52px] rounded-full border-2 border-ink bg-white px-5 font-bold text-ink">{t.emptyReset}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
