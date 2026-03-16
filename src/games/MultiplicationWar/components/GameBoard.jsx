export default function GameBoard({
  playerName, character, medals, solvedCount, totalPairs,
  playerWins, charWins, score,
  playerDeckCount, charDeckCount, playerWonCount, charWonCount,
  shufflingPlayer, onDraw, onBack,
}) {
  const progress = Math.round((solvedCount / totalPairs) * 100)

  return (
    <div className="mw-screen mw-board-screen" style={{ '--char-color': character.color, '--char-gradient': character.gradient }}>
      <button className="btn-back-hub" onClick={onBack}>← דַּף רָאשִׁי</button>

      {/* Medal row — tables 1–10 */}
      <div className="mw-medal-bar">
        <span className="mw-medal-bar-title">כְּפוּלוֹת:</span>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <div key={n} className={`mw-medal-chip ${medals.includes(n) ? 'mw-medal-earned' : ''}`}>
            {medals.includes(n) ? '🏅' : <span className="mw-medal-num">{n}</span>}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mw-progress-bar-wrapper">
        <div className="mw-progress-bar-track">
          <div className="mw-progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="mw-progress-label">{solvedCount}/{totalPairs} כְּפוּלוֹת</span>
      </div>

      <div className="mw-score-display">⭐ {score} נְקֻדּוֹת</div>

      {/* Battlefield */}
      <div className="mw-battlefield">

        {/* Character side */}
        <div className="mw-battle-side mw-char-side">
          <div className="mw-side-avatar" style={{ background: character.gradient }}>
            {character.emoji}
          </div>
          <div className="mw-side-name">{character.name}</div>
          <div className="mw-wins-count">{charWins} 🏆</div>

          <div className="mw-decks-row">
            {/* Char main deck */}
            <div className="mw-deck-visual mw-deck-char">
              <div className="mw-card-stack-back mw-char-card" />
              <div className="mw-card-stack-back mw-char-card offset1" />
              <div className="mw-deck-count">{charDeckCount}</div>
              <div className="mw-deck-label">חֲפִיסָה</div>
            </div>
            {/* Char winnings pile */}
            {charWonCount > 0 && (
              <div className="mw-won-pile mw-won-pile-char">
                <div className="mw-won-card-stack" />
                <div className="mw-won-count">{charWonCount}</div>
                <div className="mw-deck-label">זְכִיּוֹת</div>
              </div>
            )}
          </div>
        </div>

        {/* Center VS */}
        <div className="mw-battle-center">
          <div className="mw-center-sword">⚔️</div>
          <div className="mw-center-vs">VS</div>
          {shufflingPlayer && (
            <div className="mw-shuffling-msg">
              <span className="mw-shuffle-icon">🔀</span>
              מְעַרְבֵּב זְכִיּוֹת!
            </div>
          )}
        </div>

        {/* Player side */}
        <div className="mw-battle-side mw-player-side">
          <div className="mw-side-avatar mw-player-avatar-bg">🌟</div>
          <div className="mw-side-name">{playerName}</div>
          <div className="mw-wins-count">{playerWins} 🏆</div>

          <div className="mw-decks-row">
            {/* Player main deck — tap to draw */}
            <div
              className="mw-deck-visual mw-deck-player mw-deck-tap"
              onClick={!shufflingPlayer ? onDraw : undefined}
              role="button"
            >
              <div className="mw-card-stack-back" />
              <div className="mw-card-stack-back offset1" />
              <div className="mw-deck-count">{playerDeckCount}</div>
              <div className="mw-deck-label">חֲפִיסָה</div>
            </div>
            {/* Player winnings pile */}
            {playerWonCount > 0 && (
              <div
                className="mw-won-pile mw-won-pile-player"
                key={playerWonCount}  /* re-triggers pulse on grow */
              >
                <div className="mw-won-card-stack" />
                <div className="mw-won-count">{playerWonCount}</div>
                <div className="mw-deck-label">זְכִיּוֹת 🏆</div>
              </div>
            )}
          </div>

          {!shufflingPlayer && (
            <div className="mw-tap-cta">
              <span className="mw-bounce-arrow">👆</span>
              לְחַץ לִשְׁלֹף קְלָף!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
