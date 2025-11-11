type ChoiceQuestion = {
  id: string
  prompt: string
  choices: string[]
  correctIndex: number
  explanation?: string
}

type ExercisesProps = {
  title?: string
  questions: ChoiceQuestion[]
}

function Exercises({ title = 'Practice Exercises', questions }: ExercisesProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(questions.map(q => [q.id, null])),
  )
  const [showResults, setShowResults] = useState(false)

  const numAnswered = Object.values(answers).filter(v => v !== null).length
  const score = questions.reduce((acc, q) => {
    const selected = answers[q.id]
    if (selected === q.correctIndex) return acc + 1
    return acc
  }, 0)

  function selectAnswer(qid: string, idx: number) {
    setAnswers(prev => ({ ...prev, [qid]: idx }))
  }

  function reset() {
    setAnswers(Object.fromEntries(questions.map(q => [q.id, null])))
    setShowResults(false)
  }

  return (
    <section className="card" style={{ padding: 16 }}>
      <h3 style={{ marginTop: 0, color: '#3b247a' }}>{title}</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {questions.map((q, qi) => {
          const selected = answers[q.id]
          const isCorrect = selected !== null && selected === q.correctIndex
          const isWrong = selected !== null && selected !== q.correctIndex
          return (
            <div key={q.id} className="exercise-question" style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontWeight: 700, color: '#4b3a9b' }}>
                {qi + 1}. {q.prompt}
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {q.choices.map((choice, idx) => {
                  const active = selected === idx
                  let bg = '#ffffff'
                  let color = '#3b247a'
                  if (showResults && idx === q.correctIndex) {
                    bg = '#e6f7ea'
                    color = '#0a8f08'
                  } else if (showResults && active && idx !== q.correctIndex) {
                    bg = '#fdecea'
                    color = '#e53935'
                  } else if (active) {
                    bg = '#f1edff'
                  }
                  return (
                    <button
                      key={idx}
                      className="btn"
                      style={{ textAlign: 'left', background: bg, color, justifyContent: 'flex-start' as const }}
                      onClick={() => selectAnswer(q.id, idx)}
                      aria-pressed={active}
                    >
                      {String.fromCharCode(65 + idx)}. {choice}
                    </button>
                  )
                })}
              </div>
              {showResults && q.explanation && (
                <div style={{ color: '#5b5b6d' }}>
                  Hint: {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
        <button className="btn primary" onClick={() => setShowResults(true)} disabled={numAnswered < questions.length}>
          ✅ Check answers
        </button>
        <button className="btn" onClick={reset}>🔄 Try again</button>
        {showResults && (
          <span style={{ fontWeight: 800, color: score === questions.length ? '#0a8f08' : '#3b247a' }}>
            Score: {score} / {questions.length}
          </span>
        )}
      </div>
    </section>
  )
}

import { useState } from 'react'
export default Exercises

