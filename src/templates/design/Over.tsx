import Image from 'next/image';
import Link from 'next/link';
import { Faq, Sections } from '@/components/Blocks';
import { Cta } from '@/components/Cta';
import { overCopy, type OverCopy } from '@/content/design/over';
import { partnersCopy } from '@/content/design/partners';
import { onsiteCopy } from '@/content/design/onsite';
import { OnsiteForm } from '@/components/design/OnsiteForm';
import { getPage } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';
import { CheckIcon } from './Partners';

const eyebrow = 'text-sm font-bold uppercase tracking-[0.08em] text-primary';
const h2Big = 'font-display text-[clamp(34px,4vw,54px)] font-extrabold leading-[1.02] tracking-[-0.03em]';
const h2Mid = 'font-display text-[clamp(32px,3.6vw,46px)] font-extrabold leading-[1.05] tracking-[-0.03em]';

function Hero({ eyebrowText, h1, lead, locale, t, meetHref }: { eyebrowText: string; h1: string; lead: string; locale: Locale; t: OverCopy; meetHref?: string }) {
  return (
    <section className="mx-auto flex max-w-site flex-wrap items-end gap-12 px-6 pt-16">
      <div className="flex min-w-0 flex-[2_1_600px] flex-col gap-[22px]">
        <p className={eyebrow}>{eyebrowText}</p>
        <h1 className="font-display text-[clamp(42px,5vw,72px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{h1}</h1>
        <p className="max-w-[760px] text-[21px] leading-normal">{lead}</p>
      </div>
      <div className="flex flex-[1_1_300px] flex-col gap-3">
        <Link href={pathFor('demo', locale)} className="flex h-[58px] items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white no-underline hover:bg-primary-hover">{t.cta}</Link>
        {meetHref && <a href={meetHref} className="flex h-[52px] items-center justify-center font-bold no-underline">{t.meetLink}</a>}
      </div>
    </section>
  );
}

