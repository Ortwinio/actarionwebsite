/**
 * Google Tag Manager with Consent Mode v2.
 *
 * - Reuses the existing GTM container (GA4 property and history stay intact).
 * - Consent defaults to "denied" until the visitor chooses in the ConsentBanner.
 * - Only loaded on production unless NEXT_PUBLIC_GTM_ON_PREVIEW=true, so preview
 *   deployments don't pollute GA4 data.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WFXVKRWM';

const enabled =
  process.env.VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_GTM_ON_PREVIEW === 'true';

export function Analytics() {
  const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{var c=JSON.parse(localStorage.getItem('actarion-consent')||'null');if(c){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'});}}catch(e){}
dataLayer.push({site_language:document.documentElement.lang});`;

  const gtm = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

  return (
    <>
      <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefault }} />
      {enabled && <script id="gtm" dangerouslySetInnerHTML={{ __html: gtm }} />}
    </>
  );
}

/** Push a GA4-style event to the dataLayer (client-side only). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
