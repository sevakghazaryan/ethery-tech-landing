import Hero from "@/components/About/Hero";
import CommunicationCTASection from "@/components/About/CommunicationCTASection";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ethery Tech | About Us",
  description: "Learn about Ethery Tech's mission to deliver innovative, secure radio communication technologies that keep you connected - anywhere, anytime. Built for critical operations, reliable, secure, and customized to your environment.",
  keywords: [
    "about ethery tech",
    "radio communication company",
    "secure communication technology",
    "wireless systems manufacturer",
    "tactical radio company",
    "defense communication solutions",
  ],
  canonicalPath: "/about/",
  ogImage: `${SITE_URL}/images/about/about.webp`,
});

export default function AboutUs() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title="About Us"
        description="Learn about Ethery Tech's mission to deliver innovative, secure radio communication technologies that keep you connected - anywhere, anytime."
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <Hero />
      <CommunicationCTASection />
    </main>
  );
}
