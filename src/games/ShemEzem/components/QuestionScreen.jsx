import { useState, useEffect } from 'react'
import { CORRECT_MESSAGES, WRONG_MESSAGES, STREAK_MESSAGES, LEADERBOARD_RIVALS } from '../gameData'
import Confetti from './Confetti'
import CatchGame from './CatchGame'

const SORT_OPTIONS = ['שֵׁם עֶצֶם', 'שֵׁם תֹּאַר', 'שֵׁם פֹּעַל']
const SORT_COLORS = {
  'שֵׁם עֶצֶם': '#4361EE',
  'שֵׁם תֹּאַר': '#7B2FBE',
  'שֵׁם פֹּעַל': '#06A77D',
}
const SORT_ICONS = {
  'שֵׁם עֶצֶם': '📦',
  'שֵׁם תֹּאַר': '🎨',
  'שֵׁם פֹּעַל': '⚡',
}

// Build leaderboard always showing player at #1
function buildLeaderboard(playerName, totalScore) {
  const rivals = LEADERBOARD_RIVALS.map((r, i) => ({
    ...r,
    displayScore: Math.max(0, totalScore - (i + 1) * 7 - 3),
  }))
  const player = { name: playerName || 'אַתָּה', avatar: '🌟', displayScore: totalScore, isPlayer: true }
  return [player, ...rivals].sort((a, b) => b.displayScore - a.displayScore)
}

