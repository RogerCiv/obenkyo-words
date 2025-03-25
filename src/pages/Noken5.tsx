import { useState, useEffect } from "react";
import { fetchN5Vocabulary } from "../data/vocabularyData";
import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyPageContent from "../components/VocabularyPageContent";
import { VocabularyCardType } from "../types/vocabularyTypes";

const LEVEL_N5 = 'jlpt_n5'; // Modificado de 'Noken5'

export default function Noken5Page() {
  const [vocabularyCards, setVocabularyCards] = useState<VocabularyCardType[]>([]);;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVocabulary() {
      const data = await fetchN5Vocabulary();
      if (data) {
        setVocabularyCards(data);
      }
      setLoading(false);
    }
    loadVocabulary();
  }, []);

  // Always define currentCard even if data is not yet available
  const currentCard = vocabularyCards[currentIndex] || null;

  // Llamada incondicional al hook
  const { knownStatus, markAsKnown, markAsNotKnown } = useVocabularyStatus({
    level: LEVEL_N5,
    currentCard,
  });
  
  // Handlers
  const goToPreviousCard = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };
  const goToNextCard = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, vocabularyCards.length - 1));
  };

  // Render condicional sin afectar el orden de hooks
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  if (!vocabularyCards.length) {
    return <div>No se encontraron tarjetas de vocabulario.</div>;
  }

  return (
    <VocabularyPageContent
      cardData={currentCard}
      knownStatus={knownStatus}
      level="5"
      onPrevious={goToPreviousCard}
      onNext={goToNextCard}
      isPreviousDisabled={currentIndex === 0}
      isNextDisabled={currentIndex === vocabularyCards.length - 1}
      onKnown={markAsKnown}
      onNotKnown={markAsNotKnown}
      currentIndex={currentIndex}
      totalCards={vocabularyCards.length}
    />
  );
}
