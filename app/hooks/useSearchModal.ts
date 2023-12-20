import { create } from 'zustand';

interface SearchModalStore {
  isOpen: boolean;
  stepNumber: number;
  onOpen: (stepNumber?: number) => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  stepNumber: 0,
  onOpen: (stepNumber) => {
    set({ isOpen: true, stepNumber })
  },
  onClose: () => set({ isOpen: false, stepNumber: 0})
}));


export default useSearchModal;
