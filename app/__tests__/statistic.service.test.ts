import db from "~/models";
import { updateStatistics } from "~/services/stats";
import {
  createdDate,
  memorizeOneSurahExpectedResult,
  memorizeOneVerseExpectedResult,
  unmemorizeOneVerseExpectedResult,
} from "~/__mocks__/statistic.service.expected";
import { formatDateInProgress } from "~/utils/test-helpers";
import { inititalStateMemorized } from "~/__mocks__/statistic.service.mockdata";

// const constantDate = new Date("2018-01-01T12:00:00");
// Date = class extends Date {
//   constructor() {
//     super();
//     return constantDate;
//   }
// };

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(createdDate));
});

afterEach(() => {
  db.statistic.clear();
});

// MEMORIZED
describe("memorize a verse", () => {
  test("should increment verse by one", async () => {
    const memorizeVerseResult = await updateStatistics("memorized", {
      type: "verse",
      memorize: true,
      surahIdx: 0,
      verseIdx: 0,
    });

    expect({
      ...memorizeVerseResult,
      progress: formatDateInProgress(memorizeVerseResult!.progress),
    }).toMatchObject({
      ...memorizeOneVerseExpectedResult,
      progress: formatDateInProgress(memorizeOneVerseExpectedResult!.progress),
    });
  });
});

describe("unmemorize a verse", () => {
  beforeEach(() => {
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

    expect({
      ...unmemorizeVerseResult,
      progress: formatDateInProgress(unmemorizeVerseResult!.progress),
    }).toMatchObject({
      ...unmemorizeOneVerseExpectedResult,
      progress: formatDateInProgress(
        unmemorizeOneVerseExpectedResult!.progress
      ),
    });
  });
});

describe("memorize a surah", () => {
  test("should increment surah by one and verse by verse length", async () => {
    const memorizeSurahResult = await updateStatistics("memorized", {
      type: "surah",
      memorize: true,
      surahIdx: 0,
      verseIdx: 0,
    });

    expect({
      ...memorizeSurahResult,
      progress: formatDateInProgress(memorizeSurahResult!.progress),
    }).toMatchObject({
      ...memorizeOneSurahExpectedResult,
      progress: formatDateInProgress(memorizeOneSurahExpectedResult!.progress),
    });
  });
});

describe("unmemorize a surah", () => {
  beforeEach(() => {
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
      verseIdx: 0,
    });

    expect({
      ...unmemorizeSurahResult,
      progress: formatDateInProgress(unmemorizeSurahResult!.progress),
    }).toMatchObject({
      ...inititalStateMemorized,
      progress: formatDateInProgress(inititalStateMemorized!.progress),
    });
  });
});
