import { useState } from "react";
import { dataN5 } from "../data/dataN5";
import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyPageContent from "../components/VocabularyPageContent";

const LEVEL_N5 = 'Noken5';

export default function Noken5Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = dataN5[currentIndex];
  const { knownStatus, markAsKnown, markAsNotKnown } = useVocabularyStatus({
    level: LEVEL_N5,
    currentCard: currentCard,
  });
  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, dataN5.length - 1));
  };

  return (
    <VocabularyPageContent
      cardData={currentCard}
      knownStatus={knownStatus}
      level="5"
      onPrevious={goToPreviousCard}
      onNext={goToNextCard}
      isPreviousDisabled={currentIndex === 0}
      isNextDisabled={currentIndex === dataN5.length - 1}
      onKnown={markAsKnown}
      onNotKnown={markAsNotKnown}
      currentIndex={currentIndex}
      totalCards={dataN5.length}
    />
  );
}
