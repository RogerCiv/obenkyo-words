import { VocabularyCardType } from "../types/vocabularyTypes";

interface VocabularyWordListProps {
  level: string;
  currentIndex: number;
  currentItems: VocabularyCardType[];
  indexOfFirstItem: number;
  vocabularyStatusMap: { [expression: string]: boolean | null };
  onWordSelect: (word: VocabularyCardType) => void;
  getTextColor: (status: boolean | null) => string;
}

export default function VocabularyWordList(props: VocabularyWordListProps) {
  const { level, currentIndex, currentItems, indexOfFirstItem, vocabularyStatusMap, onWordSelect, getTextColor } = props;
  return (
    <>
      <ul className="list bg-base-200 rounded-box shadow-md gap-4">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Palabras del Nivel {level}
        </li>
        {currentItems.map((word, index) => {
          const fullIndex = indexOfFirstItem + index;
          const wordStatus = vocabularyStatusMap[word.expression] ?? word.knownStatus!;
          return (
            <li
              key={index}
              className={`list-row flex items-center ${getTextColor(wordStatus)} ${fullIndex === currentIndex ? "border-3 border-accent" : ""
                }`}
            >
              <div className="grow px-4 flex space-x-2  items-center">
                <p className="font-bold text-secondary text-2xl">
                  {word.expression}
                </p>
                <p className="font-semibold text-lg text-secondary/70">({word.reading})</p>
              </div>
              <button
                className="btn btn-square btn-soft btn-primary"
                onClick={() => onWordSelect(word)}
              >
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  )
}
