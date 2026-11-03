import Link from 'next/link';
import { Cta } from '@/components/Cta';
import { pilotCopy } from '@/content/design/pilot';
import type { Locale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';

const eyebrow = 'text-sm font-bold uppercase tracking-[0.08em] text-primary';
const h2 = 'font-display font-extrabold text-[clamp(34px,3.6vw,50px)] leading-[1.04] tracking-[-0.03em]';

function Tick() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="mt-px flex-none">
      <circle cx="11" cy="11" r="11" fill="#A9DBF5" />
      <path d="M6.5 11.3l3 3 6-6.3" fill="none" stroke="#10253A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="mt-px flex-none">
      <circle cx="11" cy="11" r="10" fill="#fff" stroke="#869BAB" strokeWidth="1.5" />
      <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="#10253A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PilotDesign({ routeKey: _routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = pilotCopy[locale];
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-site flex-wrap items-end gap-12 px-6 pb-16 pt-20">
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-6">
          <p className={eyebrow}>{t.eyebrow}</p>
          <h1 className="font-display text-[clamp(44px,5vw,76px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{t.h1}</h1>
          <p className="max-w-[640px] text-xl leading-normal text-muted">{t.lead}</p>
        </div>
        <div className="flex flex-[1_1_300px] flex-wrap gap-3">
          <Link href={pathFor('demo', locale)} className="inline-flex h-[58px] items-center rounded-full bg-primary px-7 text-[17px] font-bold text-white no-underline hover:bg-primary-hover">{t.ctaPilot}</Link>
          <Link href={pathFor('fitCheck', locale)} className="inline-flex h-[58px] items-center rounded-full border-2 border-ink px-[26px] text-[17px] font-bold text-ink no-underline hover:bg-white">{t.ctaFit}</Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-site px-6" aria-label={t.eyebrow}>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {t.timeline.map((s, i) => {
            const dark = i === 3;
            return (
              <li key={s.n} className={`flex flex-col gap-3.5 rounded-[24px] p-[26px] ${dark ? 'bg-ink text-white' : 'border border-line bg-white'}`}>
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky font-mono text-ink">{s.n}</span>
                  <span className={`font-mono text-[13px] ${dark ? 'text-muted-light' : 'text-muted'}`}>{s.dur}</span>
                </div>
                <h2 className="font-display text-2xl font-bold">{s.title}</h2>
                <p className={`leading-normal ${dark ? 'text-muted-lighter' : 'text-muted'}`}>{s.text}</p>
                <p className={`mt-auto border-t pt-3.5 text-[15px] ${dark ? 'border-ink-3' : 'border-line'}`}>
                  <strong>{t.youGet}</strong> {s.get}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* What we measure */}
      <section className="mx-auto flex max-w-site flex-wrap items-center gap-12 px-6 pt-[100px]">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
          <p className={eyebrow}>{t.measureEyebrow}</p>
          <h2 className={h2}>{t.measureH2}</h2>
          <p className="text-lg leading-normal text-muted">{t.measureText}</p>
          <Link href={pathFor('roiCalculator', locale)} className="font-bold">{t.measureLink}</Link>
        </div>
        <ul className="flex min-w-0 flex-[1_1_520px] flex-wrap gap-2.5">
          {t.pills.map((p) => (
            <li key={p.label} className={`rounded-full px-[18px] py-3.5 font-mono text-base ${p.blue ? 'bg-sky' : 'border border-line bg-white'}`}>{p.label}</li>
          ))}
        </ul>
      </section>

      {/* Fit / not fit */}
      <section className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5 px-6 pt-[100px]">
        <div className="flex flex-col gap-4 rounded-[28px] border border-line bg-white p-[34px]">
          <h2 className="font-display text-[28px] font-bold">{t.fitH3}</h2>
          <ul className="flex flex-col gap-3">
            {t.fit.map((x) => <li key={x} className="flex items-start gap-3 text-[17px] leading-[1.4]"><Tick />{x}</li>)}
          </ul>
        </div>
        <div className="flex flex-col gap-4 rounded-[28px] bg-tint p-[34px]">
          <h2 className="font-display text-[28px] font-bold">{t.notFitH3}</h2>
          <ul className="flex flex-col gap-3">
            {t.notFit.map((x) => <li key={x} className="flex items-start gap-3 text-[17px] leading-[1.4]"><Cross />{x}</li>)}
          </ul>
        </div>
      </section>

      {/* What we ask */}
      <section className="mx-auto flex max-w-site flex-col gap-7 px-6 pt-[100px]">
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <p className={eyebrow}>{t.askEyebrow}</p>
          <h2 className={h2}>{t.askH2}</h2>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {t.ask.map((a) => (
            <li key={a.title} className="rounded-[20px] border border-line bg-white p-6">
              <p className="font-mono text-[30px] text-primary">{a.n}</p>
              <h3 className="mt-1.5 text-lg font-bold">{a.title}</h3>
              <p className="mt-1 leading-[1.45] text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mx-auto flex max-w-site flex-wrap gap-12 px-6 pt-[100px]">
        <div className="flex flex-[1_1_320px] flex-col gap-3.5">
          <p className={eyebrow}>{t.faqEyebrow}</p>
          <h2 className="font-display text-[40px] font-extrabold leading-[1.05]">{t.faqH2}</h2>
        </div>
        <div className="min-w-0 flex-[2_1_560px]">
          {t.faq.map((f, i) => (
            <div key={f.q} className={`border-t border-line py-[22px] ${i === t.faq.length - 1 ? 'border-b' : ''}`}>
              <h3 className="text-[19px] font-bold">{f.q}</h3>
              <p className="mt-2 leading-normal text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-20" />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}
