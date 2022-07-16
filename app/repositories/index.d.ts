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

type SurahModel = Omit<ChapterModel, "link"> & {
  verses: {
    id: number;
    text: string;
    translation: string;
  }[];
};
