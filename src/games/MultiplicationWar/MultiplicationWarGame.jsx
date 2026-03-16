import { useState, useRef } from 'react'
import { createSession, updateSession } from '../../supabase'
import NameScreen from './components/NameScreen'
import IntroAnimation from './components/IntroAnimation'
import GameBoard from './components/GameBoard'
import ChallengePanel from './components/ChallengePanel'
import CharSolvePanel from './components/CharSolvePanel'
import WarPanel from './components/WarPanel'
import JokerPickPanel from './components/JokerPickPanel'
import MedalPopup from './components/MedalPopup'
import MasteryPopup from './components/MasteryPopup'
import GameOverScreen from './components/GameOverScreen'

export const CHARACTERS = [
  { id: 'dragon',  name: 'הַדְּרָקוֹן הָאָדֹם',  emoji: '🐉', color: '#FF4444', gradient: 'linear-gradient(135deg, #FF4444, #8B0000)' },
  { id: 'wizard',  name: 'קוֹסֵם הַמִּסְפָּרִים', emoji: '🧙', color: '#7B2FBE', gradient: 'linear-gradient(135deg, #4361EE, #7B2FBE)' },
  { id: 'lion',    name: 'אֲרִי הַזָּהָב',        emoji: '🦁', color: '#F7C700', gradient: 'linear-gradient(135deg, #F7C700, #EB6D2F)' },
  { id: 'unicorn', name: 'חַד הַקֶּרֶן',          emoji: '🦄', color: '#FF77DD', gradient: 'linear-gradient(135deg, #FF77DD, #8B5CF6)' },
]

const SUITS = ['♠', '♥', '♦', '♣']
const pairKey = (a, b) => `${Math.min(a, b)}x${Math.max(a, b)}`

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 30 cards per player: values 1–10, 3 of each
// Value 1 = Ace (displays as "A"), Value 10 = King (displays as "K")
function createDeck() {
  const deck = []
  for (let v = 1; v <= 10; v++) {
    for (let i = 0; i < 3; i++) {
      deck.push({ value: v, suit: SUITS[i % 4], isJoker: false })
    }
  }
  return shuffle(deck)
}

// All multiplication pairs 1×1 through 10×10 (55 unique)
const TOTAL_PAIRS = 55

function isMastered(n, solved) {
  for (let m = 1; m <= 10; m++) {
    if (!solved[pairKey(n, m)]) return false
  }
  return true
}

function getNewMedals(medals, solved) {
  const newOnes = []
  for (let n = 1; n <= 10; n++) {
    if (!medals.includes(n) && isMastered(n, solved)) newOnes.push(n)
  }
  return newOnes
}

