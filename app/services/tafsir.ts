import { endpoints } from "~/repositories/endpoint";

export const getTafsirByVerse = async (
  verseNumber: number,
  surahNumber: number
): Promise<SutanlabTafsirVerseModel> => {
  console.info(`${endpoints.sutanlab}${surahNumber}/${verseNumber}`);
  return await (
    await fetch(`${endpoints.sutanlab}/surah/${surahNumber}/${verseNumber}`, { method: "GET"
  })
  ).json();
};
