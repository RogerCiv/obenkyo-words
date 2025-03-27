

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
    <div className="flex flex-col items-center justify-center  w-full px-4 py-8 gap-6 md:gap-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center">
        Vocabulario <span className="text-accent font-semibold">Noken {level}</span>
      </h1>
      <div className="w-full max-w-3xl mx-auto">
        <div
          className={`w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[2/1] mb-4 md:mb-8 rounded-lg shadow-lg transition-colors duration-300 p-3
          ${knownStatus === true
              ? "bg-success/10 border-2 border-success"
              : knownStatus === false
                ? "bg-error/10 border-2 border-error"
                : "bg-base-200 border-2 border-base-300"
            }`}
        >

 
            <Card
              expression={cardData.expression}
              meaning={cardData.meaning}
              reading={cardData.reading}
              status={knownStatus}
            />


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
