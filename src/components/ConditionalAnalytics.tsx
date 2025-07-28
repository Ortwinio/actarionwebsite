"use client";
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useCookieConsent } from '../hooks/useCookieConsent';

export default function ConditionalAnalytics() {
  const { hasConsent, isLoaded } = useCookieConsent();
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    if (isLoaded && hasConsent('analytics')) {
      setShouldLoadAnalytics(true);
    }
  }, [isLoaded, hasConsent]);

  if (!shouldLoadAnalytics) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
} 