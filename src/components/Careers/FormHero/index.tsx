"use client";

import React, { Fragment, useState } from "react";
import ModalApplay from "@/components/Modals/SuccesApplay";
import emailjs from "@emailjs/browser";

interface FormHeroProps {
  onCancel?: () => void;
}

const FormHero = ({ onCancel }: FormHeroProps) => {
  /**
   * Form Hero Component with Validation
   */

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    note: "",
    cv: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Clear error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.from_name.trim())
      newErrors.name = "Name & Surname is required.";
    if (!formData.from_email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.cv) newErrors.cv = "Please upload your CV.";
    if (formData.cv && formData.cv.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cv: "CV file is too large. Max 5MB." }));
      setLoading(false);
      return;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    if (loading) {
    }

    try {
      const form = document.getElementById("apply-form") as HTMLFormElement;

      await emailjs.sendForm(
        "service_cp8yeeo", // Service ID
        "template_6mqe3m6", // Template ID for Apply to Join
        form, // HTML form element
        "pCvOyJF65oD7cM4kw" // Public Key
      );

      setFormData({
        from_name: "",
        from_email: "",
        phone: "",
        note: "",
        cv: null,
      });
      setModalOpen(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="max-w-lg mx-auto p-8 bg-white dark:bg-darkmode rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Applay for Join
        </h2>
        <form id="apply-form" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name, Surname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.from_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 ring-red-300"
                  : "focus:ring-purple-500"
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.from_email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 ring-red-300"
                  : "focus:ring-purple-500"
              }`}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 ring-red-300"
                  : "focus:ring-purple-500"
              }`}
              placeholder="+1 234 567 890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (Optional)
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write something..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CV Attachment <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="cv-upload"
                type="file"
                name="cv"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="cv-upload"
                className={`flex items-center justify-center w-full px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition 
                  ${
                    errors.cv
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
                <span>{formData.cv ? formData.cv.name : "Upload your CV"}</span>
              </label>
            </div>

            {errors.cv && (
              <p className="text-red-500 text-sm mt-2">{errors.cv}</p>
            )}
          </div>
          <div className="pt-4 flex justify-between text-center">
            <button
              className="lg:text-17 flex gap-4 items-center bg-gray-300 text-gray-700 py-2 px-4 lg:py-3 lg:px-8 rounded-lg mt-12 border border-gray-300 hover:bg-gray-400"
              onClick={() => onCancel && onCancel()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="lg:text-17 flex gap-4 items-center bg-primary text-white py-2 px-4 lg:py-3 lg:px-8 rounded-lg mt-12 border border-primary hover:text-primary hover:bg-transparent"
            >
              Send for Request
            </button>
          </div>
        </form>
      </div>
      <ModalApplay
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Success!"
        description="Thank you for submitting your application. Our HR team will carefully review your CV and get back to you if your profile matches our current opportunities."
      />
    </Fragment>
  );
};

export default FormHero;
