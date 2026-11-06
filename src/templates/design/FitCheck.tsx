import { Cta } from '@/components/Cta';
import { FitCheckTool } from '@/components/design/FitCheckTool';
import { fitCheckCopy } from '@/content/design/fitCheck';
import type { Locale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';

export function FitCheckDesign({ routeKey: _routeKey, locale }: { routeKey: string; locale: Locale }) {
  const t = fitCheckCopy[locale];
  return (
    <>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-6 pb-20 pt-12">
        <div className="flex max-w-[760px] flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-primary">{t.eyebrow}</p>
          <h1 className="font-display text-[clamp(38px,4.4vw,52px)] font-extrabold leading-[1.02] tracking-[-0.03em]">{t.h1}</h1>
          <p className="text-lg leading-normal text-muted">{t.lead}</p>
        </div>
        <FitCheckTool t={t} ctaHref={pathFor('demo', locale)} mailHref={pathFor('whitepapers', locale)} />
      </div>
      <Cta locale={locale} heading={t.ctaHeading} />
    </>
  );
}
