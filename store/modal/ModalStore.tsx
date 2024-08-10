import { create } from 'zustand'


interface ModalState {
  showSignUpModal: boolean;
  showSignInModal: boolean;
  setShowSignInModal: (value: boolean)=>void;
  setShowSignUpModal: (value: boolean)=>void;

}

export const useModalStore = create<ModalState>()((set) => ({
  showSignInModal: false,
  showSignUpModal: false,
  setShowSignInModal: (value)=>set(()=>({showSignInModal: value})),
  setShowSignUpModal: (value)=>set(()=>({showSignUpModal: value})),
}))