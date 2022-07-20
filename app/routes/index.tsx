import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import SurahOptionsCard from "~/components/surah-options-card";
import { copies, errors } from "~/repositories/messages";
import { surahs } from "~/repositories/surahs";
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

  const initialPosition = turnQueryParamsIntoObject(
    location.search || "?surah=1"
  ) as {
    surah: string;
  };

  const surahPosition = Number(initialPosition.surah) - 1;

  const [selectedSurahIndex, setSelectedSurahIndex] = useState(surahPosition);

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

  useEffect(() => {
    const position = turnQueryParamsIntoObject(
      location.search || "?surah=1"
    ) as {
      surah: string;
    };
    const newSurahNumber = Number(position.surah) - 1;
    setSelectedSurahIndex(newSurahNumber);
    setSurahState(rawSurah[newSurahNumber]);
    setVersesState(
      rawSurah[newSurahNumber].verses.map((verse, index) => {
        return {
          ...verse,
          paused: true,
          currentTime: 0,
          end: rawSurah[newSurahNumber].verses.length === index + 1,
        };
      })
    );
  }, [location, rawSurah]);

  const handlePrevNextSurah = (id: "-" | "+") => {
    const surahPos =
      id === "-" ? selectedSurahIndex - 1 : selectedSurahIndex + 1;
    navigate(`/?surah=${surahPos + 1}`, { replace: false });
    const quranContent = document.getElementById("quran-content");
    quranContent!.scrollTop = 0;
  };

  return (
    <div className="flex max-h-content">
      <div
        id="quran-content"
        className="mx-auto my-5 prose prose-sm overflow-y-scroll hide-scrollbar scroll-smooth"
      >
        <h2 className="text-center">
          {surahState.transliteration} - {surahState.total_verses} Ayat
        </h2>
        <p className="text-center">
          {surahState.name} - {surahState.translation} - {surahState.type}
        </p>
        {versesWithState.map((verse, verseIdx) => (
          <div
            id={`verse-${verse.id}`}
            className="border-b-2 mt-8"
            key={verse.id}
          >
            <div className="flex flex-row">
              <div className="flex flex-col items-start justify-around mx-2">
                <div className="flex flex-col flex-1 justify-start items-center">
                  <div className="flex">
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="btn btn-md btn-ghost btn-circle"
                      >
                        <span>
                          {verse.id}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </span>
                      </label>
                      <div
                        tabIndex={0}
                        className="card compact dropdown-content shadow bg-base-100 rounded-box"
                      >
                        <SurahOptionsCard
                          surahIdx={selectedSurahIndex}
                          verseIdx={verseIdx}
                          verse={verse}
                          setVersesState={setVersesState}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mr-5">
                <p className="text-2xl m-0">{verse.text}</p>
                <p>{verse.translation}</p>
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
          <button className="btn btn-ghost btn-circle">
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
