import { ctaExpertText } from '@/content/menu';
import type { Locale } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { CtaExpert } from './CtaExpert';

/** Server helper: CtaExpert with localized copy and link. */
export function Cta({ locale, variant = 'band', heading }: { locale: Locale; variant?: 'band' | 'card'; heading?: string }) {
  const t = Object.fromEntries(Object.entries(ctaExpertText).map(([k, v]) => [k, v[locale]])) as never;
  return <CtaExpert locale={locale} t={t} href={pathFor('demo', locale)} variant={variant} heading={heading} />;
}
