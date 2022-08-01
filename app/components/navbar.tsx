import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { chapters } from "~/repositories/chapters";
import { copies } from "~/repositories/messages";
import DropdownOptions from "./dropdown-options";
import { BookmarkIcon, CheckIcon, CollectionIcon, DeleteIcon, EditIcon, MoveContentCollectionIcon, PauseIcon, PlayIcon } from "./icon";
import TitleOptionsCard from "./title-options.card";

const Navbar = () => {
  const navigate = useNavigate();
  const [chapterState, setChapterState] = useState(chapters["id"]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeSurah = (index: number) => {
    const surahPosition = index + 1;
    navigate(`/?surah=${surahPosition}`, { replace: false });
    const quranContent = document.getElementById("quran-content");
    quranContent!.scrollTop = 0;
  };

  const handleSearch = (verseName: string) => {
    setSearchTerm(verseName);
    const cleanName = verseName
      .toLowerCase()
      .replace(/['-\s]/g, "")
      .trim();
    const filtered = chapters["id"].filter((each) => {
      const clean = each.transliteration
        .toLowerCase()
        .replace(/['-\s]/g, "")
        .trim();
      return clean.indexOf(cleanName) > -1;
    });
    setChapterState(filtered);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setChapterState(chapters["id"]);
  };

  return (
    <div className="navbar bg-base-300 mx-auto max-w-2xl">
      <input type="checkbox" id="info-title" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="mb-2">
            <label
              htmlFor="info-title"
              className="btn btn-xs btn-circle absolute right-6"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Help</h3>
          </div>

          <div className="prose prose-sm">
            <div className="flex-row items-center">
              <div className="flex items-center">
                <PlayIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["play-icon"]}</p>
              </div>
              <div className="flex items-center">
                <PauseIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["pause-icon"]}</p>
              </div>
              <div className="flex items-center">
                <CheckIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["check-icon"]}</p>
              </div>
              <div className="flex items-center">
                <BookmarkIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["bookmark-icon"]}</p>
              </div>
              <div className="flex items-center">
                <CollectionIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["collection-icon"]}</p>
              </div>
              <div className="flex items-center">
                <EditIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["edit-icon"]}</p>
              </div>
              <div className="flex items-center">
                <DeleteIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["delete-icon"]}</p>
              </div>
              <div className="flex items-center">
                <MoveContentCollectionIcon />
                <p className="ml-2 my-2">{copies["id"]["title-help"]["move-content-icon"]}</p>
              </div>
            </div>
          </div>

          {/* <div className="modal-action">
            <label
              htmlFor="info-title"
              className="btn"
            >
              Ok
            </label>
          </div> */}
        </div>
      </div>
      <div className="navbar-start" />
      <div className="navbar-center">
        <div className="dropdown">
          <a tabIndex={0} className="btn btn-ghost normal-case text-xl">
            QuranPlus
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <ul
            tabIndex={0}
            className="overflow-hidden overflow-y-scroll h-navbar-dropdown menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <div className="flex justify-center sticky top-0 z-10 mb-1">
              <input
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="input input-bordered input-sm w-[90%]"
              />
              {searchTerm.length > 0 && (
                <label
                  onClick={handleResetSearch}
                  className="btn btn-xs btn-circle absolute right-4 top-1"
                >
                  ✕
                </label>
              )}
            </div>
            {chapterState.map((each) => (
              <li onClick={() => handleChangeSurah(each.id - 1)} key={each.id}>
                <a>
                  ({each.id}) {each.transliteration} - {each.total_verses}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <DropdownOptions horizontal={false} text="">
          <TitleOptionsCard />
        </DropdownOptions>
      </div>
    </div>
  );
};

export default Navbar;
