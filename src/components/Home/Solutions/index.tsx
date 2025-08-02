"use client";
import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SolutionsItems } from "@/app/api/data";

const Solutions = () => {
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
            <p className="font-medium xl:max-w-45% lg:max-w-50% md:max-w-75% text-17 mx-auto text-muted dark:text-white dark:text-opacity-70">
              From airborne systems to fixed infrastructure—take control of how
              and where you connect.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-11">
            {SolutionsItems.map((item, index) => (
              <motion.div {...TopAnimation} className="col-span-2" key={index}>
                <div className="bg-white dark:bg-darkmode rounded-2xl overflow-hidden py-8 xl:py-0">
                  <div className="grid xl:grid-cols-2 xl:gap-10">
                    <div className="xl:px-9 px-4  py-4 flex flex-col">
                      <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white">
                        {item.title}
                      </h3>
                      <h4 className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 text-primary mt-2 mb-4">
                        {item.subTitle}
                      </h4>
                      <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                        {item.details}
                      </p>
                    </div>
                    <div className="xl:px-0 px-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={459}
                        height={289}
                        className="mx-auto w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* <div className="h-full flex flex-col gap-4 lg:col-span-1 col-span-2">
              <motion.div
                {...leftAnimation1}
                className="bg-white dark:bg-darkmode flex gap-1 items-center rounded-2xl overflow-hidden"
              >
                <div className="flex-1 pl-8 py-5">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Banking
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                    Fully programmable, debit credit physical & virtual cards
                    for individuals and businesses.
                  </p>
                  <Link
                    href="#"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full h-full">
                  <Image
                    src="/images/method/method1.jpg"
                    alt="image"
                    width={232}
                    height={375}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
              <motion.div
                {...leftAnimation2}
                className="bg-white dark:bg-darkmode flex gap-1 items-center rounded-2xl overflow-hidden"
              >
                <div className="flex-1 pl-8 py-5">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Payments
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                    Fully programmable, debit credit physical & virtual cards
                    for individuals and businesses.
                  </p>
                  <Link
                    href="#"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full h-full">
                  <Image
                    src="/images/method/method3.jpg"
                    alt="image"
                    width={232}
                    height={375}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
            <div className="h-full flex flex-col gap-4 lg:col-span-1 col-span-2">
              <motion.div
                {...rightAnimation}
                className="bg-white dark:bg-darkmode rounded-2xl overflow-hidden flex flex-col h-full"
              >
                <div className="flex-1">
                  <Image
                    src="/images/method/method2.png"
                    alt="image"
                    width={232}
                    height={375}
                    className="w-full"
                  />
                </div>
                <div className="flex-1 px-9 flex justify-center flex-col py-9">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Access $175,000 in partner rewards
                  </h3>
                  <p className="text-muted dark:text-white dark:text-opacity-70 md:text-18 text-16 md:mb-14 mb-8">
                    Fully programmable, debit credit physical & virtual cards
                    for individuals and businesses.
                  </p>
                  <Link
                    href="#"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary "
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
              </motion.div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
