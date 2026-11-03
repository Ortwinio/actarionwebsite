import { Cta } from '@/components/Cta';
import { WhitepaperForms } from '@/components/design/WhitepaperForms';
import { whitepaperCopy } from '@/content/design/whitepaper';
import { getPage } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';

/** Whitepaper hub (whitepapers) and individual whitepaper pages (e.g. wpItSecurity, preselected). */
export function WhitepaperDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = whitepaperCopy[locale];
  const idx = t.items.findIndex((it) => it.routeKey === routeKey);
  const isHub = idx < 0;
  const page = isHub ? null : getPage(locale, routeKey);
  // PDF files still to be supplied: /downloads/<slug>.pdf
  const pdfHrefs = t.items.map((it) => `/downloads/${it.slug}.pdf`);
  return (
    <>
      <WhitepaperForms
        t={t}
        locale={locale}
        page={pathFor(routeKey, locale)}
        initial={isHub ? 0 : idx}
        pdfHrefs={pdfHrefs}
        demoHref={pathFor('demo', locale)}
        intro={
          <>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-primary">{page?.eyebrow ?? t.eyebrow}</p>
            <h1 className="font-display text-[clamp(38px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.03em]">{page?.h1 ?? t.h1}</h1>
            <p className="text-lg leading-normal text-muted">{page?.lead ?? t.lead}</p>
          </>
        }
      />
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}
