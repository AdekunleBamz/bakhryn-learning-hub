import { useEffect, useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import Instructor from '../components/Instructor'
import AgeGradeSelector from '../components/AgeGradeSelector'
import SubjectCard from '../components/SubjectCard'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useProfiles } from '../context/ProfileContext'

function Home() {
  const nav = useNavigate()
  const { currentProfile, currentPlacement } = useProfiles()
  const [age, setAge] = useState(currentPlacement.age ?? 7)
  const [grade, setGrade] = useState(currentPlacement.grade ?? 2)

  useEffect(() => {
    if (!currentProfile) {
      nav('/profile/new')
      return
    }
    setAge(currentPlacement.age ?? 7)
    setGrade(currentPlacement.grade ?? 2)
  }, [currentProfile, currentPlacement.age, currentPlacement.grade, nav])
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <AnimatedBackground />
      <div className="grid" style={{ position: 'relative', zIndex: 1 }}>
        <motion.section
          className="card"
          style={{ gridColumn: 'span 12', padding: 16 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 style={{ margin: 0, color: '#3b247a' }}>Welcome to BakhryAnn Learning Hub</h1>
          <p style={{ marginTop: 8, color: '#5b5b6d' }}>Colorful, fun, and smart learning for ages 5–14 (Grades 1–8)</p>
        </motion.section>

        <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
          <Instructor name="Coach Zizi" color="#7c4dff" intro="Hello, superstar! I’m Coach Zizi. Pick your age and grade, then choose a subject. Let’s learn with fun music and colors!" />
        </section>

        <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
          <AgeGradeSelector
            age={age}
            grade={grade}
            onChange={({ age: a, grade: g }) => { setAge(a); setGrade(g); }}
          />
        </section>

        <section style={{ gridColumn: 'span 12' }}>
          <div className="grid">
            <div style={{ gridColumn: 'span 12' }}>
              <h2 style={{ color: '#3b247a', margin: '8px 0' }}>Pick a subject</h2>
            </div>
            <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(240px, 1fr) )', gap: 16 }}>
              <SubjectCard to="/lessons/spelling" title="Spelling" emoji="🔤" colorFrom="#7c4dff" colorTo="#40c4ff" />
              <SubjectCard to="/lessons/math" title="Mathematics" emoji="➗" colorFrom="#ff4081" colorTo="#ffd740" />
              <SubjectCard to="/lessons/verbal" title="Verbal Reasoning" emoji="🧠" colorFrom="#40c4ff" colorTo="#7c4dff" />
              <SubjectCard to="/lessons/quant" title="Quantitative" emoji="🔢" colorFrom="#ffd740" colorTo="#ff4081" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home

