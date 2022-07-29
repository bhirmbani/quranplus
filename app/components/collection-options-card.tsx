import { deleteCollection } from "~/services/collection";

type CollectionOptionsCardType = {
  collectionId: number;
};

const handleDeleteCollection = async (id: number) => {
  try {
    await deleteCollection(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CollectionOptionsCard = ({ collectionId }: CollectionOptionsCardType) => {
  return (
    <div>
      <div className="flex flex-column justify-around m-0 card-bordered card card-body p-2">
        {/* delete */}
        <button
          onClick={() => handleDeleteCollection(collectionId)}
          className="btn btn-xs btn-ghost btn-circle"
        >
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
        {/* edit */}
        <label
          htmlFor="edit-collection"
          className="btn btn-xs btn-ghost btn-circle"
        >
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default CollectionOptionsCard;
