"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import ModalDemo from "@/components/Modals/SuccesDemo";

const CarrersForm = () => {
  /**
   * Carrers Form Component with Validation
   */

  const [formData, setFormData] = useState({
    full_name: "",
    work_email: "",
    subject: "",
    message: "",
    company: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full Name is required";
    if (!formData.work_email.trim()) {
      newErrors.work_email = "Work Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.work_email)) {
      newErrors.work_email = "Enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");

    try {
      const result = await emailjs.send(
        "service_cp8yeeo", // Service ID
        "template_aby5rdu", // Template ID
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
          work_email: "",
          subject: "",
          message: "",
          company: "",
          phone: "",
      
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
      <section className="dark:bg-darkmode pb-24">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
            <div className="col-span-6">
              <h2 className="max-w-72 text-40 font-bold mb-9">Careers</h2>
              <form
                className="flex flex-wrap w-full m-auto justify-between"
                onSubmit={handleSubmit}
              >
                {/* Full Name */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="full_name" className="pb-3 inline-block text-17">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                      errors.full_name ? "border-red-500" : "border-border"
                    } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="work_email" className="pb-3 inline-block text-17">
                    Work Email*
                  </label>
                  <input
                    type="email"
                    name="work_email"
                    value={formData.work_email}
                    onChange={handleChange}
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                      errors.work_email ? "border-red-500" : "border-border"
                    } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                  />
                  {errors.work_email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.work_email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="subject" className="pb-3 inline-block text-17">
                    Subject*
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    placeholder="a short text field about what the request is about"
                    onChange={handleChange}
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                      errors.subject ? "border-red-500" : "border-border"
                    } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="message" className="pb-3 inline-block text-17">
                    Message*
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your needs... "
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-border"
                    } dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="sm:flex gap-3 w-full">
   {/* Company (Optional) */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="company" className="pb-3 inline-block text-17">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0"
                  />
                </div>

                {/* Phone (Optional) */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="phone" className="pb-3 inline-block text-17">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-500 focus:border-primary focus:outline-0"
                  />
                </div>
                </div>
             

               

                {/* Submit */}
                <div className="mx-0 my-2.5 w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "👉 Send Message"}
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

      {/* Modal */}
      <ModalDemo
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Success!"
        description={"Application submitted successfully. We’ll contact you if we move forward with your profile․ 🎉"}
      />
    </Fragment>
  );
};

export default CarrersForm;
