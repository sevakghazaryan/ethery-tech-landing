"use client";

import React, { Fragment, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ContactInfo from "../ContactInfo";
import ContactForm from "../Form";
import CareersForm from "../CarrersForm";
import EmailForm from "../EmailForm";

const ContactMain = () => {
  /**
   * Contact Main Component Hooks and variables.
   * Handles which form to display based on user interaction or URL query params.
   */

  const [openForm, setOpenForm] = useState<"demo" | "careers" | "email">(
    "demo"
  );

  const formSectionRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();

  const formFromQuery = searchParams.get("form") as
    | "demo"
    | "careers"
    | "email"
    | null;

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (formFromQuery) {
      setOpenForm(formFromQuery);
      scrollToForm();
      scrollToElement(formFromQuery);
    }
  }, [formFromQuery]);

  const scrollToElement = (id: string, offset: number = -120) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const handleOpenEmailForm = () => {
    setOpenForm("email");
    scrollToForm();
    scrollToElement("email");
  };

  const handleOpenCarrersForm = () => {
    setOpenForm("careers");
    scrollToForm();
    scrollToElement("careers");
  };

  const handleOpenDemoForm = () => {
    setOpenForm("demo");
    scrollToForm();
    scrollToElement("demo");
  };

  return (
    <Fragment>
      <ContactInfo
        handleCarrers={handleOpenCarrersForm}
        handleDemo={handleOpenDemoForm}
        handleEmail={handleOpenEmailForm}
      />

      <div className="relative min-h-[300px]">
        <div ref={formSectionRef} className=" pt-24">
          {openForm === "demo" && <ContactForm />}
          {openForm === "careers" && <CareersForm />}
          {openForm === "email" && <EmailForm />}
        </div>
      </div>
    </Fragment>
  );
};

export default ContactMain;
