'use client';

import { useState } from 'react';

/** Single-open FAQ accordion. All answers stay in the HTML (hidden attribute) for crawlers. */
export function ArticleFaq({ items, idPrefix = 'faq' }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-[10px]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="rounded-2xl border border-line bg-white">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-[60px] w-full items-center justify-between gap-3 border-0 bg-transparent px-[18px] text-left text-[17px] font-bold text-ink"
              >
                <span>{f.q}</span>
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`flex-none transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="#10253A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            <p id={`${idPrefix}-a-${i}`} hidden={!isOpen} className="m-0 px-[18px] pb-[18px] text-base leading-[1.55] text-muted">
              {f.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
