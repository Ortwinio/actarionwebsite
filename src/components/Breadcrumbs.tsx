import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs component for consistent navigation hierarchy display.
 * Implements SEO-friendly markup with proper accessibility.
 * 
 * Note: This component renders visual breadcrumbs only.
 * For JSON-LD structured data, use buildBreadcrumbListSchema from config/seo.ts
 * 
 * @example
 * ```tsx
 * const breadcrumbs = [
 *   { name: 'Home', url: '/en' },
 *   { name: 'Use Cases', url: '/en/use-cases' },
 *   { name: 'AR Training', url: '/en/use-cases/ar-training-and-onboarding' },
 * ];
 * 
 * <Breadcrumbs items={breadcrumbs} />
 * ```
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`text-sm text-slate-600 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-slate-400" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span 
                  className="text-slate-900 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url} 
                  className="hover:text-actarion-blue transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}






