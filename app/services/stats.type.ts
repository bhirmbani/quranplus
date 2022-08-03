export type UpdateMemorizedPayload = {
  type: "verse" | "surah";
  memorize: boolean;
  surahIdx: number;
  verseIdx: number;
};
