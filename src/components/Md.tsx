import Link from 'next/link';

/** Minimal inline Markdown (bold, italic, links, `placeholder`) for imported copy. Server-only, no client JS. */
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`|(?<![\w*])\*([^*]+)\*(?![\w*])/g;

export function Md({ text }: { text: string }) {
  if (!/[*[`]/.test(text)) return <>{text}</>;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={i++}><Md text={m[1]} /></strong>);
    else if (m[2] !== undefined) {
      const href = m[3];
      out.push(href.startsWith('/')
        ? <Link key={i++} href={href}>{m[2]}</Link>
        : <a key={i++} href={href} target="_blank" rel="noopener">{m[2]}</a>);
    } else if (m[4] !== undefined) out.push(<mark key={i++} className="rounded bg-warn-bg px-1 font-mono text-[0.85em] text-warn-fg">{m[4]}</mark>);
    else if (m[5] !== undefined) out.push(<em key={i++}>{m[5]}</em>);
    last = TOKEN.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
