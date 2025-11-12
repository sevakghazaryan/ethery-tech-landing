import Intro from "@/components/Products/Intro";
import ProductInfo from "@/components/Products/ProductInfo";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethery Tech | Products",
  description: "Explore our innovative product lineup of secure radio communication systems designed to meet your needs.",
};

export default function Products() {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/products", text: "Products" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title="Products"
        description="Explore our innovative product lineup designed to meet your needs"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <Intro />
      {/* <KeyFeatures /> */}
      <ProductInfo />
    </main>
  );
}
