import { VocabularyCardType } from "../types/vocabularyTypes";
import supabase from "../utils/supabase-client";

async function fetchN5Vocabulary(): Promise<VocabularyCardType[]| null> {
  const { data, error } = await supabase.from('jlpt_n5').select('*');

  if (error) {
    console.error('Error fetching N5 vocabulary:', error);
    return null;
  }
  return data;
}

export { fetchN5Vocabulary };