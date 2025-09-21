import { SolutionsItems } from "@/app/api/data";
import Image from "next/image";
import Link from "next/link";

import HeroSub from "@/components/SharedComponents/HeroSub";

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/solution-Item", text: "Solution Item" },
];

export function generateStaticParams() {
  return SolutionsItems.map((item) => ({
    id: item.id,
  }));
}

type SolutionPageProps = {
  params: { id: string } | Promise<{ id: string }>
};


export default async function SolutionItemPage({ params }: SolutionPageProps) {
  /**
   *
   * Solution not found
   */

  const resolvedParams = await Promise.resolve(params);

  const product = SolutionsItems.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return (
      <main className="p-10 text-center text-red-600">
        <h1 className="text-2xl font-bold">Solution not found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-600 underline">
          ← Back to Home
        </Link>
      </main>
    );
  }

  /**
   *
   * Solution Item Page
   */

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title={product.title}
        description="Explore our innovative solution lineup designed to meet your needs"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={false}
      />
      <div className="py-10" />
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-8/12 order-2 lg:order-1">
            <article className="prose dark:prose-invert max-w-none">
              <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                {product.details}
              </p>
              <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                {product.description}
              </p>
              {product.sectionTitle && (
                <h3 className="text-xl font-semibold text-muted dark:text-white pt-4 pb-4">
                  {product.sectionTitle}
                </h3>
              )}
              {product.priorities && product.priorities.length > 0 && (
                <ul className="text-base list-disc list-inside space-y-2 text-muted dark:text-white">
                  {product.priorities.map((priority, index) => (
                    <li
                      key={index}
                      className="text-16 leading-normal pb-3 text-muted dark:text-white dark:text-opacity-70"
                    >
                      <strong>{priority.title}:</strong> {priority.text}
                    </li>
                  ))}
                </ul>
              )}
              {product.extraDescription && (
                <>
                  <div className="py-4" />
                  <p className="leading-normal text-18 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75%">
                    {product.extraDescription}
                  </p>
                </>
              )}
              <hr className="my-6" />
              {product.relatedProducts && product.relatedProducts.length > 0 && (
                <div>
                  <h4 className="text-18 leading-normal font-semibold text-muted dark:text-white mb-3">
                    Related Products:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-muted dark:text-white">
                    {product.relatedProducts.map((rp, idx) => (
                      <li
                        key={idx}
                        className="text-16 leading-normal pb-2 text-primary hover:underline dark:text-white dark:text-opacity-70"
                      >
                        <Link href={`/product-Item/${rp.link}`}>
                          {rp.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
          <h2 className="text-20 font-bold mb-4 text-midnight_text dark:text-white">
            Other Solutions
          </h2>
          <ul className="flex flex-col gap-2">
            {SolutionsItems.filter((item) => item.id !== product.id).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/solution-item/${item.id}`}
                  className="text-16 leading-normal pb-2 flex flex-row   text-primary hover:underline"
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
