import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import SolutionsComponent from "@/components/Home/Solutions";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ethery Tech | Advanced Secure Radio Communication Systems",
  description:
    "Advanced radio systems with intelligent hopping and encryption. Secure solutions for defense, UAVs, and industrial IoT applications.",
  keywords: [
    "Ethery Tech",
    "secure radio systems",
    "frequency hopping radios",
    "encrypted radios",
    "UAV telemetry modules",
    "industrial IoT radios",
    "OEM radio modules",
    "long-range wireless links",
    "tactical communication radios",
    "mission-critical connectivity",
    "radio communication",
    "radio systems",
    "military radio",
    "drone communication",
    "industrial automation radio",
  ],
  canonicalPath: "/",
  ogImage: `${SITE_URL}/images/hero/hero-image.webp`,
});

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
