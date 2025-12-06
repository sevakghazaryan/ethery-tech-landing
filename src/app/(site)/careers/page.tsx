import Hero from "@/components/Careers/Hero";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ethery Tech | Careers",
  description: "Join the Ethery Tech team and help build the future of secure radio communication systems. We value passion, curiosity, and mission-driven innovation. Grow with purpose in wireless technology.",
  keywords: [
    "ethery tech careers",
    "radio engineering jobs",
    "wireless technology careers",
    "communication systems jobs",
    "hardware engineer positions",
    "software engineer jobs",
    "RF engineer careers",
  ],
  canonicalPath: "/careers/",
  ogImage: `${SITE_URL}/images/careers/careers.webp`,
});

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
