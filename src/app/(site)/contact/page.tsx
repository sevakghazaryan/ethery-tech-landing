
import React, { Suspense } from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";
import BannerContact from "@/components/Contact/BannerContact";
import ContactMain from "@/components/Contact/ContactMain";

export const metadata: Metadata = {
  title: "Contact | Nicktio",
};

const Contact = () => {

  /**
   * 
   * Contact Page
   */

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <BannerContact />

      <Suspense fallback={<div className=""></div>}>
        <ContactMain />
      </Suspense>

    </>
  );
};

export default Contact;
