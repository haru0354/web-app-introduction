import { createContext, useState } from "react";

type ModalContextType = {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalCloseContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalCloseContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalCloseContext.Provider>
  );
};

export { ModalProvider, ModalCloseContext };
