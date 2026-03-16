import { useState, useEffect, useRef, useMemo } from 'react'
import HintPanel from './HintPanel'
import BalloonGroups from './BalloonGroups'

const ENCOURAGEMENTS = [
  'כָּל הַכָּבוֹד! אַתָּה מְדַהִים! 🌟',
  'מַמָּשׁ נִפְלָא! כֵּן, זֶה בִּדְיוּק נָכוֹן! 🎉',
  'אַתָּה כּוֹכָב הַמִּסְפָּרִים! ⭐',
  'מְצֻיָּן! הַמַּח שֶׁלְּךָ עוֹבֵד מְצֻיָּן! 💡',
  'יוֹפִי! אַתָּה חָכָם מְאֹד! 🌈',
  'הַחֲשִׁיבָה שֶׁלְּךָ מֻשְׁלֶמֶת! 💪',
  'בְּרָבוֹ! הִמְשֵׁךְ כָּכָה! 🚀',
  'אַתָּה מֵבִין לוּחַ כֶּפֶל! 🧠',
  'עָשִׂיתָ זֹאת! אַתָּה חֲזָק! 🏆',
  'נִפְלָא! כָּל כָּךְ מַהֵר! ⚡',
]

function randomWrongAnswer(correct) {
  const offsets = [-3, -2, -1, 1, 2, 3, 4, 5, -4]
  let w
  let tries = 0
  do {
    w = correct + offsets[Math.floor(Math.random() * offsets.length)]
    tries++
  } while ((w <= 0 || w === correct) && tries < 20)
  return w > 0 ? w : correct + 1
}

function getCardLabel(value) {
  if (value === 1)  return { face: 'A', num: '1' }
  if (value === 10) return { face: 'K', num: '10' }
  return { face: value, num: null }
}

