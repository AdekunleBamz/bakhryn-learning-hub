import { useMemo, useState } from 'react'

type Variant = 'naruto' | 'sakura' | 'sasuke' | 'boruto' | 'sarada' | 'jiraiya'
type VariantOrRandom = Variant | 'random'

const palettes: Record<Variant, { from: string; to: string; accent: string }> = {
  naruto: { from: '#ff8c00', to: '#ffd740', accent: '#ffec99' },
  sakura: { from: '#ff6fa3', to: '#ffc1dc', accent: '#fff0f6' },
  sasuke: { from: '#3f51b5', to: '#7c4dff', accent: '#c5cae9' },
  boruto: { from: '#ff4081', to: '#ffd740', accent: '#ffe57f' },
  sarada: { from: '#e53935', to: '#8e24aa', accent: '#ffcdd2' },
  jiraiya: { from: '#c62828', to: '#607d8b', accent: '#ef9a9a' },
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function NinjaScene({ variant = 'random' as VariantOrRandom, pool }: { variant?: VariantOrRandom; pool?: Variant[] }) {
  const [imgOk, setImgOk] = useState(true)
  const [extIdx, setExtIdx] = useState(0)
  const variantsPool = useMemo(
    () => (pool && pool.length ? pool : (['naruto','sakura','sasuke','boruto','sarada','jiraiya'] as Variant[])),
    [pool]
  )
  const randomizedPool = useMemo(() => shuffle(variantsPool), [variantsPool])
  const [varIdx, setVarIdx] = useState(() => Math.floor(Math.random() * randomizedPool.length))
  const selectedVariant = (variant === 'random' ? randomizedPool[varIdx] : variant) as Variant
  const candidates = [`.webp`, `.png`, `.jpg`, `.jpeg`, `.svg`]
  const src = `/anime/${selectedVariant}${candidates[Math.min(extIdx, candidates.length - 1)]}`
  const palette = palettes[selectedVariant] || palettes.naruto
  return (
    <div className="ninja-scene" aria-hidden="true">
      <div className="ring r1"></div>
      <div className="ring r2"></div>
      <div className="ring r3"></div>
      <div className="shuriken s1"></div>
      <div className="shuriken s2"></div>
      {imgOk && (
        <div className="img-wrap">
          <img
            src={src}
            alt={`${selectedVariant} themed character`}
            onError={() => {
              if (extIdx < candidates.length - 1) {
                setExtIdx(extIdx + 1)
              } else if (varIdx < randomizedPool.length - 1) {
                setVarIdx(varIdx + 1)
                setExtIdx(0)
              } else {
                setImgOk(false)
              }
            }}
          />
        </div>
      )}
      <style>{`
        .ninja-scene {
          position: relative;
          height: 160px;
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 8px;
          background: linear-gradient(135deg, ${palette.from}, ${palette.to});
        }
        .img-wrap {
          position: absolute;
          right: 16px;
          bottom: 6px;
          perspective: 600px;
          animation: floaty 4s ease-in-out infinite;
        }
        .img-wrap img {
          width: 140px;
          height: auto;
          filter: drop-shadow(0 16px 20px rgba(0,0,0,0.25));
          transform: rotateY(-8deg) rotateX(4deg);
          border-radius: 12px;
        }
        .ring {
          position: absolute;
          border: 2px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          animation: spin 12s linear infinite;
        }
        .r1 { width: 260px; height: 260px; left: -40px; top: -80px; }
        .r2 { width: 180px; height: 180px; right: -40px; top: -20px; animation-duration: 16s; }
        .r3 { width: 320px; height: 320px; right: -120px; bottom: -160px; animation-duration: 20s; }
        .shuriken {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-bottom: 28px solid ${palette.accent};
          transform-origin: 50% 90%;
          animation: twirl 3s linear infinite;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.2));
        }
        .s1 { left: 20%; top: 40%; }
        .s2 { right: 22%; top: 30%; animation-duration: 2.2s; }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes twirl {
          0% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(180deg) translateY(-8px); }
          100% { transform: rotate(360deg) translateY(0); }
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
        }
      `}</style>
    </div>
  )
}

export default NinjaScene

