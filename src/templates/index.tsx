import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Header } from '@/components/Header';
import { Cta } from '@/components/Cta';
import { HomeDesign } from '@/templates/design/Home';
import { smedCopy } from '@/content/design/article';
import { RoiDesign, RoiReportDesign } from '@/templates/design/Roi';
import { UseCaseDesign } from '@/templates/design/UseCase';
import { ArticleDesign } from '@/templates/design/Article';
import { ResourcesDesign, HubDesign } from '@/templates/design/Resources';
import { PilotDesign } from '@/templates/design/Pilot';
import { AanvraagDesign } from '@/templates/design/Aanvraag';
import { FitCheckDesign } from '@/templates/design/FitCheck';
import { WhitepaperDesign } from '@/templates/design/Whitepaper';
import { PartnersDesign, PartnerDetailDesign } from '@/templates/design/Partners';
import { OverDesign, TeamDesign, VisionDesign } from '@/templates/design/Over';

import {
  AnswerBox,
  Check,
  DraftBanner,
  Faq,
  ImageSlot,
  PageHero,
  Related,
  RouteCard,
  Sections,
  Toc,
  Updated,
} from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { FitCheck, ResourceSearch, RoiCalculator } from '@/components/Lazy';
import { LeadForm, type LeadKind } from '@/components/LeadForm';
import { RoiQuick } from '@/components/RoiQuick';
import { RoiAssumptions } from '@/components/RoiAssumptions';
import { getPage, getUi, type Locale } from '@/lib/i18n';
import { childrenOf, pathFor, routeKeys, routes, type PageType, type RouteKey } from '@/lib/routes';
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

interface Props {
  routeKey: RouteKey;
  locale: Locale;
}


/* ---------- Schema per page type ---------- */

function schemaFor({ routeKey, locale }: Props) {
  const page = getPage(locale, routeKey);
  const type = routes[routeKey].type;
  const nodes: object[] = [webPageSchema(routeKey, locale)];
  if (type !== 'home') nodes.push(breadcrumbSchema(routeKey, locale));
  // FAQ schema must match the FAQ that is visible on the page.
  const faq = routeKey === 'blogSmed' ? smedCopy[locale].faq : page.faq;
  if (faq?.length) nodes.push(faqSchema(faq));
  if (['guide', 'caseStudy', 'comparison', 'whitepaper', 'report'].includes(type)) nodes.push(articleSchema(routeKey, locale));
  if (type === 'guide' || type === 'template') {
    const steps = page.sections?.find((s) => s.kind === 'steps');
    if (steps && steps.kind === 'steps') nodes.push(howToSchema(page.h1, steps.steps));
  }
  if (type === 'glossaryTerm') nodes.push(definedTermSchema(routeKey, locale));
  if (type === 'solution' || type === 'platform' || type === 'home') nodes.push(softwareSchema);
  return graph(...nodes);
}

/* ---------- Shared layouts ---------- */

function SideCta({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const roi = getPage(locale, 'roiCalculator');
  return (
    <div className="flex flex-col gap-3 rounded-card bg-ink p-6 text-white">
      <p className="eyebrow text-sky">{roi.label}</p>
      <p className="font-display text-xl font-bold">{roi.h1}</p>
      <Link href={pathFor('roiCalculator', locale)} className="btn-sky">{ui.ctaRoi}</Link>
      <Link href={pathFor('demo', locale)} className="inline-flex min-h-[40px] items-center font-bold text-sky hover:text-white">{ui.ctaDemo} →</Link>
    </div>
  );
}

function ArticleLayout({ routeKey, locale, aside, before }: Props & { aside?: React.ReactNode; before?: React.ReactNode }) {
  const page = getPage(locale, routeKey);
  return (
    <>
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-12">
          <AnswerBox text={page.answer} locale={locale} />
          {before}
          <Sections sections={page.sections} locale={locale} />
          <Faq items={page.faq} locale={locale} />
          <Updated iso={page.updated} locale={locale} />
        </div>
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <Toc sections={page.sections} locale={locale} />
          {aside ?? <SideCta locale={locale} />}
        </aside>
      </div>
      <Related keys={page.related} locale={locale} />
      <Cta locale={locale} />
    </>
  );
}

function HeroWithImage(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <div className="wrap grid items-center gap-10 pb-10 pt-8 md:pt-12 lg:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col gap-5">
        {page.eyebrow && <p className="eyebrow">{page.eyebrow}</p>}
        <h1 className="h1-sm">{page.h1}</h1>
        <p className="lead">{page.lead}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={pathFor('demo', p.locale)} className="btn-primary">{getUi(p.locale).ctaDemo}</Link>
          <Link href={pathFor('roiCalculator', p.locale)} className="btn-outline">{getUi(p.locale).ctaRoi}</Link>
          {page.kpi && routes[p.routeKey].type === 'useCase' && <span className="chip">KPI: {page.kpi}</span>}
        </div>
      </div>
      {page.heroImage && <ImageSlot alt={page.heroImage} ratio="4/3" label={getUi(p.locale).imagePending} />}
    </div>
  );
}