export default function QuestionScreen({
  stage, stageNumber, question,
  stageScore, totalScore, streak, playerName,
  onAnswer, onNext,
}) {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong'
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [streakMsg, setStreakMsg] = useState('')
  const [cardKey, setCardKey] = useState(0)
  const [catchDone, setCatchDone] = useState(false)

  // Reset on new question
  useEffect(() => {
    setSelected(null)
    setFeedback(null)
    setFeedbackMsg('')
    setShowConfetti(false)
    setStreakMsg('')
    setCatchDone(false)
    setCardKey(k => k + 1)
  }, [question])

  const handleAnswer = (answer) => {
    if (feedback !== null) return
    const isCorrect = answer === question.answer
    setSelected(answer)
    setFeedback(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      const msg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
      setFeedbackMsg(msg)
      setShowConfetti(true)
      const newStreak = streak + 1
      if (STREAK_MESSAGES[newStreak]) setStreakMsg(STREAK_MESSAGES[newStreak])
    } else {
      const msg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]
      setFeedbackMsg(msg)
    }
    onAnswer(isCorrect, question.points)
  }

  const handleCatchComplete = (correct) => {
    setCatchDone(true)
    const isCorrect = correct
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      const msg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
      setFeedbackMsg(msg)
      setShowConfetti(true)
    } else {
      const msg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]
      setFeedbackMsg(msg)
    }
    onAnswer(isCorrect, question.points)
  }

  const progressPct = Math.min(100, (stageScore / 20) * 100)
  const leaderboard = buildLeaderboard(playerName, totalScore)
  const playerRank = leaderboard.findIndex(p => p.isPlayer) + 1

  // Stars for current progress
  const starsEarned = Math.min(3, Math.floor(stageScore / 7) + (stageScore >= 20 ? 1 : 0))

  return (
    <div className="qs-layout">
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}

      {/* ===== SIDE PANEL ===== */}
      <div className="side-panel" style={{ '--stage-color': stage.color }}>
        {/* Player rank badge */}
        <div className="side-rank-badge" style={{ background: stage.cardGradient }}>
          <span className="side-rank-num">#{playerRank}</span>
          <span className="side-rank-name">{playerName || 'אַתָּה'}</span>
          <span className="side-rank-trophy">🏆</span>
        </div>

        {/* Total score */}
        <div className="side-score-box">
          <span className="side-score-label">סַּה״כ</span>
          <span className="side-score-val">{totalScore}</span>
          <span className="side-score-pts">נְקֻדּוֹת</span>
        </div>

        {/* Stars */}
        <div className="side-stars-box">
          <p className="side-stars-label">כּוֹכָבִים:</p>
          <div className="side-stars-row">
            {[1,2,3].map(i => (
              <span key={i} className={`side-star ${i <= starsEarned ? 'side-star-on' : 'side-star-off'}`}>
                {i <= starsEarned ? '⭐' : '☆'}
              </span>
            ))}
          </div>
        </div>

        {/* Stage progress */}
        <div className="side-stage-progress">
          <p className="side-progress-label">שְׁלַב {stageNumber}:</p>
          <div className="side-progress-track">
            <div
              className="side-progress-fill"
              style={{ width: `${progressPct}%`, background: stage.cardGradient }}
            />
          </div>
          <p className="side-progress-pts">{stageScore} / 20</p>
        </div>

        {/* Streak */}
        {streak >= 2 && (
          <div className="side-streak">
            <span className="side-streak-fire">🔥</span>
            <span className="side-streak-num">×{streak}</span>
          </div>
        )}

        {/* Mini leaderboard */}
        <div className="side-leaderboard">
          <p className="side-lb-title">לוּחַ מוֹבִילִים:</p>
          {leaderboard.slice(0, 4).map((p, i) => (
            <div key={i} className={`side-lb-row ${p.isPlayer ? 'side-lb-player' : ''}`}>
              <span className="side-lb-rank">{i + 1}</span>
              <span className="side-lb-av">{p.avatar}</span>
              <span className="side-lb-name">{p.isPlayer ? (playerName || 'אַתָּה') : p.name}</span>
              <span className="side-lb-pts">{p.displayScore}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MAIN QUESTION AREA ===== */}
      <div className="qs-main">
        {/* Top bar */}
        <div className="qs-topbar" style={{ background: stage.cardGradient }}>
          <span className="qs-stage-label">{stage.emoji} שְׁלַב {stageNumber} — {stage.name}</span>
          <div className="qs-progress-mini">
            <div className="qs-progress-track-mini">
              <div className="qs-progress-fill-mini" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="qs-pts-mini">{stageScore}/20 ⭐</span>
          </div>
        </div>

        {/* Streak popup */}
        {streakMsg && (
          <div className="streak-popup">{streakMsg}</div>
        )}

        {/* Question Card */}
        <div
          key={cardKey}
          className={`question-card card-enter ${feedback ? `card-${feedback}` : ''}`}
        >
          {question.type === 'catch' ? (
            <CatchGame
              key={question.id + '-' + cardKey}
              question={question}
              stage={stage}
              done={catchDone}
              onComplete={handleCatchComplete}
            />
          ) : (
            <>
              <p className="question-instruction">
                {question.instruction || getDefaultInstruction(question)}
              </p>

              {question.type === 'yesno' && (
                <YesNoQuestion question={question} stage={stage} selected={selected} feedback={feedback} onAnswer={handleAnswer} />
              )}
              {question.type === 'choose' && (
                <ChooseQuestion question={question} stage={stage} selected={selected} feedback={feedback} onAnswer={handleAnswer} />
              )}
              {question.type === 'sort' && (
                <SortQuestion question={question} stage={stage} selected={selected} feedback={feedback} onAnswer={handleAnswer} />
              )}
              {question.type === 'sentence' && (
                <SentenceQuestion question={question} stage={stage} selected={selected} feedback={feedback} onAnswer={handleAnswer} />
              )}
            </>
          )}

          {/* Feedback always shown until user clicks "הבנתי" */}
          {feedback && (
            <div className={`feedback-panel ${feedback}`}>
              <div className="feedback-icon">{feedback === 'correct' ? '✅' : '❌'}</div>
              <div className="feedback-content">
                <p className="feedback-msg">{feedbackMsg}</p>
                <p className="feedback-explanation">{question.explanation}</p>
              </div>
              <button className="btn-understood" onClick={onNext}>
                הֵבַנְתִּי, תַּמְשִׁיךְ! ←
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getDefaultInstruction(question) {
  if (question.type === 'yesno') return `הַאִם הַמִּלָּה הַזֹּאת הִיא ${question.target}?`
  if (question.type === 'sort') return 'מַה סּוּג הַמִּלָּה הַזֹּאת?'
  if (question.type === 'sentence') return 'מַה סּוּג הַמִּלָּה הַמְּסֻמֶּנֶת בַּמִּשְׁפָּט?'
  return 'בְּחַר אֶת הַתְּשׁוּבָה הַנְּכוֹנָה'
}

// ---- Sub-question components ----

function YesNoQuestion({ question, stage, selected, feedback, onAnswer }) {
  return (
    <div className="yesno-container">
      <div className="word-display-big">
        <span className="word-emoji-big">{question.emoji}</span>
        <span className="word-text-big">{question.word}</span>
        <span className="word-badge" style={{ background: stage.color }}>{question.target}?</span>
      </div>
      <div className="yesno-buttons">
        {['yes', 'no'].map(val => {
          const isSelected = selected === val
          const isCorrectAnswer = feedback && question.answer === val
          let cls = `btn-yesno ${val === 'yes' ? 'btn-yes' : 'btn-no'}`
          if (feedback) {
            if (isCorrectAnswer) cls += ' correct-answer'
            if (isSelected && feedback === 'wrong' && val !== question.answer) cls += ' wrong'
            if (isSelected && feedback === 'correct') cls += ' correct'
          }
          return (
            <button key={val} className={cls} onClick={() => onAnswer(val)} disabled={!!feedback}>
              <span>{val === 'yes' ? '👍' : '👎'}</span>
              <span>{val === 'yes' ? 'כֵּן!' : 'לֹא!'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChooseQuestion({ question, stage, selected, feedback, onAnswer }) {
  return (
    <div className="choose-container">
      <div className="sentence-display">
        <span className="sentence-emoji">{question.emoji}</span>
        <span className="sentence-text">״{question.sentence}״</span>
      </div>
      <div className="choose-grid">
        {question.options.map((option, i) => {
          const isSelected = selected === option
          const isCorrect = option === question.answer
          let cls = 'btn-option'
          if (feedback) {
            if (isCorrect) cls += ' option-correct'
            else if (isSelected) cls += ' option-wrong'
          } else if (isSelected) cls += ' option-selected'
          return (
            <button key={i} className={cls} style={{ animationDelay: `${i * 0.08}s`, '--stage-color': stage.color }}
              onClick={() => onAnswer(option)} disabled={!!feedback}>
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SortQuestion({ question, stage, selected, feedback, onAnswer }) {
  return (
    <div className="sort-container">
      <div className="word-display-big">
        <span className="word-emoji-big">{question.emoji}</span>
        <span className="word-text-big">{question.word}</span>
        {question.hint && <span className="word-hint">💭 {question.hint}</span>}
      </div>
      <div className="sort-buttons">
        {SORT_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt
          const isCorrect = opt === question.answer
          let cls = 'btn-sort'
          if (feedback) {
            if (isCorrect) cls += ' sort-correct'
            else if (isSelected) cls += ' sort-wrong'
          } else if (isSelected) cls += ' sort-selected'
          return (
            <button key={i} className={cls}
              style={{ '--sort-color': SORT_COLORS[opt], animationDelay: `${i * 0.1}s` }}
              onClick={() => onAnswer(opt)} disabled={!!feedback}>
              <span className="sort-icon">{SORT_ICONS[opt]}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SentenceQuestion({ question, stage, selected, feedback, onAnswer }) {
  const words = question.sentence.split(' ')
  return (
    <div className="sentence-container">
      <div className="full-sentence-box">
        {words.map((word, i) => (
          <span key={i}
            className={`sentence-word ${word === question.targetWord ? 'target-word' : ''}`}
            style={word === question.targetWord ? { color: stage.color } : {}}>
            {word}
          </span>
        ))}
      </div>
      <p className="sentence-prompt">
        מַה סּוּג הַמִּלָּה <strong style={{ color: stage.color }}>{question.targetWord}</strong>?
      </p>
      <div className="sort-buttons">
        {SORT_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt
          const isCorrect = opt === question.answer
          let cls = 'btn-sort'
          if (feedback) {
            if (isCorrect) cls += ' sort-correct'
            else if (isSelected) cls += ' sort-wrong'
          } else if (isSelected) cls += ' sort-selected'
          return (
            <button key={i} className={cls}
              style={{ '--sort-color': SORT_COLORS[opt], animationDelay: `${i * 0.1}s` }}
              onClick={() => onAnswer(opt)} disabled={!!feedback}>
              <span className="sort-icon">{SORT_ICONS[opt]}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
