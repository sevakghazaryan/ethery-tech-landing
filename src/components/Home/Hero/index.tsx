"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Heroimage } from "@/app/api/data";

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 1 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 1 },
  };
  return (
    <section className="relative pt-44 mb-14 bg-cover bg-center dark:bg-darkmode">
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-midnight_text"></div>
      <div className="container mx-auto lg:max-w-screen-xl relative z-1 md:max-w-screen-md px-4">
        <div className="grid grid-cols-12 items-center">
          <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
            <h1 className="md:text-50 sm:text-40 text-28 text-midnight_text lg:text-start mb-9 lg:w-full w-3/4">
              Radio Systems, Redefined by Simplicity
            </h1>
            <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75%">
              Secure, lightweight, and adaptable radio systems for military
              operations, UAVs and industrial applications — all with minimal
              training, maximum efficiency, and full customization.
            </p>
            <div className="flex items-center mt-12 gap-11">
              <div>
                <Link
                  href="#"
                  className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent"
                >
                  Request demo
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    width="13"
                    height="13"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:my-28 my-12">
              <p className="text-20 text-muted dark:text-white dark:text-opacity-70 text-start mb-7">
                Trusted by
              </p>
              <div className="flex space-x-6 justify-start w-full">
                {Heroimage.map((item, index) => (
                  <Link key={index} href="/">
                    <Image
                      src={item.lightimage}
                      alt="image"
                      width={115}
                      height={30}
                      className="block dark:hidden"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <Image
                      src={item.darkimage}
                      alt="image"
                      width={115}
                      height={30}
                      className="hidden dark:block"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="lg:col-span-6 col-span-12 pl-20 lg:block hidden"
          >
            <Image
              src="/images/hero/hero-image.png"
              alt="image"
              width={498}
              height={651}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
