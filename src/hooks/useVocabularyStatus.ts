// src/hooks/useVocabularyStatus.ts
import { useState, useEffect } from 'react';
import { VocabularyCard } from '../data/dataN5'; // Importa la interfaz si es necesario

const STORAGE_KEY = "noken_known";

interface UseVocabularyStatusProps {
  level: string;
  currentCard: VocabularyCard | undefined | null;
}

const useVocabularyStatus = ({ level, currentCard }: UseVocabularyStatusProps) => {
  const [knownStatus, setKnownStatus] = useState<boolean | null>(null);

  useEffect(() => {
    if (currentCard) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const knownLevels = storedData ? JSON.parse(storedData) : {};
      const levelData = knownLevels[level] || {};
      const status = levelData[currentCard.japanese];
      if (status === true) {
        setKnownStatus(true);
      } else if (status === false) {
        setKnownStatus(false);
      } else {
        setKnownStatus(null);
      }
    }
  }, [level, currentCard]);

  const markAsKnown = () => {
    if (currentCard) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const knownLevels = storedData ? JSON.parse(storedData) : {};
      const levelData = knownLevels[level] || {};
      levelData[currentCard.japanese] = true;
      knownLevels[level] = levelData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(knownLevels));
      setKnownStatus(true);
    }
  };

  const markAsNotKnown = () => {
    if (currentCard) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const knownLevels = storedData ? JSON.parse(storedData) : {};
      const levelData = knownLevels[level] || {};
      levelData[currentCard.japanese] = false;
      knownLevels[level] = levelData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(knownLevels));
      setKnownStatus(false);
    }
  };

  return { knownStatus, markAsKnown, markAsNotKnown };
};

export default useVocabularyStatus;