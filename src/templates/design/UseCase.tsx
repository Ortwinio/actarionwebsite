import Image from 'next/image';
import { Md } from '@/components/Md';
import Link from 'next/link';
import { Cta } from '@/components/Cta';
import { ImageSlot } from '@/components/Blocks';
import { ArticleFaq } from '@/components/design/ArticleFaq';
import { getPage, getUi, type Locale } from '@/lib/i18n';
import { childrenOf, pathFor, routes } from '@/lib/routes';
import type { Section } from '@/content/types';
import { changeoverCopy, imageSize, useCaseImages, useCaseUi } from '@/content/design/useCase';
import { typeLabel } from '@/content/design/resources';
import { ArticleSection } from './shared';

type StepsSection = Extract<Section, { kind: 'steps' }>;
type FeaturesSection = Extract<Section, { kind: 'features' }>;

const eyebrow = 'm-0 text-sm font-bold uppercase tracking-[0.08em] text-primary';
const h2Big = 'm-0 font-display text-[clamp(34px,3.6vw,50px)] font-extrabold leading-[1.04] tracking-[-0.03em]';

function imageFor(key: string, locale: Locale = 'en'): string | undefined {
  return getPage(locale, key).image ?? useCaseImages[key] ?? (['useCase', 'industry', 'solution', 'platform', 'hardware'].includes(routes[key]?.type) ? '/img/hero-tablet-ar.webp' : undefined);
}

function Hero({ eyebrowText, h1, lead, demo, fit, img, alt, locale }: { eyebrowText: string; h1: string; lead: string; demo: string; fit: string; img?: string; alt: string; locale: Locale }) {
  const [w, h] = img ? imageSize[img] ?? [1200, 800] : [1200, 800];
  return (
    <section className="mx-auto flex max-w-site flex-wrap items-center gap-[52px] px-6 pb-[88px] pt-16">
      <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
        <p className={eyebrow}>{eyebrowText}</p>
        <h1 className="m-0 font-display text-[clamp(44px,5vw,74px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{h1}</h1>
        <p className="m-0 text-xl leading-[1.5] text-muted">{lead}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={pathFor('demo', locale)} className="inline-flex h-[58px] items-center rounded-full bg-primary px-7 text-[17px] font-bold text-white no-underline hover:bg-primary-hover hover:text-white">{demo}</Link>
          <Link href={pathFor('fitCheck', locale)} className="box-border inline-flex h-[58px] items-center rounded-full border-2 border-ink px-[26px] text-[17px] font-bold text-ink no-underline hover:bg-ink hover:text-white">{fit}</Link>
        </div>
      </div>
      <div className="min-w-0 flex-[1_1_520px] rounded-[32px] bg-sky p-[18px]">
        {img ? (
          <Image src={img} width={w} height={h} alt={alt} priority sizes="(min-width: 1200px) 560px, 100vw" className="block h-auto w-full rounded-[20px]" />
        ) : (
          <ImageSlot alt={alt} ratio="3/2" label={getUi(locale).imagePending} />
        )}
      </div>
    </section>
  );
}

