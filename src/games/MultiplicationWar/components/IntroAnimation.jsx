import { useEffect, useState } from 'react'

export default function IntroAnimation({ playerName, character, onComplete }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1700),
      setTimeout(() => setStep(4), 2400),
      setTimeout(() => onComplete(), 3400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className={`mw-intro ${step >= 4 ? 'mw-intro-white' : ''}`}>
      <div className="mw-intro-stars">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="mw-intro-star" style={{ '--i': i }}>✨</span>
        ))}
      </div>

      {step >= 1 && (
        <div className={`mw-intro-war-title ${step >= 1 ? 'mw-war-drop' : ''}`}>
          ⚔️ מִלְחָמָה! ⚔️
        </div>
      )}

      {step >= 2 && (
        <div className="mw-intro-players">
          <div className={`mw-intro-side mw-intro-player-side ${step >= 2 ? 'mw-slide-right' : ''}`}>
            <div className="mw-intro-avatar-ring mw-player-ring">🌟</div>
            <div className="mw-intro-name">{playerName}</div>
          </div>

          {step >= 3 && (
            <div className="mw-intro-vs-badge mw-vs-pop">VS</div>
          )}

          <div className={`mw-intro-side mw-intro-char-side ${step >= 2 ? 'mw-slide-left' : ''}`}
            style={{ background: character.gradient }}>
            <div className="mw-intro-avatar-ring mw-char-ring">{character.emoji}</div>
            <div className="mw-intro-name">{character.name}</div>
          </div>
        </div>
      )}
    </div>
  )
}
