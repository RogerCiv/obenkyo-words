// src/hooks/useVocabularyStatus.ts
import { useState, useEffect } from 'react';
import { VocabularyCardType } from '../types/vocabularyTypes';
import supabase from '../utils/supabase-client';
import { useAuth } from '../context/AuthContext';

const LEVEL_TABLE = 'user_progress';

interface UseVocabularyStatusProps {
  level: string;
  currentCard: VocabularyCardType | undefined | null;
}

const useVocabularyStatus = ({ level, currentCard }: UseVocabularyStatusProps) => {
  const [knownStatus, setKnownStatus] = useState<boolean | null>(null);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (currentCard && userId) {
      async function fetchStatus() {
        const { data, error } = await supabase  
          .from(LEVEL_TABLE)
          .select('known')
          .eq('user_id', userId)
          .eq('level', level)
          .eq('card_expression', currentCard?.expression)
          .maybeSingle(); // changed from .single() to .maybeSingle()
        if (!error && data) {
          setKnownStatus(data.known);
        } else {
          setKnownStatus(null);
        }
      }
      fetchStatus();
    }
  }, [level, currentCard, userId]);

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
        }, { onConflict: 'user_id,level,card_expression' }); // changed from array to string
      if (!error) setKnownStatus(true);
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
        }, { onConflict: 'user_id,level,card_expression' }); // changed from array to string
      if (!error) setKnownStatus(false);
    }
  };

  return { knownStatus, markAsKnown, markAsNotKnown };
};

export default useVocabularyStatus;