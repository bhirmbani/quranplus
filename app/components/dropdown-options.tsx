type DropdownOptionsProps = {
  text: string;
  children: JSX.Element;
};

const DropdownOptions = ({ text, children }: DropdownOptionsProps) => {
  return (
    <div className="flex flex-col items-start justify-around mx-2">
      <div className="flex flex-col flex-1 justify-start items-center">
        <div className="flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-md btn-ghost btn-circle">
              <span>
                {text}
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
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownOptions;
