"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

type ModalProps = {
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isOpenModal) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }, [isOpenModal]);

  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const toggleCloseModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpenModal((prev) => !prev);
    }
  }

  return (
    <>
    <Button color={"blue"} size={"normal"} className="block" onClick={toggleModal}>test</Button>
      {isOpenModal && (
        <div className="fixed flex items-center justify-center inset-0 w-full h-full z-[100] bg-gray-700 bg-opacity-75" onClick={toggleCloseModal}>
          <div className="p-4 border border-gray-700 rounded bg-white">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
