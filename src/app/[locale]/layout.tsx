import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { DM_Mono, Figtree, Schibsted_Grotesk } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { ConsentBanner } from '@/components/ConsentBanner';
import { JsonLd } from '@/components/JsonLd';
import { getUi, htmlLang, isLocale, locales } from '@/lib/i18n';
import { graph, organizationSchema, siteUrl, websiteSchema } from '@/lib/seo';
import '../globals.css';

// Self-hosted at build time by next/font: no request to Google at runtime (GDPR + speed).
const display = Schibsted_Grotesk({ subsets: ['latin'], weight: ['800'], variable: '--font-display', display: 'swap' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-body', display: 'swap' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-mono', display: 'swap' });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: '#10253A', width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'ActARion',
  icons: { icon: [{ url: '/favicon.ico' }, { url: '/favicon.svg', type: 'image/svg+xml' }], apple: '/apple-touch-icon.png' },
  manifest: '/manifest.json',
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const ui = getUi(locale);

  return (
    <html lang={htmlLang[locale]} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <Analytics />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold">
          {ui.skip}
        </a>
        <JsonLd data={graph(organizationSchema, websiteSchema)} />
        {children}
        <Footer locale={locale} />
        <ConsentBanner locale={locale} />
      </body>
    </html>
  );
}
