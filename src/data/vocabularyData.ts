import { VocabularyCardType } from "../types/vocabularyTypes";
import supabase from "../utils/supabase-client";

async function fetchNokenVocabulary(level: string): Promise<VocabularyCardType[] | null> {
  console.log('fetchN5Vocabulary level:', level);
  const pageSize = 1000;
  let allData: VocabularyCardType[] = [];
  let offset = 0;
  
  while (true) {
    const { data, error } = await supabase
      .from(level)
      .select('*')
      .range(offset, offset + pageSize - 1);
    
    if (error) {
      console.error('Error fetching N5 vocabulary:', error);
      return null;
    }
    
    allData = [...allData, ...data];
    if (data.length < pageSize) break;
    offset += pageSize;
  }
  
  console.log('data:', allData);
  return allData;
}

export { fetchNokenVocabulary };