"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import ModalDemo from "@/components/Modals/SuccesDemo";

const ContactForm = () => {
  /**
   * Contact Form Component with Validation
   */

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    jobTitle: "",
    email: "",
    phone: "",
    interests: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const interestsOptions = [
    "Integrated Radio Systems",
    "UAV Radio Modules",
    "Industrial Radios",
    "Repeaters",
    "Smart Metering",
    "OEM Solutions",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestSelect = (item: string) => {
    setFormData((prev) => ({ ...prev, interests: item }));
    setOpen(false); 
  };

  const handleCheckboxChange = (item: string) => {
    setFormData((prev: any) => {
      const exists = prev.interests.includes(item);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i: string) => i !== item)
          : [...prev.interests, item],
      };
    });
  };

  // const handleCheckboxChange = (interest: string) => {
  //   setFormData((prev) => {
  //     const exists = prev.interests.includes(interest);
  //     return {
  //       ...prev,
  //       interests: exists
  //         ? prev.interests.filter((i) => i !== interest)
  //         : [...prev.interests, interest],
  //     };
  //   });
  // };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (formData.interests.length === 0)
      newErrors.interests = "Select at least one area of interest";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     console.log("Form submitted successfully ✅", formData);
  //     alert("Form submitted successfully!");
  //     setFormData({
  //       fullName: "",
  //       company: "",
  //       jobTitle: "",
  //       email: "",
  //       phone: "",
  //       interests: "",
  //       message: "",
  //     });
  //     setErrors({});
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");

    try {
      const result = await emailjs.send(
        process.env.PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.DEMO_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        setErrors({});
        setSuccess(
          "Thank you for your request! Our team will contact you shortly to schedule your demo. 🎉"
        );
        setFormData({
          fullName: "",
          company: "",
          jobTitle: "",
          email: "",
          phone: "",
          interests: "",
          message: "",
        });
      }

      setModalOpen(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setSuccess("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="dark:bg-darkmode pb-24">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
            <div className="col-span-6">
              <h2 className="max-w-72 text-40 font-bold mb-9">
                {/* Get Online Consultation */}
                Request Demo
              </h2>
              <form
                className="flex flex-wrap w-full m-auto justify-between"
                onSubmit={handleSubmit}
              >
                <div className="sm:flex gap-3 w-full">
                  {/* Full Name */}
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="fullName"
                      className="pb-3 inline-block text-17"
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                        errors.fullName ? "border-red-500" : "border-border"
                      } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  {/* Company */}
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
                      className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                        errors.company ? "border-red-500" : "border-border"
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
                  {/* Job Title / Role */}
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="jobTitle"
                      className="pb-3 inline-block text-17"
                    >
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0"
                    />
                  </div>
                  {/* Work Email */}
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="email"
                      className="pb-3 inline-block text-17"
                    >
                      Work Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-border"
                      } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                {/* Phone Number */}
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

                {/* Area of Interest */}
                {/* Area of Interest */}
                <div className="mx-0 my-2.5 w-full relative">
                  <label className="pb-3 inline-block text-17">
                    Area of Interest*
                  </label>

                  {/* Dropdown button */}
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border ${
                      errors.interests ? "border-red-500" : "border-border"
                    } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                  >
                    {formData.interests ? formData.interests : "Select option"}
                  </button>

                  {/* Dropdown menu */}
                  {open && (
                    <div
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-darkmode border border-border dark:border-dark_border rounded-lg shadow-lg max-h-56 overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {interestsOptions.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => handleInterestSelect(item)}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            formData.interests === item
                              ? "bg-gray-200 dark:bg-gray-600"
                              : ""
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.interests && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.interests}
                    </p>
                  )}
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
                    Make an appointment
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

      {/*  */}

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
