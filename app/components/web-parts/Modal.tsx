"use client";

import { ModalProvider } from "@/app/context/ModalContext";
import ModalLayout from "../layouts/with-children/ModalLayout";

type ModalProps = {
  buttonColor?: "red" | "blue" | "gray" | "white" | "black";
  buttonText: string;
  buttonSize?: "normal" | "small";
  width?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  buttonColor,
  buttonText,
  buttonSize,
  width,
  children,
}) => {
  return (
    <ModalProvider>
      <ModalLayout
        buttonColor={buttonColor}
        buttonText={buttonText}
        buttonSize={buttonSize}
        width={width}
      >
        {children}
      </ModalLayout>
    </ModalProvider>
  );
};

export default Modal;
