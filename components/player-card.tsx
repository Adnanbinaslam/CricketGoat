"use client"

import { Player, getInitials } from "@/lib/game-data"

interface PlayerCardProps {
  player: Player
  onClick: () => void
  isWinner?: boolean
}

export function PlayerCard({ 
  player, 
  onClick, 
  isWinner = false
}: PlayerCardProps) {
  const initials = getInitials(player.name)

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center p-4 sm:p-5 rounded-2xl 
        bg-card border-2 border-border
        transition-all duration-200 ease-out
        hover:border-primary hover:shadow-xl hover:shadow-primary/20
        active:scale-95
        w-full max-w-[160px] sm:max-w-[200px]
      `}
    >
      {isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wide">
          Stays
        </div>
      )}
      
      {/* Avatar */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center mb-4 flex-shrink-0">
        <span className="text-xl sm:text-2xl font-bold text-secondary-foreground tracking-wider">
          {initials}
        </span>
      </div>
      
      <h3 className="text-sm sm:text-base font-semibold text-foreground text-center leading-snug tracking-wide">
        {player.name}
      </h3>
      
      <p className="text-xs text-muted-foreground mt-2 tracking-wide">
        {player.team}  ·  {player.role}
      </p>
    </button>
  )
}
