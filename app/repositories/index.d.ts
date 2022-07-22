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
  paused: boolean;
  currentTime: number;
  end?: boolean;
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
      }
    }
  }
};

// generic extension type example
// type Extension<T> = T & { someExtensionProperty: string }
