import { useState } from 'react'
import HubScreen from './components/HubScreen'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ShemEzemGame from './games/ShemEzem/ShemEzemGame'

const isAdminRoute = () =>
  typeof window !== 'undefined' && window.location.search.includes('admin')

const VIEWS = {
  HUB: 'hub',
  GAME_SHEM_EZEM: 'shem-ezem',
  ADMIN_LOGIN: 'admin-login',
  ADMIN_DASHBOARD: 'admin-dashboard',
}

export default function App() {
  const [view, setView] = useState(isAdminRoute() ? VIEWS.ADMIN_LOGIN : VIEWS.HUB)
  const [adminAuthed, setAdminAuthed] = useState(false)

  const handleSelectGame = (gameId) => {
    if (gameId === 'shem-ezem') setView(VIEWS.GAME_SHEM_EZEM)
  }

  const handleAdminLogin = () => {
    setAdminAuthed(true)
    setView(VIEWS.ADMIN_DASHBOARD)
  }

  const handleAdminLogout = () => {
    setAdminAuthed(false)
    setView(VIEWS.HUB)
    window.history.replaceState({}, '', window.location.pathname)
  }

  const handleFooterClick = (() => {
    let clicks = 0, timer = null
    return () => {
      clicks++
      clearTimeout(timer)
      timer = setTimeout(() => { clicks = 0 }, 700)
      if (clicks >= 3) { clicks = 0; setView(VIEWS.ADMIN_LOGIN) }
    }
  })()

  if (view === VIEWS.ADMIN_LOGIN) return <AdminLogin onLogin={handleAdminLogin} />
  if (view === VIEWS.ADMIN_DASHBOARD && adminAuthed) return <AdminDashboard onLogout={handleAdminLogout} />
  if (view === VIEWS.GAME_SHEM_EZEM) return <ShemEzemGame onBack={() => setView(VIEWS.HUB)} />

  return (
    <div className="hub-wrapper">
      <HubScreen onSelectGame={handleSelectGame} />
      <div className="hub-admin-trigger" onClick={handleFooterClick} />
    </div>
  )
}
