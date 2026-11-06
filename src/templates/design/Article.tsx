import Image from 'next/image';
import { imageSize } from '@/content/design/useCase';
import Link from 'next/link';
import { Cta } from '@/components/Cta';
import { ArticleFaq } from '@/components/design/ArticleFaq';
import { LeadForm } from '@/components/LeadForm';
import { formatDate, getPage, getUi, type Locale } from '@/lib/i18n';
import { pathFor, routes } from '@/lib/routes';
import type { PageContent, Section } from '@/content/types';
import { articleUi, smedCopy } from '@/content/design/article';
import { kbMeta, kbTopicLabels, typeLabel } from '@/content/design/resources';
import { ArticleSection, LinkCards, h2Article, sectionId } from './shared';

type TocItem = { id: string; label: string };

/** Types that show the author row (editorial content). */
const EDITORIAL = new Set(['guide', 'comparison', 'template', 'whitepaper', 'report', 'caseStudy', 'glossaryTerm']);

function readMinutes(p: PageContent): number {
  const parts: string[] = [p.h1, p.lead, p.answer ?? '', p.definition ?? ''];
  for (const s of p.sections ?? []) parts.push(JSON.stringify(s));
  for (const f of p.faq ?? []) parts.push(f.q, f.a);
  const words = parts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 200));
}

function TocChips({ items, label }: { items: TocItem[]; label: string }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t) => (
        <a key={t.id} href={`#${t.id}`} className="inline-flex min-h-[40px] items-center rounded-full border border-line bg-white px-[14px] text-sm font-semibold text-ink no-underline hover:border-primary hover:text-ink">
          {t.label}
        </a>
      ))}
    </nav>
  );
}

function InlineCta({ strong, text, btn, locale }: { strong: string; text: string; btn: string; locale: Locale }) {
  return (
    <aside className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-sky px-6 py-[22px]">
      <div className="flex flex-[1_1_360px] items-center gap-[14px]">
        <Image src="/img/team/jack-kessels.webp" width={640} height={640} alt="Jack Kessels" loading="lazy" sizes="56px" className="h-14 w-14 flex-none rounded-full border-[3px] border-white object-cover" />
        <p className="m-0 text-[17px] leading-[1.4]"><strong>{strong}</strong> {text}</p>
      </div>
      <Link href={pathFor('demo', locale)} className="inline-flex h-[50px] items-center rounded-full bg-ink px-5 font-bold text-white no-underline hover:bg-ink-2 hover:text-white">{btn}</Link>
    </aside>
  );
}

interface ShellProps {
  locale: Locale;
  badge: string;
  topic?: { label: string; href: string };
  minutes: number;
  h1: string;
  lead?: string;
  author: boolean;
  updatedIso: string;
  updatedLabel: string;
  answer?: { label: string; text: string };
  toc: TocItem[];
  body: React.ReactNode;
  faq?: { q: string; a: string }[];
  related?: React.ReactNode;
  sideHeading: string;
  sideTop?: React.ReactNode;
  bandHeading: string;
}

