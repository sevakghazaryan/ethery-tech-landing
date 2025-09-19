import React from "react";
import { motion } from "motion/react";
import { ProductItems, ProductSections } from "@/app/api/data";
import Link from "next/link";

const ProductInfo = () => {
  /**
   * Product Info Component
   */

  const bottomAnimation = (inView: boolean, index: number) => ({
    initial: { y: "50%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "50%", opacity: 0 },
    transition: { duration: 0.15, delay: index * 0.3 },
  });

  return (
    <section className="dark:bg-darkmode py-14 sccrollbar-hide">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 space-y-32">
        {ProductSections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col"
          >
            <div>
              <h3 className="text-midnight_text dark:text-white font-semibold lg:text-30 md:text-24 text-20 mb-6">
                {section.title}
              </h3>
              <p className=" text-muted dark:text-white dark:text-opacity-70 md:text-18 text-base font-medium relative mb-6">
                {section.description}
              </p>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
              <div
                className={
                  section.reverse ? "order-1 lg:order-2" : "order-2 lg:order-1"
                }
              >
                <div>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div
                className={
                  section.reverse ? "order-1 lg:order-1" : "order-2 lg:order-2"
                }
              >
                <div className="flex justify-center w-full">
                  <ul className="flex flex-col gap-6">
                    {ProductItems.slice(
                      section.slice[0],
                      section.slice[1]
                    ).map((item, index) => (
                      <li key={item.id} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                          <span className="text-white font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <Link
                          href={`/product-Item/${item.id}`}
                          className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <h4 className="text-midnight_text dark:text-white font-semibold lg:text-[20px] text-[18px]">
                            <span>{item.id}</span> <span>{item.title}</span>{" "}
                            Product
                          </h4>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductInfo;
