
interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}
export  function NavigationButtons(props: NavigationButtonsProps) {
  const { onPrevious, onNext, isPreviousDisabled, isNextDisabled } = props;


  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  )
}
