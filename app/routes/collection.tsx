import { copies } from "~/repositories/messages";
import db from "~/models";
import { ellipsisText } from "~/utils/string";
import { addContentToCollection, getCollections } from "~/services/collection";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { surahs } from "~/repositories/surahs";

export default function Collection() {
  const [selectedCollection, setSelectedCollection] = useState(0);

  const add = async () => {
    await db.collection.add({ name: "sasa" });
  };

  const update = async () => {
    try {
      await addContentToCollection(1, { surah_idx: 1, verse_idx: 1 });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const collections = useLiveQuery(() => getCollections());
  if (collections) {
    console.log("a", collections[0]);
  }

  return (
    <div className="flex min-h-content">
      <div
        id="quran-content"
        className="flex flex-col flex-1 my-5 mx-5 overflow-x-scroll hide-scrollbar scroll-smooth"
      >
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
              <div className="card bg-base-content mx-3 max-h-[88px] max-w-[88px]">
                <div className="flex flex-1 items-center p-1">
                  <p className="text-center text-white">
                    {ellipsisText(copies["id"]["your-collection"])}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {collections &&
            collections[selectedCollection].content?.map((content, index) => (
              <div className="flex flex-col" key={`${content.surah_idx}${content.verse_idx}`}>
                <div>
                  <p>{index + 1}</p>
                </div>
                <div>
                  <p>
                    {surahs["id"][content.surah_idx].transliteration} -{" "}
                    {surahs["id"][content.surah_idx].name}
                  </p>
                  <p>
                    {
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .text
                    }
                  </p>
                  <p>
                    {ellipsisText(
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .translation
                    )}
                  </p>
                </div>
              </div>
            ))}
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
