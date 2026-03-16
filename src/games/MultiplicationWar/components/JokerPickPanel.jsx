import { useEffect, useState } from 'react'

const VALUE_COLORS = {
  1: '#E8D5B7', 2: '#FF6B6B', 3: '#4ECDC4', 4: '#45B7D1', 5: '#F7DC6F',
  6: '#DDA0DD', 7: '#52BE80', 8: '#F39C12', 9: '#E74C3C', 10: '#FFD700',
}
const VALUE_LABELS = { 1: 'A (1)', 10: 'K (10)' }

export default function JokerPickPanel({ owner, character, onPick }) {
  const [visible, setVisible] = useState(false)
  const [charChose, setCharChose] = useState(null)

  useEffect(() => {
    setVisible(true)
    if (owner === 'char') {
      const t = setTimeout(() => {
        const val = Math.floor(Math.random() * 10) + 1
        setCharChose(val)
        setTimeout(() => onPick(val), 1200)
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <div className={`mw-screen mw-joker-pick-screen ${visible ? 'mw-joker-screen-in' : ''}`}>
      <div className="mw-joker-pick-inner">
        <div className="mw-joker-big bounce-big">🃏</div>
        <h2 className="mw-joker-title">קָלַף גּוֹ׳קֶר!</h2>

        {owner === 'player' ? (
          <>
            <p className="mw-joker-text">בְּחַר אֵיזֶה מִסְפָּר יִהְיֶה הַגּוֹ׳קֶר שֶׁלְּךָ:</p>
            <div className="mw-joker-btns">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                <button
                  key={v}
                  className="mw-joker-btn"
                  style={{ background: VALUE_COLORS[v] }}
                  onClick={() => onPick(v)}
                >
                  {VALUE_LABELS[v] || v}
                </button>
              ))}
            </div>
            <p className="mw-joker-hint">💡 בְּחַר מִסְפָּר גָּבוֹהַּ כְּדֵי לְנַצֵּחַ!</p>
          </>
        ) : (
          <>
            <p className="mw-joker-text">{character.emoji} {character.name} בּוֹחֶרֶת מִסְפָּר...</p>
            {charChose ? (
              <div className="mw-joker-char-chose">
                <span style={{ color: VALUE_COLORS[charChose], fontSize: '2.5rem', fontWeight: 900 }}>
                  {charChose}
                </span>
              </div>
            ) : (
              <div className="mw-thinking-dots" style={{ justifyContent: 'center', margin: '20px 0' }}>
                <span /><span /><span />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
