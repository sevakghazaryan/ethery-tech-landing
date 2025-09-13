import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import SolutionsComponent from "@/components/Home/Solutions";

export const metadata: Metadata = {
  title: "Ethery Tech",
  description: "",

   icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function Home() {

  /**
   * Home Page
   */

  return (
    <main>
      <Hero />
      <Products />
      <SolutionsComponent />
    </main>
  );
}
