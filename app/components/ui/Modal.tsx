"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

type ModalProps = {
  buttonText: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ buttonText, children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isModalOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }, [isModalOpen]);

  const toggleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleModalClose = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen((prev) => !prev);
    }
  }

  return (
    <>
    <Button color="blue" size="normal" className="block" onClick={toggleModalOpen}>{buttonText}</Button>
      {isModalOpen && (
        <div className="fixed flex items-center justify-center inset-0 w-full h-full z-[100] bg-gray-700 bg-opacity-75" onClick={toggleModalClose}>
          <div className="p-4 border border-gray-700 rounded bg-white">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
