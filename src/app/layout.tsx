import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from '../components/Navigation';
import CookieBanner from '../components/CookieBanner';
import ConditionalAnalytics from '../components/ConditionalAnalytics';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ActARion - Action with AR Revolutionize Excellence",
  description: "ActARion - Action with AR Revolutionize Excellence. Delivering next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe. Serving Benelux, DACH & Nordics.",
  keywords: [
    "ActARion",
    "Action with AR",
    "Revolutionize Excellence",
    "Augmented Reality",
    "AR",
    "SOP",
    "Standard Operating Procedures",
    "Frontline Operations",
    "Industrial Manufacturing",
    "Smart Factories",
    "Energy & Utilities",
    "Aerospace",
    "Pharma & Biotech",
    "Field Services",
    "Maintenance Operations",
    "Digital Transformation",
    "Workforce Training",
    "Process Optimization"
  ],
  authors: [{ name: "ActARion Team" }],
  creator: "ActARion",
  publisher: "ActARion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://actarion.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ActARion - Action with AR Revolutionize Excellence",
    description: "ActARion - Action with AR Revolutionize Excellence. Delivering next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe.",
    url: 'https://actarion.com',
    siteName: 'ActARion',
    images: [
      {
        url: '/Actarionlogo.png',
        width: 1200,
        height: 630,
        alt: 'Actarion - AR-Powered SOP Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ActARion - Action with AR Revolutionize Excellence",
    description: "ActARion - Action with AR Revolutionize Excellence. Delivering next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe.",
    images: ['/Actarionlogo.png'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/Actarionlogo.png" />
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
        <Navigation />
        {children}
        <CookieBanner />
        <ConditionalAnalytics />
      </body>
    </html>
  );
}
