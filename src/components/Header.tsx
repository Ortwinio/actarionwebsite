import { locales, type Locale } from '@/lib/i18n';
import { pathFor, trailFor, type RouteKey } from '@/lib/routes';
import { headerText, langNames, menus } from '@/content/menu';
import { SiteHeaderClient, type HeaderMenu } from './SiteHeaderClient';

const extra = {
  mobileDemo: { nl: 'Plan een demo', en: 'Book a demo', de: 'Demo vereinbaren' },
  mobileRoi: { nl: 'Bereken uw ROI', en: 'Calculate your ROI', de: 'ROI berechnen' },
  langShort: { nl: 'Taal', en: 'Language', de: 'Sprache' },
  opens: { nl: 'Opent', en: 'Opens', de: 'Öffnet' },
};

/** Server wrapper: resolves all menu links to localized URLs, then renders the interactive header. */
export function Header({ locale, routeKey, variant = 'full' }: { locale: Locale; routeKey: RouteKey; variant?: 'full' | 'focus' }) {
  const trail = trailFor(routeKey);
  const active = menus.find((m) => m.section.some((s) => trail.includes(s)))?.id;
  const resolved: HeaderMenu[] = menus.map((m) => ({
    id: m.id,
    label: m.label[locale],
    href: m.link ? pathFor(m.link, locale) : undefined,
    columns: m.columns?.map((c) => ({ title: c.title[locale].trim(), items: c.items.map((i) => ({ href: pathFor(i.key, locale), label: i.label[locale], sub: i.sub?.[locale] })) })),
    featured: m.featured && { href: pathFor(m.featured.key, locale), eyebrow: m.featured.eyebrow[locale], title: m.featured.title[locale], sub: m.featured.sub[locale], cta: m.featured.cta[locale] },
  }));
  const t = Object.fromEntries([...Object.entries(headerText), ...Object.entries(extra)].map(([k, v]) => [k, (v as Record<Locale, string>)[locale]])) as never;
  return (
    <SiteHeaderClient
      locale={locale}
      variant={variant}
      active={active}
      menus={resolved}
      langs={locales.map((l) => ({ code: l, name: langNames[l], href: pathFor(routeKey, l), path: `${pathFor(routeKey, l)}` }))}
      homeHref={pathFor('home', locale)}
      roiHref={pathFor('roiCalculator', locale)}
      demoHref={pathFor('demo', locale)}
      t={t}
    />
  );
}
