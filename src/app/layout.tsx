import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
import CookieBanner from '../components/CookieBanner';
import ConditionalAnalytics from '../components/ConditionalAnalytics';
import { ThemeProvider } from '../contexts/ThemeContext';
import { HtmlLangSetter } from '../components/HtmlLangSetter';
import { defaultLocale, isSupportedLocale, locales } from '../config/site';
import "./globals.css";

/**
 * Extract locale from cookies and headers
 * Priority: NEXT_LOCALE cookie > x-actarion-locale header > fallback
 */
async function extractLocale(): Promise<string> {
  // 1. Try to get locale from cookie (most reliable)
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE');
    if (localeCookie?.value && isSupportedLocale(localeCookie.value)) {
      return localeCookie.value;
    }
  } catch {
    // Cookies might not be available in some contexts
  }
  
  // 2. Try to get locale from headers
  try {
    const headersList = await headers();
    
    // x-actarion-locale header from middleware
    const localeHeader = headersList.get('x-actarion-locale');
    if (localeHeader && isSupportedLocale(localeHeader)) {
      return localeHeader;
    }
    
    // x-url header set by middleware
    const xUrl = headersList.get('x-url');
    if (xUrl) {
      const match = xUrl.match(/^\/([a-z]{2})(\/|$)/);
      if (match && isSupportedLocale(match[1])) {
        return match[1];
      }
    }
  } catch {
    // Headers might not be available
  }
  
  // 3. Fall back to default locale
  return defaultLocale;
}

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
  metadataBase: new URL('https://www.actarion.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ActARion – Augmented Reality SOP & AR Work Instruction Software",
    description: "ActARion transforms SOPs into interactive AR work instructions. Train faster, reduce errors, and improve frontline quality with digital SOP software.",
    url: 'https://www.actarion.com',
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
  // TODO: Replace with actual Google Search Console verification code
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resolvedLocale = await extractLocale();

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
          <HtmlLangSetter />
          {children}
          <CookieBanner />
          <ConditionalAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
