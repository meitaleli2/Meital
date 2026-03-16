import { useState, useEffect, useRef, useMemo } from 'react'

function getCardLabel(value) {
  if (value === 1)  return { face: 'A', num: '1' }
  if (value === 10) return { face: 'K', num: '10' }
  return { face: value, num: null }
}

function CardFaceWar({ card, flipped }) {
  const isRed = card.suit === '♥' || card.suit === '♦'
  const { face } = getCardLabel(card.value)
  return (
    <div className={`mw-card mw-war-card ${flipped ? 'mw-card-flipped' : ''}`}>
      <div className="mw-card-inner">
        <div className="mw-card-back-face" />
        <div className={`mw-card-front-face ${isRed ? 'mw-card-red' : 'mw-card-dark'}`}>
          <div className="mw-ctl">{face}<br />{card.suit}</div>
          <div className="mw-cval">{card.value}</div>
          <div className="mw-cbr">{face}<br />{card.suit}</div>
        </div>
      </div>
    </div>
  )
}

function CardBackWar({ delay = 0 }) {
  return (
    <div
      className="mw-war-card-back"
      style={{ animationDelay: `${delay}s` }}
    />
  )
}

export default function WarPanel({ warData, playerName, character, onWarComplete, onBack }) {
  const { tieValue, playerFaceDown, playerFaceUp, charFaceDown, charFaceUp } = warData
  const tieAnswer = tieValue * tieValue

  const [step, setStep]           = useState('clash')  // clash | solve_tie | deal | reveal | result
  const [input, setInput]         = useState('')
  const [inputStatus, setInputStatus] = useState('idle')
  const [dealtCount, setDealtCount]   = useState(0)
  const [pFaceUpFlipped, setPFaceUpFlipped] = useState(false)
  const [cFaceUpFlipped, setCFaceUpFlipped] = useState(false)
  const inputRef = useRef(null)

  const pVal = playerFaceUp?.value || 0
  const cVal = charFaceUp?.value   || 0
  // Stabilize winner so it doesn't re-roll on every render
  const winner = useMemo(() => {
    if (pVal > cVal) return 'player'
    if (cVal > pVal) return 'char'
    return Math.random() < 0.5 ? 'player' : 'char'
  }, [pVal, cVal])

  // Clash auto-advance
  useEffect(() => {
    if (step !== 'clash') return
    const t = setTimeout(() => {
      setStep('solve_tie')
      setTimeout(() => inputRef.current?.focus(), 100)
    }, 2000)
    return () => clearTimeout(t)
  }, [step])

  // Deal face-down cards one by one
  useEffect(() => {
    if (step !== 'deal') return
    const maxFD = Math.max(playerFaceDown.length, charFaceDown.length)
    if (dealtCount < maxFD) {
      const t = setTimeout(() => setDealtCount(c => c + 1), 700)
      return () => clearTimeout(t)
    }
    // All face-down dealt → reveal face-up
    const t = setTimeout(() => {
      setStep('reveal')
      setTimeout(() => {
        setPFaceUpFlipped(true)
        setCFaceUpFlipped(true)
        setTimeout(() => setStep('result'), 1200)
      }, 400)
    }, 500)
    return () => clearTimeout(t)
  }, [step, dealtCount])

  // Auto-advance after result
  useEffect(() => {
    if (step !== 'result') return
    const t = setTimeout(() => {
      onWarComplete({
        winner,
        playerFaceUpValue: pVal,
        charFaceUpValue:   cVal,
      })
    }, 2200)
    return () => clearTimeout(t)
  }, [step])

  const handleSubmit = () => {
    const num = parseInt(input, 10)
    if (isNaN(num)) return
    if (num === tieAnswer) {
      setInputStatus('correct')
      setTimeout(() => { setInputStatus('idle'); setInput(''); setStep('deal') }, 900)
    } else {
      setInputStatus('wrong')
      setTimeout(() => { setInputStatus('idle'); setInput('') }, 700)
    }
  }

  return (
    <div className="mw-screen mw-war-screen">
      <button className="btn-back-hub" onClick={onBack}>← דַּף רָאשִׁי</button>

      {/* War header */}
      <div className="mw-war-header">
        <span className="mw-war-sword">⚔️</span>
        <span className="mw-war-title">מִלְחָמָה!</span>
        <span className="mw-war-sword">⚔️</span>
      </div>

      {/* Clash: two same numbers fighting */}
      {step === 'clash' && (
        <div className="mw-clash-area">
          <div className="mw-clash-side mw-clash-char">
            <div className="mw-clash-avatar">{character.emoji}</div>
            <div className="mw-clash-num" style={{ color: character.color }}>{tieValue}</div>
          </div>
          <div className="mw-clash-center">
            <span className="mw-clash-boom">💥</span>
            <span className="mw-clash-equal">שָׁוֶה!</span>
          </div>
          <div className="mw-clash-side mw-clash-player">
            <div className="mw-clash-avatar">🌟</div>
            <div className="mw-clash-num" style={{ color: '#FFD700' }}>{tieValue}</div>
          </div>
        </div>
      )}

      {/* Solve tie equation */}
      {step === 'solve_tie' && (
        <div className="mw-war-math-box">
          <p className="mw-war-math-label">
            ⚔️ כְּדֵי לְהַמְשִׁיךְ בַּמִּלְחָמָה — פְּתֹר:
          </p>
          <div
            className={`mw-equation ${inputStatus === 'wrong' ? 'mw-shake' : ''}`}
            style={{ direction: 'ltr' }}
          >
            <span className="mw-eq-n">{tieValue}</span>
            <span className="mw-eq-op">×</span>
            <span className="mw-eq-n">{tieValue}</span>
            <span className="mw-eq-op">=</span>
            {inputStatus === 'correct' ? (
              <span className="mw-eq-n mw-ans-correct">✅ {tieAnswer}</span>
            ) : (
              <input
                ref={inputRef}
                className={`mw-eq-input ${inputStatus === 'wrong' ? 'mw-input-wrong' : ''}`}
                type="number"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="?"
              />
            )}
          </div>
          {inputStatus !== 'correct' && (
            <button className="mw-btn-check" onClick={handleSubmit}>✓ תְּשׁוּבָה</button>
          )}
          {inputStatus === 'wrong' && (
            <p className="mw-wrong-msg">❌ לֹא נָכוֹן, נַסֵּה שׁוּב!</p>
          )}
        </div>
      )}

      {/* War cards area */}
      {(step === 'deal' || step === 'reveal' || step === 'result') && (
        <div className="mw-war-cards-area">
          {/* Character side */}
          <div className="mw-war-side">
            <div className="mw-ch-card-owner">{character.name} {character.emoji}</div>
            <div className="mw-war-card-row">
              {charFaceDown.slice(0, dealtCount).map((_, i) => (
                <CardBackWar key={i} delay={i * 0.1} />
              ))}
              {(step === 'reveal' || step === 'result') ? (
                <CardFaceWar card={charFaceUp} flipped={cFaceUpFlipped} />
              ) : step === 'deal' && dealtCount >= charFaceDown.length ? (
                <CardBackWar delay={0} />
              ) : null}
            </div>
          </div>

          <div className="mw-war-center-vs">⚔️</div>

          {/* Player side */}
          <div className="mw-war-side">
            <div className="mw-ch-card-owner">🌟 {playerName}</div>
            <div className="mw-war-card-row">
              {playerFaceDown.slice(0, dealtCount).map((_, i) => (
                <CardBackWar key={i} delay={i * 0.1} />
              ))}
              {(step === 'reveal' || step === 'result') ? (
                <CardFaceWar card={playerFaceUp} flipped={pFaceUpFlipped} />
              ) : step === 'deal' && dealtCount >= playerFaceDown.length ? (
                <CardBackWar delay={0} />
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* War result */}
      {step === 'result' && (
        <div className={`mw-war-result-banner ${winner === 'player' ? 'mw-war-player-won' : 'mw-war-char-won'}`}>
          {winner === 'player' ? (
            <>🌟 {playerName} נִיצַּח! ({pVal} &gt; {cVal})</>
          ) : (
            <>{character.emoji} {character.name} נִיצְּחָה! ({cVal} &gt; {pVal})</>
          )}
          <div className="mw-war-joker-hint">🃏 מַזָּל טוֹב — גּוֹ׳קֶר בַּדֶּרֶךְ!</div>
        </div>
      )}
    </div>
  )
}
