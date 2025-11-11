export type LearnerProfile = {
  id: string
  fullName: string
  dateOfBirth: string // ISO yyyy-mm-dd
  grade?: number
  favoriteColor?: string
  createdAt: number
}

export type ProfileState = {
  profiles: LearnerProfile[]
  currentProfileId: string | null
}


