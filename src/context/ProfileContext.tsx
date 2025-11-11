import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { load, save } from '../utils/storage'
import { calculateAgeFromISODate, gradeFromAge } from '../utils/age'
import type { LearnerProfile, ProfileState } from '../types/profile'

type ProfileContextType = {
  profiles: LearnerProfile[]
  currentProfile: LearnerProfile | null
  addProfile: (p: Omit<LearnerProfile, 'id' | 'createdAt'>) => void
  selectProfile: (id: string) => void
  resetAll: () => void
  currentPlacement: { age: number | null; grade: number | null }
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)
const STORAGE_KEY = 'bakhryann.profiles'

export function ProfileProvider({ children }: { children: any }) {
  const [state, setState] = useState<ProfileState>(() =>
    load<ProfileState>(STORAGE_KEY, { profiles: [], currentProfileId: null })
  )

  useEffect(() => {
    save(STORAGE_KEY, state)
  }, [state])

  function safeRandomId(): string {
    try {
      // @ts-ignore
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        // @ts-ignore
        return crypto.randomUUID()
      }
    } catch {}
    const rnd = Math.random().toString(36).slice(2)
    return `id_${Date.now().toString(36)}_${rnd}`
  }

  const value = useMemo<ProfileContextType>(() => {
    const current = state.currentProfileId
      ? state.profiles.find(p => p.id === state.currentProfileId) || null
      : null
    const age = current ? calculateAgeFromISODate(current.dateOfBirth) : null
    const grade = current ? (current.grade ?? gradeFromAge(age)) ?? null : null
    return {
      profiles: state.profiles,
      currentProfile: current,
      currentPlacement: { age, grade },
      addProfile: (p) => {
        const id = safeRandomId()
        const newProfile: LearnerProfile = { ...p, id, createdAt: Date.now() }
        setState(s => ({
          profiles: [...s.profiles, newProfile],
          currentProfileId: id
        }))
      },
      selectProfile: (id: string) => {
        setState(s => ({ ...s, currentProfileId: id }))
      },
      resetAll: () => {
        setState({ profiles: [], currentProfileId: null })
      }
    }
  }, [state])

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfiles() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfiles must be used within ProfileProvider')
  return ctx
}


