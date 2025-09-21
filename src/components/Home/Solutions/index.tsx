"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SolutionsItems } from "@/app/api/data";

const SolutionsComponent = () => {

  /**
   * 
   * Solution Component Hooks.
   */

  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div
          ref={ref}
          className="dark:bg-midnight_text bg-heroBg rounded-3xl py-16 sm:px-10 px-5"
        >
          <motion.div {...TopAnimation} className="text-center">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white lg:max-w-full sm:max-w-75% mx-auto">
              Flexible Communication,
              <span className="text-primary max-w-max ml-2">
                Designed for Your Mission
              </span>
            </h2>
            <p className="font-medium xl:max-w-45% lg:max-w-50% md:max-w-75% text-18 leading-normal mx-auto text-muted dark:text-white dark:text-opacity-70">
              From airborne systems to fixed infrastructure-take control of how
              and where you connect.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-11">
            {SolutionsItems.map((item, index) => (
              <motion.div {...TopAnimation} className="col-span-2" key={index}>
                <Link href={`/solution-item/${item.id}`} className="transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="bg-white dark:bg-darkmode rounded-2xl overflow-hidden py-8 xl:py-0 hover:scale-[1.02] hover:shadow-md">
                    <div className="grid xl:grid-cols-2 xl:gap-10">
                      <div className="xl:px-9 px-4  py-4 flex flex-col">
                        <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white">
                          {item.title}
                        </h3>
                        <div className="mt-6" />
                        <p className="text-muted dark:text-white dark:text-opacity-70 text-16 leading-normal ">
                          {item.details}
                        </p>
                      </div>
                      <div className="relative w-full h-64">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsComponent;
