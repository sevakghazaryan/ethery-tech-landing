"use client";

import React, { Fragment, useState, useRef } from "react";
import Image from "next/image";
import ModalDemo from "@/components/Modals/SuccesDemo";

const CareersForm = () => {
  /**
   * Careers Application Form Component with Validation
   */
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
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

  const [modalOpen, setModalOpen] = useState(false);

  const [statusMsg, setStatusMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
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
      setFormData((p) => ({ ...p, cv: null }));
    } else {
      setCvFile(file);
      setFormData((prev) => ({ ...prev, cv: file }));
      setErrors((prev) => {
        const { cv, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "from_name":
        if (!String(value).trim()) return "Full Name is required";
        return "";
      case "from_email":
        if (!String(value).trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(String(value))) return "Enter a valid email";
        return "";
      case "role":
        if (!String(value).trim()) return "Role / Department of Interest is required";
        return "";
      case "consent":
        if (!value) return "You must agree to be contacted";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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
    setStatusMsg(null);

    if (!validateForm()) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append("from_name", formData.from_name);
      body.append("from_email", formData.from_email);
      body.append("role", formData.role);
      if (cvFile) body.append("cv", cvFile, cvFile.name);
      body.append("phone", formData.phone || "");
      body.append("linkedin", formData.linkedin || "");
      body.append("note", formData.note || "");
      body.append("consent", formData.consent ? "1" : "0");
      body.append("website", ""); // honeypot

      const res = await fetch("https://ethery.tech/api/send-careers.php", {
        method: "POST",
        body,
      });

      // Parse response (JSON preferred, else text)
      const isJson = (res.headers.get("content-type") || "").includes("application/json");
      const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");

      if (!res.ok) {
        const msg =
            (payload && typeof payload === "object" && (payload.message || payload.error)) ||
            (typeof payload === "string" && payload) ||
            "Failed to send application";
        throw new Error(String(msg));
      }

      // Success
      setStatusMsg({ type: "ok", text: "Application submitted successfully!" });
      setFormData({
        from_name: "",
        from_email: "",
        role: "",
        cv: null,
        phone: "",
        linkedin: "",
        note: "",
        consent: false,
      });
      setCvFile(null);
      setErrors({});
      setModalOpen(true);
    } catch (err: any) {
      // Error: show inline error text and DO NOT open success modal
      const msg = err?.message || "Failed to send application. Try again later.";
      setStatusMsg({ type: "err", text: msg });
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });

      // If you prefer an error modal, uncomment below and pass a different modal component/title/description
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
                  <div className="mx-0 my-2.5 w-full">
                    <label htmlFor="from_name" className="pb-3 inline-block text-17">
                      Full Name*
                    </label>
                    <input
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                            errors.from_name ? "border-red-500" : "border-border"
                        } dark:border-dark_border dark:text-white dark:bg-transparent`}
                    />
                    {errors.from_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.from_name}</p>
                    )}
                  </div>
                  <div className="mx-0 my-2.5 w-full">
                    <label htmlFor="from_email" className="pb-3 inline-block text-17">
                      Email*
                    </label>
                    <input
                        type="email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                            errors.from_email ? "border-red-500" : "border-border"
                        } dark:border-dark_border dark:text-white dark:bg-transparent`}
                    />
                    {errors.from_email && (
                        <p className="text-red-500 text-sm mt-1">{errors.from_email}</p>
                    )}
                  </div>
                  <div className="mx-0 my-2.5 w-full">
                    <label htmlFor="role" className="pb-3 inline-block text-17">
                      Role / Department of Interest*
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`w-full text-17 px-4 py-2.5 rounded-lg border ${
                            errors.role ? "border-red-500" : "border-border"
                        } dark:border-dark_border dark:text-white dark:bg-transparent`}
                    />
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                  </div>
                  <div className="mx-0 my-2.5 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CV Attachment <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                          id="cv-upload"
                          type="file"
                          name="cv"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleFileChange}
                          className="hidden"
                      />
                      <label
                          htmlFor="cv-upload"
                          className={`flex items-center justify-center w-full px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition 
                        ${errors.cv ? "border-red-500 bg-red-50 text-red-600" : "border-gray-300 hover:border-purple-500 text-gray-600"}`}
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
                        <span>{formData.cv ? formData.cv.name : "Upload your CV"}</span>
                      </label>
                    </div>
                    {errors.cv && <p className="text-red-500 text-sm mt-2">{errors.cv}</p>}
                  </div>
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
                  <div className="mx-0 my-2.5 w-full">
                    <label htmlFor="linkedin" className="pb-3 inline-block text-17">
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
                  <div className="mx-0 my-2.5 w-full">
                    <label htmlFor="note" className="pb-3 inline-block text-17">
                      Message (optional)
                    </label>
                    <textarea
                        name="note"
                        rows={5}
                        value={formData.note}
                        onChange={handleChange}
                        className="w-full text-17 px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent"
                    />
                  </div>
                  <div className="mx-0 my-2.5 w-full flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className={`w-5 h-5 rounded border ${errors.consent ? "border-red-500" : "border-border"}`}
                    />
                    <label htmlFor="consent" className="text-17">
                      I agree to be contacted about my application.*
                    </label>
                  </div>
                  {errors.consent && (
                      <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
                  )}
                  <div className="mx-0 my-2.5 w-full">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>
                    {statusMsg && (
                        <p className={`mt-3 text-sm ${statusMsg.type === "ok" ? "text-green-600" : "text-red-600" }`}>
                          {statusMsg.text}
                        </p>
                    )}
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
        {/* Success Modal */}
        <ModalDemo
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Success!"
            description={
              "Thank you for reaching out! We’ve received your message and will get back to you as soon as possible. 🎉"
            }
        />
      </Fragment>
  );
};

export default CareersForm;
