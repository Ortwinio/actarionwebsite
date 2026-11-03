import { Md } from '@/components/Md';
import Link from 'next/link';
import { formatDate, getPage, getUi, type Locale } from '@/lib/i18n';
import { pathFor, type RouteKey } from '@/lib/routes';
import type { FaqItem, Section } from '@/content/types';

export const slugId = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Self-contained 40–60 word answer at the top of a page: the passage AI assistants quote. */
export function AnswerBox({ text, locale }: { text?: string; locale: Locale }) {
  if (!text) return null;
  return (
    <aside className="rounded-card border-l-4 border-primary bg-white p-6 md:p-7" aria-label={getUi(locale).answerLabel}>
      <p className="eyebrow mb-2">{getUi(locale).answerLabel}</p>
      <p className="text-lg leading-relaxed">{text}</p>
    </aside>
  );
}

export function Updated({ iso, locale }: { iso: string; locale: Locale }) {
  return (
    <p className="text-sm text-muted">
      {getUi(locale).updated}: <time dateTime={iso}>{formatDate(locale, iso)}</time>
    </p>
  );
}

export function PageHero({ routeKey, locale, children, small = true }: { routeKey: RouteKey; locale: Locale; children?: React.ReactNode; small?: boolean }) {
  const page = getPage(locale, routeKey);
  return (
    <header className="wrap flex flex-col gap-5 pb-10 pt-8 md:pt-12">
      {page.eyebrow && <p className="eyebrow">{page.eyebrow}</p>}
      <h1 className={`${small ? 'h1-sm' : 'h1'} max-w-[18ch]`}>{page.h1}</h1>
      <p className="lead max-w-[60ch]">{page.lead}</p>
      {children}
    </header>
  );
}

