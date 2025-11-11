import { useMemo, useState } from 'react'
import Instructor from '../components/Instructor'
import { speakText } from '../utils/tts'
import Exercises from '../components/Exercises'
import NinjaScene from '../components/scenes/NinjaScene'

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateProblem() {
  const a = randomInt(1, 9)
  const b = randomInt(1, 9)
  const ops = ['+', '-', '×'] as const
  const op = ops[randomInt(0, ops.length - 1)]
  const question = `${a} ${op} ${b}`
  const answer = op === '+' ? a + b : op === '-' ? a - b : a * b
  return { question, answer }
}

function MathLesson() {
  const [seed, setSeed] = useState(0)
  const [practiceCount, setPracticeCount] = useState(0)
  const { question, answer } = useMemo(() => generateProblem(), [seed])
  const [input, setInput] = useState('')
  const correct = String(answer) === input.trim()

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section style={{ gridColumn: 'span 12' }}>
        <NinjaScene variant="random" />
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
        <Instructor name="Mr Bamzz" color="#40c4ff" intro="Welcome to Mathematics! I'm Mr Bamzz. Solve 20 practice problems, then your exercises will unlock." />
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16, display: 'grid', gap: 12 }}>
        <h2 style={{ margin: 0, color: '#3b247a' }}>Solve</h2>
        <div style={{ fontSize: 40, fontWeight: 800, color: '#4b3a9b' }}>{question}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => speakText(`What is ${question}?`)}>🔊 Read problem</button>
          <input
            aria-label="answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer"
            style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 700, width: 140 }}
          />
          <button className="btn" onClick={() => { setSeed(seed + 1); setPracticeCount(practiceCount + 1); setInput('') }}>➡️ Next</button>
          {input.length > 0 && (
            <span style={{ fontWeight: 700, color: correct ? '#0a8f08' : '#e53935' }}>
              {correct ? 'Correct! 🎉' : 'Try again'}
            </span>
          )}
        </div>
        <div style={{ marginTop: 6, fontWeight: 700, color: '#5b5b6d' }}>
          Practice progress: {Math.min(practiceCount, 20)} / 20
        </div>
      </section>
      {practiceCount >= 20 && (
        <section style={{ gridColumn: 'span 12' }}>
          <Exercises
            title="Math Practice"
            questions={[
              { id: 'm1', prompt: 'What is 3 + 4?', choices: ['6', '7', '8'], correctIndex: 1 },
              { id: 'm2', prompt: 'What is 9 − 5?', choices: ['5', '3', '4'], correctIndex: 2 },
              { id: 'm3', prompt: 'What is 3 × 3?', choices: ['6', '8', '9'], correctIndex: 2 },
              { id: 'm4', prompt: 'What is 8 − 2?', choices: ['5', '6', '7'], correctIndex: 1 },
              { id: 'm5', prompt: 'What is 5 + 6?', choices: ['10', '11', '12'], correctIndex: 1 },
              { id: 'm6', prompt: 'What is 2 × 4?', choices: ['6', '8', '10'], correctIndex: 1 },
              { id: 'm7', prompt: 'What is 12 − 7?', choices: ['6', '5', '4'], correctIndex: 1 },
              { id: 'm8', prompt: 'What is 7 + 5?', choices: ['11', '12', '13'], correctIndex: 1 },
              { id: 'm9', prompt: 'What is 4 × 3?', choices: ['12', '9', '6'], correctIndex: 0 },
              { id: 'm10', prompt: 'What is 15 − 9?', choices: ['5', '6', '7'], correctIndex: 1 },
            ]}
          />
        </section>
      )}
    </div>
  )
}

export default MathLesson

