export type UpdateMemorizedPayload = {
  type: "verse" | "surah";
  memorize: boolean;
  surahIdx: number;
  verseIdx?: number;
};

export type UpdateLastReadPayload = {
  surah_idx: number;
  verse_idx: number;
};
