import { copies } from "~/repositories/messages";
import db from "~/models";
import { ellipsisText } from "~/utils/string";
import { addContentToCollection, getCollections } from "~/services/collection";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { surahs } from "~/repositories/surahs";
import DropdownOptions from "~/components/dropdown-options";
import CollectionOptionsCard from "~/components/collection-options-card";

export default function Collection() {
  const [selectedCollection, setSelectedCollection] = useState(0);

  const add = async () => {
    await db.collection.add({ name: "sasa" });
  };

  const collections = useLiveQuery(() => getCollections());

  const addToCollection = async () => {
    const randomSurah = Math.floor((Math.random() * 113))
    const verseLength = surahs['id'][randomSurah].verses.length
    const randomVerse = Math.floor((Math.random() * verseLength))
    try {
      await addContentToCollection(1, {
        surah_idx: randomSurah,
        verse_idx: randomVerse,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-content">
      <div className="flex flex-col flex-1 my-5 mx-5 overflow-x-scroll hide-scrollbar scroll-smooth min-h-screen">
        <div className="w-full border-b-2 pb-5">
          <div className="flex flex-col w-max">
            <div className="flex flex-row">
              <button className="btn btn-outline min-h-[88px] min-w-[88px] rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {collections &&
                collections.length > 0 &&
                collections.map((each) => (
                  <div
                    key={each.id}
                    className="card bg-base-content mx-3 max-h-[88px] max-w-[88px]"
                  >
                    <div className="flex flex-1 items-center p-1">
                      <p className="text-center text-white">{each.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-scroll min-h-[60%]">
          {collections && collections.length > 0 ? (
            collections[selectedCollection].content?.map((content, index) => (
              <div className="flex flex-row prose my-2 border-b-2 pb-2" key={index}>
                <DropdownOptions text={`${index + 1}`}>
                  <CollectionOptionsCard />
                </DropdownOptions>
                <div
                  className="flex flex-[0.8] items-start flex-col tooltip tooltip-bottom cursor-pointer"
                  data-tip={ellipsisText(
                    `${
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .text
                    }\n${
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .translation
                    }`,
                    200
                  )}
                >
                  <div>
                    <p className="m-0 truncate">
                      {surahs["id"][content.surah_idx].name} - {surahs["id"][content.surah_idx].translation}
                    </p>
                  </div>
                  <p className="m-0">
                    {surahs["id"][content.surah_idx].transliteration}{" "}
                    {surahs["id"][content.surah_idx].id}:
                    {
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .id
                    }
                  </p>
                  {/* <p className="m-0">
                    {
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .text
                    }
                  </p>
                  
                  <p className="m-0">
                    {
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .translation
                    }
                  </p> */}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full items-center text-center justify-center">
              <div className="flex flex-col items-center">
                <p>{copies["id"]["no-collection"]}</p>
                <button onClick={addToCollection} className="btn width-[50%] mt-2">
                  {copies["id"]["add-random-collection"]}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex flex-1 items-end">
          <button className="btn btn-outline btn-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            {copies["id"]["create-new-collection"]}
          </button>
        </div> */}
      </div>
    </div>
  );
}
