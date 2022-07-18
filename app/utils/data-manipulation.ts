import { surahs } from "~/repositories/surahs";

export const generateVerseNumber = (
  surahIndex: number,
  versesIndex: number
) => {
  let total = 0;
  let previousTotalVerses = 0;
  surahs["id"].forEach((surah, sIdx) => {
    if (surahIndex === 0) {
      total = versesIndex + 1;
    }
    if (sIdx <= (surahIndex - 1)) {
      previousTotalVerses += surah.total_verses;
      surah.verses.forEach((verse, vIdx) => {
        if (vIdx <= (versesIndex + 1)) {
          total = previousTotalVerses + versesIndex + 1;
        }
      });
      return;
    }
    if (sIdx !== surahIndex) {
      return;
    }
  });
  return total;
};
