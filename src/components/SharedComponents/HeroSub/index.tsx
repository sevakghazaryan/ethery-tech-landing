import React, { FC } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbLink } from "@/types/breadcrumb";

interface HeroSubProps {
  title: string;
  description: string;
  breadcrumbLinks: BreadcrumbLink[];
  isBrodcurb: boolean;
}

const HeroSub: FC<HeroSubProps> = ({ title, breadcrumbLinks, isBrodcurb }) => {

  /**
   * 
   * Hero Sub Hooks.
   */

  return (
    <section className="text-center bg-cover pt-36 pb-20 relative dark:bg-darkmode overflow-x-hidden">
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-search"></div>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-1 flex justify-between">
        <h2 className="text-midnight_text text-left text-28 md:text-40 relative font-bold dark:text-white w-[70%] break-words leading-tight">
          {title}
        </h2>
        <div className="hidden xl:block mr-32">
          {isBrodcurb ? (
            <Breadcrumb links={breadcrumbLinks} />
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSub;
