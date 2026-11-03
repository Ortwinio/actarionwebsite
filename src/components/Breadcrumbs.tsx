import Link from 'next/link';
import { getPage, type Locale } from '@/lib/i18n';
import { pathFor, trailFor, type RouteKey } from '@/lib/routes';
import { headerText } from '@/content/menu';

const Sep = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="#8597A6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/** Breadcrumb bar from the redesign: grey band with crumbs left and the localized URL right. */
export function Breadcrumbs({ routeKey, locale }: { routeKey: RouteKey; locale: Locale }) {
  const trail = trailFor(routeKey);
  return (
    <div className="border-b border-line bg-canvas">
      <nav aria-label={headerText.crumbLabel[locale]} className="mx-auto flex min-h-11 max-w-site flex-wrap items-center justify-between gap-4 px-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {trail.map((k, i) => {
            const last = i === trail.length - 1;
            const label = k === 'home' ? headerText.home[locale] : getPage(locale, k).label;
            return (
              <li key={k} className="inline-flex items-center gap-1">
                {i > 0 && <Sep />}
                {last ? (
                  <span aria-current="page" className="px-1 font-bold text-ink">{label}</span>
                ) : (
                  <Link href={pathFor(k, locale)} className="inline-flex min-h-11 items-center px-1 text-muted">{label}</Link>
                )}
              </li>
            );
          })}
        </ol>
        <span className="hidden font-mono text-xs text-muted sm:inline">actarion.com{pathFor(routeKey, locale)}/</span>
      </nav>
    </div>
  );
}
