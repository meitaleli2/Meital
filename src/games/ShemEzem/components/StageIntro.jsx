import { useState } from 'react'

export default function StageIntro({ stage, stageNumber, totalScore, onStart }) {
  const [step, setStep] = useState(0)
  const expl = stage.explanation

  return (
    <div className="screen stage-intro-screen" style={{ '--stage-color': stage.color }}>
      <div className="intro-header" style={{ background: stage.cardGradient }}>
        <div className="intro-header-top">
          <span className="intro-stage-num">שְׁלַב {stageNumber} מִתּוֹךְ 5</span>
          <span className="intro-total-score">⭐ {totalScore} נְקֻדּוֹת</span>
        </div>
        <div className="intro-hero-emoji">{stage.heroEmoji}</div>
        <h1 className="intro-stage-name">{stage.name}</h1>
        <p className="intro-stage-subtitle">{stage.subtitle}</p>
      </div>

      <div className="intro-content">
        {step === 0 && (
          <div className="intro-step" key="step0">
            <h2 className="intro-section-title">{expl.title}</h2>
            <p className="intro-text">{expl.text}</p>
            <div className="categories-grid">
              {expl.categories.map((cat, i) => (
                <div key={i} className="category-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-label">{cat.label}</span>
                  <span className="category-example">{cat.example}</span>
                </div>
              ))}
            </div>
            <div className="tip-box"><p>{expl.tip}</p></div>
            <button className="btn-primary" onClick={() => setStep(1)} style={{ background: stage.cardGradient }}>
              לְדֻגְמָאוֹת ←
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="intro-step" key="step1">
            <h2 className="intro-section-title">🔍 הִנֵּה כַּמָּה דֻּגְמָאוֹת:</h2>
            <div className="examples-grid">
              {expl.examples.map((ex, i) => (
                <div key={i} className="example-card" style={{ animationDelay: `${i * 0.15}s`, borderColor: stage.color }}>
                  <span className="example-emoji">{ex.emoji}</span>
                  <span className="example-word">{ex.word}</span>
                  <span className="example-badge" style={{ background: stage.color }}>{stage.name}</span>
                </div>
              ))}
            </div>
            <div className="tip-box" style={{ borderColor: stage.color }}><p>{expl.tip}</p></div>
            <button className="btn-primary" onClick={() => setStep(2)} style={{ background: stage.cardGradient }}>
              אֲנִי מוּכָן! ←
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="intro-step ready-step" key="step2">
            <div className="ready-hero">
              <span className="bounce-big">{stage.emoji}</span>
            </div>
            <h2 className="ready-title">מוּכָן לָאַתְגַּר? 💪</h2>
            <p className="ready-text">צְבֹר 20 נְקֻדּוֹת כְּדֵי לַעֲבֹר לַשְּׁלַב הַבָּא!</p>
            <div className="ready-stars-needed">
              <div className="stars-row">{'☆☆☆'}</div>
              <p>5 תְּשׁוּבוֹת נְכוֹנוֹת = 3 כּוֹכָבִים! 🌟</p>
            </div>
            <button className="btn-start-stage" onClick={onStart} style={{ background: stage.cardGradient }}>
              🚀 בּוֹאוּ נַתְחִיל!
            </button>
          </div>
        )}
      </div>

      <div className="intro-dots">
        {[0, 1, 2].map(i => (
          <span key={i} className={`dot ${step === i ? 'dot-active' : ''}`}
            style={step === i ? { background: stage.color } : {}} />
        ))}
      </div>
    </div>
  )
}
