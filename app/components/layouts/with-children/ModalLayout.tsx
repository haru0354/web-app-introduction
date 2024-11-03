"use client";

import { useEffect } from "react";
import Button from "../../ui/Button";
import useToggleModal from "../../hooks/useToggleModal";

type ModalLayoutProps = {
  buttonText: string;
  buttonColor?: "red" | "blue" | "gray" | "white" | "black";
  buttonSize?: "normal" | "small";
  width?: string;
  children: React.ReactNode;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  buttonText,
  buttonColor = "blue",
  buttonSize = "normal",
  width,
  children,
}) => {
  const { openModal, closeModal, isModalOpen } = useToggleModal();

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <Button
        color={buttonColor}
        size={buttonSize}
        className="block mx-auto"
        onClick={openModal}
      >
        {buttonText}
      </Button>
      {isModalOpen && (
        <div
          className="fixed flex items-center justify-center inset-0 w-full h-full z-[100] bg-customBlack bg-opacity-75"
          onClick={handleClose}
        >
          <div
            className={`max-h-[85vh] w-full ${
              width ? `max-w-[${width}px]` : "max-w-[500px]"
            } p-4 mx-2 border border-customBlack rounded bg-white overflow-y-auto`}
          >
            {children}
            <Button
              color="gray"
              size="normal"
              className="block mx-auto"
              onClick={closeModal}
            >
              キャンセル
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLayout;
