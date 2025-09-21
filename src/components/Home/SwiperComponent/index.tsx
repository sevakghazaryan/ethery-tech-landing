
"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ProductItems } from "@/app/api/data";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



const SwiperComponent = () => {


    /**
     * 
     * 
     * Swiper Component Hooks.
     */


    const ref = useRef(null);
    const inView = useInView(ref);



    const bottomAnimation = (index: any) => ({
        initial: { y: "100%", opacity: 0 },
        animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
        transition: { duration: 1, delay: 0.4 + index * 0.4 },
    });


    return (
        <div className="sm:mt-20 mt-10 w-full">
            <Swiper

                modules={[Navigation, Pagination]}

                pagination={{ clickable: true }}

                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                loop={true}
                observer={true}
                observeParents={true}
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
                        <motion.div {...bottomAnimation(index)}>
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

            {/* <div className="swiper-pagination flex justify-center"></div> */}

            {/* <div className="my-swiper-pagination flex justify-center mt-6"></div> */}

            {/* <div className="swiper-pagination" slot="pagination"></div> */}

            {/* <div className="custom-swiper-pagination flex justify-center mt-6"></div> */}

            <div className="swiper-buttons hidden md:block">
                <button className="left-btn swiper-button-prev absolute top-1/2 -translate-y-1/2 bg-white dark:bg-midnight_text p-6 rounded-md shadow" >
                    <ChevronLeft className="w-4 h-4 text-[#FF4C00] dark:text-[#00E5FF]" />
                </button>
                <button className="right-btn swiper-button-next absolute -right-14 ht-0 top-1/2 -translate-y-1/2 bg-white dark:bg-midnight_text p-6 rounded-md shadow" >
                    <ChevronRight className="w-4 h-4 text-[#FF4C00] dark:text-[#00E5FF]" />
                </button>
            </div>
        </div>
    )
};


export default SwiperComponent;