
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  expression: string
  meaning: string
  reading: string
  status?: boolean | null
}

export default function Card({ expression, meaning, reading }: CardProps) {
  const [flipped, setFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleClick = () => {
    if (isMobile) {
      setFlipped(!flipped)
    }
  }

  return (
    <div className="w-full h-full perspective-1000 cursor-pointer" onClick={handleClick}>
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 preserve-3d",
          isMobile && flipped ? "rotate-y-180" : "",
          !isMobile && "hover:rotate-y-180",
        )}
      >
        {/* Frente (japonés) */}
        <div className="absolute w-full h-full rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center p-4 backface-hidden">
          <div className="flex flex-col items-center">
            <div className="text-xl sm:text-lg md:text-xl font-semibold mb-2 text-muted-foreground">{reading}</div>
            <div className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              {expression}
            </div>
          </div>
        </div>

        {/* Reverso (español) */}
        <div className="absolute w-full h-full rounded-lg bg-muted text-foreground shadow-sm flex items-center justify-center p-4 backface-hidden rotate-y-180">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center">{meaning}</div>
        </div>
      </div>
    </div>
  )
}

