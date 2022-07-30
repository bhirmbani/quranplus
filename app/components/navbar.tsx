import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { chapters } from "~/repositories/chapters";

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
                <label onClick={handleResetSearch} className="btn btn-xs btn-circle absolute right-4 top-1">
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
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
