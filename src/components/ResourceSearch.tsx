'use client';

import { useMemo, useState } from 'react';

interface Item {
  href: string;
  title: string;
  group: string;
  text: string;
}

/** Client-side filter over the resources (all items are also in the HTML for crawlers). */
export function ResourceSearch({ items, label, placeholder }: { items: Item[]; label: string; placeholder: string }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.title} ${i.group} ${i.text}`.toLowerCase().includes(s)) : items;
  }, [q, items]);

  return (
    <div className="flex flex-col gap-5">
      <label className="sr-only" htmlFor="resource-search">{label}</label>
      <input
        id="resource-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-full border-2 border-ink bg-white px-6 text-[17px]"
      />
      <ul className="grid gap-3 md:grid-cols-2" aria-live="polite">
        {shown.map((i) => (
          <li key={i.href}>
            <a href={i.href} className="flex min-h-[56px] items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3 font-semibold text-ink no-underline hover:text-primary">
              <span>{i.title}</span>
              <span className="chip flex-none">{i.group}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
