import { VocabularyCard } from "../data/dataN5";
import Card from "./Card";

interface VocabularyCardDisplayProps {
  cardData: VocabularyCard | undefined | null;
  knownStatus: boolean | null;
  level: string;
}

export default function VocabularyCardDisplay(props: VocabularyCardDisplayProps) {
  const { cardData, knownStatus, level } = props;
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <h1 className="text-4xl">Vocabulario Noken {level}</h1>
      {cardData && (
        <div className={`mb-8 p-4 rounded shadow-lg transition-colors duration-300
        ${knownStatus === true ? 'bg-green-100 border border-green-400' : knownStatus === false ? 'bg-red-100 border border-red-400' : 'bg-white'}`}>
          <Card japanese={cardData.japanese} spanish={cardData.spanish} romanji={cardData.romanji} />
        </div>
      )}
    </div>
  )
}
