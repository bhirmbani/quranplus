import { deleteCollection } from "~/services/collection";

type CollectionOptionsCardType = {
  collectionId: number;
  handleReselectCollection: () => void;
  handlePrefilledName: () => void;
};

const handleDeleteCollection = async (id: number) => {
  try {
    await deleteCollection(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CollectionOptionsCard = ({
  collectionId,
  handleReselectCollection,
  handlePrefilledName,
}: CollectionOptionsCardType) => {
  return (
    <div>
      <div className="flex flex-column justify-around m-0 card-bordered card card-body p-2">
        {/* edit */}
        <label
          onClick={handlePrefilledName}
          htmlFor="edit-collection"
          className="btn btn-xs btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </label>
        {/* delete */}
        <button
          onClick={() => {
            handleReselectCollection();
            handleDeleteCollection(collectionId);
          }}
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
    </div>
  );
};

export default CollectionOptionsCard;
