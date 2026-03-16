import { useEffect, useState } from 'react'

export default function GameOverScreen({ playerName, character, playerWins, charWins, score, medals, onRestart, onBack }) {
  const [animScore, setAnimScore] = useState(0)

  useEffect(() => {
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + 3, score)
      setAnimScore(cur)
      if (cur >= score) clearInterval(t)
    }, 25)
    return () => clearInterval(t)
  }, [score])

  const allMedals = medals.length === 10

  return (
    <div className="mw-screen mw-gameover-screen" style={{ '--char-gradient': character.gradient }}>
      <div className="mw-go-header" style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
        <span className="mw-go-trophy bounce-big">🏆</span>
        <h1 className="mw-go-title">
          {allMedals ? 'שָׁלַטְתָּ בְּכׇּל הַכְּפוּלוֹת!' : 'סִיַּמְתָּ אֶת הַמִּשְׂחָק!'}
        </h1>
        <p className="mw-go-name">{playerName}</p>
        {allMedals && <p className="mw-go-sub">אַלּוּף/פַת לוּחַ הַכֶּפֶל! 🦸</p>}
      </div>

      <div className="mw-go-body">
        {/* Score circle */}
        <div className="mw-go-score-circle">
          <span className="mw-go-score-num">{animScore}</span>
          <span className="mw-go-score-label">נְקֻדּוֹת</span>
        </div>

        {/* Medals earned */}
        <div className="mw-go-medals-section">
          <h3 className="mw-go-medals-title">🏅 הַכְּפוּלוֹת שֶׁשָּׁלַטְתָּ בָּהֶן:</h3>
          <div className="mw-go-medals-row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <div key={n} className={`mw-go-medal-chip ${medals.includes(n) ? 'earned' : 'missing'}`}>
                {medals.includes(n) ? (
                  <><span>🏅</span><span className="mw-go-medal-n">×{n}</span></>
                ) : (
                  <><span>○</span><span className="mw-go-medal-n">×{n}</span></>
                )}
              </div>
            ))}
          </div>
          <p className="mw-go-medals-count">{medals.length} מִתּוֹךְ 10 כְּפוּלוֹת</p>
        </div>

        {/* Battle score */}
        <div className="mw-go-battle">
          <div className="mw-go-battle-row">
            <span>🌟 {playerName}</span>
            <span className="mw-go-battle-wins">{playerWins} נִצְחוֹנוֹת</span>
          </div>
          <div className="mw-go-battle-row char-row" style={{ color: character.color }}>
            <span>{character.emoji} {character.name}</span>
            <span className="mw-go-battle-wins">{charWins} נִצְחוֹנוֹת</span>
          </div>
        </div>

        {/* Certificate */}
        {allMedals && (
          <div className="mw-certificate">
            <div className="mw-cert-inner">
              <p className="mw-cert-title">תְּעוּדַת שְׁלִיטָה</p>
              <p className="mw-cert-to">נִיתֶּנֶת לְ</p>
              <p className="mw-cert-name">{playerName}</p>
              <p className="mw-cert-text">עַל שְׁלִיטָה מֻשְׁלֶמֶת בְּלוּחַ הַכֶּפֶל</p>
              <div className="mw-cert-medals">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <span key={n}>🏅</span>)}
              </div>
            </div>
          </div>
        )}

        <div className="mw-go-btns">
          <button className="mw-btn-restart" onClick={onRestart}>🔄 שְׂחַק שׁוּב!</button>
          <button className="mw-btn-back-hub" onClick={onBack}>🏠 דַּף רָאשִׁי</button>
        </div>
      </div>
    </div>
  )
}
