import VocabularyCardDisplay from "./VocabularyCardDisplay";
import KnowledgeButtons from "./KnowledgeButtons";
import type { VocabularyCardType } from "../types/vocabularyTypes";

interface Props {
  cardData: VocabularyCardType;
  knownStatus: boolean | null;
  level: string;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  onKnown: () => void;
  onNotKnown: () => void;
  currentIndex: number;
  totalCards: number;
}

export default function VocabularyPageContent({
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
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <VocabularyCardDisplay cardData={cardData} knownStatus={knownStatus} level={level} 
        onPrevious={onPrevious}
        onNext={onNext}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <KnowledgeButtons
          onKnown={onKnown}
          onNotKnown={onNotKnown}
          isKnown={knownStatus}
        />
      </div>

      <div className="mt-10">
        <p>Tarjeta {currentIndex + 1} de {totalCards}</p>
      </div>
    </div>
  );
}
