import { create } from 'zustand'
import { User } from '@/backend/types/user'


interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User)=>void
}

export const useUserStore = create<UserState>()((set) => ({
  isLoggedIn: false,
  user: null,
  setUser: (user)=>set(state=>({user: user}))
}))