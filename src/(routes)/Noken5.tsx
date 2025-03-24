import { useEffect, useState } from "react";

import { dataN5 } from "../data/dataN5";
import NavigationButtons from "../components/NavigationButtons";
import KnowledgeButtons from "../components/KnowledgeButtons";
import VocabularyCardDisplay from "../components/VocabularyCardDisplay";

const STORAGE_KEY = "noken_known";

export default function Noken5Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownStatus, setKnownStatus] = useState<boolean | null>(null); // null: desconocido, true: me la sé

  const currentCard = dataN5[currentIndex];

  useEffect(() => {
    if (currentCard) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const knownLevels = storedData ? JSON.parse(storedData) : {};
      const levelData = knownLevels['n5'] || {};
      const status = levelData[currentCard.japanese];
      if (status === true) {
        setKnownStatus(true);
      } else if (status === false) {
        setKnownStatus(false);
      } else {
        setKnownStatus(null);
      }
    }
  }, [currentIndex, currentCard]);

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, dataN5.length - 1));
  };

  const markAsKnown = () => {
    if (currentCard) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const knownLevels = storedData ? JSON.parse(storedData) : {};
      const levelData = knownLevels['n5'] || {};
      levelData[currentCard.japanese] = true;
      knownLevels['n5'] = levelData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(knownLevels));
      setKnownStatus(true);
    }
  };

  const markAsNotKnown = () => {
    if (currentCard) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const knownLevels = storedData ? JSON.parse(storedData) : {};
      const levelData = knownLevels['n5'] || {};
      levelData[currentCard.japanese] = false;
      knownLevels['n5'] = levelData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(knownLevels));
      setKnownStatus(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
{/* 
      <h1 className="text-4xl">Vocabulario Noken 5</h1> */}

      {/* {currentCard && (
        <div className={`mb-8 p-4 rounded shadow-lg transition-colors duration-300
          ${knownStatus === true ? 'bg-green-100 border border-green-400' : knownStatus === false ? 'bg-red-100 border border-red-400' : 'bg-white'}`}>
          <Card japanese={currentCard.japanese} spanish={currentCard.spanish} romanji={currentCard.romanji} />
        </div>
      )} */}
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
