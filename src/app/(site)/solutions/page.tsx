import SolutionsComponent from "@/components/Home/Solutions";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethery Tech | Solutions",
  description: "Innovative secure radio communication solutions tailored to your unique challenges in defense, UAV, industrial automation, and more.",
};

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
