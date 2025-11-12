import Hero from "@/components/Careers/Hero";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethery Tech | Careers",
  description: "Join the Ethery Tech team and help build the future of secure radio communication systems.",
};

export default function Careers() {
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
        isBrodcurb={true}
      />
      <Hero />
    </main>
  );
}
