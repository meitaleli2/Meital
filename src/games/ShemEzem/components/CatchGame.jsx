import { useState, useEffect, useRef } from 'react'

const BUBBLE_COLORS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fda085, #f6d365)',
]

export default function CatchGame({ question, stage, done, onComplete }) {
  const targets = question.words.filter(w => w.isTarget)
  const totalTargets = targets.length

  const [bubbles, setBubbles] = useState(() =>
    question.words.map((w, i) => ({
      ...w,
      id: i,
      color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
      // Random starting positions (as % of container)
      x: 10 + (i * 14) % 70,
      y: 10 + (i * 23) % 60,
      // Random drift direction
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      scale: 1,
      popped: false,
      wrong: false,
      wobble: false,
    }))
  )

  const [caught, setCaught] = useState(0)
  const [wrongTaps, setWrongTaps] = useState(0)
  const [finished, setFinished] = useState(false)
  const rafRef = useRef(null)
  const bubblesRef = useRef(bubbles)
  bubblesRef.current = bubbles

  // Animate bubble positions
  useEffect(() => {
    if (finished || done) return
    const animate = () => {
      setBubbles(prev => prev.map(b => {
        if (b.popped) return b
        let nx = b.x + b.dx
        let ny = b.y + b.dy
        let ndx = b.dx
        let ndy = b.dy
        // Bounce off edges
        if (nx < 3 || nx > 82) ndx = -ndx * 0.9
        if (ny < 3 || ny > 72) ndy = -ndy * 0.9
        nx = Math.max(3, Math.min(82, nx))
        ny = Math.max(3, Math.min(72, ny))
        return { ...b, x: nx, y: ny, dx: ndx, dy: ndy }
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [finished, done])

  const handleBubbleTap = (bubble) => {
    if (bubble.popped || finished || done) return

    if (bubble.isTarget) {
      // Correct! Pop it
      setBubbles(prev => prev.map(b =>
        b.id === bubble.id ? { ...b, popped: true, scale: 1.5 } : b
      ))
      const newCaught = caught + 1
      setCaught(newCaught)

      if (newCaught >= totalTargets) {
        setFinished(true)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        setTimeout(() => onComplete(true), 600)
      }
    } else {
      // Wrong tap - wobble
      setBubbles(prev => prev.map(b =>
        b.id === bubble.id ? { ...b, wobble: true } : b
      ))
      setTimeout(() => {
        setBubbles(prev => prev.map(b =>
          b.id === bubble.id ? { ...b, wobble: false } : b
        ))
      }, 500)
      setWrongTaps(w => w + 1)
    }
  }

  return (
    <div className="catch-game-wrap">
      <p className="catch-instruction">{question.instruction}</p>

      <div className="catch-progress">
        <span className="catch-progress-text">
          תָּפַסְתָּ: {caught} / {totalTargets}
        </span>
        <div className="catch-bar">
          <div
            className="catch-bar-fill"
            style={{ width: `${(caught / totalTargets) * 100}%`, background: stage.cardGradient }}
          />
        </div>
      </div>

      <div className="catch-arena">
        {bubbles.map(bubble => (
          <button
            key={bubble.id}
            className={`bubble ${bubble.popped ? 'bubble-popped' : ''} ${bubble.wobble ? 'bubble-wobble' : ''}`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              background: bubble.popped ? '#4ade80' : bubble.color,
              transform: `scale(${bubble.popped ? 0 : bubble.scale})`,
            }}
            onClick={() => handleBubbleTap(bubble)}
            disabled={bubble.popped || finished || done}
          >
            <span className="bubble-emoji">{bubble.emoji}</span>
            <span className="bubble-word">{bubble.word}</span>
            {bubble.popped && <span className="bubble-check">✅</span>}
          </button>
        ))}

        {finished && (
          <div className="catch-success-overlay">
            <span className="catch-success-emoji">🎉</span>
            <p className="catch-success-text">כׇּל הַכָּבוֹד!</p>
          </div>
        )}
      </div>

      <p className="catch-hint">
        🎯 לְחַץ רַק עַל הַבּוּעוֹת שֶׁהֵן <strong style={{ color: stage.color }}>{question.targetType}</strong>!
      </p>
    </div>
  )
}
