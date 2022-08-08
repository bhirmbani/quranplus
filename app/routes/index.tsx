import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLocation, useNavigate } from "@remix-run/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import DropdownOptions from "~/components/dropdown-options";
import { CheckFilledIcon, CheckIcon } from "~/components/icon";
import SurahOptionsCard from "~/components/surah-options-card";
import { copies, errors } from "~/repositories/messages";
import { surahs } from "~/repositories/surahs";
import { getStatistics, updateStatistics } from "~/services/stats";
import { turnQueryParamsIntoObject } from "~/utils/string";

export const loader: LoaderFunction = async (context) => {
  const params = new URL(context.request.url).searchParams;
  if (params.values().next().value && params.has("surah") === false) {
    throw new Error(errors["id"]["surah-not-found"]);
  }
  const surahPos = params.get("surah") || 1;
  const number = Number(surahPos);
  if (number < 1 || number > 114 || isNaN(number)) {
    throw new Error(errors["id"]["surah-not-found"]);
  }

  return null;
};

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();

  const statistics = useLiveQuery(() => getStatistics());

  const initialPosition = turnQueryParamsIntoObject(
    location.search || "?surah=1"
  ) as {
    surah: string;
  };

  const surahPosition = Number(initialPosition.surah) - 1;

  const [selectedSurahIndex, setSelectedSurahIndex] = useState(surahPosition);

  const statsMemorizedData =
    statistics && statistics[0] && statistics[0].memorized.data;

  const memorizedVersesOfCurrentSurah =
    statsMemorizedData &&
    statsMemorizedData.find(
      (each) => Number(Object.keys(each)) === selectedSurahIndex
    );

  const rawSurah = surahs["id"];
  const initialVerseWithState = rawSurah[surahPosition].verses.map(
    (verse, index) => {
      return {
        ...verse,
        paused: true,
        currentTime: 0,
        end: rawSurah[surahPosition].verses.length === index + 1,
      };
    }
  );

  const [surahState, setSurahState] = useState<SurahModel>(
    rawSurah[surahPosition]
  );

  const [versesWithState, setVersesState] = useState<VersesState[]>(
    initialVerseWithState
  );

  const checkSurahMemorizedExist =
    statsMemorizedData?.find(
      (each) => Number(Object.keys(each)) === selectedSurahIndex
    ) || {};


  const isSurahMemorized = checkSurahMemorizedExist && checkSurahMemorizedExist[selectedSurahIndex] && checkSurahMemorizedExist[selectedSurahIndex].length === surahState.verses.length;

  useEffect(() => {
    const position = turnQueryParamsIntoObject(
      location.search || "?surah=1"
    ) as {
      surah: string;
    };
    const newSurahNumber = Number(position.surah) - 1;
    setSelectedSurahIndex(newSurahNumber);
    setSurahState(rawSurah[newSurahNumber]);
    const checkIsVerseMemorized = (verseIdx: number) => {
      if (memorizedVersesOfCurrentSurah === undefined) {
        return false;
      } else {
        return memorizedVersesOfCurrentSurah[selectedSurahIndex].includes(
          verseIdx
        );
      }
    };
    setVersesState(
      rawSurah[newSurahNumber].verses.map((verse, index) => {
        return {
          ...verse,
          paused: true,
          currentTime: 0,
          memorized: checkIsVerseMemorized(index),
          end: rawSurah[newSurahNumber].verses.length === index + 1,
        };
      })
    );
  }, [
    location.search,
    rawSurah,
    memorizedVersesOfCurrentSurah,
    selectedSurahIndex,
  ]);

  const handlePrevNextSurah = (id: "-" | "+") => {
    const surahPos =
      id === "-" ? selectedSurahIndex - 1 : selectedSurahIndex + 1;
    navigate(`/?surah=${surahPos + 1}`, { replace: false });
    const quranContent = document.getElementById("quran-content");
    quranContent!.scrollTop = 0;
  };

  const handleMemorizeSurah = () => {
    setVersesState((prevState) => {
      return prevState.map((each) => ({
        ...each,
        memorized: !isSurahMemorized,
      }));
    });
    updateStatistics("memorized", {
      type: "surah",
      memorize: !isSurahMemorized,
      surahIdx: selectedSurahIndex,
    });
  };

  // console.log('AWAL:', statistics && statistics[0] && statistics[0].memorized);

  return (
    <div className="flex flex-col max-h-content">
      <div>
        <div className="prose prose-sm flex justify-center mt-5 mb-4 min-w-full">
          <h2 className="text-center m-0 mr-0.5">
            {surahState.transliteration} - {surahState.total_verses} Ayat
          </h2>
          <div className="flex items-center">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        id="quran-content"
        className="mx-auto mb-5 prose prose-sm overflow-y-scroll scroll-smooth"
      >
        <p className="text-center">
          {surahState.name} - {surahState.translation} - {surahState.type}
        </p>
        {versesWithState.map((verse, verseIdx) => (
          <div key={verse.id} className="not-prose">
            <div id={`verse-${verse.id}`} className="border-b-2 mt-8">
              <div className="flex flex-row">
                {/* surah options dropdown */}
                <DropdownOptions text={`${verse.id}`}>
                  <SurahOptionsCard
                    surahIdx={selectedSurahIndex}
                    verseIdx={verseIdx}
                    verse={verse}
                    setVersesState={setVersesState}
                  />
                </DropdownOptions>
                <div className="flex flex-col mr-5">
                  <p className="text-2xl m-0">{verse.text}</p>
                  <p className="my-4">{verse.translation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-row justify-between mx-5 mt-2">
          {selectedSurahIndex > 0 ? (
            <button
              onClick={() => handlePrevNextSurah("-")}
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button className="invisible w-12" />
          )}
          <button
            onClick={handleMemorizeSurah}
            className="btn btn-ghost btn-circle"
          >
            {isSurahMemorized ? <CheckFilledIcon /> : <CheckIcon />}
          </button>
          {selectedSurahIndex < 113 ? (
            <button
              onClick={() => handlePrevNextSurah("+")}
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button className="invisible w-12" />
          )}
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const navigate = useNavigate();

  return (
    <div className="flex max-h-content h-screen">
      <div
        id="quran-content"
        className="mx-auto my-5 prose prose-sm overflow-y-scroll hide-scrollbar scroll-smooth flex flex-col justify-center items-center"
      >
        <p className="text-center text-red-800">{error.message}</p>
        <button
          onClick={() => navigate("/?surah=1", { replace: true })}
          className="btn btn-success btn-wide btn-sm"
        >
          {copies["id"]["go-back-home"]}
        </button>
      </div>
    </div>
  );
}
