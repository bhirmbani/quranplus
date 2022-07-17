import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import NavbarBottom from "~/components/bottom-nav";
import { surahs } from "~/repositories/surahs";
import { turnQueryParamsIntoObject } from "~/utils/string";

export default function Index() {
  const location = useLocation();

  const initialPosition = turnQueryParamsIntoObject(
    location.search || "?surah=1"
  ) as {
    surah: string;
  };

  const [selectedSurah, setSelectedSurah] = useState(
    Number(initialPosition.surah) - 1
  );

  useEffect(() => {
    const position = turnQueryParamsIntoObject(
      location.search || "?surah=1"
    ) as {
      surah: string;
    };
    setSelectedSurah(Number(position.surah) - 1);
  }, [location]);

  const surah = surahs["id"][selectedSurah];

  return (
    <div className="flex max-h-content">
      <div id="quran-content" className="mx-auto my-5 prose prose-sm overflow-y-scroll hide-scrollbar">
        <h2 className="text-center">
          {surah.transliteration} - {surah.total_verses} Ayat
        </h2>
        <p className="text-center">
          {surah.name} - {surah.translation} - {surah.type}
        </p>
        {surah.verses.map((each) => (
          <div className="border-b-2 mt-8" key={each.id}>
            <div className="flex flex-row">
              <div className="flex mx-5">
                <p>{each.id}</p>
              </div>
              <div className="flex flex-col mr-5">
                <p className="text-2xl m-0">{each.text}</p>
                <p>{each.translation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
