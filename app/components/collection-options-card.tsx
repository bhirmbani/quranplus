const CollectionOptionsCard = () => {
  return (
    <div className="flex flex-column justify-around m-0 card-bordered card card-body p-2">
      {/* archive */}
      <button className="btn btn-xs btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      </button>
    </div>
  );
};

export default CollectionOptionsCard;