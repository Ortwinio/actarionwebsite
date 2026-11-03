import { NextResponse } from 'next/server';

/**
 * Review comments from visitors of a preview deployment (public/review/review.js).
 * Not available in production. Each comment is mailed via Resend (RESEND_API_KEY)
 * to REVIEW_NOTIFY_EMAIL (default ortwin@ormac.nl, read by the hourly processing task),
 * with the screenshot as a JPEG attachment.
 */
const isProd = process.env.VERCEL_ENV === 'production';
const MAX_IMG = 1_500_000; // characters of the data URL, ~1.1 MB
const str = (v: unknown, n: number) => String(v ?? '').slice(0, n);

type Trail = { path?: string; title?: string; t?: string; start?: boolean; referrer?: string };

export async function POST(req: Request) {
  if (isProd) return NextResponse.json({ ok: false, error: 'disabled' }, { status: 404 });
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  const naam = str(b.naam, 100).trim();
  const email = str(b.email, 200).trim();
  const tekst = str(b.tekst, 2000).trim();
  if (naam.length < 2 || tekst.length < 3) return NextResponse.json({ ok: false, error: 'invoer' }, { status: 422 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: 'email' }, { status: 422 });

  const img =
    typeof b.screenshot === 'string' && b.screenshot.startsWith('data:image/jpeg;base64,') && b.screenshot.length <= MAX_IMG
      ? b.screenshot.slice('data:image/jpeg;base64,'.length)
      : null;
  const route = (Array.isArray(b.route) ? (b.route as Trail[]) : []).slice(-30);
  const sc = (b.scherm && typeof b.scherm === 'object' ? b.scherm : {}) as Record<string, unknown>;
  const pagina = str(b.pagina, 500);
  const path = (() => { try { return new URL(pagina).pathname; } catch { return pagina; } })();

  const text = [
    `Opmerking van ${naam}${email ? ` <${email}>` : ''}`,
    '',
    tekst,
    '',
    `Pagina: ${pagina}`,
    `Titel: ${str(b.titel, 200)}`,
    `Taal: ${str(b.taal, 5)}`,
    `Viewport: ${sc.w}×${sc.h} @${sc.dpr}x (scherm ${sc.sw}×${sc.sh}${sc.touch ? ', touch' : ''})`,
    `Browser: ${str(b.browser, 300)}`,
    `Deployment: ${process.env.VERCEL_GIT_COMMIT_REF || '?'} @ ${(process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7)}`,
    `Ontvangen: ${new Date().toISOString()}`,
    '',
    'Route:',
    ...route.map((r) => (r.start ? `  start (van ${str(r.referrer, 300)})` : `  ${str(r.t, 30).slice(11, 19)}  ${str(r.path, 300)}`)),
  ].join('\n');

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[review]', text); // visible in Vercel logs until Resend is configured
    return NextResponse.json({ ok: true, opgeslagen: false });
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || 'ActARion website <website@actarion.com>',
      to: [process.env.REVIEW_NOTIFY_EMAIL || 'ortwin@ormac.nl'],
      ...(email ? { reply_to: email } : {}),
      subject: `[Feedback preview] ${path} – ${naam}`,
      text,
      ...(img ? { attachments: [{ filename: 'screenshot.jpg', content: img }] } : {}),
    }),
  });
  if (!res.ok) {
    console.error('[review] resend', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ ok: false, error: 'mail' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, opgeslagen: true });
}
