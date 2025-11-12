import Hero from "@/components/About/Hero";
import CommunicationCTASection from "@/components/About/CommunicationCTASection";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethery Tech | About",
  description: "Learn about Ethery Tech's mission to deliver innovative, secure radio communication technologies that keep you connected - anywhere, anytime.",
};

export default function AboutUs() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title="About Us"
        description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <Hero />
      <CommunicationCTASection />
    </main>
  );
}
