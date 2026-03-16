import { useState } from 'react'

const ADMIN_USER = 'Meital'
const ADMIN_PASS = '466822'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setError('')
      onLogin()
    } else {
      setError('שֵׁם מִשְׁתַּמֵּשׁ אוֹ סִיסְמָה שְׁגוּיִים')
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="admin-login-screen">
      <div className={`admin-login-card ${shaking ? 'shake' : ''}`}>
        <div className="admin-login-header">
          <span className="admin-lock-icon">🔐</span>
          <h1 className="admin-login-title">כְּנִיסַת מַנְהֶלֶת</h1>
          <p className="admin-login-subtitle">לוֹמְדִים עִם מִיטַל</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>שֵׁם מִשְׁתַּמֵּשׁ</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="שֵׁם מִשְׁתַּמֵּשׁ"
              autoComplete="username"
              dir="ltr"
            />
          </div>
          <div className="admin-field">
            <label>סִיסְמָה</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              dir="ltr"
            />
          </div>

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" className="admin-login-btn">
            כְּנִיסָה →
          </button>
        </form>
      </div>
    </div>
  )
}
