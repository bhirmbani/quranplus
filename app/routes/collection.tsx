import { copies } from "~/repositories/messages";
import { ellipsisText } from "~/utils/string";
import {
  addContentToCollection,
  createNewCollection,
  deleteCollection,
  editCollectionName,
  getCollections,
  moveContentToCollection,
} from "~/services/collection";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { surahs } from "~/repositories/surahs";
import DropdownOptions from "~/components/dropdown-options";
import CollectionContentOptionsCard from "~/components/collection-content-options-card";
import CollectionOptionsCard from "~/components/collection-options-card";

export default function Collection() {
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [name, setName] = useState("");
  const [moveVersePayload, setMoveVersePayload] = useState({
    source: {
      collectionId: 0,
      contentIdx: 0,
    },
  });

  const collections = useLiveQuery(() => getCollections());

  const collectionLength = collections && collections.length;

  const addCollection = async () => {
    try {
      await createNewCollection("New Collection");
      setSelectedCollection(collectionLength! > 0 ? collectionLength! : 0);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addToCollection = async (collectionId: number = 1) => {
    // collectionId = 1 means collection array empty
    if (collectionId === 1) {
      setSelectedCollection(0);
    }
    const randomSurah = Math.floor(Math.random() * 113);
    const verseLength = surahs["id"][randomSurah].verses.length;
    const randomVerse = Math.floor(Math.random() * verseLength);
    try {
      await addContentToCollection(collectionId, {
        surah_idx: randomSurah,
        verse_idx: randomVerse,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleReselectCollection = async () => {
    const collectionLength =
      collections && collections[selectedCollection] && collections.length - 1;
    if (collectionLength! === selectedCollection) {
      setSelectedCollection(collectionLength! - 1);
    }
  };

  const handleDeleteCollection = async (collectionId: number) => {
    try {
      await deleteCollection(collectionId);
      handleReselectCollection();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleChangeCollection = (collectionIndex: number) => {
    setSelectedCollection(collectionIndex);
  };

  const handleEditName = async (collectionId: number, newName: string) => {
    try {
      await editCollectionName(collectionId, newName);
      setName("");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleMoveVerse = async () => {
    const destinationContent =
      collections &&
      collections[selectedCollection] &&
      collections[selectedCollection].content![
        moveVersePayload.source.contentIdx
      ];
    const destinationCollectionIdEl = document.getElementById(
      "collection-destination-select"
    ) as unknown as HTMLSelectElement;

    try {
      await moveContentToCollection({
        source: moveVersePayload.source,
        destination: {
          collectionId: Number(destinationCollectionIdEl.value),
          surah_idx: destinationContent!.surah_idx,
          verse_idx: destinationContent!.verse_idx,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const collectionId =
    collections &&
    collections[selectedCollection] &&
    collections[selectedCollection].id;

  const collectionName =
    collections &&
    collections[selectedCollection] &&
    collections[selectedCollection].name;

  const handlePrefilledName = () => {
    setName(collectionName as string);
  };

  return (
    <div className="flex min-h-content">
      {/* edit collection name modal */}
      <input type="checkbox" id="edit-collection" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="mb-2">
            <label
              htmlFor="edit-collection"
              className="btn btn-xs btn-circle absolute right-6"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">
              {copies["id"]["edit-collection"]}
            </h3>
          </div>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="..."
            className="input input-bordered w-full"
          />

          <div className="modal-action">
            <label
              onClick={() => handleEditName(collectionId as number, name)}
              htmlFor="edit-collection"
              className="btn"
            >
              Ok
            </label>
          </div>
        </div>
      </div>
      {/* move verse modal */}
      <input type="checkbox" id="move-verse" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="mb-2">
            <label
              htmlFor="move-verse"
              className="btn btn-xs btn-circle absolute right-6"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">{copies["id"]["move-verse"]}</h3>
          </div>

          <select
            id="collection-destination-select"
            className="select select-bordered min-w-full max-w-xs"
          >
            {collections &&
              collections.length > 0 &&
              collections.map((each) => {
                if (each.id !== collectionId) {
                  return (
                    <option key={each.id} value={each.id}>
                      {each.name}
                    </option>
                  );
                }
                return null;
              })}
          </select>

          <div className="modal-action">
            <label
              onClick={handleMoveVerse}
              htmlFor="move-verse"
              className="btn"
            >
              Ok
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 my-5 mx-5 overflow-x-scroll hide-scrollbar scroll-smooth min-h-screen">
        <div className="w-full border-b-2 pb-5 overflow-y-scroll hide-scrollbar">
          <div className="flex flex-col w-max">
            <div className="flex flex-row">
              <button
                onClick={addCollection}
                className="btn btn-outline min-h-[88px] min-w-[88px] rounded-2xl"
              >
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
                collections.map((each, idx) => (
                  <div key={each.id}>
                    <div
                      onClick={() => handleChangeCollection(idx)}
                      className={`card cursor-pointer text-ellipsis items-center ml-5 min-h-[88px] min-w-[88px] max-h-[88px] max-w-[88px] ${
                        idx === selectedCollection
                          ? "bg-base-content"
                          : "bg-base-300"
                      }`}
                    >
                      <div className="flex flex-1 items-center p-1">
                        <p className="text-center text-sm text-white">
                          {ellipsisText(each.name, 20)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-scroll min-h-[60%]">
          {/* if collection exist but content array empty */}
          {collections &&
            collections?.length > 0 &&
            collections[selectedCollection] &&
            collections[selectedCollection].content?.length === 0 && (
              <div className="flex h-full items-center text-center justify-center">
                <div className="flex flex-col items-center">
                  <p>{copies["id"]["no-collection"]}</p>
                  <button
                    onClick={() =>
                      addToCollection(collections[selectedCollection].id)
                    }
                    className="btn width-[50%] mt-2"
                  >
                    {copies["id"]["add-random-collection"]}
                  </button>
                  <div className="divider">OR</div>
                  <button
                    onClick={() =>
                      handleDeleteCollection(
                        collections![selectedCollection].id as number
                      )
                    }
                    className="btn btn-warning width-[50%] mt-2"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          {/* if collection exist but no content array exist */}
          {collections &&
            collections?.length > 0 &&
            collections[selectedCollection] &&
            !collections[selectedCollection].content && (
              <div className="flex h-full items-center text-center justify-center">
                <div className="flex flex-col items-center">
                  <p>{copies["id"]["no-collection"]}</p>
                  <button
                    onClick={() =>
                      addToCollection(collections[selectedCollection].id)
                    }
                    className="btn width-[50%] mt-2"
                  >
                    {copies["id"]["add-random-collection"]}
                  </button>
                  <div className="divider">OR</div>
                  <button
                    onClick={() =>
                      handleDeleteCollection(
                        collections![selectedCollection].id as number
                      )
                    }
                    className="btn btn-warning width-[50%] mt-2"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          {collections &&
            collections?.length > 0 &&
            collections[selectedCollection] &&
            collections[selectedCollection].content && (
              <div className="flex">
                <button className="invisible w-12 ml-1" />
                <div className="flex items-center flex-1 justify-center text-center">
                  <p>{collections && collections[selectedCollection].name}</p>
                </div>
                <div className="flex justify-end mr-1">
                  {collections && (
                    <DropdownOptions horizontal={false} text="">
                      <CollectionOptionsCard
                        collectionId={
                          collections![selectedCollection].id as number
                        }
                        handleReselectCollection={handleReselectCollection}
                        handlePrefilledName={handlePrefilledName}
                      />
                    </DropdownOptions>
                  )}
                </div>
              </div>
            )}
          {collections &&
          collections.length > 0 &&
          collections[selectedCollection] ? (
            collections[selectedCollection].content?.map((content, index) => (
              <div
                className="flex flex-row prose my-2 border-b-2 pb-2"
                key={index}
              >
                <DropdownOptions text={`${index + 1}`}>
                  <CollectionContentOptionsCard
                    collectionId={collections[selectedCollection].id as number}
                    contentIdx={index}
                    collectionLength={collectionLength!}
                    setMoveVersePayload={setMoveVersePayload}
                  />
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
                  <p className="m-0">
                    {surahs["id"][content.surah_idx].transliteration}{" "}
                    {surahs["id"][content.surah_idx].id}:
                    {
                      surahs["id"][content.surah_idx].verses[content.verse_idx]
                        .id
                    }
                  </p>
                  <div>
                    <p className="m-0 truncate">
                      {surahs["id"][content.surah_idx].name} -{" "}
                      {surahs["id"][content.surah_idx].translation}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full items-center text-center justify-center">
              <div className="flex flex-col items-center">
                <p>{copies["id"]["no-collection"]}</p>
                <button
                  onClick={() => addToCollection()}
                  className="btn width-[50%] mt-2"
                >
                  {copies["id"]["add-random-collection"]}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <p>{error.message}</p>
      <p>{error.stack}</p>
    </div>
  );
}
