"use client"

import { useState, useEffect, useCallback } from "react"
import { Trophy, RotateCcw, Moon, Sun, Home } from "lucide-react"
import { useTheme } from "next-themes"
import { PlayerCard } from "./player-card"
import { Category, Player, getRandomCategory } from "@/lib/game-data"

interface GameScreenProps {
  onRestart: () => void
}

const MAX_ROUNDS = 10

export function GameScreen({ onRestart }: GameScreenProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [category, setCategory] = useState<Category | null>(null)
  const [leftPlayer, setLeftPlayer] = useState<Player | null>(null)
  const [rightPlayer, setRightPlayer] = useState<Player | null>(null)
  const [winner, setWinner] = useState<Player | null>(null)
  const [winnerSide, setWinnerSide] = useState<"left" | "right" | null>(null)
  const [usedPlayerIds, setUsedPlayerIds] = useState<Set<string>>(new Set())
  const [round, setRound] = useState(1)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getNextChallenger = useCallback((cat: Category, excludeIds: Set<string>): Player | null => {
    const available = cat.players.filter(p => !excludeIds.has(p.name))
    if (available.length === 0) return null
    return available[Math.floor(Math.random() * available.length)]
  }, [])

  const initializeGame = useCallback(() => {
    const cat = getRandomCategory()
    setCategory(cat)
    
    const shuffled = [...cat.players].sort(() => Math.random() - 0.5)
    const player1 = shuffled[0]
    const player2 = shuffled[1]
    
    setLeftPlayer(player1)
    setRightPlayer(player2)
    setWinner(null)
    setWinnerSide(null)
    setUsedPlayerIds(new Set([player1.name, player2.name]))
    setRound(1)
    setGameComplete(false)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handlePick = (side: "left" | "right") => {
    if (!category || !leftPlayer || !rightPlayer || gameComplete) return
    
    const pickedPlayer = side === "left" ? leftPlayer : rightPlayer
    const loser = side === "left" ? rightPlayer : leftPlayer
    
    if (round >= MAX_ROUNDS) {
      setWinner(pickedPlayer)
      setWinnerSide(side)
      setGameComplete(true)
      return
    }

    const newUsedIds = new Set(usedPlayerIds)
    newUsedIds.add(loser.name)
    
    const nextChallenger = getNextChallenger(category, newUsedIds)
    
    if (!nextChallenger) {
      setWinner(pickedPlayer)
      setWinnerSide(side)
      setGameComplete(true)
      return
    }

    newUsedIds.add(nextChallenger.name)
    setUsedPlayerIds(newUsedIds)

    setWinner(pickedPlayer)
    setWinnerSide(side)
    
    if (side === "left") {
      setRightPlayer(nextChallenger)
    } else {
      setLeftPlayer(nextChallenger)
    }
    
    setRound(prev => prev + 1)
  }

  if (!category || !leftPlayer || !rightPlayer) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary text-xl font-medium tracking-wide">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-dvh flex flex-col bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-sm sm:text-base tracking-wide">
              Cricket<span className="text-primary">GOAT</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-secondary-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-secondary-foreground" />
              )}
            </button>
          )}
          <button
            onClick={onRestart}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4 text-secondary-foreground" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* Category Badge */}
        <div className="mb-4 sm:mb-5">
          <span className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-widest">
            {category.name}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center tracking-wide">
          Who would you pick?
        </h2>

        {/* Game Complete Screen */}
        {gameComplete && winner ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 tracking-wide">
                {winner.name}
              </h3>
              <p className="text-sm text-muted-foreground tracking-wide">
                Your {category.name}!
              </p>
            </div>
            
            <button
              onClick={onRestart}
              className="py-3 px-8 bg-primary text-primary-foreground font-bold rounded-xl 
                hover:opacity-90 transition-all duration-200 
                active:scale-[0.98] shadow-lg shadow-primary/20 tracking-wide"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Players */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-xl">
              <PlayerCard
                player={leftPlayer}
                onClick={() => handlePick("left")}
                isWinner={winnerSide === "left"}
              />
              
              <span className="text-xl sm:text-2xl font-black text-muted-foreground flex-shrink-0 tracking-widest">
                VS
              </span>
              
              <PlayerCard
                player={rightPlayer}
                onClick={() => handlePick("right")}
                isWinner={winnerSide === "right"}
              />
            </div>

            {/* Hint */}
            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground text-center tracking-wide">
              Pick a player. They stay, challengers rotate.
            </p>
          </>
        )}
      </main>
    </div>
  )
}
