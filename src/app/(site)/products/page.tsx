import Intro from "@/components/Products/Intro";
import ProductInfo from "@/components/Products/ProductInfo";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ethery Tech | Products",
  description: "Explore Ethery Tech's innovative product lineup: integrated radio systems, UAV modules, industrial radios, smart metering, repeaters, and OEM solutions. Secure, encrypted communication for every mission.",
  keywords: [
    "radio communication products",
    "tactical radio systems",
    "UAV radio modules",
    "industrial radio equipment",
    "smart metering solutions",
    "frequency hopping radios",
    "encrypted communication devices",
    "DMR handheld radios",
    "OEM radio solutions",
  ],
  canonicalPath: "/products/",
  ogImage: `${SITE_URL}/images/products/integrated-radio-systems-light.webp`,
});

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
