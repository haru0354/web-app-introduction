"use client";

import { useEffect, useState } from "react";
import Button from "../../ui/Button";

type ModalProps = {
  buttonColor: "red" | "blue" | "gray" | "white";
  buttonText: string;
  buttonSize?: "normal" | "small";
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  buttonColor,
  buttonText,
  children,
  buttonSize,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isModalOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
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
  };

  return (
    <>
      <Button
        color={buttonColor}
        size={buttonSize}
        className="block mx-auto"
        onClick={toggleModalOpen}
      >
        {buttonText}
      </Button>
      {isModalOpen && (
        <div
          className="fixed flex items-center justify-center inset-0 w-full h-full z-[100] bg-gray-700 bg-opacity-75"
          onClick={toggleModalClose}
        >
          <div className="max-h-[80vh] p-4 border border-gray-700 rounded bg-white overflow-y-auto">
            {children}
            <Button
              color="gray"
              size="normal"
              className="block mx-auto"
              onClick={toggleModalOpen}
            >
              キャンセル
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
