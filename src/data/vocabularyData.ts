import { VocabularyCardType } from "../types/vocabularyTypes";
import supabase from "../utils/supabase-client";

async function fetchNokenVocabulary(level: string): Promise<VocabularyCardType[] | null> {
  console.log('fetchN5Vocabulary level:', level);
  const { data, error } = await supabase.from(level).select('*');

  if (error) {
    console.error('Error fetching N5 vocabulary:', error);
    return null;
  }
  console.log('data:', data);
  return data;
}

export { fetchNokenVocabulary };