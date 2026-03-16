import { useEffect, useState } from 'react'
import { fetchAllSessions } from '../supabase'

export default function AdminDashboard({ onLogout }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortField, setSortField] = useState('created_at')
  const [sortDir, setSortDir] = useState('desc')
  const [filter, setFilter] = useState('')

  const load = () => {
    fetchAllSessions()
      .then(data => { setSessions(data); setLoading(false) })
      .catch(() => { setError('שְׁגִיאָה בְּטְעִינַת הַנְּתוּנִים'); setLoading(false) })
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 30000) // auto-refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const filtered = sessions.filter(s =>
    !filter || s.player_name?.toLowerCase().includes(filter.toLowerCase()) ||
    s.game_name?.toLowerCase().includes(filter.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    let va = a[sortField], vb = b[sortField]
    if (typeof va === 'string') va = va.toLowerCase(), vb = vb.toLowerCase()
    if (va < vb) return sortDir === 'asc' ? -1 : 1
    if (va > vb) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
      ' ' + d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
  }

  const SortIcon = ({ field }) => (
    <span className="sort-icon">
      {sortField === field ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}
    </span>
  )

  // Stats
  const totalPlayers = new Set(sessions.map(s => s.player_name)).size
  const totalGames = sessions.length
  const avgScore = sessions.length ? Math.round(sessions.reduce((s, x) => s + x.score, 0) / sessions.length) : 0

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-topbar-logo">📊</span>
          <h1 className="admin-topbar-title">לוּחַ הַנְּהָלָה — לוֹמְדִים עִם מִיטַל</h1>
        </div>
        <button className="admin-logout-btn" onClick={onLogout}>יְצִיאָה 🚪</button>
      </div>

      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <span className="admin-stat-icon">👥</span>
          <span className="admin-stat-num">{totalPlayers}</span>
          <span className="admin-stat-label">שַׂחְקָנִים</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon">🎮</span>
          <span className="admin-stat-num">{totalGames}</span>
          <span className="admin-stat-label">מִשְׂחָקִים</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon">⭐</span>
          <span className="admin-stat-num">{avgScore}</span>
          <span className="admin-stat-label">ממוצע נקודות</span>
        </div>
      </div>

      <div className="admin-table-section">
        <div className="admin-table-toolbar">
          <input
            className="admin-search"
            type="text"
            placeholder="🔍 חיפוש לפי שם..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            dir="rtl"
          />
          <button className="admin-refresh-btn" onClick={() => {
            setLoading(true)
            fetchAllSessions().then(d => { setSessions(d); setLoading(false) })
          }}>🔄 רַעְנֵן</button>
        </div>

        {loading && <div className="admin-loading">טוֹעֵן נְתוּנִים...</div>}
        {error && <div className="admin-error-msg">{error}</div>}
        {!loading && !error && sessions.length === 0 && (
          <div className="admin-empty">עֲדַיִן לֹא שׂוֹחֲקִים — הַמִּשְׂחָקִים מְחַכִּים! 🎮</div>
        )}

        {!loading && sorted.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('player_name')} className="sortable">
                    שַׂחְקָן <SortIcon field="player_name" />
                  </th>
                  <th onClick={() => handleSort('game_name')} className="sortable">
                    מִשְׂחָק <SortIcon field="game_name" />
                  </th>
                  <th onClick={() => handleSort('score')} className="sortable">
                    נְקֻדּוֹת <SortIcon field="score" />
                  </th>
                  <th onClick={() => handleSort('stages_completed')} className="sortable">
                    שְׁלָבִים <SortIcon field="stages_completed" />
                  </th>
                  <th>סִיּוּם</th>
                  <th onClick={() => handleSort('created_at')} className="sortable">
                    תַּאֲרִיךְ <SortIcon field="created_at" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => (
                  <tr key={s.id || i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td className="td-player">
                      <span className="td-avatar">🌟</span> {s.player_name}
                    </td>
                    <td>{s.game_name}</td>
                    <td className="td-score">
                      <span className="score-badge">{s.score}</span>
                    </td>
                    <td className="td-stages">{s.stages_completed} / 5</td>
                    <td>{s.completed ? '✅' : '⏸️'}</td>
                    <td className="td-date">{formatDate(s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
