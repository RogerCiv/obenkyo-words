import { useState, useEffect } from "react"

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
    <div className="w-full h-full card flip-card" onClick={handleClick}>
      <div className={`flip-card-inner ${isMobile ? (flipped ? "flipped" : "") : "hover-flip"}`}>
        {/* Frente (japonés) */}
        <div className="flip-card-front card bg-base-100 flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <div className="text-base sm:text-lg md:text-xl text-base-content/60 mb-2">{reading}</div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">{expression}</div>
          </div>
        </div>

        {/* Reverso (español) */}
        <div className="flip-card-back card bg-base-200 flex items-center justify-center p-4">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-base-content">{meaning}</div>
        </div>
      </div>
    </div>
  )
}