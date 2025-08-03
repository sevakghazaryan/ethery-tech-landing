import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import Solutions from "@/components/Home/Solutions";

export const metadata: Metadata = {
  title: "Nicktio",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Solutions />
    </main>
  );
}
