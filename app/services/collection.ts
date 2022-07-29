import db from "~/models";

export const getCollections = async () => {
  const collections = await db.collection.toArray();
  return collections;
};

export const createNewCollection = async (name: string) => {
  await db.collection.add({ name });
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
  const content = collection?.content || [];
  content.push(newContent);
  await db.collection.update(collectionId, { content });
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
