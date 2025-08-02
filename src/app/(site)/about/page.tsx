"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { aboutPerks } from "@/app/api/data";

const AboutUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };
  
  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  return (
    <section className="dark:bg-darkmode overflow-x-hidden pb-20 pt-36">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div
          ref={ref}
          className="grid md:grid-cols-12 items-center lg:gap-12 gap-6"
        >
          <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
            <h2 className="lg:text-35 text-24 text-midnight_text font-semibold dark:text-white">
              Solving for&nbsp;
              <span className="lg:text-35 text-24 text-primary font-semibold lg:max-w-max">
                Safer
              </span>
            </h2>
            <p className="mt-6 text-muted dark:text-white dark:text-opacity-70 lg:text-17 lg:max-w-full max-w-75%">
              At <b>Ethery Tech</b>, safety means more than encryption or signal
              strength — it’s about{" "}
              <b>reliability under pressure, clarity in the field</b>, and{" "}
              <b>control over every transmission.</b> Our radio communication
              systems are engineered to keep people, processes, and missions
              safe — no matter the environment.
            </p>
            <div className="flex flex-col gap-6 mt-16">
              <h5 className="text-midnight_text font-semibold dark:text-white">
                Key Highlights
              </h5>
              {aboutPerks.map((item, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:unread-outline"
                      width="24"
                      height="24"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h6>{item.title}</h6>

                    <p className="text-base text-muted dark:text-white dark:text-opacity-70">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...rightAnimation} className="lg:col-span-6 col-span-12">
            <div className="lg:max-w-full max-w-75% mx-auto">
              <Image
                src="/images/about/about.webp"
                alt="image"
                width={555}
                height={634}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
