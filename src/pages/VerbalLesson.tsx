import { useMemo, useState } from 'react'
import Instructor from '../components/Instructor'
import { speakText } from '../utils/tts'
import Exercises from '../components/Exercises'

const QUESTIONS = [
  { q: 'Find the opposite of big.', a: 'small' },
  { q: 'Find the synonym of happy.', a: 'joyful' },
  { q: 'Which word is a noun: run, apple, quickly?', a: 'apple' },
]

function VerbalLesson() {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const item = useMemo(() => QUESTIONS[index % QUESTIONS.length], [index])
  const correct = input.trim().toLowerCase() === item.a

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
        <Instructor name="Prof. Lexi" color="#7c4dff" intro="Welcome to Verbal Reasoning! Listen to the question and type your answer." />
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16, display: 'grid', gap: 12 }}>
        <h2 style={{ margin: 0, color: '#3b247a' }}>Question</h2>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#4b3a9b' }}>{item.q}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => speakText(item.q)}>🔊 Read question</button>
          <input
            aria-label="answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type answer"
            style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)', fontWeight: 700, minWidth: 180 }}
          />
          <button className="btn" onClick={() => setIndex(index + 1)}>➡️ Next</button>
          {input.length > 0 && (
            <span style={{ fontWeight: 700, color: correct ? '#0a8f08' : '#e53935' }}>
              {correct ? 'Correct! 🎉' : 'Not quite'}
            </span>
          )}
        </div>
      </section>
      <Exercises
        title="Verbal Reasoning Practice"
        questions={[
          { id: 'v1', prompt: 'Opposite of hot?', choices: ['cold', 'warm', 'heat'], correctIndex: 0 },
          { id: 'v2', prompt: 'Synonym of quick?', choices: ['slow', 'rapid', 'late'], correctIndex: 1 },
          { id: 'v3', prompt: 'Pick a noun.', choices: ['run', 'apple', 'quickly'], correctIndex: 1 },
          { id: 'v4', prompt: 'Opposite of up?', choices: ['over', 'under', 'across'], correctIndex: 1 },
          { id: 'v5', prompt: 'Synonym of small?', choices: ['tiny', 'huge', 'giant'], correctIndex: 0 },
          { id: 'v6', prompt: 'Pick a verb.', choices: ['jump', 'sky', 'blue'], correctIndex: 0 },
          { id: 'v7', prompt: 'Opposite of day?', choices: ['light', 'night', 'sun'], correctIndex: 1 },
          { id: 'v8', prompt: 'Synonym of happy?', choices: ['sad', 'joyful', 'angry'], correctIndex: 1 },
          { id: 'v9', prompt: 'Pick an adjective.', choices: ['run', 'red', 'music'], correctIndex: 1 },
          { id: 'v10', prompt: 'Plural of child?', choices: ['childs', 'children', 'childes'], correctIndex: 1 },
        ]}
      />
    </div>
  )
}

export default VerbalLesson

