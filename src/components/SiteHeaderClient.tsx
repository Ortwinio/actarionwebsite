'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/locale';

export interface HeaderItem { href: string; label: string; sub?: string }
export interface HeaderMenu {
  id: string;
  label: string;
  href?: string;
  columns?: { title: string; items: HeaderItem[] }[];
  featured?: { href: string; eyebrow: string; title: string; sub: string; cta: string };
}
export interface HeaderProps {
  locale: Locale;
  variant: 'full' | 'focus';
  active?: string;
  menus: HeaderMenu[];
  langs: { code: Locale; name: string; href: string; path: string }[];
  homeHref: string;
  roiHref: string;
  demoHref: string;
  t: { mainNav: string; langLabel: string; roi: string; demo: string; secure: string; langHint: string; menu: string; close: string; mobileDemo: string; mobileRoi: string; langShort: string; opens: string };
}

const Chevron = ({ open, color = 'currentColor', size = 12 }: { open: boolean; color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform .15s' }}>
    <path d="M2.5 4.5L6 8l3.5-3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Calc = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="#166FA9" strokeWidth="1.7" strokeLinecap="round">
    <rect x="3.5" y="2.5" width="13" height="15" rx="2.5" />
    <path d="M6.5 6h7M7 10h.01M10 10h.01M13 10h.01M7 13.5h.01M10 13.5h.01M13 13.5h.01" />
  </svg>
);
const Globe = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="#10253A" strokeWidth="1.6">
    <circle cx="10" cy="10" r="8" />
    <path d="M2 10h16M10 2c2.5 2.6 2.5 13.4 0 16M10 2c-2.5 2.6-2.5 13.4 0 16" />
  </svg>
);
const Lock = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="#4A5D6E" strokeWidth="1.8" strokeLinecap="round">
    <rect x="4" y="9" width="12" height="9" rx="2" />
    <path d="M7 9V6.5a3 3 0 016 0V9" />
  </svg>
);

export function Wordmark({ size = 24, light = false }: { size?: number; light?: boolean }) {
  return (
    <span className="whitespace-nowrap font-display font-extrabold" style={{ fontSize: size, letterSpacing: '-0.02em', color: light ? '#FFFFFF' : '#10253A' }}>
      Act<span style={{ color: light ? '#A9DBF5' : '#1B81C4' }}>AR</span>ion
    </span>
  );
}

