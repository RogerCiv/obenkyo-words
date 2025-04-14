import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import type { VocabularyCardType } from "../../types/vocabularyTypes"
import { VocabularyLeftSection } from "./VocabularyLeftSection"
import { VocabularyRightSection } from "./VocabularyRightSection"

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

export function VocabularyPageContent(props: Props) {
  const {
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
    vocabularyStatusMap
  } = props

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(vocabularyList.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = vocabularyList.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setCurrentPage(Math.floor(currentIndex / itemsPerPage) + 1)
  }, [currentIndex])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex flex-col w-full gap-6 py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
        Vocabulario <span className="text-primary font-semibold">Noken {level}</span>
      </h1>
      <div className="flex w-full flex-col lg:flex-row gap-4">
        <VocabularyLeftSection
          cardData={cardData}
          knownStatus={knownStatus}
          level={level}
          onPrevious={onPrevious}
          onNext={onNext}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
          onKnown={onKnown}
          onNotKnown={onNotKnown}
          currentIndex={currentIndex}
          totalCards={totalCards}
          vocabularyStatusMap={vocabularyStatusMap}
        />
        {/* Divider */}
        <Separator orientation="vertical" className="hidden lg:block min-h-[600px]" />
        <Separator className="lg:hidden my-4" />
        <VocabularyRightSection
          level={level}
          currentIndex={currentIndex}
          currentItems={currentItems}
          getTextColor={getTextColor}
          indexOfFirstItem={indexOfFirstItem}
          onWordSelect={onWordSelect}
          vocabularyStatusMap={vocabularyStatusMap}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

