export default function HubScreen({ onSelectGame }) {
  const games = [
    {
      id: 'shem-ezem',
      name: 'גִּבּוֹרֵי הַשָּׂפָה',
      subtitle: 'שֵׁם עֶצֶם · שֵׁם תֹּאַר · שֵׁם פֹּעַל',
      emoji: '📚',
      color: '#4361EE',
      gradient: 'linear-gradient(135deg, #4361EE, #7B2FBE)',
      available: true,
      ageLabel: 'כִּתָּה ב׳',
    },
    {
      id: 'multiplication-war',
      name: 'מִלְחֶמֶת הַקְּלָפִים',
      subtitle: 'לְמַד לוּחַ הַכֶּפֶל בְּמִשְׂחָק קְלָפִים!',
      emoji: '🃏',
      color: '#FFD700',
      gradient: 'linear-gradient(135deg, #FFD700, #FF8C00)',
      available: true,
      ageLabel: 'כִּתָּה ב׳–ג׳',
    },
    {
      id: 'science-coming',
      name: 'חוֹקְרֵי הַטֶּבַע',
      subtitle: 'חַיּוֹת, צְמָחִים וְטֶבַע',
      emoji: '🌿',
      color: '#06D6A0',
      gradient: 'linear-gradient(135deg, #06D6A0, #0077B6)',
      available: false,
      ageLabel: 'בְּקָרוֹב',
    },
  ]

  return (
    <div className="hub-screen">
      <div className="hub-header">
        <div className="hub-logo">📚</div>
        <h1 className="hub-title">לוֹמְדִים עִם מִיטַל</h1>
        <p className="hub-subtitle">בְּחַר מִשְׂחָק וְהַתְחֵל לִלְמֹד!</p>
      </div>

      <div className="hub-games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className={`hub-game-card ${game.available ? 'hub-game-available' : 'hub-game-coming'}`}
            onClick={() => game.available && onSelectGame(game.id)}
            style={{ '--card-gradient': game.gradient, '--card-color': game.color }}
          >
            <div className="hub-card-header" style={{ background: game.gradient }}>
              <span className="hub-card-emoji">{game.emoji}</span>
              <span className="hub-card-age">{game.ageLabel}</span>
            </div>
            <div className="hub-card-body">
              <h2 className="hub-card-name">{game.name}</h2>
              <p className="hub-card-subtitle">{game.subtitle}</p>
            </div>
            {game.available ? (
              <button className="hub-card-btn" style={{ background: game.gradient }}>
                🚀 שְׂחַק עַכְשָׁו!
              </button>
            ) : (
              <div className="hub-coming-soon">🔜 בְּקָרוֹב...</div>
            )}
          </div>
        ))}
      </div>

      <div className="hub-footer">
        <p>לוֹמְדִים עִם מִיטַל © 2025</p>
      </div>
    </div>
  )
}
