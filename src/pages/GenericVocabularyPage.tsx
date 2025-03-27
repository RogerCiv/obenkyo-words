import { useEffect, useState } from "react";
import supabase from "../utils/supabase-client";
import { useAuth } from "../hooks/useAuth";
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
	const { user } = useAuth();
	const [wordsStatusMap, setWordsStatusMap] = useState<{ [expression: string]: boolean | null }>({});

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

  // Nueva consulta para obtener el estado de cada palabra
	useEffect(() => {
		async function loadWordsStatus() {
      if (user && vocabularyCards.length > 0) {
        const { data, error } = await supabase
          .from("user_progress")
          .select("card_expression, known")
          .eq("user_id", user.id)
          .eq("level", levelKey);
        if (!error && data) {
          const map: { [expression: string]: boolean | null } = {};
          data.forEach((row: any) => {
            map[row.card_expression] = row.known;
          });
          setWordsStatusMap(map);
        }
      }
		}
		loadWordsStatus();
	}, [user, vocabularyCards, levelKey]);

	const currentCard = vocabularyCards[currentIndex] || null;
	const { knownStatus, markAsKnown, markAsNotKnown, getTextColor } = useVocabularyStatus({
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
		return <div>Cargando...</div>;
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
