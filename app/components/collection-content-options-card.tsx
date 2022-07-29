import { deleteContentCollection } from "~/services/collection";

type CollectionContenOptionsCardType = {
  collectionId: number;
  contentIdx: number;
}

const handleDeleteContent = async (id: number, idx: number) => {
  try {
    await deleteContentCollection(id, idx);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const CollectionContentOptionsCard = ({ collectionId, contentIdx }: CollectionContenOptionsCardType) => {
  return (
    <div className="flex flex-column justify-around m-0 card-bordered card card-body p-2">
      {/* delete */}
      <button onClick={() => handleDeleteContent(collectionId, contentIdx)} className="btn btn-xs btn-ghost btn-circle">
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
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default CollectionContentOptionsCard;
