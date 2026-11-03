import Link from 'next/link';
import { Faq, Sections } from '@/components/Blocks';
import { Cta } from '@/components/Cta';
import { partnersCopy, type PartnerItem, type PartnersCopy } from '@/content/design/partners';
import { getPage } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';

const eyebrow = 'text-sm font-bold uppercase tracking-[0.08em] text-primary';

export function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="mt-px flex-none">
      <circle cx="10" cy="10" r="9" fill="#A9DBF5" />
      <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#10253A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExtIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#10253A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2.5h4.5V7M13.5 2.5L7 9M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3" />
    </svg>
  );
}

const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  DeepSight: { src: '/img/partners/deepsight.svg', w: 874, h: 186 },
  Potentify: { src: '/img/partners/potentify.svg', w: 412, h: 100 },
  'Simply Change': { src: '/img/partners/simplychange.png', w: 407, h: 85 },
};

/** Partner logo, linked to the partner's own website (opens in a new tab). */
export function PartnerLogoBox({ naam, url, className = 'h-[120px]' }: { naam: string; url?: string; className?: string }) {
  const logo = LOGOS[naam];
  const inner = logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo.src} width={logo.w} height={logo.h} alt={`${naam} logo`} loading="lazy" className="h-auto max-h-[56px] w-auto max-w-[85%]" />
  ) : (
    <span className="font-display text-[26px] font-extrabold">{naam}</span>
  );
  const cls = `box-border flex items-center justify-center gap-2.5 rounded-[20px] border border-line bg-white p-4 ${className}`;
  return url ? (
    <a href={url} target="_blank" rel="noopener" className={`${cls} no-underline hover:border-primary`} aria-label={`${naam} – website (opens in a new tab)`}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function PartnerCard({ p, t, locale, H = 'h2', detail = true }: { p: PartnerItem; t: PartnersCopy; locale: Locale; H?: 'h2' | 'h3'; detail?: boolean }) {
  return (
    <article id={p.id} className="flex scroll-mt-24 flex-wrap items-start gap-9 rounded-[28px] border border-line bg-white p-[clamp(22px,3vw,36px)]">
      <div className="flex max-w-full flex-[0_0_260px] flex-col gap-4">
        <PartnerLogoBox naam={p.naam} url={p.url} />
        <span className="self-start rounded-full bg-sky px-3 py-1.5 font-mono text-[13px]">{p.soort}</span>
      </div>
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
        <H className="font-display text-[34px] font-extrabold tracking-[-0.02em]">{p.naam}</H>
        <p className="text-lg leading-normal">{p.intro}</p>
        <p className="mt-1 font-bold">{t.brings.replace('{naam}', p.naam)}</p>
        <ul className="flex flex-col gap-2">
          {p.punten.map((x) => <li key={x} className="flex items-start gap-2.5 leading-[1.45] text-muted"><CheckIcon />{x}</li>)}
        </ul>
        <div className="mt-1 flex flex-wrap items-center gap-3 border-t border-line pt-4">
          {detail && (
            <Link href={pathFor(p.routeKey, locale)} className="inline-flex h-[52px] items-center rounded-full bg-ink px-[22px] font-bold text-white no-underline hover:bg-ink-2">
              {t.more.replace('{naam}', p.naam)}
            </Link>
          )}
          <a href={p.url} target="_blank" rel="nofollow noopener" className="inline-flex h-[52px] items-center gap-2 rounded-full border-2 border-ink px-[22px] font-bold text-ink no-underline hover:bg-canvas">
            {p.domein} <ExtIcon /><span className="sr-only">{t.newWindow}</span>
          </a>
          <Link href={pathFor(p.ctaKey, locale)} className="inline-flex h-[52px] items-center px-2 font-bold">{p.ctaLabel} →</Link>
        </div>
      </div>
    </article>
  );
}

export function PartnersDesign({ routeKey: _routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = partnersCopy[locale];
  return (
    <>
      <section className="mx-auto flex max-w-site flex-wrap items-end gap-12 px-6 pt-16">
        <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-5">
          <p className={eyebrow}>{t.eyebrow}</p>
          <h1 className="font-display text-[clamp(42px,5vw,70px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{t.h1}</h1>
          <p className="max-w-[760px] text-xl leading-normal">{t.lead}</p>
        </div>
        <Link href={pathFor('demo', locale)} className="inline-flex h-[58px] flex-none items-center rounded-full bg-primary px-[30px] text-[17px] font-bold text-white no-underline hover:bg-primary-hover">{t.cta}</Link>
      </section>

      <section className="mx-auto max-w-site px-6 pt-14">
        <div role="table" aria-label={t.tableLabel} className="rounded-[28px] bg-ink px-7 py-3 text-white">
          <div role="row" className="grid grid-cols-3 gap-5 border-b border-ink-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-sky max-md:hidden">
            {t.head.map((h) => <span key={h} role="columnheader">{h}</span>)}
          </div>
          {t.rows.map((r, i) => (
            <div key={r[0]} role="row" className={`grid grid-cols-3 gap-5 py-4 leading-[1.45] max-md:grid-cols-1 max-md:gap-1 ${i < t.rows.length - 1 ? 'border-b border-ink-3' : ''}`}>
              <span role="rowheader" className="font-bold">{r[0]}</span>
              <span role="cell" className="text-muted-lighter">{r[1]}</span>
              <span role="cell" className="text-muted-lighter"><span className="text-sky md:hidden">{t.head[2]}: </span>{r[2]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-site flex-col gap-6 px-6 pt-14">
        {t.partners.map((p) => <PartnerCard key={p.id} p={p} t={t} locale={locale} />)}
      </section>

      <HardwareNote t={t} locale={locale} />

      <div className="h-[72px]" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}

function HardwareNote({ t, locale }: { t: PartnersCopy; locale: Locale }) {
  return (
    <section className="mx-auto max-w-site px-6 pt-14">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-dashed border-[#B8C6D3] px-7 py-6">
        <div className="flex max-w-[720px] flex-col gap-1">
          <h2 className="text-lg font-bold">{t.hwTitle}</h2>
          <p className="leading-[1.45] text-muted">{t.hwText}</p>
        </div>
        <Link href={pathFor('hardware', locale)} className="inline-flex min-h-[44px] items-center font-bold">{t.hwLink}</Link>
      </div>
    </section>
  );
}

/** Partner detail pages: partnerDeepsight, partnerPotentify, partnerSimplyChange. */
export function PartnerDetailDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = partnersCopy[locale];
  const p = t.partners.find((x) => x.routeKey === routeKey) ?? t.partners[0];
  const page = getPage(locale, routeKey);
  const others = t.partners.filter((x) => x.id !== p.id);
  return (
    <>
      <section className="mx-auto flex max-w-site flex-wrap items-end gap-12 px-6 pt-16">
        <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-5">
          <PartnerLogoBox naam={p.naam} url={p.url} className="h-[96px] w-[280px] max-w-full" />
          <p className={eyebrow}>{page.eyebrow ?? p.soort}</p>
          <h1 className="font-display text-[clamp(42px,5vw,70px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{page.h1}</h1>
          <p className="max-w-[760px] text-xl leading-normal">{page.lead}</p>
        </div>
        <Link href={pathFor('demo', locale)} className="inline-flex h-[58px] flex-none items-center rounded-full bg-primary px-[30px] text-[17px] font-bold text-white no-underline hover:bg-primary-hover">{t.cta}</Link>
      </section>

      {page.answer && (
        <section className="mx-auto max-w-site px-6 pt-10">
          <p className="max-w-[860px] rounded-[20px] bg-tint px-6 py-5 text-lg leading-normal">{page.answer}</p>
        </section>
      )}

      <section className="mx-auto max-w-site px-6 pt-14">
        <PartnerCard p={p} t={t} locale={locale} detail={false} />
      </section>

      {page.sections?.length ? (
        <div className="mx-auto flex max-w-site flex-col gap-16 px-6 pt-20">
          <Sections sections={page.sections} locale={locale} />
        </div>
      ) : null}

      {page.faq?.length ? (
        <div className="mx-auto max-w-site px-6 pt-20">
          <Faq items={page.faq} locale={locale} />
        </div>
      ) : null}

      <section className="mx-auto flex max-w-site flex-col gap-6 px-6 pt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-[clamp(30px,3.6vw,40px)] font-extrabold tracking-[-0.03em]">{t.detailOther}</h2>
          <Link href={pathFor('partners', locale)} className="inline-flex min-h-[44px] items-center font-bold">{t.detailBack}</Link>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5">
          {others.map((o) => (
            <li key={o.id} className="flex flex-col gap-3.5 rounded-[28px] border border-line bg-white p-7">
              <PartnerLogoBox naam={o.naam} url={o.url} className="h-24" />
              <span className="self-start rounded-full bg-sky px-3 py-1.5 font-mono text-[13px]">{o.soort}</span>
              <h3 className="font-display text-2xl font-extrabold">{o.naam}</h3>
              <p className="leading-[1.45] text-muted">{o.punten[0]}</p>
              <Link href={pathFor(o.routeKey, locale)} className="mt-auto inline-flex min-h-[44px] items-center font-bold">{t.more.replace('{naam}', o.naam)} →</Link>
            </li>
          ))}
        </ul>
      </section>

      <HardwareNote t={t} locale={locale} />

      <div className="h-[72px]" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}
