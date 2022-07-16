import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { surahs } from "~/repositories/surahs";
import { turnQueryParamsIntoObject } from "~/utils/string";

export default function Index() {
  const location = useLocation();

  const initialPosition = turnQueryParamsIntoObject(location.search || "?surah=0") as {
    surah: string;
  };

  const [selectedSurah, setSelectedSurah] = useState(Number(initialPosition.surah));

  useEffect(() => {
    const position = turnQueryParamsIntoObject(location.search || "?surah=0") as {
      surah: string;
    };
    setSelectedSurah(Number(position.surah));
  }, [location]);

  return (
    <div className="min-h-content">
      <h1>{surahs["id"][selectedSurah].name}</h1>
      <h1>
        {surahs["id"][selectedSurah].transliteration} -{" "}
        {surahs["id"][selectedSurah].total_verses} Ayat
      </h1>
      {surahs["id"][selectedSurah].verses.map((each) => (
        <div key={each.id}>
          <p>{each.text}</p>
          <p>{each.translation}</p>
        </div>
      ))}
    </div>
  );
}
