import { NextResponse } from 'next/server';

/**
 * Lead endpoint for pilot requests and template downloads.
 * Sends a notification via Resend when RESEND_API_KEY is set (same provider as the
 * current site). CRM integration follows in a later phase.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot
  const email = String(body.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'email' }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const general = process.env.LEAD_NOTIFY_EMAIL || 'info@actarion.com';
  // On-site visit requests go straight to the managing partners.
  const to = body.kind === 'onsite'
    ? (process.env.ONSITE_NOTIFY_EMAILS || 'mark@actarion.com,jack@actarion.com').split(',').map((x) => x.trim())
    : [general];
  if (key) {
    const lines = Object.entries(body)
      .filter(([k]) => k !== 'website')
      .map(([k, v]) => `${k}: ${String(v).slice(0, 2000)}`)
      .join('\n');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || 'ActARion website <website@notifications.actarion.com>',
        to,
        ...(body.kind === 'onsite' ? { cc: [general] } : {}),
        reply_to: email,
        subject: `[${body.kind}] ${body.company || email} (${body.locale})`,
        text: lines,
      }),
    });
    if (!res.ok) {
      console.error('[lead] resend', res.status, lines);
      return NextResponse.json({ error: 'mail' }, { status: 502 });
    }
  } else {
    // No mail key yet: keep the lead in the Vercel logs (search "[lead]") so nothing is lost.
    console.log('[lead]', JSON.stringify({ ...body, website: undefined, to }));
  }
  return NextResponse.json({ ok: true });
}
