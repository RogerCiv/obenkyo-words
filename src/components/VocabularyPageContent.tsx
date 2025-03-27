import { useState, useEffect } from 'react';
import VocabularyCardDisplay from "./VocabularyCardDisplay";
import KnowledgeButtons from "./KnowledgeButtons";
import Pagination from "./Pagination";
import type { VocabularyCardType } from "../types/vocabularyTypes";
import VocabularyWordList from './VocabularyWordList';

interface Props {
  cardData: VocabularyCardType;
  knownStatus: boolean | null;
  level: string;
  vocabularyList: VocabularyCardType[];
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  onKnown: () => void;
  onNotKnown: () => void;
  currentIndex: number;
  totalCards: number;
  onWordSelect: (word: VocabularyCardType) => void;
  vocabularyStatusMap: { [expression: string]: boolean | null };
  getTextColor: (status: boolean | null) => string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination
  const totalPages = Math.ceil(vocabularyList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabularyList.slice(indexOfFirstItem, indexOfLastItem);

  // Actualiza currentPage cuando currentIndex cambia
  useEffect(() => {
    setCurrentPage(Math.floor(currentIndex / itemsPerPage) + 1);
  }, [currentIndex]);

  // Nueva función para manejar el cambio de página  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col w-full gap-6 py-10">
      {/* Heading centered above both sections */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
        Vocabulario <span className="text-accent font-semibold">Noken {level} </span>

      </h1>

      <div className="flex w-full flex-col lg:flex-row gap-4">
        {/* Left side: Vocabulary Card */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center justify-center h-full">
            <VocabularyCardDisplay
              cardData={cardData}
              knownStatus={knownStatus}
              onPrevious={onPrevious}
              onNext={onNext}
              isPreviousDisabled={isPreviousDisabled}
              isNextDisabled={isNextDisabled}
            />
            <div className="flex flex-col items-center justify-center gap-4">
              <KnowledgeButtons
                onKnown={onKnown}
                onNotKnown={onNotKnown}
                isKnown={knownStatus ?? null}
              />
            </div>
            <div className="mt-10">
              <p>Tarjeta {currentIndex + 1} de {totalCards}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal divider-accent" />

        {/* Right side: Word List */}
        <div className="w-full lg:w-1/2 ">

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
  );
}