import db from "~/models";

export const getCollections = async () => {
  const collections = await db.collection.toArray()
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
  const content = collection?.content || [];
  content.push(newContent);
  await db.collection.update(collectionId, { content });
};
