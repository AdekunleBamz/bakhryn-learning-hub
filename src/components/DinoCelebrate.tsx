function DinoCelebrate() {
  return (
    <div className="dino-wrap" role="status" aria-live="polite" aria-label="Celebration">
      <div className="dino">
        <div className="head">
          <div className="eye"></div>
          <div className="smile"></div>
        </div>
        <div className="body"></div>
        <div className="arm left"></div>
        <div className="arm right"></div>
        <div className="leg left"></div>
        <div className="leg right"></div>
        <div className="confetti c1"></div>
        <div className="confetti c2"></div>
        <div className="confetti c3"></div>
      </div>
      <style>{`
        .dino-wrap {
          display: grid;
          place-items: center;
          padding: 8px;
        }
        .dino {
          position: relative;
          width: 140px;
          height: 120px;
        }
        .head {
          position: absolute;
          left: 20px;
          top: 0;
          width: 80px;
          height: 60px;
          background: #6bd36b;
          border-radius: 28px 28px 22px 22px;
          transform: translateY(0);
          animation: bounce 1.2s ease-in-out infinite;
          box-shadow: var(--shadow);
        }
        .eye {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #1b1b1b;
          border-radius: 50%;
          left: 18px;
          top: 18px;
        }
        .smile {
          position: absolute;
          left: 34px;
          top: 30px;
          width: 22px;
          height: 12px;
          border-bottom: 4px solid #1b1b1b;
          border-radius: 0 0 16px 16px;
        }
        .body {
          position: absolute;
          left: 8px;
          top: 44px;
          width: 100px;
          height: 60px;
          background: #78e078;
          border-radius: 28px;
          box-shadow: var(--shadow);
        }
        .arm {
          position: absolute;
          width: 16px;
          height: 28px;
          background: #6bd36b;
          top: 52px;
          border-radius: 8px;
          transform-origin: top center;
          animation: clap 0.6s ease-in-out infinite;
        }
        .arm.left { left: 18px; }
        .arm.right { left: 54px; animation-delay: 0.3s; }
        .leg {
          position: absolute;
          width: 14px;
          height: 24px;
          background: #5ac65a;
          bottom: 0;
          border-radius: 6px;
        }
        .leg.left { left: 26px; }
        .leg.right { left: 64px; }
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ffd740;
          border-radius: 2px;
          animation: pop 1s ease-out infinite;
        }
        .confetti.c1 { left: 6px; top: -6px; }
        .confetti.c2 { left: 96px; top: -4px; background: #ff4081; animation-delay: 0.2s; }
        .confetti.c3 { left: 60px; top: -10px; background: #40c4ff; animation-delay: 0.4s; }
        @keyframes clap {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-22deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pop {
          0% { transform: translateY(0) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default DinoCelebrate

