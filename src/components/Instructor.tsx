import { speakText, stopSpeech } from '../utils/tts'
import { motion } from 'framer-motion'

type InstructorProps = {
  name: string
  color?: string
  intro?: string
}

function Instructor({ name, color = '#7c4dff', intro }: InstructorProps) {
  const handleSpeak = (message: string) => {
    speakText(message, { voiceHint: 'Google UK English Female', rate: 0.98, pitch: 1.02 })
  }

  return (
    <div className="instructor">
      <motion.div
        className="instructor-avatar"
        initial={{ y: 8 }}
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: color }}
        aria-hidden="true"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label={`${name} cartoon`}>
          <defs>
            <clipPath id="head">
              <circle cx="60" cy="60" r="44" />
            </clipPath>
          </defs>
          <circle cx="60" cy="60" r="56" fill="white" opacity="0.9" />
          <g clipPath="url(#head)">
            <circle cx="60" cy="54" r="36" fill="#ffe8cc" />
            <rect x="20" y="20" width="80" height="50" rx="24" fill="#3b247a" />
            <circle cx="45" cy="58" r="6" fill="#1b1b1b" />
            <circle cx="75" cy="58" r="6" fill="#1b1b1b" />
            <path d="M44 74 Q60 86 76 74" stroke="#e53935" strokeWidth="5" fill="none" />
          </g>
        </svg>
      </motion.div>
      <div className="instructor-panel card">
        <div className="instructor-name">{name}</div>
        <div className="instructor-actions">
          <button onClick={() => handleSpeak(intro || `Hello! I am ${name}. Let's learn and have fun!`)} className="btn primary">
            🔊 Speak
          </button>
          <button onClick={() => stopSpeech()} className="btn ghost">
            ⏹ Stop
          </button>
        </div>
      </div>
      <style>{`
        .instructor {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 16px;
          align-items: center;
        }
        .instructor-avatar {
          width: 120px;
          height: 120px;
          border-radius: 28px;
          display: grid;
          place-items: center;
          box-shadow: var(--shadow);
        }
        .instructor-panel {
          padding: 12px 16px;
          display: grid;
          align-items: center;
          grid-template-columns: 1fr auto;
          gap: 12px;
        }
        .instructor-name {
          font-weight: 700;
          color: #3b247a;
        }
        .instructor-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .btn {
          border: 0;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: transform 120ms ease, box-shadow 120ms ease;
          background: #fff;
          color: #4b3a9b;
        }
        .btn.primary {
          background: linear-gradient(135deg, var(--bg-1), var(--bg-2));
          color: white;
        }
        .btn.ghost {
          background: white;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(124,77,255,0.18);
        }
        @media (max-width: 640px) {
          .instructor {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .instructor-panel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Instructor

