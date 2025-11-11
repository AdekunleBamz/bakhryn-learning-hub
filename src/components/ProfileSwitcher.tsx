import { useProfiles } from '../context/ProfileContext'
import { calculateAgeFromISODate } from '../utils/age'
import { Link } from 'react-router-dom'

function ProfileSwitcher() {
  const { profiles, currentProfile, selectProfile } = useProfiles()
  if (profiles.length === 0) {
    return <Link to="/profile/new" className="btn" style={{ textDecoration: 'none' }}>➕ Add learner</Link>
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <div style={{ fontWeight: 700, color: '#4b3a9b' }}>
        Welcome{currentProfile ? `, ${currentProfile.fullName.split(' ')[0]}!` : '!'}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {profiles.map(p => {
          const age = calculateAgeFromISODate(p.dateOfBirth)
          const active = currentProfile?.id === p.id
          return (
            <button
              key={p.id}
              className="btn"
              onClick={() => selectProfile(p.id)}
              aria-pressed={active}
              style={{
                background: active ? 'linear-gradient(135deg, var(--bg-1), var(--bg-2))' : '#fff',
                color: active ? '#fff' : '#4b3a9b',
                padding: '6px 10px',
                borderRadius: 999,
              }}
            >
              {p.fullName} {age !== null ? `(${age})` : ''}
            </button>
          )
        })}
        <Link to="/profile/new" className="btn" style={{ textDecoration: 'none' }}>➕ New</Link>
      </div>
    </div>
  )
}

export default ProfileSwitcher

