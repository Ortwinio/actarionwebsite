import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnswerBox, Check, CtaBand, Faq, PageHero, Related, RouteCard, Sections, Toc, Updated } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { RoiQuick } from '@/components/RoiQuick';
import { getPage, getUi, type Locale } from '@/lib/i18n';
import { childrenOf, pathFor, routes, type PageType, type RouteKey } from '@/lib/routes';
import {
  articleSchema,
  breadcrumbSchema,
  definedTermSchema,
  faqSchema,
  graph,
  howToSchema,
  softwareSchema,
  webPageSchema,
} from '@/lib/seo';

/** Full ROI calculator (separate Vercel project) until it is ported into /roi-calculator. */
const FULL_ROI_URL = 'https://roicalculator.actarion.com';

interface Props {
  routeKey: RouteKey;
  locale: Locale;
}

/* ---------- Schema per page ---------- */

function schemaFor({ routeKey, locale }: Props) {
  const page = getPage(locale, routeKey);
  const type = routes[routeKey].type;
  const nodes: object[] = [webPageSchema(routeKey, locale)];
  if (type !== 'home') nodes.push(breadcrumbSchema(routeKey, locale));
  if (page.faq?.length) nodes.push(faqSchema(page.faq));
  if (type === 'guide' || type === 'caseStudy' || type === 'comparison') nodes.push(articleSchema(routeKey, locale));
  if (type === 'guide') {
    const steps = page.sections?.find((s) => s.kind === 'steps');
    if (steps && steps.kind === 'steps') nodes.push(howToSchema(page.h1, steps.steps));
  }
  if (type === 'glossaryTerm') nodes.push(definedTermSchema(routeKey, locale));
  if (type === 'pillar' || type === 'home') nodes.push(softwareSchema);
  return graph(...nodes);
}

/* ---------- Shared article layout ---------- */

