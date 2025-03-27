import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'

interface IconsNavigateProps {
  knownStatus: boolean | null;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

export default function IconsNavigate(props: IconsNavigateProps) {
  const { knownStatus, isNextDisabled, isPreviousDisabled, onNext, onPrevious } = props;
  return (
    <div className="flex items-center justify-between mt-2">
      <CircleArrowLeft
        className={`size-10 ${isPreviousDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${knownStatus === true ? 'text-success-content' : knownStatus === false ? 'text-black' : 'text-primary-content'}`
        }
        onClick={() => { if (!isPreviousDisabled) onPrevious(); }}
      />
      <CircleArrowRight
        className={`size-10  hover:text-primary  ${isNextDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${knownStatus === true ? 'text-success-content' : knownStatus === false ? 'text-black' : 'text-primary-content hover:text-primary'}`}
        onClick={() => { if (!isNextDisabled) onNext(); }}
      />
    </div>
  )
}
