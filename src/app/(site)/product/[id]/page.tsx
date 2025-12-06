
import { ProductItems } from "@/app/api/data";
import Image from "next/image";
import Link from "next/link";
import { generateSEOMetadata, SITE_URL } from "@/utils/seo";
import type { Metadata } from "next";


const titles: Record<string, { title: string; description: string }> = {
  "et-net-100": {
    title: "Et Net 100 | Integrated Radio Communication System",
    description: "AES-256 with frequency hopping, real-time chat and data; coverage up to 5 km (handheld-base) / 10 km (base-endpoint); data rates up to 0.7 Mbps.",
  },
  "et-net-200": {
    title: "Et Net 200 | Radio System with Real-Time Voice",
    description: "Adds real-time voice to Et Net 100 features. Secure hopping with AES-256, 5 km/10 km coverage, and data up to 0.7 Mbps for field teams.",
  },
  "et-dmr-100": {
    title: "Et DMR 100 | Handheld Digital Mobile Radio",
    description: "DMR-compatible handheld radio with single-band or FHSS modes. Up to 50 km line-of-sight, 5 km urban range, MIL-STD-810G compliant for secure field operations.",
  },
  "et-air-100": {
    title: "Et Air 100 | High-Performance UAV Radio Module",
    description: "UAV module for telemetry, control, and payload data. Up to 50 km range, 2.2 Mbps single-band or 0.7 Mbps hopping; compact for easy integration.",
  },
  "et-industrial-100": {
    title: "Et Industrial 100 | Versatile Radio Module for Industrial Connectivity",
    description: "Compact, rugged radio module for automation and IIoT. Up to 2 km range, Bluetooth/BLE/Wi-Fi integration, and robust performance in interference-heavy environments.",
  },
  "et-bridge-100": {
    title: "Et Bridge 100 | Long-Range Radio Repeater Device",
    description: "Repeater device to extend coverage up to 50 km. Supports frequency-hopping and single-band modes, ensuring reliable comms in obstructed environments.",
  },
  "et-meter-100": {
    title: "Et Meter 100 | Low-Power Radio for Smart Utility Metering",
    description: "Low-power mesh radio for utility metering. Up to 15 years battery life, scalable deployments, and reliable data reporting for electricity, water, and gas.",
  },
  "et-platform-100": {
    title: "Et Platform 100 | Flexible OEM Radio Solution",
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
      title: "Product Not Found | Ethery Tech",
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
    ],
    canonicalPath: `/product/${productId}/`,
    ogImage: `${SITE_URL}${product.image}`,
  });
}


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
    return (
      <main className="p-10 text-center text-red-600">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-600 underline">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14 pt-32">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <h1 className="text-4xl font-bold mb-8 text-midnight_text dark:text-white">{product.title}</h1>
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-8/12">
            <h2 className="mb-6 text-2xl font-bold text-midnight_text dark:text-white">
              {product.subTitle}
            </h2>
            <p className="text-lg text-muted dark:text-white dark:text-opacity-70 mb-6">
              {product.details}
            </p>
            <p className="text-lg text-muted dark:text-white dark:text-opacity-70 mb-6">
              {product.description}
            </p>
            <h3 className="text-xl font-semibold mb-4 text-midnight_text dark:text-white">
              {product.sectionTitle}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted dark:text-white">
              {product.features.map((feature, idx) => (
                <li key={idx} className="pb-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-4/12">
            <div className="overflow-hidden rounded-3xl shadow-md">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={400}
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
                  className="text-primary hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
