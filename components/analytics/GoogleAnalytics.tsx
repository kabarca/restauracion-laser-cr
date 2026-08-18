import Script from "next/script";

import { GA_MEASUREMENT_ID } from "@/lib/site-config";

/**
 * GA4 via gtag.js. Rendered only in production builds so local dev traffic never
 * lands in the property. GA4's enhanced measurement picks up App Router client-side
 * navigations from History API events, so no manual page_view on route change.
 */
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
