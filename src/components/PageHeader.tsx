import Image from "next/image";
import { ReactNode } from "react";

/**
 * Shared page header / hero:
 * - All localized page routes import this component and render it first.
 * - Blog and MDX-driven pages feed their frontmatter title/description into this header.
 * - This is the only place we emit an h1, ensuring every page exposes exactly one visible title.
 */

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
};

const HEADER_IMAGES = [
  "/headers/header-1.png",
  "/headers/header-2.png",
  "/headers/header-3.png",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
  children,
}: PageHeaderProps) {
  const fallbackIndex = hashString(title) % HEADER_IMAGES.length;
  const imageToUse = backgroundImage ?? HEADER_IMAGES[fallbackIndex];

  return (
    <section className="section section-light pt-8 pb-0">
      <div className="section-inner">
        <header className="relative isolate overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-900 text-white shadow-card min-h-[320px] flex items-center justify-center text-center">
          <div className="absolute inset-0">
            <Image
              src={imageToUse}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
            <h1 className="section-heading text-white text-center">
              {title}
            </h1>
            {subtitle && (
              <p className="section-lead text-white/85 max-w-3xl text-center">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="mt-2 text-white">
                {children}
              </div>
            )}
          </div>
        </header>
      </div>
    </section>
  );
}


