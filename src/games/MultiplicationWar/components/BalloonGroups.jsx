import { useState, useEffect } from 'react'

const GROUP_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#F7DC6F', '#DDA0DD', '#52BE80', '#F39C12', '#E74C3C']

export default function BalloonGroups({ a, b, autoPlay = true, onComplete }) {
  const [visibleGroups, setVisibleGroups] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!autoPlay) return
    if (visibleGroups < a) {
      const delay = visibleGroups === 0 ? 300 : 600
      const t = setTimeout(() => setVisibleGroups(g => g + 1), delay)
      return () => clearTimeout(t)
    } else if (!done) {
      setDone(true)
      if (onComplete) setTimeout(onComplete, 1200)
    }
  }, [visibleGroups, a, autoPlay, done])

  const showCompact = a * b > 36 // too many balloons — use mini mode

  const skipToEnd = () => {
    setVisibleGroups(a)
    setDone(true)
  }

  return (
    <div className="bg-wrapper" onClick={!done ? skipToEnd : undefined}>
      {/* Concept header */}
      <div className="bg-concept">
        <span className="bg-concept-eq">
          {a} × {b} = {a} <strong>פְּעָמִים</strong> {b}
        </span>
        <span className="bg-concept-hint">נִסְפֹּר {b}, {a} פְּעָמִים:</span>
      </div>

      {/* Groups */}
      <div className="bg-groups">
        {Array.from({ length: Math.min(visibleGroups, a) }).map((_, gi) => (
          <div
            key={gi}
            className="bg-group bg-group-appear"
            style={{ borderColor: GROUP_COLORS[gi % GROUP_COLORS.length] }}
          >
            <div className="bg-group-label" style={{ color: GROUP_COLORS[gi % GROUP_COLORS.length] }}>
              פַּעַם {gi + 1}
            </div>
            <div className={`bg-balloons ${showCompact ? 'bg-compact' : ''}`}>
              {Array.from({ length: b }).map((_, bi) => (
                <span
                  key={bi}
                  className="bg-balloon"
                  style={{
                    animationDelay: `${bi * 0.06}s`,
                    filter: `hue-rotate(${(gi * 40) % 360}deg)`,
                    fontSize: showCompact ? '16px' : '22px',
                  }}
                >
                  🎈
                </span>
              ))}
            </div>
            <div className="bg-group-count" style={{ background: GROUP_COLORS[gi % GROUP_COLORS.length] }}>
              {(gi + 1) * b}
            </div>
          </div>
        ))}
      </div>

      {/* Running total */}
      <div className={`bg-total-row ${done ? 'bg-total-final' : ''}`}>
        {visibleGroups > 0 && (
          <>
            <span className="bg-total-label">סָה״כ:</span>
            <span className="bg-total-num">{visibleGroups * b}</span>
            {done && <span className="bg-checkmark">✅</span>}
          </>
        )}
      </div>

      {!done && visibleGroups < a && (
        <div className="bg-skip-hint">לְחַץ לְדִלּוּג ←</div>
      )}
    </div>
  )
}
