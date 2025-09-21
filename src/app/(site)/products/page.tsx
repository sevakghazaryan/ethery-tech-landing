"use client";

import Intro from "@/components/Products/Intro";
import ProductInfo from "@/components/Products/ProductInfo";
import HeroSub from "@/components/SharedComponents/HeroSub";

const Products = () => {

  /**
   * 
   * Products Page
   */


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
};

export default Products;
