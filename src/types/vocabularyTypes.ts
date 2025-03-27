export type VocabularyCardType = {
  id: number | string; // Ahora admite número o string
  expression: string;
  reading: string;
  meaning: string;
  tags: string | null; // Puede ser null según tu descripción
  created_at: string; // Supabase usa formato de fecha/hora como string
  knownStatus?: boolean | null;
};