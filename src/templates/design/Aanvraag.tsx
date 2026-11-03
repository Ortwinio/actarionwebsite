import { AanvraagWizard } from '@/components/design/AanvraagWizard';
import { aanvraagCopy } from '@/content/design/aanvraag';
import type { Locale } from '@/lib/locale';
import { pathFor } from '@/lib/routes';

/** Request wizard for route keys demo, contact and partnerBecome. */
export function AanvraagDesign({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  const kind = routeKey === 'partnerBecome' ? 'partner' : routeKey === 'contact' ? 'contact' : 'demo';
  return (
    <AanvraagWizard
      t={aanvraagCopy[locale]}
      kind={kind}
      locale={locale}
      page={pathFor(routeKey, locale)}
      guideHref={pathFor('whitepapers', locale)}
      homeHref={pathFor('home', locale)}
    />
  );
}
