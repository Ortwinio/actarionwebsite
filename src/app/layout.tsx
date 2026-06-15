import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import CookieBanner from '../components/CookieBanner';
import ConditionalAnalytics from '../components/ConditionalAnalytics';
import { ThemeProvider } from '../contexts/ThemeContext';
import { HtmlLangSetter } from '../components/HtmlLangSetter';
import { defaultLocale } from '../config/site';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // Use title template to ensure <title> is always in <head> from initial render
  // Pages can override with just a string (e.g., "Privacy Policy") and it becomes "Privacy Policy | ActARion"
  title: {
    default: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    template: "%s | ActARion",
  },
  description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
  applicationName: "ActARion",
  keywords: [
    "ActARion",
    "Augmented Reality SOP",
    "AR Work Instructions",
    "Digital SOP Software",
    "Interactive Work Instructions",
    "Frontline Training",
    "AR Training Software",
    "Industrial AR Solutions",
    "Smart Manufacturing",
    "Digital Work Instructions",
    "AR-powered SOPs",
    "Workforce Training Software",
    "Process Optimization",
    "Industrial Manufacturing",
    "Energy & Utilities",
    "Aerospace",
    "Pharma & Biotech",
    "Field Services",
    "Maintenance Operations"
  ],
  authors: [{ name: "ActARion Team" }],
  creator: "ActARion",
  publisher: "ActARion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.actarion.com'),
  // NOTE: canonical and alternates are handled by individual pages via buildPageMetadata()
  // to ensure proper locale-specific URLs. Do not add alternates here.
  openGraph: {
    title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
    url: 'https://www.actarion.com',
    siteName: 'ActARion',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'ActARion - Augmented Reality SOP & AR Work Instructions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
    images: ['/og'],
  },
  // NOTE: robots metadata is handled by individual pages via buildPageMetadata()
  // to avoid duplicate meta robots tags. Do not add robots config here.
  icons: {
    icon: '/favicon.ico',
    apple: '/Actarionlogo.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: "ActARion",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
    "mobile-web-app-capable": "yes",
  },
  // Google Search Console verification is configured via the
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION environment variable so it can be
  // set per-environment without a code change. Leave unset to omit the tag.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

/**
 * Root layout - must be synchronous to ensure metadata (including <title>)
 * is placed in <head> during initial HTML render, not streamed later.
 * 
 * The HtmlLangSetter component handles setting the correct lang attribute
 * based on the URL locale after initial render.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} className="scroll-smooth">
      <body className={inter.className}>
        {/** Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
       'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
       })(window,document,'script','dataLayer','GTM-WFXVKRWM');`,
          }}
        />
        {/** End Google Tag Manager */}

        {/** Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFXVKRWM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/** End Google Tag Manager (noscript) */}
        <ThemeProvider>
          <HtmlLangSetter />
          {children}
          <CookieBanner />
          <ConditionalAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
