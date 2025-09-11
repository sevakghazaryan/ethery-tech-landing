"use client";

import React, { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const ModalDemo: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  /**
   *
   * Modal Demo
   */

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-darkmode rounded-lg p-6 w-80 shadow-lg text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✖
        </button>
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
        <div className="text-sm text-muted dark:text-white dark:text-opacity-70 ">
          {description}
        </div>
        <button
          onClick={onClose}
          className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalDemo;
