import type { Locale } from '@/lib/locale';
import { getPage } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { Cta } from '@/components/Cta';
import { Faq, Updated } from '@/components/Blocks';
import { RoiCalculatorLazy, RoiReportLazy } from '@/components/design/RoiLazy';
import { roiCopy } from '@/content/design/roi';
import { calculate, CONST, COST_FIELDS, DEFAULT_STATE, DRIVERS, formatters, getValue, IMP, IMPACTS, QUICK_GROUPS, USE_CASES } from '@/lib/roi/design';

/** ROI calculator page (design v2): calculator + expert band + server-rendered "how we calculate". */
export function RoiDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const c = roiCopy(locale);
  const { how, howMore: H, report: _r, ...calcCopy } = c;
  void _r;
  const t = c.t;
  const f = formatters(locale);
  const r = calculate(DEFAULT_STATE);
  const page = getPage(locale, routeKey);
  const fieldsShown = [...QUICK_GROUPS.flat(), ...COST_FIELDS];
  const box = 'rounded-[22px] border border-line bg-[#F7F9FB] p-6';
  const formula = 'rounded-xl bg-tint px-3 py-2.5 font-mono text-[13px] font-medium leading-[1.6]';

  return (
    <>
      <RoiCalculatorLazy locale={locale} c={calcCopy} reportHref={pathFor('roiReport', locale)} expertHref={pathFor('demo', locale)} />

      <Cta locale={locale} heading={t.ctaBand} />

      <section id="how" className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-site flex-col gap-8 px-6 pb-24 pt-20">
          <div className="flex max-w-[760px] flex-col gap-3">
            <div className="text-sm font-bold uppercase tracking-[0.08em] text-primary">{t.howEyebrow}</div>
            <h2 className="m-0 font-display text-[clamp(32px,3.6vw,46px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{t.howTitle}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
            {DRIVERS.map((d, i) => (
              <div key={d} className={`${box} flex flex-col gap-2.5`}>
                <h3 className="m-0 text-lg font-bold">{c.drivers[d]}</h3>
                <div className={formula}>{how[i].formula}</div>
                <p className="m-0 text-[15px] leading-[1.45] text-muted">{how[i].note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className={`${box} flex flex-col gap-3`}>
              <h3 className="m-0 text-lg font-bold">{H.financeTitle}</h3>
              <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-[1.45] text-muted">
                {H.finance.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div className={`${box} flex flex-col gap-3`}>
              <h3 className="m-0 text-lg font-bold">{H.impactTitle}</h3>
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-line">{H.impactHead.map((h) => <th key={h} scope="col" className="py-2 pr-2 font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {IMPACTS.map((k) => (
                    <tr key={k} className="border-b border-line last:border-0">
                      <th scope="row" className="py-2 pr-2 font-normal">{c.impacts[k]}</th>
                      <td className="font-mono">−{Math.round(IMP[k].e * 100)}%</td>
                      <td className="font-mono">−{Math.round(IMP[k].tr * 100)}%</td>
                      <td className="font-mono">−{Math.round(IMP[k].d * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`${box} flex flex-col gap-3`}>
              <h3 className="m-0 text-lg font-bold">{H.ucTitle}</h3>
              <dl className="m-0 flex flex-col gap-3">
                {USE_CASES.map((k) => (
                  <div key={k} className="flex flex-col gap-1">
                    <dt className="font-semibold">{c.useCases[k].label}</dt>
                    <dd className={`m-0 ${formula}`}>{H.uc[k]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={`${box} flex flex-col gap-3`}>
              <h3 className="m-0 text-lg font-bold">{H.defaultsTitle}</h3>
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-line">{H.valueHead.map((h, i) => <th key={h} scope="col" className={`py-2 font-semibold ${i ? 'text-right' : ''}`}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {fieldsShown.map((fd) => {
                    const fc = c.fields[(fd.bag + '.' + fd.key) as keyof typeof c.fields];
                    return (
                      <tr key={fd.key} className="border-b border-line last:border-0">
                        <th scope="row" className="py-1.5 pr-2 font-normal">{fc.l}</th>
                        <td className="whitespace-nowrap py-1.5 text-right font-mono">{f.field(fd, getValue(DEFAULT_STATE, fd))} <span className="text-[13px] text-muted">{fc.u}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3 className="m-0 mt-2 text-lg font-bold">{H.exampleTitle}</h3>
              <ul className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-[13px] font-medium leading-[1.6]">
                <li>{c.drivers.training}: 6 × (24 × 40%) × ({f.eur(CONST.rateOperator)} + {f.eur(CONST.rateTrainer)}) = {f.eur(r.drivers.training)}</li>
                <li>{c.drivers.quality}: 25 × 400 × 3% × 50% × {f.eur(250)} = {f.eur(r.drivers.quality)}</li>
                <li>{c.drivers.downtime}: 40 × 40% × {f.eur(2000)} = {f.eur(r.drivers.downtime)}</li>
                <li>= {f.eur(r.annual)} · {t.payback} {f.payback(r.payM)} · {t.roi3} {f.roi(r.roi)} · {t.npv} {f.keur(r.npv)}</li>
              </ul>
            </div>
          </div>
          <p className="m-0 max-w-[760px] text-sm text-muted">{t.assumptions}</p>
        </div>
      </section>

      {page.faq?.length ? (
        <div className="mx-auto flex max-w-prose flex-col gap-10 px-6 py-16">
          <Faq items={page.faq} locale={locale} />
          {page.updated ? <Updated iso={page.updated} locale={locale} /> : null}
        </div>
      ) : null}
    </>
  );
}

/** Report request page: shows the user's real results (decoded client-side from the URL). */
export function RoiReportDesign({ locale }: { routeKey: string; locale: Locale }) {
  const c = roiCopy(locale);
  const { report, t, drivers, industries, impacts, useCases, fields } = c;
  return (
    <RoiReportLazy
      locale={locale}
      c={{ report, t, drivers, industries, impacts, useCases, fields }}
      hrefs={{ back: pathFor('roiCalculator', locale), plan: pathFor('demo', locale), pilot: pathFor('pilot', locale), privacy: pathFor('privacy', locale) }}
    />
  );
}
