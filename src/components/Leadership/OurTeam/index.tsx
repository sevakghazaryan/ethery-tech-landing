"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    id: "greg-brown",
    name: "Greg Brown",
    role: "Chairman and Chief Executive Officer",
    image: "/images/leadership/greg-brown.png",
  },
  {
    id: "jack-molloy",
    name: "Jack Molloy",
    role: "Executive Vice President and Chief Operating Officer",
    image: "/images/leadership/jack-molloy.png",
  },
  {
    id: "kathi-moore",
    name: "Kathi Moore",
    role: "Senior Vice President, Human Resources",
    image: "/images/leadership/kathi-moore.png",
  },
  {
    id: "rajan-naik",
    name: "Rajan Naik",
    role: "Senior Vice President, Strategy & Ventures",
    image: "/images/leadership/rajan-naik.png",
  },
];

const OurTeamComponent: FC = () => {

  /**
   * 
   * Our Team Component Hooks.
   */


  return (
    <section
      className="flex flex-wrap justify-center md:pt-20 pt-8 lg:pb-24 pb-10 dark:bg-darkmode"
      id="team"
    >
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <h4 className="text-midnight_text text-40 relative font-bold dark:text-white text-center">
          Meet Our Team
        </h4>
        <div className="mt-20" />

        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              href={`/leadership/${member.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden text-center p-6 transition-transform duration-200 group-hover:scale-105 cursor-pointer">
                <div className="w-28 h-28 mx-auto relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeamComponent;
