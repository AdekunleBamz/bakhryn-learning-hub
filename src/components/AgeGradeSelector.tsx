 

type AgeGradeSelectorProps = {
  age: number
  grade: number
  onChange: (next: { age: number; grade: number }) => void
}

function AgeGradeSelector({ age, grade, onChange }: AgeGradeSelectorProps) {
  const ages = Array.from({ length: 10 }, (_, i) => i + 5) // 5-14
  const grades = Array.from({ length: 8 }, (_, i) => i + 1) // 1-8
  return (
    <div className="age-grade card" role="group" aria-label="Select age and grade">
      <div className="row">
        <label htmlFor="age">Age</label>
        <select
          id="age"
          value={age}
          onChange={(e) => onChange({ age: Number(e.target.value), grade })}
        >
          {ages.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <div className="row">
        <label htmlFor="grade">Grade</label>
        <select
          id="grade"
          value={grade}
          onChange={(e) => onChange({ age, grade: Number(e.target.value) })}
        >
          {grades.map(g => <option key={g} value={g}>Grade {g}</option>)}
        </select>
      </div>
      <style>{`
        .age-grade {
          padding: 12px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .row {
          display: grid;
          gap: 6px;
        }
        label {
          font-weight: 600;
          color: #4b3a9b;
        }
        select {
          appearance: none;
          border: 1px solid rgba(0,0,0,0.1);
          background: #fff;
          padding: 10px 12px;
          border-radius: 12px;
          font-weight: 600;
          color: #3b247a;
          box-shadow: var(--shadow);
        }
        @media (max-width: 640px) {
          .age-grade {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default AgeGradeSelector

