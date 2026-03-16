import { useState } from 'react'
import { stages, LEADERBOARD_RIVALS } from '../gameData'

export default function WelcomeScreen({ onStart, onBack }) {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)

  const handleStart = () => {
    if (name.trim().length < 2) { setNameError(true); return }
    onStart(name.trim())
  }

  return (
    <div className="screen welcome-screen">
      <div className="bg-shapes">
        {['📦', '🎨', '⚡', '🌟', '🏆', '💎', '🎯', '🔥'].map((emoji, i) => (
          <span key={i} className="floating-emoji" style={{ '--i': i }}>{emoji}</span>
        ))}
      </div>

      <div className="welcome-container">
        <div className="hero-title-section">
          <div className="hero-stars-row">
            <span className="star-spin">⭐</span>
            <span className="star-spin delay-1">🌟</span>
            <span className="star-spin delay-2">⭐</span>
          </div>
          <h1 className="game-title">גִּבּוֹרֵי הַשָּׂפָה</h1>
          <p className="game-subtitle">📚 שֵׁם עֶצֶם · שֵׁם תֹּאַר · שֵׁם פֹּעַל 📚</p>
          <p className="game-tagline">הַמִּשְׂחָק שֶׁיַּהֲפֹךְ אוֹתְךָ לְאַלּוּף הַכִּיתָּה! 🏆</p>
        </div>

        <div className="stage-overview">
          <p className="overview-title">5 שְׁלָבִים · 100 נְקֻדּוֹת · אַלּוּף אֶחָד</p>
          <div className="stages-row">
            {stages.map((stage, i) => (
              <div key={i} className="stage-badge">
                <span className="stage-badge-emoji">{stage.emoji}</span>
                <span className="stage-badge-name">{stage.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="leaderboard-preview">
          <h3 className="leaderboard-title">🏅 לוּחַ הַמּוֹבִילִים</h3>
          <p className="leaderboard-subtitle">הַאִם תַּצְלִיחַ לַעֲקֹף אוֹתָם?</p>
          <div className="leaderboard-list">
            {LEADERBOARD_RIVALS.map((player, i) => (
              <div key={i} className="leaderboard-row rival">
                <span className="lb-rank">#{i + 1}</span>
                <span className="lb-avatar">{player.avatar}</span>
                <span className="lb-name">{player.name}</span>
                <div className="lb-score-bar">
                  <div className="lb-score-fill rival-fill" style={{ width: `${player.score}%` }} />
                </div>
                <span className="lb-score">{player.score}</span>
              </div>
            ))}
            <div className="leaderboard-row player-row">
              <span className="lb-rank you-rank">?</span>
              <span className="lb-avatar">🌟</span>
              <span className="lb-name you-name">{name || 'אַתָּה'}</span>
              <div className="lb-score-bar">
                <div className="lb-score-fill player-fill" style={{ width: '0%' }} />
              </div>
              <span className="lb-score you-score">0</span>
            </div>
          </div>
        </div>

        <div className="name-section">
          <label className="name-label">📝 מַה הַשֵּׁם שֶׁלְּךָ?</label>
          <input
            type="text"
            className={`name-input ${nameError ? 'input-error' : ''}`}
            placeholder="כְּתֹב אֶת שִׁמְךָ כַּאן..."
            value={name}
            onChange={e => { setName(e.target.value); setNameError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            maxLength={20}
            autoFocus
          />
          {nameError && <p className="error-msg">⚠️ כְּתֹב שֵׁם (לְפָחוֹת 2 אוֹתִיּוֹת)</p>}
        </div>

        <button className="btn-start" onClick={handleStart}>
          🚀 הַתְחֵל לִשְׂחֹק!
        </button>

        <p className="disclaimer">💡 קְרָא, לְמַד, וְתַהֲפֹךְ לְגִּבּוֹר הַשָּׂפָה שֶׁל הַכִּיתָּה!</p>
        {onBack && (
          <button className="btn-back-hub" onClick={onBack}>← חֲזוֹר לְלוֹמְדִים עִם מִיטַל</button>
        )}
      </div>
    </div>
  )
}
