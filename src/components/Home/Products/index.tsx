"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ProductItems } from "@/app/api/data";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import LeftIcon from "../../../../public/icon/left-icon.svg";
import RightIcon from "../../../../public/icon/right-icon.svg";

const Products = () => {

  /**
   * 
   * Products Component Hooks.
   */

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
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative"
      >
        <motion.div {...TopAnimation}>
          <div className="px-4 lg:px-12 text-center">
            <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 mb-8 text-midnight_text dark:text-white lg:mx-44">
              Reliable Radio Communication —
              <span className="text-primary">
                {" "}
                Tailored for Every Mission and Industry{" "}
              </span>
            </h2>
            <p className="text-18 leading-normal  text-muted dark:text-white dark:text-opacity-70 text-center lg:max-w-full sm:max-w-75%">
              We design and manufacture high-performance radio systems for
              defense, UAVs, and industrial automation. Each device is
              customizable, easy to integrate, and optimized for secure,
              real-time data, audio, and video transmission. Simple to deploy.
              Ready to scale.
            </p>
          </div>
        </motion.div>
        <div className="sm:mt-20 mt-10" />
        <div className=" w-full h-[400px] max-h-[400px]">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            rewind={true}
            loopAdditionalSlides={3}
            watchSlidesProgress
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {ProductItems.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div {...bottomAnimation(index)} viewport={{ once: true }} >
                  <Link
                    href={`/product-Item/${item.id}`}
                    rel="noopener noreferrer"
                  >
                    <div className="py-4">
                      <p className="lg:text-25 text-22 font-medium text-midnight_text dark:text-white">
                        {item.title}
                      </p>
                    </div>
                    <div className="h-12">
                      <p className="text-base text-muted dark:text-white dark:text-opacity-70">
                        {item.subTitle}
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
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-container">

          </div>


          <div className="swiper-buttons hidden md:block">
            <button className="left-btn swiper-button-prev absolute top-1/2 -translate-y-1/2 bg-white dark:bg-midnight_text p-0 rounded-md shadow" >
              {/* <ChevronLeft className="w-4 h-4 text-[#FF4C00] dark:text-[#00E5FF]" /> */}
              <Image
                src="/icon/left-icon.svg"
                alt="Left Icon"
                width={4}
                height={44}
                className="w-11 h-11 text-24 text-primary"
              />
            </button>
            <button className="right-btn swiper-button-next absolute -right-14 ht-0 top-1/2 -translate-y-1/2 bg-white dark:bg-midnight_text p-0 rounded-md shadow" >
              {/* <ChevronRight className="w-4 h-4 text-[#FF4C00] dark:text-[#00E5FF]" /> */}

              <Image
                src="/icon/right-icon.svg"
                alt="Right Icon"
                width={44}
                height={44}
                className="w-11 h-11 text-24 text-primary"
              />
            </button>
          </div>
        </div>
      </div>
    </section>


  );
};

export default Products;