/** Image placeholder: zero bytes, fixed aspect ratio (no layout shift), replaced later by next/image. */
export function ImageSlot({ alt, ratio = '16/9', caption, label }: { alt: string; ratio?: string; caption?: string; label: string }) {
  return (
    <figure className="m-0">
      <div
        role="img"
        aria-label={alt}
        style={{ aspectRatio: ratio }}
        className="flex w-full items-center justify-center rounded-card border-2 border-dashed border-line bg-tint p-6 text-center"
      >
        <span className="max-w-sm font-mono text-sm text-muted">{label}: {alt}</span>
      </div>
      {caption && <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function SectionView({ s, locale }: { s: Section; locale: Locale }) {
  const id = s.id ?? (s.h2 ? slugId(s.h2) : undefined);
  switch (s.kind) {
    case 'image':
      return <ImageSlot alt={s.alt} ratio={s.ratio} caption={s.caption} label={getUi(locale).imagePending} />;
    case 'links':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-6">{s.h2}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.keys.map((k) => <li key={k} className="flex"><RouteCard routeKey={k} locale={locale} /></li>)}
          </ul>
        </section>
      );
    case 'text':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-5">{s.h2}</h2>
          <div className="prose-body">{s.body.map((p, i) => <p key={i}><Md text={p} /></p>)}</div>
        </section>
      );
    case 'features':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-6">{s.h2}</h2>
          {s.intro && <p className="lead mb-6">{s.intro}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            {s.items.map((it) => (
              <div key={it.title} className="card p-6">
                <h3 className="h3 mb-2 text-xl">{it.title}</h3>
                <p className="leading-relaxed text-muted"><Md text={it.text} /></p>
              </div>
            ))}
          </div>
        </section>
      );
    case 'steps':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-6">{s.h2}</h2>
          {s.intro && <p className="lead mb-6">{s.intro}</p>}
          <ol className="flex flex-col gap-3">
            {s.steps.map((st, i) => (
              <li key={st.title} className="card flex items-start gap-4 p-5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sky font-mono text-[15px]">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{st.title}</h3>
                  <p className="mt-0.5 leading-relaxed text-muted"><Md text={st.text} /></p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'checklist':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-6">{s.h2}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {s.items.map((it) => (
              <li key={it} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-semibold">
                <Check /> <span><Md text={it} /></span>
              </li>
            ))}
          </ul>
        </section>
      );
    case 'table':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-6">{s.h2}</h2>
          <div className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-tint">
                  {s.head.map((h) => <th key={h} scope="col" className="p-4 text-sm font-bold uppercase tracking-wide">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r[0]} className="border-t border-line">
                    {r.map((c, i) => i === 0 ? <th key={i} scope="row" className="p-4 font-semibold"><Md text={c} /></th> : <td key={i} className={`p-4 ${i === r.length - 1 ? 'text-primary font-semibold' : 'text-muted'}`}><Md text={c} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    case 'kpis':
      return (
        <section id={id} className="scroll-mt-24">
          <h2 className="h2 mb-6">{s.h2}</h2>
          <div className="card overflow-hidden">
            {s.rows.map((r) => (
              <div key={r.k} className="grid grid-cols-3 gap-3 border-b border-line p-4 last:border-0">
                <span className="font-semibold">{r.k}</span>
                <span className="font-mono">{r.before}</span>
                <span className="font-mono text-primary">{r.after}</span>
              </div>
            ))}
          </div>
          {s.note && <p className="mt-3 inline-block rounded-full bg-warn-bg px-3 py-1 text-sm font-bold text-warn-fg">{s.note}</p>}
        </section>
      );
  }
}

export function Sections({ sections, locale }: { sections?: Section[]; locale: Locale }) {
  if (!sections?.length) return null;
  return <div className="flex flex-col gap-16">{sections.map((s, i) => <SectionView key={i} s={s} locale={locale} />)}</div>;
}

/** Visible marker on pages that still contain placeholder content. */
export function DraftBanner({ show, locale }: { show?: boolean; locale: Locale }) {
  if (!show) return null;
  return (
    <div className="wrap pt-4">
      <p className="inline-flex rounded-full bg-warn-bg px-4 py-2 text-sm font-bold text-warn-fg">{getUi(locale).placeholderNote}</p>
    </div>
  );
}

export function Toc({ sections: all, locale }: { sections?: Section[]; locale: Locale }) {
  const sections = all?.filter((s): s is Exclude<Section, { kind: 'image' }> => s.kind !== 'image' && !!s.h2);
  if (!sections || sections.length < 2) return null;
  return (
    <nav aria-label={getUi(locale).onThisPage} className="card p-5">
      <p className="eyebrow mb-3">{getUi(locale).onThisPage}</p>
      <ul className="flex flex-col gap-1">
        {sections.map((s) => (
          <li key={s.h2}><a href={`#${s.id ?? slugId(s.h2 ?? '')}`} className="inline-flex min-h-[36px] items-center font-semibold no-underline">{s.h2}</a></li>
        ))}
      </ul>
    </nav>
  );
}

/** FAQ with native <details>: works without JavaScript and is fully in the HTML for crawlers. */
export function Faq({ items, locale }: { items?: FaqItem[]; locale: Locale }) {
  if (!items?.length) return null;
  return (
    <section id="faq" className="scroll-mt-24">
      <h2 className="h2 mb-6">{getUi(locale).faqTitle}</h2>
      <div className="flex flex-col gap-3">
        {items.map((f) => (
          <details key={f.q} className="card group p-0">
            <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-6 text-lg font-bold">
              <h3 className="text-lg font-bold">{f.q}</h3>
              <span aria-hidden="true" className="font-mono text-primary group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RouteCard({ routeKey, locale, as: H = 'h3' }: { routeKey: RouteKey; locale: Locale; as?: 'h2' | 'h3' }) {
  const p = getPage(locale, routeKey);
  return (
    <Link href={pathFor(routeKey, locale)} className="card group flex flex-col gap-3 p-6 text-ink no-underline transition-shadow hover:text-ink hover:shadow-float">
      {p.kpi && <span className="chip self-start">{p.kpi}</span>}
      <H className="h3">{p.label}</H>
      <p className="flex-grow leading-relaxed text-muted">{p.cardText ?? p.lead}</p>
      <span className="font-bold text-primary">{getUi(locale).readMore} →</span>
    </Link>
  );
}

export function Related({ keys, locale }: { keys?: RouteKey[]; locale: Locale }) {
  if (!keys?.length) return null;
  return (
    <section className="wrap pt-24" aria-labelledby="related">
      <h2 id="related" className="h2 mb-6">{getUi(locale).relatedTitle}</h2>
      <div className="grid gap-5 md:grid-cols-3">{keys.map((k) => <RouteCard key={k} routeKey={k} locale={locale} />)}</div>
    </section>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const pilot = getPage(locale, 'pilot');
  return (
    <section className="wrap py-24">
      <div className="flex flex-col items-start gap-6 rounded-panel bg-ink p-10 text-white md:flex-row md:items-center md:justify-between md:p-14">
        <div className="max-w-xl">
          <p className="eyebrow mb-3 text-sky">{pilot.eyebrow}</p>
          <h2 className="h2">{pilot.h1}</h2>
          <p className="mt-4 text-lg text-muted-lighter">{pilot.lead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={pathFor('pilot', locale)} className="btn-sky">{ui.ctaPilot}</Link>
          <Link href={pathFor('roiCalculator', locale)} className="btn border-2 border-sky text-white hover:bg-ink-2 hover:text-white">{ui.ctaRoi}</Link>
        </div>
      </div>
    </section>
  );
}

export function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-none">
      <circle cx="10" cy="10" r="9" fill="#A9DBF5" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke="#10253A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