function ArticleShell(p: ShellProps) {
  const t = articleUi[p.locale];
  return (
    <>
      <div className="mx-auto flex max-w-site flex-wrap items-start gap-12 px-6 pt-12">
        <article className="flex min-w-0 max-w-[760px] flex-[999_1_620px] flex-col gap-7">
          <header className="flex flex-col gap-[18px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky px-[10px] py-[5px] text-xs font-bold uppercase tracking-[0.06em]">{p.badge}</span>
              {p.topic && <Link href={p.topic.href} className="text-sm font-semibold">{p.topic.label}</Link>}
              <span className="font-mono text-[13px] text-muted">· {p.minutes} {t.readTime}</span>
            </div>
            <h1 className="m-0 font-display text-[clamp(36px,4.2vw,56px)] font-extrabold leading-[1.02] tracking-[-0.03em]">{p.h1}</h1>
            {p.lead && <p className="m-0 text-[19px] leading-[1.5] text-muted">{p.lead}</p>}
            <div className="flex flex-wrap items-center gap-[14px]">
              {p.author && (
                <>
                  <Image src="/img/team/ortwin-verreck.webp" width={640} height={640} alt="" priority sizes="52px" className="h-[52px] w-[52px] rounded-full border border-line object-cover" />
                  <div className="flex flex-col">
                    <Link href={pathFor('company', p.locale)} className="font-bold text-ink no-underline hover:text-primary">{t.authorName}</Link>
                    <span className="text-sm text-muted">{t.authorRole}</span>
                  </div>
                </>
              )}
              <span className={`text-sm text-muted ${p.author ? 'ml-auto' : ''}`}>
                {t.updatedOn} <time dateTime={p.updatedIso}>{p.updatedLabel}</time>
              </span>
            </div>
          </header>

          {p.answer && (
            <section aria-labelledby="kort" className="flex flex-col gap-2 rounded-[22px] border-2 border-ink bg-white px-[26px] py-6">
              <h2 id="kort" className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">{p.answer.label}</h2>
              <p className="m-0 text-[19px] leading-[1.55]">{p.answer.text}</p>
            </section>
          )}

          <TocChips items={p.toc} label={t.onThisPage} />

          {p.body}

          {p.faq && p.faq.length > 0 && (
            <section id="faq" className="flex scroll-mt-6 flex-col gap-[10px]">
              <h2 className={`${h2Article} mb-1`}>{t.faq}</h2>
              <ArticleFaq items={p.faq} />
            </section>
          )}

          {p.related && (
            <section aria-labelledby="verder" className="flex flex-col gap-3 border-t border-line pt-2">
              <h2 id="verder" className="m-0 text-lg font-bold">{t.readMore}</h2>
              {p.related}
            </section>
          )}
        </article>

        <aside className="sticky top-6 flex min-w-0 max-w-[340px] flex-[1_1_300px] flex-col gap-4">
          {p.sideTop}
          <Cta locale={p.locale} variant="card" heading={p.sideHeading} />
          {p.toc.length > 1 && (
            <nav aria-label={t.onThisPage} className="flex flex-col gap-[6px] rounded-[20px] border border-line bg-white p-[18px]">
              <p className="m-0 font-bold">{t.onThisPage}</p>
              {p.toc.map((x) => (
                <a key={x.id} href={`#${x.id}`} className="flex min-h-[36px] items-center text-[15px]">{x.label}</a>
              ))}
            </nav>
          )}
        </aside>
      </div>
      <div className="h-20" />
      <Cta locale={p.locale} heading={p.bandHeading} />
    </>
  );
}

