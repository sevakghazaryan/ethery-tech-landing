"use client";

import Hero from "@/components/Home/Hero";
import HeroSub from "@/components/SharedComponents/HeroSub";

const Leadership = () => {


  /**
   * Leadership Page
   */

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
      />
      <div className="">

        
      </div>
    </main>
  );
};

export default Leadership;