function Facts({ t }: { t: OverCopy }) {
  return (
    <section className="mx-auto max-w-site px-6 pt-14">
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {t.facts.map((f) => (
          <div key={f.dt} className="rounded-[20px] border border-line bg-white p-5">
            <dt className="text-[13px] text-muted">{f.dt}</dt>
            <dd className="mt-1 text-lg font-bold">{f.dd}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function TeamCards({ t, locale, H = 'h3' }: { t: OverCopy; locale: Locale; H?: 'h2' | 'h3' }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
      {t.team.map((m) => (
        <article key={m.slug} id={m.slug} className="flex flex-col overflow-hidden rounded-[28px] border border-line bg-white">
          <div className="flex justify-center border-b border-line bg-canvas px-7 pt-7">
            <Image src={m.img} alt={m.alt} width={300} height={300} sizes="300px" loading="lazy" className="block aspect-square w-[300px] max-w-full object-cover" />
          </div>
          <div className="flex flex-grow flex-col gap-3.5 p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <H className="font-display text-[30px] font-extrabold tracking-[-0.02em]">{m.naam}</H>
                <p className="mt-0.5 font-semibold text-primary">{m.rol}</p>
              </div>
              <span className="rounded-full bg-sky px-3 py-1.5 font-mono text-[13px]">{m.regio}</span>
            </div>
            <p className="text-[17px] leading-normal text-muted">{m.bio}</p>
            <p className="font-bold">{t.helps.replace('{voornaam}', m.voornaam)}</p>
            <ul className="flex flex-col gap-2">
              {m.punten.map((x) => <li key={x} className="flex items-start gap-2.5 leading-[1.45]"><CheckIcon />{x}</li>)}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2.5 border-t border-line pt-[18px]">
              {m.cta && (
                <Link href={pathFor('demo', locale)} className="inline-flex h-[52px] items-center rounded-full bg-primary px-[22px] font-bold text-white no-underline hover:bg-primary-hover">
                  {t.talkTo.replace('{voornaam}', m.voornaam)}
                </Link>
              )}
              {/* LinkedIn URL still to be supplied (placeholder in design). */}
              <a href="#" aria-label={t.linkedinLabel.replace('{naam}', m.naam)} className="inline-flex h-[52px] items-center rounded-full border-2 border-ink px-[18px] font-bold text-ink no-underline">LinkedIn</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function HowWeWork({ t, locale }: { t: OverCopy; locale: Locale }) {
  return (
    <section className="mx-auto flex max-w-site flex-col gap-8 px-6 pt-[110px]">
      <div className="flex max-w-[760px] flex-col gap-3.5">
        <p className={eyebrow}>{t.howEyebrow}</p>
        <h2 className={h2Mid}>{t.howH2}</h2>
      </div>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {t.how.map((s, i) => {
          const dark = i === 3;
          return (
            <li key={s.n} className={`flex flex-col gap-2.5 rounded-[22px] p-[22px] ${dark ? 'bg-ink text-white' : 'border border-line bg-white'}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky font-mono text-ink">{s.n}</span>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className={`leading-[1.45] ${dark ? 'text-muted-light' : 'text-muted'}`}>{s.text}</p>
            </li>
          );
        })}
      </ol>
      <Link href={pathFor('pilot', locale)} className="inline-flex min-h-[44px] items-center self-start font-bold">{t.howLink}</Link>
    </section>
  );
}

function PartnersTeaser({ t, locale }: { t: OverCopy; locale: Locale }) {
  const names = partnersCopy[locale].partners.map((p) => p.naam);
  return (
    <section className="mx-auto max-w-site px-6 pt-[110px]">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-[28px] border border-line bg-white p-[clamp(22px,3vw,36px)]">
        <div className="flex flex-[1_1_360px] flex-col gap-2.5">
          <p className={eyebrow}>{t.partnersEyebrow}</p>
          <h2 className="font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em]">{t.partnersH2}</h2>
        </div>
        {/* Partner logo files not yet available: wordmarks stand in. */}
        <ul className="flex flex-wrap items-center gap-7">
          {names.map((n) => <li key={n} className="font-display text-[22px] font-extrabold">{n}</li>)}
        </ul>
        <Link href={pathFor('partners', locale)} className="inline-flex h-[52px] items-center rounded-full border-2 border-ink px-[22px] font-bold text-ink no-underline hover:bg-canvas">{t.partnersCta}</Link>
      </div>
    </section>
  );
}

function ImageNote({ t }: { t: OverCopy }) {
  return (
    <section className="mx-auto max-w-site px-6 pt-6">
      <p className="rounded-[20px] bg-tint px-6 py-5 text-[15px] leading-normal"><strong>{t.imageNoteStrong}</strong> {t.imageNote}</p>
    </section>
  );
}

/** About page (route key company). */
/** Visit on site: test AR work guide at the customer's site, request form to Mark and Jack. */
function OnsiteVisit({ locale }: { locale: Locale }) {
  const t = onsiteCopy[locale];
  return (
    <section id="visit" aria-labelledby="visit-h" className="mx-auto max-w-site scroll-mt-24 px-6 pb-24">
      <div className="flex flex-wrap gap-10 rounded-panel border border-line bg-white p-8 md:p-11">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex flex-none">
              <img src="/img/team/jack-kessels.webp" alt={t.altJack} width={72} height={72} loading="lazy" className="h-[72px] w-[72px] rounded-full border-[3px] border-sky bg-canvas object-cover" />
              <img src="/img/team/mark-dercksen.webp" alt={t.altMark} width={72} height={72} loading="lazy" className="-ml-4 h-[72px] w-[72px] rounded-full border-[3px] border-sky bg-canvas object-cover" />
            </span>
            <p className={eyebrow}>{t.eyebrow}</p>
          </div>
          <h2 id="visit-h" className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.06] tracking-[-0.03em]">{t.h}</h2>
          <p className="text-lg leading-normal">{t.lead}</p>
          <h3 className="mt-2 text-lg font-bold">{t.howTitle}</h3>
          <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
            {t.steps.map((x, i) => (
              <li key={x} className="flex items-start gap-3 leading-[1.45]">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sky font-mono text-sm font-bold">{i + 1}</span>
                <span>{x}</span>
              </li>
            ))}
          </ol>
          <h3 className="mt-2 text-lg font-bold">{t.feeTitle}</h3>
          <p className="leading-normal">{t.fee}</p>
          <p className="leading-normal text-muted">{t.noObligation}</p>
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 rounded-[24px] bg-canvas p-6">
          <h3 className="font-display text-2xl font-extrabold">{t.formTitle}</h3>
          <p className="text-muted">{t.formIntro}</p>
          <OnsiteForm locale={locale} t={t} />
        </div>
      </div>
    </section>
  );
}

export function OverDesign({ routeKey: _routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = overCopy[locale];
  return (
    <>
      <Hero eyebrowText={t.eyebrow} h1={t.h1} lead={t.lead} locale={locale} t={t} meetHref="#management" />
      <Facts t={t} />
      <section id="management" className="mx-auto flex max-w-site scroll-mt-24 flex-col gap-9 px-6 pt-[110px]">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <p className={eyebrow}>{t.mgmtEyebrow}</p>
          <h2 className={h2Big}>{t.mgmtH2}</h2>
          <p className="text-lg leading-normal text-muted">{t.mgmtText}</p>
        </div>
        <Image src="/img/team/actarion-partners.webp" alt={t.groupAlt} width={1200} height={675} sizes="(max-width: 1240px) 100vw, 1200px" className="block h-auto w-full rounded-[28px] border border-line" />
        <TeamCards t={t} locale={locale} />
      </section>
      <HowWeWork t={t} locale={locale} />
      <PartnersTeaser t={t} locale={locale} />
      <ImageNote t={t} />
      <div className="h-16" />
      <Cta locale={locale} heading={t.ctaHeading} />
      <OnsiteVisit locale={locale} />
    </>
  );
}

/** Team page (route key team): the management cards as the page body. */
export function TeamDesign({ routeKey: _routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = overCopy[locale];
  return (
    <>
      <section id="management" className="mx-auto flex max-w-site flex-col gap-9 px-6 pt-16">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <p className={eyebrow}>{t.mgmtEyebrow}</p>
          <h1 className="font-display text-[clamp(42px,5vw,64px)] font-extrabold leading-[1.0] tracking-[-0.035em]">{t.mgmtH2}</h1>
          <p className="text-lg leading-normal text-muted">{t.mgmtText}</p>
        </div>
        <TeamCards t={t} locale={locale} H="h2" />
      </section>
      <ImageNote t={t} />
      <HowWeWork t={t} locale={locale} />
      <div className="h-16" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}

/** Vision page (route key vision): page-model hero + sections in the Over visual language, plus how-we-work and partners. */
export function VisionDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = overCopy[locale];
  const page = getPage(locale, routeKey);
  return (
    <>
      <Hero eyebrowText={page.eyebrow ?? t.eyebrow} h1={page.h1} lead={page.lead} locale={locale} t={t} />
      {page.answer && (
        <section className="mx-auto max-w-site px-6 pt-14">
          <p className="max-w-[860px] rounded-[20px] border border-line bg-white p-6 text-lg leading-normal">{page.answer}</p>
        </section>
      )}
      {page.sections?.length ? (
        <div className="mx-auto flex max-w-site flex-col gap-16 px-6 pt-20">
          <Sections sections={page.sections} locale={locale} />
        </div>
      ) : (
        <Facts t={t} />
      )}
      <HowWeWork t={t} locale={locale} />
      <PartnersTeaser t={t} locale={locale} />
      {page.faq?.length ? (
        <div className="mx-auto max-w-site px-6 pt-20">
          <Faq items={page.faq} locale={locale} />
        </div>
      ) : null}
      <div className="h-16" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}
