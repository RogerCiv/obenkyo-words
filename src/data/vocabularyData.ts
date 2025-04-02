import { VocabularyCardType } from "../types/vocabularyTypes";
import supabase from "../utils/supabase-client";

async function fetchNokenVocabulary(level: string): Promise<VocabularyCardType[] | null> {
  const pageSize = 1000;
  let allData: VocabularyCardType[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from(level)
      .select('*')
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching vocabulary:', error);
      return null;
    }

    allData = [...allData, ...data];
    if (data.length < pageSize) break;
    offset += pageSize;
  }
  return allData;
}

export { fetchNokenVocabulary };