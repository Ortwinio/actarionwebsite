import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/**
 * Dynamic Open Graph image generator.
 *
 * Produces a branded 1200x630 social card used as the default OG/Twitter
 * image across the site (see src/config/seo.ts). Replaces the previous
 * behaviour of sharing the small square logo, which rendered poorly on
 * social platforms.
 *
 * Optional query params:
 * - title: headline text (defaults to the brand tagline)
 * - subtitle: supporting line
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get('title')?.slice(0, 120) ||
    'Augmented Reality SOP & AR Work Instructions';
  const subtitle =
    searchParams.get('subtitle')?.slice(0, 160) ||
    'Train faster, reduce errors, and improve frontline quality with digital SOP software.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#05070d',
          backgroundImage:
            'radial-gradient(circle at 18% 20%, rgba(56,189,248,0.22), transparent 45%), radial-gradient(circle at 85% 85%, rgba(99,102,241,0.20), transparent 45%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 44,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            <span>Act</span>
            <span style={{ color: '#38bdf8' }}>AR</span>
            <span>ion</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: '960px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: '#cbd5e1',
              lineHeight: 1.35,
              maxWidth: '900px',
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 26,
            color: '#94a3b8',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: '#38bdf8',
              marginRight: 16,
            }}
          />
          actarion.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
