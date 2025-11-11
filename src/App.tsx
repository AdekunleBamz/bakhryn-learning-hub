import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import './index.css'
import Home from './pages/Home'
import SpellingLesson from './pages/SpellingLesson'
import MathLesson from './pages/MathLesson'
import VerbalLesson from './pages/VerbalLesson'
import QuantLesson from './pages/QuantLesson'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const location = useLocation()

  return (
    <div className="app-root">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-bubble">B</span>
          <span className="brand-name">BakhryAnn Learning Hub</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <nav className="nav-links">
            <Link to="/lessons/spelling">Spelling</Link>
            <Link to="/lessons/math">Math</Link>
            <Link to="/lessons/verbal">Verbal</Link>
            <Link to="/lessons/quant">Quant</Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="app-main"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/lessons/spelling" element={<SpellingLesson />} />
            <Route path="/lessons/math" element={<MathLesson />} />
            <Route path="/lessons/verbal" element={<VerbalLesson />} />
            <Route path="/lessons/quant" element={<QuantLesson />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <footer className="app-footer">
        <span>Made with fun for ages 5–14</span>
      </footer>
    </div>
  )
}

export default App
