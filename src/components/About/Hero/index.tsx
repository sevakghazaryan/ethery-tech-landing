import { useInView, motion } from "motion/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { aboutPerks, careersPerks } from "@/app/api/data";
import Link from "next/link";

const Hero = () => {
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
    <section className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 py-14">
      <div
        ref={ref}
        className="grid md:grid-cols-12 items-start lg:gap-12 gap-6"
      >
        <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
          <h2 className="lg:text-35 text-24 text-midnight_text font-semibold dark:text-white">
            Solving&nbsp;
            <span className="lg:text-35 text-24 text-primary font-semibold lg:max-w-max">
              for Safer
            </span>
          </h2>
          <p className="mt-6 text-muted dark:text-white dark:text-opacity-70 lg:text-17 max-w-full">
            At <b>Ethery Tech</b>, safety means more than encryption or signal
            strength — it’s about{" "}
            <b>reliability under pressure, clarity in the field</b>, and{" "}
            <b>control over every transmission.</b> Our radio communication
            systems are engineered to keep people, processes, and missions safe
            — no matter the environment.
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
          <div className="flex items-center justify-start">
            <Link
              href="/careers"
              className="lg:text-17 flex gap-4 items-center bg-primary text-white py-2 px-4 lg:py-3 lg:px-8 rounded-lg mt-12 border border-primary hover:text-primary hover:bg-transparent"
            >
              Join Us
              <Icon
                icon="solar:alt-arrow-right-linear"
                width="13"
                height="13"
              />
            </Link>
          </div>
          <p className="mt-2 text-muted dark:text-white dark:text-opacity-70 lg:text-17 max-w-full">
            Let’s build something meaningful together.
          </p>
        </motion.div>
        <motion.div {...rightAnimation} className="lg:col-span-6 col-span-12">
          <div className="lg:max-w-full md:max-w-75% mx-auto">
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
    </section>
  );
};

export default Hero;
