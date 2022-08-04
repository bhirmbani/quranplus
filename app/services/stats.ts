import db from "~/models";
import type { UpdateMemorizedPayload } from "./stats.type";

export const getStatistics = async () => {
  const stats = await db.statistic.toArray();
  return stats;
};

export const updateStatistics = async (
  type: "last_read" | "daily_checkin" | "memorized",
  payload: UpdateMemorizedPayload
) => {
  const stats = await getStatistics();
  // create if not exist
  if (stats.length === 0) {
    await db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: {
        surah: 0,
        verse: 0,
        data: [],
        progress: {
          surah: [{ date: new Date(), count: 0, updated_date: new Date() }],
          verse: [{ date: new Date(), count: 0, updated_date: new Date() }],
        },
      },
    });
  }

  switch (type) {
    case "memorized":
      updateMemorized(payload as UpdateMemorizedPayload);
      break;

    default:
      break;
  }
};

export const updateMemorized = async ({
  type,
  memorize,
  surahIdx,
  verseIdx,
}: UpdateMemorizedPayload) => {
  /**
   * update memorized surah,verse & data
   * 1. if type verse and memorize true, increment verse by one
   * 2. if type verse and memorize false, decrement verse by one
   * 3. if type surah and memorize true, increment surah by one, increment verse by surah length - surah's verse with memorize true
   * 4. if type surah and memorize false, decrement surah by one, decrement verse by surah length *optional:(+ surah's verse with memorize false)
   *
   * UI
   * 1. only show CheckFilledIcon icon for surah if memorized.data[surah_idx].length === surahs[surah_idx].verses.length
   *
   * verse: 10 -> 7 & 3, surah: 2
   * click unmemorize surah on 3 => surah: 2 - 1 = 1, verse: 10 - 3 = 7
   *
   * how to save memorized progress
   * 1. cronjob?
   * 2. no cronjob, but save every time user click memorize -> PICKED
   */

  const stats = await getStatistics();
  const id = stats[0].id!;
  const surah = stats[0].memorized.surah;
  const verse = stats[0].memorized.verse;
  const data = stats[0].memorized.data;
  const progress = stats[0].memorized.progress;

  const countSurah = memorize ? surah + 1 : surah - 1;
  const countVerse = memorize ? verse + 1 : verse - 1;

  const processData = () => {
    const newState = data.map((each) => {
      // if surah idx stored in data is same as surah idx that user pick
      if (Number(Object.keys(each)) === surahIdx) {
        let newVerses = [];
        if (memorize) {
          newVerses = [...each[surahIdx], verseIdx];
        } else {
          newVerses = each[surahIdx].filter((value) => value !== verseIdx);
        }
        return {
          [Number(Object.keys(each))]: newVerses,
        };
      }
      // if surah idx user picked not stored yet in data
      return { ...each };
    });
    // if surah idx that user picked not stored yet in data
    if (!data.find((each) => Number(Object.keys(each)) === surahIdx)) {
      return [...newState, { [surahIdx]: [verseIdx] }];
    }
    return newState;
  };

  const processProgress = () => {
    /**
     * if today date already have data, update date and count inside it
     * otherwise, add new date and update count
     */
    const newProgress = {
      surah: progress.surah.map((eachSurah) => {
        if (eachSurah.date.toDateString() === new Date().toDateString()) {
          return {
            date: eachSurah.date,
            updated_date: new Date(),
            count: type === "surah" ? countSurah : surah,
          };
        }
        return { ...eachSurah };
      }),
      verse: progress.verse.map((eachVerse) => {
        if (eachVerse.date.toDateString() === new Date().toDateString()) {
          return {
            date: eachVerse.date,
            updated_date: new Date(),
            count: type === "verse" ? countVerse : verse,
          };
        }
        return { ...eachVerse };
      }),
    };

    const isVerseProgressDontHaveTodayDate = progress.verse.find(
      (each) => each.date.toDateString() === new Date().toDateString()
    );
    if (isVerseProgressDontHaveTodayDate === undefined) {
      newProgress.verse.push({
        date: new Date(),
        updated_date: new Date(),
        count: type === "verse" ? countVerse : verse,
      });
    }
    const isSurahProgressDontHaveTodayDate = progress.surah.find(
      (each) => each.date.toDateString() === new Date().toDateString()
    );
    if (isSurahProgressDontHaveTodayDate === undefined) {
      newProgress.surah.push({
        date: new Date(),
        updated_date: new Date(),
        count: type === "surah" ? countSurah : surah,
      });
    }
    return newProgress;
  };

  const newPayload: StatisticModel["memorized"] = {
    surah: type === "surah" ? countSurah : surah,
    verse: type === "verse" ? countVerse : verse,
    data: processData(),
    progress: processProgress(),
  };

  console.log(newPayload);

  await db.statistic.update(id, {
    ...stats[0],
    memorized: {
      ...stats[0].memorized,
      ...newPayload,
    },
  });
};
