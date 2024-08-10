import { create } from 'zustand'
import { User } from '@/backend/types/user'


interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean)=>void;
  user: User | null;
  setUser: (user: User)=>void
}

export const useUserStore = create<UserState>()((set) => ({
  isLoggedIn: true,
  setIsLoggedIn: (value)=>set(()=>({isLoggedIn: value})),
  user: null,
  setUser: (user)=>set(()=>({user: user}))
}))