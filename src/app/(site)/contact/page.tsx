

import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React, { useState } from "react";
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
      />
      {/*  */}
      <BannerContact />
      {/*  */}
      <ContactMain />

    
      {/* <Location /> */}
    </>
  );
};

export default Contact;
