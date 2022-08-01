import { deleteCollection } from "~/services/collection";
import { DeleteIcon, EditIcon } from "./icon";

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
          <EditIcon />
        </label>
        {/* delete */}
        <button
          onClick={() => {
            handleReselectCollection();
            handleDeleteCollection(collectionId);
          }}
          className="btn btn-xs btn-ghost btn-circle"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CollectionOptionsCard;
