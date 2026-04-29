"use client"

import { useState } from "react"
import { StartScreen } from "@/components/start-screen"
import { GameScreen } from "@/components/game-screen"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  const handleStart = () => {
    setGameStarted(true)
    setGameKey(prev => prev + 1)
  }

  const handleRestart = () => {
    setGameStarted(false)
  }

  return (
    <main className="min-h-screen bg-background">
      {gameStarted ? (
        <GameScreen key={gameKey} onRestart={handleRestart} />
      ) : (
        <StartScreen onStart={handleStart} />
      )}
    </main>
  )
}
