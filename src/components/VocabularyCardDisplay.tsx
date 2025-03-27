

import { VocabularyCardType } from "../types/vocabularyTypes";
import Card from "./Card";
import IconsNavigate from "./IconsNavigate";

interface VocabularyCardDisplayProps {
  cardData: VocabularyCardType;
  knownStatus: boolean | null;
  level: string;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;

}

export default function VocabularyCardDisplay(props: VocabularyCardDisplayProps) {
  const { cardData, knownStatus, level, isNextDisabled, isPreviousDisabled, onNext, onPrevious } = props;
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <h1 className="text-5xl">Vocabulario <span className="text-accent font-semibold">Noken {level}</span></h1>
      <div className="flex flex-col gap-4">

        <div className={`w-xl h-96 mb-8 p-4 rounded shadow-lg transition-colors duration-300
        ${knownStatus === true ? 'bg-success border border-success-content' : knownStatus === false ? 'bg-error border border-error-content' : 'bg-base-content'}`}>

          <Card expression={cardData.expression} meaning={cardData.meaning} reading={cardData.reading} status={knownStatus} />

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
