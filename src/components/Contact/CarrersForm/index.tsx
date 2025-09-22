"use client";

import React, { Fragment, useState, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import ModalDemo from "@/components/Modals/SuccesDemo";

const CareersForm = () => {
  /**
   * Careers Application Form Component with Validation
   */
  const [formData, setFormData] = useState({
    from_name: "",   
     form_email: "",
    role: "",
    cv: null as File | null,
    phone: "",
    linkedin: "",
    note: "",
    consent: false,
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate current field while typing
    const errorMessage = validateField(name, fieldValue);
    setErrors((prev) => {
      if (errorMessage) {
        return { ...prev, [name]: errorMessage };
      } else {
        const { [name]: removed, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cv: "File size must be under 10MB" }));
      setCvFile(null);
    } else {
      setCvFile(file);
      setErrors((prev) => {
        const { cv, ...rest } = prev;
        return rest;
      });
      setFormData((prev) => ({ ...prev, cv: file })); // sync with formData
    }
  };

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "from_name":
        if (!value.trim()) return "Full Name is required";
        return "";
      case "form_email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email";
        return "";
      case "role":
        if (!value.trim()) return "Role / Department of Interest is required";
        return "";
      case "consent":
        if (!value) return "You must agree to be contacted";
        return "";
      default:
        return "";
    }
  };



  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      const errorMessage = validateField(key, value);
      if (errorMessage) newErrors[key] = errorMessage;
    });

    if (!cvFile) newErrors.cv = "Upload CV is required";
    else if (cvFile.size > 10 * 1024 * 1024) {
      newErrors.cv = "File size must be under 10MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }


    setLoading(true);
    setSuccess("");

    try {
      // Note: EmailJS cannot upload files directly.
      // Normally you would use a backend or cloud storage to handle the CV upload.
      // For demo purposes, we just send formData without the file.
      const result = await emailjs.send(
        "service_cp8yeeo", // Service ID
        "template_6mqe3m6", // Template ID  
        {
          ...formData,
          cvFileName: cvFile?.name || "No file attached",
        },
        "pCvOyJF65oD7cM4kw" // Public Key
      );

      if (result.status === 200) {
        setSuccess("✅ Application submitted successfully!");
        setFormData({
          from_name: "",
          form_email: "",
          role: "",
          cv: null,
          phone: "",
          linkedin: "",
          note: "",
          consent: false,
        });
        setCvFile(null);
        setErrors({});
      }

      setModalOpen(true);
    } catch (err) {
      setSuccess("❌ Failed to send application. Try again later.");
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
              <h2 className="max-w-72 text-40 font-bold mb-9">Careers</h2>
              <form
                className="flex flex-wrap w-full m-auto justify-between"
                onSubmit={handleSubmit}
              >
                {/* Full Name */}
                <div className="mx-0 my-2.5 w-full">
                  <label
                    htmlFor="from_name"
                    className="pb-3 inline-block text-17"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${errors.from_name ? "border-red-500" : "border-border"
                      } dark:border-dark_border dark:text-white dark:bg-transparent`}
                  />
                  {errors.from_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.from_name}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="mx-0 my-2.5 w-full">
                  <label
                    htmlFor="form_email"
                    className="pb-3 inline-block text-17"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="form_email"
                    value={formData.form_email}
                    onChange={handleChange}
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${errors.form_email ? "border-red-500" : "border-border"
                      } dark:border-dark_border dark:text-white dark:bg-transparent`}
                  />
                  {errors.form_email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.form_email}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="mx-0 my-2.5 w-full">
                  <label htmlFor="role" className="pb-3 inline-block text-17">
                    Role / Department of Interest*
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full text-17 px-4 py-2.5 rounded-lg border ${errors.role ? "border-red-500" : "border-border"
                      } dark:border-dark_border dark:text-white dark:bg-transparent`}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                {/* CV Upload */}
                <div className="mx-0 my-2.5 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CV Attachment <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="cv-upload"
                      type="file"
                      name="cv"
                      // onChange={handleChange}

                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="cv-upload"
                      className={`flex items-center justify-center w-full px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition 
                  ${errors.cv
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-gray-300 hover:border-purple-500 text-gray-600"
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 12h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 12h-4m0 0V4m0 12l-4-4m4 4l4-4"
                        />
                      </svg>
                      <span>
                        {formData.cv ? formData.cv.name : "Upload your CV"}
                      </span>
                    </label>
                  </div>

                  {errors.cv && (
                    <p className="text-red-500 text-sm mt-2">{errors.cv}</p>
                  )}
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
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent"
                  />
                </div>

                {/* LinkedIn (Optional) */}
                <div className="mx-0 my-2.5 w-full">
                  <label
                    htmlFor="linkedin"
                    className="pb-3 inline-block text-17"
                  >
                    LinkedIn / Portfolio link (optional)
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent"
                  />
                </div>

                {/* Message (Optional) */}
                <div className="mx-0 my-2.5 w-full">
                  <label
                    htmlFor="note"
                    className="pb-3 inline-block text-17"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    name="note"
                    rows={5}
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent"
                  ></textarea>
                </div>

                {/* Consent */}
                <div className="mx-0 my-2.5 w-full flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={`w-5 h-5 rounded border ${errors.consent ? "border-red-500" : "border-border"
                      }`}
                  />
                  <label htmlFor="consent" className="text-17">
                    I agree to be contacted about my application.*
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
                )}

                {/* Submit */}
                <div className="mx-0 my-2.5 w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
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
        description={"Thank you for reaching out! We’ve received your message and will get back to you as soon as possible. 🎉"}
      />
    </Fragment>
  );
};


export default CareersForm;
