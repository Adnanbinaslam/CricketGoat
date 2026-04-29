"use client"

import { Trophy, Zap, Target, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-dvh flex flex-col bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-bold text-foreground text-sm sm:text-base tracking-wide">
            Cricket<span className="text-primary">GOAT</span>
          </h1>
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
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-sm w-full">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 border-2 border-primary/30 mb-5">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Cricket<span className="text-primary">GOAT</span>
            </h1>
            
            <p className="text-sm sm:text-base text-muted-foreground tracking-wide">
              This or That  -  IPL Edition
            </p>
          </div>

          {/* Features */}
          <div className="flex justify-center gap-8 sm:gap-10 mb-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">Pick</p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">Winner Stays</p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Trophy className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">Crown GOAT</p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            className="w-full py-4 px-8 bg-primary text-primary-foreground font-bold text-base rounded-xl 
              hover:opacity-90 transition-all duration-200 
              active:scale-[0.98] shadow-lg shadow-primary/25 tracking-wide"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}
