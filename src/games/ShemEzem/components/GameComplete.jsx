import { useEffect, useState } from 'react'
import { stages } from '../gameData'
import Confetti from './Confetti'

export default function GameComplete({ playerName, totalScore, maxStreak, stageStars, onRestart, onBackToHub }) {
  const [showConfetti, setShowConfetti] = useState(true)
  const [animScore, setAnimScore] = useState(0)

  useEffect(() => {
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + 2, totalScore)
      setAnimScore(current)
      if (current >= totalScore) clearInterval(timer)
    }, 25)
    return () => clearInterval(timer)
  }, [totalScore])

  const totalStars = stageStars.reduce((s, x) => s + x, 0)
  const maxStars = stages.length * 3

  return (
    <div className="screen game-complete-screen">
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}

      <div className="epic-header" style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
        <span className="trophy-big bounce-big">🏆</span>
        <h1 className="epic-title">נִצַּחְתָּ!</h1>
        <p className="epic-name">{playerName}</p>
        <p className="epic-rank">גִּבּוֹר הַשָּׂפָה! 🦸</p>
      </div>

      <div className="gc-body">
        <div className="final-score-section">
          <div className="final-score-circle" style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
            <span className="final-score-num">{animScore}</span>
            <span className="final-score-label">נְקֻדּוֹת!</span>
          </div>
        </div>

        <div className="stars-summary">
          <h3 className="stars-summary-title">⭐ {totalStars} / {maxStars} כּוֹכָבִים</h3>
          <div className="stages-stars-row">
            {stages.map((stage, i) => (
              <div key={i} className="stage-star-card" style={{ borderColor: stage.color }}>
                <span className="ss-emoji">{stage.emoji}</span>
                <span className="ss-name">{stage.name}</span>
                <div className="ss-stars">
                  {[1, 2, 3].map(s => (
                    <span key={s} className={s <= (stageStars[i] || 0) ? 'star-gold' : 'star-grey'}>
                      {s <= (stageStars[i] || 0) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h3>🏅 הִישְׂגִּים:</h3>
          <div className="achievements-grid">
            {[
              { icon: '🏆', label: '100 נְקֻדּוֹת!', earned: totalScore >= 100 },
              { icon: '🔥', label: 'רֶצֶף שֶׁל 5', earned: maxStreak >= 5 },
              { icon: '⭐', label: 'כׇּל הַכּוֹכָבִים', earned: totalStars >= maxStars },
              { icon: '🌟', label: '3 שְׁלָבִים מֻשְׁלָמִים', earned: stageStars.filter(s => s === 3).length >= 3 },
            ].map((ach, i) => (
              <div key={i} className={`achievement ${ach.earned ? 'ach-earned' : 'ach-locked'}`}>
                <span>{ach.icon}</span>
                <span>{ach.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="certificate">
          <div className="cert-inner">
            <p className="cert-title">תְּעוּדַת הִצְטַיְּנוּת</p>
            <p className="cert-text">נִיתֶּנֶת בָּזֹאת לְ</p>
            <p className="cert-name">{playerName}</p>
            <p className="cert-text">עַל שְׁלִיטָה מְצֻיֶּנֶת בְּ</p>
            <p className="cert-subject">שֵׁם עֶצֶם · שֵׁם תֹּאַר · שֵׁם פֹּעַל</p>
            <div className="cert-stars">⭐⭐⭐</div>
          </div>
        </div>

        <div className="gc-buttons">
          <button className="btn-restart" onClick={onRestart}>🔄 שְׂחַק שׁוּב!</button>
          {onBackToHub && (
            <button className="btn-back-to-hub" onClick={onBackToHub}>🏠 לְדַף הָרָאשִׁי</button>
          )}
        </div>
      </div>
    </div>
  )
}
