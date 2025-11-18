import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import CookieBanner from '../components/CookieBanner';
import ConditionalAnalytics from '../components/ConditionalAnalytics';
import { ThemeProvider } from '../contexts/ThemeContext';
import { defaultLocale, isSupportedLocale } from '../config/site';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
  description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
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
  metadataBase: new URL('https://www.ActARion.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
    url: 'https://www.ActARion.com',
    siteName: 'ActARion',
    images: [
      {
        url: '/ActARionlogo.png',
        width: 1200,
        height: 630,
        alt: 'ActARion - AR-Powered SOP Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
    images: ['/ActARionlogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get('x-actarion-locale');
  const resolvedLocale = localeHeader && isSupportedLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html lang={resolvedLocale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/ActARionlogo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="application-name" content="ActARion" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ActARion" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
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
          {children}
          <CookieBanner />
          <ConditionalAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
