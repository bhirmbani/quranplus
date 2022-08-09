import db from "~/models";
import { surahs } from "~/repositories/surahs";
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
        data: Array.from({ length: 114 }, (_, idx) => ({ [idx]: [] })),
        progress: {
          surah: [{ date: new Date(), count: 0, updated_date: new Date() }],
          verse: [{ date: new Date(), count: 0, updated_date: new Date() }],
        },
      },
    });
  }

  switch (type) {
    case "memorized":
      return updateMemorized(payload as UpdateMemorizedPayload);
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

  const processData = (): Record<number, number[]>[] => {
    if (type === "verse") {
      const newState = data.map((each) => {
        // MARK if surah idx stored in data is same as surah idx that user pick
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
        // MARK if surah idx user picked not stored yet in data
        return { ...each };
      });
      // MARK if surah idx that user picked not stored yet in data
      if (
        data.find((each) => Number(Object.keys(each)) === surahIdx) ===
        undefined
      ) {
        return [...newState, { [surahIdx]: [verseIdx] }] as Record<
          number,
          number[]
        >[];
      }
      return newState as Record<number, number[]>[];
    }
    return data;
  };

  const processProgress = () => {
    /** MARK
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

  let newPayload: StatisticModel["memorized"] = {
    surah: type === "surah" ? countSurah : surah,
    verse: type === "verse" ? countVerse : verse,
    data: processData(),
    progress: processProgress(),
  };

  if (type === "surah" && memorize) {
    // MARK if surah is memorized and some surah's verse already
    // memorized then increment verses by surah length - verse that already memorized OR
    // if not already on data, then increment verses by surah length - 0
    const toDecrement = newPayload.data[surahIdx]
      ? newPayload.data[surahIdx][surahIdx].length
      : 0;

    newPayload.verse =
      newPayload.verse + surahs["id"][surahIdx].total_verses - toDecrement;

    // MARK if surah is memorized, update count on progress.verse
    newPayload.progress.verse = newPayload.progress.verse.map((each) => {
      if (each.date.toDateString() === new Date().toDateString()) {
        return {
          ...each,
          updated_date: new Date(),
          count: newPayload.verse - toDecrement,
        };
      }
      return { ...each };
    });

    // MARK if surah is memorized, add all unmemorized verse index of this surah to the data
    newPayload.data[surahIdx] = {
      [surahIdx]: surahs["id"][surahIdx].verses.map((_, idx) => idx),
    };
  }

  if (type === "surah" && !memorize) {
    // MARK if surah is unmemorized, then newPayload.verse = verse - verse that have been memorized
    const toDecrement = newPayload.data[surahIdx][surahIdx].length;
    newPayload.verse = newPayload.verse - toDecrement;

    // MARK if surah is unmemorized, then data[surahIdx][surahIdx] = []
    newPayload.data[surahIdx][surahIdx] = [];

    // MARK if surah is unmemorized, then progress.verse of current date - surah length
    newPayload.progress.verse = newPayload.progress.verse.map((each) => {
      if (each.date.toDateString() === new Date().toDateString()) {
        return {
          ...each,
          updated_date: new Date(),
          count: each.count - surahs["id"][surahIdx].total_verses,
        };
      }
      return { ...each };
    });
  }

  if (type === "verse" && !memorize) {
    /**
     * MARK if verse unmemorized and verse data length not same as surah actual length, then update surah count
     */
    if (
      newPayload.data[surahIdx][surahIdx].length !==
      surahs["id"][surahIdx].total_verses
    ) {
      newPayload.surah = newPayload.surah === 0 ? 0 : newPayload.surah - 1;
      newPayload.progress.surah = newPayload.progress.surah.map((each) => {
        if (each.date.toDateString() === new Date().toDateString()) {
          return {
            ...each,
            updated_date: new Date(),
            count: each.count === 0 ? 0 : each.count - 1,
          };
        }
        return { ...each };
      });
    }
  }

  if (type === "verse" && memorize) {
    /**
     * MARK if type verse and memorized and verse data length same as surah actual length, then update surah count
     */
    const versesOfSelectedSurah = newPayload.data.filter(
      (each) => Number(Object.keys(each)) === surahIdx
    );
    if (versesOfSelectedSurah.length === surahs["id"][surahIdx].total_verses) {
      newPayload.surah = newPayload.surah + 1;
      newPayload.progress.surah = newPayload.progress.surah.map((each) => {
        if (each.date.toDateString() === new Date().toDateString()) {
          return {
            ...each,
            updated_date: new Date(),
            count: each.count + 1,
          };
        }
        return { ...each };
      });
    }
  }

  console.log(newPayload);

  // await db.statistic.update(id, {
  //   ...stats[0],
  //   memorized: {
  //     ...stats[0].memorized,
  //     ...newPayload,
  //   },
  // });

  return newPayload;
};
