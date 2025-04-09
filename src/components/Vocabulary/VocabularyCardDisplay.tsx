import type { VocabularyCardType } from "../../types/vocabularyTypes"
import { IconsNavigate } from "../Navigation"


import { Card } from "./Card"

interface VocabularyCardDisplayProps {
  cardData: VocabularyCardType
  knownStatus: boolean | null
  level: string
  onPrevious: () => void
  onNext: () => void
  isPreviousDisabled: boolean
  isNextDisabled: boolean
}

export  function VocabularyCardDisplay(props: VocabularyCardDisplayProps) {
  const { cardData, knownStatus, onNext, onPrevious, isPreviousDisabled, isNextDisabled } = props

  // Determinar el color de fondo basado en el estado
  const getBgColor = () => {
    if (knownStatus === true) return "bg-green-400 border-2 border-green-900"
    if (knownStatus === false) return "bg-destructive border-2 border-red-900"
    return "bg-muted border border-border"
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 px-4">
      <div
        className={`w-full max-w-xl aspect-square md:aspect-video mb-4 rounded-lg shadow-sm transition-colors duration-300 ${getBgColor()}`}
      >
        <div className="w-full h-full p-12">
          <Card
            expression={cardData.expression}
            meaning={cardData.meaning}
            reading={cardData.reading}
            status={knownStatus}
          />
          <IconsNavigate
            knownStatus={knownStatus}
            onPrevious={onPrevious}
            onNext={onNext}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          />
        </div>
      </div>


    </div>
  )
}

