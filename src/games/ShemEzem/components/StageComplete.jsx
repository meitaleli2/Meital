import { useEffect, useState } from 'react'
import { LEADERBOARD_RIVALS } from '../gameData'
import Confetti from './Confetti'

export default function StageComplete({
  stage, stageNumber, stageScore, totalScore,
  correctInStage, totalInStage, stars, playerName, isLastStage, onNext,
}) {
  const [animScore, setAnimScore] = useState(totalScore - stageScore)

  useEffect(() => {
    let current = totalScore - stageScore
    const target = totalScore
    const timer = setInterval(() => {
      current = Math.min(current + 2, target)
      setAnimScore(current)
      if (current >= target) clearInterval(timer)
    }, 50)
    return () => clearInterval(timer)
  }, [totalScore, stageScore])

  // Always show player at top
  const playerEntry = { name: playerName || 'אַתָּה', avatar: '🌟', score: totalScore }
  const adjustedRivals = LEADERBOARD_RIVALS.map((r, i) => ({
    ...r, score: Math.max(0, totalScore - (i + 1) * 7 - 3)
  }))
  const allPlayers = [playerEntry, ...adjustedRivals].sort((a, b) => b.score - a.score)
  const playerRank = allPlayers.findIndex(p => p.name === playerEntry.name) + 1
  const rankMsg = playerRank === 1 ? '🥇 אַתָּה בְּרֹאשׁ הַטַּבְלָה!' : playerRank === 2 ? '🥈 מָקוֹם שֵׁנִי! מַדְהִים!' : `מָקוֹם ${playerRank}! עוֹד קְצָת!`

  return (
    <div className="screen stage-complete-screen" style={{ '--stage-color': stage.color }}>
      <Confetti />
      <div className="complete-header" style={{ background: stage.cardGradient }}>
        <div className="burst-emoji">🎉</div>
        <h1 className="complete-title">
          {correctInStage === totalInStage ? 'מֻשְׁלָם! 🏆' : correctInStage >= totalInStage * 0.8 ? 'כׇּל הַכָּבוֹד! 🌟' : 'סִיַּמְתָּ! 💪'}
        </h1>
        <p className="complete-subtitle">סִיַּמְתָּ שְׁלַב {stageNumber}: {stage.name}</p>
      </div>

      <div className="complete-body">
        {/* Stars */}
        <div className="stars-section">
          {[1, 2, 3].map(i => (
            <span key={i} className={`big-star ${i <= stars ? 'star-earned' : 'star-empty-big'}`}
              style={{ animationDelay: `${(i - 1) * 0.3}s` }}>
              {i <= stars ? '⭐' : '☆'}
            </span>
          ))}
          <p className="stars-label">
            {correctInStage}/{totalInStage} נְכוֹנוֹת
            {stars === 3 ? ' · מֻשְׁלָם! 🏆' : stars === 2 ? ' · מְצֻיָּן! 🌟' : ' · יֹפִי! 💪'}
          </p>
        </div>

        {/* Score */}
        <div className="score-counter-section">
          <div className="score-big-display">
            <span className="score-counter-num">{animScore}</span>
            <span className="score-counter-label">נְקֻדּוֹת</span>
          </div>
          <div className="score-progress-visual">
            <div className="score-track">
              <div className="score-fill-animated"
                style={{ width: `${(totalScore / 100) * 100}%`, background: stage.cardGradient }} />
              {[20, 40, 60, 80, 100].map(mark => (
                <div key={mark} className={`score-milestone ${totalScore >= mark ? 'milestone-done' : ''}`} style={{ left: `${mark}%` }}>
                  <span>{mark}</span>
                </div>
              ))}
            </div>
            <div className="score-labels"><span>0</span><span>100 🏆</span></div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="complete-leaderboard">
          <h3 className="lb-title">📊 {rankMsg}</h3>
          <div className="lb-list-compact">
            {allPlayers.slice(0, 5).map((p, i) => {
              const isPlayer = p.name === playerEntry.name
              return (
                <div key={i} className={`lb-row-compact ${isPlayer ? 'lb-player' : ''}`}>
                  <span className="lb-rank-small">#{i + 1}</span>
                  <span className="lb-av-small">{p.avatar}</span>
                  <span className="lb-name-small">{isPlayer ? `${p.name} (אַתָּה)` : p.name}</span>
                  <div className="lb-bar-small">
                    <div className="lb-bar-fill"
                      style={{ width: `${Math.max(5, (p.score / Math.max(totalScore + 1, 1)) * 100)}%`, background: isPlayer ? stage.cardGradient : '#ddd' }} />
                  </div>
                  <span className="lb-pts-small">{p.score}</span>
                </div>
              )
            })}
          </div>
        </div>

        <button className="btn-next-stage" onClick={onNext} style={{ background: stage.cardGradient }}>
          {isLastStage ? '🏆 לְסִיּוּם הַמִּשְׂחָק!' : `לְשָׁלָב ${stageNumber + 1} ←`}
        </button>
      </div>
    </div>
  )
}
