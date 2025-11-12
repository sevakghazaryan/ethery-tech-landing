import IntroAbout from "@/components/Leadership/IntroAbout";
import OurTeamComponent from "@/components/Leadership/OurTeam";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethery Tech | Leadership",
  description: "Meet the visionary team driving innovation and growth at Ethery Tech.",
};

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
