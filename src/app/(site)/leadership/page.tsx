import IntroAbout from "@/components/Leadership/IntroAbout";
import OurTeamComponent from "@/components/Leadership/OurTeam";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Leadership Team",
  description: "Meet the visionary team driving innovation and growth at Ethery Tech. Led by experts in radio engineering, software architecture, hardware design, and wireless system development.",
  keywords: [
    "ethery tech leadership",
    "management team",
    "radio engineering experts",
    "wireless technology leaders",
    "CEO Narek Ghazaryan",
    "CTO Sargis Sargsyan",
  ],
  canonicalPath: "/leadership/",
  ogImage: "https://ethery.tech/images/leadership/narek.webp",
});

export default function Leadership() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/leadership", text: "Leadership" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title="Leadership"
        description="Meet the visionary team driving innovation and growth"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <div>
        <IntroAbout />
        <div className="mt-10" />
        <OurTeamComponent />
      </div>
    </main>
  );
}