function SmedArticle({ locale }: { locale: Locale }) {
  const c = smedCopy[locale];
  const toc: TocItem[] = [
    { id: 'fase-1', label: c.toc[0] },
    { id: 'fase-2', label: c.toc[1] },
    { id: 'fase-3', label: c.toc[2] },
    { id: 'faq', label: c.toc[3] },
  ];
  const body = (
    <>
      <section id="fase-1" className="flex scroll-mt-6 flex-col gap-[14px]">
        <h2 className={h2Article}>{c.s1.h2}</h2>
        <p className="m-0 text-lg leading-[1.6]">{c.s1.intro}</p>
        <ol className="m-0 flex list-none flex-col gap-[10px] p-0">
          {c.s1.steps.map(([title, text], i) => (
            <li key={title} className="flex items-start gap-[14px] rounded-2xl border border-line bg-white px-4 py-[14px]">
              <span className="flex h-8 flex-[0_0_32px] items-center justify-center rounded-full bg-sky font-mono text-sm">{i + 1}</span>
              <span className="leading-[1.5]"><strong>{title}.</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>
      <section id="fase-2" className="flex scroll-mt-6 flex-col gap-[14px]">
        <h2 className={h2Article}>{c.s2.h2}</h2>
        <p className="m-0 text-lg leading-[1.6]">{c.s2.intro}</p>
        <div className="overflow-x-auto rounded-[18px] border border-line bg-white">
          <table className="w-full min-w-[520px] border-collapse text-base">
            <thead>
              <tr className="bg-tint text-left">
                {c.s2.head.map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {c.s2.rows.map(([a, b, d, hl]) => (
                <tr key={a} className="border-t border-line">
                  <th scope="row" className="px-4 py-3 text-left font-semibold">{a}</th>
                  <td className="px-4 py-3">{b}</td>
                  <td className={`px-4 py-3 ${hl ? 'font-bold text-primary' : ''}`}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="m-0 text-sm text-muted">{c.s2.caption}</p>
      </section>
      <InlineCta strong={c.cta.strong} text={c.cta.text} btn={c.cta.btn} locale={locale} />
      <section id="fase-3" className="flex scroll-mt-6 flex-col gap-[14px]">
        <h2 className={h2Article}>{c.s3.h2}</h2>
        <ul className="m-0 flex flex-col gap-2 pl-[22px] text-lg leading-[1.55]">
          {c.s3.items.map(([b, rest]) => <li key={b}><strong>{b}</strong> {rest}</li>)}
        </ul>
      </section>
    </>
  );
  const titles = Object.fromEntries(c.related.map((r) => [r.key, { label: r.label, title: r.title }]));
  return (
    <ArticleShell
      locale={locale}
      badge={typeLabel('guide', locale)}
      topic={{ label: c.topic, href: `${pathFor('resources', locale)}#topic=ops` }}
      minutes={c.minutes}
      h1={c.h1}
      author
      updatedIso={c.updated}
      updatedLabel={c.updatedLabel}
      answer={{ label: articleUi[locale].shortAnswer, text: c.answer }}
      toc={toc}
      body={body}
      faq={c.faq}
      related={<LinkCards keys={c.related.map((r) => r.key)} titles={titles} locale={locale} />}
      sideHeading={c.sideHeading}
      bandHeading={c.bandHeading}
    />
  );
}

export function ArticleDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  if (routeKey === 'blogSmed') return <SmedArticle locale={locale} />;

  const page = getPage(locale, routeKey);
  const t = articleUi[locale];
  const type = routes[routeKey].type;
  const sections: Section[] = page.sections ?? [];
  const toc: TocItem[] = sections
    .filter((s) => s.kind !== 'image' && s.h2)
    .map((s) => ({ id: sectionId(s)!, label: s.h2! }));
  if (page.faq?.length) toc.push({ id: 'faq', label: t.faq });

  const isTerm = type === 'glossaryTerm';
  const answerText = isTerm ? page.definition ?? page.answer : page.answer ?? page.definition;
  const meta = kbMeta[routeKey];
  const ctaAt = Math.min(2, sections.length);

  const body = (
    <>
      {page.image && (
        <figure className="m-0">
          <Image src={page.image} width={imageSize[page.image]?.[0] ?? 1200} height={imageSize[page.image]?.[1] ?? 750} alt={page.heroImage ?? ''} priority sizes="(min-width: 1200px) 760px, 100vw" className="block h-auto w-full rounded-[20px] border border-line" />
        </figure>
      )}
      {sections.map((s, i) => (
        <div key={i} className="contents">
          {i === ctaAt && <InlineCta {...t.inlineCta} locale={locale} />}
          <ArticleSection s={s} locale={locale} />
        </div>
      ))}
      {ctaAt === sections.length && <InlineCta {...t.inlineCta} locale={locale} />}
    </>
  );

  const sideTop =
    type === 'template' ? (
      <div id="download" className="flex scroll-mt-6 flex-col gap-4 rounded-[20px] border border-line bg-white p-[18px]">
        <p className="m-0 font-display text-xl font-bold">{t.downloadTitle}</p>
        <LeadForm locale={locale} ui={getUi(locale)} kind="template" resource={routeKey} />
      </div>
    ) : undefined;

  return (
    <ArticleShell
      locale={locale}
      badge={typeLabel(type, locale)}
      topic={meta ? { label: kbTopicLabels[locale][meta.topic], href: `${pathFor('resources', locale)}#topic=${meta.topic}` } : undefined}
      minutes={readMinutes(page)}
      h1={page.h1}
      lead={page.lead}
      author={EDITORIAL.has(type)}
      updatedIso={page.updated}
      updatedLabel={formatDate(locale, page.updated)}
      answer={answerText ? { label: isTerm ? t.definition : t.shortAnswer, text: answerText } : undefined}
      toc={toc}
      body={body}
      faq={page.faq}
      related={page.related?.length ? <LinkCards keys={page.related} locale={locale} /> : undefined}
      sideHeading={t.sideHeading}
      sideTop={sideTop}
      bandHeading={t.bandHeading}
    />
  );
}
