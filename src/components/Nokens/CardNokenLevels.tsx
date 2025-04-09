"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface CardNokenLevelsProps {
  levelCard: {
    level: string
    title: string
    image: string
    description: string
  }
}

export  function CardNokenLevels({ levelCard }: CardNokenLevelsProps) {
  const navigate = useNavigate()

  const handleEntrar = () => {
    navigate(`/nokens/${levelCard.level}`)
  }

  return (
    <div className="rounded-lg bg-secondary shadow-sm overflow-hidden flex flex-col max-w-xl">
      {/* Imagen que rellena completamente la parte superior */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={`/${levelCard.image}`}
          alt={`Imagen de Noken ${levelCard.level}`}
          className="w-full h-full "
        />
      </div>

      {/* Contenido con padding */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-primary mb-2">{levelCard.title}</h3>

        <p className="text-foreground text-sm mb-4 flex-grow">{levelCard.description}</p>

        <div className="flex justify-end mt-auto">
          <Button onClick={handleEntrar} className=" cursor-pointer text-foreground font-semibold" size="sm">
            Entrar
          </Button>
        </div>
      </div>
    </div>
  )
}

