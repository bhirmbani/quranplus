import { chapters } from "~/repositories/chapters";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
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
            {chapters["id"].map((each) => (
              <li key={each.id}>
                <a>
                  {each.transliteration} - {each.total_verses}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
