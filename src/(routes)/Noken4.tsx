import { useState } from "react";
import { dataN4 } from "../data/dataN4";
import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyCardDisplay from "../components/VocabularyCardDisplay";
import NavigationButtons from "../components/NavigationButtons";
import KnowledgeButtons from "../components/KnowledgeButtons";

const LEVEL_N4 = 'Noken4';

export default function Noken4Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = dataN4[currentIndex];
  const { knownStatus, markAsKnown, markAsNotKnown } = useVocabularyStatus({
    level: LEVEL_N4,
    currentCard: currentCard,
  });


  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, dataN4.length - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <VocabularyCardDisplay cardData={currentCard} knownStatus={knownStatus} level="5" />
      <NavigationButtons onPrevious={goToPreviousCard} onNext={goToNextCard} isPreviousDisabled={currentIndex === 0} isNextDisabled={currentIndex === dataN4.length - 1} />


      <KnowledgeButtons
        onKnown={markAsKnown}
        onNotKnown={markAsNotKnown}
        isKnown={knownStatus}
      />
      <div className="mt-10">
        <span>Tarjeta {currentIndex + 1} de {dataN4.length}</span>
      </div>
    </div>
  )
}
