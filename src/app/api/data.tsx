import { link } from "fs";
import { url } from "inspector";

// home page data
export const ProductItems = [
  {
    id: "et-101",
    image: "/images/products/product.webp",
    title: "ET 101",
    details: "Telemetry and control for UAVc",
  },
  {
    id: "et-102",
    image: "/images/products/product.webp",
    title: "ET 102",
    details: "Telemetry and control for UAVc",
  },
  {
    id: "et-103",
    image: "/images/products/product.webp",
    title: "ET 103",
    details: "Telemetry and control for UAVc",
  },
  {
    id: "et-104",
    image: "/images/products/product.webp",
    title: "ET 104",
    details: "Telemetry and control for UAVc",
  },
  {
    id: "et-105",
    image: "/images/products/product.webp",
    title: "ET 105",
    details: "Telemetry and control for UAVc",
  },
  {
    id: "et-106",
    image: "/images/products/product.webp",
    title: "ET 106",
    details: "Telemetry and control for UAVc",
  },
];

export const SolutionsItems = [
  {
    id: "defense-military",
    image: "/images/solutions/high-angle-view-computer-chip.webp",
    title: "Defense & Military",
    subTitle: "(EtheryNet)",
    link: "https://etherynet.com/product/et-101/",
    details:
      "Secure and rugged radio systems for mission-critical communication, including tactical handheld radios and encrypted base stations.",
  },
  {
    id: "uav-drone",
    image:
      "/images/solutions/mq9-reaper-predator-uav-drone-us-military-most-advanced-military-drone.webp",
    title: "Unmanned Aerial Vehicles (UAVs)",
    subTitle: "(400Mhz small radio)",
    link: "https://etherynet.com/product/et-102/",
    details:
      "Real-time telemetry, control, and HD data transfer for drones and autonomous systems with long-range, lightweight radio modules.",
  },
  {
    id: "industrial-automation",
    image:
      "/images/solutions/man-electrical-technician-working-switchboard-with-fuses-uses-tablet.webp",
    title: "Industrial Automation",
    subTitle: "(cc radio)",
    link: "https://etherynet.com/product/et-103/",
    details:
      " Reliable wireless communication for industrial machines, control systems, and IoT-based automation with minimal latency and high durability.",
  },
  {
    id: "energy-utilities",
    image:
      "/images/solutions/digital-electric-meters-row-measuring-power-use.webp",
    title: "Energy & Utilities / Smart Metering",
    subTitle: "(cc radio ENA)",
    link: "https://etherynet.com/product/et-104/",
    details:
      "Radio modules optimized for remote data collection from electricity meters, grid infrastructure monitoring, and smart energy systems.",
  },
  {
    id: "oem-solutions",
    image:
      "/images/solutions/soldiers-special-forces-wars-desertthailand-peoplearmy-soldier-use-laptop-see-map-with-satelliteusing-radio-communication-military-operation.webp",
    title: "Custom Applications / OEM Solutions ",
    subTitle: "(3 band radio) or new eval board",
    link: "https://etherynet.com/product/et-105/",
    details:
      "Stop wasteful spend and save thousands with unlimited points and insights that maximize savings.",
  },
];
 
export const ProductSections = [
  {
    title: "Integrated Radio Systems",
    description:
      "Tactical Communication System is built to meet the highest standards of reliability, mobility, and security. Whether deployed in the field or integrated into command infrastructure, this modular system ensures seamless coordination across units, assets, and environments",
    image: "/images/products/product.webp",
    slice: [0, 2], 
    reverse: false,
  },
  {
    title: "UAV Radio Modules",
    description:
      "Designed specifically for unmanned aerial systems, this module supports real-time telemetry, control, and HD video transmission. Its lightweight and energy-efficient design makes it ideal for long-endurance drone operations and precise flight control",
    image: "/images/products/product.webp",
    slice: [0, 3],
    reverse: true,
  },
  {
    title: "Industrial Radios",
    description:
      "Built for industrial automation and machine-to-machine systems, this module delivers low-latency, robust communication even in the most demanding environments. It offers high configurability, making it suitable for smart factories and remote control applications",
    image: "/images/products/product.webp",
    slice: [0, 2],
    reverse: false,
  },

  {
    title: "Repeaters ",
    description:
      "Repeater devices seamlessly expand wireless coverage, enhance signal reliability, and deliver stable connections throughout large or complex environments",
    image: "/images/products/product.webp",
    slice: [0, 4],
    reverse: true,
  },
  {
    title: "Smart Metering",
    description:
      "This module is tailored for remote reporting of electricity and utility meter data. It supports long-range, low-power communication and is ideal for integration into smart energy systems and grid monitoring infrastructure",
    image: "/images/products/product.webp",
    slice: [0, 1],
    reverse: false,
  },

  {
    title: "OEM Solutions ",
    description:
      "A powerful, dual-frequency radio solution designed for developers and integrators who need flexibility across various applications. With full software configurability and wide-band support, it’s suitable for hybrid systems, advanced UAVs, and mobile surveillance platforms.",
    image: "/images/products/product.webp",
    slice: [0, 4],
    reverse: true,
  },

];

