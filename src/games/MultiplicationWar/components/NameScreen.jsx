import { useState } from 'react'
import { CHARACTERS } from '../MultiplicationWarGame'

export default function NameScreen({ onStart, onBack }) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const handleStart = () => {
    if (name.trim().length < 2) { setError(true); return }
    onStart(name.trim())
  }

  return (
    <div className="mw-screen mw-name-screen">
      <div className="mw-name-bg">
        {['🃏', '⚔️', '🏆', '✨', '🎯', '💥', '🌟', '🎴'].map((e, i) => (
          <span key={i} className="mw-float-emoji" style={{ '--i': i }}>{e}</span>
        ))}
      </div>

      <div className="mw-name-container">
        <div className="mw-name-hero">
          <div className="mw-name-sword">⚔️</div>
          <h1 className="mw-name-title">מִלְחֶמֶת הַקְּלָפִים</h1>
          <p className="mw-name-subtitle">לְמַד לוּחַ הַכֶּפֶל בְּמִשְׂחָק קְלָפִים!</p>
        </div>

        <div className="mw-chars-row">
          {CHARACTERS.map(c => (
            <div key={c.id} className="mw-char-preview" style={{ background: c.gradient }}>
              <span className="mw-char-preview-emoji">{c.emoji}</span>
            </div>
          ))}
        </div>
        <p className="mw-chars-label">מִי יִהְיֶה הַיָּרִיב שֶׁלְּךָ? 🎲</p>

        <div className="mw-name-field">
          <label className="mw-name-label">✍️ מַה הַשֵּׁם שֶׁלְּךָ?</label>
          <input
            type="text"
            className={`mw-name-input ${error ? 'input-error' : ''}`}
            placeholder="כְּתֹב אֶת שִׁמְךָ..."
            value={name}
            onChange={e => { setName(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            maxLength={20}
            autoFocus
          />
          {error && <p className="error-msg">⚠️ כְּתֹב שֵׁם (לְפָחוֹת 2 אוֹתִיּוֹת)</p>}
        </div>

        <button className="mw-btn-go" onClick={handleStart}>⚔️ לַקְּרָב!</button>
        <button className="mw-btn-back" onClick={onBack}>← חֲזוֹר</button>
      </div>
    </div>
  )
}
