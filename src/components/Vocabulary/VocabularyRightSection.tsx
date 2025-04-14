import { PaginationCard } from "../Pagination"
import { VocabularyWordList } from "./VocabularyWordList"
import type { VocabularyCardType } from "../../types/vocabularyTypes"

interface Props {
  level: string
  currentIndex: number
  currentItems: VocabularyCardType[]
  getTextColor: (status: boolean | null) => string
  indexOfFirstItem: number
  onWordSelect: (word: VocabularyCardType) => void
  vocabularyStatusMap: { [expression: string]: boolean | null }
  currentPage: number
  totalPages: number
  handlePageChange: (pageNumber: number) => void
}

export function VocabularyRightSection({
  level,
  currentIndex,
  currentItems,
  getTextColor,
  indexOfFirstItem,
  onWordSelect,
  vocabularyStatusMap,
  currentPage,
  totalPages,
  handlePageChange
}: Props) {
  return (
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
      <PaginationCard currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
