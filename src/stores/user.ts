import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { UserProfile } from '../types'

interface UserState {
  user: UserProfile | null
  setUser: (val: any) => void
}
export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user: UserProfile) => set({ user })
    }),
    { name: 'user' }
  )
)
