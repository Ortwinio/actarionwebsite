import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/** Branded 1200×630 social image; title passed as ?title=. */
export function GET(req: Request) {
  const title = (new URL(req.url).searchParams.get('title') || 'AI & AR-guided work instructions').slice(0, 120);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#10253A', padding: 72, color: '#fff' }}>
        <div style={{ fontSize: 40, fontWeight: 800, display: 'flex' }}>
          Act<span style={{ color: '#A9DBF5' }}>AR</span>ion
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ fontSize: 28, color: '#A9DBF5' }}>www.actarion.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
