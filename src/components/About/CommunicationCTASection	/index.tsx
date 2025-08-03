import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {  useInView,motion } from "motion/react";
import { useRef } from "react";

const CommunicationCTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-50%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "50%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  return (
    <section className="dark:bg-darkmode overflow-x-hidden">
      <div
        ref={ref}
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4"
      >
        <motion.div {...TopAnimation}   className="bg-heroBg dark:bg-midnight_text rounded-3xl lg:px-16 px-4 py-12">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="md:text-35 sm:text-28 text-24 font-semibold text-midnight_text dark:text-white">
                Security Starts
                <span className="text-primary max-w-max ml-2">
                  With Communication
                </span>
              </h2>
              <p className="mt-6 text-base text-muted dark:text-white dark:text-opacity-70 lg:max-w-full sm:max-w-75%">
                Let’s build the safest link in your system.
              </p>
              <Link
                href="/contact"
                className="lg:text-17 flex gap-4 w-fit items-center bg-primary text-white py-2 px-4 lg:py-3 lg:px-8 rounded-lg mt-12 border border-primary hover:text-primary hover:bg-transparent"
              >
                Contact Our Team
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  width="13"
                  height="13"
                />
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/solution/solution.png"
                alt="image"
                width={531}
                height={200}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunicationCTASection;
