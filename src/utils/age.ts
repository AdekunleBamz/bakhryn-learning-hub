export function calculateAgeFromISODate(dateIso: string): number | null {
  if (!dateIso) return null
  const dob = new Date(dateIso)
  if (isNaN(dob.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export function gradeFromAge(age: number | null): number | null {
  if (age === null || age < 5) return null
  const g = age - 4
  if (g < 1) return 1
  if (g > 8) return 8
  return g
}


