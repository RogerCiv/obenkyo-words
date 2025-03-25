import { useState } from "react";
import { dataN4 } from "../data/dataN4";
import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyPageContent from "../components/VocabularyPageContent";

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
    <VocabularyPageContent
      cardData={currentCard}
      knownStatus={knownStatus}
      level="4"
      onPrevious={goToPreviousCard}
      onNext={goToNextCard}
      isPreviousDisabled={currentIndex === 0}
      isNextDisabled={currentIndex === dataN4.length - 1}
      onKnown={markAsKnown}
      onNotKnown={markAsNotKnown}
      currentIndex={currentIndex}
      totalCards={dataN4.length}
    />
  );
}
