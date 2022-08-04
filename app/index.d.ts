type ChapterModel = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  link: string;
};

type TranslationEnum = "id";

type VerseModel = {
  id: number;
  text: string;
  translation: string;
};

type SurahModel = Omit<ChapterModel, "link"> & {
  verses: VerseModel[];
};

type VerseStateModel = {
  paused?: boolean;
  currentTime?: number;
  end?: boolean;
  memorized?: boolean;
};

type VersesState = VerseStateModel & VerseModel;

type KemenagTafsirVerseModel = {
  msg: string;
  tafsir: {
    tafsir_id: number;
    surah_id: number;
    aya_number: number;
    tafsir_wajiz: string;
    tafsir_tahlili: string;
  }[];
};

type SutanlabTafsirVerseModel = {
  code: number;
  message: string;
  data: {
    tafsir: {
      id: {
        short: string;
        long: string;
      };
    };
  };
};

type ContentModel = {
  surah_idx: number;
  verse_idx: number;
};

type CollectionModel = {
  id?: number;
  name: string;
  content?: ContentModel[];
};

type SurahAndVerseModel = {
  date: Date;
  updated_date: Date;
  count: number;
};

type StatisticModel = {
  id?: number;
  last_read: {
    verse_idx: number;
    surah_idx: number;
  };
  daily_checkin: {
    last_date: Date;
    streak: number;
  };
  memorized: {
    surah: number;
    verse: number;
    data: Record<number, number[]>[]; // [{ surah_idx: [verse_idx] }]
    progress: {
      surah: SurahAndVerseModel[];
      verse: SurahAndVerseModel[];
    };
  };
};

// generic extension type example
// type Extension<T> = T & { someExtensionProperty: string }
