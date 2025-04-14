import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import KnowledgeButtons from "../KnowledgeButtons"
import { VocabularyCardDisplay } from "./VocabularyCardDisplay"
import type { VocabularyCardType } from "../../types/vocabularyTypes"

interface Props {
  cardData: VocabularyCardType
  knownStatus: boolean | null
  level: string
  onPrevious: () => void
  onNext: () => void
  isPreviousDisabled: boolean
  isNextDisabled: boolean
  onKnown: () => void
  onNotKnown: () => void
  currentIndex: number
  totalCards: number
  vocabularyStatusMap: { [expression: string]: boolean | null }
}

export function VocabularyLeftSection({
  cardData,
  knownStatus,
  level,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  onKnown,
  onNotKnown,
  currentIndex,
  totalCards,
  vocabularyStatusMap
}: Props) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
      <VocabularyCardDisplay
        cardData={cardData}
        knownStatus={knownStatus}
        level={level}
        onPrevious={onPrevious}
        onNext={onNext}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <KnowledgeButtons onKnown={onKnown} onNotKnown={onNotKnown} isKnown={knownStatus ?? null} />
      </div>
      <Card className="mt-10 w-full max-w-xs">
        <CardContent className="text-center">
          <p className="select-none text-lg font-medium text-muted-foreground">
            Tarjeta {currentIndex + 1} de <span className="font-bold text-foreground">{totalCards}</span>
          </p>
        </CardContent>
      </Card>
      <Card className="mt-4 w-full max-w-xs">
        <CardContent className="text-center flex justify-center gap-4">
          <div>
            <span className="font-semibold">Conocidas: </span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-1">
              {Object.values(vocabularyStatusMap).filter(status => status === true).length}
            </Badge>
          </div>
          <div>
            <span className="font-semibold">No Conocidas: </span>
            <Badge variant="outline" className="bg-red-50 text-destructive border-red-200 ml-1">
              {Object.values(vocabularyStatusMap).filter(status => status === false).length}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
