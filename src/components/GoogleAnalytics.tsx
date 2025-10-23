'use client'

import Script from 'next/script'
import { useCookieConsent } from '../hooks/useCookieConsent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-Z16HWSYBY1'

export default function GoogleAnalytics() {
  const { hasConsent, isLoaded } = useCookieConsent()

  if (!GA_ID) return null
  if (!isLoaded || !hasConsent('analytics')) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}


