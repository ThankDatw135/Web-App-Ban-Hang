import { create } from 'zustand';

interface UIState {
  // Modal state
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  
  // Toast notifications
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  
  // Actions
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isModalOpen: false,
  modalContent: null,
  toast: {
    show: false,
    message: '',
    type: 'info',
  },
  isMobileMenuOpen: false,

  // Modal actions
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),

  // Toast actions
  showToast: (message, type) => {
    set({ toast: { show: true, message, type } });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      set((state) => ({ toast: { ...state.toast, show: false } }));
    }, 3000);
  },
  hideToast: () => set((state) => ({ toast: { ...state.toast, show: false } })),

  // Mobile menu actions
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
