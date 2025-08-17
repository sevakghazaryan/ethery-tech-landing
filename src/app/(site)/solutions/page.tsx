"use client";
import HeroSub from "@/components/SharedComponents/HeroSub";

const Solutions = () => {
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
      />
    </main>
  );
};

export default Solutions;
