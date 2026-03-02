import { ProductItems } from "@/app/api/data";
import Image from "next/image";
import Link from "next/link";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";


const titles: Record<string, { title: string; description: string }> = {
  "et-net-100": {
    title: "Ethery Tech | Et Net 100",
    description: "Encrypted with frequency hopping, real-time chat and data; coverage up to 5 km (handheld-base) / 10 km (base-endpoint); data rates up to 0.7 Mbps.",
  },
  "et-net-200": {
    title: "Ethery Tech | Et Net 200",
    description: "Adds real-time voice to Et Net 100 features. Secure hopping, 5 km/10 km coverage, and data up to 0.7 Mbps for field teams.",
  },
  "et-dmr-100": {
    title: "Ethery Tech | Et DMR 100",
    description: "DMR-compatible handheld radio with single-band or FHSS modes. Up to 50 km line-of-sight, 5 km urban range, MIL-STD-810G compliant for secure field operations.",
  },
  "et-air-100": {
    title: "Ethery Tech | Et Air 100",
    description: "UAV module for telemetry, control, and payload data. Up to 100 km range, 2.2 Mbps single-band or 0.7 Mbps hopping; compact for easy integration.",
  },
  "et-industrial-100": {
    title: "Ethery Tech | Et Industrial 100",
    description: "Compact, rugged radio module for automation and IIoT. Up to 2 km range, Bluetooth/BLE/Wi-Fi integration, and robust performance in interference-heavy environments.",
  },
  "et-bridge-100": {
    title: "Ethery Tech | Et Bridge 100",
    description: "Repeater device to extend coverage up to 50 km. Supports frequency-hopping and single-band modes, ensuring reliable comms in obstructed environments.",
  },
  "et-meter-100": {
    title: "Ethery Tech | Et Meter 100",
    description: "Low-power mesh radio for utility metering. Up to 15 years battery life, scalable deployments, and reliable data reporting for electricity, water, and gas.",
  },
  "et-platform-100": {
    title: "Ethery Tech | Et Platform 100",
    description: "Customizable OEM radio module with hardware + software integration. Multi-purpose architecture, rapid prototyping, and scalable foundation for next-gen wireless devices.",
  },
};



export async function generateMetadata({
                                         params,
                                       }: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: productId } = await params;
  const productMeta = titles[productId];
  const product = ProductItems.find((p) => p.id === productId);

  if (!productMeta || !product) {
    return {
      title: "Ethery Tech | Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return generateSEOMetadata({
    title: productMeta.title,
    description: productMeta.description,
    keywords: [
      product.title,
      "radio communication",
      "secure radio",
      "wireless system",
      "encrypted communication",
      "tactical radio",
      "frequency hopping",
      "encryption",
    ],
    canonicalPath: `/product/${productId}/`,
    ogImage: `${SITE_URL}${product.image}`,
  });
}

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/products", text: "Products" },
];

export function generateStaticParams() {
  return ProductItems.map((item) => ({
    id: item.id,
  }));
}

type ProductItemPageProps = {
  params: Promise<{ id: string }>
};

export default async function ProductItemPage({ params }: ProductItemPageProps) {

  const resolvedParams = await params;

  const product = ProductItems.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
      <main className="dark:bg-darkmode overflow-x-hidden pb-14">
        <HeroSub
            title={product.title}
            description="Explore our innovative product lineup designed to meet your needs"
            breadcrumbLinks={breadcrumbLinks}
            isBrodcurb={false}
        />
        <div className="py-10" />
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="w-full lg:w-8/12 order-2 lg:order-1 ">
              <h3 className="mb-6 text-18 font-bold text-midnight_text dark:text-white lg:text-4xl">
                {product.subTitle}
              </h3>
              <article className="prose dark:prose-invert max-w-none">
                <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                  {product.details}
                </p>
                <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                  {product.description}
                </p>
                <h3 className="text-18 leading-normal text-start lg:max-w-full sm:max-w-75% pb-4 font-semibold">
                  {product.sectionTitle}
                </h3>
                <ul className="text-base list-disc list-inside space-y-2 text-muted dark:text-white">
                  {product.features.map((feature, idx) => (
                      <li
                          key={idx}
                          className="pb-3 text-muted dark:text-white dark:text-opacity-70"
                      >
                        {feature}
                      </li>
                  ))}
                </ul>
                <div className="py-4" />
                <hr className="my-6" />
              </article>
            </div>
            <div className="w-full lg:w-4/12 order-1 lg:order-2">
              <div className="overflow-hidden rounded-3xl shadow-md">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={400}
                    quality={100}
                    className="h-auto w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-midnight_text dark:text-white">
              Other Products
            </h2>
            <ul className="flex flex-col gap-2">
            {ProductItems.filter((item) => item.id !== product.id).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/product/${item.id}`}
                  className="text-16 leading-normal pb-2 flex flex-row text-primary hover:underline"
                >
                 
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </main>
  );
}
