import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import Benefit  from "@/components/Home/Benefit";
import Spend from "@/components/Home/Spend";
import Solutions from "@/components/Home/Solutions";
import Mobile from "@/components/Home/Mobile";
import Search from "@/components/Home/Search";
import Pricing from "@/components/Home/Pricing";
import Solution from "@/components/Home/Solution";

export const metadata: Metadata = {
  title: "Nicktio",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Solutions />

      {/* <Benefit />
      <Spend />
      <Mobile />
      <Search />
      <Pricing />
      <Solution /> */}
    </main>
  );
}
