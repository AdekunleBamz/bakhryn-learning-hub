import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfiles } from '../context/ProfileContext'

function ProfileNew() {
  const { addProfile } = useProfiles()
  const nav = useNavigate()
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [grade, setGrade] = useState<number | ''>('')
  const [favoriteColor, setFavoriteColor] = useState('#7c4dff')

  const canSave = fullName.trim().length >= 2 && !!dateOfBirth

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSave) return
    addProfile({
      fullName: fullName.trim(),
      dateOfBirth,
      grade: grade === '' ? undefined : Number(grade),
      favoriteColor,
    })
    nav('/')
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
        <h1 style={{ margin: 0, color: '#3b247a' }}>Who is learning?</h1>
        <p style={{ color: '#5b5b6d' }}>Create a learner profile. We’ll use this to personalize age-appropriate content.</p>
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="fullName" style={{ fontWeight: 700, color: '#4b3a9b' }}>Full Name</label>
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Ada Lovelace"
              style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 600 }}
            />
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="dob" style={{ fontWeight: 700, color: '#4b3a9b' }}>Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 600 }}
            />
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="grade" style={{ fontWeight: 700, color: '#4b3a9b' }}>Grade (optional)</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value ? Number(e.target.value) : '')}
              style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 600 }}
            >
              <option value="">Select grade</option>
              {Array.from({ length: 8 }, (_, i) => i + 1).map(g => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="color" style={{ fontWeight: 700, color: '#4b3a9b' }}>Favorite Color (optional)</label>
            <input
              id="color"
              type="color"
              value={favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value)}
              style={{ width: 64, height: 36, borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)' }}
              />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn primary" disabled={!canSave} type="submit">✅ Save profile</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ProfileNew

