"use client";
import HeroSub from "@/components/SharedComponents/HeroSub";

const Leadership = () => {
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
    </main>
  );
};

export default Leadership;
