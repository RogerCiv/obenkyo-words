interface KnowledgeButtonsProps {
  onKnown: () => void;
  onNotKnown: () => void;
  isKnown: boolean | null;
}

export default function KnowledgeButtons(props: KnowledgeButtonsProps) {
  const { isKnown, onKnown, onNotKnown } = props;

  const isKnownBool = isKnown === true;
  const isNotKnownBool = isKnown === false;
  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={onKnown}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isKnownBool ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isKnownBool}
      >
        Me la sé
      </button>
      <button
        onClick={onNotKnown}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isNotKnownBool ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isNotKnownBool}
      >
        No me la sé
      </button>
    </div>
  )
}
