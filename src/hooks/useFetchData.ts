import { useEffect, useState } from "react";
import { VocabularyCardType } from "../types/vocabularyTypes";
import { fetchNokenVocabulary } from "../data/vocabularyData";

interface UseFetchDataResult {
  vocabularyCards: VocabularyCardType[];
  loading: boolean;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentCard: VocabularyCardType;
}

export default function useFetchData(levelKey: string): UseFetchDataResult {
  const [vocabularyCards, setVocabularyCards] = useState<VocabularyCardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVocabulary() {
      const data = await fetchNokenVocabulary(levelKey);
      if (data) {
        setVocabularyCards(data);
      }
      setLoading(false);
    }
    loadVocabulary();
  }, [levelKey]);

  const currentCard = vocabularyCards[currentIndex] || null;

  return { vocabularyCards, loading, currentIndex, setCurrentIndex, currentCard };
}