export default function MultiplicationWarGame({ onBack }) {
  const [phase, setPhase] = useState('name')
  const [playerName, setPlayerName] = useState('')
  const [character, setCharacter] = useState(null)
  const [currentRound, setCurrentRound] = useState(null)
  const [currentWarData, setCurrentWarData] = useState(null)

  // Dual-deck system
  const [playerDeck, setPlayerDeck]     = useState([])  // main draw pile
  const [charDeck, setCharDeck]         = useState([])
  const [playerWon, setPlayerWon]       = useState([])  // winnings pile
  const [charWon, setCharWon]           = useState([])
  const [shufflingPlayer, setShufflingPlayer] = useState(false)

  // War & joker award flow
  const [jokerPendingOwner, setJokerPendingOwner]     = useState(null)
  const [jokerAwardedTo, setJokerAwardedTo]           = useState(null)
  const [pendingPhaseAfterJoker, setPendingPhaseAfterJoker] = useState(null)

  // Learning & score
  const [solved, setSolved]           = useState({})
  const [medals, setMedals]           = useState([])
  const [repeatQueue, setRepeatQueue] = useState([])
  const [newMedalPopup, setNewMedalPopup] = useState(null)
  const [masteryPopup, setMasteryPopup]   = useState(null)
  const [playerWins, setPlayerWins] = useState(0)
  const [charWins, setCharWins]     = useState(0)
  const [score, setScore]           = useState(0)

  // Refs (synchronous access during handlers)
  const sessionIdRef     = useRef(null)
  const scoreRef         = useRef(0)
  const solvedRef        = useRef({})
  const medalsRef        = useRef([])
  const repeatRef        = useRef([])
  const correctCountsRef = useRef({})
  const playerDeckRef    = useRef([])
  const charDeckRef      = useRef([])
  const playerWonRef     = useRef([])
  const charWonRef       = useRef([])
  const potRef           = useRef([])

  // ── helpers ─────────────────────────────────────────────────────────────────

  const refillIfNeeded = (who) => {
    if (who === 'player') {
      if (playerDeckRef.current.length > 0) return playerDeckRef.current
      if (playerWonRef.current.length === 0) return null
      const newDeck = shuffle(playerWonRef.current)
      playerWonRef.current = []
      setPlayerWon([])
      playerDeckRef.current = newDeck
      setPlayerDeck([...newDeck])
      setShufflingPlayer(true)
      setTimeout(() => setShufflingPlayer(false), 1800)
      return newDeck
    } else {
      if (charDeckRef.current.length > 0) return charDeckRef.current
      if (charWonRef.current.length === 0) return null
      const newDeck = shuffle(charWonRef.current)
      charWonRef.current = []
      setCharWon([])
      charDeckRef.current = newDeck
      setCharDeck([...newDeck])
      return newDeck
    }
  }

  const distributeCards = (playerWins) => {
    const cards = potRef.current
    if (playerWins) {
      const newWon = [...playerWonRef.current, ...cards]
      playerWonRef.current = newWon
      setPlayerWon([...newWon])
    } else {
      const newWon = [...charWonRef.current, ...cards]
      charWonRef.current = newWon
      setCharWon([...newWon])
    }
    potRef.current = []
  }

  const determineOutcome = (pVal, cVal) => {
    if (pVal > cVal)      setPhase('player_wins')
    else if (cVal > pVal) setPhase('char_wins')
    else                  setupWar(pVal)
  }

  // ── war setup ───────────────────────────────────────────────────────────────

  const setupWar = (tieValue) => {
    let pDeck = [...playerDeckRef.current]
    let cDeck = [...charDeckRef.current]

    if (pDeck.length === 0 || cDeck.length === 0) {
      distributeCards(Math.random() < 0.5)
      setTimeout(() => setPhase('board'), 200)
      return
    }

    const warSize = Math.min(3, pDeck.length, cDeck.length)
    const playerWarCards = pDeck.splice(0, warSize)
    const charWarCards   = cDeck.splice(0, warSize)

    playerDeckRef.current = pDeck
    charDeckRef.current   = cDeck
    setPlayerDeck([...pDeck])
    setCharDeck([...cDeck])

    potRef.current = [...potRef.current, ...playerWarCards, ...charWarCards]

    const playerFaceUp   = playerWarCards[playerWarCards.length - 1]
    const charFaceUp     = charWarCards[charWarCards.length - 1]
    const playerFaceDown = playerWarCards.slice(0, -1)
    const charFaceDown   = charWarCards.slice(0, -1)

    setCurrentWarData({ tieValue, playerFaceDown, playerFaceUp, charFaceDown, charFaceUp })
    setPhase('war')
  }

  // ── event handlers ──────────────────────────────────────────────────────────

  const handleStartGame = async (name) => {
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    setPlayerName(name)
    setCharacter(char)
    const deck1 = createDeck()
    const deck2 = createDeck()
    playerDeckRef.current = deck1
    charDeckRef.current   = deck2
    setPlayerDeck(deck1)
    setCharDeck(deck2)
    const id = await createSession({ playerName: name, gameId: 'multiplication-war', gameName: 'מִלְחֶמֶת הַקְּלָפִים' })
    sessionIdRef.current = id
    setPhase('intro')
  }

  const handleIntroComplete = () => setPhase('board')

  const handleDrawCards = () => {
    const pDeckArr = refillIfNeeded('player')
    const cDeckArr = refillIfNeeded('char')
    if (!pDeckArr || !cDeckArr) { setPhase('gameover'); return }

    const pDeck = [...pDeckArr]
    const cDeck = [...cDeckArr]
    const p = pDeck.shift()
    const c = cDeck.shift()

    playerDeckRef.current = pDeck
    charDeckRef.current   = cDeck
    setPlayerDeck([...pDeck])
    setCharDeck([...cDeck])

    potRef.current = [p, c]
    setCurrentRound({ playerCard: p, charCard: c })

    if (p.isJoker) { setJokerPendingOwner('player'); setPhase('joker_pick'); return }
    if (c.isJoker) { setJokerPendingOwner('char');   setPhase('joker_pick'); return }

    determineOutcome(p.value, c.value)
  }

  const handleJokerPick = (value) => {
    const round = { ...currentRound }
    if (jokerPendingOwner === 'player') {
      round.playerCard = { ...round.playerCard, value, isJoker: false }
    } else {
      // Char picks automatically in JokerPickPanel but we still update here
      round.charCard = { ...round.charCard, value, isJoker: false }
    }
    setCurrentRound(round)
    setJokerPendingOwner(null)
    determineOutcome(round.playerCard.value, round.charCard.value)
  }

  const handleWarComplete = ({ winner, playerFaceUpValue, charFaceUpValue }) => {
    const higher = Math.max(playerFaceUpValue, charFaceUpValue)
    const lower  = Math.min(playerFaceUpValue, charFaceUpValue)

    setCurrentRound({
      playerCard: { value: winner === 'player' ? higher : lower, suit: '♠' },
      charCard:   { value: winner === 'player' ? lower : higher, suit: '♥' },
    })

    // Every war → winner gets a joker (into their winnings pile)
    const jokerCard = { value: 'J', suit: '🃏', isJoker: true }
    if (winner === 'player') {
      const newWon = [...playerWonRef.current, jokerCard]
      playerWonRef.current = newWon
      setPlayerWon([...newWon])
    } else {
      const newWon = [...charWonRef.current, jokerCard]
      charWonRef.current = newWon
      setCharWon([...newWon])
    }

    setJokerAwardedTo(winner)
    setPendingPhaseAfterJoker(winner === 'player' ? 'player_wins' : 'char_wins')
    setPhase('joker_award')
  }

  const handleJokerAwardDone = () => {
    const nextPhase = pendingPhaseAfterJoker
    setJokerAwardedTo(null)
    setPendingPhaseAfterJoker(null)
    setPhase(nextPhase)
  }

  const handleRoundComplete = ({ hintUsed, pair }) => {
    const [a, b] = pair
    const key = pairKey(a, b)
    let nextSolved = { ...solvedRef.current }
    let nextRepeat = [...repeatRef.current]

    if (hintUsed) {
      nextSolved[key] = true
      if (!nextRepeat.includes(key)) nextRepeat.push(key)
    } else {
      nextSolved[key] = true
      nextRepeat = nextRepeat.filter(k => k !== key)
    }

    const pts = hintUsed ? 5 : 10
    const newScore = scoreRef.current + pts
    scoreRef.current = newScore
    setScore(newScore)
    setPlayerWins(w => w + 1)

    const newCounts = { ...correctCountsRef.current }
    newCounts[key] = (newCounts[key] || 0) + 1
    correctCountsRef.current = newCounts
    if (newCounts[key] === 3) {
      setMasteryPopup({ a, b })
      const bonus = [2, 3, 4].map(v => ({ value: v, suit: SUITS[v % 4], isJoker: false }))
      const newWon = [...playerWonRef.current, ...bonus]
      playerWonRef.current = newWon
      setPlayerWon([...newWon])
    }

    const newMedalList = [...medalsRef.current]
    const earned = getNewMedals(newMedalList, nextSolved)
    if (earned.length > 0) {
      earned.forEach(n => newMedalList.push(n))
      medalsRef.current = newMedalList
      setMedals([...newMedalList])
      setNewMedalPopup(earned[0])
      setTimeout(() => setNewMedalPopup(null), 3000)
    }

    distributeCards(true)
    solvedRef.current = nextSolved
    repeatRef.current = nextRepeat
    setSolved({ ...nextSolved })
    setRepeatQueue([...nextRepeat])

    const allDone = medalsRef.current.length === 10
    updateSession(sessionIdRef.current, {
      score: scoreRef.current,
      stagesCompleted: Object.keys(nextSolved).length,
      completed: allDone,
    })

    if (allDone) { setTimeout(() => setPhase('gameover'), 500); return }
    setTimeout(() => setPhase('board'), 200)
  }

  const handleCharSolveDone = () => {
    setCharWins(w => w + 1)
    distributeCards(false)
    setTimeout(() => setPhase('board'), 200)
  }

  const handleRestart = () => {
    setPhase('name'); setPlayerName(''); setCharacter(null)
    setCurrentRound(null); setCurrentWarData(null)
    setPlayerDeck([]); setCharDeck([]); setPlayerWon([]); setCharWon([])
    setShufflingPlayer(false)
    setJokerPendingOwner(null); setJokerAwardedTo(null); setPendingPhaseAfterJoker(null)
    setSolved({}); setMedals([]); setRepeatQueue([])
    setNewMedalPopup(null); setMasteryPopup(null)
    setPlayerWins(0); setCharWins(0); setScore(0)
    scoreRef.current = 0; solvedRef.current = {}; medalsRef.current = []
    repeatRef.current = []; correctCountsRef.current = {}
    playerDeckRef.current = []; charDeckRef.current = []
    playerWonRef.current = []; charWonRef.current = []
    potRef.current = []; sessionIdRef.current = null
  }

  // ── render ───────────────────────────────────────────────────────────────────

  if (phase === 'name')     return <NameScreen onStart={handleStartGame} onBack={onBack} />
  if (phase === 'intro')    return <IntroAnimation playerName={playerName} character={character} onComplete={handleIntroComplete} />
  if (phase === 'gameover') return (
    <GameOverScreen
      playerName={playerName} character={character}
      playerWins={playerWins} charWins={charWins}
      score={score} medals={medals}
      onRestart={handleRestart} onBack={onBack}
    />
  )

  return (
    <div style={{ position: 'relative' }}>
      {newMedalPopup && <MedalPopup table={newMedalPopup} />}
      {masteryPopup && (
        <MasteryPopup a={masteryPopup.a} b={masteryPopup.b} onClose={() => setMasteryPopup(null)} />
      )}

      {phase === 'board' && (
        <GameBoard
          playerName={playerName} character={character}
          medals={medals} solvedCount={Object.keys(solved).length} totalPairs={TOTAL_PAIRS}
          playerWins={playerWins} charWins={charWins} score={score}
          playerDeckCount={playerDeck.length} charDeckCount={charDeck.length}
          playerWonCount={playerWon.length}   charWonCount={charWon.length}
          shufflingPlayer={shufflingPlayer}
          onDraw={handleDrawCards} onBack={onBack}
        />
      )}

      {phase === 'player_wins' && currentRound && (
        <ChallengePanel
          round={currentRound} playerName={playerName} character={character}
          repeatQueue={repeatQueue}
          onComplete={handleRoundComplete} onBack={onBack}
        />
      )}

      {phase === 'char_wins' && currentRound && (
        <CharSolvePanel
          round={currentRound} playerName={playerName} character={character}
          onDone={handleCharSolveDone} onBack={onBack}
        />
      )}

      {phase === 'war' && currentWarData && (
        <WarPanel
          warData={currentWarData} playerName={playerName} character={character}
          onWarComplete={handleWarComplete} onBack={onBack}
        />
      )}

      {phase === 'joker_pick' && (
        <JokerPickPanel
          owner={jokerPendingOwner} character={character}
          onPick={handleJokerPick}
        />
      )}

      {phase === 'joker_award' && character && (
        <div className="mw-screen mw-joker-award-screen">
          <div className="mw-joker-award-inner">
            {jokerAwardedTo === 'player' ? (
              <>
                <div className="bounce-big" style={{ fontSize: '4rem' }}>🃏</div>
                <h2 className="mw-joker-award-title">מַזָּל טוֹב! קָלַף גּוֹ׳קֶר!</h2>
                <p className="mw-joker-award-text">
                  זָכִיתָ בְּקָלַף קֶסֶם מִיוּחָד — <strong>גּוֹ׳קֶר</strong>!
                </p>
                <p className="mw-joker-award-explain">
                  קָלַף גּוֹ׳קֶר הוּא קָלַף שֶׁאַתָּה בּוֹחֵר לוֹ אֵיזֶה מִסְפָּר שֶׁתִּרְצֶה!<br />
                  בְּחַר מִסְפָּר גָּבוֹהַּ כְּדֵי לְנַצֵּחַ! 🎭
                </p>
                <p className="mw-joker-award-sub">הַקָּלַף נוֹסַף לַחֲפִיסַת הַזְּכִיּוֹת שֶׁלְּךָ...</p>
              </>
            ) : (
              <>
                <div style={{ fontSize: '2.5rem' }}>🃏</div>
                <p className="mw-joker-award-text">
                  {character.emoji} {character.name} זָכְתָה בְּקָלַף גּוֹ׳קֶר...
                </p>
              </>
            )}
            <button className="mw-btn-check" style={{ marginTop: 20 }} onClick={handleJokerAwardDone}>
              הֵבַנְתִּי! ✓
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
