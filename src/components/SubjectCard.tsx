import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type SubjectCardProps = {
  to: string
  title: string
  emoji: string
  colorFrom: string
  colorTo: string
}

function SubjectCard({ to, title, emoji, colorFrom, colorTo }: SubjectCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link to={to} className="subject-card" style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}>
        <span className="emoji" aria-hidden="true">{emoji}</span>
        <span className="title">{title}</span>
      </Link>
      <style>{`
        .subject-card {
          display: grid;
          grid-template-columns: 56px 1fr;
          align-items: center;
          gap: 12px;
          padding: 16px;
          color: white;
          text-decoration: none;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }
        .emoji {
          font-size: 40px;
          display: inline-grid;
          place-items: center;
        }
        .title {
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.3px;
        }
      `}</style>
    </motion.div>
  )
}

export default SubjectCard

