import { useState } from 'react'
import { speakText } from '../utils/tts'
import DinoCelebrate from './DinoCelebrate'

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
  const [celebrateEnd, setCelebrateEnd] = useState(false)

  const numAnswered = Object.values(answers).filter(v => v !== null).length
  const score = questions.reduce((acc, q) => {
    const selected = answers[q.id]
    if (selected === q.correctIndex) return acc + 1
    return acc
  }, 0)

  function selectAnswer(qid: string, idx: number) {
    if (showResults) return
    setAnswers(prev => {
      if (prev[qid] !== null) return prev // prevent changing selection
      return { ...prev, [qid]: idx }
    })
  }

  function reset() {
    setAnswers(Object.fromEntries(questions.map(q => [q.id, null])))
    setShowResults(false)
    setCelebrateEnd(false)
  }

  return (
    <section className="card" style={{ padding: 12 }}>
      <h3 style={{ marginTop: 0, color: '#3b247a' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {questions.map((q, qi) => {
          const selected = answers[q.id]
          return (
            <div key={q.id} className="exercise-question" style={{ display: 'grid', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ fontWeight: 800, color: '#4b3a9b', fontSize: 14, whiteSpace: 'nowrap' }}>
                  {qi + 1}.
                </div>
                <div style={{ fontWeight: 700, color: '#4b3a9b', fontSize: 14 }}>
                  {q.prompt}
                </div>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                {q.choices.map((choice, idx) => {
                  const active = selected === idx
                  const isChoiceCorrect = showResults && idx === q.correctIndex
                  const isChoiceWrong = showResults && active && idx !== q.correctIndex
                  let bg = '#ffffff'
                  let color = '#3b247a'
                  if (isChoiceCorrect) {
                    bg = '#e6f7ea'
                    color = '#0a8f08'
                  } else if (isChoiceWrong) {
                    bg = '#fdecea'
                    color = '#e53935'
                  } else if (active) {
                    bg = '#f1edff'
                  }
                  return (
                    <button
                      key={idx}
                      className="btn"
                      style={{
                        textAlign: 'left',
                        background: bg,
                        color,
                        justifyContent: 'flex-start' as const,
                        padding: '6px 8px',
                        borderRadius: 10,
                        fontSize: 13,
                        lineHeight: 1.2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                      onClick={() => selectAnswer(q.id, idx)}
                      aria-pressed={active}
                      disabled={selected !== null || showResults}
                    >
                      <span style={{ width: 16, display: 'inline-block', textAlign: 'center' }}>
                        {showResults
                          ? (isChoiceCorrect ? '✓' : (isChoiceWrong ? '✗' : ''))
                          : (active ? '✓' : String.fromCharCode(65 + idx))}
                      </span>
                      <span>{choice}</span>
                    </button>
                  )
                })}
              </div>
              {showResults && q.explanation && (
                <div style={{ color: '#5b5b6d', fontSize: 12 }}>
                  Hint: {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
        <button
          className="btn primary"
          onClick={() => {
            setShowResults(true)
            const pass = score >= 8
            setCelebrateEnd(pass)
            if (pass) {
              speakText(`Well done, champ! You scored ${score} out of ${questions.length}.`)
            } else {
              speakText(`You scored ${score} out of ${questions.length}. Pass mark is eight. Please reset and try again.`)
            }
          }}
          disabled={numAnswered < questions.length}
        >
          ✅ Check answers
        </button>
        <button className="btn" onClick={reset}>🔄 Try again</button>
        {showResults && (
          <>
            <span style={{ fontWeight: 800, color: score >= 8 ? '#0a8f08' : '#e53935' }}>
              Score: {score} / {questions.length} {score >= 8 ? '(Pass)' : '(Try again)'}
            </span>
            {celebrateEnd && <DinoCelebrate />}
          </>
        )}
      </div>
    </section>
  )
}

export default Exercises

