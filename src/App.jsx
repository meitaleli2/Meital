import { useState } from 'react'
import HubScreen from './components/HubScreen'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ShemEzemGame from './games/ShemEzem/ShemEzemGame'
import { saveSession } from './supabase'

// Navigate to ?admin to open the admin panel (no visible link in UI)
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

  const handleSessionEnd = async (sessionData) => {
    try {
      await saveSession({
        playerName: sessionData.playerName,
        gameId: 'shem-ezem',
        gameName: 'גִּבּוֹרֵי הַשָּׂפָה',
        score: sessionData.score,
        stagesCompleted: sessionData.stagesCompleted,
        completed: sessionData.completed,
      })
    } catch (e) {
      console.error('Failed to save session:', e)
    }
  }

  const handleAdminLogin = () => {
    setAdminAuthed(true)
    setView(VIEWS.ADMIN_DASHBOARD)
  }

  const handleAdminLogout = () => {
    setAdminAuthed(false)
    setView(VIEWS.HUB)
    // Clear ?admin from URL
    window.history.replaceState({}, '', window.location.pathname)
  }

  // Secret admin access: triple-click the footer or navigate to ?admin
  const handleFooterClick = (() => {
    let clicks = 0
    let timer = null
    return () => {
      clicks++
      clearTimeout(timer)
      timer = setTimeout(() => { clicks = 0 }, 700)
      if (clicks >= 3) {
        clicks = 0
        setView(VIEWS.ADMIN_LOGIN)
      }
    }
  })()

  if (view === VIEWS.ADMIN_LOGIN) {
    return <AdminLogin onLogin={handleAdminLogin} />
  }

  if (view === VIEWS.ADMIN_DASHBOARD && adminAuthed) {
    return <AdminDashboard onLogout={handleAdminLogout} />
  }

  if (view === VIEWS.GAME_SHEM_EZEM) {
    return (
      <ShemEzemGame
        onBack={() => setView(VIEWS.HUB)}
        onSessionEnd={handleSessionEnd}
      />
    )
  }

  return (
    <div className="hub-wrapper">
      <HubScreen onSelectGame={handleSelectGame} />
      <div className="hub-admin-trigger" onClick={handleFooterClick} title="" />
    </div>
  )
}
