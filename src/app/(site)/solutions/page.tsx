"use client";

import SolutionsComponent from "@/components/Home/Solutions";
import type { Metadata } from "next";
import HeroSub from "@/components/SharedComponents/HeroSub";

const titles: Record<string, { title: string; description: string }> = {
  "defense-military": {
    title: "Defense Communication Radios | AES-256, Hopping, Long-Range",
    description:
      "Rugged, encrypted radios for tactical comms: AES-256, frequency hopping, long-range, low-latency links for soldiers, vehicles, UAVs, and base stations.",
  },
  "uav-drone": {
    title: "UAV Communication Links | Low-Latency, Long-Range Radio Modules",
    description:
      "High-bandwidth, low-latency links for UAV control, telemetry, and data. Compact modules offer frequency agility and dependable long-range connectivity.",
  },
  "industrial-automation": {
    title: "Industrial Automation Radios | Rugged, Reliable Data Links",
    description:
      "Reliable radio modules for industrial automation: robust performance in noisy environments, SCADA/PLC integration, high availability, and rugged design.",
  },
  "energy-utilities": {
    title: "Smart Metering Communications | Low-Power, Scalable Networks",
    description:
      "Low-power, scalable communications for utilities and smart metering. Secure data collection, extended battery life, and reliable grid-wide connectivity.",
  },
  "oem-solutions": {
    title: "Custom Radio Modules & OEM Solutions | Ethery Tech",
    description:
      "Custom radio modules and OEM solutions tailored to your specs: multi-band support, rapid prototyping, and end-to-end development from design to deployment.",
  },
};


const Solutions = () => {

  /**
   * 
   * Solutions Page
   */
  
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/solutions", text: "Solutions" },
  ];

  return (
    <main className="dark:bg-darkmode overflow-x-hidden">
      <HeroSub
        title="Solutions"
        description="Innovative solutions tailored to your unique challenges"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <SolutionsComponent />
    </main>
  );
};

export default Solutions;
