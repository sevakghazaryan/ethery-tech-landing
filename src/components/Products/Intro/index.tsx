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
    <section className="dark:bg-darkmode py-14">
      <div
        ref={ref}
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4"
      >
        <motion.div {...TopAnimation} className="text-center">
          <div className="px-4 lg:px-12">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white lg:max-w-full sm:max-w-75% mx-auto">
              Tactical Communication System All-in-One Secure Communication
              <span className="text-primary max-w-max ml-2">
                {" "}
                Platform for Field and Command Use{" "}
              </span>
            </h2>
          </div>
          <p className="text-center text-muted dark:text-white dark:text-opacity-70 md:text-18 text-base font-medium relative">
            Built for mission-critical operations, our tactical communication
            system ensures real-time coordination across environments. Modular,
            encrypted, and easy to deploy — it’s your complete field-to-command
            connectivity platform.
          </p>
        </motion.div>

        {/* <div className="flex justify-start sm:mt-20 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-14 gap-8">
            {productPerks.map((item, index) => (
              <div key={index}>
                <motion.div {...bottomAnimation(index)}>
                  <div className="rounded-full">
                   
                  </div>
                  <div className="py-4">
                    <p className="lg:text-25 text-22 font-medium text-midnight_text dark:text-white">
                      {item.title}
                    </p>
                  </div>
                  <div className="mr-2">
                    <p className="text-base text-muted dark:text-white dark:text-opacity-70">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Intro;
