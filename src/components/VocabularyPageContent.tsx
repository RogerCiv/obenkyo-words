import { useState } from 'react';
import VocabularyCardDisplay from "./VocabularyCardDisplay";
import KnowledgeButtons from "./KnowledgeButtons";
import type { VocabularyCardType } from "../types/vocabularyTypes";

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

  // Pagination logic
  const totalPages = Math.ceil(vocabularyList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabularyList.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination display logic
  const renderPaginationButtons = () => {
    const buttons = [];
    const visiblePages = 5; // Total number of page buttons to show
    const halfVisiblePages = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust start and end pages to always show 5 buttons
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // First page button
    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          className="join-item btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <button
            key="first-ellipsis"
            className="join-item btn btn-disabled"
          >
            ...
          </button>
        );
      }
    }

    // Middle page buttons
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    // Last page buttons
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <button
            key="last-ellipsis"
            className="join-item btn btn-disabled"
          >
            ...
          </button>
        );
      }
      buttons.push(
        <button
          key="last"
          className="join-item btn"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log("status", knownStatus);
  };


  return (
    <div className="flex w-full flex-col lg:flex-row gap-4 py-10">
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
      <div className="divider lg:divider-horizontal"></div>

      {/* Right side: Word List */}
      <div className="w-full lg:w-1/2">
        <ul className="list bg-base-200 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Palabras del Nivel {level}
          </li>
          {currentItems.map((word, index) => {
            // Determina el estado de la palabra: se prefiere el valor obtenido en vocabularyStatusMap,
            // en caso de no existir se usa el valor almacenado en la propiedad knownStatus de la palabra.
            const wordStatus = vocabularyStatusMap[word.expression] ?? word.knownStatus!;
            return (
              <li key={index} className="list-row flex items-center">
                <div className="grow px-4 flex justify-between items-center">
                  <p className={`font-semibold ${getTextColor(wordStatus)}`}>
                    {word.reading}
                  </p>
                  <span className={`text-xs opacity-70 ${getTextColor(wordStatus)}`}>
                    {wordStatus === true ? 'Conocido' : wordStatus === false ? 'No conocido' : 'DEFAULT'}
                  </span>
                </div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => onWordSelect(word)}
                >
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Pagination */}
        <div className="join mt-4 flex justify-center">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
}