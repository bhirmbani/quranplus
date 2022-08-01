import type { Dispatch, SetStateAction } from "react";
import { addContentToCollection, getLatestCollectionId } from "~/services/collection";
import { generateVerseNumber } from "~/utils/data-manipulation";
import { BookmarkIcon, CheckIcon, CollectionIcon, PauseIcon, PlayIcon } from "./icon";

type SurahOptionsCardType = {
  surahIdx: number;
  verseIdx: number;
  setVersesState: Dispatch<SetStateAction<VersesState[]>>;
  verse: VersesState;
};

const SurahOptionsCard = ({
  surahIdx,
  verseIdx,
  setVersesState,
  verse,
}: SurahOptionsCardType) => {
  const generateNewState = (newState: VerseStateModel, pickedIndex: number) => {
    setVersesState((prevState) => {
      const newVerses = prevState.map((state, index) => {
        if (pickedIndex === index) {
          return { ...state, ...newState };
        }
        // reset state to original
        return { ...state, paused: true, currentTime: 0 };
      });
      return newVerses;
    });
  };

  const handlePlayPauseButton = async () => {
    const audio = document.getElementById("verse-audio") as HTMLMediaElement;
    const number = generateVerseNumber(surahIdx, verseIdx);
    if (verse.paused) {
      audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${number}.mp3`;
      audio.currentTime = audio.ended ? 0 : verse.currentTime;
      audio.play();
      generateNewState(
        { paused: false, currentTime: audio.currentTime + 1 },
        verseIdx
      );
    } else {
      const time = audio.ended ? 0 : audio.currentTime;
      generateNewState({ paused: true, currentTime: time }, verseIdx);
      audio.pause();
    }
    audio.addEventListener("ended", () => {
      generateNewState({ paused: true, currentTime: 0 }, verseIdx);
    });
  };

  const addToCollection = async () => {
    try {
      // TODO: if collection length > 1, save to collection with id collectionLength - 1
      const latestId = await getLatestCollectionId() as number || 1;
      await addContentToCollection(latestId, {
        surah_idx: surahIdx,
        verse_idx: verseIdx,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex flex-column justify-around m-0 card-bordered card card-body p-2">
      <audio id="verse-audio" />
      <button
        id="verse-button"
        onClick={handlePlayPauseButton}
        className="btn btn-xs btn-ghost btn-circle"
      >
        {!verse.paused ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </button>
      {/* check */}
      <button className="btn btn-xs btn-ghost btn-circle">
        <CheckIcon />
      </button>
      {/* bookmark */}
      <button className="btn btn-xs btn-ghost btn-circle">
        <BookmarkIcon />
      </button>
      {/* collection */}
      <button
        onClick={addToCollection}
        className="btn btn-xs btn-ghost btn-circle"
      >
        <CollectionIcon />
      </button>
    </div>
  );
};

export default SurahOptionsCard;
