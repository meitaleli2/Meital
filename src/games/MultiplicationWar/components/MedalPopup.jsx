import { useEffect, useState } from 'react'

export default function MedalPopup({ table }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div className={`mw-medal-popup ${visible ? 'mw-medal-popup-in' : ''}`}>
      <div className="mw-medal-popup-inner">
        <div className="mw-medal-big bounce-big">🏅</div>
        <div className="mw-medal-popup-title">יוֹפִי! 🎉</div>
        <div className="mw-medal-popup-text">אַתָּה כְּבָר שׁוֹלֵט</div>
        <div className="mw-medal-popup-table">בִּכְפוּלַת {table}!</div>
        <div className="mw-medal-stars">⭐⭐⭐</div>
      </div>
    </div>
  )
}
