import db from "~/models";

export const getCollections = async () => {
  const collections = await db.collection.toArray();
  return collections;
};

export const createNewCollection = async (name: string) => {
  await db.collection.add({ name });
};

export const getLatestCollectionId = async () => {
  const allCollection = await getCollections();
  const latestId = allCollection && allCollection[allCollection.length - 1] && allCollection[allCollection.length - 1].id;
  return latestId;
};

export const addContentToCollection = async (
  collectionId: number,
  newContent: ContentModel
) => {
  const collection = await db.collection.get({ id: collectionId });
  // if no collection, create new collection
  if (!collection) {
    db.collection.add({ name: "My Collection" }).then((id) => {
      return db.collection.get({ id });
    });
  }
  const latestId = await getLatestCollectionId()
  const content = collection?.content || [];
  content.push(newContent);
  await db.collection.update(collectionId || latestId as number, { content });
};

export const deleteContentCollection = async (
  collectionId: number,
  contentIdx: number
) => {
  const collection = await db.collection.get({ id: collectionId });
  const newContent = collection?.content?.filter(
    (_, idx) => idx !== contentIdx
  );
  await db.collection.update(collectionId, { content: newContent });
};

export const deleteCollection = async (collectionId: number) => {
  await db.collection.delete(collectionId);
};

export const editCollectionName = async (
  collectionId: number,
  name: string
) => {
  await db.collection.update(collectionId, { name });
};
