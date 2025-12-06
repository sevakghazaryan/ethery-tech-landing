
import React, { Suspense } from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata } from "@/utils/seo";
import { Metadata } from "next";
import BannerContact from "@/components/Contact/BannerContact";
import ContactMain from "@/components/Contact/ContactMain";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Ethery Tech",
  description: "Get in touch with Ethery Tech for inquiries about our secure radio communication systems, request a demo, career opportunities, or technical support. We're here to help with your communication needs.",
  keywords: [
    "contact ethery tech",
    "radio communication inquiry",
    "request demo",
    "technical support",
    "sales inquiry",
    "partner with ethery tech",
  ],
  canonicalPath: "/contact/",
  ogImage: "https://ethery.tech/images/contact-page/contact.webp",
});

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
