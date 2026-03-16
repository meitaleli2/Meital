import { useEffect, useState } from 'react'

export default function MasteryPopup({ a, b, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const t = setTimeout(onClose, 4500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`mw-mastery-popup ${visible ? 'mw-mastery-popup-in' : ''}`}>
      <div className="mw-mastery-inner">
        <div className="mw-mastery-emoji bounce-big">🎁</div>
        <div className="mw-mastery-title">יָפֶה מְאֹד! 🎉</div>
        <div className="mw-mastery-text">
          עָנִיתָ עַל <strong>{a} × {b}</strong> נָכוֹן
        </div>
        <div className="mw-mastery-count">כְּבָר 3 פְּעָמִים!</div>
        <div className="mw-mastery-bonus">+3 קְלָפִים בְּמַתָּנָה 🃏🃏🃏</div>
      </div>
    </div>
  )
}