/* ---------- Templates ---------- */

function HomeTemplate({ locale }: Props) {
  const ui = getUi(locale);
  const page = getPage(locale, 'home');
  const steps = getPage(locale, 'solDwi').sections?.find((s) => s.kind === 'steps');
  return (
    <>
      <section className="wrap grid items-center gap-14 pb-20 pt-12 lg:grid-cols-2 lg:pt-20">
        <div className="flex flex-col gap-7">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="h1">{page.h1}</h1>
          <p className="lead max-w-[34ch]">{page.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={pathFor('demo', locale)} className="btn-primary min-h-[58px] text-[17px]">{ui.ctaDemo}</Link>
            <Link href={pathFor('roiCalculator', locale)} className="btn-outline min-h-[58px] text-[17px]">{ui.ctaRoi}</Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[15px] font-semibold">
            {ui.checks.map((c) => <li key={c} className="inline-flex items-center gap-2"><Check />{c}</li>)}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-panel bg-sky p-4">
            <Image
              src="/img/hero-operator-ar.webp"
              alt=""
              width={1200}
              height={800}
              priority
              fetchPriority="high"
              quality={70}
              sizes="(min-width: 1200px) 560px, (min-width: 1024px) 45vw, 92vw"
              className="h-auto w-full rounded-[20px]"
            />
          </div>
          <div className="relative z-10 mx-4 -mt-24 max-w-sm sm:ml-auto sm:mr-6">
            <RoiQuick locale={locale} t={ui.roi} fullHref={`${pathFor('roiCalculator', locale)}#calculator`} compact />
          </div>
        </div>
      </section>

      <section className="bg-ink text-white" aria-label="ActARion">
        <div className="wrap flex flex-col gap-8 py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ui.stats.map((s) => (
              <div key={s.l} className="border-ink-3 lg:border-r lg:pr-6 last:border-0">
                <p className="font-mono text-5xl text-sky">{s.n}</p>
                <p className="mt-2 text-muted-light">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-ink-3 pt-6">
            <span className="mr-2 text-sm font-bold uppercase tracking-[0.08em] text-muted-light">{ui.worksWith}</span>
            <Link href={pathFor('partnerDeepsight', locale)} className="rounded-full border border-ink-3 px-4 py-2.5 font-semibold text-white no-underline hover:text-sky">Powered by DeepSight</Link>
            {['hwVisionPro', 'hwAndroidXr', 'hwTablets'].map((k) => (
              <Link key={k} href={pathFor(k, locale)} className="rounded-full border border-ink-3 px-4 py-2.5 font-semibold text-white no-underline hover:text-sky">{getPage(locale, k).label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pt-24"><AnswerBox text={page.answer} locale={locale} /></section>

      {steps && steps.kind === 'steps' && (
        <section className="wrap pt-20" aria-labelledby="how">
          <h2 id="how" className="h2 mb-8 max-w-2xl">{steps.h2}</h2>
          <ol className="grid gap-4 md:grid-cols-4">
            {steps.steps.map((s, i) => (
              <li key={s.title} className="card flex flex-col gap-3 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky font-mono">{i + 1}</span>
                <h3 className="h3 text-xl">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="wrap pt-24" aria-labelledby="sol-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="sol-title" className="h2 max-w-2xl">{getPage(locale, 'solutions').label}</h2>
          <Link href={pathFor('solutions', locale)} className="inline-flex min-h-[44px] items-center font-bold">{ui.allPages} →</Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {childrenOf('solutions').slice(0, 6).map((k) => <li key={k} className="flex"><RouteCard routeKey={k} locale={locale} /></li>)}
        </ul>
      </section>

      <section className="wrap pt-24" aria-labelledby="uc-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="uc-title" className="h2 max-w-2xl">{getPage(locale, 'useCases').h1}</h2>
          <Link href={pathFor('useCases', locale)} className="inline-flex min-h-[44px] items-center font-bold">{getPage(locale, 'useCases').label} →</Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {childrenOf('useCases').slice(0, 6).map((k) => <li key={k} className="flex"><RouteCard routeKey={k} locale={locale} /></li>)}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-bold">{getPage(locale, 'industries').label}:</span>
          {childrenOf('industries').map((k) => (
            <Link key={k} href={pathFor(k, locale)} className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-white px-4 font-semibold text-ink no-underline hover:border-primary">
              {getPage(locale, k).label}
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap pt-24">
        <div className="grid items-center gap-10 rounded-panel bg-ink p-8 text-white md:p-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-sky">{getPage(locale, 'roiCalculator').label}</p>
            <h2 className="h2">{getPage(locale, 'roiCalculator').h1}</h2>
            <p className="text-lg text-muted-lighter">{getPage(locale, 'roiCalculator').lead}</p>
            <Link href={pathFor('roiCalculator', locale)} className="btn-sky self-start">{ui.ctaRoi}</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <RouteCard routeKey="caseFood" locale={locale} />
            <RouteCard routeKey="tplWorkInstruction" locale={locale} />
          </div>
        </div>
      </section>

      <section className="wrap pt-24" aria-labelledby="tpl-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="tpl-title" className="h2 max-w-2xl">{getPage(locale, 'templates').label}</h2>
          <Link href={pathFor('templates', locale)} className="inline-flex min-h-[44px] items-center font-bold">{ui.allPages} →</Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {['tplWorkInstruction', 'tplSmed', 'tplMaintenance'].map((k) => <li key={k} className="flex"><RouteCard routeKey={k} locale={locale} /></li>)}
        </ul>
      </section>

      <div className="wrap max-w-prose pt-24 lg:mx-auto"><Faq items={getPage(locale, 'faq').faq} locale={locale} /></div>
      <Cta locale={locale} />
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
      <Cta locale={locale} />
    </>
  );
}

function ResourcesHubTemplate({ routeKey, locale }: Props) {
  const ui = getUi(locale);
  const page = getPage(locale, routeKey);
  const groups: RouteKey[] = ['templates', 'blog', 'glossary', 'compare', 'whitepapers'];
  const items = groups.flatMap((g) =>
    childrenOf(g).map((k) => ({ href: pathFor(k, locale), title: getPage(locale, k).label, group: getPage(locale, g).label, text: getPage(locale, k).cardText ?? '' })),
  );
  return (
    <>
      <PageHero routeKey={routeKey} locale={locale} />
      <div className="wrap flex flex-col gap-12">
        <AnswerBox text={page.answer} locale={locale} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {['templates', 'roiCalculator', 'blog', 'glossary', 'compare', 'whitepapers', 'events', 'videos'].map((k) => (
            <li key={k} className="flex"><RouteCard routeKey={k} locale={locale} as="h2" /></li>
          ))}
        </ul>
        <section aria-labelledby="search-title" className="flex flex-col gap-5">
          <h2 id="search-title" className="h2">{ui.searchLabel}</h2>
          <ResourceSearch items={items} label={ui.searchLabel} placeholder={ui.searchPlaceholder} />
        </section>
      </div>
      <Cta locale={locale} />
    </>
  );
}

function GlossaryHubTemplate({ routeKey, locale }: Props) {
  const ui = getUi(locale);
  const terms = childrenOf(routeKey)
    .map((k) => ({ k, label: getPage(locale, k).label }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));
  const letters = [...new Set(terms.map((t) => t.label[0].toUpperCase()))];
  return (
    <>
      <PageHero routeKey={routeKey} locale={locale} />
      <div className="wrap flex flex-col gap-10">
        <nav aria-label={ui.az} className="flex flex-wrap gap-2">
          {letters.map((c) => <a key={c} href={`#letter-${c}`} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white font-bold no-underline">{c}</a>)}
        </nav>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {letters.map((c) => (
            <section key={c} id={`letter-${c}`} className="scroll-mt-24">
              <h2 className="h3 mb-3 text-primary">{c}</h2>
              <ul className="flex flex-col gap-1">
                {terms.filter((t) => t.label[0].toUpperCase() === c).map((t) => (
                  <li key={t.k}><Link href={pathFor(t.k, locale)} className="inline-flex min-h-[40px] items-center text-lg font-semibold">{t.label}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <Cta locale={locale} />
    </>
  );
}

function SolutionTemplate(p: Props) {
  return (
    <>
      <HeroWithImage {...p} />
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
            <LeadForm locale={p.locale} ui={ui} kind="template" resource={p.routeKey} />
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

function RoiTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <PageHero {...p} />
      <div className="wrap flex flex-col gap-12">
        <AnswerBox text={page.answer} locale={p.locale} />
        <RoiCalculator locale={p.locale} leadUi={getUi(p.locale)} />
        <div className="grid gap-12 lg:grid-cols-2">
          <Sections sections={page.sections} locale={p.locale} />
          <RoiAssumptions locale={p.locale} />
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

const formKind: Partial<Record<PageType, LeadKind>> = { pilot: 'pilot', demo: 'demo', contact: 'contact' };

function FormTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  const kind: LeadKind = p.routeKey === 'partnerBecome' ? 'partner' : formKind[routes[p.routeKey].type] ?? 'contact';
  return (
    <>
      <PageHero {...p} />
      <div className="wrap grid gap-12 pb-24 lg:grid-cols-2">
        <div className="card p-6 md:p-8">
          <LeadForm locale={p.locale} ui={getUi(p.locale)} kind={kind} />
        </div>
        <div className="flex flex-col gap-10">
          <Sections sections={page.sections} locale={p.locale} />
          {p.routeKey === 'pilot' && <RouteCard routeKey="fitCheck" locale={p.locale} />}
          {(p.routeKey === 'contact' || p.routeKey === 'demo') && (
            <address className="card flex flex-col gap-1 p-6 not-italic">
              <strong>ActARion</strong>
              <span>Benelux · DACH</span>
              <a href="mailto:hello@actarion.com">hello@actarion.com</a>
              <span className="text-sm text-muted">[Address and phone number to be supplied]</span>
            </address>
          )}
        </div>
      </div>
    </>
  );
}

function FitCheckTemplate(p: Props) {
  return (
    <>
      <PageHero {...p} />
      <div className="wrap max-w-prose pb-24 lg:mx-auto">
        <FitCheck locale={p.locale} pilotHref={pathFor('pilot', p.locale)} demoHref={pathFor('demo', p.locale)} />
      </div>
    </>
  );
}

function TeamTemplate(p: Props) {
  const people = ['Jack Kessels', 'Mark Dercksen', 'Ortwin Verreck'];
  return (
    <>
      <PageHero {...p} />
      <div className="wrap pb-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((n) => (
            <li key={n} className="card flex flex-col gap-3 p-6">
              <ImageSlot alt={n} ratio="1/1" label={getUi(p.locale).imagePending} />
              <h2 className="h3">{n}</h2>
              <p className="text-muted">[Role and short bio to be supplied]</p>
            </li>
          ))}
        </ul>
      </div>
      <Cta locale={p.locale} />
    </>
  );
}

function FaqTemplate(p: Props) {
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <PageHero {...p} />
      <div className="wrap flex max-w-prose flex-col gap-10 pb-12 lg:mx-auto">
        <Faq items={page.faq} locale={p.locale} />
        <Updated iso={page.updated} locale={p.locale} />
      </div>
      <Cta locale={p.locale} />
    </>
  );
}

const sitemapGroups: RouteKey[] = ['solutions', 'platform', 'useCases', 'industries', 'hardware', 'resources', 'templates', 'glossary', 'blog', 'compare', 'customers', 'partners', 'company'];

function SitemapTemplate(p: Props) {
  const { locale } = p;
  const grouped = new Set<RouteKey>();
  const descend = (k: RouteKey): RouteKey[] => [k, ...childrenOf(k).flatMap((c) => (sitemapGroups.includes(c) ? [] : descend(c)))];
  const top = routeKeys.filter((k) => routes[k].parent === 'home' && !sitemapGroups.includes(k));
  return (
    <>
      <PageHero {...p} />
      <div className="wrap grid items-start gap-5 pb-24 md:grid-cols-2 lg:grid-cols-3">
        <nav aria-label={getUi(locale).allPages} className="card flex flex-col gap-1 p-6">
          <h2 className="h3 mb-2 border-b border-line pb-3">{getUi(locale).breadcrumbHome}</h2>
          {['home', ...top].map((k) => (
            <Link key={k} href={pathFor(k, locale)} className="flex min-h-[36px] items-center font-semibold">{getPage(locale, k).label}</Link>
          ))}
        </nav>
        {sitemapGroups.map((g) => {
          const keys = descend(g);
          keys.forEach((k) => grouped.add(k));
          return (
            <nav key={g} aria-label={getPage(locale, g).label} className="card flex flex-col gap-1 p-6">
              <h2 className="h3 mb-2 border-b border-line pb-3">{getPage(locale, g).label}</h2>
              {keys.map((k) => (
                <Link key={k} href={pathFor(k, locale)} className={`flex min-h-[36px] items-center ${k === g ? 'font-bold' : 'pl-4'}`}>
                  {getPage(locale, k).label}
                </Link>
              ))}
            </nav>
          );
        })}
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
  home: HomeDesign,
  hub: HubDesign,
  resourcesHub: ResourcesDesign,
  glossaryHub: HubDesign,
  solution: UseCaseDesign,
  platform: UseCaseDesign,
  useCase: UseCaseDesign,
  industry: UseCaseDesign,
  hardware: UseCaseDesign,
  template: ArticleDesign,
  guide: ArticleDesign,
  comparison: ArticleDesign,
  glossaryTerm: ArticleDesign,
  caseStudy: ArticleDesign,
  partner: PartnerDetailDesign,
  whitepaper: WhitepaperDesign,
  report: ArticleDesign,
  media: ArticleDesign,
  roi: RoiDesign,
  roiReport: RoiReportDesign,
  pilot: PilotDesign,
  fitCheck: FitCheckDesign,
  demo: AanvraagDesign,
  contact: AanvraagDesign,
  company: ArticleDesign,
  team: TeamDesign,
  careers: ArticleDesign,
  faq: ArticleDesign,
  legal: ArticleDesign,
  sitemap: SitemapTemplate,
};

/** Page-specific templates that override the type mapping. */
const byKey: Record<string, (p: Props) => React.ReactElement> = {
  whitepapers: WhitepaperDesign,
  partners: PartnersDesign,
  partnerBecome: AanvraagDesign,
  company: OverDesign,
  vision: VisionDesign,
};

/** Page types that use the checkout-style 'focus' header (forms). */
const FOCUS: PageType[] = ['demo', 'contact'];

export function RenderPage(p: Props) {
  const Template = byKey[p.routeKey] ?? templates[routes[p.routeKey].type];
  const page = getPage(p.locale, p.routeKey);
  return (
    <>
      <Header locale={p.locale} routeKey={p.routeKey} variant={FOCUS.includes(routes[p.routeKey].type) ? 'focus' : 'full'} />
      <main id="main">
        <JsonLd data={schemaFor(p)} />
        {p.routeKey !== 'home' && <Breadcrumbs routeKey={p.routeKey} locale={p.locale} />}
        <Template {...p} />
      </main>
    </>
  );
}