function Pains({ title, items }: { title: string; items: { title: string; text: string }[] }) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-site flex-col gap-7 px-6 py-16">
        <h2 className="m-0 font-display text-[40px] font-extrabold tracking-[-0.03em]">{title}</h2>
        <div className="grid gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {items.map((it, i) => (
            <div key={it.title} className={`${i === 0 ? 'pr-7' : i === items.length - 1 ? 'pl-7' : 'px-7'} ${i < items.length - 1 ? 'border-r border-ink-3' : ''}`}>
              <span className="font-mono text-[15px] text-sky">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mb-2 mt-[10px] text-[21px] font-bold">{it.title}</h3>
              <p className="m-0 leading-[1.5] text-muted-light"><Md text={it.text} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps({ eyebrowText, title, steps }: { eyebrowText: string; title: string; steps: { title: string; text: string }[] }) {
  return (
    <section className="mx-auto flex max-w-site flex-col gap-8 px-6 pt-[100px]">
      <div className="flex max-w-[720px] flex-col gap-[14px]">
        <p className={eyebrow}>{eyebrowText}</p>
        <h2 className={h2Big}>{title}</h2>
      </div>
      <ol className="m-0 grid list-none gap-5 p-0 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        {steps.map((st, i) => {
          const dark = i === steps.length - 1;
          return (
            <li key={st.title} className={`flex flex-col gap-3 rounded-3xl p-7 ${dark ? 'bg-ink text-white' : 'border border-line bg-white'}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky font-mono text-ink">{i + 1}</span>
              <h3 className="m-0 font-display text-[22px] font-bold">{st.title}</h3>
              <p className={`m-0 leading-[1.5] ${dark ? 'text-muted-lighter' : 'text-muted'}`}><Md text={st.text} /></p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function PilotCard({ eyebrowText, title, link, tiles, locale }: { eyebrowText: string; title: string; link: string; tiles: { label: string; value: string; mono?: boolean }[]; locale: Locale }) {
  return (
    <section className="mx-auto max-w-site px-6 pt-[100px]">
      <div className="flex flex-wrap gap-10 rounded-[28px] border border-line bg-white p-10">
        <div className="flex flex-[1_1_320px] flex-col gap-[14px]">
          <p className={eyebrow}>{eyebrowText}</p>
          <h2 className="m-0 font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em]">{title}</h2>
          <Link href={pathFor('pilot', locale)} className="font-bold">{link}</Link>
        </div>
        <dl className="m-0 grid flex-[2_1_520px] gap-3 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {tiles.map((t, i) => (
            <div key={t.label} className={`rounded-[18px] p-5 ${i === 2 ? 'bg-sky' : 'bg-tint'}`}>
              <dt className={`text-[13px] font-bold uppercase tracking-[0.06em] ${i === 2 ? 'text-ink' : 'text-muted'}`}>{t.label}</dt>
              <dd className={`m-0 mt-[6px] text-lg font-bold ${t.mono ? 'font-mono font-medium' : ''}`}>{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Others({ title, keys, labels, locale }: { title: string; keys: string[]; labels?: Record<string, string>; locale: Locale }) {
  if (!keys.length) return null;
  return (
    <section className="mx-auto flex max-w-site flex-col gap-7 px-6 pt-[100px]">
      <h2 className="m-0 font-display text-[38px] font-extrabold tracking-[-0.03em]">{title}</h2>
      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {keys.map((k) => {
          const img = imageFor(k, locale) ?? '/img/hero-tablet-ar.webp';
          const [w, h] = imageSize[img] ?? [1200, 800];
          return (
            <Link key={k} href={pathFor(k, locale)} className="flex items-center gap-4 rounded-[20px] border border-line bg-white p-[14px] text-ink no-underline hover:border-primary hover:text-ink">
              <Image src={img} width={w} height={h} alt="" loading="lazy" sizes="110px" className="h-20 w-[110px] flex-none rounded-xl object-cover" />
              <span className="text-lg font-bold">{labels?.[k] ?? getPage(locale, k).label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function siblings(routeKey: string): string[] {
  const parent = routes[routeKey].parent;
  const own = childrenOf(routeKey);
  const sib = parent ? childrenOf(parent).filter((k) => k !== routeKey && routes[k].type === routes[routeKey].type) : [];
  return (sib.length ? sib : own).slice(0, 3);
}

export function UseCaseDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  if (routeKey === 'ucChangeover') {
    const c = changeoverCopy[locale];
    const page = getPage(locale, routeKey);
    return (
      <>
        <Hero eyebrowText={c.eyebrow} h1={c.h1} lead={c.lead} demo={c.ctaDemo} fit={c.ctaFit} img={useCaseImages.ucChangeover} alt={c.imageAlt} locale={locale} />
        <Pains title={c.painTitle} items={c.pains} />
        <Steps eyebrowText={c.howEyebrow} title={c.howTitle} steps={c.steps} />
        <PilotCard eyebrowText={c.pilotEyebrow} title={c.pilotTitle} link={c.pilotLink} tiles={c.pilotTiles} locale={locale} />
        {page.faq?.length ? <FaqBlock locale={locale} items={page.faq} /> : null}
        <Others title={c.others} keys={['ucOnboarding', 'ucMaintenance', 'ucRemote'].filter((k) => routes[k])} labels={c.othersLabels} locale={locale} />
        <div className="h-20" />
        <Cta locale={locale} heading={c.ctaHeading} />
      </>
    );
  }

  const page = getPage(locale, routeKey);
  const ui = useCaseUi[locale];
  const type = routes[routeKey].type;
  const sections = page.sections ?? [];
  const pains = sections.find((s): s is FeaturesSection => s.kind === 'features');
  const steps = sections.find((s): s is StepsSection => s.kind === 'steps');
  const rest = sections.filter((s) => s !== pains && s !== steps);
  const tiles = ui.pilotTiles.map((t, i) => (i === 2 && page.kpi ? { label: ui.kpiLabel, value: page.kpi } : t));
  const others = page.related?.length ? page.related.filter((k) => routes[k]).slice(0, 6) : siblings(routeKey);
  const img = imageFor(routeKey, locale);

  return (
    <>
      <Hero
        eyebrowText={page.eyebrow ?? typeLabel(type, locale)}
        h1={page.h1}
        lead={page.lead}
        demo={ui.ctaDemo}
        fit={ui.ctaFit}
        img={img}
        alt={page.heroImage ?? page.h1}
        locale={locale}
      />
      {pains ? (
        <Pains title={pains.h2} items={pains.items} />
      ) : page.answer ? (
        <section className="bg-ink text-white">
          <div className="mx-auto flex max-w-site flex-col gap-4 px-6 py-16">
            <h2 className="m-0 font-display text-[40px] font-extrabold tracking-[-0.03em]">{getUi(locale).answerLabel}</h2>
            <p className="m-0 max-w-[820px] text-xl leading-[1.5] text-muted-lighter">{page.answer}</p>
          </div>
        </section>
      ) : null}
      {steps && <Steps eyebrowText={ui.howEyebrow} title={steps.h2} steps={steps.steps} />}
      {(rest.length > 0 || (pains && page.answer)) && (
        <div className="mx-auto flex max-w-site flex-col gap-12 px-6 pt-[100px]">
          {pains && page.answer && (
            <section aria-labelledby="uc-answer" className="flex max-w-[760px] flex-col gap-2 rounded-[22px] border-2 border-ink bg-white px-[26px] py-6">
              <h2 id="uc-answer" className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">{getUi(locale).answerLabel}</h2>
              <p className="m-0 text-[19px] leading-[1.55]">{page.answer}</p>
            </section>
          )}
          {rest.map((s, i) => (
            <div key={i} className="max-w-[760px]"><ArticleSection s={s} locale={locale} /></div>
          ))}
        </div>
      )}
      <PilotCard eyebrowText={ui.pilotEyebrow} title={ui.pilotTitle} link={ui.pilotLink} tiles={tiles} locale={locale} />
      {page.faq?.length ? <FaqBlock locale={locale} items={page.faq} /> : null}
      <Others title={type === 'useCase' && !page.related?.length ? ui.others : ui.othersFallback} keys={others} locale={locale} />
      <div className="h-20" />
      <Cta locale={locale} heading={ui.ctaHeading} />
    </>
  );
}

function FaqBlock({ locale, items }: { locale: Locale; items: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="mx-auto flex max-w-site scroll-mt-6 flex-col gap-7 px-6 pt-[100px]">
      <h2 className="m-0 font-display text-[38px] font-extrabold tracking-[-0.03em]">{getUi(locale).faqTitle}</h2>
      <div className="max-w-[760px]"><ArticleFaq items={items} /></div>
    </section>
  );
}
