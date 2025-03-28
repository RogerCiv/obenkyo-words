import { useEffect, useState } from "react";
import useVocabularyStatus from "../hooks/useVocabularyStatus";
import VocabularyPageContent from "../components/VocabularyPageContent";
import { VocabularyCardType } from "../types/vocabularyTypes";
import { fetchNokenVocabulary } from "../data/vocabularyData";
import SkeletonCard from "../components/SkeletonCard"; // Nueva importación

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
			<section className="min-h-screen container mx-auto flex flex-col items-center justify-center">
				<h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
					Cargando Noken {displayLevel}...
				</h1>
				<div className="flex w-full flex-col lg:flex-row gap-4 items-center">
					<div className="w-full lg:w-1/2">
						{/* Skeleton para VocabularyCardDisplay */}
						<SkeletonCard />
					</div>
					<div className="w-full lg:w-1/2">
						{/* Skeleton para la lista de palabras simulada */}
						<div className="bg-base-200 rounded-box shadow-md p-4">
							<div className="skeleton h-6 w-40 mb-4"></div>
							<ul className="space-y-2">
								{[...Array(5)].map((_, i) => (
									<div key={i} className="skeleton h-14 w-full"></div>
								))}
							</ul>
						</div>
						{/* Skeleton para paginación */}
						<div className="mt-4">
							<div className="skeleton h-8 w-full"></div>
						</div>
					</div>
				</div>
			</section>
		);
	}
	if (!vocabularyCards.length) {
		return <div>No se encontraron tarjetas de vocabulario.</div>;
	}

	return (
		<section className="min-h-screen container mx-auto flex flex-col justify-center">
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
				vocabularyStatusMap={wordsStatusMap}  //Nueva prop con el estado individual de cada palabra
			/>
		</section>
	);
}
