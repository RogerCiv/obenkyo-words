import VocabularyCardDisplay from "./VocabularyCardDisplay";
import NavigationButtons from "./NavigationButtons";
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
      <VocabularyCardDisplay cardData={cardData} knownStatus={knownStatus} level={level} />
      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <KnowledgeButtons
        onKnown={onKnown}
        onNotKnown={onNotKnown}
        isKnown={knownStatus}
      />
      <div className="mt-10">
        <span>Tarjeta {currentIndex + 1} de {totalCards}</span>
      </div>
    </div>
  );
}
