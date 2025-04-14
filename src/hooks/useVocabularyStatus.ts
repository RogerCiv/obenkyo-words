// src/hooks/useVocabularyStatus.ts
import { useState, useEffect } from 'react';
import { VocabularyCardType } from '../types/vocabularyTypes';
import supabase from '../utils/supabase-client';
import { useAuth } from './useAuth';

const LEVEL_TABLE = 'user_progress';

interface UseVocabularyStatusProps {
  level?: string;
  currentCard?: VocabularyCardType | undefined | null;
}

// Agregamos un valor por defecto en los parámetros para permitir llamadas sin argumentos.
const useVocabularyStatus = ({ level, currentCard }: UseVocabularyStatusProps = {}) => {
  const [knownStatus, setKnownStatus] = useState<boolean | null>(null);
  const [wordsStatusMap, setWordsStatusMap] = useState<{ [expression: string]: boolean | null }>({});
  // Nuevo estado para almacenar los días de estudio únicos
  const [studyDays, setStudyDays] = useState<string[]>([]);
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

  useEffect(() => {
    if (user) {
      async function loadWordsStatus() {
        let query = supabase
          .from(LEVEL_TABLE)
          .select("card_expression, known, updated_at")
          .eq("user_id", user?.id);
        if (level) {
          query = query.eq("level", level);
        }
        const { data, error } = await query;
        if (!error && data) {
          const statusMap: { [expression: string]: boolean | null } = {};
          const updatedMap: { [expression: string]: string } = {};
          data.forEach((row: any) => {
            statusMap[row.card_expression] = row.known;
            updatedMap[row.card_expression] = row.updated_at;
          });
          setWordsStatusMap(statusMap);
          // Derivar los días únicos: convertir cada updated_at a fecha ISO (YYYY-MM-DD)
          const uniqueDays = new Set(
            Object.values(updatedMap)
              .filter((dateStr: string) => dateStr)
              .map((dateStr: string) => new Date(dateStr).toISOString().slice(0, 10))
          );
          setStudyDays([...uniqueDays]);
        }
      }
      loadWordsStatus();
    }
  }, [user, level]);

  // Función auxiliar para actualizar los días de estudio
  const updateStudyDays = () => {
    const nowISO = new Date().toISOString();
    const day = new Date(nowISO).toISOString().slice(0, 10);
    setStudyDays(prev => prev.includes(day) ? prev : [...prev, day]);
  };

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
        
        updateStudyDays();
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
        
        updateStudyDays();
      }
    }
  };

  const getTextColor = (status?: boolean | null): string => {
    if (status === true) return "bg-green-500/50";
    if (status === false) return "bg-destructive";

    return "bg-blue-300";
  };

  // console.log("studyDays", studyDays);
  return { knownStatus, markAsKnown, markAsNotKnown, getTextColor, wordsStatusMap, studyDays };
};

export default useVocabularyStatus;