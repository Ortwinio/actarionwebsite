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
    <section className="section section-light pt-10 pb-0">
      <div className="section-inner">
        <header className="relative z-10 isolate overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-900 shadow-card text-white">
          <div className="absolute inset-0">
            <Image
              src={imageToUse}
              alt={title}
              fill
              priority
              className="object-cover scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/30 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 flex flex-col gap-4 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
            <h1 className="section-heading text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="section-lead text-white/80 max-w-3xl">
                {subtitle}
              </p>
            )}
            {children && <div className="mt-2 text-white">{children}</div>}
          </div>
        </header>
      </div>
    </section>
  );
}


