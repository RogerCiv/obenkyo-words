"use client"

import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VocabularyCardDisplay from "./VocabularyCardDisplay"
import KnowledgeButtons from "./KnowledgeButtons"
import Pagination from "./Pagination"
import VocabularyWordList from "./VocabularyWordList"
import type { VocabularyCardType } from "../types/vocabularyTypes"

interface Props {
  cardData: VocabularyCardType
  knownStatus: boolean | null
  level: string
  vocabularyList: VocabularyCardType[]
  onPrevious: () => void
  onNext: () => void
  isPreviousDisabled: boolean
  isNextDisabled: boolean
  onKnown: () => void
  onNotKnown: () => void
  currentIndex: number
  totalCards: number
  onWordSelect: (word: VocabularyCardType) => void
  vocabularyStatusMap: { [expression: string]: boolean | null }
  getTextColor: (status: boolean | null) => string
}

export default function VocabularyPageContent({
  cardData,
  knownStatus,
  level,
  vocabularyList,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  onKnown,
  onNotKnown,
  currentIndex,
  totalCards,
  onWordSelect,
  getTextColor,
  vocabularyStatusMap,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Pagination
  const totalPages = Math.ceil(vocabularyList.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = vocabularyList.slice(indexOfFirstItem, indexOfLastItem)

  // Actualiza currentPage cuando currentIndex cambia
  useEffect(() => {
    setCurrentPage(Math.floor(currentIndex / itemsPerPage) + 1)
  }, [currentIndex])

  // Nueva función para manejar el cambio de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Contadores de palabras conocidas y no conocidas
  const knownTrueCount = Object.values(vocabularyStatusMap).filter((status) => status === true).length
  const knownFalseCount = Object.values(vocabularyStatusMap).filter((status) => status === false).length

  return (
    <div className="flex flex-col w-full gap-6 py-10">
      {/* Heading centered above both sections */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
        Vocabulario <span className="text-primary font-semibold">Noken {level}</span>
      </h1>

      <div className="flex w-full flex-col lg:flex-row gap-4">
        {/* Left side: Vocabulary Card */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center justify-center h-full">
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
                    {knownTrueCount}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold">No Conocidas: </span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 ml-1">
                    {knownFalseCount}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Divider */}
        <Separator orientation="vertical" className="hidden lg:block h-auto   bg-red-500" />
        <Separator className="lg:hidden my-4" />

        {/* Right side: Word List */}
        <div className="w-full lg:w-1/2 px-4">
          <VocabularyWordList
            level={level}
            currentIndex={currentIndex}
            currentItems={currentItems}
            getTextColor={getTextColor}
            indexOfFirstItem={indexOfFirstItem}
            onWordSelect={onWordSelect}
            vocabularyStatusMap={vocabularyStatusMap}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}

