import { copies } from "~/repositories/messages";
import { ellipsisText } from "~/utils/string";

export default function Info() {
  return (
    <div className="flex min-h-content">
      <div
        id="quran-content"
        className="flex flex-col flex-1 my-5 mx-5 overflow-x-scroll hide-scrollbar scroll-smooth"
      >
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
            <div className="card bg-base-content mx-2 max-h-[88px] max-w-[88px]">
              <div className="flex flex-1 items-center p-1">
                <p className="text-center text-white">
                  {ellipsisText(copies["id"]["your-collection"])}
                </p>
              </div>
            </div>
          </div>
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
