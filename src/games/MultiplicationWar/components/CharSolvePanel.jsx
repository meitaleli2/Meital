import { useState, useEffect } from 'react'

function getCardLabel(value) {
  if (value === 1)  return { face: 'A', num: '1' }
  if (value === 10) return { face: 'K', num: '10' }
  return { face: value, num: null }
}

function CardFace({ card, flipped, isWinner }) {
  const isRed = card.suit === '♥' || card.suit === '♦'
  const { face, num } = getCardLabel(card.value)
  return (
    <div className={`mw-card ${flipped ? 'mw-card-flipped' : ''} ${isWinner ? 'mw-card-winner' : ''}`}>
      <div className="mw-card-inner">
        <div className="mw-card-back-face" />
        <div className={`mw-card-front-face ${isRed ? 'mw-card-red' : 'mw-card-dark'}`}>
          <div className="mw-ctl">{face}<br />{card.suit}</div>
          <div className="mw-cval">
            {card.value}
            {num && <div className="mw-card-num-label">{num}</div>}
          </div>
          <div className="mw-cbr">{face}<br />{card.suit}</div>
        </div>
      </div>
    </div>
  )
}

export default function CharSolvePanel({ round, playerName, character, onDone, onBack }) {
  const { playerCard, charCard } = round
  const higher = Math.max(playerCard.value, charCard.value)
  const lower  = Math.min(playerCard.value, charCard.value)
  const answer = higher * lower

  const [pFlipped, setPFlipped] = useState(false)
  const [cFlipped, setCFlipped] = useState(false)
  const [step, setStep] = useState('reveal') // reveal | thinking | solved | done

  useEffect(() => {
    const t1 = setTimeout(() => setPFlipped(true), 400)
    const t2 = setTimeout(() => setCFlipped(true), 900)
    const t3 = setTimeout(() => setStep('thinking'), 1900)
    const t4 = setTimeout(() => setStep('solved'), 3400)
    const t5 = setTimeout(() => { setStep('done'); setTimeout(onDone, 2000) }, 5200)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  return (
    <div className="mw-screen mw-char-solve-screen" style={{ '--char-gradient': character.gradient }}>
      <button className="btn-back-hub" onClick={onBack}>← דַּף רָאשִׁי</button>

      {/* Cards */}
      <div className="mw-ch-cards-row">
        <div className="mw-ch-card-slot">
          <div className="mw-ch-card-owner">{character.name}</div>
          <CardFace card={charCard} flipped={cFlipped} isWinner={charCard.value >= playerCard.value} />
        </div>

        <div className="mw-ch-middle">
          {step !== 'reveal' && (
            <div className="mw-ch-result-badge char-wins-badge">
              {character.emoji} {character.name} זָכְתָה!
            </div>
          )}
        </div>

        <div className="mw-ch-card-slot">
          <div className="mw-ch-card-owner">{playerName}</div>
          <CardFace card={playerCard} flipped={pFlipped} isWinner={false} />
        </div>
      </div>

      {/* Thinking animation */}
      {step === 'thinking' && (
        <div className="mw-char-thinking-box">
          <div className="mw-char-thinking-emoji bounce-big">{character.emoji}</div>
          <p className="mw-char-thinking-text">🤔 {character.name} חוֹשֶׁבֶת...</p>
          <div className="mw-thinking-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {/* Solved */}
      {(step === 'solved' || step === 'done') && (
        <div className="mw-char-solved-box">
          <div className="mw-char-solve-title">
            {character.emoji} {character.name} פָּתְרָה נָכוֹן! ✅
          </div>
          <div className="mw-full-eq" style={{ direction: 'ltr' }}>
            <span className="mw-eq-n big">{higher}</span>
            <span className="mw-eq-op big">×</span>
            <span className="mw-eq-n big">{lower}</span>
            <span className="mw-eq-op big">=</span>
            <span className="mw-eq-n big mw-ans-glow">{answer}</span>
          </div>
          {step === 'done' && (
            <p className="mw-char-take-cards">
              🃏 הַקְּלָפִים עוֹבְרִים לְ{character.name}...
            </p>
          )}
        </div>
      )}
    </div>
  )
}