// Beneifit
export const BeneifitImage = [
  {
    image:
      "/images/solutions/digital-electric-meters-row-measuring-power-use.webp",
    alt: "Trusted brand",
    details:
      "Stop wasteful spend and save thousands with unlimited points and insights that maximize savings.",
  },
  {
    image: "/images/benefit/contact.svg",
    alt: "Trusted brand",
    details: "See where the company money is going in real time.",
  },
  {
    image: "/images/benefit/bank.svg",
    alt: "Trusted brand",
    details: "Powered by the free app that helps you run your whole business.",
  },
  {
    image: "/images/benefit/files.svg",
    alt: "Trusted brand",
    details: "No more lost receipts and tedious paperwork.",
  },
  {
    image: "/images/benefit/setting.svg",
    alt: "Trusted brand",
    details:
      "It's an all-digital card designed for online, and even in-store shopping.",
  },
];

// footer data

export const companyLinks = [
  {
    link: "About Us",
    href: "/about",
  },
  {
    link: "Careers",
    href: "/careers",
  },
   {
    link: "Leadership",
    href: "/leadership",
  },
];

export const featureLinks = [
  {
    link: "Home",
    href: "/",
  },
  {
    link: "Products",
    href: "/products",
  },
  {
    link: "Solutions",
    href: "/solutions",
  },
  {
    link: "Contact Us",
    href: "/contact",
  },
];

export const supportLink = [
   {
    link: "Contact Us",
    href: "/",
  },
  {
    link: "Request Demo",
    href: "/",
  },
]

export const SolutionsLink = [

  {
    link: "Defense & Military",
    href: "/",
  },
  {
    link: "Unmanned Aerial Vehicles (UAVs)",
    href: "/",
  },
  {
    link: "Industrial Automation",
    href: "/",
  },
  {
    link: "Energy & Utilities / Smart Metering",
    href: "/",
  },
  {
    link: "Custom Applications / OEM Solutions",
    href: "/",
  },
]

export const address = "221b Baker St, London NW1 6XE, United Kingdom";
export const phone = "+1 (123) 123 1234";
export const email = "info@mobileapp.com";
export const copyright = "© Copyright 2025. All rights reserved";
export const facebook = "https://www.facebook.com/";
export const twitter = "https://www.twitter.com/";
export const linkedin = "https://www.linkedin.com/";

export const aboutPerks = [
  {
    title: "Built for Critical Operations",
    text: "UAVs, tactical missions, and industrial systems demand stability - we deliver it.",
  },
  {
    title: "Reliable, Secure, and Lightweight",
    text: "Our radios are portable, rugged, and ready for harsh conditions with minimal training.",
  },
  {
    title: "Customized to Your Environment",
    text: "We tailor hardware, software, and protocols to match your exact safety requirements.",
  },
];

export const careersPerks = [
  {
    title: "Experience Optional, Motivation Required",
    text: " We value passion, curiosity, and a willingness to learn over formal credentials.",
  },
  {
    title: "Inclusive & Mission-Driven Hiring",
    text: " Our hiring is part of a broader social mission - to open opportunities for all.",
  },
  {
    title: "Grow With Purpose",
    text: " You won’t just have a job - you’ll build skills, make impact, and shape the future of communication tech.",
  },
];

export const productPerks = [
  {
    title: "Base Station Unit",
    text: " Secure, rugged coordination hub for fixed deployment and communication routing.",
  },
  {
    title: "Handheld Radio",
    text: "Portable, lightweight, and designed for mobility during tactical operations.",
  },
  {
    title: "Control Software Suite",
    text: "Intuitive UI for system setup, real-time monitoring, and encrypted network management.",
  },
];

export const productKeyFeaturePerks = [
  "End-to-end encryption",
  "Long-range secure radio links",
  "Minimal training required",
  "Flexible across mission types",
];

// review
export const review = [
  {
    text: "It's easy to set up and the support experience is unparalleled. every transaction the instant it happens and correct wasteful behavior. What a relief.",
    name: "Nina B. Freeman",
    post: "Founder at Litchi Care",
    image: "/images/search/profile.png",
    appstorerating: "4.5",
    gplayrating: "4.5",
  },
];