function CardFace({ card, flipped, isWinner }) {
  const isRed = card.suit === '♥' || card.suit === '♦'
  const { face } = getCardLabel(card.value)
  return (
    <div className={`mw-card ${flipped ? 'mw-card-flipped' : ''} ${isWinner ? 'mw-card-winner' : ''}`}>
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

export default function ChallengePanel({ round, playerName, character, repeatQueue, onComplete, onBack }) {
  const { playerCard, charCard: characterCard } = round
  const higher = Math.max(playerCard.value, characterCard.value)
  const lower = Math.min(playerCard.value, characterCard.value)
  const answer = higher * lower

  // Decide once at mount
  const charMistake = useMemo(() => Math.random() < 0.3, [])
  const charWrongAnswer = useMemo(() => randomWrongAnswer(answer), [answer])
  const encouragement = useMemo(
    () => ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)],
    []
  )

  const [pFlipped, setPFlipped] = useState(false)
  const [cFlipped, setCFlipped] = useState(false)
  // steps: reveal | compare | char_mistake | eq1 | eq2 | full
  const [step, setStep] = useState('reveal')
  const [input, setInput] = useState('')
  const [inputStatus, setInputStatus] = useState('idle') // idle | wrong | correct
  const [wrongCount, setWrongCount] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)

  const inputRef = useRef(null)
  const pair = [higher, lower]
  const isRepeat = repeatQueue.includes(`${Math.min(higher, lower)}x${Math.max(higher, lower)}`)

  // Auto-show hint if previously used hint on this pair
  useEffect(() => {
    if (step === 'eq1' && isRepeat) {
      const t = setTimeout(() => setShowHint(true), 800)
      return () => clearTimeout(t)
    }
  }, [step, isRepeat])

  // Auto-show hint after 3 wrong answers
  useEffect(() => {
    if (wrongCount >= 3) setShowHint(true)
  }, [wrongCount])

  // Card reveal sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPFlipped(true), 400)
    const t2 = setTimeout(() => setCFlipped(true), 900)
    const t3 = setTimeout(() => setStep('compare'), 1900)
    const t4 = setTimeout(() => {
      if (charMistake) {
        setStep('char_mistake')
      } else {
        setStep('eq1')
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }, 3000)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  const getEqNums = () => step === 'eq1' ? [higher, lower] : [lower, higher]

  const handleSubmit = () => {
    const num = parseInt(input, 10)
    if (isNaN(num)) return
    if (num === answer) {
      setInputStatus('correct')
      setTimeout(() => {
        setInputStatus('idle')
        setInput('')
        setWrongCount(0)
        if (step === 'eq1') {
          setStep('eq2')
          setTimeout(() => inputRef.current?.focus(), 100)
        } else {
          setStep('full')
          setTimeout(() => {
            onComplete({ hintUsed, pair })
          }, 2400)
        }
      }, 1000)
    } else {
      setInputStatus('wrong')
      setWrongCount(c => c + 1)
      setTimeout(() => { setInputStatus('idle'); setInput('') }, 700)
    }
  }

  const [eqA, eqB] = getEqNums()

  return (
    <div className="mw-screen mw-challenge-screen" style={{ '--char-gradient': character.gradient }}>
      <button className="btn-back-hub" onClick={onBack}>← דַּף רָאשִׁי</button>

      {/* Cards row */}
      <div className="mw-ch-cards-row">
        <div className="mw-ch-card-slot">
          <div className="mw-ch-card-owner">{character.name}</div>
          <CardFace card={characterCard} flipped={cFlipped} isWinner={false} />
        </div>

        <div className="mw-ch-middle">
          {step === 'reveal' && <span className="mw-ch-vs">🃏</span>}
          {step === 'compare' && (
            <div className="mw-ch-result-badge">
              🌟 אַתָּה זָכִיתָ!
            </div>
          )}
          {(step === 'char_mistake' || step === 'eq1' || step === 'eq2' || step === 'full') && (
            <div className="mw-ch-result-badge won">
              🌟 הַקְּלָפִים שֶׁלְּךָ!
            </div>
          )}
        </div>

        <div className="mw-ch-card-slot">
          <div className="mw-ch-card-owner">{playerName}</div>
          <CardFace card={playerCard} flipped={pFlipped} isWinner={true} />
        </div>
      </div>

      {/* Character mistake step */}
      {step === 'char_mistake' && (
        <div className="mw-char-mistake-box">
          <div className="mw-char-mistake-header">
            <span className="mw-char-mistake-emoji">{character.emoji}</span>
            <div>
              <p className="mw-char-mistake-line1">{character.name} חָשַׁב שֶׁ:</p>
              <p className="mw-char-mistake-wrong">
                {higher} × {lower} = <span className="mw-wrong-ans">{charWrongAnswer}</span> ❌
              </p>
            </div>
          </div>
          <p className="mw-char-mistake-explain">בּוֹא נִסְפֹּר יַחַד כַּמָּה זֶה בֶּאֱמֶת!</p>
          <BalloonGroups
            a={higher}
            b={lower}
            autoPlay
            onComplete={() => {
              setStep('eq1')
              setTimeout(() => inputRef.current?.focus(), 200)
            }}
          />
        </div>
      )}

      {/* Math challenge */}
      {(step === 'eq1' || step === 'eq2') && (
        <div className="mw-math-box">
          {isRepeat && step === 'eq1' && (
            <div className="mw-repeat-badge">🔄 בּוֹא נְנַסֶּה שׁוּב!</div>
          )}
          <div className="mw-eq-label">
            {step === 'eq1' ? '🎯 פְּתֹר אֶת הַתַּרְגִּיל:' : '↔️ עַכְשָׁו בְּסֵדֶר הָפּוּךְ:'}
          </div>

          <div className={`mw-equation ${inputStatus === 'wrong' ? 'mw-shake' : ''}`}>
            <span className="mw-eq-n">{eqA}</span>
            <span className="mw-eq-op">×</span>
            <span className="mw-eq-n">{eqB}</span>
            <span className="mw-eq-op">=</span>

            {inputStatus === 'correct' ? (
              <span className="mw-eq-n mw-ans-correct">✅ {answer}</span>
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
            <div className="mw-eq-actions">
              <button className="mw-btn-check" onClick={handleSubmit}>✓ תְּשׁוּבָה</button>
              <button className="mw-btn-hint" onClick={() => { setShowHint(true); setHintUsed(true) }}>
                💡 רֶמֶז
              </button>
            </div>
          )}

          {inputStatus === 'wrong' && (
            <p className="mw-wrong-msg">
              ❌ לֹא נָכוֹן, נַסֵּה שׁוּב!
              {wrongCount >= 2 && ' 💡 לְחַץ רֶמֶז לְעֶזְרָה'}
            </p>
          )}
        </div>
      )}

      {step === 'full' && (
        <div className="mw-full-reveal">
          <div className="mw-full-eq">
            <span className="mw-eq-n big">{higher}</span>
            <span className="mw-eq-op big">×</span>
            <span className="mw-eq-n big">{lower}</span>
            <span className="mw-eq-op big">=</span>
            <span className="mw-eq-n big mw-ans-glow">{answer}</span>
          </div>
          <p className="mw-full-msg">{encouragement}</p>
          <p className="mw-full-cards">🎴 הַקְּלָפִים עוֹבְרִים אֵלֶיךָ!</p>
        </div>
      )}

      {showHint && (
        <HintPanel a={higher} b={lower} onClose={() => setShowHint(false)} />
      )}
    </div>
  )
}
