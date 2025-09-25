"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const IntroAbout = () => {

    /**
     * 
     * Leadership Intro About Component
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
                <motion.div {...TopAnimation}>
                    <div className="px-4 lg:px-12">
                        <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 mb-8 text-midnight_text dark:text-white lg:mx-44">
                            The Team Behind Next-Generation Communication
                        </h2>
                    </div>
                    <p className="text-center text-muted dark:text-white dark:text-opacity-70 md:text-16 leading-normal  text-base font-medium relative">
                        At Ethery Tech, we believe innovation starts with people. Our leadership team brings together engineers, strategists, and creative minds to build secure and reliable radio communication systems. We are driven by responsibility, precision, and innovation—ensuring the highest level of performance in every project.
                    </p>

                    <div className="mt-10" />
                    <p className="text-center text-muted dark:text-white dark:text-opacity-70 md:text-16leading-normal text-base font-medium relative">
                        Our leaders shape the company’s direction with their expertise and vision, combining technical excellence with a trusted, partner-focused approach."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default IntroAbout;
