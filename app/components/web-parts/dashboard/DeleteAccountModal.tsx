"use client";

import { useState } from "react";

import Modal from "../Modal";
import FormDeleteAccount from "../../form/FormDeleteAccount";
import Button from "../../ui/button/Button";

type deleteAccountModalProps = {
  userId: string;
};

const DeleteAccountModal: React.FC<deleteAccountModalProps> = ({ userId }) => {
  const [modalContent, setModalContent] = useState<boolean>(true);

  const toggleModal = () => {
    setModalContent((prev) => !prev);
  };

  return (
    <Modal buttonText="アカウントの削除" buttonColor="red">
      {modalContent ? (
        <>
          <p className="text-center text-red-500">アカウントを削除しますか？</p>
          <p className="text-center">
            登録した「アプリ」と「アカウントデータ」が削除されます。
          </p>
          <p className="text-center">
            削除されたデータの復元をすることはできません。
          </p>
          <Button color="red" onClick={toggleModal} className="block mx-auto">
            削除する
          </Button>
        </>
      ) : (
        <FormDeleteAccount userId={userId} />
      )}
    </Modal>
  );
};

export default DeleteAccountModal;
