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
              <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                {product.details}
              </p>
              <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the
              </p>
              <ul className="text-base list-disc list-inside space-y-2 text-muted dark:text-white">
                <li className="pb-3 text-muted dark:text-white dark:text-opacity-70">
                  Vivamus eu lacus scelerisque, placerat commodo lectus.
                </li>
                <li className="pb-3 text-muted dark:text-white dark:text-opacity-70">
                  Etiam et ante at ex porta fringilla.
                </li>
                <li className="pb-3 text-muted dark:text-white dark:text-opacity-70">
                  Nullam dignissim sem eu magna aliquet, sit amet volutpat
                  tellus
                </li>
              </ul>
              <div className="py-4" />
              <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% ">
                Unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the
              </p>
              <hr className="my-6" />
              <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% ">
                We are a dedicated team of passionate product managers,
                developers, UX/UI designers, QA engineers experts helping
                businesses from new startups
              </p>
              <hr className="my-6" />
              <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% ">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable making this the first true generator on the
                Internet. It uses a dictionary
              </p>
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
        {/*  Other Solutions Items */}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-midnight_text dark:text-white">
            Other Solutions
          </h2>

          <ul className="flex flex-col md:flex-row gap-2">
            {SolutionsItems.filter((item) => item.id !== product.id).map((item) => (
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
