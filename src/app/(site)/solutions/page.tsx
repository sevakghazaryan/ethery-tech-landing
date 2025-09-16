"use client";

import SolutionsComponent from "@/components/Home/Solutions";
import HeroSub from "@/components/SharedComponents/HeroSub";

const Solutions = () => {

  /**
   * 
   * Solutions Page
   */
  
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/solutions", text: "Solutions" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title="Solutions"
        description="Innovative solutions tailored to your unique challenges"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <SolutionsComponent />
    </main>
  );
};

export default Solutions;
