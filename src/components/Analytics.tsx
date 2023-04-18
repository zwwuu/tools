"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useReportWebVitals } from "next/web-vitals";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  useEffect(() => {
    if (pathname) {
      window.gtag("config", id, {
        page_path: pathname,
      });
    }
  }, [id, pathname, searchParams]);

  useReportWebVitals((metric) => {
    window.gtag("event", metric.name, {
      event_category: metric.label === "web-vital" ? "Web Vitals" : "custom metric",
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value), // values must be integers
      event_label: metric.id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  });

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy={"afterInteractive"}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`,
        }}
        id={"google-analytics"}
        strategy={"afterInteractive"}
      />
    </>
  );
}
