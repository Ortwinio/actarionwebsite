import Image from 'next/image';
import type { Locale } from '@/lib/locale';
import { numberLocale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';
import { Cta } from '@/components/Cta';
import { HomeRoiTeaser } from '@/components/design/HomeRoiTeaser';
import { homeText, homeChecks, homeStats, homeTrust, homeCards, homeIndustries, homeSteps, homeKpis, homeRoles, homeNext } from '@/content/design/home';

const eyebrow = 'm-0 text-[12px] md:text-[14px] font-bold uppercase tracking-[0.08em] text-primary';
const h2 = 'm-0 font-display font-extrabold text-[30px] leading-[1.05] md:text-[clamp(34px,4vw,54px)] md:leading-[1.02] tracking-[-0.03em]';
const h3card = 'm-0 font-display font-bold text-[30px] leading-[1.1] tracking-[-0.02em]';
const container = 'mx-auto max-w-site px-4 md:px-6';

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="9" fill="#A9DBF5" />
      <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#10253A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Shield() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
      <path d="M10 2l6 2.5v5c0 4-2.6 7-6 8.5-3.4-1.5-6-4.5-6-8.5v-5L10 2z" fill="none" stroke="#A9DBF5" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeDesign({ routeKey: _routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = Object.fromEntries(Object.entries(homeText).map(([k, v]) => [k, v[locale]])) as Record<keyof typeof homeText, string>;
  const demo = pathFor('demo', locale);
  const roi = pathFor('roiCalculator', locale);
  const eur = new Intl.NumberFormat(numberLocale[locale], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  return (
    <div className="bg-canvas text-ink">
      {/* 2.1 Hero */}
      <section className={`mx-auto max-w-site flex flex-wrap items-center gap-[18px] px-5 pb-6 pt-7 md:gap-14 md:px-6 md:pb-[88px] md:pt-[72px]`}>
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[18px] md:gap-7">
          <p className={eyebrow}>{t.eyebrow}</p>
          <h1 className="m-0 font-display text-[42px] font-extrabold leading-none tracking-[-0.035em] md:text-[clamp(42px,5.4vw,80px)] md:leading-[0.98]">{t.h1}</h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.5] text-muted md:text-[20px]">{t.lead}</p>
          <div className="flex flex-col gap-[10px] md:flex-row md:flex-wrap md:gap-3">
            <a href={demo} className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-[30px] text-[17px] font-bold text-white no-underline hover:bg-primary-hover hover:text-white md:h-[58px]">{t.ctaDemo}</a>
            <a href={roi} className="box-border inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-7 text-[17px] font-bold text-ink no-underline hover:text-ink md:h-[58px]">{t.ctaRoi}</a>
          </div>
          <p className="m-0 hidden text-[15px] text-muted md:block">{t.meta}</p>
          <ul className="m-0 hidden list-none flex-wrap gap-x-[22px] gap-y-[10px] border-t border-line p-0 pt-5 text-[15px] font-semibold md:flex">
            {homeChecks.map((c) => (
              <li key={c.en} className="inline-flex items-center gap-2"><Check />{c[locale]}</li>
            ))}
          </ul>
        </div>
        <div className="relative flex min-w-0 flex-[1_1_520px] flex-col gap-[18px] md:block">
          <div className="rounded-[24px] bg-sky p-[10px] md:rounded-panel md:p-[18px]">
            <Image src="/img/hero-tablet-ar.webp" alt={t.heroAlt} width={1200} height={800} priority sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw" className="block h-auto w-full rounded-[16px] md:rounded-[20px]" />
          </div>
          <div className="-mx-1 md:mx-0">
            <HomeRoiTeaser
              href={roi}
              numberLocale={numberLocale[locale]}
              t={{ eyebrow: t.teaserEyebrow, title: t.teaserTitle, ops: t.teaserOps, dt: t.teaserDt, hYear: t.hYear, res: t.teaserRes, link: t.teaserLink }}
            />
          </div>
        </div>
      </section>

      {/* 2.2 Proof band */}
      <section className="mt-1 bg-ink text-white md:mt-0">
        <div className={`mx-auto max-w-site flex flex-col gap-9 px-5 py-7 md:px-6 md:py-14`}>
          <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-x-0 md:gap-y-6">
            {homeStats.map((s) => (
              <div key={s.n} className="md:mr-7 md:border-r md:border-ink-3 md:py-1 md:pr-7">
                <dt className="font-mono text-[34px] text-sky md:text-[48px]">{s.n}</dt>
                <dd className="m-0 mt-[6px] text-[14px] text-muted-light md:text-[16px]">{s.l[locale]}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-3 border-t border-ink-3 pt-7">
            <span className="mr-2 text-[14px] font-bold uppercase tracking-[0.08em] text-muted-light">{t.worksWith}</span>
            <span className="rounded-full border border-[#3A5672] px-4 py-[10px] font-semibold">Powered by DeepSight</span>
            <span className="rounded-full border border-[#3A5672] px-4 py-[10px] font-semibold">{t.devices}</span>
            {[1, 2, 3].map((i) => (
              <span key={i} className="rounded-full border border-dashed border-[#5B7894] px-4 py-[10px] font-semibold text-muted-light">[{t.logo} {i}]</span>
            ))}
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-[10px] p-0">
            {homeTrust.map((x) => (
              <li key={x.en} className="inline-flex items-center gap-2 rounded-[12px] bg-ink-2 px-[14px] py-2 text-[14px] font-semibold"><Shield />{x[locale]}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2.3 Problems / use cases */}
      <section className={`${container} flex flex-col gap-[14px] pt-8 md:gap-10 md:pt-[110px]`}>
        <div className="flex flex-wrap items-end justify-between gap-6 px-1 md:px-0">
          <div className="flex max-w-[720px] flex-col gap-[14px]">
            <p className={eyebrow}>{t.probEyebrow}</p>
            <h2 className={h2}>{t.probTitle}</h2>
          </div>
          <a href={pathFor('useCases', locale)} className="inline-flex min-h-[44px] items-center text-[16px] font-bold">{t.allUc}</a>
        </div>
        <div className="grid gap-[14px] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:gap-6">
          {homeCards.map((c) => (
            <a key={c.key} href={pathFor(c.key, locale)} className="flex items-center gap-[14px] overflow-hidden rounded-[20px] border border-line bg-white p-[10px] text-ink no-underline hover:text-ink md:flex-col md:items-stretch md:gap-0 md:rounded-card md:p-0">
              <Image src={c.img} alt={c.alt[locale]} width={1200} height={800} loading="lazy" sizes="(min-width: 768px) 384px, 88px" className="h-[88px] w-[88px] shrink-0 rounded-[14px] object-cover md:aspect-[16/10] md:h-auto md:w-full md:rounded-none" />
              <div className="flex min-w-0 flex-col gap-1 md:gap-3 md:p-6">
                <span className="order-2 font-mono text-[12px] text-muted md:order-none md:self-start md:rounded-full md:bg-tint md:px-3 md:py-[6px] md:text-[13px] md:text-ink">{c.kpi[locale]}</span>
                <h3 className="order-1 m-0 text-[18px] font-bold md:order-none md:font-display md:text-[26px] md:tracking-[-0.02em]">{c.title[locale]}</h3>
                <p className="m-0 hidden text-[17px] leading-[1.5] text-muted md:block">{c.text[locale]}</p>
                <span className="hidden font-bold text-primary md:inline">{t.more}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-[10px]">
          <span className="mr-[6px] font-bold">{t.byIndustry}</span>
          {homeIndustries.map((i) => (
            <a key={i.key} href={pathFor(i.key, locale)} className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-white px-4 font-semibold text-ink no-underline hover:text-ink">{i.l[locale]}</a>
          ))}
        </div>
      </section>

      {/* 2.4 Pilot method */}
      <section className={`${container} flex flex-wrap items-center gap-8 pt-16 md:gap-14 md:pt-[110px]`}>
        <div className="min-w-0 flex-[1_1_460px] rounded-[24px] bg-tint p-[10px] md:rounded-panel md:p-[18px]">
          <Image src="/img/vision-pro-sop.webp" alt={t.pilotAlt} width={1200} height={799} loading="lazy" sizes="(min-width: 768px) 560px, 100vw" className="block h-auto w-full rounded-[16px] md:rounded-[20px]" />
        </div>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[22px]">
          <p className={eyebrow}>{t.pilotEyebrow}</p>
          <h2 className={h2}>{t.pilotTitle}</h2>
          <ol className="m-0 flex list-none flex-col gap-[10px] p-0">
            {homeSteps.map(([title, text], i) => {
              const last = i === 3;
              return (
                <li key={i} className={`flex items-start gap-4 rounded-[18px] border px-[18px] py-4 ${last ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink'}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky font-mono text-[15px] text-ink">0{i + 1}</span>
                  <div>
                    <h3 className="m-0 text-[18px] font-bold">{title[locale]}</h3>
                    <p className={`m-0 mt-[2px] text-[16px] leading-[1.45] ${last ? 'text-muted-light' : 'text-muted'}`}>{text[locale]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="flex flex-wrap gap-3">
            <a href={demo} className="inline-flex h-[54px] items-center justify-center rounded-full bg-primary px-[26px] font-bold text-white no-underline hover:bg-primary-hover hover:text-white">{t.ctaPilot}</a>
            <a href={pathFor('pilot', locale)} className="inline-flex h-[54px] items-center px-[22px] font-bold text-primary no-underline">{t.howApproach}</a>
          </div>
        </div>
      </section>

      {/* 2.5 ROI band */}
      <section className={`${container} pt-16 md:pt-[110px]`}>
        <div className="flex flex-wrap items-center gap-10 rounded-panel bg-ink p-6 text-white md:p-11">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
            <p className={`${eyebrow} !text-sky`}>{t.roiEyebrow}</p>
            <h2 className="m-0 font-display text-[clamp(32px,3.6vw,46px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{t.roiTitle}</h2>
            <p className="m-0 text-[18px] leading-[1.5] text-muted-lighter">{t.roiText}</p>
            <a href={roi} className="inline-flex h-[54px] items-center justify-center self-start rounded-full bg-sky px-[26px] font-bold text-ink no-underline hover:text-ink">{t.roiCta}</a>
          </div>
          <div className="grid min-w-0 flex-[1_1_380px] grid-cols-3 gap-3">
            {[
              { l: t.exSave, v: eur.format(75260), c: 'text-sky' },
              { l: t.exPay, v: t.exPayVal, c: 'text-white' },
              { l: t.exRoi, v: '61%', c: 'text-white' },
            ].map((x) => (
              <div key={x.l} className="rounded-[20px] bg-ink-2 p-5 max-sm:p-3">
                <div className="text-[13px] text-muted-light">{x.l}</div>
                <div className={`mt-[6px] font-mono text-[26px] max-sm:text-[18px] ${x.c}`}>{x.v}</div>
              </div>
            ))}
            <p className="col-span-3 m-0 text-[13px] text-muted-light">{t.exNote}</p>
          </div>
        </div>
      </section>

      {/* 2.6 Proof + roles */}
      <section className={`${container} grid gap-6 pt-6 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]`}>
        <article className="flex flex-col gap-[18px] rounded-[28px] border border-line bg-white p-6 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className={eyebrow}>{t.caseEyebrow}</p>
            <span className="rounded-full bg-warn-bg px-3 py-[6px] text-[13px] font-bold text-warn-fg">{t.caseBadge}</span>
          </div>
          <h3 className={h3card}>{t.caseTitle}</h3>
          <table className="w-full border-collapse border-t border-line">
            <thead>
              <tr className="grid grid-cols-3 gap-3 border-b border-line py-[14px] text-left text-[13px] font-bold uppercase tracking-[0.06em] text-muted">
                <th className="font-bold">{t.kpiCol}</th>
                <th className="font-bold">{t.base}</th>
                <th className="font-bold">{t.after}</th>
              </tr>
            </thead>
            <tbody>
              {homeKpis.map((r) => (
                <tr key={r.k.en} className="grid grid-cols-3 items-baseline gap-3 border-b border-line py-[14px] text-left">
                  <th scope="row" className="font-semibold">{r.k[locale]}</th>
                  <td className="leading-[1.4]">{r.a[locale]}</td>
                  <td className="font-semibold leading-[1.4] text-primary">{r.b[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <blockquote className="m-0">
            <p className="m-0 text-[18px] leading-[1.5]">{t.quote}</p>
            <footer className="mt-2 text-[15px] text-muted">{t.quoteBy}</footer>
          </blockquote>
        </article>
        <article className="flex flex-col gap-[22px] rounded-[28px] border-2 border-ink bg-white p-6 md:p-9">
          <p className={eyebrow}>{t.whoEyebrow}</p>
          <h3 className={h3card}>{t.whoTitle}</h3>
          <dl className="m-0">
            {homeRoles.map((r) => (
              <div key={r.k} className="flex gap-[18px] border-b border-line py-4">
                <dt className="flex-[0_0_110px] font-bold text-primary">{r.k}</dt>
                <dd className="m-0 leading-[1.45] text-muted">{r.v[locale]}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-[10px] rounded-[18px] bg-tint p-[18px]">
            <p className="m-0 font-bold">{t.itTitle}</p>
            <p className="m-0 text-[15px] leading-[1.45] text-muted">{t.itText}</p>
            <a href={pathFor('wpItSecurity', locale)} className="inline-flex min-h-[32px] items-center font-bold">{t.itCta}</a>
          </div>
        </article>
      </section>

      {/* 2.7 Next step */}
      <section className={`${container} flex flex-col gap-9 pt-16 md:pt-[110px]`}>
        <div className="flex max-w-[760px] flex-col gap-[14px]">
          <p className={eyebrow}>{t.nextEyebrow}</p>
          <h2 className={h2}>{t.nextTitle}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {homeNext.map((n) => (
            <div key={n.meta.en} className={`flex flex-col gap-[14px] rounded-card border p-7 ${n.dark ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink'}`}>
              <p className={`m-0 font-mono text-[14px] ${n.dark ? 'text-muted-light' : 'text-muted'}`}>{n.meta[locale]}</p>
              <h3 className="m-0 font-display text-[28px] font-bold">{n.title[locale]}</h3>
              <p className={`m-0 flex-grow text-[16px] leading-[1.5] ${n.dark ? 'text-muted-light' : 'text-muted'}`}>{n.text[locale]}</p>
              <a href={pathFor(n.key, locale)} className={`box-border inline-flex h-[50px] items-center justify-center rounded-full border-2 px-4 text-center font-bold text-ink no-underline hover:text-ink ${n.dark ? 'border-sky bg-sky' : 'border-ink bg-transparent'}`}>{n.cta[locale]}</a>
            </div>
          ))}
        </div>
      </section>

      {/* 2.8 Whitepaper band */}
      <section className={`${container} py-16 md:py-[110px]`}>
        <div className="flex flex-wrap items-center gap-11 rounded-panel bg-sky p-6 md:p-11">
          <div aria-hidden="true" className="flex flex-[0_1_260px] rotate-[-3deg] flex-col gap-[10px] rounded-[10px] bg-white p-[18px] shadow-[0_16px_34px_rgba(16,37,58,.18)]">
            <Image src="/img/ar-authoring.webp" alt="" width={1200} height={800} loading="lazy" sizes="260px" className="aspect-[4/3] w-full rounded-[6px] object-cover" />
            <span className="font-display text-[19px] font-extrabold leading-[1.1]">{t.wpCover}</span>
            <span className="text-[13px] text-muted">{t.wpCoverSub}</span>
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
            <p className={`${eyebrow} !text-ink`}>{t.wpEyebrow}</p>
            <h2 className="m-0 font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[40px]">{t.wpTitle}</h2>
            <p className="m-0 text-[18px] leading-[1.5]">{t.wpText}</p>
            <form action={pathFor('whitepapers', locale)} method="get" className="flex flex-wrap gap-[10px]">
              <label htmlFor="wp-email" className="sr-only">{t.wpLabel}</label>
              <input id="wp-email" name="email" type="email" autoComplete="email" placeholder={t.wpPh} className="h-14 min-w-0 flex-[1_1_260px] rounded-full border-2 border-ink bg-white px-5 text-[17px]" />
              <button type="submit" className="h-14 rounded-full bg-ink px-[26px] font-bold text-white">{t.wpCta}</button>
            </form>
            <p className="m-0 text-[14px]">{t.wpNote}</p>
          </div>
        </div>
      </section>

      {/* 2.9 CtaExpert */}
      <Cta locale={locale} />
    </div>
  );
}
