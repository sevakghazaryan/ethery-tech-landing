import SolutionsComponent from "@/components/Home/Solutions";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ethery Tech | Solutions",
  description: "Secure radio solutions for Defense, UAV/Drone, Industrial Automation, Energy & Utilities, Smart Metering, and Custom OEM applications.",
  keywords: [
    "radio communication solutions",
    "defense communication systems",
    "military tactical radios",
    "UAV drone communication",
    "industrial automation wireless",
    "smart metering solutions",
    "utility communication networks",
    "OEM radio solutions",
    "custom wireless systems",
  ],
  canonicalPath: "/solutions/",
  ogImage: `${SITE_URL}/images/solutions/soldiers-special-forces-wars-desertthailand-peoplearmy-soldier-use-laptop-see-map-with-satelliteusing-radio-communication-military-operation.webp`,
});

export default function Solutions() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/solutions", text: "Solutions" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden">
      <HeroSub
        title="Solutions"
        description="Innovative solutions tailored to your unique challenges"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <SolutionsComponent />
    </main>
  );
}
