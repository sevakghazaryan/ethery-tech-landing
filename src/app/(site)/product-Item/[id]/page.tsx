
import { ProductItems } from "@/app/api/data";
import Image from "next/image";

import Link from "next/link";

import HeroSub from "@/components/SharedComponents/HeroSub";

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/product-Item", text: "Product Item" },
];

export function generateStaticParams() {
  return ProductItems.map((item) => ({
    id: item.id,
  }));
}

type ProductItemPageProps = {
  params: { id: string } | Promise<{ id: string }>
};

export default async function ProductItemPage({ params }: ProductItemPageProps) {

  const resolvedParams = await Promise.resolve(params);

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
          <ul className="flex flex-col md:flex-row gap-2">
            {ProductItems.filter((item) => item.id !== product.id).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/product-Item/${item.id}`}
                  className="flex flex-row   text-primary hover:underline"
                >
                  <span>#</span>
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
