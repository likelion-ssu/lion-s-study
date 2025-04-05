"use client";

import { create } from "zustand";

type ModalType = "login" | "logout" | null;

interface ModalState {
  openedModal: ModalType;
  openModal: (modal: Exclude<ModalType, null>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  openedModal: null,
  openModal: modal => set({ openedModal: modal }),
  closeModal: () => set({ openedModal: null })
}));
