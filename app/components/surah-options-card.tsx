import type { Dispatch, SetStateAction } from "react";
import { addContentToCollection, getLatestCollectionId } from "~/services/collection";
import { generateVerseNumber } from "~/utils/data-manipulation";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
      {/* check */}
      <button className="btn btn-xs btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      {/* bookmark */}
      <button className="btn btn-xs btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
      {/* collection */}
      <button
        onClick={addToCollection}
        className="btn btn-xs btn-ghost btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </button>
    </div>
  );
};

export default SurahOptionsCard;
