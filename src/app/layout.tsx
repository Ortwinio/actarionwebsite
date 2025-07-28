import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Actarion - Revolutionizing SOP Execution with Augmented Reality",
  description: "Actarion delivers next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe. Serving Benelux, DACH & Nordics.",
  keywords: [
    "Actarion",
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
  authors: [{ name: "Actarion Team" }],
  creator: "Actarion",
  publisher: "Actarion",
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
    title: "Actarion - Revolutionizing SOP Execution with Augmented Reality",
    description: "Actarion delivers next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe.",
    url: 'https://actarion.com',
    siteName: 'Actarion',
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
    title: "Actarion - Revolutionizing SOP Execution with Augmented Reality",
    description: "Actarion delivers next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe.",
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
        <meta name="application-name" content="Actarion" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Actarion" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
