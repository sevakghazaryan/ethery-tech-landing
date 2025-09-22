"use client";

import React, { Fragment, useState, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import ModalDemo from "@/components/Modals/SuccesDemo";

const ContactForm = () => {
  /**
   * Contact Form Component with Validation
   */

  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    title: "",
    work_email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const interestOptions = [
    "Integrated Radio Systems",
    "UAV Radio Modules",
    "Industrial Radios",
    "Repeaters",
    "Smart Metering",
    "OEM Solutions",
  ];

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };


 const validateForm = () => {
  let newErrors: { [key: string]: string } = {};

  if (!formData.full_name.trim())
    newErrors.full_name = "Full Name is required";

  if (!formData.company.trim())
    newErrors.company = "Company is required";

  if (!formData.work_email.trim()) {
    newErrors.work_email = "Work Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.work_email)) {
    newErrors.work_email = "Enter a valid email";
  }

  if (!formData.interest.trim())
    newErrors.interest = "Select at least one area of interest";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const validateField = (name: string, value: any) => {
  switch (name) {
    case "full_name":
      if (!value.trim()) return "Full Name is required";
      return null;
    case "company":
      if (!value.trim()) return "Company is required";
      return null;
    case "work_email":
      if (!value.trim()) return "Work Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email";
      return null;
    case "interest":
      if (!value.trim()) return "Select at least one area of interest";
      return null;
    default:
      return null;
  }
};



const handleInterestSelect = (item: string) => {
  setFormData((prev) => ({ ...prev, interest: item }));
  setErrors((prev) => {
    const newErrors = { ...prev };
    const errorMessage = validateField("interest", item);
    if (errorMessage) {
      newErrors.interest = errorMessage;
    } else {
      delete newErrors.interest;
    }
    return newErrors;
  });
  setOpen(false);
};
 


const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
  const { name, value } = e.target;

  setFormData((prev) => ({ ...prev, [name]: value }));

  const errorMessage = validateField(name, value);

  setErrors((prev) => {
    const newErrors = { ...prev };
    if (errorMessage) {
      newErrors[name] = errorMessage; 
    } else {
      delete newErrors[name];
    }
    return newErrors;
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setLoading(true);
    setSuccess("");

    if (loading) {
    }

    if (success) {
    }

    try {
      const result = await emailjs.send(
        "service_cp8yeeo", // Service ID
        "template_aby5rdu", // Template ID for DEMO
        formData,
        "pCvOyJF65oD7cM4kw" // Public Key
      );

      if (result.status === 200) {
        setErrors({});
        setSuccess(
          "Thank you for your request! Our team will contact you shortly to schedule your demo. 🎉"
        );
        setFormData({
          full_name: "",
          company: "",
          title: "",
          work_email: "",
          phone: "",
          interest: "",
          message: "",
        });
      }

      setModalOpen(true);
    } catch (err) {
      setSuccess("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section ref={sectionRef} className="dark:bg-darkmode pb-24">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
            <div className="col-span-6">
              <h2 className="max-w-72 text-40 font-bold mb-9">
                Request Demo
              </h2>
              <form
                className="flex flex-wrap w-full m-auto justify-between"
                onSubmit={handleSubmit}
              >
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="full_name"
                      className="pb-3 inline-block text-17"
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className={`w-full text-17 px-4 py-2.5 rounded-lg border ${errors.full_name ? "border-red-500" : "border-border"
                        } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                    />
               

                    {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="company"
                      className="pb-3 inline-block text-17"
                    >
                      Company*
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full text-17 px-4 py-2.5 rounded-lg border ${errors.company ? "border-red-500" : "border-border"
                        } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="title"
                      className="pb-3 inline-block text-17"
                    >
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0"
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="work_email"
                      className="pb-3 inline-block text-17"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      name="work_email"
                      value={formData.work_email}
                      onChange={handleChange}
                      className={`w-full text-17 px-4 py-2.5 rounded-lg border ${errors.work_email ? "border-red-500" : "border-border"
                        } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                    />
          

                    {errors.work_email && <p className="text-red-500 text-sm mt-1">{errors.work_email}</p>}
                  </div>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="phone" className="pb-3 inline-block text-17">
                    Phone number (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0"
                  />
                </div>
                <div className="mx-0 my-2.5 w-full relative">
                  <label className="pb-3 inline-block text-17">
                    Area of Interest*
                  </label>
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border ${errors.interest ? "border-red-500" : "border-border"
                      } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                  >
                    {formData.interest ? formData.interest : "Select option"}
                  </button>

                  {/* Dropdown menu */}
                  {open && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-darkmode border border-border dark:border-dark_border rounded-lg shadow-lg max-h-56 overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {interestOptions.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => handleInterestSelect(item)}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${formData.interest === item
                            ? "bg-gray-200 dark:bg-gray-600"
                            : ""
                            }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* {errors.interest && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.interest}
                    </p>
                  )} */}

                  {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest}</p>}
                </div>

                {/* Message */}
                <div className="mx-0 my-2.5 w-full">
                  <label
                    htmlFor="message"
                    className="pb-3 inline-block text-17"
                  >
                    Message / Notes
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your needs or project…"
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="mx-0 my-2.5 w-full">
                  <button
                    type="submit"
                    className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700"
                  >
                    {loading ? "Sending..." : "Request Demo"}
                  </button>
                </div>
              </form>
            </div>
            <div className="col-span-6">
              <Image
                src="/images/contact-page/contact.jpg"
                alt="Contact"
                width={1300}
                height={0}
                quality={100}
                style={{ width: "100%", height: "auto" }}
                className="bg-no-repeat bg-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <ModalDemo
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Success!"
        description="Thank you for your request! Our team will contact you shortly to schedule your demo. 🎉"
      />
    </Fragment>
  );
};

export default ContactForm;
