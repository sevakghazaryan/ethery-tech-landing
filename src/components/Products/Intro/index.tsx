"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const Intro = () => {

  /**
   * 
   * Products Intro Component
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
      <div
        ref={ref}
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4"
      >
        <motion.div {...TopAnimation} className="text-center">
          <div className="px-4 lg:px-12">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white lg:max-w-full sm:max-w-75% mx-auto">
              Advanced Radio Communication Systems -
              <span className="text-primary max-w-max ml-2">
                {" "}
                Unified, Secure and Mission-Ready{" "}
              </span>
            </h2>
          </div>
          <p className="text-center text-muted dark:text-white dark:text-opacity-70 text-16 leading-normal  font-medium relative">
            Next-generation radio communication systems connecting defense units, UAVs, industrial automation, and smart-utility networks. Our modular hardware and intelligent software deliver encrypted, long-range, and reliable data, voice and control links. Scalable, rugged, and easy to deploy - our systems form a complete platform for secure communication across any environment.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
