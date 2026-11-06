import Link from 'next/link';
import { Faq, Sections } from '@/components/Blocks';
import { Cta } from '@/components/Cta';
import { partnersCopy, type PartnerItem, type PartnersCopy } from '@/content/design/partners';
import { getPage } from '@/lib/i18n';
import { networkCopy, networkPartners, type Region } from '@/content/design/network';
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
        <div className="flex flex-wrap gap-2">
          <span className="self-start rounded-full bg-sky px-3 py-1.5 font-mono text-[13px]">{p.soort}</span>
          {MAIN_REGION[p.id] && <RegionChip region={MAIN_REGION[p.id]} locale={locale} />}
        </div>
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
      <NetworkSection locale={locale} asPageTitle />

      <HardwareNote t={t} locale={locale} />

      <div className="h-[72px]" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}

const MAIN_REGION: Record<string, Region> = { deepsight: 'Benelux / DACH' };

function RegionChip({ region, locale }: { region: Region; locale: Locale }) {
  return <span className="self-start rounded-full border border-line bg-canvas px-3 py-1.5 font-mono text-[13px]">{networkCopy[locale].regions[region]}</span>;
}

/** Short description of the main partner(s), in the same style as the network partners. */
const MAIN_TEXT: Record<string, Record<Locale, string>> = {
  deepsight: {
    en: 'AR-first connected worker platform: step-by-step instructions, training scenarios and remote support on tablets, smartphones and smart glasses.',
    nl: 'AR-first connected worker platform: stap-voor-stapinstructies, trainingsscenario’s en remote support op tablets, smartphones en smart glasses.',
    de: 'AR-first Plattform für Werkerassistenz: Schritt-für-Schritt-Anweisungen, Trainingsszenarien und Remote-Support auf Tablets, Smartphones und Datenbrillen.',
  },
};

interface Card {
  id: string;
  naam: string;
  url: string;
  region: Region;
  text: string;
  logo: { src: string; w: number; h: number };
  soort?: string;
  detail?: { href: string; label: string };
}

function NetworkCard({ n, locale, H = 'h3' }: { n: Card; locale: Locale; H?: 'h2' | 'h3' }) {
  const c = networkCopy[locale];
  return (
    <li id={n.id} className="flex scroll-mt-24 flex-col gap-3 rounded-[22px] border border-line bg-white p-5">
      <a href={n.url} target="_blank" rel="nofollow noopener" aria-label={`${n.naam} – ${c.visit}`} className="flex h-[88px] items-center justify-center rounded-2xl bg-canvas p-3 hover:outline hover:outline-2 hover:outline-primary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={n.logo.src} width={n.logo.w} height={n.logo.h} alt={`${n.naam} logo`} loading="lazy" className="h-auto max-h-[64px] w-auto max-w-[90%]" />
      </a>
      <div className="flex flex-wrap gap-2">
        {n.soort && <span className="self-start rounded-full bg-sky px-3 py-1.5 font-mono text-[13px]">{n.soort}</span>}
        <RegionChip region={n.region} locale={locale} />
      </div>
      <H className="m-0 text-lg font-bold leading-tight">{n.naam}</H>
      <p className="m-0 flex-grow text-[15px] leading-[1.45] text-muted">{n.text}</p>
      <div className="flex flex-wrap items-center gap-x-4">
        <a href={n.url} target="_blank" rel="nofollow noopener" className="inline-flex min-h-[44px] items-center gap-1 font-bold">{c.visit} ↗<span className="sr-only">{partnersCopy[locale].newWindow}</span></a>
        {n.detail && <Link href={n.detail.href} className="inline-flex min-h-[44px] items-center font-bold">{n.detail.label} →</Link>}
      </div>
    </li>
  );
}

function NetworkSection({ locale, asPageTitle = false }: { locale: Locale; asPageTitle?: boolean }) {
  const c = networkCopy[locale];
  const t = partnersCopy[locale];
  const order: Region[] = ['Benelux', 'Benelux / DACH', 'DACH', 'Global'];
  const main: Card[] = t.partners.map((p) => ({
    id: p.id,
    naam: p.naam,
    url: p.url,
    region: MAIN_REGION[p.id],
    text: MAIN_TEXT[p.id][locale],
    logo: LOGOS[p.naam],
    soort: p.soort,
    detail: { href: pathFor(p.routeKey, locale), label: t.more.replace('{naam}', p.naam) },
  }));
  const network: Card[] = [...networkPartners]
    .sort((a, b) => order.indexOf(a.region) - order.indexOf(b.region))
    .map((n) => ({ id: n.id, naam: n.naam, url: n.url, region: n.region, text: n.text[locale], logo: { src: `/img/partners/netwerk/${n.logo}.webp`, w: n.w, h: n.h } }));
  return (
    <section id="network" className="mx-auto flex max-w-site scroll-mt-6 flex-col gap-6 px-6 pt-16">
      <div className="flex max-w-[760px] flex-col gap-3">
        <p className={eyebrow}>{asPageTitle ? partnersCopy[locale].eyebrow : c.eyebrow}</p>
        {asPageTitle ? (
          <h1 className="font-display text-[clamp(42px,5vw,70px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{c.title}</h1>
        ) : (
          <h2 className="font-display text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{c.title}</h2>
        )}
        <p className="text-lg leading-normal text-muted">{c.lead}</p>
      </div>
      <ul className="m-0 grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
        {[...main, ...network].map((n) => <NetworkCard key={n.id} n={n} locale={locale} H={asPageTitle ? 'h2' : 'h3'} />)}
      </ul>
    </section>
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

/** Partner detail page: partnerDeepsight. */
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

      {others.length > 0 && <section className="mx-auto flex max-w-site flex-col gap-6 px-6 pt-20">
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
      </section>}

      <HardwareNote t={t} locale={locale} />

      <div className="h-[72px]" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}
