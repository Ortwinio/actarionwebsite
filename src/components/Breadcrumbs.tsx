import Link from 'next/link';
import { getPage, getUi, type Locale } from '@/lib/i18n';
import { pathFor, trailFor, type RouteKey } from '@/lib/routes';

export function Breadcrumbs({ routeKey, locale }: { routeKey: RouteKey; locale: Locale }) {
  const ui = getUi(locale);
  const trail = trailFor(routeKey);
  return (
    <nav aria-label="Breadcrumb" className="wrap pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {trail.map((k, i) => {
          const last = i === trail.length - 1;
          const label = k === 'home' ? ui.breadcrumbHome : getPage(locale, k).label;
          return (
            <li key={k} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">{label}</span>
              ) : (
                <>
                  <Link href={pathFor(k, locale)} className="inline-flex min-h-[32px] items-center text-muted underline-offset-4 hover:underline">{label}</Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
