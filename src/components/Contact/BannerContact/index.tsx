"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const BannerContact = () => {
  /**
   *
   * Banner Contact Hooks.
   */

  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.3, delay: 0.3 },
  };

  return (
    <section className="dark:bg-darkmode py-14">
      <div
        ref={ref}
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4"
      >
        <motion.div {...TopAnimation}>
          <div className="px-4 lg:px-12">
            <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 mb-8 text-midnight_text dark:text-white lg:mx-44">
              Let’s Connect
            </h2>
            <p className=" text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-center lg:max-w-full sm:max-w-75%">
              Get in touch with us for demos, partnerships, or career opportunities. 
              <br />
              Our team is ready to assist you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerContact;
