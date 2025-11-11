import { useState } from 'react'
import Instructor from '../components/Instructor'
import { speakText, speakSpelledThenPronounced } from '../utils/tts'
import Exercises from '../components/Exercises'

const WORDS = ['apple', 'sun', 'book', 'happy', 'music']

function SpellingLesson() {
  const [index, setIndex] = useState(0)
  const word = WORDS[index]
  const say = (t: string) => speakText(t)

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16 }}>
        <Instructor name="Miss Abee" color="#ff4081" intro="Welcome to Spelling! Tap the sound to hear the word. Then spell it out loud!" />
      </section>
      <section className="card" style={{ gridColumn: 'span 12', padding: 16, display: 'grid', gap: 12 }}>
        <h2 style={{ margin: 0, color: '#3b247a' }}>Spell this word</h2>
        <div style={{ fontSize: 40, fontWeight: 800, color: '#4b3a9b' }}>{word}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={() => speakSpelledThenPronounced(word, { rate: 0.95, pitch: 1.02 })}>🔊 Hear word</button>
          <button className="btn" onClick={() => say(`Spell ${word} letter by letter`)}>🔊 Instructions</button>
          <button className="btn" onClick={() => setIndex((index + 1) % WORDS.length)}>➡️ Next word</button>
        </div>
      </section>
      <Exercises
        title="Spelling Practice"
        questions={[
          { id: 's1', prompt: 'Which is the correct spelling?', choices: ['happpy', 'happy', 'hapy'], correctIndex: 1, explanation: 'Double p in the middle: hap-py.' },
          { id: 's2', prompt: 'Which word starts with the letter A?', choices: ['sun', 'apple', 'book'], correctIndex: 1 },
          { id: 's3', prompt: 'Pick the correctly spelled word.', choices: ['musik', 'musick', 'music'], correctIndex: 2 },
          { id: 's4', prompt: 'Choose the correct spelling.', choices: ['aple', 'apple', 'aplee'], correctIndex: 1 },
          { id: 's5', prompt: 'Which is correct?', choices: ['sun', 'sonn', 'sunn'], correctIndex: 0 },
          { id: 's6', prompt: 'Pick the word that is spelled right.', choices: ['bok', 'book', 'boook'], correctIndex: 1 },
          { id: 's7', prompt: 'Choose the correct spelling.', choices: ['smile', 'smil', 'smille'], correctIndex: 0 },
          { id: 's8', prompt: 'Which is correct?', choices: ['music', 'musick', 'musiq'], correctIndex: 0 },
          { id: 's9', prompt: 'Correct spelling?', choices: ['friend', 'freind', 'frend'], correctIndex: 0 },
          { id: 's10', prompt: 'Pick the correctly spelled word.', choices: ['school', 'skool', 'schoool'], correctIndex: 0 },
        ]}
      />
    </div>
  )
}

export default SpellingLesson

