import db from "~/models";
import { updateStatistics } from "~/services/stats";
import {
  createdDate,
  memorizedOneSurahWithDifferentDate,
  memorizeOneSurahExpectedResult,
  memorizeOneSurahWithVerseAlreadyMemorizedExpectedResult,
  memorizeOneVerseExpectedResult,
  memorizeOneVerseWithDifferentDate,
  surahMinOneVerseBeingMemorizedStateExpectedResult,
  unmemorizeOneVerseExpectedResult,
  unmemorizeTwoVerseInSuccessionExpectedResult,
} from "~/__mocks__/statistic.service.expected";
import {
  inititalStateMemorized,
  someVerseMemorizedState,
  surahMinOneVerseBeingMemorizedState,
  twoSurahMemorizedState,
} from "~/__mocks__/statistic.service.mockdata";

// const constantDate = new Date("2018-01-01T12:00:00");
// Date = class extends Date {
//   constructor() {
//     super();
//     return constantDate;
//   }
// };

afterEach(() => {
  db.statistic.clear();
  jest.useFakeTimers();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

// MEMORIZED
describe("memorize a verse", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(createdDate);
  });

  test("should increment verse by one", async () => {
    const memorizeVerseResult = await updateStatistics("memorized", {
      type: "verse",
      memorize: true,
      surahIdx: 0,
      verseIdx: 0,
    });

    expect(memorizeVerseResult).toMatchObject(memorizeOneVerseExpectedResult);
  });
});

describe("unmemorize a verse", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(createdDate);
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: memorizeOneVerseExpectedResult,
    });
  });
  test("should decrement by one", async () => {
    const unmemorizeVerseResult = await updateStatistics("memorized", {
      type: "verse",
      memorize: false,
      surahIdx: 0,
      verseIdx: 0,
    });

    expect(unmemorizeVerseResult).toMatchObject(
      unmemorizeOneVerseExpectedResult
    );
  });
});

describe("memorize a surah", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(createdDate);
  });
  test("should increment surah by one and verse by verse length", async () => {
    const memorizeSurahResult = await updateStatistics("memorized", {
      type: "surah",
      memorize: true,
      surahIdx: 0,
    });

    expect(memorizeSurahResult).toMatchObject(memorizeOneSurahExpectedResult);
  });
});

describe("unmemorize a surah", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(createdDate);
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: memorizeOneSurahExpectedResult,
    });
  });
  test("should decrement surah by one and verse by verse length", async () => {
    const unmemorizeSurahResult = await updateStatistics("memorized", {
      type: "surah",
      memorize: false,
      surahIdx: 0,
    });

    expect(unmemorizeSurahResult).toMatchObject(inititalStateMemorized);
  });
});

describe("memorize a verse with different date", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-08-08T11:29:45.549Z"));
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: memorizeOneSurahExpectedResult,
    });
  });
  test("should add new date in progress and increment verse by one", async () => {
    const memorizeVerseResult = await updateStatistics("memorized", {
      type: "verse",
      memorize: true,
      surahIdx: 113,
      verseIdx: 0,
    });

    expect(memorizeVerseResult).toMatchObject(
      memorizeOneVerseWithDifferentDate
    );
  });
});

describe("memorize a surah with different date", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-08-08T11:29:45.549Z"));
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: memorizeOneSurahExpectedResult,
    });
  });
  test("should add new date in progress and increment surah by one and verse by surah's verse length", async () => {
    const surahIdx = 113;
    const memorizeSurahResult = await updateStatistics("memorized", {
      type: "surah",
      memorize: true,
      surahIdx,
    });

    expect(memorizeSurahResult).toMatchObject(
      memorizedOneSurahWithDifferentDate
    );
  });
});

describe("memorize one surah with some verse of this surah already memorized", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-08-08T11:29:45.549Z"));
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: someVerseMemorizedState,
    });
  });
  test("should increment verses by surah length minus verse that already memorized", async () => {
    const surahIdx = 0;
    const memorizeSurahResult = await updateStatistics("memorized", {
      type: "surah",
      memorize: true,
      surahIdx,
    });

    expect(memorizeSurahResult).toMatchObject(
      memorizeOneSurahWithVerseAlreadyMemorizedExpectedResult
    );
  });
});

describe("surah A and surah B already memorized, then unmemorize one verse from surah A twice in succession", () => {
  const surahIdx = 113;
  const verseIdx = 4;
  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(createdDate);
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: twoSurahMemorizedState,
    });
  });

  test("should decrement surah count correctly", async () => {
    const result = await updateStatistics("memorized", {
      type: "verse",
      memorize: false,
      surahIdx,
      verseIdx,
    });
    expect(result).toMatchObject(unmemorizeTwoVerseInSuccessionExpectedResult);
  });
});

describe("surah A is n-1 verse from being memorized, then memorized last verse of this surah", () => {
  const surahIdx = 113;
  const verseIdx = 5;
  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(createdDate);
    db.statistic.add({
      last_read: {
        verse_idx: 0,
        surah_idx: 0,
      },
      daily_checkin: {
        last_date: new Date(),
        streak: 0,
      },
      memorized: surahMinOneVerseBeingMemorizedState,
    });
  });

  test("should increment surah count correctly", async () => {
    const result = await updateStatistics("memorized", {
      type: "verse",
      memorize: true,
      surahIdx,
      verseIdx,
    });
    expect(result).toMatchObject(surahMinOneVerseBeingMemorizedStateExpectedResult);
  });
});