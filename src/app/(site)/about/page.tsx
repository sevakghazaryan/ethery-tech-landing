"use client";
import Hero from "@/components/About/Hero";
import CommunicationCTASection from "@/components/About/CommunicationCTASection	";
import HeroSub from "@/components/SharedComponents/HeroSub";

const AboutUs = () => {
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
      />
      <Hero />
      <CommunicationCTASection />
    </main>
  );
};

export default AboutUs;