function ArticleLayout({ routeKey, locale, aside, before }: Props & { aside?: React.ReactNode; before?: React.ReactNode }) {
  const page = getPage(locale, routeKey);
  return (
    <>
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-12">
          <AnswerBox text={page.answer} locale={locale} />
          {before}
          <Sections sections={page.sections} />
          <Faq items={page.faq} locale={locale} />
          <Updated iso={page.updated} locale={locale} />
        </div>
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <Toc sections={page.sections} locale={locale} />
          {aside ?? <SideCta locale={locale} />}
        </aside>
      </div>
      <Related keys={page.related} locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

function SideCta({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const roi = getPage(locale, 'roiCalculator');
  return (
    <div className="flex flex-col gap-3 rounded-card bg-ink p-6 text-white">
      <p className="eyebrow text-sky">{roi.eyebrow}</p>
      <p className="font-display text-xl font-bold">{roi.h1}</p>
      <Link href={pathFor('roiCalculator', locale)} className="btn-sky">{ui.ctaRoi}</Link>
      <Link href={pathFor('pilot', locale)} className="inline-flex min-h-[40px] items-center font-bold text-sky hover:text-white">{ui.ctaPilot} →</Link>
    </div>
  );
}

/* ---------- Templates ---------- */

function HomeTemplate({ locale }: Props) {
  const ui = getUi(locale);
  const page = getPage(locale, 'home');
  const ucs = childrenOf('useCases');
  return (
    <>
      <section className="wrap grid items-center gap-14 pb-20 pt-12 lg:grid-cols-2 lg:pt-20">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="h1">{page.h1}</h1>
          <p className="lead max-w-[34ch]">{page.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={pathFor('pilot', locale)} className="btn-primary min-h-[58px] text-[17px]">{ui.ctaPilot}</Link>
            <Link href={pathFor('roiCalculator', locale)} className="btn-outline min-h-[58px] text-[17px]">{ui.ctaRoi}</Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[15px] font-semibold">
            {ui.checks.map((c) => <li key={c} className="inline-flex items-center gap-2"><Check />{c}</li>)}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-panel bg-sky p-4">
            <Image
              src="/actarion-woman-sop-ar.jpg"
              alt=""
              width={1600}
              height={1066}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-[20px]"
            />
          </div>
          <div className="relative z-10 mx-4 -mt-24 max-w-sm sm:ml-auto sm:mr-6">
            <RoiQuick locale={locale} fullHref={pathFor('roiCalculator', locale)} compact />
          </div>
        </div>
      </section>

      <section className="bg-ink text-white" aria-label="ActARion in numbers">
        <div className="wrap grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {ui.stats.map((s) => (
            <div key={s.l} className="border-ink-3 lg:border-r lg:pr-6 last:border-0">
              <p className="font-mono text-5xl text-sky">{s.n}</p>
              <p className="mt-2 text-muted-light">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pt-24">
        <AnswerBox text={page.answer} locale={locale} />
      </section>

      <section className="wrap pt-20" aria-labelledby="uc-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="uc-title" className="h2 max-w-2xl">{getPage(locale, 'useCases').h1}</h2>
          <Link href={pathFor('useCases', locale)} className="inline-flex min-h-[44px] items-center font-bold">{getPage(locale, 'useCases').label} →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[...ucs, 'digitalWorkInstructions' as RouteKey].map((k) => <RouteCard key={k} routeKey={k} locale={locale} />)}
        </div>
      </section>

      <section className="wrap pt-24">
        <div className="grid items-center gap-10 rounded-panel bg-ink p-8 text-white md:p-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-sky">{getPage(locale, 'roiCalculator').eyebrow}</p>
            <h2 className="h2">{getPage(locale, 'roiCalculator').h1}</h2>
            <p className="text-lg text-muted-lighter">{getPage(locale, 'roiCalculator').lead}</p>
            <Link href={pathFor('roiCalculator', locale)} className="btn-sky self-start">{ui.ctaRoi}</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <RouteCard routeKey="caseChangeover" locale={locale} />
            <RouteCard routeKey="tplWorkInstruction" locale={locale} />
          </div>
        </div>
      </section>

      <Related keys={['indPharma', 'guideWriteWorkInstructions', 'cmpDigitalVsPaper']} locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

function HubTemplate({ routeKey, locale }: Props) {
  const page = getPage(locale, routeKey);
  const kids = childrenOf(routeKey);
  return (
    <>
      <PageHero routeKey={routeKey} locale={locale} />
      <div className="wrap flex flex-col gap-12">
        <AnswerBox text={page.answer} locale={locale} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {kids.map((k) => <li key={k} className="flex"><RouteCard routeKey={k} locale={locale} as="h2" /></li>)}
        </ul>
      </div>
      <CtaBand locale={locale} />
    </>
  );
}

function UseCaseTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <PageHero {...p}>
        <div className="flex flex-wrap items-center gap-3">
          {page.kpi && <span className="chip">KPI: {page.kpi}</span>}
          <Link href={pathFor('pilot', p.locale)} className="btn-primary">{getUi(p.locale).ctaPilot}</Link>
        </div>
      </PageHero>
      <ArticleLayout {...p} />
    </>
  );
}

function TemplateDownload(p: Props) {
  const ui = getUi(p.locale);
  return (
    <>
      <PageHero {...p} />
      <ArticleLayout
        {...p}
        aside={
          <div className="card flex flex-col gap-4 p-6" id="download">
            <p className="h3 text-xl">{ui.download}</p>
            <LeadForm locale={p.locale} kind="template" resource={p.routeKey} />
          </div>
        }
      />
    </>
  );
}

function GlossaryTermTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <PageHero {...p} />
      <ArticleLayout
        {...p}
        before={
          <dl className="rounded-card border-l-4 border-primary bg-white p-6 md:p-7">
            <dt className="eyebrow mb-2">{getUi(p.locale).definition}</dt>
            <dd className="text-lg leading-relaxed">{page.definition}</dd>
          </dl>
        }
      />
    </>
  );
}

function CaseStudyTemplate(p: Props) {
  return (
    <>
      <PageHero {...p} />
      <ArticleLayout {...p} />
    </>
  );
}

function RoiTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <PageHero {...p} />
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <RoiQuick locale={p.locale} fullHref={FULL_ROI_URL} />
        <div className="flex flex-col gap-12">
          <AnswerBox text={page.answer} locale={p.locale} />
          <Sections sections={page.sections} />
        </div>
      </div>
      <div className="wrap mt-16 flex max-w-prose flex-col gap-10 lg:mx-auto">
        <Faq items={page.faq} locale={p.locale} />
        <Updated iso={page.updated} locale={p.locale} />
      </div>
      <Related keys={page.related} locale={p.locale} />
    </>
  );
}

function PilotTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <PageHero {...p} />
      <div className="wrap grid gap-12 pb-24 lg:grid-cols-2">
        <div className="card p-6 md:p-8">
          <LeadForm locale={p.locale} kind="pilot" />
        </div>
        <Sections sections={page.sections} />
      </div>
    </>
  );
}

function DefaultArticle(p: Props) {
  return (
    <>
      <PageHero {...p} />
      <ArticleLayout {...p} />
    </>
  );
}

const templates: Record<PageType, (p: Props) => React.ReactElement> = {
  home: HomeTemplate,
  pillar: DefaultArticle,
  hub: HubTemplate,
  useCase: UseCaseTemplate,
  industry: UseCaseTemplate,
  template: TemplateDownload,
  guide: DefaultArticle,
  glossaryTerm: GlossaryTermTemplate,
  comparison: DefaultArticle,
  caseStudy: CaseStudyTemplate,
  roi: RoiTemplate,
  pilot: PilotTemplate,
};

export function RenderPage(p: Props) {
  const Template = templates[routes[p.routeKey].type];
  return (
    <>
      <JsonLd data={schemaFor(p)} />
      {p.routeKey !== 'home' && <Breadcrumbs routeKey={p.routeKey} locale={p.locale} />}
      <Template {...p} />
    </>
  );
}
