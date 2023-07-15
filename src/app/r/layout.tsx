import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
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
      <body className={"relative min-h-screen bg-base-100 font-sans text-base text-base-content transition"}>
        <AppProvider>
          <Navbar />
          <main className={"mb-8 space-y-8"}>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
