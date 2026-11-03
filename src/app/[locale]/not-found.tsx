import Link from 'next/link';

/** 404 inside the locale layout. Returns a real 404 status; noindex via Next default. */
export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-start gap-6 py-28">
      <p className="eyebrow">404</p>
      <h1 className="h1-sm">Page not found · Pagina niet gevonden · Seite nicht gefunden</h1>
      <div className="flex flex-wrap gap-3">
        <Link href="/en" className="btn-primary">English</Link>
        <Link href="/nl" className="btn-outline">Nederlands</Link>
        <Link href="/de" className="btn-outline">Deutsch</Link>
      </div>
    </section>
  );
}
