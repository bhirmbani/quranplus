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

// generic extension type example
// type Extension<T> = T & { someExtensionProperty: string }
