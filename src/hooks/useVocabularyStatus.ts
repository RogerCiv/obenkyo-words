// src/hooks/useVocabularyStatus.ts
import { useState, useEffect } from 'react';
import { VocabularyCardType } from '../types/vocabularyTypes';
import supabase from '../utils/supabase-client';
import { useAuth } from './useAuth';

const LEVEL_TABLE = 'user_progress';

interface UseVocabularyStatusProps {
  level: string;
  currentCard: VocabularyCardType | undefined | null;
}

const useVocabularyStatus = ({ level, currentCard }: UseVocabularyStatusProps) => {
  const [knownStatus, setKnownStatus] = useState<boolean | null>(null);
  const { user } = useAuth();
  const userId = user?.id;

  // Consulta el estado de la tarjeta actual
  useEffect(() => {
    if (currentCard && userId) {
      async function fetchStatus() {
        const { data, error } = await supabase
          .from(LEVEL_TABLE)
          .select('known')
          .eq('user_id', userId)
          .eq('level', level)
          .eq('card_expression', currentCard?.expression)
          .maybeSingle();
        if (!error && data) {
          setKnownStatus(data.known);
        } else {
          setKnownStatus(null);
        }
      }
      fetchStatus();
    }
  }, [level, currentCard, userId]);

  // Nueva consulta para obtener el estado de cada palabra
  const [wordsStatusMap, setWordsStatusMap] = useState<{ [expression: string]: boolean | null }>({});
  useEffect(() => {
    if (user) {
      async function loadWordsStatus() {
        const { data, error } = await supabase
          .from(LEVEL_TABLE)
          .select("card_expression, known")
          .eq("user_id", user?.id)
          .eq("level", level);
        if (!error && data) {
          const map: { [expression: string]: boolean | null } = {};
          data.forEach((row: any) => {
            map[row.card_expression] = row.known;
          });
          setWordsStatusMap(map);
        }
      }
      loadWordsStatus();
    }
  }, [user, level]);

  const markAsKnown = async () => {
    if (currentCard && userId) {
      const { error } = await supabase
        .from(LEVEL_TABLE)
        .upsert({
          user_id: userId,
          level: level,
          card_expression: currentCard.expression,
          known: true,
          updated_at: new Date(),
        }, { onConflict: 'user_id,level,card_expression' });
      if (!error) {
        setKnownStatus(true);
        setWordsStatusMap(prev => ({ ...prev, [currentCard.expression]: true }));
      }
    }
  };

  const markAsNotKnown = async () => {
    if (currentCard && userId) {
      const { error } = await supabase
        .from(LEVEL_TABLE)
        .upsert({
          user_id: userId,
          level: level,
          card_expression: currentCard.expression,
          known: false,
          updated_at: new Date(),
        }, { onConflict: 'user_id,level,card_expression' });
      if (!error) {
        setKnownStatus(false);
        setWordsStatusMap(prev => ({ ...prev, [currentCard.expression]: false }));
      }
    }
  };

  const getTextColor = (status?: boolean | null): string => {
    if (status === true) return "bg-success/50";
    if (status === false) return "bg-error/50";
   
    return "bg-info/50";
  };

  return { knownStatus, markAsKnown, markAsNotKnown, getTextColor, wordsStatusMap };
};

export default useVocabularyStatus;