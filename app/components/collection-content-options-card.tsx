import { deleteContentCollection } from "~/services/collection";

type CollectionContenOptionsCardType = {
  collectionId: number;
  contentIdx: number;
};

const handleDeleteContent = async (id: number, idx: number) => {
  try {
    await deleteContentCollection(id, idx);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const CollectionContentOptionsCard = ({
  collectionId,
  contentIdx,
}: CollectionContenOptionsCardType) => {
  return (
    <div className="flex flex-column justify-around m-0 card-bordered card card-body p-2">
      {/* move */}
      <button className="btn btn-xs btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
        </svg>
      </button>
      {/* delete */}
      <button
        onClick={() => handleDeleteContent(collectionId, contentIdx)}
        className="btn btn-xs btn-ghost btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default CollectionContentOptionsCard;
