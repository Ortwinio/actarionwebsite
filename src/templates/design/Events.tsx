import { Faq, Sections } from '@/components/Blocks';
import { Cta } from '@/components/Cta';
import { JsonLd } from '@/components/JsonLd';
import { Md } from '@/components/Md';
import { events, eventsCopy, type EventItem } from '@/content/design/events';
import { networkCopy } from '@/content/design/network';
import { getPage } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';

const eyebrow = 'text-sm font-bold uppercase tracking-[0.08em] text-primary';
const intl: Record<Locale, string> = { nl: 'nl-NL', en: 'en-GB', de: 'de-DE' };

function dateRange(e: EventItem, locale: Locale) {
  const f = (d: string, o: Intl.DateTimeFormatOptions) => new Date(`${d}T12:00:00Z`).toLocaleDateString(intl[locale], { ...o, timeZone: 'UTC' });
  if (!e.end || e.end === e.start) return f(e.start, { day: 'numeric', month: 'long', year: 'numeric' });
  const sameMonth = e.start.slice(0, 7) === e.end.slice(0, 7);
  return `${f(e.start, sameMonth ? { day: 'numeric' } : { day: 'numeric', month: 'long' })} – ${f(e.end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

function EventCard({ e, locale }: { e: EventItem; locale: Locale }) {
  const c = eventsCopy[locale];
  const city = typeof e.city === 'string' ? e.city : e.city?.[locale];
  const place = [city, e.country?.[locale]].filter(Boolean).join(', ');
  return (
    <li id={e.id} className="flex scroll-mt-24 flex-col gap-3 rounded-[22px] border border-line bg-white p-5">
      {e.logo && (
        <a href={e.url} target="_blank" rel="noopener" aria-label={`${e.naam} – ${c.visit}`} className="flex h-[88px] items-center justify-center rounded-2xl bg-canvas p-3 hover:outline hover:outline-2 hover:outline-primary">
          <img src={`/img/events/${e.logo.file}.webp`} width={e.logo.w} height={e.logo.h} alt={`${e.naam} logo`} loading="lazy" className="h-auto max-h-[64px] w-auto max-w-[90%]" />
        </a>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky px-3 py-1.5 font-mono text-[13px]"><time dateTime={e.start}>{dateRange(e, locale)}</time></span>
        <span className="rounded-full border border-line bg-canvas px-3 py-1.5 font-mono text-[13px]">{networkCopy[locale].regions[e.region]}</span>
      </div>
      <h3 className="m-0 text-lg font-bold leading-tight">{e.naam}</h3>
      {place && <p className="m-0 text-[15px] font-semibold">{place}</p>}
      <p className="m-0 flex-grow text-[15px] leading-[1.45] text-muted">{e.text[locale]}</p>
      {e.url && <a href={e.url} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-1 font-bold">{c.visit} ↗<span className="sr-only">{c.newWindow}</span></a>}
    </li>
  );
}

function eventSchema(e: EventItem, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.naam,
    startDate: e.start,
    endDate: e.end ?? e.start,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: (typeof e.city === 'string' ? e.city : e.city?.en) ?? e.country?.en ?? e.region, address: { '@type': 'PostalAddress', addressLocality: typeof e.city === 'string' ? e.city : e.city?.en, addressCountry: e.country?.en } },
    ...(e.url ? { url: e.url } : {}),
    description: e.text[locale],
    performer: { '@type': 'Organization', name: 'ActARion', url: 'https://www.actarion.com' },
  };
}

/** Events page: list of events (src/content/design/events.ts) plus the page's own sections and FAQ. */
export function EventsDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const page = getPage(locale, routeKey);
  const c = eventsCopy[locale];
  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...events].sort((a, b) => a.start.localeCompare(b.start));
  const upcoming = sorted.filter((e) => (e.end ?? e.start) >= today);
  const past = sorted.filter((e) => (e.end ?? e.start) < today).reverse();
  // The generic "which events are coming up?" text is replaced by the event list itself.
  const sections = (page.sections ?? []).filter((s) => !(s.kind === 'text' && s.body?.some((b) => b.includes('linkedin.com'))));

  return (
    <>
      <section className="mx-auto flex max-w-site flex-col gap-5 px-6 pt-16">
        <p className={eyebrow}>{c.eyebrow}</p>
        <h1 className="max-w-[900px] font-display text-[clamp(42px,5vw,70px)] font-extrabold leading-[0.98] tracking-[-0.035em]">{page.h1}</h1>
        {page.answer && <p className="max-w-[860px] text-xl leading-normal">{page.answer}</p>}
      </section>

      <section id="upcoming" className="mx-auto flex max-w-site scroll-mt-24 flex-col gap-6 px-6 pt-14">
        <h2 className="font-display text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{c.upcoming}</h2>
        {upcoming.length ? (
          <ul className="m-0 grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {upcoming.map((e) => <EventCard key={e.id} e={e} locale={locale} />)}
          </ul>
        ) : (
          <p className="max-w-[860px] rounded-[20px] bg-tint px-6 py-5 text-lg leading-normal"><Md text={c.none} /></p>
        )}
      </section>

      {past.length > 0 && (
        <section id="past" className="mx-auto flex max-w-site scroll-mt-24 flex-col gap-6 px-6 pt-14">
          <h2 className="font-display text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.03em]">{c.past}</h2>
          <ul className="m-0 grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {past.map((e) => <EventCard key={e.id} e={e} locale={locale} />)}
          </ul>
        </section>
      )}

      {sections.length > 0 && (
        <div className="mx-auto max-w-site px-6 pt-20">
          <Sections sections={sections} locale={locale} />
        </div>
      )}

      {page.faq?.length ? (
        <div className="mx-auto max-w-site px-6 pt-20">
          <Faq items={page.faq} locale={locale} />
        </div>
      ) : null}

      {upcoming.map((e) => <JsonLd key={e.id} data={eventSchema(e, locale)} />)}

      <div className="h-[72px]" />
      <Cta locale={locale} heading={c.ctaHeading} />
    </>
  );
}
