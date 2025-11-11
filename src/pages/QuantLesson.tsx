import { useEffect, useMemo, useState } from 'react'
import Instructor from '../components/Instructor'
import { speakText } from '../utils/tts'
import Exercises from '../components/Exercises'
import NinjaScene from '../components/scenes/NinjaScene'
import { useNavigate } from 'react-router-dom'
import { useProfiles } from '../context/ProfileContext'

type Pattern = { sequence: number[]; answer: number }

function generatePattern(): Pattern {
  // Simple arithmetic sequence for demo, e.g., +2
  const start = Math.floor(Math.random() * 6) + 1
  const step = Math.floor(Math.random() * 4) + 1
  const seq = [start, start + step, start + 2 * step, start + 3 * step]
  return { sequence: seq, answer: start + 4 * step }
}

function QuantLesson() {
  const nav = useNavigate()
  const { currentProfile } = useProfiles()
  useEffect(() => {
    if (!currentProfile) nav('/profile/new')
  }, [currentProfile, nav])
  const [seed, setSeed] = useState(0)
  const [input, setInput] = useState('')
  const p = useMemo(() => generatePattern(), [seed])
  const correct = Number(input) === p.answer
  const [practiceCount, setPracticeCount] = useState(0)

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section style={{ gridColumn: 'span 12' }}>
        <NinjaScene variant="random" pool={['naruto','sakura','sasuke','boruto','sarada']} />
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
        <Instructor name="Captain Q" color="#ffd740" intro="Welcome to Quantitative Reasoning! Find the next number in the pattern." />
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16, display: 'grid', gap: 12 }}>
        <h2 style={{ margin: 0, color: '#3b247a' }}>Continue the pattern</h2>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#4b3a9b' }}>
          {p.sequence.join(' , ')} , <span style={{ opacity: 0.4 }}>?</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => speakText(`What number comes next: ${p.sequence.join(', ')}?`)}>🔊 Read pattern</button>
          <input
            aria-label="answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer"
            style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 700, width: 140 }}
          />
          <button className="btn" onClick={() => { setSeed(seed + 1); setPracticeCount(p => p + 1); setInput('') }}>➡️ Next</button>
          {input.length > 0 && (
            <span style={{ fontWeight: 700, color: correct ? '#0a8f08' : '#e53935' }}>
              {correct ? 'Correct! 🎉' : 'Try again'}
            </span>
          )}
        </div>
      </section>
      <div style={{ gridColumn: 'span 12', fontWeight: 700, color: '#5b5b6d' }}>
        Practice progress: {Math.min(practiceCount, 10)} / 10
      </div>
      {practiceCount >= 10 && (
        <section style={{ gridColumn: 'span 12' }}>
          <Exercises
            title="Quantitative Reasoning Practice"
            questions={[
              { id: 'q1', prompt: 'Complete: 2, 4, 6, ?', choices: ['7', '8', '10'], correctIndex: 1 },
              { id: 'q2', prompt: 'Complete: 5, 10, 15, ?', choices: ['20', '25', '30'], correctIndex: 0 },
              { id: 'q3', prompt: 'Complete: 1, 3, 5, ?', choices: ['6', '7', '9'], correctIndex: 1 },
              { id: 'q4', prompt: 'Complete: 9, 7, 5, ?', choices: ['3', '4', '2'], correctIndex: 0 },
              { id: 'q5', prompt: 'Complete: 2, 5, 8, ?', choices: ['9', '10', '11'], correctIndex: 1 },
              { id: 'q6', prompt: 'Complete: 3, 6, 12, ?', choices: ['14', '18', '24'], correctIndex: 1 },
              { id: 'q7', prompt: 'Complete: 20, 18, 16, ?', choices: ['14', '15', '13'], correctIndex: 0 },
              { id: 'q8', prompt: 'Complete: 4, 9, 14, ?', choices: ['18', '19', '20'], correctIndex: 1 },
              { id: 'q9', prompt: 'Complete: 7, 14, 21, ?', choices: ['27', '28', '30'], correctIndex: 1 },
              { id: 'q10', prompt: 'Complete: 10, 9, 8, ?', choices: ['7', '6', '5'], correctIndex: 0 },
            ]}
          />
        </section>
      )}
    </div>
  )
}

export default QuantLesson