/** SiteHeader from the redesign: megamenus, language panel, ROI link, primary CTA; mobile menu + sticky action bar. */
export function SiteHeaderClient(p: HeaderProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [lang, setLang] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mGroup, setMGroup] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setOpen(null), setLang(false), setMobile(false));
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(null); setLang(false); } };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; }, [mobile]);

  const menu = p.menus.find((m) => m.id === open);

  return (
    <div ref={ref} className="sticky top-0 z-40 bg-white">
      {/* ── Desktop / tablet header ── */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href={p.homeHref} className="flex flex-none items-center gap-2.5 no-underline" aria-label="ActARion">
            <img src="/Actarionlogo.png" alt="" width={40} height={40} className="h-8 w-8 md:h-10 md:w-10" />
            <Wordmark size={24} />
          </Link>

          {p.variant === 'full' && (
            <nav aria-label={p.t.mainNav} className="hidden flex-nowrap gap-0.5 whitespace-nowrap text-[15px] font-semibold xl:flex 2xl:text-base">
              {p.menus.map((m) => {
                const isOpen = open === m.id;
                const cur = p.active === m.id;
                const cls = `inline-flex h-11 items-center gap-1.5 rounded-xl px-2.5 no-underline 2xl:px-3 ${isOpen ? 'bg-tint' : ''}`;
                const color = cur || isOpen ? '#166FA9' : '#10253A';
                return m.href ? (
                  <Link key={m.id} href={m.href} aria-current={cur ? 'page' : undefined} className={cls} style={{ color }}>{m.label}</Link>
                ) : (
                  <button key={m.id} type="button" aria-expanded={isOpen} onClick={() => { setOpen(isOpen ? null : m.id); setLang(false); }} className={cls} style={{ color }}>
                    {m.label} <Chevron open={isOpen} color={color} />
                  </button>
                );
              })}
            </nav>
          )}

          <div className="hidden flex-nowrap items-center gap-2 whitespace-nowrap md:flex">
            <button type="button" aria-label={p.t.langLabel} aria-expanded={lang} onClick={() => { setLang(!lang); setOpen(null); }}
              className={`inline-flex h-11 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-bold ${lang ? 'bg-tint' : 'bg-white'}`}>
              <Globe /> {p.locale.toUpperCase()}
            </button>
            {p.variant === 'full' ? (
              <>
                <Link href={p.roiHref} className="inline-flex h-11 items-center gap-2 px-3 text-[15px] font-bold text-ink no-underline hover:text-ink"><Calc /> <span className="hidden 2xl:inline">{p.t.roi}</span><span className="sr-only 2xl:hidden">{p.t.roi}</span></Link>
                <Link href={p.demoHref} className="inline-flex h-12 items-center rounded-full bg-primary px-[22px] font-bold text-white no-underline hover:bg-primary-hover hover:text-white">{p.t.demo}</Link>
              </>
            ) : (
              <span className="inline-flex items-center gap-2 pl-2 text-[15px] text-muted"><Lock /> {p.t.secure}</span>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            {p.variant === 'full' && <Link href={p.roiHref} aria-label={p.t.roi} className="flex h-11 w-11 items-center justify-center"><Calc size={22} /></Link>}
            <button type="button" aria-label={mobile ? p.t.close : p.t.menu} aria-expanded={mobile} onClick={() => setMobile(!mobile)}
              className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${mobile ? 'bg-tint' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10253A" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {mobile ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
          {/* Tablet (md–xl): menu button next to the actions */}
          {p.variant === 'full' && (
            <button type="button" aria-label={mobile ? p.t.close : p.t.menu} aria-expanded={mobile} onClick={() => setMobile(!mobile)}
              className={`hidden h-12 w-12 items-center justify-center rounded-[14px] md:flex xl:hidden ${mobile ? 'bg-tint' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10253A" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {mobile ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* ── Language panel ── */}
      {lang && (
        <div className="absolute inset-x-0 z-50 mx-auto flex max-w-site justify-end px-6 pb-4 pt-0">
          <div role="group" aria-label={p.t.langLabel} className="flex w-[380px] max-w-full flex-col gap-1 rounded-[20px] border border-line bg-white p-2 shadow-[0_18px_40px_rgba(16,37,58,.12)]">
            {p.langs.map((l) => (
              <Link key={l.code} href={l.href} hrefLang={l.code} lang={l.code} aria-current={l.code === p.locale ? 'true' : undefined}
                className={`flex min-h-14 items-center justify-between gap-3 rounded-[14px] px-3.5 py-2 text-ink no-underline hover:text-ink ${l.code === p.locale ? 'bg-tint' : ''}`}>
                <span className="flex flex-col"><span className="font-bold">{l.name}</span><span className="font-mono text-xs text-muted">actarion.com{l.path}</span></span>
                <span className={`rounded-full px-2.5 py-1 font-mono text-[13px] ${l.code === p.locale ? 'bg-sky' : 'bg-[#EEF2F6]'}`}>{l.code.toUpperCase()}</span>
              </Link>
            ))}
            <p className="px-3.5 pb-1.5 pt-2 text-[13px] leading-[1.45] text-muted">{p.t.langHint}</p>
          </div>
        </div>
      )}

      {/* ── Megamenu ── */}
      {menu?.columns && (
        <div className="absolute inset-x-0 z-50 hidden border-b border-t border-line bg-white shadow-[0_18px_40px_rgba(16,37,58,.08)] xl:block">
          <div className="mx-auto flex max-w-site flex-wrap gap-8 px-6 pb-8 pt-7">
            {menu.columns.map((c, i) => (
              <div key={i} className="flex min-w-0 flex-[1_1_220px] flex-col gap-1">
                <p className="px-3 pb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{c.title || ' '}</p>
                {c.items.map((it) => (
                  <Link key={it.href + it.label} href={it.href} onClick={() => setOpen(null)} className="flex flex-col gap-0.5 rounded-[14px] px-3 py-2.5 text-ink no-underline hover:bg-canvas hover:text-ink">
                    <span className="text-base font-bold">{it.label}</span>
                    {it.sub && <span className="text-sm leading-[1.4] text-muted">{it.sub}</span>}
                  </Link>
                ))}
              </div>
            ))}
            {menu.featured && (
              <Link href={menu.featured.href} onClick={() => setOpen(null)} className="flex min-w-[240px] flex-[0_1_300px] flex-col gap-2.5 rounded-3xl bg-sky p-6 text-ink no-underline hover:text-ink">
                <span className="text-[13px] font-bold uppercase tracking-[0.08em]">{menu.featured.eyebrow}</span>
                <span className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">{menu.featured.title}</span>
                <span className="text-[15px] leading-[1.45]">{menu.featured.sub}</span>
                <span className="mt-auto inline-flex h-11 items-center self-start rounded-full bg-ink px-[18px] text-[15px] font-bold text-white">{menu.featured.cta}</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile / tablet menu overlay ── */}
      {mobile && (
        <nav aria-label={p.t.mainNav} className="fixed inset-x-0 bottom-0 top-[64px] z-50 flex flex-col gap-1 overflow-y-auto bg-white px-4 pb-6 pt-2 md:top-[73px] xl:hidden">
          {p.menus.map((m) => (
            <div key={m.id} className="border-b border-line">
              {m.href ? (
                <Link href={m.href} className="flex min-h-14 items-center text-lg font-bold text-ink no-underline">{m.label}</Link>
              ) : (
                <>
                  <button type="button" aria-expanded={mGroup === m.id} onClick={() => setMGroup(mGroup === m.id ? null : m.id)}
                    className="flex min-h-14 w-full items-center justify-between text-lg font-bold" style={{ color: mGroup === m.id ? '#166FA9' : '#10253A' }}>
                    {m.label} <Chevron open={mGroup === m.id} color="#10253A" size={16} />
                  </button>
                  {mGroup === m.id && (
                    <div className="flex flex-col pb-3">
                      {m.columns?.flatMap((c) => c.items).map((it) => (
                        <Link key={it.href + it.label} href={it.href} className="mt-1 flex min-h-12 items-center rounded-xl bg-canvas px-3 text-base text-ink no-underline">{it.label}</Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <span id="m-taal" className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{p.t.langShort}</span>
            <div role="group" aria-labelledby="m-taal" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#EEF2F6] p-[5px]">
              {p.langs.map((l) => (
                <Link key={l.code} href={l.href} hrefLang={l.code} lang={l.code} aria-current={l.code === p.locale ? 'true' : undefined}
                  className={`flex min-h-12 items-center justify-center rounded-xl text-[15px] font-bold text-ink no-underline ${l.code === p.locale ? 'bg-white shadow-[0_1px_4px_rgba(16,37,58,.18)]' : ''}`}>{l.name}</Link>
              ))}
            </div>
            <span className="font-mono text-xs text-muted">{p.t.opens} actarion.com{p.langs.find((l) => l.code === p.locale)?.path}</span>
          </div>
          <div className="flex flex-col gap-2.5 pt-4">
            <Link href={p.demoHref} className="flex h-14 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white no-underline">{p.t.mobileDemo}</Link>
            <Link href={p.roiHref} className="flex h-14 items-center justify-center rounded-full border-2 border-ink text-[17px] font-bold text-ink no-underline">{p.t.mobileRoi}</Link>
          </div>
        </nav>
      )}

      {/* ── Mobile sticky action bar ── */}
      {p.variant === 'full' && !mobile && (
        <div className="fixed inset-x-3 bottom-3 z-30 flex gap-2 rounded-full bg-ink p-2 shadow-[0_12px_30px_rgba(16,37,58,.3)] md:hidden print:hidden">
          <Link href={p.roiHref} className="flex h-12 flex-1 items-center justify-center rounded-full font-bold text-white no-underline hover:text-white">{p.t.roi}</Link>
          <Link href={p.demoHref} className="flex h-12 flex-1 items-center justify-center rounded-full bg-sky font-bold text-ink no-underline hover:text-ink">{p.t.mobileDemo}</Link>
        </div>
      )}
    </div>
  );
}
