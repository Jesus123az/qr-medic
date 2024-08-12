import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from '@/backend/types/user'



interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean)=>void;
  user: User | null;
  setUser: (user: User | null)=>void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      // isAdmin: false,
      // setIsAdmin: (value: boolean) => set({ isAdmin: value }),
      setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      setUser: (newUser: User | null) => set({ user: newUser }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);