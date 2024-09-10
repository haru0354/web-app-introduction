import { useContext } from "react";
import { ModalCloseContext } from "../context/ModalContext";

const useToggleModal = () => {
  const context = useContext(ModalCloseContext);
  if (context === undefined) {
    throw new Error("useModalCloseはModalProvider内で使用してください。");
  }
  return context;
};

export default useToggleModal;
