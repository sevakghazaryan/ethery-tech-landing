import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ProductItems, ProductSections } from "@/app/api/data";
import Link from "next/link";

const ProductInfo = () => {
  /**
   * Product Info Component
   */

  const bottomAnimation = (inView: boolean, index: number) => ({
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 0.5, delay: index * 0.3 },
  });

  return (
    <section className="dark:bg-darkmode py-14 sccrollbar-hide ">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 space-y-32">
        {ProductSections.map((section, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-50px" });

          return (
            <motion.div
              key={i}
              ref={ref}
              {...bottomAnimation(inView, i)}
              className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center"
            >
              {/* Left side */}
              <div
                className={
                  section.reverse ? "order-1 lg:order-2" : "order-2 lg:order-1"
                }
              >
                <div>
                  <h3 className="text-midnight_text dark:text-white font-semibold lg:text-30 md:text-24 text-20 mb-6">
                    {section.title}
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 lg:text-18 text-base font-medium mb-6">
                    {section.description}
                  </p>
                </div>
                <div>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Right side */}
              <div
                className={
                  section.reverse ? "order-2 lg:order-1" : "order-1 lg:order-2"
                }
              >
                <div className="flex justify-center ml-20">
                  <ul className="flex flex-col gap-6 w-full max-w-md">
                    {ProductItems.slice(
                      section.slice[0],
                      section.slice[1]
                    ).map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductInfo;
