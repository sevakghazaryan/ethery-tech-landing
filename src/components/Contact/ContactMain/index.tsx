"use client";

import React, { Fragment, useState, useRef } from "react";
import ContactInfo from "../ContactInfo";
import ContactForm from "../Form";
import CarrersForm from "../CarrersForm";
import EmaillForm from "../EmailForm";
import { motion, AnimatePresence } from "framer-motion";

const ContactMain = () => {
  /**
   * Contact Main Hooks.
   */
  const [openForm, setOpenForm] = useState<"demo" | "careers" | "email">("demo");

    const formSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const scrollToElement = (id: string, offset: number = -120) => {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.scrollY + offset;
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

      <div className="relative min-h-[300px] mt-6">
        {/* <AnimatePresence mode="wait">
          {openForm === "demo" && (
           
              <ContactForm />
            
          )}

          {openForm === "careers" && (
            
              <CarrersForm />
         
          )}

          {openForm === "email" && (
            
              <EmaillForm />
           
          )}
        </AnimatePresence> */}


         <div ref={formSectionRef} >
        {openForm === "demo" && <ContactForm />}
        {openForm === "careers" && <CarrersForm />}
        {openForm === "email" && <EmaillForm />}
      </div>
      </div>
    </Fragment>
  );
};

export default ContactMain;
