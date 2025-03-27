import { useEffect, useState } from "react";

import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyPageContent from "../components/VocabularyPageContent";
import { VocabularyCardType } from "../types/vocabularyTypes";
import { fetchNokenVocabulary } from "../data/vocabularyData";

interface GenericVocabularyPageProps {
	levelKey: string;
	displayLevel: string;
}

export default function GenericVocabularyPage({ levelKey, displayLevel }: GenericVocabularyPageProps) {
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
	const { knownStatus, markAsKnown, markAsNotKnown } = useVocabularyStatus({
		level: levelKey,
		currentCard,
	});

	const goToPreviousCard = () => {
		setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
	};
	const goToNextCard = () => {
		setCurrentIndex(prevIndex => Math.min(prevIndex + 1, vocabularyCards.length - 1));
	};

	if (loading) {
		return <div>Cargando...</div>;
	}
	if (!vocabularyCards.length) {
		return <div>No se encontraron tarjetas de vocabulario.</div>;
	}

	return (
		<section className="min-h-screen container mx-auto flex flex-col justify-center">
			<VocabularyPageContent
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
			/>
		</section>
	);
}
