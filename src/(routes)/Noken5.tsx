import { useState } from "react";

import { dataN5 } from "../data/dataN5";
import NavigationButtons from "../components/NavigationButtons";
import KnowledgeButtons from "../components/KnowledgeButtons";
import VocabularyCardDisplay from "../components/VocabularyCardDisplay";
import useVocabularyStatus from "../hooks/useVocabularyStatus";

const LEVEL_N5 = 'Noken5';


export default function Noken5Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = dataN5[currentIndex];
  // const [knownStatus, setKnownStatus] = useState<boolean | null>(null); // null: desconocido, true: me la sé

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
    <div className="flex flex-col items-center justify-center h-full">
      <VocabularyCardDisplay cardData={currentCard} knownStatus={knownStatus} level="5" />
      <NavigationButtons onPrevious={goToPreviousCard} onNext={goToNextCard} isPreviousDisabled={currentIndex === 0} isNextDisabled={currentIndex === dataN5.length - 1} />


      <KnowledgeButtons
        onKnown={markAsKnown}
        onNotKnown={markAsNotKnown}
        isKnown={knownStatus}
      />
      <div className="mt-10">
        <span>Tarjeta {currentIndex + 1} de {dataN5.length}</span>
      </div>
    </div>
  )
}
