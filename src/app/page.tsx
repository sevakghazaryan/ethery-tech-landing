import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import SolutionsComponent from "@/components/Home/Solutions";

export const metadata: Metadata = {
  title: "Ethery Tech | Secure Radio Systems",
  description:
    "Ethery Tech designs and develops secure radio communication systems with AES-256 encryption, frequency hopping, and real-time data transfer for Defense, UAVs, and Industrial IoT applications.",
  keywords: [
    "Ethery Tech, secure radio systems",
    "frequency hopping radios",
    "UAES-256 encrypted radios",
    "UAV telemetry modules",
    "industrial IoT radios",
    "OEM radio modules",
    "long-range wireless links",
    " tactical communication radios",
    "mission-critical connectivity",
    "Radio Communication",
    "Radio Systems"
  ],
  authors: [{ name: "Ethery Tech" }],
  icons: {
  icon: [
    { url: "/favi/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favi/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon.ico", type: "image/x-icon" },
  ],
  apple: [
    { url: "/favi/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  other: [
    { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
},
  openGraph: {
    title: "Ethery Tech | Secure Radio Systems",
    description:
      "Secure radio systems with advanced encryption for defense, UAVs, and industrial IoT. Trusted communication solutions by Ethery Tech.",
    url: "https://dev.ethery.tech/",
    siteName: "Ethery Tech",
    images: [
      {
        url: "/favicon.ico", 
        width: 16,
        height: 16,
        alt: "Ethery Tech Secure Radio Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethery Tech | Secure Radio Systems for Defense, UAVs & IIoT",
    description:
      "Ethery Tech provides secure radio communication solutions with AES-256 encryption, frequency hopping, and real-time data for Defense, UAVs & IIoT.",
    images: ["/favicon.ico"], 
    creator: "@etherytech", 
  },
};

export default function Home() {

  /**
   * Home Page
   */

  return (
    <main>
      <Hero />
      <div className="dark:bg-darkmode py-14">
        <Products />
      </div>
      <SolutionsComponent />
    </main>
  );
}
