import { ArticleFaq } from '@/components/design/ArticleFaq';
import Link from 'next/link';
import { Cta } from '@/components/Cta';
import { ResourcesBrowser, type KbItem } from '@/components/design/ResourcesBrowser';
import { getPage, getUi, type Locale } from '@/lib/i18n';
import { numberLocale } from '@/lib/locale';
import { childrenOf, pathFor, routeKeys, routes } from '@/lib/routes';
import {
  kbIndLabels,
  kbIndOrder,
  kbMeta,
  kbTopicLabels,
  kbTopicOrder,
  kbTypeColors,
  kbTypeFor,
  kbTypeLabels,
  kbTypeOrder,
  kbUi,
  typeLabel,
} from '@/content/design/resources';
import { ArticleSection } from './shared';

const shortDate = (locale: Locale, iso: string) =>
  new Intl.DateTimeFormat(numberLocale[locale], { day: 'numeric', month: 'short' }).format(new Date(iso)).replace('.', '');

function minutesFor(key: string): number {
  const p = getPage('en', key);
  const words = [p.lead, p.answer ?? '', JSON.stringify(p.sections ?? []), JSON.stringify(p.faq ?? [])].join(' ').split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

/** Knowledge-base items, built from the route catalogue: every item links to an existing page. */
function buildItems(locale: Locale): KbItem[] {
  return routeKeys
    .filter((k) => kbTypeFor[routes[k].type])
    .map((k) => {
      const type = kbTypeFor[routes[k].type]!;
      const p = getPage(locale, k);
      const meta = kbMeta[k] ?? { topic: 'dwi' as const };
      return {
        key: k,
        type,
        typeLabel: kbTypeLabels[locale][type],
        typeColor: kbTypeColors[type],
        title: type === 'template' || type === 'tool' ? p.label : p.h1,
        summary: (p.cardText ?? p.definition ?? p.lead).slice(0, 220),
        topic: meta.topic,
        topicLabel: kbTopicLabels[locale][meta.topic],
        ind: meta.ind ?? [],
        min: type === 'tool' ? 2 : type === 'template' ? 3 : minutesFor(k),
        date: p.updated,
        dateLabel: shortDate(locale, p.updated),
        pop: meta.pop ?? 30,
        href: pathFor(k, locale),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function ToolIcon({ kind }: { kind: 'calc' | 'gauge' }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#166FA9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'calc' ? (
        <>
          <rect x="5" y="3" width="16" height="20" rx="3" />
          <path d="M9 8h8M9 13h.01M13 13h.01M17 13h.01M9 17h.01M13 17h.01M17 17h.01" />
        </>
      ) : (
        <>
          <path d="M4 18a9 9 0 1 1 18 0" />
          <path d="M13 18l4-6" />
        </>
      )}
    </svg>
  );
}

function ToolsRow({ locale }: { locale: Locale }) {
  const t = kbUi[locale];
  const tools = [
    { key: 'roiCalculator', icon: 'calc' as const, title: t.roiTitle, sub: t.roiSub },
    { key: 'fitCheck', icon: 'gauge' as const, title: t.fitTitle, sub: t.fitSub },
  ];
  return (
    <section className="mx-auto max-w-site px-6 pt-[72px]">
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        {tools.map((x) => (
          <Link key={x.key} href={pathFor(x.key, locale)} className="flex items-center gap-[18px] rounded-3xl border border-line bg-white p-6 text-ink no-underline hover:border-primary hover:text-ink">
            <span className="flex h-14 flex-[0_0_56px] items-center justify-center rounded-2xl bg-tint"><ToolIcon kind={x.icon} /></span>
            <span className="flex flex-col gap-[2px]">
              <span className="text-[19px] font-bold">{x.title}</span>
              <span className="text-muted">{x.sub}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DarkHead({ eyebrow, h1, lead, padBottom = true }: { eyebrow: string; h1: string; lead: string; padBottom?: boolean }) {
  return (
    <section className="bg-ink text-white">
      <div className={`mx-auto flex max-w-site flex-col gap-5 px-6 pt-14 ${padBottom ? 'pb-12' : 'pb-0'}`}>
        <p className="m-0 text-sm font-bold uppercase tracking-[0.08em] text-sky">{eyebrow}</p>
        <h1 className="m-0 max-w-[900px] font-display text-[clamp(38px,4.6vw,62px)] font-extrabold leading-none tracking-[-0.035em]">{h1}</h1>
        <p className="m-0 max-w-[760px] text-[19px] leading-[1.5] text-muted-lighter">{lead}</p>
      </div>
    </section>
  );
}

export function ResourcesDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  void routeKey;
  const t = kbUi[locale];
  const items = buildItems(locale);
  const presentTypes = kbTypeOrder.filter((ty) => items.some((i) => i.type === ty));
  return (
    <>
      <DarkHead eyebrow={t.eyebrow} h1={t.h1} lead={t.lead} padBottom={false} />
      <ResourcesBrowser
        items={items}
        t={t}
        topics={kbTopicOrder.map((v) => ({ value: v, label: kbTopicLabels[locale][v] }))}
        types={presentTypes.map((v) => ({ value: v, label: kbTypeLabels[locale][v] }))}
        inds={kbIndOrder.map((v) => ({ value: v, label: kbIndLabels[locale][v] }))}
        expert={{
          href: pathFor('demo', locale),
          avatars: [
            { src: '/img/team/jack-kessels.webp', alt: 'Jack Kessels' },
            { src: '/img/team/mark-dercksen.webp', alt: 'Mark Dercksen' },
          ],
        }}
        aside={<Cta locale={locale} variant="card" heading={t.asideCta} />}
      />
      <ToolsRow locale={locale} />
      <div className="h-[72px]" />
      <Cta locale={locale} heading={t.bandHeading} />
    </>
  );
}

/** Generic hub (types hub, glossaryHub): card grid of childrenOf(routeKey) in the knowledge-base card style. */
export function HubDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const page = getPage(locale, routeKey);
  const t = kbUi[locale];
  const kids = childrenOf(routeKey).filter((k) => !routes[k].noindex);
  const isGlossary = routes[routeKey].type === 'glossaryHub';
  const sorted = isGlossary ? [...kids].sort((a, b) => getPage(locale, a).label.localeCompare(getPage(locale, b).label, numberLocale[locale])) : kids;
  return (
    <>
      <DarkHead eyebrow={page.eyebrow ?? typeLabel(routes[routeKey].type, locale)} h1={page.h1} lead={page.lead} />
      {page.answer && (
        <div className="mx-auto max-w-site px-6 pt-10">
          <section aria-labelledby="hub-answer" className="flex max-w-[820px] flex-col gap-2 rounded-[22px] border-2 border-ink bg-white px-[26px] py-6">
            <h2 id="hub-answer" className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">{getUi(locale).answerLabel}</h2>
            <p className="m-0 text-[19px] leading-[1.55]">{page.answer}</p>
          </section>
        </div>
      )}
      <div className="mx-auto max-w-site px-6 pt-10">
        <ul className="m-0 grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
          {sorted.map((k) => {
            const p = getPage(locale, k);
            const kb = kbTypeFor[routes[k].type];
            const meta = kbMeta[k];
            return (
              <li key={k} className="flex">
                <Link href={pathFor(k, locale)} className="box-border flex min-h-[220px] w-full flex-col gap-[10px] rounded-[22px] border border-line bg-white p-[22px] text-ink no-underline hover:border-primary hover:text-ink">
                  <span className="flex items-center justify-between gap-2">
                    <span className="rounded-full px-[10px] py-[5px] text-xs font-bold uppercase tracking-[0.06em] text-ink" style={{ background: kb ? kbTypeColors[kb] : '#A9DBF5' }}>
                      {typeLabel(routes[k].type, locale)}
                    </span>
                    {p.kpi && <span className="font-mono text-xs text-muted">{p.kpi}</span>}
                  </span>
                  <h2 className="m-0 font-display text-[21px] font-bold leading-[1.2]">{isGlossary ? p.label : p.h1}</h2>
                  <p className="m-0 line-clamp-4 flex-grow text-[15px] leading-[1.45] text-muted">{p.cardText ?? p.definition ?? p.lead}</p>
                  <span className="flex justify-between gap-2 border-t border-[#EEF2F6] pt-[10px] text-[13px] text-muted">
                    <span>{meta ? kbTopicLabels[locale][meta.topic] : p.label}</span>
                    <span>{t.updated} {shortDate(locale, p.updated)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {page.sections?.length ? (
        <div className="mx-auto flex max-w-site flex-col gap-12 px-6 pt-[72px]">
          {page.sections.map((s, i) => <div key={i} className="max-w-[760px]"><ArticleSection s={s} locale={locale} /></div>)}
        </div>
      ) : null}
      {page.faq?.length ? (
        <section id="faq" className="mx-auto flex max-w-site flex-col gap-7 px-6 pt-[72px]">
          <h2 className="m-0 font-display text-[38px] font-extrabold tracking-[-0.03em]">{getUi(locale).faqTitle}</h2>
          <div className="max-w-[760px]"><ArticleFaq items={page.faq} /></div>
        </section>
      ) : null}
      <ToolsRow locale={locale} />
      <div className="h-[72px]" />
      <Cta locale={locale} heading={t.bandHeading} />
    </>
  );
}
