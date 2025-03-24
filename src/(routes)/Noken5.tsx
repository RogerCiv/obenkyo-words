import { useEffect, useState } from "react";
import Card from "../components/Card";
import { dataN5 } from "../data/dataN5";
import NavigationButtons from "../components/NavigationButtons";

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

      <h1 className="text-4xl">Vocabulario Noken 5</h1>

      {currentCard && (
        <div className="mb-8">
          <Card japanese={currentCard.japanese} spanish={currentCard.spanish} romanji={currentCard.romanji} />
        </div>
      )}
      <NavigationButtons onPrevious={goToPreviousCard} onNext={goToNextCard} isPreviousDisabled={currentIndex === 0} isNextDisabled={currentIndex === dataN5.length - 1} />

      <div className="flex space-x-4 mt-4">
        <button
          onClick={markAsKnown}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${knownStatus === true ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={knownStatus === true}
        >
          Me la sé
        </button>
        <button
          onClick={markAsNotKnown}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${knownStatus === false ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={knownStatus === false}
        >
          No me la sé
        </button>
      </div>
      <div className="mt-10">
        <span>Tarjeta {currentIndex + 1} de {dataN5.length}</span>
      </div>
    </div>
  )
}
