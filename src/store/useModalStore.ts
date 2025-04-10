import { create } from "zustand";
interface ModalStore {
  content: React.ReactNode | null;
  isOpen: boolean;
  open: (content: React.ReactNode) => void;
  close: () => void;
  onBackdropClick?: (() => void) | null;
}
export const useModalStore = create<ModalStore>(set => ({
  content: null,
  isOpen: false,
  open: content => set({ isOpen: true, content }),
  close: () => set({ isOpen: false }),
  onBackdropClick: () => set({ isOpen: false })
}));
