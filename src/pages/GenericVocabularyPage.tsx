
import useVocabularyStatus from "../hooks/useVocabularyStatus";

import { VocabularyCardType } from "../types/vocabularyTypes";

import LoadingSkeleton from "../components/LoadingSkeleton";
import useFetchData from "../hooks/useFetchData";
import VocabularyPageContent from "@/components/Vocabulary/VocabularyPageContent";




interface GenericVocabularyPageProps {
	levelKey: string;
	displayLevel: string;
}

export default function GenericVocabularyPage({ levelKey, displayLevel }: GenericVocabularyPageProps) {
	const { vocabularyCards, loading, currentIndex, setCurrentIndex, currentCard } = useFetchData(levelKey);

	const { knownStatus, markAsKnown, markAsNotKnown, getTextColor, wordsStatusMap } = useVocabularyStatus({
		level: levelKey,
		currentCard,
	});

	const goToPreviousCard = () => {
		setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
	};
	const goToNextCard = () => {
		setCurrentIndex(prevIndex => Math.min(prevIndex + 1, vocabularyCards.length - 1));
	};

	const handleWordSelect = (word: VocabularyCardType) => {
		const selectedIndex = vocabularyCards.findIndex(card => card.id === word.id);
		if (selectedIndex !== -1) {
			setCurrentIndex(selectedIndex);
		}
	};

	if (loading) {
		return (
			<LoadingSkeleton displayLevel={displayLevel} />
		);
	}
	if (!vocabularyCards.length) {
		return <div>No se encontraron tarjetas de vocabulario.</div>;
	}

	return (
		<section className="container mx-auto py-32">
			<VocabularyPageContent
				vocabularyList={vocabularyCards}
				onWordSelect={handleWordSelect}
				cardData={currentCard}
				knownStatus={knownStatus}
				level={displayLevel}
				onPrevious={goToPreviousCard}
				onNext={goToNextCard}
				isPreviousDisabled={currentIndex === 0}
				isNextDisabled={currentIndex === vocabularyCards.length - 1}
				onKnown={markAsKnown}
				onNotKnown={markAsNotKnown}
				currentIndex={currentIndex}
				totalCards={vocabularyCards.length}
				getTextColor={getTextColor}
				vocabularyStatusMap={wordsStatusMap}
			/>
		</section>
	);
}
