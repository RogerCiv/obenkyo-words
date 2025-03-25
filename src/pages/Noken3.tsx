import { useState } from "react";
import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyPageContent from "../components/VocabularyPageContent";
import { dataN3 } from "../data/dataN3";

const LEVEL_N3 = 'Noken3';

export default function Noken3Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = dataN3[currentIndex];
  const { knownStatus, markAsKnown, markAsNotKnown } = useVocabularyStatus({
    level: LEVEL_N3,
    currentCard: currentCard,
  });
  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, dataN3.length - 1));
  };

  return (
    <VocabularyPageContent
      cardData={currentCard}
      knownStatus={knownStatus}
      level="3"
      onPrevious={goToPreviousCard}
      onNext={goToNextCard}
      isPreviousDisabled={currentIndex === 0}
      isNextDisabled={currentIndex === dataN3.length - 1}
      onKnown={markAsKnown}
      onNotKnown={markAsNotKnown}
      currentIndex={currentIndex}
      totalCards={dataN3.length}
    />
  );
}
