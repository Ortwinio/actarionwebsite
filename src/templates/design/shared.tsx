import Link from 'next/link';
import { ImageSlot, slugId } from '@/components/Blocks';
import { getPage, getUi, type Locale } from '@/lib/i18n';
import { pathFor, routes } from '@/lib/routes';
import type { Section } from '@/content/types';
import { typeLabel } from '@/content/design/resources';

export const sectionId = (s: Section) => s.id ?? (s.h2 ? slugId(s.h2) : undefined);

export const h2Article = 'm-0 font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em]';

/** Renders page-model sections in the article visual language (Artikel spec). */
export function ArticleSection({ s, locale }: { s: Section; locale: Locale }) {
  const id = sectionId(s);
  const head = s.h2 ? <h2 className={h2Article}>{s.h2}</h2> : null;
  const intro = 'intro' in s && s.intro ? <p className="m-0 text-lg leading-[1.6]">{s.intro}</p> : null;
  const wrap = (children: React.ReactNode) => (
    <section id={id} className="flex scroll-mt-6 flex-col gap-[14px]">
      {head}
      {intro}
      {children}
    </section>
  );
  switch (s.kind) {
    case 'text':
      return wrap(s.body.map((p, i) => <p key={i} className="m-0 text-lg leading-[1.6]">{p}</p>));
    case 'steps':
      return wrap(
        <ol className="m-0 flex list-none flex-col gap-[10px] p-0">
          {s.steps.map((st, i) => (
            <li key={st.title} className="flex items-start gap-[14px] rounded-2xl border border-line bg-white px-4 py-[14px]">
              <span className="flex h-8 flex-[0_0_32px] items-center justify-center rounded-full bg-sky font-mono text-sm">{i + 1}</span>
              <span className="leading-[1.5]"><strong>{st.title.replace(/\.$/, '')}.</strong> {st.text}</span>
            </li>
          ))}
        </ol>,
      );
    case 'features':
      return wrap(
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {s.items.map((it) => (
            <div key={it.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-5">
              <h3 className="m-0 text-lg font-bold">{it.title}</h3>
              <p className="m-0 leading-[1.5] text-muted">{it.text}</p>
            </div>
          ))}
        </div>,
      );
    case 'checklist':
      return wrap(
        <ul className="m-0 flex list-disc flex-col gap-2 pl-[22px] text-lg leading-[1.55]">
          {s.items.map((it) => <li key={it}>{it}</li>)}
        </ul>,
      );
    case 'table':
      return wrap(
        <div className="overflow-x-auto rounded-[18px] border border-line bg-white">
          <table className="w-full min-w-[520px] border-collapse text-base">
            <thead>
              <tr className="bg-tint text-left">
                {s.head.map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r) => (
                <tr key={r[0]} className="border-t border-line">
                  {r.map((c, i) => (i === 0 ? <th key={i} scope="row" className="px-4 py-3 text-left font-semibold">{c}</th> : <td key={i} className="px-4 py-3">{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    case 'kpis': {
      const ui = getUi(locale);
      return wrap(
        <>
          <div className="overflow-x-auto rounded-[18px] border border-line bg-white">
            <table className="w-full min-w-[520px] border-collapse text-base">
              <thead>
                <tr className="bg-tint text-left">
                  <th scope="col" className="px-4 py-3">KPI</th>
                  <th scope="col" className="px-4 py-3">{ui.before}</th>
                  <th scope="col" className="px-4 py-3">{ui.after}</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.k} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">{r.k}</th>
                    <td className="px-4 py-3 font-mono">{r.before}</td>
                    <td className="px-4 py-3 font-mono font-bold text-primary">{r.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.note && <p className="m-0 text-sm text-muted">{s.note}</p>}
        </>,
      );
    }
    case 'image':
      return (
        <section id={id} className="flex flex-col gap-[14px]">
          {head}
          <ImageSlot alt={s.alt} ratio={s.ratio} caption={s.caption} label={getUi(locale).imagePending} />
        </section>
      );
    case 'links':
      return wrap(<LinkCards keys={s.keys} locale={locale} />);
  }
}

/** "Verder lezen" card grid (Artikel spec 2.9). */
export function LinkCards({ keys, locale, titles }: { keys: string[]; locale: Locale; titles?: Record<string, { label: string; title: string }> }) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
      {keys.filter((k) => routes[k]).map((k) => {
        const t = titles?.[k];
        return (
          <Link key={k} href={pathFor(k, locale)} className="block rounded-2xl border border-line bg-white p-4 text-ink no-underline hover:border-primary hover:text-ink">
            <span className="block text-xs font-bold uppercase text-muted">{t?.label ?? typeLabel(routes[k].type, locale)}</span>
            <span className="mt-1 block font-bold">{t?.title ?? getPage(locale, k).label}</span>
          </Link>
        );
      })}
    </div>
  );
}
