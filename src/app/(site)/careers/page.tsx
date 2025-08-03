"use client";
import Hero from "@/components/About/Hero";
import CommunicationCTASection from "@/components/Careers/Hero";
import HeroSub from "@/components/SharedComponents/HeroSub";

const Careers = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/careers", text: "Careers" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title="Careers"
        description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
        breadcrumbLinks={breadcrumbLinks}
      />
      <Hero />
      {/* <CommunicationCTASection /> */}
    </main>
  );
};

export default Careers;
