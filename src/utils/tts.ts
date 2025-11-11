export type SpeakOptions = {
  rate?: number
  pitch?: number
  volume?: number
  voiceHint?: string
}

let cachedVoices: SpeechSynthesisVoice[] | null = null

function getVoices(): SpeechSynthesisVoice[] {
  if (cachedVoices && cachedVoices.length) {
    return cachedVoices
  }
  cachedVoices = window.speechSynthesis.getVoices()
  return cachedVoices
}

export function chooseChildFriendlyVoice(hint?: string): SpeechSynthesisVoice | null {
  const voices = getVoices()
  if (!voices || voices.length === 0) return null

  const preferredNames = [
    hint || '',
    'Google US English',
    'Google UK English Female',
    'Microsoft Zira',
    'Samantha',
    'Victoria',
  ].filter(Boolean)

  for (const name of preferredNames) {
    const match = voices.find(v => v.name.includes(name))
    if (match) return match
  }

  return voices.find(v => v.lang.toLowerCase().startsWith('en')) || voices[0]
}

export function speakText(text: string, options: SpeakOptions = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported in this browser')
    return
  }
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = options.rate ?? 0.95
  utter.pitch = options.pitch ?? 1.0
  utter.volume = options.volume ?? 1.0
  const trySetVoice = () => {
    const v = chooseChildFriendlyVoice(options.voiceHint)
    if (v) utter.voice = v
    window.speechSynthesis.speak(utter)
  }
  if (getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = null
      trySetVoice()
    }
  } else {
    trySetVoice()
  }
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export function speakSequence(parts: string[], options: SpeakOptions = {}) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  let i = 0
  const speakNext = () => {
    if (i >= parts.length) return
    const utter = new SpeechSynthesisUtterance(parts[i])
    utter.rate = options.rate ?? 0.95
    utter.pitch = options.pitch ?? 1.0
    utter.volume = options.volume ?? 1.0
    const v = chooseChildFriendlyVoice(options.voiceHint)
    if (v) utter.voice = v
    utter.onend = () => {
      i += 1
      speakNext()
    }
    window.speechSynthesis.speak(utter)
  }
  speakNext()
}

export function speakSpelledThenPronounced(word: string, options: SpeakOptions = {}) {
  const letters = word.split('').join(' ')
  const parts = [
    `${word}.`,
    `Spell it: ${letters}.`,
    `Pronounce: ${word}.`,
  ]
  speakSequence(parts, options)
}

