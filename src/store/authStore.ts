import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserResponse } from '@/types/user.types'

interface AuthState {
  accessToken:     string | null
  user:            UserResponse | null
  isAuthenticated: boolean
  setAuth:  (token: string, user: UserResponse) => void
  setUser:  (user: UserResponse) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken:     null,
      user:            null,
      isAuthenticated: false,
      setAuth:  (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
      setUser:  (user)              => set({ user }),
      clearAuth: ()                 => set({ accessToken: null, user: null, isAuthenticated: false }),
    }),
    { name: 'urp-auth', storage: createJSONStorage(() => localStorage) }
  )
)
