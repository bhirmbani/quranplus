import db from "~/models";
import type { MoveContentPayload } from "./collection.type";

export const getCollections = async () => {
  const collections = await db.collection.toArray();
  return collections;
};

export const createNewCollection = async (name: string) => {
  await db.collection.add({ name });
};

export const getLatestCollectionId = async () => {
  const allCollection = await getCollections();
  const latestId =
    allCollection &&
    allCollection[allCollection.length - 1] &&
    allCollection[allCollection.length - 1].id;
  return latestId;
};

export const addContentToCollection = async (
  collectionId: number,
  newContent: ContentModel
) => {
  const collection = await db.collection.get({ id: collectionId });
  // if no collection, create new collection
  if (!collection) {
    db.collection.add({ name: "My Collection" }).then(async (id) => {
      const newCollection = await db.collection.get({ id });
      const content = newCollection?.content || [];
      content.push(newContent);
      await db.collection.update(id, { content });
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

export const moveContentToCollection = async ({
  source,
  destination,
}: MoveContentPayload & {
  destination: {
    collectionId: number;
    surah_idx: number;
    verse_idx: number;
  };
}) => {
  await addContentToCollection(destination.collectionId, {
    surah_idx: destination.surah_idx,
    verse_idx: destination.verse_idx,
  });

  await deleteContentCollection(source.collectionId, source.contentIdx);
};
