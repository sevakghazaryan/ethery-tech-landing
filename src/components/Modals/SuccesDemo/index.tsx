//

// components/Modal.tsx
"use client";
import React, { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description? : string;
  children?: ReactNode;
}

const ModalDemo: FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {

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
        <div className="text-sm text-gray-700 dark:text-gray-300">{description}</div>
        <button
          onClick={onClose}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalDemo;
