import { useState, useRef } from 'react'
import { stages } from './gameData'
import WelcomeScreen from './components/WelcomeScreen'
import StageIntro from './components/StageIntro'
import QuestionScreen from './components/QuestionScreen'
import StageComplete from './components/StageComplete'
import GameComplete from './components/GameComplete'
import { createSession, updateSession } from '../../supabase'

const SCREENS = {
  WELCOME: 'welcome',
  INTRO: 'intro',
  PLAYING: 'playing',
  STAGE_COMPLETE: 'stageComplete',
  GAME_COMPLETE: 'gameComplete',
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ShemEzemGame({ onBack }) {
  const [screen, setScreen] = useState(SCREENS.WELCOME)
  const [playerName, setPlayerName] = useState('')
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [stageScore, setStageScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [correctInStage, setCorrectInStage] = useState(0)
  const [totalInStage, setTotalInStage] = useState(0)
  const [stageStars, setStageStars] = useState([])
  const [questionPool, setQuestionPool] = useState([])
  const [queueIndex, setQueueIndex] = useState(0)

  const stageScoreRef = useRef(0)
  const totalInStageRef = useRef(0)
  const totalScoreRef = useRef(0)
  const stagesCompletedRef = useRef(0)
  const playerNameRef = useRef('')
  const sessionIdRef = useRef(null)  // Supabase session id

  const currentStage = stages[currentStageIndex]
  const currentQuestion = questionPool[queueIndex]

  const handleStartGame = async (name) => {
    setPlayerName(name)
    playerNameRef.current = name
    // Create DB session immediately
    const id = await createSession({ playerName: name, gameId: 'shem-ezem', gameName: 'גיבורי השפה' })
    sessionIdRef.current = id
    initStage(0)
    setScreen(SCREENS.INTRO)
  }

  const initStage = (stageIdx) => {
    const pool = shuffle([...stages[stageIdx].questions])
    setQuestionPool(pool)
    setQueueIndex(0)
    setStageScore(0)
    setCorrectInStage(0)
    setTotalInStage(0)
    stageScoreRef.current = 0
    totalInStageRef.current = 0
  }

  const handleStartStage = () => setScreen(SCREENS.PLAYING)

  const handleAnswer = (isCorrect, points) => {
    totalInStageRef.current += 1
    setTotalInStage(totalInStageRef.current)
    if (isCorrect) {
      const newStageScore = stageScore + points
      const newTotalScore = totalScore + points
      const newStreak = streak + 1
      stageScoreRef.current = newStageScore
      totalScoreRef.current = newTotalScore
      setStageScore(newStageScore)
      setTotalScore(newTotalScore)
      setStreak(newStreak)
      setMaxStreak(prev => Math.max(prev, newStreak))
      setCorrectInStage(c => c + 1)
      // Update DB score in real-time after every correct answer
      updateSession(sessionIdRef.current, {
        score: newTotalScore,
        stagesCompleted: stagesCompletedRef.current,
        completed: false,
      })
    } else {
      setStreak(0)
    }
  }

  const handleNextQuestion = () => {
    if (stageScoreRef.current >= 20) {
      const attempts = totalInStageRef.current
      const stars = attempts <= 5 ? 3 : attempts <= 7 ? 2 : 1
      setStageStars(prev => [...prev, stars])
      stagesCompletedRef.current += 1
      // Update DB after stage complete
      updateSession(sessionIdRef.current, {
        score: totalScoreRef.current,
        stagesCompleted: stagesCompletedRef.current,
        completed: false,
      })
      setScreen(SCREENS.STAGE_COMPLETE)
      return
    }
    let nextIdx = queueIndex + 1
    if (nextIdx >= questionPool.length) {
      setQuestionPool(shuffle([...stages[currentStageIndex].questions]))
      setQueueIndex(0)
    } else {
      setQueueIndex(nextIdx)
    }
  }

  const handleNextStage = () => {
    const nextStageIndex = currentStageIndex + 1
    if (nextStageIndex >= stages.length) {
      // Game complete
      updateSession(sessionIdRef.current, {
        score: totalScoreRef.current,
        stagesCompleted: stagesCompletedRef.current,
        completed: true,
      })
      setScreen(SCREENS.GAME_COMPLETE)
    } else {
      setCurrentStageIndex(nextStageIndex)
      initStage(nextStageIndex)
      setScreen(SCREENS.INTRO)
    }
  }

  const handleRestart = () => {
    setScreen(SCREENS.WELCOME)
    setPlayerName('')
    playerNameRef.current = ''
    setCurrentStageIndex(0)
    setTotalScore(0)
    setStageScore(0)
    setStreak(0)
    setMaxStreak(0)
    setCorrectInStage(0)
    setTotalInStage(0)
    setStageStars([])
    stageScoreRef.current = 0
    totalScoreRef.current = 0
    stagesCompletedRef.current = 0
    sessionIdRef.current = null
  }

  const handleBack = () => {
    // Mark current session as not completed (already updated in real-time)
    onBack()
  }

  return (
    <div className="app-root">
      {screen !== SCREENS.WELCOME && screen !== SCREENS.GAME_COMPLETE && (
        <button className="btn-back-hub" onClick={handleBack}>← דַּף רָאשִׁי</button>
      )}

      {screen === SCREENS.WELCOME && (
        <WelcomeScreen onStart={handleStartGame} onBack={onBack} />
      )}
      {screen === SCREENS.INTRO && (
        <StageIntro
          stage={currentStage}
          stageNumber={currentStageIndex + 1}
          totalScore={totalScore}
          onStart={handleStartStage}
        />
      )}
      {screen === SCREENS.PLAYING && currentQuestion && (
        <QuestionScreen
          stage={currentStage}
          stageNumber={currentStageIndex + 1}
          question={currentQuestion}
          stageScore={stageScore}
          totalScore={totalScore}
          streak={streak}
          playerName={playerName}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
        />
      )}
      {screen === SCREENS.STAGE_COMPLETE && (
        <StageComplete
          stage={currentStage}
          stageNumber={currentStageIndex + 1}
          stageScore={stageScore}
          totalScore={totalScore}
          correctInStage={correctInStage}
          totalInStage={totalInStage}
          stars={stageStars[stageStars.length - 1] || 1}
          playerName={playerName}
          isLastStage={currentStageIndex === stages.length - 1}
          onNext={handleNextStage}
        />
      )}
      {screen === SCREENS.GAME_COMPLETE && (
        <GameComplete
          playerName={playerName}
          totalScore={totalScore}
          maxStreak={maxStreak}
          stageStars={stageStars}
          onRestart={handleRestart}
          onBackToHub={onBack}
        />
      )}
    </div>
  )
}
