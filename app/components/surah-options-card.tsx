import { useState } from "react";
import { generateVerseNumber } from "~/utils/data-manipulation";

type SurahOptionsCardType = {
  surahIdx: number;
  verseIdx: number;
};

const SurahOptionsCard = ({ surahIdx, verseIdx }: SurahOptionsCardType) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const handlePlayPauseButton = async () => {
    const audio = document.getElementById("verse-audio") as HTMLMediaElement;
    const number = generateVerseNumber(surahIdx, verseIdx);
    if (paused) {
      audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${number}.mp3`;
      audio.currentTime = audio.ended ? 0 : currentTime;
      audio.play();
      setPaused(false);
      setCurrentTime(audio.currentTime + 1);
    } else {
      const time = audio.ended ? 0 : audio.currentTime;
      setCurrentTime(time);
      audio.pause();
      setPaused(true);
    }
  };

  return (
    <div className="mx-5 flex flex-row justify-around mb-5 card-bordered card card-body p-2">
      <audio id="verse-audio" />
      <button
        onClick={handlePlayPauseButton}
        className="btn btn-xs btn-ghost btn-circle"
      >
        {!paused ? (
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
      {/* archive */}
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
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      </button>
    </div>
  );
};

export default SurahOptionsCard;
