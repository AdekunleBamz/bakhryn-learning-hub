import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem('theme') as Theme | null
    return v
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem('theme', theme)
  } catch {}
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? 'light')

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <div className="theme-toggle" role="group" aria-label="Theme toggle">
      <button
        className={`btn-chip ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
      >
        ☀️ Light
      </button>
      <button
        className={`btn-chip ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
      >
        🌙 Dark
      </button>
    </div>
  )
}

export default ThemeToggle

