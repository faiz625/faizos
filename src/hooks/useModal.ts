import { useState } from "react";

export interface ModalState {
  open: boolean;
  title: string;
  content: string;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const openModal = (title: string, content: string) => {
    setModalState({ open: true, title, content });
  };

  const closeModal = () => {
    setModalState(null);
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};