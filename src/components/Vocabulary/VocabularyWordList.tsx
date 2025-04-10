"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { VocabularyCardType } from "../../types/vocabularyTypes"

interface VocabularyWordListProps {
  level: string
  currentIndex: number
  currentItems: VocabularyCardType[]
  indexOfFirstItem: number
  vocabularyStatusMap: { [expression: string]: boolean | null }
  onWordSelect: (word: VocabularyCardType) => void
  getTextColor: (status: boolean | null) => string
}

export  function VocabularyWordList(props: VocabularyWordListProps) {
  const { level, currentIndex, currentItems, indexOfFirstItem, vocabularyStatusMap, onWordSelect, getTextColor } = props

  return (
    <div className="rounded-lg border bg-muted/30">
      <ScrollArea className="h-[600px]">
        <div className="p-4 pb-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Palabras del Nivel {level}
        </div>

        <ul className="space-y-1">
          {currentItems.map((word, index) => {
            const fullIndex = indexOfFirstItem + index
            const wordStatus = vocabularyStatusMap[word.expression] ?? word.knownStatus!
            const statusColor = getTextColor(wordStatus)

            // Convertir colores de daisyUI a clases de Tailwind para shadcn
            let borderClass = ""
            if (fullIndex === currentIndex) {
              borderClass = "border-2 border-blue-500"
            }

            return (
              <li
                key={index}
                className={`flex items-center p-2 mx-2 rounded-md ${statusColor} ${borderClass} ${fullIndex === currentIndex ? "opacity-70" : "hover:opacity-70"
                  }`}
              >
                <div className={`grow px-2 flex space-x-2 items-center `}>
                  <p className={`font-bold text-2xl `}>{word.expression}</p>
                  <p className="font-semibold text-lg text-muted-foreground">({word.reading})</p>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onWordSelect(word)}
                  className="h-9 w-9 rounded-full cursor-pointer "
                  aria-label="Play"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </li>
            )
          })}
        </ul>
      </ScrollArea>
    </div>
  )
}

