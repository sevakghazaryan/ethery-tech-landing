"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ProductItems } from "@/app/api/data";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Products = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const bottomAnimation = (index: any) => ({
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 + index * 0.4 },
  });

  return (
    <section className="dark:bg-darkmode py-14">
      <div
        ref={ref}
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4"
      >
        <motion.div {...TopAnimation}>
          <div className="px-4 lg:px-12">
            <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 mb-8 text-midnight_text dark:text-white lg:mx-44">
              Reliable Radio Communication —
              <span className="text-primary">
                {" "}
                Tailored for Every Mission and Industry{" "}
              </span>
            </h2>
            <p className="sm:text-19 text-16 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75%">
              We design and manufacture high-performance radio systems for
              defense, UAVs, and industrial automation. Each device is
              customizable, easy to integrate, and optimized for secure,
              real-time data, audio, and video transmission. Simple to deploy.
              Ready to scale.
            </p>
          </div>
        </motion.div>

        <div className="sm:mt-20 mt-10 w-full">
          <Swiper
            spaceBetween={50}
            slidesPerView={3.5}
            breakpoints={{
              1024: { slidesPerView: 3.5 },
              768: { slidesPerView: 2.5 },
              480: { slidesPerView: 1.5 },
            }}
          >
            {ProductItems.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div {...bottomAnimation(index)}>
                  <div className="py-4">
                    <p className="lg:text-25 text-22 font-medium text-midnight_text dark:text-white">
                      {item.title}
                    </p>
                  </div>
                  <div className="mr-2">
                    <p className="text-base text-muted dark:text-white dark:text-opacity-70">
                      {item.details}
                    </p>
                  </div>
                  <div className="rounded-full mt-2">
                    <Image
                      src={item.image}
                      alt={`Brand: ${item.title}`}
                      width={80}
                      height={80}
                      style={{ width: "100%", height: "100%" }}
                      className="bg-white dark:bg-midnight_text"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Products;
