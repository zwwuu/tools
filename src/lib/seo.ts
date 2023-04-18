import { Metadata } from "next";

const seo: Metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_APP_TITLE}`,
    template: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  applicationName: process.env.NEXT_PUBLIC_APP_TITLE,
  authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR, url: process.env.NEXT_PUBLIC_APP_AUTHOR_URL }],
  themeColor: "#ED8A63",
  robots: { index: true, follow: true, "max-snippet": -1, "max-video-preview": -1, "max-image-preview": "large" },
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: {
      default: `${process.env.NEXT_PUBLIC_APP_TITLE}`,
      template: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    },
    locale: "en_US",
    siteName: process.env.NEXT_PUBLIC_APP_TITLE,
    images: [
      {
        url: "/images/og.png",
        width: 1366,
        height: 768,
        alt: `${process.env.NEXT_PUBLIC_APP_TITLE} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "msapplication-TileColor": "#ED8A63",
  },
};

export default seo;
