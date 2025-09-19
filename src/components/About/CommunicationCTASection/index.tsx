import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

const CommunicationCTASection = () => {

  /**
   * Communication CTA Section
   */



  const ref = useRef(null);
  const inView = useInView(ref);
  const emailTech = "info@ethery.tech";

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
        <motion.div {...TopAnimation} className="bg-heroBg dark:bg-midnight_text rounded-3xl lg:px-16 px-4 py-12">
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
               href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailTech}`}
                target="_blank"
                rel="noopener noreferrer"
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
            {/* <div className="flex justify-center">
              <Image
                src="/images/about/radio-phone-one.png"
                alt="image"
                width={255}
                height={255}
              />
            </div> */}

            <div className="relative flex justify-center">
              {/* Wrapper with glow effect */}
              <div className="relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle,rgba(4,64,188,0.6)_0%,rgba(5,75,129,0)_70%)] before:blur-[120px] before:z-0">

                {/* radio-phone-one.png */}

                {/* radio-two-transparent.png */}
                <Image
                  src="/images/about/radio-two-transparent.png"
                  alt="image"
                  width={335}
                  height={335}
                  className="relative z-10"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunicationCTASection;