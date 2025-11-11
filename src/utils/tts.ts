export type SpeakOptions = {
  rate?: number
  pitch?: number
  volume?: number
  voiceHint?: string
}

type TtsPreferences = {
  voiceRegionHint?: string // e.g., 'en-NG', 'en-ZA'
  rate?: number
  pitch?: number
}

const PREF_KEY = 'bakhryann.tts'

function loadPrefs(): TtsPreferences {
  try {
    const raw = localStorage.getItem(PREF_KEY)
    return raw ? JSON.parse(raw) as TtsPreferences : {}
  } catch {
    return {}
  }
}

export function setTtsPreferences(prefs: Partial<TtsPreferences>) {
  try {
    const merged = { ...loadPrefs(), ...prefs }
    localStorage.setItem(PREF_KEY, JSON.stringify(merged))
  } catch {}
}

export function getTtsPreferences(): TtsPreferences {
  return loadPrefs()
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

  const prefs = getTtsPreferences()
  const userHint = (hint || prefs.voiceRegionHint || '').toLowerCase()

  // Priority 1: African English variants & UK
  const preferredLangs = [
    userHint,
    'en-ng', // Nigeria
    'en-za', // South Africa
    'en-ke', // Kenya
    'en-gh', // Ghana (rare)
    'en-gb', // UK
    'en-us',
  ].filter(Boolean)

  // Try by language code match
  for (const code of preferredLangs) {
    const m = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(code))
    if (m) return m
  }

  // Try by display name includes region/country
  const preferredNames = [
    'Nigeria','South Africa','Kenya','Ghana',
    'Google UK English Female','Google UK English Male',
    'Google US English','Microsoft Zira','Samantha','Victoria'
  ]
  for (const name of preferredNames) {
    const m = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()))
    if (m) return m
  }

  // Fallback: any English, else first
  return voices.find(v => v.lang.toLowerCase().startsWith('en')) || voices[0]
}

export function speakText(text: string, options: SpeakOptions = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported in this browser')
    return
  }
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  const prefs = getTtsPreferences()
  utter.rate = options.rate ?? prefs.rate ?? 0.85
  utter.pitch = options.pitch ?? prefs.pitch ?? 1.0
  utter.volume = options.volume ?? 1.0
  const trySetVoice = () => {
    const v = chooseChildFriendlyVoice(options.voiceHint || prefs.voiceRegionHint)
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
    const prefs = getTtsPreferences()
    utter.rate = options.rate ?? prefs.rate ?? 0.85
    utter.pitch = options.pitch ?? prefs.pitch ?? 1.0
    utter.volume = options.volume ?? 1.0
    const v = chooseChildFriendlyVoice(options.voiceHint || prefs.voiceRegionHint)
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

