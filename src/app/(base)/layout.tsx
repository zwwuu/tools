import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

import Analytics from "~/components/Analytics";
import DonationButton from "~/components/DonationButton";
import FloatingMenu from "~/components/FloatingMenu";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/Toaster";
import TopButton from "~/components/TopButton";
import seo from "~/lib/seo";
import AppProvider from "~/providers/AppProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...seo,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.variable} lang={"en"}>
      <head>
        <link color={"#ed8a63"} href={"/safari-pinned-tab.svg"} rel={"mask-icon"} />
      </head>
      <body
        className={
          "relative min-h-screen bg-dots bg-[length:1rem_1rem] font-sans text-base text-base-content transition"
        }
      >
        <AppProvider>
          <Analytics />
          <Navbar />
          <main className={"mb-8 space-y-8"}>{children}</main>
          <Footer />
          <FloatingMenu>
            <TopButton />
            <DonationButton />
          </FloatingMenu>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
