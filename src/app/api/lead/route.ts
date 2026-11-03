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
  const to = process.env.LEAD_NOTIFY_EMAIL || 'info@actarion.com';
  if (key) {
    const lines = Object.entries(body)
      .filter(([k]) => k !== 'website')
      .map(([k, v]) => `${k}: ${String(v).slice(0, 2000)}`)
      .join('\n');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || 'ActARion website <website@actarion.com>',
        to: [to],
        reply_to: email,
        subject: `[${body.kind}] ${body.company || email} (${body.locale})`,
        text: lines,
      }),
    });
    if (!res.ok) return NextResponse.json({ error: 'mail' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
